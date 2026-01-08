import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SplashScreen } from './src/screens/SplashScreen';
import { TranslatorScreen } from './src/screens/TranslatorScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import type { TranslationMode, Theme, Translation } from './src/types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'translator' | 'history' | 'settings'>('splash');
  const [translationMode, setTranslationMode] = useState<TranslationMode>('female-to-male');
  const [theme, setTheme] = useState<Theme>('light');
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    loadSavedData();
  }, []);

  // Save translations when they change
  useEffect(() => {
    if (isReady) {
      saveTranslations();
    }
  }, [translations]);

  // Save theme when it changes
  useEffect(() => {
    if (isReady) {
      saveTheme();
    }
  }, [theme]);

  const loadSavedData = async () => {
    try {
      const savedTranslations = await AsyncStorage.getItem('translations');
      const savedTheme = await AsyncStorage.getItem('theme');
      
      if (savedTranslations) {
        setTranslations(JSON.parse(savedTranslations));
      }
      if (savedTheme) {
        setTheme(savedTheme as Theme);
      }
      setIsReady(true);
    } catch (error) {
      console.error('Error loading saved data:', error);
      setIsReady(true);
    }
  };

  const saveTranslations = async () => {
    try {
      await AsyncStorage.setItem('translations', JSON.stringify(translations));
    } catch (error) {
      console.error('Error saving translations:', error);
    }
  };

  const saveTheme = async () => {
    try {
      await AsyncStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('translator');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const addTranslation = (original: string, translated: string) => {
    const newTranslation: Translation = {
      id: Date.now().toString(),
      mode: translationMode,
      original,
      translated,
      timestamp: Date.now(),
    };
    setTranslations(prev => [newTranslation, ...prev]);
  };

  const clearTranslations = () => {
    setTranslations([]);
  };

  if (!isReady) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {currentScreen === 'splash' && <SplashScreen />}
      
      {currentScreen === 'translator' && (
        <TranslatorScreen
          mode={translationMode}
          onModeChange={setTranslationMode}
          onNavigate={setCurrentScreen}
          onAddTranslation={addTranslation}
          theme={theme}
        />
      )}
      
      {currentScreen === 'history' && (
        <HistoryScreen
          translations={translations}
          onNavigate={setCurrentScreen}
          onClearHistory={clearTranslations}
          theme={theme}
        />
      )}
      
      {currentScreen === 'settings' && (
        <SettingsScreen
          theme={theme}
          onThemeChange={setTheme}
          onNavigate={setCurrentScreen}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
