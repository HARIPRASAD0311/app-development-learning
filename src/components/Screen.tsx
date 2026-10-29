import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../theme';

interface Props {
  children: ReactNode;
  /** Apply bottom safe-area padding (for stack screens without a tab bar / own bottom bar). */
  padBottom?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Canvas-coloured screen container that sits below the Android status bar. */
export function Screen({ children, padBottom = false, style }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.root,
        { paddingTop: insets.top, paddingBottom: padBottom ? insets.bottom : 0 },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
});
