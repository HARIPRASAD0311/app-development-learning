import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { colors, tracking, type } from '../theme';

/** Small uppercase bold heading used for every section label. */
export function SectionTitle({
  children,
  size = 12,
  style,
}: {
  children: string;
  size?: number;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text style={[styles.title, { ...type(size), letterSpacing: tracking.wider(size) }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: { fontWeight: '700', color: colors.text, textTransform: 'uppercase' },
});
