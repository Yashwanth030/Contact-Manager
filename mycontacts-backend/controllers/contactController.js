const Contact = require('../models/contactModel');

// Get all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts', error: err.message });
  }
};

// Add new contact
const addContact = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const newContact = new Contact({ name, phone, email });
    await newContact.save();
    res.status(201).json({ message: 'Contact added successfully', contact: newContact });
  } catch (err) {
    res.status(500).json({ message: 'Error adding contact', error: err.message });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact updated successfully', contact: updatedContact });
  } catch (err) {
    res.status(500).json({ message: 'Error updating contact', error: err.message });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact', error: err.message });
  }
};

module.exports = { getContacts, addContact, updateContact, deleteContact };
