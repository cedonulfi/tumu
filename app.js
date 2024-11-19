const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/chatbot', async (req, res) => {
  const userMessage = req.body.message;
  const prompt = encodeURIComponent(userMessage);
  const url = `https://text.pollinations.ai/${prompt}`;

  try {
    const response = await axios.get(url);
    const aiResponse = response.data;

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Chatbot listening at http://localhost:${port}`);
});