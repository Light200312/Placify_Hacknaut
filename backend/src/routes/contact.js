import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Create contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    res.status(201).json({
      message: 'Message sent successfully. We will get back to you soon!',
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all contact messages (admin only)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark as read
router.patch('/:id/read', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
