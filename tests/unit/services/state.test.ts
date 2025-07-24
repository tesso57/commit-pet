import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StateService } from '../../../src/services/state.js';
import { existsSync } from 'node:fs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

// Mock the fs modules
vi.mock('node:fs');
vi.mock('node:fs/promises');

describe('StateService', () => {
  let stateService: StateService;

  beforeEach(() => {
    stateService = new StateService();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('load', () => {
    it('should return default state when file does not exist', async () => {
      vi.mocked(existsSync).mockReturnValue(false);
      vi.mocked(mkdir).mockResolvedValue(undefined);

      const state = await stateService.load();

      expect(state.stage).toBe('egg');
      expect(state.exp).toBe(0);
      expect(state.lastSha).toBe(null);
      expect(state.updatedAt).toBeDefined();
    });

    it('should load existing valid state', async () => {
      const mockState = {
        stage: 'chicken',
        exp: 20,
        lastSha: 'abc123',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFile).mockResolvedValue(JSON.stringify(mockState));
      vi.mocked(mkdir).mockResolvedValue(undefined);

      const state = await stateService.load();

      expect(state).toEqual(mockState);
    });

    it('should return default state when file is corrupted', async () => {
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFile).mockResolvedValue('invalid json');
      vi.mocked(mkdir).mockResolvedValue(undefined);

      const state = await stateService.load();

      expect(state.stage).toBe('egg');
      expect(state.exp).toBe(0);
    });

    it('should return default state when state is invalid', async () => {
      const invalidState = {
        stage: 'invalid_stage',
        exp: 'not_a_number',
      };

      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFile).mockResolvedValue(JSON.stringify(invalidState));
      vi.mocked(mkdir).mockResolvedValue(undefined);

      const state = await stateService.load();

      expect(state.stage).toBe('egg');
      expect(state.exp).toBe(0);
    });
  });

  describe('save', () => {
    it('should save state to file', async () => {
      const mockState = {
        stage: 'chick' as const,
        exp: 10,
        lastSha: 'def456',
        updatedAt: '2024-01-02T00:00:00.000Z',
      };

      vi.mocked(mkdir).mockResolvedValue(undefined);
      vi.mocked(writeFile).mockResolvedValue(undefined);

      await stateService.save(mockState);

      expect(writeFile).toHaveBeenCalledWith(
        expect.stringContaining('state.json'),
        JSON.stringify(mockState, null, 2),
        'utf-8'
      );
    });
  });
});
