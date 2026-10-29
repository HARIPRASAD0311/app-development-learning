import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, type } from '../theme';
import { BackButton } from './BackButton';

interface Props {
  title: string;
  subtitle: string;
  subtitleMono?: boolean;
  onBack: () => void;
}

/** Back button + serif title + small subtitle (Booking form / Status screens). */
export function ScreenHeader({ title, subtitle, subtitleMono, onBack }: Props) {
  return (
    <View style={styles.row}>
      <BackButton onPress={onBack} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.subtitle, subtitleMono && { fontFamily: fonts.mono }]}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { ...type(16), fontFamily: fonts.serif, fontWeight: '700', color: colors.text },
  subtitle: { ...type(10), color: colors.gray666 },
});
