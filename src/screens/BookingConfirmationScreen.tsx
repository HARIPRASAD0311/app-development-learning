import { Calendar, Check, MapPin } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { useApp } from '../context/AppContext';
import { RootScreenProps } from '../navigation/types';
import { colors, fonts, shadows, tracking, type } from '../theme';

/** Check badge with the same bounce used in the reference (Tailwind `animate-bounce`). */
function BouncingCheck() {
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(y, {
          toValue: -20,
          duration: 500,
          easing: Easing.bezier(0.8, 0, 1, 1),
          useNativeDriver: true,
        }),
        Animated.timing(y, {
          toValue: 0,
          duration: 500,
          easing: Easing.bezier(0, 0, 0.2, 1),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [y]);

  return (
    <Animated.View style={[styles.checkBadge, { transform: [{ translateY: y }] }]}>
      <Check size={40} color={colors.primary} strokeWidth={3} />
    </Animated.View>
  );
}

export function BookingConfirmationScreen({ navigation }: RootScreenProps<'BookingConfirmation'>) {
  const { latestBooking, bookings } = useApp();
  const booking = latestBooking ?? bookings[0];

  return (
    <Screen padBottom>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.middle}>
          <BouncingCheck />

          <View style={styles.titleBlock}>
            <Text style={styles.badge}>Booking Confirmed</Text>
            <Text style={styles.title}>Service Booked Successfully!</Text>
            <Text style={styles.ref}>
              Ref ID: <Text style={styles.refId}>{booking.id}</Text>
            </Text>
          </View>

          <Card padding={16} shadow="xs" style={styles.summary}>
            <View style={styles.summaryTop}>
              <View style={{ flexShrink: 1 }}>
                <Text style={styles.tiny}>Service</Text>
                <Text style={styles.serviceName}>{booking.serviceName}</Text>
              </View>
              <Text style={styles.price}>₹{booking.price}</Text>
            </View>

            <View style={{ gap: 6 }}>
              <View style={styles.detailRow}>
                <Calendar size={14} color={colors.primary} />
                <Text style={styles.detailText}>
                  {booking.date} • {booking.timeSlot}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <MapPin size={14} color={colors.primary} />
                <Text style={[styles.detailText, { flex: 1 }]} numberOfLines={1}>
                  {booking.address}
                </Text>
              </View>
            </View>

            <View style={styles.proRow}>
              <Avatar uri={booking.pro.avatar} size={32} />
              <View>
                <Text style={styles.proLabel}>Assigned Professional</Text>
                <Text style={styles.proName}>{booking.pro.name}</Text>
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.ctas}>
          <Button
            label="View Booking & Track Status"
            onPress={() => navigation.navigate('BookingStatus')}
          />
          <Button
            label="Return to Home"
            variant="secondary"
            paddingVertical={12}
            onPress={() => navigation.popTo('Main', { screen: 'Home' })}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, justifyContent: 'space-between', padding: 24 },
  middle: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 24 },
  checkBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.sageLight,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  titleBlock: { alignItems: 'center', gap: 4 },
  badge: {
    ...type(10),
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: tracking.widest(10),
    backgroundColor: colors.sageLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },
  title: {
    ...type(20),
    fontFamily: fonts.serif,
    fontWeight: '700',
    color: colors.text,
    paddingTop: 8,
    textAlign: 'center',
  },
  ref: { ...type(12), color: colors.gray666 },
  refId: { fontFamily: fonts.mono, fontWeight: '700', color: colors.text },

  summary: { width: '100%', gap: 12 },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 8,
  },
  tiny: { ...type(9), color: colors.gray888 },
  serviceName: { ...type(12), fontWeight: '700', color: colors.text },
  price: { ...type(12), fontFamily: fonts.mono, fontWeight: '700', color: colors.primary },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailText: { ...type(12), color: colors.gray666 },
  proRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  proLabel: { ...type(10), color: colors.gray888 },
  proName: { ...type(12), fontWeight: '700', color: colors.text },

  ctas: { width: '100%', gap: 10, paddingTop: 16 },
});
