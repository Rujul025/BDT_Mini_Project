const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const authenticateToken = require('../middleware/authenticateToken'); // JWT authentication middleware

// POST: Add product to wishlist
router.post('/', authenticateToken, async (req, res) => {
  const { productId, name, category, brand, price, specifications, features, ratings, availability, image } = req.body;
  const userId = req.user._id;

  try {
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [{ productId, name, category, brand, price, specifications, features, ratings, availability, image }] });
    } else {
      wishlist.products.push({ productId, name, category, brand, price, specifications, features, ratings, availability, image });
    }
    await wishlist.save();
    res.status(200).json({ message: 'Product added to wishlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add product to wishlist' });
  }
});

// GET: Get user's wishlist
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate('products.productId');
    if (!wishlist) {
      return res.status(404).json({ message: 'No wishlist found' });
    }
    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve wishlist' });
  }
});

module.exports = router;
