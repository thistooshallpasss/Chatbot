const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User'); // Path check kar lein
const auth = require('../middleware/auth'); // Auth middleware import karein

// --- Register Route (Updated) ---
router.post('/register', async (req, res) => {
    // 'name' ko req.body se lein
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        // Naye user mein 'name' save karein
        user = new User({ name, email, password });
        await user.save();

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// // --- Login Route (No Change) ---
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }

//         const payload = { user: { id: user.id } };
//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// --- Login Route (Updated with Debugging) ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // --- DEBUGGING START ---
    console.log('--- Login Attempt Received ---');
    console.log('Attempting login for email:', email);
    // --- DEBUGGING END ---

    try {
        // FIX: Email ko hamesha lowercase mein check karein
        let user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            // --- DEBUGGING START ---
            console.log('Login Error: User not found in database.');
            console.log('------------------------------');
            // --- DEBUGGING END ---
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // --- DEBUGGING START ---
        console.log('Login Info: User found in database:', user.email);
        // --- DEBUGGING END ---

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // --- DEBUGGING START ---
            // YEH SABSE ZAROORI HAI
            console.log('Login Error: Password Mismatch!');
            console.log('Password from frontend:', password);
            console.log('Hashed password from DB:', user.password);
            console.log('------------------------------');
            // --- DEBUGGING END ---
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // --- DEBUGGING START ---
        console.log('Login Success: Password matched.');
        // --- DEBUGGING END ---

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' }, (err, token) => {
            if (err) throw err;

            // --- DEBUGGING START ---
            console.log('Login Success: Token generated.');
            console.log('------------------------------');
            // --- DEBUGGING END ---

            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// --- YEH NAYA ROUTE ADD KAREIN (Get Logged-in User) ---
router.get('/me', auth, async (req, res) => {
    try {
        // req.user.id middleware se aa raha hai
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;