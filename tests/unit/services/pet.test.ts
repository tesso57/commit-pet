import { describe, it, expect } from 'vitest';
import { PetService } from '../../../src/services/pet.js';

describe('PetService', () => {
  const petService = new PetService();

  describe('calculateStage', () => {
    it('should return egg for 0-4 exp', () => {
      expect(petService.calculateStage(0)).toBe('egg');
      expect(petService.calculateStage(2)).toBe('egg');
      expect(petService.calculateStage(4)).toBe('egg');
    });

    it('should return chick for 5-14 exp', () => {
      expect(petService.calculateStage(5)).toBe('chick');
      expect(petService.calculateStage(10)).toBe('chick');
      expect(petService.calculateStage(14)).toBe('chick');
    });

    it('should return chicken for 15-29 exp', () => {
      expect(petService.calculateStage(15)).toBe('chicken');
      expect(petService.calculateStage(20)).toBe('chicken');
      expect(petService.calculateStage(29)).toBe('chicken');
    });

    it('should return dragon for 30+ exp', () => {
      expect(petService.calculateStage(30)).toBe('dragon');
      expect(petService.calculateStage(100)).toBe('dragon');
      expect(petService.calculateStage(1000)).toBe('dragon');
    });
  });

  describe('getProgressPercentage', () => {
    it('should calculate correct progress for egg stage', () => {
      expect(petService.getProgressPercentage(0)).toBe(0);
      expect(petService.getProgressPercentage(2)).toBe(40);
      expect(petService.getProgressPercentage(4)).toBe(80);
    });

    it('should calculate correct progress for chick stage', () => {
      expect(petService.getProgressPercentage(5)).toBe(0);
      expect(petService.getProgressPercentage(10)).toBe(50);
      expect(petService.getProgressPercentage(14)).toBe(90);
    });

    it('should return 100 for max level', () => {
      expect(petService.getProgressPercentage(30)).toBe(100);
      expect(petService.getProgressPercentage(50)).toBe(100);
    });
  });

  describe('getNextStageRequirement', () => {
    it('should return correct next stage requirement', () => {
      expect(petService.getNextStageRequirement(0)).toBe(5);
      expect(petService.getNextStageRequirement(4)).toBe(5);
      expect(petService.getNextStageRequirement(5)).toBe(15);
      expect(petService.getNextStageRequirement(14)).toBe(15);
      expect(petService.getNextStageRequirement(15)).toBe(30);
      expect(petService.getNextStageRequirement(29)).toBe(30);
    });

    it('should return null for max level', () => {
      expect(petService.getNextStageRequirement(30)).toBe(null);
      expect(petService.getNextStageRequirement(100)).toBe(null);
    });
  });

  describe('getStageInfo', () => {
    it('should return correct stage info', () => {
      const eggInfo = petService.getStageInfo('egg');
      expect(eggInfo.stage).toBe('egg');
      expect(eggInfo.color).toBe('white');
      expect(eggInfo.nextStageExp).toBe(5);

      const dragonInfo = petService.getStageInfo('dragon');
      expect(dragonInfo.stage).toBe('dragon');
      expect(dragonInfo.color).toBe('red');
      expect(dragonInfo.nextStageExp).toBe(null);
    });
  });
});
