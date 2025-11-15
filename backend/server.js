require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Bot ke brain ko yahan import karein (taaki yeh ek baar load ho)
require('./nlp-manager');

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL // Hum environment variable ka istemal karenge
}));
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB successfully connect ho gaya.'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---
// Sabhi auth routes ko '/api/auth' par direct karein
app.use('/api/auth', require('./routes/auth'));

// Sabhi chat routes ko '/api/chat' par direct karein
app.use('/api/chat', require('./routes/chat'));


// Server ko start karein
app.listen(port, () => {
    console.log(`Backend server http://localhost:${port} par chal raha hai`);
});