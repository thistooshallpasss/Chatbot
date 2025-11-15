const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    // Yeh 'User' model se link karega
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sender: {
        type: String,
        enum: ['user', 'bot'],
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Message', MessageSchema);