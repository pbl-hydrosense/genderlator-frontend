export type TranslationMode = 'female-to-male' | 'male-to-female';
export type Theme = 'light' | 'dark';

export interface Translation {
  id: string;
  mode: TranslationMode;
  original: string;
  translated: string;
  timestamp: number;
}
