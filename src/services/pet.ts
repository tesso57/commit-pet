import { PetStage, StageThreshold, StageInfo, ExperiencePoints, toExperiencePoints, StageColor } from '../types/index.js';
import { PetError } from '../errors/index.js';
import { STAGE_THRESHOLDS, STAGE_ASCII, STAGE_COLORS } from '../constants/index.js';

export class PetService {
  private stageThresholds: StageThreshold[] = [
    {
      stage: 'egg',
      minExp: toExperiencePoints(STAGE_THRESHOLDS.EGG.MIN),
      maxExp: toExperiencePoints(STAGE_THRESHOLDS.EGG.MAX),
      ascii: STAGE_ASCII.egg,
      color: STAGE_COLORS.egg as StageColor,
    },
    {
      stage: 'chick',
      minExp: toExperiencePoints(STAGE_THRESHOLDS.CHICK.MIN),
      maxExp: toExperiencePoints(STAGE_THRESHOLDS.CHICK.MAX),
      ascii: STAGE_ASCII.chick,
      color: STAGE_COLORS.chick as StageColor,
    },
    {
      stage: 'chicken',
      minExp: toExperiencePoints(STAGE_THRESHOLDS.CHICKEN.MIN),
      maxExp: toExperiencePoints(STAGE_THRESHOLDS.CHICKEN.MAX),
      ascii: STAGE_ASCII.chicken,
      color: STAGE_COLORS.chicken as StageColor,
    },
    {
      stage: 'dragon',
      minExp: toExperiencePoints(STAGE_THRESHOLDS.DRAGON.MIN),
      maxExp: STAGE_THRESHOLDS.DRAGON.MAX === null ? null : toExperiencePoints(STAGE_THRESHOLDS.DRAGON.MAX),
      ascii: STAGE_ASCII.dragon,
      color: STAGE_COLORS.dragon as StageColor,
    },
  ];

  calculateStage(exp: number | ExperiencePoints): PetStage {
    for (const threshold of this.stageThresholds) {
      if (exp >= threshold.minExp && (threshold.maxExp === null || exp <= threshold.maxExp)) {
        return threshold.stage;
      }
    }
    return 'egg';
  }

  getStageInfo(stage: PetStage): StageInfo {
    const threshold = this.stageThresholds.find((t) => t.stage === stage);
    if (!threshold) {
      throw new PetError(`Unknown stage: ${stage}`);
    }

    const nextThreshold = this.stageThresholds.find(
      (t) => t.minExp > (threshold.maxExp ?? Infinity)
    );

    return {
      stage: threshold.stage,
      ascii: threshold.ascii,
      color: threshold.color,
      nextStageExp: nextThreshold ? nextThreshold.minExp : null,
    };
  }

  getNextStageRequirement(currentExp: number | ExperiencePoints): ExperiencePoints | null {
    const currentStage = this.calculateStage(currentExp);
    const currentThreshold = this.stageThresholds.find((t) => t.stage === currentStage);

    if (!currentThreshold || currentThreshold.maxExp === null) {
      return null;
    }

    return toExperiencePoints(currentThreshold.maxExp + 1);
  }

  getProgressPercentage(currentExp: number | ExperiencePoints): number {
    const currentStage = this.calculateStage(currentExp);
    const currentThreshold = this.stageThresholds.find((t) => t.stage === currentStage);

    if (!currentThreshold || currentThreshold.maxExp === null) {
      return 100;
    }

    const stageExp = currentExp - currentThreshold.minExp;
    const stageRange = currentThreshold.maxExp - currentThreshold.minExp + 1;

    return Math.floor((stageExp / stageRange) * 100);
  }
}
