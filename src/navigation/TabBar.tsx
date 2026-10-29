import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Calendar, Home, Search, User } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, type } from '../theme';

const TABS: Record<string, { label: string; Icon: typeof Home }> = {
  Home: { label: 'Home', Icon: Home },
  Services: { label: 'Services', Icon: Search },
  Bookings: { label: 'Bookings', Icon: Calendar },
  Profile: { label: 'Profile', Icon: User },
};

/** Persistent bottom navigation (Home, Services, Bookings, Profile). */
export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: 8 + insets.bottom }]}>
      {state.routes.map((route, index) => {
        const tab = TABS[route.name];
        if (!tab) return null;
        const isActive = state.index === index;
        const color = isActive ? colors.primary : colors.gray888;
        const { Icon } = tab;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isActive && !event.defaultPrevented) navigation.navigate(route.name as never);
        };

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.tab} accessibilityRole="button">
            <Icon size={20} color={color} strokeWidth={isActive ? 2.5 : 1.75} />
            <Text style={[styles.label, { color, fontWeight: isActive ? '600' : '500' }]}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.dot} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingTop: 8,
    elevation: 2,
  },
  tab: {
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  label: { ...type(10) },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: -2,
  },
});
