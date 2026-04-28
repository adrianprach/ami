import { Pressable, Text, type PressableProps } from "react-native";
import { ScopedTheme } from "uniwind";

import type { AppTheme } from "@/constants/game-theme";
import { cn } from "@/utils/styling";

type ButtonProps = Omit<PressableProps, "children"> & {
  children?: React.ReactNode;
  title?: string;
  theme?: AppTheme;
};

export default function Button({
  children,
  title,
  theme,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const label = title ?? (typeof children === "string" ? children : "Press me");

  const content = (
    <Pressable
      className={cn(
        "rounded-xl bg-primary px-4 py-3 items-center justify-center active:opacity-90 disabled:opacity-50",
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {typeof children === "string" || title ? (
        <Text className="font-semibold text-foreground jane:text-white">{label}</Text>
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