# Haven — React Native (Expo + TypeScript)

Native conversion of the Haven Android UI prototype. 9 screens, placeholder data, no backend.

## Run

```bash
npm install
npx expo start        # press "a" for Android, or scan the QR code with Expo Go
```

## Adding to an existing Expo project (instead of using this one)

Copy `App.tsx` and the `src/` folder into your project, then install the extra packages
(`expo install` picks the versions that match your SDK):

```bash
npx expo install react-native-screens react-native-safe-area-context react-native-svg \
  expo-linear-gradient expo-status-bar
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs \
  lucide-react-native
```

## Structure

```
App.tsx                      providers + navigation container
src/
  theme/                     colors, typography (fonts, line-heights, tracking), shadows
  data/                      services, bookings, home/booking content (placeholder data)
  context/AppContext.tsx     bookings, active booking, category filter, booking draft
  navigation/                RootNavigator (stack), TabBar (custom bottom nav), param types
  components/                Button, Card, Screen, ScreenHeader, SectionTitle, StatusBadge,
                             StarRating, Avatar, BackButton
  screens/                   one file per screen (Splash … Profile)
  utils/time.ts              addHours helper
```

## Navigation map

Splash → Main tabs (Home · Services · Bookings · Profile) → Service Detail → Booking Form →
Confirmation → Booking Status. The bottom bar only shows on the four tab screens, as in the design.
