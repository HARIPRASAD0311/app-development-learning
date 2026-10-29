import { ChevronRight, ShieldCheck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

import { Button } from '../components/Button';
import { Screen } from '../components/Screen';
import { SPLASH_HERO_IMAGE } from '../data/content';
import { RootScreenProps } from '../navigation/types';
import { colors, fonts, shadows, tracking, type } from '../theme';

export function SplashScreen({ navigation }: RootScreenProps<'Splash'>) {
  const start = () => navigation.replace('Main');

  return (
    <Screen padBottom>
      <View style={styles.wrap}>
        {/* Background subtle glow */}
        <Svg width={256} height={256} style={styles.glow} pointerEvents="none">
          <Defs>
            <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={colors.sageLight} stopOpacity="1" />
              <Stop offset="0.5" stopColor={colors.sageLight} stopOpacity="0.85" />
              <Stop offset="1" stopColor={colors.sageLight} stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle cx="128" cy="128" r="128" fill="url(#glow)" />
        </Svg>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header logo */}
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <Text style={styles.logoLetter}>H</Text>
            </View>
            <Text style={styles.logoText}>Haven</Text>
          </View>

          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.heroCard}>
              <Image source={{ uri: SPLASH_HERO_IMAGE }} style={StyleSheet.absoluteFill} resizeMode="cover" />
              <LinearGradient
                colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)']}
                locations={[0, 0.5, 1]}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={styles.heroOverlay}
              >
                <View style={styles.verified}>
                  <View style={styles.verifiedLeft}>
                    <ShieldCheck size={16} color={colors.primary} />
                    <Text style={styles.verifiedText} numberOfLines={1}>
                      Verified Household Professionals
                    </Text>
                  </View>
                  <Text style={styles.ratingPill}>★ 4.9</Text>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.copy}>
              <Text style={styles.heading}>
                Home services,
                {'\n'}
                <Text style={styles.headingAccent}>thoughtfully delivered.</Text>
              </Text>
              <Text style={styles.body}>
                Book background-checked plumbers, electricians, and deep cleaners in Chennai with
                transparent upfront pricing.
              </Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Button
              label="Get Started"
              onPress={start}
              renderRight={(c) => <ChevronRight size={16} color={c} />}
            />
            <Button label="Sign In" variant="secondary" paddingVertical={12} onPress={start} />
            <Text style={styles.terms}>By continuing, you agree to Haven’s Terms & Privacy Policy</Text>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, overflow: 'hidden' },
  glow: { position: 'absolute', top: -96, right: -96 },
  content: { flexGrow: 1, justifyContent: 'space-between', padding: 24 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 24 },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  logoLetter: { ...type(20), fontWeight: '700', color: colors.white },
  logoText: {
    ...type(24),
    fontFamily: fonts.serif,
    fontWeight: '700',
    letterSpacing: tracking.tight(24),
    color: colors.text,
  },
  hero: { flex: 1, justifyContent: 'center', paddingVertical: 16, gap: 24 },
  heroCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    aspectRatio: 4 / 3,
    backgroundColor: colors.surfaceMuted,
    ...shadows.md,
  },
  heroOverlay: { flex: 1, justifyContent: 'flex-end', padding: 16 },
  verified: {
    backgroundColor: colors.whiteAlpha90,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.whiteAlpha40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  verifiedLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 },
  verifiedText: { ...type(12), fontWeight: '500', color: colors.text, flexShrink: 1 },
  ratingPill: {
    ...type(10),
    fontWeight: '700',
    color: colors.primary,
    backgroundColor: colors.sageLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: 'hidden',
  },
  copy: { gap: 8 },
  heading: { ...type(24, 30), fontFamily: fonts.serif, fontWeight: '700', color: colors.text },
  headingAccent: { color: colors.primary, fontStyle: 'italic', fontWeight: '400' },
  body: { ...type(12, 19.5), color: colors.gray666 },
  actions: { gap: 12, paddingTop: 8 },
  terms: { ...type(10), textAlign: 'center', color: colors.gray888 },
});
