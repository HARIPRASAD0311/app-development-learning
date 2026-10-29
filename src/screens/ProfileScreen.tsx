import { CommonActions } from '@react-navigation/native';
import {
  Bell,
  ChevronRight,
  CreditCard,
  FileText,
  HelpCircle,
  MapPin,
} from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { TabScreenProps } from '../navigation/types';
import { colors, fonts, shadows, type } from '../theme';

const MENU = [
  { label: 'Saved Addresses', sub: 'Flat 4B, Emerald Heights, Adyar', Icon: MapPin },
  { label: 'Payment Methods', sub: 'UPI, Credit Cards saved', Icon: CreditCard },
  { label: 'Notification Preferences', sub: 'SMS & WhatsApp updates enabled', Icon: Bell },
  { label: 'Help & Support', sub: '24/7 Home Care Concierge', Icon: HelpCircle },
  { label: 'Privacy & Terms', sub: 'Data policy and user terms', Icon: FileText },
];

export function ProfileScreen({ navigation }: TabScreenProps<'Profile'>) {
  const logOut = () =>
    navigation
      .getParent()
      ?.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Splash' }] }));

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Customer header */}
        <Card padding={16} shadow="xs" style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>H</Text>
          </View>
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.name}>Hariprasad</Text>
            <Text style={styles.meta}>B.Tech AI & DS • +91 98765 43210</Text>
            <View style={styles.memberWrap}>
              <Text style={styles.member}>Haven Gold Member</Text>
            </View>
          </View>
        </Card>

        {/* Menu */}
        <View style={styles.menu}>
          {MENU.map(({ label, sub, Icon }, idx) => (
            <Pressable
              key={label}
              style={({ pressed }) => [
                styles.menuRow,
                idx > 0 && styles.menuDivider,
                pressed && { backgroundColor: colors.canvas },
              ]}
            >
              <View style={styles.menuLeft}>
                <Icon size={16} color={colors.primary} />
                <View>
                  <Text style={styles.menuLabel}>{label}</Text>
                  <Text style={styles.menuSub}>{sub}</Text>
                </View>
              </View>
              <ChevronRight size={16} color={colors.gray888} />
            </Pressable>
          ))}
        </View>

        {/* App info */}
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Haven Mobile for Android v2.4.0</Text>
          <Text style={styles.infoSub}>Designed for Chennai, TN • Crafted with Care</Text>
        </View>

        <Button label="Log Out" variant="outlineDanger" paddingVertical={12} onPress={logOut} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.xs,
  },
  avatarText: { ...type(18), fontFamily: fonts.serif, fontWeight: '700', color: colors.white },
  name: { ...type(16), fontWeight: '700', color: colors.text },
  meta: { ...type(12), color: colors.gray666 },
  memberWrap: {
    alignSelf: 'flex-start',
    backgroundColor: colors.sageLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  member: { ...type(10), fontWeight: '600', color: colors.primary },

  menu: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.xs,
  },
  menuRow: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuDivider: { borderTopWidth: 1, borderTopColor: colors.border },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuLabel: { ...type(12), fontWeight: '700', color: colors.text },
  menuSub: { ...type(10), color: colors.gray888 },

  info: {
    backgroundColor: colors.sageLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primaryBorder20,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  infoTitle: { ...type(12), fontWeight: '700', color: colors.primary },
  infoSub: { ...type(10), color: colors.gray666 },
});
