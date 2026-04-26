const Campaign = require('../models/campaign.model');
const { AppError } = require('../middleware/error.middleware');

/**
 * POST /api/campaigns
 * Create a new campaign (protected)
 */
const createCampaign = async (req, res, next) => {
  try {
    const { title, description, goalAmount, deadline, image, category } = req.body;

    // Validate required fields
    if (!title || !description || !goalAmount || !deadline || !category) {
      return next(new AppError('All fields including category are required.', 400));
    }

    const campaign = await Campaign.create({
      title,
      description,
      goalAmount,
      deadline,
      image: image || '',
      category, // 🔥 THIS WAS MISSING
      owner: req.user._id,
    });

    await campaign.populate('owner', 'name email');

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully.',
      data: { campaign },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/campaigns
 * Get all active campaigns with optional filters
 */
const getAllCampaigns = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      sort = '-createdAt',
      search,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    // Build filter query
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Run query and count in parallel
    const [campaigns, total] = await Promise.all([
      Campaign.find(filter)
        .populate('owner', 'name email')
        .sort(sort)
        .skip(skip)
        .limit(limitNum),
      Campaign.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: {
        campaigns,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/campaigns/:id
 * Get a single campaign by ID
 */
const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('owner', 'name email');

    if (!campaign) {
      return next(new AppError('Campaign not found.', 404));
    }

    res.status(200).json({
      success: true,
      data: { campaign },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/campaigns/:id
 * Update a campaign (owner only)
 */
const updateCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return next(new AppError('Campaign not found.', 404));
    }

    // Ensure only the owner can update
    if (campaign.owner.toString() !== req.user._id.toString()) {
      return next(new AppError('You are not authorized to update this campaign.', 403));
    }

    const allowedUpdates = ['title', 'description', 'goalAmount', 'deadline', 'image', 'status'];
    const updates = {};
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const updated = await Campaign.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).populate('owner', 'name email');

    res.status(200).json({
      success: true,
      message: 'Campaign updated successfully.',
      data: { campaign: updated },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/campaigns/:id
 * Delete a campaign (owner only)
 */
const deleteCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return next(new AppError('Campaign not found.', 404));
    }

    // Ensure only the owner can delete
    if (campaign.owner.toString() !== req.user._id.toString()) {
      return next(new AppError('You are not authorized to delete this campaign.', 403));
    }

    await campaign.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Campaign deleted successfully.',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
/**
 * POST /api/campaigns/:id/pledge
 * Add funds to a campaign
 */
const pledgeToCampaign = async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return next(new AppError("Invalid pledge amount", 400));
    }

    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return next(new AppError("Campaign not found", 404));
    }

    // 🔥 update raised amount
    campaign.raisedAmount = (campaign.raisedAmount || 0) + amount;

    await campaign.save();

    await campaign.populate("owner", "name email");

    res.status(200).json({
      success: true,
      message: "Pledge successful",
      data: { campaign },
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  pledgeToCampaign,
};
