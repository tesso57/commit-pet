import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { PetState, isPetState, toExperiencePoints } from '../types/index.js';
import { getStateFilePath, ensureConfigDir } from '../utils/config.js';
import { StateError, FileSystemError, ValidationError } from '../errors/index.js';
import { getErrorMessage } from '../utils/error-handler.js';

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
      let state: unknown;
      
      try {
        state = JSON.parse(content);
      } catch (error) {
        throw new StateError(`Failed to parse state file: ${error instanceof Error ? error.message : 'Invalid JSON'}`);
      }

      // Validate the loaded state
      if (isPetState(state)) {
        // Convert exp to branded type
        return {
          ...state,
          exp: toExperiencePoints(state.exp),
        } as PetState;
      } else {
        throw new ValidationError('Invalid state file format');
      }
    } catch (error) {
      // Check for our custom errors by their code property
      if (error instanceof Error && 'code' in error && 
          (error.code === 'STATE_ERROR' || error.code === 'VALIDATION_ERROR')) {
        console.warn(error.message + ', resetting to default state');
        return this.getDefaultState();
      }
      throw new FileSystemError(`Failed to read state file: ${getErrorMessage(error)}`);
    }
  }

  async save(state: PetState): Promise<void> {
    try {
      await ensureConfigDir();
      
      if (!isPetState(state)) {
        throw new ValidationError('Cannot save invalid state');
      }

      const content = JSON.stringify(state, null, 2);
      await writeFile(this.stateFilePath, content, 'utf-8');
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new FileSystemError(`Failed to save state: ${getErrorMessage(error)}`);
    }
  }

  private getDefaultState(): PetState {
    return {
      stage: 'egg',
      exp: toExperiencePoints(0),
      lastSha: null,
      updatedAt: new Date().toISOString(),
    };
  }

  private isValidState(state: unknown): state is PetState {
    return isPetState(state);
  }

  getConfigPath(): string {
    return this.stateFilePath;
  }
}
