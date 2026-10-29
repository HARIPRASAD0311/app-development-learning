import { Platform, TextStyle } from 'react-native';

/** Design uses a serif display face, a clean sans for body and monospace for prices/ids. */
export const fonts = {
  serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }) as string,
  mono: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }) as string,
};

// Line-heights matching the reference (Tailwind text sizes / 1.5 default for arbitrary sizes)
const LINE_HEIGHT: Record<number, number> = {
  9: 13.5,
  10: 15,
  11: 16.5,
  12: 16,
  14: 20,
  16: 24,
  18: 28,
  20: 28,
  24: 32,
};

/** Returns fontSize + lineHeight pair. */
export const type = (size: number, lineHeight?: number): TextStyle => ({
  fontSize: size,
  lineHeight: lineHeight ?? LINE_HEIGHT[size] ?? Math.round(size * 1.5),
});

/** letter-spacing in em -> px (tracking-wider = 0.05em, tracking-widest = 0.1em, tracking-tight = -0.025em) */
export const tracking = {
  tight: (size: number) => -0.025 * size,
  wider: (size: number) => 0.05 * size,
  widest: (size: number) => 0.1 * size,
};
