import { StyleSheet, View } from "react-native";

import Character from "@/components/character-selections/character";
import { ThemedText } from "@/components/themed-text";
import { Fonts } from "@/constants/theme";
import { useValue } from "@legendapp/state/react";
import { game$ } from "@/providers/game$";
import { CHARACTERS } from "@/constants/game";
import Button from "@/components/ui/button";
import { ScopedTheme } from "uniwind";

const bgImage = require("@/assets/background/bg-1.jpg");
const c1Image = require("@/assets/avatar/a1.jpg");
const c2Image = require("@/assets/avatar/a3.jpg");

export default function NewGameScreen() {
  const game = useValue(game$);
  console.log({ game });
  return (
    <ScopedTheme theme={game?.character ?? "dark"}>
    <View className="flex-1 flex pb-8 gap-2 overflow-hidden bg-background text-foreground">
      <ThemedText
        className="pt-16"
        type="title"
        style={{
          fontFamily: Fonts.rounded,
        }}
      >
        Choose your starting point:
      </ThemedText>
      <ThemedText className="px-8">
        Select a protagonist to begin your journey.
      </ThemedText>
      <View className="mt-4 flex flex-row gap-1 justify-around">
        <Character
          name="Oscar"
          image={c2Image}
          theme="oscar"
          isSelected={CHARACTERS.OSCAR == game?.character}
          onPress={() => game$.character.set(CHARACTERS.OSCAR)}
        />
        <Character
          name="Jane"
          image={c1Image}
          theme="jane"
          isSelected={CHARACTERS.JANE == game?.character}
          onPress={() => game$.character.set(CHARACTERS.JANE)}
        />
      </View>
      <Button theme={game?.character} className="m-4 rounded-sm">CONTINUE</Button>
    </View>
    </ScopedTheme>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "auto",
    height: 500,
  },

  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
