import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { PetState } from '../types/index.js';
import { getStateFilePath, ensureConfigDir } from '../utils/config.js';

export class StateService {
  private stateFilePath: string;

  constructor() {
    this.stateFilePath = getStateFilePath();
  }

  async load(): Promise<PetState> {
    await ensureConfigDir();

    if (!existsSync(this.stateFilePath)) {
      return this.getDefaultState();
    }

    try {
      const content = await readFile(this.stateFilePath, 'utf-8');
      const state = JSON.parse(content) as PetState;

      // Validate the loaded state
      if (this.isValidState(state)) {
        return state;
      } else {
        console.warn('Invalid state file detected, resetting to default state');
        return this.getDefaultState();
      }
    } catch {
      console.warn('Failed to load state file, resetting to default state');
      return this.getDefaultState();
    }
  }

  async save(state: PetState): Promise<void> {
    await ensureConfigDir();

    const content = JSON.stringify(state, null, 2);
    await writeFile(this.stateFilePath, content, 'utf-8');
  }

  private getDefaultState(): PetState {
    return {
      stage: 'egg',
      exp: 0,
      lastSha: null,
      updatedAt: new Date().toISOString(),
    };
  }

  private isValidState(state: any): state is PetState {
    return (
      state &&
      typeof state === 'object' &&
      ['egg', 'chick', 'chicken', 'dragon'].includes(state.stage) &&
      typeof state.exp === 'number' &&
      (state.lastSha === null || typeof state.lastSha === 'string') &&
      typeof state.updatedAt === 'string'
    );
  }

  getConfigPath(): string {
    return this.stateFilePath;
  }
}
