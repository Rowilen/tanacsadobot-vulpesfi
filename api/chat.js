// pages/api/chat.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: 'gpt-4o',
        prompt: message,
        max_tokens: 50,
      }, {
        headers: {
          'Authorization': `Bearer sk-proj-3wlZ3rMNlcle96c8eTDBT3BlbkFJlOGkKN3ZHDwOAvwoFZaD`,
          'Content-Type': 'application/json',
        },
      });

      const botResponse = response.data.choices[0].text.trim();
      res.status(200).json({ response: botResponse });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
