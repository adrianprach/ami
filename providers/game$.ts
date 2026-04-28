import { Character, Gender } from "@/constants/game";
import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";

interface GameProps {
  character?: Character;
  name: string;
  gender?: Gender;
  step: "character-selection" | "customise-character";
}

export const game$ = observable<GameProps>({
  character: undefined,
  gender: undefined,
  name: "",
  step: "character-selection",
});

syncObservable(game$, {
  persist: {
    name: "game$",
    plugin: ObservablePersistMMKV,
  },
});
