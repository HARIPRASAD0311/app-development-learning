import { MessageSquare, Phone, ShieldCheck } from 'lucide-react-native';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { SectionTitle } from '../components/SectionTitle';
import { useApp } from '../context/AppContext';
import { RootScreenProps } from '../navigation/types';
import { colors, fonts, tracking, type } from '../theme';

export function BookingStatusScreen({ navigation }: RootScreenProps<'BookingStatus'>) {
  const { activeBooking: booking } = useApp();

  const steps = [
    { title: 'Booking Placed', desc: 'Received & logged' },
    { title: 'Professional Assigned', desc: booking.pro.name },
    { title: 'On the Way', desc: 'ETA: 15 mins' },
    { title: 'In Progress', desc: 'Service underway' },
    { title: 'Completed', desc: 'Work verified' },
  ];

  const callPro = () => {
    if (booking.pro.phone) Linking.openURL(`tel:${booking.pro.phone.replace(/\s/g, '')}`);
  };

  return (
    <Screen padBottom>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Booking Status"
          subtitle={`ID: ${booking.id}`}
          subtitleMono
          onBack={() => navigation.popTo('Main', { screen: 'Bookings' })}
        />

        {/* Progress tracker */}
        <Card padding={16} shadow="xs" style={{ gap: 12 }}>
          <View style={styles.trackerHead}>
            <SectionTitle>Service Progress Tracker</SectionTitle>
          </View>

          <View style={styles.stepper}>
            <View style={styles.line} />
            {steps.map((step, idx) => {
              const isDone = idx + 1 <= booking.statusStep;
              const isCurrent = idx + 1 === booking.statusStep;
              return (
                <View key={step.title} style={styles.stepRow}>
                  <View style={[styles.ring, isDone && { backgroundColor: colors.sageLight }]}>
                    <View style={[styles.dot, isDone ? styles.dotDone : styles.dotIdle]}>
                      <Text style={[styles.dotText, { color: isDone ? colors.white : colors.gray888 }]}>
                        {isDone ? '✓' : idx + 1}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.stepTitle,
                        {
                          color: isCurrent ? colors.primary : isDone ? colors.text : colors.gray888,
                        },
                      ]}
                    >
                      {step.title}
                    </Text>
                    <Text style={styles.stepDesc}>{step.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Professional */}
        <Card padding={12} style={{ gap: 12 }}>
          <View style={styles.proRow}>
            <View style={styles.proLeft}>
              <Avatar uri={booking.pro.avatar} size={40} />
              <View>
                <View style={styles.proNameRow}>
                  <Text style={styles.proName}>{booking.pro.name}</Text>
                  <ShieldCheck size={14} color={colors.primary} />
                </View>
                <Text style={styles.proRole}>{booking.pro.role || 'Service Expert'}</Text>
              </View>
            </View>
            <Text style={styles.proRating}>★ {booking.pro.rating}</Text>
          </View>

          <View style={styles.actionRow}>
            <Button
              label="Call Pro"
              variant="soft"
              radius={12}
              paddingVertical={8}
              paddingHorizontal={12}
              style={{ flex: 1 }}
              renderLeft={(c) => <Phone size={14} color={c} />}
              onPress={callPro}
            />
            <Button
              label="Chat"
              variant="secondary"
              radius={12}
              paddingVertical={8}
              paddingHorizontal={12}
              style={{ flex: 1 }}
              renderLeft={(c) => <MessageSquare size={14} color={c} />}
            />
          </View>
        </Card>

        {/* Appointment details */}
        <Card padding={12} style={{ gap: 8 }}>
          <View style={styles.apptHead}>
            <SectionTitle size={10}>Appointment Details</SectionTitle>
          </View>
          <View style={styles.apptRow}>
            <Text style={styles.apptLabel}>Date & Time</Text>
            <Text style={[styles.apptValue, styles.apptStrong]}>
              {booking.date}, {booking.timeSlot}
            </Text>
          </View>
          <View style={styles.apptRow}>
            <Text style={styles.apptLabel}>Address</Text>
            <Text style={[styles.apptValue, styles.apptStrong, { maxWidth: 180 }]} numberOfLines={1}>
              {booking.address}
            </Text>
          </View>
          <View style={styles.apptRow}>
            <Text style={styles.apptLabel}>Notes</Text>
            <Text style={[styles.apptValue, { fontStyle: 'italic', color: colors.text }]}>
              {booking.issueNote}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>₹{booking.price}</Text>
          </View>
        </Card>

        {/* Context actions */}
        <View style={{ gap: 8 }}>
          <Button label="Reschedule Appointment" variant="secondary" paddingVertical={12} />
          <Button label="Cancel Booking" variant="ghostDanger" paddingVertical={10} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 16 },

  trackerHead: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 8,
  },
  stepper: { paddingLeft: 24, gap: 16 },
  line: {
    position: 'absolute',
    left: 8,
    top: 8,
    bottom: 8,
    width: 2,
    backgroundColor: colors.border,
  },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  ring: {
    position: 'absolute',
    left: -26,
    top: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { width: 16, height: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  dotDone: { backgroundColor: colors.primary },
  dotIdle: { backgroundColor: colors.canvas, borderWidth: 1, borderColor: colors.border },
  dotText: { fontSize: 9, lineHeight: 12, fontWeight: '700', includeFontPadding: false },
  stepTitle: { ...type(12), fontWeight: '700' },
  stepDesc: { ...type(10), color: colors.gray666 },

  proRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  proLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flexShrink: 1 },
  proNameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  proName: { ...type(12), fontWeight: '700', color: colors.text },
  proRole: { ...type(10), color: colors.gray666 },
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
  actionRow: { flexDirection: 'row', gap: 8, paddingTop: 4 },

  apptHead: { borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 4 },
  apptRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  apptLabel: { ...type(12), color: colors.gray666 },
  apptValue: { ...type(12), flexShrink: 1, textAlign: 'right' },
  apptStrong: { fontWeight: '600', color: colors.text },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 6,
  },
  totalLabel: { ...type(12), fontWeight: '700', color: colors.text },
  totalValue: { ...type(12), fontFamily: fonts.mono, fontWeight: '700', color: colors.primary },
});
