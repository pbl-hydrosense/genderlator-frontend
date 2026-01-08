import type { TranslationMode } from '../types';

// Configuration - change this to your backend URL
// For local development with Android emulator use: http://10.0.2.2:3001
// For local development with iOS simulator use: http://localhost:3001
// For physical device use your computer's local IP: http://192.168.x.x:3001
const API_BASE_URL = __DEV__
  ? 'http://localhost:3001'
  : 'https://your-production-api.com';

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
 * Translates text using the GenderLator AI backend
 */
export async function translateText(
  text: string,
  mode: TranslationMode
): Promise<TranslationResponse> {
  const response = await fetch(`${API_BASE_URL}/api/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, mode }),
  });

  if (!response.ok) {
    const errorData: TranslationError = await response.json().catch(() => ({
      error: 'Unknown error occurred',
    }));
    throw new Error(errorData.error || `HTTP error: ${response.status}`);
  }

  const data: TranslationResponse = await response.json();
  return data;
}

/**
 * Checks if the backend API is available
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Gets the configured API base URL
 */
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}
