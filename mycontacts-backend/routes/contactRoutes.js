// routes/contactRoutes.js
const express = require('express');
const authenticateToken = require('../middleware/authenticateToken'); // Add authentication middleware
const Contact = require('../models/contactModel');
const router = express.Router();

// Create Contact
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = new Contact({ name, email, phone, user: req.user.id });
    await newContact.save();
    res.status(201).json({ message: 'Contact created successfully', contact: newContact });
  } catch (err) {
    res.status(500).json({ message: 'Error creating contact', error: err.message });
  }
});

// Get All Contacts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    if (!contacts.length) {
      return res.status(404).json({ message: 'No contacts found' });
    }
    res.status(200).json({ contacts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts', error: err.message });
  }
});

// Get Contact by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user.id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found or no permission' });
    }
    res.status(200).json({ contact });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contact', error: err.message });
  }
});

// Update Contact
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user.id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found or no permission' });
    }
    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;
    await contact.save();
    res.status(200).json({ message: 'Contact updated successfully', contact });
  } catch (err) {
    res.status(500).json({ message: 'Error updating contact', error: err.message });
  }
});

// Delete Contact
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found or no permission' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact', error: err.message });
  }
});

module.exports = router;
