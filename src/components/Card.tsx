import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, shadows } from '../theme';

interface Props {
  children: ReactNode;
  padding?: number;
  shadow?: 'xs' | 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
}

/** White rounded surface with the 1px warm border used across the design. */
export function Card({ children, padding = 12, shadow, style }: Props) {
  return (
    <View style={[styles.card, { padding }, shadow ? shadows[shadow] : null, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
