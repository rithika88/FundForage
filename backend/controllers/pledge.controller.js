// const Campaign = require("../models/campaign.model");
// const Pledge = require("../models/pledge.model");

// const createPledge = async (req, res, next) => {
//     try {
//         const { campaignId, amount } = req.body;

//         if (!campaignId || !amount) {
//             return res.status(400).json({ message: "Missing data" });
//         }

//         const campaign = await Campaign.findById(campaignId);
//         if (!campaign) {
//             return res.status(404).json({ message: "Campaign not found" });
//         }

//         // 🔥 Create pledge
//         const pledge = await Pledge.create({
//             user: req.user._id,
//             campaign: campaignId,
//             amount,
//         });

//         // 🔥 Update campaign
//         campaign.raisedAmount += amount;
//         campaign.backersCount += 1;

//         await campaign.save();

//         res.status(201).json({
//             success: true,
//             data: { pledge },
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// module.exports = { createPledge };



const Campaign = require("../models/campaign.model");
const Pledge = require("../models/pledge.model");

const createPledge = async (req, res, next) => {
    try {
        const { campaignId, amount } = req.body;

        // 🔒 Validate input
        if (!campaignId || !amount || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid campaign or amount",
            });
        }

        // 🔍 Find campaign
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: "Campaign not found",
            });
        }

        // 🔒 Stop funding if goal reached
        if (campaign.raisedAmount >= campaign.goalAmount) {
            return res.status(400).json({
                success: false,
                message: "Funding goal already reached",
            });
        }

        // 🔒 Prevent overfunding
        if (campaign.raisedAmount + amount > campaign.goalAmount) {
            return res.status(400).json({
                success: false,
                message: "Amount exceeds campaign goal",
            });
        }

        // 🔍 Check if this user already pledged
        const existingPledge = await Pledge.findOne({
            campaign: campaignId,
            user: req.user._id,
        });

        // 🔥 Create pledge
        const pledge = await Pledge.create({
            user: req.user._id,
            campaign: campaignId,
            amount,
        });

        // 💰 Always update total raised
        campaign.raisedAmount += amount;

        // 👥 Only count unique backers
        if (!existingPledge) {
            campaign.backersCount += 1;
        }

        // ✅ Mark completed if goal reached
        if (campaign.raisedAmount >= campaign.goalAmount) {
            campaign.status = "completed";
        }

        await campaign.save();

        res.status(201).json({
            success: true,
            message: "Pledge successful",
            data: { pledge },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { createPledge };