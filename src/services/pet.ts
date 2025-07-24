import { PetStage, StageThreshold, StageInfo } from '../types/index.js';

export class PetService {
  private stageThresholds: StageThreshold[] = [
    {
      stage: 'egg',
      minExp: 0,
      maxExp: 4,
      ascii: `
    ╭───╮
    │ ● │
    ╰───╯`,
      color: 'white',
    },
    {
      stage: 'chick',
      minExp: 5,
      maxExp: 14,
      ascii: `
    ╭◝◜╮
    │˙◡˙│
    ╰─┬─╯
     ╱ ╲`,
      color: 'yellow',
    },
    {
      stage: 'chicken',
      minExp: 15,
      maxExp: 29,
      ascii: `
    ╭─◜◝─╮
    │ ˙◡˙ │
    ├─┬─┬─┤
    │ │ │ │
    ╰─┴─┴─╯`,
      color: 'magenta',
    },
    {
      stage: 'dragon',
      minExp: 30,
      maxExp: null,
      ascii: `
    ╭──🔥──╮
    │ ⚡◉◉⚡ │
    ├─╫─╫─╫─┤
    │ ╫ ╫ ╫ │
    ╰─🔥─🔥─╯`,
      color: 'red',
    },
  ];

  calculateStage(exp: number): PetStage {
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
      throw new Error(`Unknown stage: ${stage}`);
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

  getNextStageRequirement(currentExp: number): number | null {
    const currentStage = this.calculateStage(currentExp);
    const currentThreshold = this.stageThresholds.find((t) => t.stage === currentStage);

    if (!currentThreshold || currentThreshold.maxExp === null) {
      return null;
    }

    return currentThreshold.maxExp + 1;
  }

  getProgressPercentage(currentExp: number): number {
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
