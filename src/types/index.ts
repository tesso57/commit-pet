// Branded types for type safety
export type ExperiencePoints = number & { readonly _brand: unique symbol };
export type CommitSHA = string & { readonly _brand: unique symbol };

// Helper functions to create branded types
export function toExperiencePoints(value: number): ExperiencePoints {
  if (value < 0) {
    throw new Error('Experience points cannot be negative');
  }
  return value as ExperiencePoints;
}

export function toCommitSHA(value: string): CommitSHA {
  if (!value || value.length !== 40) {
    throw new Error('Invalid commit SHA');
  }
  return value as CommitSHA;
}

export const PET_STAGES = ['egg', 'chick', 'chicken', 'dragon'] as const;
export type PetStage = typeof PET_STAGES[number];

// Type guards
export function isPetStage(value: unknown): value is PetStage {
  return typeof value === 'string' && PET_STAGES.includes(value as PetStage);
}

export interface PetState {
  readonly stage: PetStage;
  readonly exp: ExperiencePoints;
  readonly lastSha: CommitSHA | null;
  readonly updatedAt: string; // ISO 8601 format
}

// Type guard for PetState
export function isPetState(value: unknown): value is PetState {
  return (
    typeof value === 'object' &&
    value !== null &&
    'stage' in value &&
    'exp' in value &&
    'lastSha' in value &&
    'updatedAt' in value &&
    isPetStage((value as Record<string, unknown>).stage) &&
    typeof (value as Record<string, unknown>).exp === 'number' &&
    (value as Record<string, unknown>).exp >= 0 &&
    ((value as Record<string, unknown>).lastSha === null || typeof (value as Record<string, unknown>).lastSha === 'string') &&
    typeof (value as Record<string, unknown>).updatedAt === 'string'
  );
}

export const STAGE_COLORS = ['white', 'yellow', 'magenta', 'red'] as const;
export type StageColor = typeof STAGE_COLORS[number];

export interface StageThreshold {
  readonly stage: PetStage;
  readonly minExp: ExperiencePoints;
  readonly maxExp: ExperiencePoints | null;
  readonly ascii: string;
  readonly color: StageColor;
}

export interface FeedResult {
  readonly previousStage: PetStage;
  readonly currentStage: PetStage;
  readonly commitCount: number;
  readonly experienceGained: ExperiencePoints;
  readonly totalExp: ExperiencePoints;
}

export interface StageInfo {
  readonly stage: PetStage;
  readonly ascii: string;
  readonly color: StageColor;
  readonly nextStageExp: ExperiencePoints | null;
}
