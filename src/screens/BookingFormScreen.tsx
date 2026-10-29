import { ChevronRight, MapPin } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { SectionTitle } from '../components/SectionTitle';
import { useApp } from '../context/AppContext';
import { BOOKING_DATES, TIME_SLOTS } from '../data/content';
import { getServiceById } from '../data/services';
import { RootScreenProps } from '../navigation/types';
import { colors, fonts, tracking, type } from '../theme';

export function BookingFormScreen({ navigation, route }: RootScreenProps<'BookingForm'>) {
  const service = getServiceById(route.params.serviceId);
  const { bookingDraft, setBookingDraft, confirmBooking } = useApp();
  const [noteFocused, setNoteFocused] = useState(false);

  const serviceFee = service.startingPrice;
  const inspectionFee = 49;
  const taxes = Math.round(serviceFee * 0.18);
  const total = serviceFee + inspectionFee + taxes;

  const onConfirm = () => {
    confirmBooking(service);
    navigation.replace('BookingConfirmation');
  };

  return (
    <Screen padBottom>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ gap: 16 }}>
          <ScreenHeader
            title="Schedule Service"
            subtitle="Select convenient address, date & time"
            onBack={() => navigation.goBack()}
          />

          {/* Selected service summary */}
          <Card padding={12} style={styles.summary}>
            <View style={styles.summaryLeft}>
              <Text style={styles.summaryEmoji}>{service.icon}</Text>
              <View>
                <Text style={styles.summaryName}>{service.name}</Text>
                <Text style={styles.summarySub}>Est: {service.duration}</Text>
              </View>
            </View>
            <Text style={styles.summaryPrice}>₹{service.startingPrice}</Text>
          </Card>

          {/* Address */}
          <View style={styles.field}>
            <SectionTitle>Service Address</SectionTitle>
            <Card padding={12} style={styles.addressCard}>
              <View style={styles.addressLeft}>
                <MapPin size={16} color={colors.primary} style={{ marginTop: 2 }} />
                <View style={{ flexShrink: 1 }}>
                  <Text style={styles.addressTitle}>Home</Text>
                  <Text style={styles.addressText}>{bookingDraft.address}</Text>
                </View>
              </View>
              <Pressable>
                <Text style={styles.change}>Change</Text>
              </Pressable>
            </Card>
          </View>

          {/* Date */}
          <View style={styles.field}>
            <SectionTitle>Select Date</SectionTitle>
            <View style={styles.grid}>
              {BOOKING_DATES.map((d) => (
                <Option
                  key={d}
                  label={d}
                  padding={10}
                  selected={bookingDraft.date === d}
                  onPress={() => setBookingDraft({ ...bookingDraft, date: d })}
                />
              ))}
            </View>
          </View>

          {/* Time slot */}
          <View style={styles.field}>
            <SectionTitle>Select Time Slot</SectionTitle>
            <View style={styles.grid}>
              {TIME_SLOTS.map((s) => (
                <Option
                  key={s}
                  label={s}
                  padding={8}
                  selected={bookingDraft.timeSlot === s}
                  onPress={() => setBookingDraft({ ...bookingDraft, timeSlot: s })}
                />
              ))}
            </View>
          </View>

          {/* Notes */}
          <View style={styles.field}>
            <SectionTitle>Add Notes / Specific Issues (Optional)</SectionTitle>
            <TextInput
              value={bookingDraft.note}
              onChangeText={(note) => setBookingDraft({ ...bookingDraft, note })}
              onFocus={() => setNoteFocused(true)}
              onBlur={() => setNoteFocused(false)}
              placeholder="e.g. Please bring extra 1/2 inch washer tape..."
              placeholderTextColor={colors.placeholder}
              multiline
              textAlignVertical="top"
              style={[styles.input, noteFocused && { borderColor: colors.primary }]}
            />
          </View>

          {/* Pricing */}
          <Card padding={12} style={{ gap: 8 }}>
            <View style={styles.pricingHead}>
              <SectionTitle size={11}>Transparent Pricing</SectionTitle>
            </View>
            <PriceRow label="Base Service Fee" value={`₹${serviceFee}`} />
            <PriceRow label="Safety & Inspection Charge" value={`₹${inspectionFee}`} />
            <PriceRow label="GST & Taxes (18%)" value={`₹${taxes}`} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Payable</Text>
              <Text style={styles.totalValue}>₹{total}</Text>
            </View>
          </Card>
        </View>

        {/* CTA */}
        <View style={{ paddingTop: 16 }}>
          <Button
            label="Continue to Confirm"
            onPress={onConfirm}
            renderRight={(c) => <ChevronRight size={16} color={c} />}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

function Option({
  label,
  selected,
  padding,
  onPress,
}: {
  label: string;
  selected: boolean;
  padding: number;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.option,
        { padding },
        selected ? styles.optionSelected : styles.optionIdle,
      ]}
    >
      <Text style={[styles.optionText, { color: selected ? colors.white : colors.text222 }]}>{label}</Text>
    </Pressable>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.priceRow}>
      <Text style={styles.priceLabel}>{label}</Text>
      <Text style={styles.priceValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, justifyContent: 'space-between', padding: 16 },
  field: { gap: 6 },

  summary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  summaryLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  summaryEmoji: {
    ...type(20),
    padding: 8,
    backgroundColor: colors.canvas,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  summaryName: { ...type(12), fontWeight: '700', color: colors.text },
  summarySub: { ...type(10), color: colors.gray666 },
  summaryPrice: { ...type(12), fontWeight: '700', fontFamily: fonts.mono, color: colors.text },

  addressCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  addressLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, flexShrink: 1 },
  addressTitle: { ...type(12), fontWeight: '700', color: colors.text },
  addressText: { ...type(10), color: colors.gray666 },
  change: {
    ...type(11),
    fontWeight: '600',
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: {
    width: '48.5%',
    flexGrow: 1,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  optionIdle: { backgroundColor: colors.white, borderColor: colors.border },
  optionText: { ...type(12), fontWeight: '500', textAlign: 'center' },

  input: {
    ...type(12),
    height: 64,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 10,
    color: colors.text,
  },

  pricingHead: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 6,
  },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  priceLabel: { ...type(12), color: colors.gray666 },
  priceValue: { ...type(12), fontFamily: fonts.mono, color: colors.text },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 6,
  },
  totalLabel: { ...type(12), fontWeight: '700', color: colors.text },
  totalValue: { ...type(12), fontWeight: '700', fontFamily: fonts.mono, color: colors.primary },
});
