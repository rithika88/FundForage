const express = require('express');
const router = express.Router();
const {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  pledgeToCampaign,
} = require('../controllers/campaign.controller');
const { protect } = require('../middleware/auth.middleware');

// Public routes
router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);

// Protected routes (require JWT)
router.post('/', protect, createCampaign);
router.put('/:id', protect, updateCampaign);
router.delete('/:id', protect, deleteCampaign);
router.post('/:id/pledge', protect, pledgeToCampaign);
module.exports = router;
