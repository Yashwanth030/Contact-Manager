// models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Makes the field required
    unique: true,   // Makes it unique
  },
  password: {
    type: String,
    required: true, // Makes the field required
  },
  email: {
    type: String,
    required: true,
    unique: true, // Makes email unique
  },
  profilePicture: {
    type: String, // URL of the user's profile picture
    default: 'default-profile-picture.png',
  },
});

// Password hashing before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10); // Hash the password
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.isPasswordValid = async function (password) {
  return bcrypt.compare(password, this.password); // Compare password
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
