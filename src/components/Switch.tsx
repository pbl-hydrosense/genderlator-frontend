import React from 'react';
import { View, Text, Switch as RNSwitch, StyleSheet } from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  isDark?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
  isDark = false,
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, isDark && styles.labelDark]}>
          {label}
        </Text>
      )}
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D1D5DB', true: '#64B5F6' }}
        thumbColor={value ? '#1976D2' : '#F9FAFB'}
        ios_backgroundColor="#D1D5DB"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: '#111827',
    marginRight: 12,
  },
  labelDark: {
    color: '#F9FAFB',
  },
});
