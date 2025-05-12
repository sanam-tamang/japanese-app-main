const axios = require('axios');
const HF_TOKEN = process.env.HF_TOKEN;

exports.askChatbot = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/rinna/japanese-gpt2-medium",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`
        },
        timeout: 20000 // to handle long responses
      }
    );

    const reply = response.data[0]?.generated_text || "No reply received.";
    res.json({ reply });

  } catch (error) {
    res.status(500).json({
      error: "Failed to get response from Hugging Face",
      details: error.message
    });
  }
};
