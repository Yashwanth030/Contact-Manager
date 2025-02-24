const mongoose = require('mongoose');

// Define the contact schema
const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  // Reference to the 'User' model using ObjectId (relational link)
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
}, { timestamps: true });

// Create and export the Contact model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
