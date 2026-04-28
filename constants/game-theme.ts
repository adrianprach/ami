import { Uniwind } from 'uniwind';

/**
 * Uniwind game themes (see `app/global.css` @layer theme).
 * Metro always registers `light` and `dark`; `extraThemes` adds `jane` and `oscar`.
 * Prefer these helpers over raw `Uniwind.setTheme` — upstream `ThemeName` types
 * are inferred from an internal module graph and do not list custom themes yet.
 */
export const GAME_THEMES = ['jane', 'oscar'] as const;

export type GameTheme = (typeof GAME_THEMES)[number];
export type AppTheme = 'light' | 'dark' | GameTheme;

export const DEFAULT_GAME_THEME: GameTheme = 'jane';

export function isGameTheme(value: string): value is GameTheme {
  return (GAME_THEMES as readonly string[]).includes(value);
}

export function setGameTheme(theme: GameTheme): void {
  Uniwind.setTheme(theme as never);
}
