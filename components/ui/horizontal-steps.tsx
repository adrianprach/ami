import React from "react";
import { Pressable, Text, View, type PressableProps } from "react-native";
import { ScopedTheme } from "uniwind";

import type { AppTheme } from "@/constants/game-theme";
import { cn } from "@/utils/styling";

type StepState = "upcoming" | "current" | "completed";

export type StepProps = Omit<PressableProps, "children"> & {
  text: string;
  /** Optional override; usually injected by `HorizontalSteps`. */
  index?: number;
  /** Optional override; usually injected by `HorizontalSteps`. */
  state?: StepState;
};

export function Step({
  text,
  index = 1,
  state = "upcoming",
  className,
  ...rest
}: StepProps) {
  return (
    <Pressable
      data-state={state}
      className={cn("group items-center disabled:opacity-45", className)}
      accessibilityRole="button"
      accessibilityState={{
        selected: state === "current",
        disabled: rest.disabled ? true : false,
      }}
      {...rest}
    >
      <View
        className={cn(
          "h-9 w-9 rounded-full border border-border bg-card items-center justify-center group-data-[state=current]:bg-primary group-data-[state=current]:border-primary group-data-[state=completed]:bg-primary group-data-[state=completed]:border-primary group-disabled:bg-background-secondary group-disabled:border-border-subtle",
          { 'bg-primary/60!' : rest.disabled}
        )}
      >
        <Text className="text-sm font-semibold text-foreground group-data-[state=current]:text-white group-data-[state=completed]:text-white group-disabled:text-foreground-secondary">
          {index}
        </Text>
      </View>
    </Pressable>
  );
}

export type HorizontalStepsProps = {
  children: React.ReactNode;
  /** 1-based step index. */
  currentStep?: number;
  theme?: AppTheme;
  className?: string;
};

export function HorizontalSteps({
  children,
  currentStep = 1,
  theme,
  className,
}: HorizontalStepsProps) {
  const items = React.Children.toArray(children).filter(
    Boolean,
  ) as React.ReactElement<StepProps>[];

  const content = (
    <View
      className={cn("flex-row items-start justify-center gap-2", className)}
    >
      {items.map((child, i) => {
        const index = i + 1;
        const state: StepState =
          index < currentStep
            ? "completed"
            : index === currentStep
              ? "current"
              : "upcoming";

        return (
          <React.Fragment key={child.key ?? index}>
            {React.cloneElement(child, { index, state })}
            {i < items.length - 1 ? (
              <View
                aria-hidden
                className={cn(
                  "mt-4 h-[2px] w-8 rounded bg-border-subtle",
                  index < currentStep && "bg-primary",
                )}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </View>
  );

  if (!theme) return content;
  return <ScopedTheme theme={theme}>{content}</ScopedTheme>;
}
