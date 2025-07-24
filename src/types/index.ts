export type PetStage = 'egg' | 'chick' | 'chicken' | 'dragon';

export interface PetState {
  stage: PetStage;
  exp: number;
  lastSha: string | null;
  updatedAt: string;
}

export interface StageThreshold {
  stage: PetStage;
  minExp: number;
  maxExp: number | null;
  ascii: string;
  color: string;
}

export interface FeedResult {
  previousStage: PetStage;
  currentStage: PetStage;
  commitCount: number;
  experienceGained: number;
  totalExp: number;
}

export interface StageInfo {
  stage: PetStage;
  ascii: string;
  color: string;
  nextStageExp: number | null;
}
