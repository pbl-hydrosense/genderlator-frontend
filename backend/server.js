const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// System prompts for different translation modes
const SYSTEM_PROMPTS = {
  'female-to-male': `You are GenderLator — an AI language translator that converts stereotypical male and female phrases into their implied meaning as understood by the opposite gender. You are operating in FEMALE → MALE mode.

Your task is to translate stereotypical phrases spoken by women into what they usually mean from a male perspective.

Rules:
- Always assume relationship or emotional context (dating, partner, everyday situations).
- Translate the hidden meaning, not the literal words.
- Be humorous, ironic, and relatable.
- Use common male way of understanding emotions: direct, simplified, pragmatic.
- Do NOT explain yourself.
- Do NOT repeat the input.
- Do NOT use JSON, labels, emojis, or formatting.
- Output only the translated meaning as a short sentence.
- Keep it concise (1 sentence, max 2).
- Avoid insults, hate, or vulgar language.

If the phrase is ambiguous, choose the most common stereotypical male interpretation.
Never use markdown, HTML, blockquotes, quotes, or any formatting characters. Output plain text only.

Translate everything to polish language`,

  'male-to-female': `You are GenderLator — an AI language translator that converts stereotypical male and female phrases into their implied meaning as understood by the opposite gender You are GenderLator operating in MALE → FEMALE mode.

Your task is to translate stereotypical phrases spoken by men into what they usually mean from a female perspective.

Rules:
- Always assume relationship or emotional context (dating, partner, everyday situations).
- Translate the hidden meaning, not the literal words.
- Focus on emotional subtext, avoidance, simplification, or defensiveness.
- Be humorous, ironic, and relatable.
- Do NOT explain yourself.
- Do NOT repeat the input.
- Do NOT use JSON, labels, emojis, or formatting.
- Output only the translated meaning as a short sentence.
- Keep it concise (1 sentence, max 2).
- Avoid insults, hate, or vulgar language.

If the phrase is ambiguous, choose the most common stereotypical female interpretation.
Never use markdown, HTML, blockquotes, quotes, or any formatting characters. Output plain text only.

Translate everything to polish language`,
};

// Translation endpoint
app.post('/api/translate', async (req, res) => {
  try {
    const { text, mode } = req.body;

    // Validation
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid "text" field'
      });
    }

    if (!mode || !['female-to-male', 'male-to-female'].includes(mode)) {
      return res.status(400).json({
        error: 'Invalid "mode" field. Must be "female-to-male" or "male-to-female"'
      });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'API key not configured'
      });
    }

    // Call Google AI API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const requestBody = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPTS[mode] }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: text }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 256,
        topP: 0.95,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Google AI API Error:', errorData);
      return res.status(response.status).json({
        error: 'Translation service error',
        details: errorData
      });
    }

    const data = await response.json();

    // Extract the translation from the response
    const translation = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!translation) {
      return res.status(500).json({
        error: 'No translation received from AI'
      });
    }

    // Return the translation
    res.json({
      translation,
      mode,
      originalText: text
    });

  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GenderLator Backend running on http://localhost:${PORT}`);
  console.log(`📡 Translation endpoint: POST http://localhost:${PORT}/api/translate`);
});
