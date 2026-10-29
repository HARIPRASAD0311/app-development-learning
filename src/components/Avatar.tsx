import React from 'react';
import { Image } from 'react-native';

import { colors } from '../theme';

export function Avatar({ uri, size }: { uri: string; size: number }) {
  return (
    <Image
      source={{ uri }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surfaceMuted,
      }}
    />
  );
}
