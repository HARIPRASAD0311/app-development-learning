import { Bell, ChevronDown, Clock, MapPin, Search, ShieldCheck } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { SectionTitle } from '../components/SectionTitle';
import { StarRating } from '../components/StarRating';
import { useApp } from '../context/AppContext';
import { HOME_CATEGORIES, TOP_PROFESSIONALS } from '../data/content';
import { SERVICES } from '../data/services';
import { TabScreenProps } from '../navigation/types';
import { colors, fonts, shadows, tracking, type } from '../theme';

export function HomeScreen({ navigation }: TabScreenProps<'Home'>) {
  const { setActiveCategory } = useApp();
  const openService = (serviceId: string) => navigation.navigate('ServiceDetail', { serviceId });

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting & location */}
        <View style={styles.headerRow}>
          <View style={styles.locationRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>H</Text>
            </View>
            <View>
              <Text style={styles.deliverTo}>Deliver To</Text>
              <Pressable style={styles.locationBtn}>
                <MapPin size={14} color={colors.primary} />
                <Text style={styles.locationText}>Adyar, Chennai</Text>
                <ChevronDown size={12} color={colors.gray666} />
              </Pressable>
            </View>
          </View>
          <Pressable style={styles.bell} onPress={() => navigation.navigate('Profile')}>
            <Bell size={16} color={colors.gray666} />
            <View style={styles.bellDot} />
          </Pressable>
        </View>

        {/* Search */}
        <Pressable onPress={() => navigation.navigate('Services')}>
          <Card padding={12} shadow="sm" style={styles.search}>
            <Search size={16} color={colors.gray888} />
            <Text style={styles.searchText}>What do you need help with today?</Text>
          </Card>
        </Pressable>

        {/* Primary categories */}
        <View>
          <View style={[styles.sectionHeader, { marginBottom: 12 }]}>
            <SectionTitle>Primary Categories</SectionTitle>
            <Pressable onPress={() => navigation.navigate('Services')}>
              <Text style={styles.link}>View All</Text>
            </Pressable>
          </View>
          <View style={styles.catRow}>
            {HOME_CATEGORIES.map((cat) => (
              <Pressable
                key={cat.name}
                style={styles.catCard}
                onPress={() => {
                  setActiveCategory(cat.category);
                  navigation.navigate('Services');
                }}
              >
                <View style={styles.catIcon}>
                  <Text style={styles.catEmoji}>{cat.icon}</Text>
                </View>
                <Text style={styles.catName} numberOfLines={1}>
                  {cat.name}
                </Text>
                <Text style={styles.catPrice}>{cat.price}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Promo banner */}
        <View style={styles.promo}>
          <View style={styles.promoText}>
            <View style={styles.promoTag}>
              <Text style={styles.promoTagText}>First Booking Offer</Text>
            </View>
            <Text style={styles.promoTitle}>Get ₹150 OFF on Deep Cleaning</Text>
            <Text style={styles.promoSub}>
              Use code <Text style={styles.promoCode}>HAVENNEW</Text> at checkout
            </Text>
          </View>
          <Button
            label="Claim Now"
            variant="primary"
            radius={12}
            paddingVertical={8}
            paddingHorizontal={12}
            fontSize={11}
            style={styles.promoBtn}
            onPress={() => openService(SERVICES[2].id)}
          />
        </View>

        {/* Popular services */}
        <View>
          <View style={[styles.sectionHeader, { marginBottom: 10 }]}>
            <SectionTitle>Popular Services</SectionTitle>
            <Text style={styles.sectionHint}>Top booked in Adyar</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.hScroll}
            contentContainerStyle={styles.hScrollContent}
          >
            {SERVICES.map((srv) => (
              <Pressable key={srv.id} onPress={() => openService(srv.id)}>
                <Card padding={10} shadow="xs" style={styles.popCard}>
                  <View style={styles.popImageWrap}>
                    <Image source={{ uri: srv.image }} style={styles.fill} resizeMode="cover" />
                    <StarRating
                      value={srv.rating}
                      gap={2}
                      style={styles.popRating}
                    />
                  </View>
                  <View>
                    <Text style={styles.popCategory}>{srv.category}</Text>
                    <Text style={styles.popName} numberOfLines={1}>
                      {srv.name}
                    </Text>
                    <View style={styles.popFooter}>
                      <Text style={styles.popPrice}>₹{srv.startingPrice}</Text>
                      <View style={styles.popDuration}>
                        <Clock size={10} color={colors.gray888} />
                        <Text style={styles.popDurationText}>{srv.duration}</Text>
                      </View>
                    </View>
                  </View>
                </Card>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Top rated professionals */}
        <View style={{ gap: 10, paddingBottom: 8 }}>
          <SectionTitle>Top Rated Professionals Nearby</SectionTitle>
          <Card padding={12}>
            {TOP_PROFESSIONALS.map((pro, i) => {
              const last = i === TOP_PROFESSIONALS.length - 1;
              return (
                <View
                  key={pro.name}
                  style={[
                    styles.proRow,
                    !last && styles.proRowDivider,
                    i > 0 && { marginTop: 12 },
                  ]}
                >
                  <View style={styles.proLeft}>
                    <Avatar uri={pro.avatar} size={36} />
                    <View>
                      <View style={styles.proNameRow}>
                        <Text style={styles.proName}>{pro.name}</Text>
                        <ShieldCheck size={12} color={colors.primary} />
                      </View>
                      <Text style={styles.proRole}>
                        {pro.role} • {pro.exp}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.proRight}>
                    <StarRating value={pro.rating} />
                    <Text style={styles.proChecked}>Background Checked</Text>
                  </View>
                </View>
              );
            })}
          </Card>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 20 },
  fill: { width: '100%', height: '100%' },

  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.sageLight,
    borderWidth: 1,
    borderColor: colors.primaryBorder20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...type(14), fontWeight: '700', color: colors.primary },
  deliverTo: {
    ...type(10),
    fontWeight: '500',
    color: colors.gray888,
    textTransform: 'uppercase',
    letterSpacing: tracking.wider(10),
  },
  locationBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { ...type(12), fontWeight: '700', color: colors.text },
  bell: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },

  search: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  searchText: { ...type(12), color: colors.gray888 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionHint: { ...type(10), color: colors.gray888 },
  link: { ...type(11), fontWeight: '600', color: colors.primary },

  catRow: { flexDirection: 'row', gap: 10 },
  catCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    alignItems: 'center',
    gap: 4,
    ...shadows.xs,
  },
  catIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.canvas,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catEmoji: { ...type(18) },
  catName: { ...type(11), fontWeight: '700', color: colors.text, width: '100%', textAlign: 'center' },
  catPrice: { ...type(9), fontFamily: fonts.mono, color: colors.gray666 },

  promo: {
    backgroundColor: colors.sageLight,
    borderWidth: 1,
    borderColor: colors.primaryBorder20,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    ...shadows.xs,
  },
  promoText: { gap: 4, flexShrink: 1 },
  promoTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.whiteAlpha80,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  promoTagText: {
    ...type(10),
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: tracking.wider(10),
  },
  promoTitle: { ...type(12), fontWeight: '700', color: colors.text },
  promoSub: { ...type(10), color: colors.gray666 },
  promoCode: { fontFamily: fonts.mono, fontWeight: '700', color: colors.text },
  promoBtn: { flexShrink: 0 },

  hScroll: { marginHorizontal: -16 },
  hScrollContent: { paddingHorizontal: 16, paddingBottom: 4, gap: 12 },
  popCard: { width: 192, gap: 8 },
  popImageWrap: {
    height: 96,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },
  popRating: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: colors.whiteAlpha95,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  popCategory: {
    ...type(9),
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: tracking.wider(9),
  },
  popName: { ...type(12), fontWeight: '700', color: colors.text },
  popFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  popPrice: { ...type(12), fontWeight: '700', fontFamily: fonts.mono, color: colors.text },
  popDuration: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  popDurationText: { ...type(10), color: colors.gray888 },

  proRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  proRowDivider: { paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  proLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  proNameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  proName: { ...type(12), fontWeight: '700', color: colors.text },
  proRole: { ...type(10), color: colors.gray666 },
  proRight: { alignItems: 'flex-end' },
  proChecked: { ...type(9), fontWeight: '500', color: colors.primary },
});
