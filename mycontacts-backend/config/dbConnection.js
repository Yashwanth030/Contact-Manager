const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    // Connecting to MongoDB without deprecated options
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);  // Exit the process if the connection fails
  }
};

module.exports = connectDb;
