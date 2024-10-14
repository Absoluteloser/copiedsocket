const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get messages (optional)
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Save message (optional)
router.post('/', async (req, res) => {
    const { content, sender } = req.body;

    const message = new Message({ content, sender });
    try {
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
