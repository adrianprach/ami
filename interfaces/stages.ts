export interface StageImpact {
  [key: string]: number;
}

export interface StageChoice {
  text: string;
  next: string;
  impact?: StageImpact;
  set_flags?: string[];
}

export interface StageNode {
  id: string;
  text: string;
  choices?: StageChoice[];
  next?: string;
  next_stage?: string;
  impact?: StageImpact;
  set_flags?: string[];
}

export interface StageDefinition {
  stage_id: string;
  stage_name?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  nodes: StageNode[];
  __source?: string;
}

export type StagesMap = Record<string, StageDefinition>;
