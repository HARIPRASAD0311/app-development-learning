import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, type } from '../theme';
import { BookingStatus } from '../types';

const STYLES: Record<BookingStatus, { bg: string; fg: string; border: string }> = {
  Pending: { bg: '#FEF3C7', fg: '#92400E', border: '#FDE68A' },
  Confirmed: { bg: colors.sageLight, fg: colors.primary, border: colors.primaryBorder30 },
  'In Progress': { bg: '#DBEAFE', fg: '#1E40AF', border: '#BFDBFE' },
  Completed: { bg: '#D1FAE5', fg: '#065F46', border: '#A7F3D0' },
  Cancelled: { bg: '#F3F4F6', fg: '#374151', border: '#E5E7EB' },
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const s = STYLES[status] ?? STYLES.Confirmed;
  return (
    <View style={[styles.badge, { backgroundColor: s.bg, borderColor: s.border }]}>
      <Text style={[styles.text, { color: s.fg }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, borderWidth: 1 },
  text: { ...type(10), fontWeight: '700' },
});
