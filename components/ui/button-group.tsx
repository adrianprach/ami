import React from "react";
import { View } from "react-native";
import { ScopedTheme } from "uniwind";

import type { AppTheme } from "@/constants/game-theme";
import { cn } from "@/utils/styling";

import Button from "@/components/ui/button";

type ButtonGroupDirection = "horizontal" | "vertical";

export type ButtonGroupProps = {
  children?: React.ReactNode;
  theme?: AppTheme;
  direction?: ButtonGroupDirection;
  className?: string;
};

export function ButtonGroup({
  children,
  theme,
  direction = "horizontal",
  className,
}: ButtonGroupProps) {
  const content = (
    <View
      className={cn(
        "gap-2",
        direction === "horizontal" ? "flex-row items-center" : "flex-col",
        className
      )}
    >
      {children}
    </View>
  );

  if (!theme) {
    return content;
  }

  return <ScopedTheme theme={theme}>{content}</ScopedTheme>;
}

export type ButtonGroupItemProps = React.ComponentProps<typeof Button> & {
  isSelected?: boolean;
  selectedVariant?: React.ComponentProps<typeof Button>["variant"];
  unselectedVariant?: React.ComponentProps<typeof Button>["variant"];
};

export function ButtonGroupItem({
  isSelected,
  variant,
  selectedVariant = "solid",
  unselectedVariant = "outline",
  className,
  ...props
}: ButtonGroupItemProps) {
  const resolvedVariant =
    variant ?? (isSelected ? selectedVariant : unselectedVariant);

  return (
    <Button
      data-selected={isSelected}
      variant={resolvedVariant}
      className={cn(
        isSelected &&
          resolvedVariant === "outline" &&
          "border-primary bg-background-secondary",
        className
      )}
      {...props}
    />
  );
}

