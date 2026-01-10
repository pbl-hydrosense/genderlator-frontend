import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import type { Translation, Theme } from '../types';

interface HistoryScreenProps {
  translations: Translation[];
  onNavigate: (screen: 'translator' | 'history' | 'settings') => void;
  onClearHistory: () => void;
  theme: Theme;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  translations,
  onNavigate,
  onClearHistory,
  theme,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isDark = theme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Teraz';
    if (minutes < 60) return `${minutes} min temu`;
    if (hours < 24) return `${hours} godz. temu`;
    return `${days} dni temu`;
  };

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
          Historia tłumaczeń
        </Text>
        
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {translations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color={themeColors.textSecondary} style={styles.emptyIcon} />
            <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
              Brak historii tłumaczeń
            </Text>
            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: colors.maleToFemale.accent }]}
              onPress={() => onNavigate('translator')}
            >
              <Text style={styles.startButtonText}>Rozpocznij tłumaczenie</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {translations.length > 0 && (
              <TouchableOpacity
                style={[styles.clearButton, { backgroundColor: isDark ? colors.dark.surface : '#FEE2E2' }]}
                onPress={onClearHistory}
              >
                <View style={styles.clearButtonContent}>
                  <Ionicons name="trash-outline" size={18} color="#DC2626" />
                  <Text style={[styles.clearButtonText, { color: '#DC2626' }]}>
                    Wyczyść historię
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            
            <View style={styles.translationsList}>
              {translations.map((translation) => {
                const isFemaleToMale = translation.mode === 'female-to-male';
                const isExpanded = expandedId === translation.id;
                const modeColors = isFemaleToMale ? colors.femaleToMale : colors.maleToFemale;

                return (
                  <TouchableOpacity
                    key={translation.id}
                    style={styles.translationItem}
                    onPress={() => toggleExpand(translation.id)}
                    activeOpacity={0.7}
                  >
                    {/* Original message */}
                    <View style={[
                      styles.messageContainer,
                      { alignSelf: isFemaleToMale ? 'flex-start' : 'flex-end' }
                    ]}>
                      <View style={[
                        styles.messageBubble,
                        isDark
                          ? { backgroundColor: isFemaleToMale ? 'rgba(233, 30, 99, 0.2)' : 'rgba(25, 118, 210, 0.2)' }
                          : { backgroundColor: modeColors.accentLight }
                      ]}>
                        <View style={styles.messageHeader}>
                          <MaterialCommunityIcons 
                            name={isFemaleToMale ? 'face-woman' : 'face-man'} 
                            size={20} 
                            color={isFemaleToMale ? colors.femaleToMale.accent : colors.maleToFemale.accent} 
                          />
                          <Text style={[styles.messageTime, { color: themeColors.textSecondary }]}>
                            {formatTime(translation.timestamp)}
                          </Text>
                        </View>
                        <Text style={[styles.messageText, { color: themeColors.text }]}>
                          {translation.original}
                        </Text>
                      </View>
                    </View>

                    {/* Translated message */}
                    {isExpanded && (
                      <View style={[
                        styles.messageContainer,
                        { alignSelf: isFemaleToMale ? 'flex-end' : 'flex-start', marginTop: 12 }
                      ]}>
                        <View style={[
                          styles.messageBubble,
                          isDark
                            ? { backgroundColor: isFemaleToMale ? 'rgba(25, 118, 210, 0.2)' : 'rgba(233, 30, 99, 0.2)' }
                            : { backgroundColor: isFemaleToMale ? colors.maleToFemale.secondary : colors.femaleToMale.secondary }
                        ]}>
                          <View style={styles.messageHeader}>
                            <MaterialCommunityIcons 
                              name={isFemaleToMale ? 'face-man' : 'face-woman'} 
                              size={20} 
                              color={isFemaleToMale ? colors.maleToFemale.accent : colors.femaleToMale.accent} 
                            />
                            <Text style={[styles.messageTime, { color: themeColors.textSecondary }]}>
                              Tłumaczenie
                            </Text>
                          </View>
                          <Text style={[styles.messageText, { color: themeColors.text }]}>
                            {translation.translated}
                          </Text>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
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
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  startButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  clearButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  translationsList: {
    gap: 16,
  },
  translationItem: {
    marginBottom: 8,
  },
  messageContainer: {
    maxWidth: '80%',
  },
  messageBubble: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  messageTime: {
    fontSize: 12,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
