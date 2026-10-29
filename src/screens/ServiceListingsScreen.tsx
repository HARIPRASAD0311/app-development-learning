import { ChevronDown, SlidersHorizontal } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { StarRating } from '../components/StarRating';
import { useApp } from '../context/AppContext';
import { LISTING_CATEGORIES } from '../data/content';
import { SERVICES } from '../data/services';
import { TabScreenProps } from '../navigation/types';
import { colors, fonts, shadows, tracking, type } from '../theme';

export function ServiceListingsScreen({ navigation }: TabScreenProps<'Services'>) {
  const { activeCategory, setActiveCategory } = useApp();

  const filtered = useMemo(
    () => (activeCategory === 'All' ? SERVICES : SERVICES.filter((s) => s.category === activeCategory)),
    [activeCategory],
  );

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header + filter pills */}
        <View style={{ gap: 12 }}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Browse Services</Text>
            <Text style={styles.count}>{filtered.length} available</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pills}
          >
            {LISTING_CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setActiveCategory(cat)}
                  style={[styles.pill, active ? styles.pillActive : styles.pillIdle]}
                >
                  <Text style={[styles.pillText, { color: active ? colors.white : colors.gray666 }]}>
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Sorting / filter bar */}
        <View style={styles.sortBar}>
          <View style={styles.sortLeft}>
            <SlidersHorizontal size={14} color={colors.primary} />
            <Text style={styles.sortText}>Filter by Rating ★4.5+</Text>
          </View>
          <View style={styles.sortLeft}>
            <Text style={[styles.sortText, styles.sortStrong]}>Sort: Popularity</Text>
            <ChevronDown size={12} color={colors.gray666} />
          </View>
        </View>

        {/* Cards */}
        <View style={{ gap: 12 }}>
          {filtered.map((srv) => (
            <Card key={srv.id} padding={12} shadow="xs" style={styles.card}>
              <View style={styles.thumb}>
                <Image source={{ uri: srv.image }} style={styles.fill} resizeMode="cover" />
                <StarRating value={srv.rating} fontSize={9} style={styles.thumbRating} />
              </View>

              <View style={styles.cardBody}>
                <View>
                  <Text style={styles.category}>{srv.category}</Text>
                  <Text style={styles.name}>{srv.name}</Text>
                  <Text style={styles.desc} numberOfLines={1}>
                    {srv.description}
                  </Text>
                </View>

                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.startsFrom}>Starts from</Text>
                    <Text style={styles.price}>₹{srv.startingPrice}</Text>
                  </View>
                  <Button
                    label="View Details"
                    variant="soft"
                    radius={12}
                    paddingVertical={6}
                    paddingHorizontal={12}
                    fontSize={11}
                    onPress={() => navigation.navigate('ServiceDetail', { serviceId: srv.id })}
                  />
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 16 },
  fill: { width: '100%', height: '100%' },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { ...type(18), fontFamily: fonts.serif, fontWeight: '700', color: colors.text },
  count: { ...type(12), fontFamily: fonts.mono, color: colors.gray888 },

  pills: { gap: 8, paddingBottom: 4 },
  pill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  pillActive: { backgroundColor: colors.primary, ...shadows.xs },
  pillIdle: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  pillText: { ...type(12), fontWeight: '500' },

  sortBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sortLeft: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sortText: { ...type(12), color: colors.gray666 },
  sortStrong: { fontWeight: '600', color: colors.text },

  card: { flexDirection: 'row', gap: 12 },
  thumb: {
    width: 96,
    height: 96,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },
  thumbRating: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: colors.whiteAlpha90,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardBody: { flex: 1, justifyContent: 'space-between' },
  category: {
    ...type(9),
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: tracking.wider(9),
  },
  name: { ...type(12, 15), fontWeight: '700', color: colors.text },
  desc: { ...type(10), color: colors.gray666, marginTop: 2 },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  startsFrom: { ...type(9), color: colors.gray888 },
  price: { ...type(12), fontWeight: '700', fontFamily: fonts.mono, color: colors.text },
});
