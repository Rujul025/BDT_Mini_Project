const Product = require('../models/Product');

// Controller to get products by category and filters
const getProducts = async (req, res) => {
  const { category } = req.params; // Get category from URL parameters
  const filters = req.body; // Get filters from request body

  try {
    // Build query based on filters
    let query = { category }; // Start with the category filter

    // Add any other filters here, e.g., price range, brand, etc.
    if (filters.priceRange) {
      query.price = { $gte: filters.priceRange.min, $lte: filters.priceRange.max };
    }

    const products = await Product.find(query);
    res.json(products); // Send the product list as a response
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProducts };
