import { Text, type TextProps } from "react-native";
import { ScopedTheme } from "uniwind";

import type { AppTheme } from "@/constants/game-theme";
import { cn } from "@/utils/styling";

export type ThemedTextProps = TextProps & {
  theme?: AppTheme;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  theme,
  type = "default",
  className,
  ...rest
}: ThemedTextProps) {
  const classNameByType = {
    default: "p-2 text-base leading-6 text-foreground",
    title:
      "p-8 text-3xl leading-8 font-bold text-foreground bg-background-secondary",
    defaultSemiBold: "p-2 text-base leading-6 font-semibold text-foreground",
    subtitle: "p-2 text-xl font-bold text-foreground",
    link: "p-2 text-base leading-[30px] text-primary",
  } satisfies Record<NonNullable<ThemedTextProps["type"]>, string>;

  const text = (
    <Text
      className={cn(classNameByType[type], className)}
      style={style}
      {...rest}
    />
  );

  if (!theme) {
    return text;
  }

  return <ScopedTheme theme={theme}>{text}</ScopedTheme>;
}
