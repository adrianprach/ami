import { View } from "react-native";

import Character from "@/components/character-selections/character";
import { ThemedText } from "@/components/themed-text";
import Button from "@/components/ui/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { HorizontalSteps, Step } from "@/components/ui/horizontal-steps";
import TextInput from "@/components/ui/text-input";
import { CHARACTERS, GENDERS } from "@/constants/game";
import { Fonts } from "@/constants/theme";
import { getStage, getStageIds, getStages } from "@/lib/stages";
import { game$ } from "@/providers/game$";
import { useObservable, useValue } from "@legendapp/state/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScopedTheme } from "uniwind";
import { useState } from "react";

const c1Image = require("@/assets/avatar/a1.jpg");
const c2Image = require("@/assets/avatar/a3.jpg");

export default function ContinueScreen() {
  const game = useValue(game$);
  const currentStage = getStage(game.current_stage_id!);
  const [node, setNode] = useState(currentStage?.nodes[0]);
  const node$ = useObservable({});
  const getNode = (id: string) =>
    currentStage?.nodes.find((node) => node.id === id);
  console.log({ currentStage });
  return (
    <ScopedTheme theme={game?.character ?? "dark"}>
      <SafeAreaView>
        <View className="pt-8 bg-background-secondary">
          <HorizontalSteps currentStep={2}>
            {currentStage?.nodes.map((node, index) => (
              <Step
                text={node.text}
                onPress={() => setNode(node)}
                key={node.id}
              />
            ))}
          </HorizontalSteps>
        </View>

        <View className="flex-1 flex pb-8 gap-2 overflow-hidden bg-background text-foreground">
          <ThemedText
            className="py-8"
            type="title"
            style={{
              fontFamily: Fonts.rounded,
            }}
          >
            {node?.id}
          </ThemedText>
          <ThemedText className="px-8">{node?.text}</ThemedText>
          <View>
            <ButtonGroup direction="vertical">
              {node?.choices?.map((choice, choiceIndex) => (
                <ButtonGroupItem
                  key={`${node.id}-choice-${choiceIndex}`}
                  onPress={() => setNode(getNode(choice.next!))}
                >
                  {choice.text!}
                </ButtonGroupItem>
              ))}
            </ButtonGroup>
          </View>
        </View>
      </SafeAreaView>
    </ScopedTheme>
  );
}
