import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { translateText } from '../services/api';
import type { TranslationMode, Theme } from '../types';

const { width } = Dimensions.get('window');

interface TranslatorScreenProps {
  mode: TranslationMode;
  onModeChange: (mode: TranslationMode) => void;
  onNavigate: (screen: 'translator' | 'history' | 'settings') => void;
  onAddTranslation: (original: string, translated: string) => void;
  theme: Theme;
}

export const TranslatorScreen: React.FC<TranslatorScreenProps> = ({
  mode,
  onModeChange,
  onNavigate,
  onAddTranslation,
  theme,
}) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const isDark = theme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;
  const modeColors = mode === 'female-to-male' ? colors.femaleToMale : colors.maleToFemale;

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);

    try {
      const response = await translateText(inputText, mode);
      setOutputText(response.translation);
      onAddTranslation(inputText, response.translation);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Wystąpił nieznany błąd';
      Alert.alert(
        'Błąd tłumaczenia',
        `Nie udało się przetłumaczyć tekstu: ${errorMessage}`,
        [{ text: 'OK' }]
      );
      setOutputText('');
    } finally {
      setIsTranslating(false);
    }
  };

  const toggleMode = () => {
    onModeChange(mode === 'female-to-male' ? 'male-to-female' : 'female-to-male');
    setInputText('');
    setOutputText('');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.border }]}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onNavigate('history')}
          >
            <Ionicons name="time-outline" size={24} color={themeColors.text} />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            GenderLator
          </Text>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onNavigate('settings')}
          >
            <Ionicons name="settings-outline" size={24} color={themeColors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Mode Switcher */}
          <View style={[
            styles.modeSwitcher,
            isDark ? { backgroundColor: themeColors.surface } : { backgroundColor: modeColors.secondary }
          ]}>
            <View style={styles.modeIcons}>
              <View style={[styles.modeIcon, mode === 'female-to-male' && styles.activeIcon]}>
                <MaterialCommunityIcons
                  name="face-woman"
                  size={48}
                  color={mode === 'female-to-male' ? colors.femaleToMale.accent : themeColors.textSecondary}
                />
                <Text style={[styles.modeLabel, { color: themeColors.textSecondary }]}>
                  Kobieta
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.swapButton,
                  isDark ? { backgroundColor: themeColors.background } : { backgroundColor: '#FFFFFF' }
                ]}
                onPress={toggleMode}
              >
                <Ionicons name="swap-horizontal" size={24} color={modeColors.accent} />
              </TouchableOpacity>

              <View style={[styles.modeIcon, mode === 'male-to-female' && styles.activeIcon]}>
                <MaterialCommunityIcons
                  name="face-man"
                  size={48}
                  color={mode === 'male-to-female' ? colors.maleToFemale.accent : themeColors.textSecondary}
                />
                <Text style={[styles.modeLabel, { color: themeColors.textSecondary }]}>
                  Mężczyzna
                </Text>
              </View>
            </View>

            <View style={styles.modeDescription}>
              <Text style={[styles.modeTitle, { color: modeColors.accent }]}>
                {mode === 'female-to-male' ? 'Kobieta → Mężczyzna' : 'Mężczyzna → Kobieta'}
              </Text>
              <Text style={[styles.modeSubtitle, { color: themeColors.textSecondary }]}>
                {mode === 'female-to-male'
                  ? 'Co ona naprawdę miała na myśli?'
                  : 'Co on naprawdę miał na myśli?'}
              </Text>
            </View>
          </View>

          {/* Input Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: themeColors.text }]}>
              {mode === 'female-to-male' ? 'Co powiedziała:' : 'Co powiedział:'}
            </Text>
            <View style={[
              styles.inputContainer,
              isDark ? { backgroundColor: themeColors.surface, borderColor: themeColors.border } : { backgroundColor: modeColors.accentLight }
            ]}>
              <TextInput
                style={[styles.input, { color: themeColors.text }]}
                placeholder={mode === 'female-to-male' ? 'np. "Nic mi nie jest"' : 'np. "Dobra"'}
                placeholderTextColor={themeColors.textTertiary}
                value={inputText}
                onChangeText={setInputText}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Translate Button */}
          <TouchableOpacity
            style={[
              styles.translateButton,
              { backgroundColor: modeColors.accent },
              (!inputText.trim() || isTranslating) && styles.translateButtonDisabled
            ]}
            onPress={handleTranslate}
            disabled={!inputText.trim() || isTranslating}
          >
            <View style={styles.translateButtonContent}>
              <Text style={styles.translateButtonText}>
                {isTranslating ? 'Tłumaczę...' : 'Przetłumacz'}
              </Text>
              <Ionicons name="sparkles" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </View>
          </TouchableOpacity>

          {/* Output Section */}
          {outputText ? (
            <View style={styles.section}>
              <Text style={[styles.sectionLabel, { color: themeColors.text }]}>
                {mode === 'female-to-male' ? 'Co naprawdę miała na myśli:' : 'Co naprawdę miał na myśli:'}
              </Text>
              <View style={[
                styles.outputContainer,
                isDark ? { backgroundColor: themeColors.surface, borderColor: themeColors.border } : { backgroundColor: '#FFFFFF' }
              ]}>
                <Text style={[styles.outputText, { color: themeColors.text }]}>
                  {outputText}
                </Text>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  modeSwitcher: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  modeIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  modeIcon: {
    alignItems: 'center',
    opacity: 0.5,
  },
  activeIcon: {
    opacity: 1,
  },
  modeLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  swapButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  modeDescription: {
    alignItems: 'center',
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  modeSubtitle: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  inputContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 16,
    minHeight: 120,
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    minHeight: 88,
  },
  translateButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  translateButtonDisabled: {
    opacity: 0.5,
  },
  translateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  translateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  outputContainer: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  outputText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
