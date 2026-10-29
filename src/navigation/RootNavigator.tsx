import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { BookingConfirmationScreen } from '../screens/BookingConfirmationScreen';
import { BookingFormScreen } from '../screens/BookingFormScreen';
import { BookingStatusScreen } from '../screens/BookingStatusScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MyBookingsScreen } from '../screens/MyBookingsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ServiceDetailScreen } from '../screens/ServiceDetailScreen';
import { ServiceListingsScreen } from '../screens/ServiceListingsScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { colors } from '../theme';
import { TabBar } from './TabBar';
import { RootStackParamList, TabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tabs.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.canvas } }}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Services" component={ServiceListingsScreen} />
      <Tabs.Screen name="Bookings" component={MyBookingsScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.canvas } }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
      <Stack.Screen name="BookingForm" component={BookingFormScreen} />
      <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
      <Stack.Screen name="BookingStatus" component={BookingStatusScreen} />
    </Stack.Navigator>
  );
}
