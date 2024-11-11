const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator'); // For validation
const User = require('../models/User');

const router = express.Router();

// Register a new user (Sign up)
router.post(
  '/signup',
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage('Username is required'),
    check('email')
      .isEmail()
      .withMessage('Valid email is required'), // Email validation
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
      .withMessage('Password must contain uppercase, lowercase, number, and special character'),
    check('confirmPassword')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match'),
    check('firstName')
      .not()
      .isEmpty()
      .withMessage('First name is required'),
    check('lastName')
      .not()
      .isEmpty()
      .withMessage('Last name is required')
  ],
  async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body;

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user exists by username or email
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword, firstName, lastName });
      await newUser.save();

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during signup:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Login user
router.post(
  '/login',
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage('Username is required'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('Password is required')
  ],
  async (req, res) => {
    const { username, password } = req.body;

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret missing in server configuration' });
      }

      // Generate the JWT token
      // Generate JWT token with the user's _id and an expiration of 1 hour
      const token = jwt.sign(
        { id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.json({
        token,
        user: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      });
    } catch (error) {
      console.error('Error during login:', error.message);
      return res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }
);

// Export the router
module.exports = router;
