import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Switch } from '../components/Switch';
import { colors } from '../styles/colors';
import type { Theme } from '../types';

interface SettingsScreenProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onNavigate: (screen: 'translator' | 'history' | 'settings') => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  theme,
  onThemeChange,
  onNavigate,
}) => {
  const isDark = theme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.border }]}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onNavigate('translator')}
        >
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: themeColors.text }]}>
          Ustawienia
        </Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Theme Settings */}
        <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <View style={styles.cardContent}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name={isDark ? 'moon' : 'sunny'} size={24} color={isDark ? '#F59E0B' : '#F97316'} />
                <View>
                  <Text style={[styles.settingTitle, { color: themeColors.text }]}>
                    Tryb ciemny
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: themeColors.textSecondary }]}>
                    {isDark ? 'Włączony' : 'Wyłączony'}
                  </Text>
                </View>
              </View>
              <Switch
                value={isDark}
                onValueChange={(checked) => onThemeChange(checked ? 'dark' : 'light')}
                isDark={isDark}
              />
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <View style={styles.cardContent}>
            <View style={styles.aboutHeader}>
              <Ionicons name="information-circle-outline" size={24} color={themeColors.textSecondary} />
              <Text style={[styles.aboutTitle, { color: themeColors.text }]}>
                O aplikacji
              </Text>
            </View>

            <Text style={[styles.aboutText, { color: themeColors.textSecondary }]}>
              GenderLator to żartobliwy translator „języka" kobiet i mężczyzn.
              Aplikacja tłumaczy stereotypowe wypowiedzi w sposób humorystyczny.
            </Text>

            <Text style={[styles.aboutText, { color: themeColors.textSecondary, marginTop: 12 }]}>
              To tylko zabawa! Nie bierz tłumaczeń na poważnie.
            </Text>

            <View style={[styles.divider, { backgroundColor: themeColors.border }]} />

            <Text style={[styles.version, { color: themeColors.textTertiary }]}>
              Wersja 1.0.0
            </Text>
          </View>
        </View>

        {/* Credits */}
        <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <View style={styles.cardContent}>
            <View style={styles.aboutHeader}>
              <Ionicons name="heart" size={24} color="#EC4899" />
              <Text style={[styles.aboutTitle, { color: themeColors.text }]}>
                Podziękowania
              </Text>
            </View>

            <Text style={[styles.aboutText, { color: themeColors.textSecondary }]}>
              Stworzone z humorem i miłością do różnic między płciami.
            </Text>

            <Text style={[styles.aboutText, { color: themeColors.textSecondary, marginTop: 12 }]}>
              Pamiętaj: mężczyźni i kobiety są różni, ale każdy z nas jest wyjątkowy!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    gap: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    padding: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  aboutText: {
    fontSize: 15,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  version: {
    fontSize: 13,
  },
});
