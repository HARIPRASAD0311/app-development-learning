import { ArrowLeft, CheckCircle2, ShieldCheck, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { SectionTitle } from '../components/SectionTitle';
import { getServiceById } from '../data/services';
import { RootScreenProps } from '../navigation/types';
import { colors, fonts, shadows, tracking, type } from '../theme';

export function ServiceDetailScreen({ navigation, route }: RootScreenProps<'ServiceDetail'>) {
  const service = getServiceById(route.params.serviceId);
  const insets = useSafeAreaInsets();

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Hero */}
        <View style={styles.hero}>
          <Image source={{ uri: service.image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)']}
            locations={[0, 0.5, 1]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Pressable
            style={styles.back}
            onPress={() => navigation.popTo('Main', { screen: 'Services' })}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={16} color={colors.text} />
          </Pressable>
          <View style={styles.heroText}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>{service.category}</Text>
            </View>
            <Text style={styles.heroTitle}>{service.name}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Key attributes */}
          <Card padding={12} shadow="xs" style={styles.stats}>
            <View style={[styles.stat, styles.statDivider]}>
              <Text style={styles.statLabel}>Rating</Text>
              <View style={styles.statRatingRow}>
                <Star size={12} color={colors.amber} fill={colors.amber} />
                <Text style={styles.statValue}>{service.rating}</Text>
              </View>
            </View>
            <View style={[styles.stat, styles.statDivider]}>
              <Text style={styles.statLabel}>Est. Duration</Text>
              <Text style={[styles.statValue, styles.statValueTop]}>{service.duration}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Starting At</Text>
              <Text style={[styles.statValue, styles.statValueTop, styles.mono]}>
                ₹{service.startingPrice}
              </Text>
            </View>
          </Card>

          {/* Overview */}
          <View style={{ gap: 4 }}>
            <SectionTitle>Overview</SectionTitle>
            <Text style={styles.overview}>{service.description}</Text>
          </View>

          {/* What's included */}
          <View style={{ gap: 8 }}>
            <SectionTitle>What's Included</SectionTitle>
            <Card padding={12} style={{ gap: 8 }}>
              {service.included.map((item) => (
                <View key={item} style={styles.includedRow}>
                  <CheckCircle2 size={16} color={colors.primary} style={styles.includedIcon} />
                  <Text style={styles.includedText}>{item}</Text>
                </View>
              ))}
            </Card>
          </View>

          {/* Assigned professional */}
          <View style={{ gap: 8 }}>
            <SectionTitle>Assigned Professional</SectionTitle>
            <Card padding={12} style={styles.proCard}>
              <View style={styles.proLeft}>
                <Avatar uri={service.pro.avatar} size={40} />
                <View>
                  <View style={styles.proNameRow}>
                    <Text style={styles.proName}>{service.pro.name}</Text>
                    <ShieldCheck size={14} color={colors.primary} />
                  </View>
                  <Text style={styles.proSub}>
                    {service.pro.experience} • {service.pro.completedJobs}+ jobs completed
                  </Text>
                </View>
              </View>
              <Text style={styles.proRating}>★ {service.pro.rating}</Text>
            </Card>
          </View>
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={[styles.bar, { paddingBottom: 16 + insets.bottom }]}>
        <View>
          <Text style={styles.barLabel}>Total Estimate</Text>
          <Text style={styles.barPrice}>₹{service.startingPrice}</Text>
        </View>
        <Button
          label="Book Service"
          radius={12}
          paddingVertical={12}
          style={{ flex: 1 }}
          onPress={() => navigation.navigate('BookingForm', { serviceId: service.id })}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { height: 192, backgroundColor: colors.surfaceMuted },
  back: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.whiteAlpha90,
    borderWidth: 1,
    borderColor: colors.whiteAlpha50,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  heroText: { position: 'absolute', bottom: 12, left: 16, right: 16 },
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  chipText: {
    ...type(10),
    fontWeight: '700',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: tracking.wider(10),
  },
  heroTitle: { ...type(18, 22.5), fontWeight: '700', color: colors.white, marginTop: 4 },

  body: { padding: 16, gap: 16 },
  stats: { flexDirection: 'row', gap: 8 },
  stat: { flex: 1, alignItems: 'center' },
  statDivider: { borderRightWidth: 1, borderRightColor: colors.border },
  statLabel: { ...type(10), color: colors.gray888 },
  statRatingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  statValue: { ...type(12), fontWeight: '700', color: colors.text },
  statValueTop: { marginTop: 2 },
  mono: { fontFamily: fonts.mono },

  overview: { ...type(12, 19.5), color: colors.gray666 },
  includedRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  includedIcon: { marginTop: 2 },
  includedText: { ...type(12), color: colors.text222, flex: 1 },

  proCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  proLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flexShrink: 1 },
  proNameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  proName: { ...type(12), fontWeight: '700', color: colors.text },
  proSub: { ...type(10), color: colors.gray666 },
  proRating: {
    ...type(12),
    fontWeight: '700',
    color: colors.text,
    backgroundColor: colors.canvas,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  bar: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    ...shadows.md,
  },
  barLabel: { ...type(10), color: colors.gray888 },
  barPrice: { ...type(16), fontWeight: '700', fontFamily: fonts.mono, color: colors.text },
});
