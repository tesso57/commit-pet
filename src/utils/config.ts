import { homedir } from 'node:os';
import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';

export function getConfigDir(): string {
  const xdgConfigHome = process.env.XDG_CONFIG_HOME;
  const baseDir = xdgConfigHome || join(homedir(), '.config');
  return join(baseDir, 'commit-pet');
}

export function getStateFilePath(): string {
  return join(getConfigDir(), 'state.json');
}

export async function ensureConfigDir(): Promise<void> {
  const configDir = getConfigDir();
  await mkdir(configDir, { recursive: true });
}
