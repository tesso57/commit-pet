import { homedir } from 'node:os';
import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { FileSystemError } from '../errors/index.js';
import { CONFIG_DIR_NAME, STATE_FILE_NAME } from '../constants/index.js';
import { getErrorMessage } from './error-handler.js';

export function getConfigDir(): string {
  const xdgConfigHome = process.env.XDG_CONFIG_HOME;
  const baseDir = xdgConfigHome || join(homedir(), '.config');
  return join(baseDir, CONFIG_DIR_NAME);
}

export function getStateFilePath(): string {
  return join(getConfigDir(), STATE_FILE_NAME);
}

export async function ensureConfigDir(): Promise<void> {
  try {
    const configDir = getConfigDir();
    await mkdir(configDir, { recursive: true });
  } catch (error) {
    throw new FileSystemError(`Failed to create config directory: ${getErrorMessage(error)}`);
  }
}
