import { View } from "react-native";

import Character from "@/components/character-selections/character";
import { ThemedText } from "@/components/themed-text";
import Button from "@/components/ui/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { HorizontalSteps, Step } from "@/components/ui/horizontal-steps";
import TextInput from "@/components/ui/text-input";
import { CHARACTERS, GENDERS } from "@/constants/game";
import { Fonts } from "@/constants/theme";
import { getStageIds, getStages } from "@/lib/stages";
import { game$ } from "@/providers/game$";
import { useValue } from "@legendapp/state/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScopedTheme } from "uniwind";

const c1Image = require("@/assets/avatar/a1.jpg");
const c2Image = require("@/assets/avatar/a3.jpg");

export default function NewGameScreen() {
  const stages = getStages()
  const stageNodes = getStageIds()
  console.log({stages, stageNodes})
  const game = useValue(game$);
  return (
    <ScopedTheme theme={game?.character ?? "dark"}>
      <SafeAreaView>
        <View className="pt-8 bg-background-secondary">
          <HorizontalSteps currentStep={2}>
            <Step
              text="1"
              onPress={() => game$.step.set("character-selection")}
            />
            <Step
              text="2"
              onPress={() => game$.step.set("customise-character")}
              disabled={!game.character}
            />
          </HorizontalSteps>
        </View>

        {game.step === "character-selection" && (
          <View className="flex-1 flex pb-8 gap-2 overflow-hidden bg-background text-foreground">
            <ThemedText
              className="py-8"
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
            <Button
              theme={game?.character}
              onPress={() => game$.step.set("customise-character")}
              className="m-4 rounded-sm"
            >
              CONTINUE
            </Button>
          </View>
        )}

        {game.step == "customise-character" && (
          <View className="flex-1 flex pb-8 gap-2 overflow-hidden bg-background text-foreground">
            <ThemedText
              className="py-8"
              type="title"
              style={{
                fontFamily: Fonts.rounded,
              }}
            >
              Customised Character
            </ThemedText>

            <ThemedText className="px-8">Make this story your own</ThemedText>
            <View className="mt-4 flex flex-row gap-1 justify-around">
              <Character
                imageMaxHeight={200}
                name={game.name ? game.name : game.character!}
                image={game.character == "jane" ? c1Image : c2Image}
                theme="oscar"
                isSelected={CHARACTERS.OSCAR == game?.character}
              />
            </View>
            <View className="mt-4 flex flex-col justify-center w-full gap-3 space-x-8 px-2">
              <View className="">
                <ThemedText className="px-0 py-0 text-sm font-semibold text-foreground">
                  Name:
                </ThemedText>
                <TextInput
                defaultValue={game.name}
                  placeholder="Enter name..."
                  onChangeText={game$.name.set}
                />
              </View>
              <View className="">
                <ThemedText className="px-0 py-0 text-sm font-semibold text-foreground">
                  Gender:
                </ThemedText>
                <ButtonGroup className="flex flex-1">
                  <ButtonGroupItem
                    variant="outline"
                    isSelected={GENDERS.MALE == game.gender}
                    className="flex-1/2"
                    onPress={() => game$.gender.set(GENDERS.MALE)}
                  >
                    Male
                  </ButtonGroupItem>
                  <ButtonGroupItem
                    variant="outline"
                    isSelected={GENDERS.FEMALE == game.gender}
                    className="flex-1/2"
                    onPress={() => game$.gender.set(GENDERS.FEMALE)}
                  >
                    Female
                  </ButtonGroupItem>
                </ButtonGroup>
                <Button className="my-2">CONTINUE</Button>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ScopedTheme>
  );
}
