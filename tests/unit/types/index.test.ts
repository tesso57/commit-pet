import { describe, it, expect } from 'vitest';
import {
  toExperiencePoints,
  toCommitSHA,
  isPetStage,
  isPetState,
  PET_STAGES,
  STAGE_COLORS,
} from '../../../src/types/index.js';

describe('Type Utilities', () => {
  describe('toExperiencePoints', () => {
    it('should create ExperiencePoints for valid non-negative numbers', () => {
      const exp0 = toExperiencePoints(0);
      const exp10 = toExperiencePoints(10);
      const exp100 = toExperiencePoints(100);

      expect(exp0).toBe(0);
      expect(exp10).toBe(10);
      expect(exp100).toBe(100);
    });

    it('should throw error for negative numbers', () => {
      expect(() => toExperiencePoints(-1)).toThrow('Experience points cannot be negative');
      expect(() => toExperiencePoints(-10)).toThrow('Experience points cannot be negative');
    });
  });

  describe('toCommitSHA', () => {
    it('should create CommitSHA for valid 40-character strings', () => {
      const validSHA = 'a'.repeat(40);
      const sha = toCommitSHA(validSHA);
      
      expect(sha).toBe(validSHA);
    });

    it('should throw error for invalid SHAs', () => {
      expect(() => toCommitSHA('')).toThrow('Invalid commit SHA');
      expect(() => toCommitSHA('abc')).toThrow('Invalid commit SHA');
      expect(() => toCommitSHA('a'.repeat(39))).toThrow('Invalid commit SHA');
      expect(() => toCommitSHA('a'.repeat(41))).toThrow('Invalid commit SHA');
    });
  });

  describe('isPetStage', () => {
    it('should return true for valid pet stages', () => {
      expect(isPetStage('egg')).toBe(true);
      expect(isPetStage('chick')).toBe(true);
      expect(isPetStage('chicken')).toBe(true);
      expect(isPetStage('dragon')).toBe(true);
    });

    it('should return false for invalid values', () => {
      expect(isPetStage('invalid')).toBe(false);
      expect(isPetStage('')).toBe(false);
      expect(isPetStage(123)).toBe(false);
      expect(isPetStage(null)).toBe(false);
      expect(isPetStage(undefined)).toBe(false);
      expect(isPetStage({})).toBe(false);
    });
  });

  describe('isPetState', () => {
    it('should return true for valid PetState objects', () => {
      const validState = {
        stage: 'egg',
        exp: 0,
        lastSha: null,
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      expect(isPetState(validState)).toBe(true);
    });

    it('should return true for PetState with valid SHA', () => {
      const validState = {
        stage: 'dragon',
        exp: 100,
        lastSha: 'a'.repeat(40),
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      expect(isPetState(validState)).toBe(true);
    });

    it('should return false for invalid stage', () => {
      const invalidState = {
        stage: 'invalid',
        exp: 0,
        lastSha: null,
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      expect(isPetState(invalidState)).toBe(false);
    });

    it('should return false for negative exp', () => {
      const invalidState = {
        stage: 'egg',
        exp: -1,
        lastSha: null,
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      expect(isPetState(invalidState)).toBe(false);
    });

    it('should return false for missing properties', () => {
      expect(isPetState({ stage: 'egg' })).toBe(false);
      expect(isPetState({ exp: 0 })).toBe(false);
      expect(isPetState({})).toBe(false);
    });

    it('should return false for non-object values', () => {
      expect(isPetState(null)).toBe(false);
      expect(isPetState(undefined)).toBe(false);
      expect(isPetState('string')).toBe(false);
      expect(isPetState(123)).toBe(false);
    });
  });

  describe('Constants', () => {
    it('should have correct PET_STAGES', () => {
      expect(PET_STAGES).toEqual(['egg', 'chick', 'chicken', 'dragon']);
    });

    it('should have correct STAGE_COLORS', () => {
      expect(STAGE_COLORS).toEqual(['white', 'yellow', 'magenta', 'red']);
    });
  });
});