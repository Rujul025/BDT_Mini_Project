const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Ensure the correct path to your Product model

// Fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// Fetch products with filters
router.post('/filter', async (req, res) => {
    const filters = req.body.filters || {};  // Filters from request body
    console.log("Received Filters:", filters);
    const query = {};  

    // Handle category filter
    if (filters.category) {
        query.category = filters.category; // Filter based on category
    }

    // Handle price filters
    if (filters.price) {
        const { min, max } = filters.price;
        if (min && min.trim() !== '') {
            query.price = query.price || {}; // Initialize price object only if needed
            query.price['$gte'] = Number(min); // Set minimum price if provided
        }
        if (max && max.trim() !== '') {
            query.price = query.price || {}; // Ensure price object is initialized
            query.price['$lte'] = Number(max); // Set maximum price if provided
        }
    }

    // Handle brand filter
    if (filters.brand && filters.brand.trim() !== '') {
        query.brand = { '$in': [filters.brand] }; 
    }

    // Dynamically handle specifications filters
    const specs = filters.specifications || {};
    Object.keys(specs).forEach(key => {
        const value = specs[key];
        if (value !== undefined && value !== '') {
            if (key === 'color' && Array.isArray(value) && value.length > 0) {
                // Only add color filter if it's not an empty array
                query[`specifications.${key}`] = { $in: value };
            } else if (typeof value === 'object' && value.min !== undefined && value.max !== undefined) {
                // Handle range-based filters (e.g., batteryLife, weight)
                query[`specifications.${key}`] = {};
                if (value.min !== '') query[`specifications.${key}`]['$gte'] = parseInt(value.min, 10);
                if (value.max !== '') query[`specifications.${key}`]['$lte'] = parseInt(value.max, 10);
            } else {
                // For direct value filters
                query[`specifications.${key}`] = value;
            }
        }
    });

    // Log the constructed query to verify
    console.log("Constructed Query:", query);

    try {
        // Fetch products based on the query
        const products = await Product.find(query);
        res.status(200).json(products);  // Return the filtered products
    } catch (error) {
        console.error('Error fetching filtered products:', error);
        res.status(500).json({ error: 'Error fetching filtered products' });
    }
});


// Export the router
module.exports = router;
