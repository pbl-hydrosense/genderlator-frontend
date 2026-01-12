import type { TranslationMode } from '../types';

// Configuration - Add your Google AI API key here
// You can get an API key from: https://makersuite.google.com/app/apikey
// Using EXPO_PUBLIC_ prefix for runtime access
const GOOGLE_AI_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY || '';
const GOOGLE_AI_MODEL = process.env.EXPO_PUBLIC_GOOGLE_AI_MODEL || 'gemini-flash-latest';
const GOOGLE_AI_TEMPERATURE = parseFloat(process.env.EXPO_PUBLIC_GOOGLE_AI_TEMPERATURE || '1.3');

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

Translate everything to polish language.

Examples:
Input: "Nie jestem zła"
Output: "Jestem bardzo zła i czekam, aż sam się domyślisz dlaczego."

Input: "Rób co chcesz"
Output: "Jest jedna dobra opcja. Zgaduj."

Input: "Nic mi nie jest"
Output: "Wszystko mi jest, ale nie powiem co."

Input: "Może później"
Output: "Nie teraz i prawdopodobnie nigdy."

Input: "Nie jestem taka jak inne"
Output: "Jestem dokładnie taka, ale chcę być wyjątkiem."`,

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

Translate everything to polish language.

Examples:
Input: "Spokojnie, to się ogarnie"
Output: "Nie mam planu."

Input: "Zaraz to zrobię"
Output: "Nie zrobię tego teraz."

Input: "Znam drogę"
Output: "Nie sprawdziłem mapy."

Input: "Jak chcesz"
Output: "Nie chcę się kłócić."

Input: "Idę oglądać mecz"
Output: "Przez 90 minut mnie nie ma."`,
};

export interface TranslationResponse {
  translation: string;
  mode: TranslationMode;
  originalText: string;
}

export interface TranslationError {
  error: string;
  message?: string;
  details?: string;
}

/**
 * Translates text using Google Gemini API directly
 */
export async function translateText(
  text: string,
  mode: TranslationMode
): Promise<TranslationResponse> {
  // Validation
  if (!text || typeof text !== 'string') {
    throw new Error('Missing or invalid text');
  }

  if (!mode || !['female-to-male', 'male-to-female'].includes(mode)) {
    throw new Error('Invalid mode. Must be "female-to-male" or "male-to-female"');
  }

  if (!GOOGLE_AI_API_KEY || GOOGLE_AI_API_KEY === '') {
    throw new Error('API key not configured. Please add your Google AI API key to .env file.');
  }

  try {
    // Call Google AI API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GOOGLE_AI_MODEL}:generateContent?key=${GOOGLE_AI_API_KEY}`;

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
        temperature: GOOGLE_AI_TEMPERATURE,
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
      throw new Error(`Translation service error: ${response.status}`);
    }

    const data = await response.json();

    // Extract the translation from the response
    const translation = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!translation) {
      throw new Error('No translation received from AI');
    }

    // Return the translation
    return {
      translation,
      mode,
      originalText: text,
    };
  } catch (error) {
    console.error('Translation error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Internal error during translation');
  }
}

/**
 * Checks if the API is properly configured
 */
export async function checkApiHealth(): Promise<boolean> {
  return GOOGLE_AI_API_KEY !== '';
}

/**
 * Gets the API key status (configured or not)
 */
export function isApiConfigured(): boolean {
  return GOOGLE_AI_API_KEY !== '';
}
