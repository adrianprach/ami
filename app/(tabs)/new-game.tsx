import { Image } from "expo-image";
import { Platform, StyleSheet, Text, View } from "react-native";

import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Character from "@/components/character-selections/character";

const bgImage = require("@/assets/background/bg-1.jpg");
const c1Image = require("@/assets/avatar/a1.jpg");
const c2Image = require("@/assets/avatar/a2.jpg");

export default function NewGameScreen() {
  return (
    <View className="flex-1 flex p-8 gap-2 overflow-hidden">
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Choose your characters
        </ThemedText>
      </ThemedView>
      <ThemedText>Select a protagonist to begin your journey.</ThemedText>
      <View className="mt-4 flex flex-row gap-1 justify-around">
        <Character name="Oscar" image={c2Image} />
        <Character name="Jane" image={c1Image} />
        
      </View>
    </View>
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
