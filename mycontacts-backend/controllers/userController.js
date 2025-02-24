const User = require('../models/userModel');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email is already taken' });
    }

    // Check if the username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Create a new user
    const user = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const token = user.generateAuthToken();

    // Send the response with the token and basic user info (without password)
    res.status(201).json({
      message: 'User registered successfully!',
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Error registering user:", err);  // Log the error for debugging
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = user.generateAuthToken();

    // Send the response with the token and basic user info (without password)
    res.status(200).json({
      message: 'User logged in successfully!',
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Error logging in user:", err);  // Log the error for debugging
    res.status(500).json({ message: 'Error logging in user', error: err.message });
  }
};

// Get the current user's profile (authentication required)
const getUserProfile = async (req, res) => {
  try {
    // Retrieve user info from JWT token and find the user in the database
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user profile:", err);  // Log the error for debugging
    res.status(500).json({ message: 'Error fetching user profile', error: err.message });
  }
};

// Update the current user's profile (authentication required)
const updateUserProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Find the user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;

    // Save the updated user details
    await user.save();

    // Send the updated user info (without password)
    res.status(200).json({
      message: 'User profile updated successfully!',
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Error updating user profile:", err);  // Log the error for debugging
    res.status(500).json({ message: 'Error updating user profile', error: err.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
