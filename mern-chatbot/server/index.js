require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );console.log("Groq raw response:", response.data);


    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error("Groq error:", err.response?.data || err.message);
    res.status(500).json({ error: 'Something went wrong with Groq API.' });
  }
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
