import stagesJson from "@/constants/stages/stages.json";

import type {
  StageDefinition,
  StageNode,
  StagesMap,
} from "@/interfaces/stages";

const stages = stagesJson as StagesMap;

export function getStages(): StagesMap {
  return stages;
}

export function getStage(stageId: string): StageDefinition | undefined {
  return stages[stageId];
}

export function requireStage(stageId: string): StageDefinition {
  const stage = getStage(stageId);

  if (!stage) {
    throw new Error(`Unknown stage: ${stageId}`);
  }

  return stage;
}

export function getStageNodes(stageId: string): StageNode[] {
  return requireStage(stageId).nodes;
}

export function getStageIds(): string[] {
  return Object.keys(stages);
}

export function getFirstStageId(): string {
  return getStageIds()[0];
}
