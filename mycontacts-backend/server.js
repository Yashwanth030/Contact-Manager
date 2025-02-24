// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    const dbHost = new URL(process.env.CONNECTION_STRING).hostname;
    console.log(`Database Connected: ${dbHost}`);
  })
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
