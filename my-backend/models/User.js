const mongoose = require('mongoose');

// Create a user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    username: {
      type: String,
      required: true,
      unique: true, // Ensure usernames are unique
      trim: true, // Remove whitespace
      minlength: 3, // Minimum username length
      maxlength: 30 // Maximum username length
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure emails are unique
      trim: true, // Remove whitespace
      match: [/.+@.+\..+/, 'Please enter a valid email address'] // Email format validation
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Minimum password length
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ]
    }
  },
  {
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
  }
);

// Export the User model
module.exports = mongoose.model('User', userSchema);
