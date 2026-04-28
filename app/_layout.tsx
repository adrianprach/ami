import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useLayoutEffect } from "react";
import { ScopedTheme, useUniwind } from "uniwind";
import "react-native-reanimated";
import "./global.css";
import { DEFAULT_GAME_THEME, setGameTheme } from "@/constants/game-theme";
import { useValue } from "@legendapp/state/react";
import { game$ } from "@/providers/game$";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const game = useValue(game$);
  const { theme, hasAdaptiveThemes } = useUniwind();
  const resolvedTheme = hasAdaptiveThemes ? "light" : theme;
  const isDarkTheme = resolvedTheme === "dark" || resolvedTheme === "oscar";

  useLayoutEffect(() => {
    setGameTheme(
      (game.character as typeof DEFAULT_GAME_THEME) ?? DEFAULT_GAME_THEME,
    );
  }, []);

  return (
    <ThemeProvider value={isDarkTheme ? DarkTheme : DefaultTheme}>
      <ScopedTheme theme={theme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style={isDarkTheme ? "light" : "dark"} />
      </ScopedTheme>
    </ThemeProvider>
  );
}
