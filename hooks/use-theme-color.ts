/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUniwind } from 'uniwind';

export function useThemeColor(
  props: { light?: string; dark?: string; jane?: string; oscar?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark & keyof typeof Colors.jane & keyof typeof Colors.oscar
) {
  const colorScheme = useColorScheme() ?? 'light';
  const { theme } = useUniwind();
  const resolvedTheme = theme && theme in Colors ? theme : colorScheme;
  const colorFromProps = props[resolvedTheme as keyof typeof props];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[resolvedTheme as keyof typeof Colors][colorName];
  }
}
