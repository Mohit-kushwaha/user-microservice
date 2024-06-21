const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true, 
  },
  interest: {
    type: [String], 
  },
  age: {
    type: Number,
    min: 0, 
  },
  mobile: {
    type: Number, 
  },
  email: {
    type: String,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Basic email format validation

  }
}, {
  timestamps: true
});

// Create index for email 
userSchema.index({ email: 1 });

// Create User model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
