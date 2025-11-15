// SAHI IMPORT: 'node-nlp' se 'NlpManager' ko import karein
const { NlpManager } = require('node-nlp');
const fs = require('fs');

async function trainModel() {
    console.log('Naye dataset se training shuru ho rahi hai (using node-nlp)...');

    const nlp = new NlpManager({ languages: ['en'], forceNER: true });

    // 1. Dataset (intents.json) ko load karein
    const data = fs.readFileSync('./data/intents.json', 'utf8');
    const intentsData = JSON.parse(data);
    console.log('Naya intents.json se data load ho gaya hai.');

    // 2. Data ko model mein add karein
    // Naye format ke hisaab se loop ko update kiya gaya hai
    for (const intent of intentsData.intents) {

        // 'patterns' ki jagah 'text' se sawaal add karein
        for (const pattern of intent.text) {
            nlp.addDocument('en', pattern, intent.intent); // 'intent.tag' ki jagah 'intent.intent'
        }

        // 'responses' se jawaab add karein
        for (const response of intent.responses) {
            nlp.addAnswer('en', intent.intent, response); // 'intent.tag' ki jagah 'intent.intent'
        }
    }

    console.log('Training shuru ho rahi hai...');

    // 3. Model ko train karein
    await nlp.train();

    console.log('Model train ho chuka hai!');

    // 4. Model ko file mein save karein
    if (!fs.existsSync('./model')) {
        fs.mkdirSync('./model');
    }

    nlp.save('./model/chatbot-model.json');

    console.log('Naya trained model ./model/chatbot-model.json par save ho gaya hai.');
}

// Function ko call karein
trainModel();