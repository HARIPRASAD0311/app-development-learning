import { Star } from 'lucide-react-native';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { colors, type } from '../theme';

interface Props {
  value: number | string;
  iconSize?: number;
  fontSize?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

/** Filled amber star followed by a rating value. */
export function StarRating({ value, iconSize = 10, fontSize = 10, gap = 2, style, textStyle }: Props) {
  return (
    <View style={[styles.row, { gap }, style]}>
      <Star size={iconSize} color={colors.amber} fill={colors.amber} />
      <Text style={[styles.text, type(fontSize), textStyle]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  text: { fontWeight: '700', color: colors.text },
});
