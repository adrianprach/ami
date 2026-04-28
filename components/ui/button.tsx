import { Pressable, Text, type PressableProps } from "react-native";
import { ScopedTheme } from "uniwind";

import type { AppTheme } from "@/constants/game-theme";
import { cn } from "@/utils/styling";

type ButtonProps = Omit<PressableProps, "children"> & {
  children?: React.ReactNode;
  title?: string;
  theme?: AppTheme;
  variant?: "solid" | "outline" | "link";
};

export default function Button({
  children,
  title,
  theme,
  variant = "solid",
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const label = title ?? (typeof children === "string" ? children : "Press me");

  const containerClassNameByVariant = {
    solid:
      "rounded-xl bg-primary px-4 py-3 items-center justify-center active:opacity-90 disabled:opacity-50",
    outline:
      "rounded-xl border border-border bg-transparent px-4 py-3 items-center justify-center active:bg-background-secondary/50 disabled:opacity-50",
    link: "px-2 py-2 items-center justify-center active:opacity-80 disabled:opacity-50",
  } satisfies Record<NonNullable<ButtonProps["variant"]>, string>;

  const textClassNameByVariant = {
    solid: "font-semibold text-foreground jane:text-white",
    outline: "font-semibold text-foreground",
    link: "font-semibold text-primary underline",
  } satisfies Record<NonNullable<ButtonProps["variant"]>, string>;

  const content = (
    <Pressable
      className={cn(
        containerClassNameByVariant[variant],
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {typeof children === "string" || title ? (
        <Text className={textClassNameByVariant[variant]}>{label}</Text>
      ) : (
        children
      )}
    </Pressable>
  );

  if (!theme) {
    return content;
  }

  return <ScopedTheme theme={theme}>{content}</ScopedTheme>;
}