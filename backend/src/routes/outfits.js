const express = require('express');
const Wardrobe = require('../models/Wardrobe');
const OutfitRecommender = require('../utils/outfitRecommender');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const recommender = new OutfitRecommender();

// Get outfit recommendations
router.get('/recommendations', authenticateToken, async (req, res) => {
  try {
    const { city = 'Mumbai' } = req.query;
    const wardrobe = await Wardrobe.find({ userId: req.user.userId });
    
    const recommendations = await recommender.generateOutfits(wardrobe, city);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get outfit by ID (for saving favorite outfits)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const outfitId = req.params.id;
    // This would typically fetch from a saved outfits collection
    // For now, we'll return a placeholder
    res.json({ message: 'Outfit details would be here', outfitId });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;