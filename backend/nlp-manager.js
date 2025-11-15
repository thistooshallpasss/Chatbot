// SAHI IMPORT: 'node-nlp' se 'NlpManager' ko import karein
const { NlpManager } = require('node-nlp');
const fs = require('fs');

const modelPath = './model/chatbot-model.json';

// 'Nlp' ki jagah 'NlpManager' ka istemal karein
const nlp = new NlpManager({ languages: ['en'], forceNER: true });

// Model ko seedhe load karein
if (fs.existsSync(modelPath)) {
    try {
        nlp.load(modelPath);
        console.log('Trained model loaded from', modelPath);
    } catch (error) {
        console.error('Error loading model:', error);
    }
} else {
    console.error('ERROR: Model file not found!', modelPath);
    console.error('Pehle "npm run train" command chalayein.');
}

// Ek function banayein jo message process karega
async function getBotResponse(message) {
    if (!message) {
        return 'Please say something.';
    }

    try {
        // Model ko process karein
        const response = await nlp.process('en', message);

        // Agar bot ko koi answer milta hai
        if (response.answer) {
            return response.answer;
        }

        // Agar bot ko kuch samajh nahi aata
        return "I'm sorry, I don't understand that.";
    } catch (error) {
        console.error('Error processing message:', error);
        return 'There was an error on my side.';
    }
}

// Function ko export karein
module.exports = {
    getBotResponse
};