import { TextInput as RNTextInput, type TextInputProps } from "react-native";
import { ScopedTheme } from "uniwind";

import type { AppTheme } from "@/constants/game-theme";
import { cn } from "@/utils/styling";

export type AppTextInputProps = TextInputProps & {
  theme?: AppTheme;
};

export default function TextInput({
  theme,
  className,
  cursorColorClassName = "accent-primary",
  selectionColorClassName = "accent-primary",
  placeholderTextColorClassName = "accent-muted",
  underlineColorAndroidClassName = "accent-transparent",
  ...rest
}: AppTextInputProps) {
  const content = (
    <RNTextInput
      className={cn(
        "border border-border bg-card text-foreground rounded-lg px-4 py-3 text-base",
        className
      )}
      cursorColorClassName={cursorColorClassName}
      selectionColorClassName={selectionColorClassName}
      placeholderTextColorClassName={placeholderTextColorClassName}
      underlineColorAndroidClassName={underlineColorAndroidClassName}
      {...rest}
    />
  );

  if (!theme) {
    return content;
  }

  return <ScopedTheme theme={theme}>{content}</ScopedTheme>;
}

