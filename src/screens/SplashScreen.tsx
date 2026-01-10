import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const { width } = Dimensions.get('window');

export const SplashScreen: React.FC = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const titleFadeAnim = useRef(new Animated.Value(0)).current;
  const taglineFadeAnim = useRef(new Animated.Value(0)).current;
  const dotsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Title animation
    Animated.timing(titleFadeAnim, {
      toValue: 1,
      duration: 500,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // Tagline animation
    Animated.timing(taglineFadeAnim, {
      toValue: 1,
      duration: 500,
      delay: 800,
      useNativeDriver: true,
    }).start();

    // Loading dots animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotsAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(dotsAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-180deg', '0deg'],
  });

  return (
    <LinearGradient
      colors={['#1976D2', '#64B5F6', '#E91E63']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        {/* Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { rotate }],
            },
          ]}
        >
          <View style={styles.logo}>
            <Ionicons name="female" size={40} color={colors.femaleToMale.accent} />
            <View style={styles.divider} />
            <Ionicons name="male" size={40} color={colors.maleToFemale.accent} />
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.View
          style={[
            styles.titleContainer,
            { opacity: titleFadeAnim },
          ]}
        >
          <Text style={styles.title}>
            GENDER<Text style={styles.titleLight}>LATOR</Text>
          </Text>
          <View style={styles.titleUnderline} />
        </Animated.View>

        {/* Tagline */}
        <Animated.View
          style={[
            styles.taglineContainer,
            { opacity: taglineFadeAnim },
          ]}
        >
          <Text style={styles.tagline}>
            Zrozum wreszcie, co naprawdę chciał(a) powiedzieć!
          </Text>
        </Animated.View>

        {/* Loading Dots */}
        <Animated.View style={[styles.dotsContainer, { opacity: dotsAnim }]}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    width: 128,
    height: 128,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  divider: {
    width: 2,
    height: 48,
    backgroundColor: '#D1D5DB',
    borderRadius: 1,
    marginHorizontal: 4,
  },
  titleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  titleLight: {
    color: 'rgba(255, 255, 255, 0.95)',
  },
  titleUnderline: {
    width: 64,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
  },
  taglineContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    maxWidth: width - 48,
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 32,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});
