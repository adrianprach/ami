import { Image, ImageSourcePropType, Pressable, Text, View } from "react-native";
import { ScopedTheme } from "uniwind";

import type { AppTheme } from "@/constants/game-theme";

interface Props {
  name: string;
  image: ImageSourcePropType;
  theme?: AppTheme;
  isSelected?: boolean;
  onPress?: () => void;
}

export default function Character({ name, image, theme, isSelected, onPress }: Props) {
  const content = (
    <Pressable
      data-selected={isSelected}
      className="group bg-card border border-border p-4 rounded-xl hover:border-primary hover:border-2 data-[selected=true]:ring-2 data-[selected=true]:ring-primary"
      onPress={onPress}
    >
      <Image
        source={image}
        style={styles.characterImage}
        className="rounded-xl"
      />
      <Text className="bg-background-secondary/80 rounded-xl mt-2 p-2 text-lg text-foreground text-center group-data-[selected=true]:text-primary group-data-[selected=true]:font-semibold">
        {name}
      </Text>
    </Pressable>
  );

  if (!theme) {
    return content;
  }

  return <ScopedTheme theme={theme}>{content}</ScopedTheme>;
}

const styles = {
  characterImage: {
    width: 150,
    height: 250,
  },
};
