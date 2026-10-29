import React, { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors, shadows } from '../theme';

type Variant = 'primary' | 'secondary' | 'soft' | 'ghostDanger' | 'outlineDanger';

interface Props {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  radius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  fontSize?: number;
  renderLeft?: (color: string) => ReactNode;
  renderRight?: (color: string) => ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface Look {
  bg: string;
  color: string;
  border?: string;
}

function look(variant: Variant, pressed: boolean): Look {
  switch (variant) {
    case 'primary':
      return { bg: pressed ? colors.primaryPressed : colors.primary, color: colors.white };
    case 'secondary':
      return {
        bg: pressed ? colors.surfaceMuted : colors.white,
        color: colors.text,
        border: colors.border,
      };
    case 'soft':
      return pressed
        ? { bg: colors.primary, color: colors.white, border: colors.primaryBorder20 }
        : { bg: colors.sageLight, color: colors.primary, border: colors.primaryBorder20 };
    case 'ghostDanger':
      return { bg: pressed ? colors.rosePressed : 'transparent', color: colors.rose };
    case 'outlineDanger':
      return {
        bg: pressed ? colors.rosePressed : colors.white,
        color: colors.rose,
        border: colors.border,
      };
  }
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  radius = 16,
  paddingVertical = 14,
  paddingHorizontal = 0,
  fontSize = 12,
  renderLeft,
  renderRight,
  style,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => {
        const l = look(variant, pressed);
        return [
          styles.base,
          {
            backgroundColor: l.bg,
            borderRadius: radius,
            paddingVertical,
            paddingHorizontal,
            borderWidth: l.border ? 1 : 0,
            borderColor: l.border,
          },
          variant === 'primary' ? shadows.sm : null,
          style,
        ];
      }}
    >
      {({ pressed }) => {
        const l = look(variant, pressed);
        return (
          <>
            {renderLeft?.(l.color)}
            <Text style={[styles.label, { color: l.color, fontSize, lineHeight: fontSize === 11 ? 16.5 : 16 }]}>
              {label}
            </Text>
            {renderRight?.(l.color)}
          </>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: { fontWeight: '600', textAlign: 'center' },
});
