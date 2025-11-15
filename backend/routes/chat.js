const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Hamara auth middleware
const Message = require('../model/Message'); // Message model
const { getBotResponse } = require('../nlp-manager'); // Bot ka brain

// --- Naye message ke liye (Logged-in User) ---
// Yeh route protected hai aur history save karega
router.post('/', auth, async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user.id; // Token se user ID mili

        // 1. User ke message ko DB mein save karein
        const userMessage = new Message({ userId, sender: 'user', text: message });
        await userMessage.save();

        // 2. Bot ka response generate karein
        const botResponseText = await getBotResponse(message);

        // 3. Bot ke response ko DB mein save karein
        const botMessage = new Message({ userId, sender: 'bot', text: botResponseText });
        await botMessage.save();

        res.json({ response: botResponseText });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- Chat history ke liye (Logged-in User) ---
// Yeh route protected hai
router.get('/history', auth, async (req, res) => {
    try {
        const messages = await Message.find({ userId: req.user.id }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- Anonymous User ke liye (Not Logged-in) ---
// Yeh route public hai aur history save NAHI karega
router.post('/anonymous', async (req, res) => {
    try {
        const { message } = req.body;
        const botResponseText = await getBotResponse(message);
        res.json({ response: botResponseText });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;