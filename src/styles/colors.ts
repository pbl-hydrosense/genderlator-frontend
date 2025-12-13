export const colors = {
  // Female to Male mode colors
  femaleToMale: {
    primary: '#FFB3C1',
    secondary: '#FFF5F7',
    accent: '#E91E63',
    accentLight: '#FCE4EC',
    gradient: ['#FFF5F7', '#FFE4E9'],
  },
  
  // Male to Female mode colors
  maleToFemale: {
    primary: '#64B5F6',
    secondary: '#E3F2FD',
    accent: '#1976D2',
    accentLight: '#BBDEFB',
    gradient: ['#E3F2FD', '#BBDEFB'],
  },
  
  // Light theme
  light: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    border: '#E5E7EB',
    text: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
  },
  
  // Dark theme
  dark: {
    background: '#111827',
    surface: '#1F2937',
    border: '#374151',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    textTertiary: '#9CA3AF',
  },
  
  // Splash screen gradient
  splash: {
    gradient: ['#1976D2', '#64B5F6', '#E91E63'] as const,
  },
};
