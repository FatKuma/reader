const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// Home page route
router.get('/', (req, res) => {
  res.render('index', { title: 'AI Reader' });
});

// Chat page route
router.get('/chat', (req, res) => {
  res.render('chat', { title: 'Chat with Qwen' });
});

// API endpoint for Qwen model
router.post('/api/qwen', async (req, res) => {
    const userQuery = req.body.query;

    try {
        const openai = new OpenAI({
            apiKey: process.env.ALIYUN_API_KEY,
            baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
        });

        const completion = await openai.chat.completions.create({
            model: "qwen-plus",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userQuery }
            ],
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error(`Error message: ${error}`);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// Upload page route
router.get('/upload', (req, res) => {
  res.render('upload', { title: 'Upload TXT File' });
});

// API endpoint for file upload
router.post('/api/upload', (req, res) => {
  const file = req.files.txtFile;
  const content = file.data.toString('utf8');
  
  // Extract dialogs from the content
  const dialogs = extractDialogs(content);
  
  // Convert dialogs to CSV format
  const csvContent = convertToCSV(dialogs);
  
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=dialogs.csv');
  res.send(csvContent);
});

// Function to extract dialogs from text
function extractDialogs(text) {
  // Implement dialog extraction logic here
  return [];
}

// Function to convert dialogs to CSV
function convertToCSV(dialogs) {
  // Implement CSV conversion logic here
  return '';
}

module.exports = router;
