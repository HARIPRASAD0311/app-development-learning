import { Calendar, Clock } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { StatusBadge } from '../components/StatusBadge';
import { useApp } from '../context/AppContext';
import { TabScreenProps } from '../navigation/types';
import { Booking } from '../types';
import { colors, fonts, type } from '../theme';

const isPast = (b: Booking) => b.status === 'Completed' || b.status === 'Cancelled';

export function MyBookingsScreen({ navigation }: TabScreenProps<'Bookings'>) {
  const { bookings, setActiveBookingId } = useApp();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingCount = bookings.filter((b) => !isPast(b)).length;
  const pastCount = bookings.filter(isPast).length;

  const filtered = useMemo(
    () =>
      tab === 'upcoming'
        ? bookings.filter((b) => ['Confirmed', 'In Progress', 'Pending'].includes(b.status))
        : bookings.filter(isPast),
    [bookings, tab],
  );

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>My Bookings</Text>
          <Text style={styles.total}>{bookings.length} Total</Text>
        </View>

        {/* Segmented tabs */}
        <View style={styles.segment}>
          <SegmentButton
            label={`Upcoming (${upcomingCount})`}
            active={tab === 'upcoming'}
            onPress={() => setTab('upcoming')}
          />
          <SegmentButton
            label={`Past (${pastCount})`}
            active={tab === 'past'}
            onPress={() => setTab('past')}
          />
        </View>

        {/* List */}
        <View style={{ gap: 12 }}>
          {filtered.length === 0 ? (
            <Card padding={24} style={styles.empty}>
              <Calendar size={32} color={colors.gray888} />
              <Text style={styles.emptyTitle}>No bookings found in this category</Text>
              <Pressable onPress={() => navigation.navigate('Services')}>
                <Text style={styles.emptyLink}>Explore & Book a Service</Text>
              </Pressable>
            </Card>
          ) : (
            filtered.map((b) => (
              <Card key={b.id} padding={14} shadow="xs" style={{ gap: 12 }}>
                <View style={styles.cardHead}>
                  <View>
                    <Text style={styles.bookingId}>{b.id}</Text>
                    <Text style={styles.serviceName}>{b.serviceName}</Text>
                  </View>
                  <StatusBadge status={b.status} />
                </View>

                <View style={{ gap: 4 }}>
                  <View style={styles.dateRow}>
                    <View style={styles.iconText}>
                      <Calendar size={14} color={colors.primary} />
                      <Text style={styles.detail}>{b.date}</Text>
                    </View>
                    <Text style={styles.price}>₹{b.price}</Text>
                  </View>
                  <View style={styles.iconText}>
                    <Clock size={14} color={colors.primary} />
                    <Text style={styles.detail}>{b.timeSlot}</Text>
                  </View>
                </View>

                <View style={styles.cardFoot}>
                  <View style={styles.iconText}>
                    <Avatar uri={b.pro.avatar} size={24} />
                    <Text style={styles.proName}>{b.pro.name}</Text>
                  </View>
                  <Button
                    label="Track Status"
                    variant="soft"
                    radius={12}
                    paddingVertical={6}
                    paddingHorizontal={12}
                    fontSize={11}
                    onPress={() => {
                      setActiveBookingId(b.id);
                      navigation.navigate('BookingStatus');
                    }}
                  />
                </View>
              </Card>
            ))
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

function SegmentButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.segBtn, active && styles.segBtnActive]}>
      <Text style={[styles.segText, { color: active ? colors.white : colors.gray666 }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { ...type(18), fontFamily: fonts.serif, fontWeight: '700', color: colors.text },
  total: { ...type(12), fontFamily: fonts.mono, color: colors.gray888 },

  segment: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  segBtn: { flex: 1, paddingVertical: 8, borderRadius: 12, alignItems: 'center' },
  segBtnActive: { backgroundColor: colors.primary, elevation: 1 },
  segText: { ...type(12), fontWeight: '700' },

  empty: { alignItems: 'center', gap: 8 },
  emptyTitle: { ...type(12), fontWeight: '700', color: colors.text },
  emptyLink: {
    ...type(12),
    fontWeight: '500',
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 8,
  },
  bookingId: { ...type(9), fontFamily: fonts.mono, color: colors.gray888 },
  serviceName: { ...type(12), fontWeight: '700', color: colors.text },
  dateRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconText: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detail: { ...type(12), color: colors.gray666 },
  price: { ...type(12), fontFamily: fonts.mono, fontWeight: '700', color: colors.text },
  cardFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  proName: { ...type(11), fontWeight: '500', color: colors.text222 },
});
