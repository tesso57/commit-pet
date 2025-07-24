/**
 * Configuration management for commit-pet
 */

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getConfigDir } from '../utils/config.js';

export interface UserConfig {
  // Display settings
  display?: {
    showEmoji?: boolean;
    colorScheme?: 'default' | 'colorblind' | 'monochrome';
  };
  
  // Pet settings
  pet?: {
    expPerCommit?: number;
    customStages?: boolean;
  };
  
  // Language settings
  language?: 'en' | 'ja';
}

const DEFAULT_CONFIG: UserConfig = {
  display: {
    showEmoji: true,
    colorScheme: 'default',
  },
  pet: {
    expPerCommit: 1,
    customStages: false,
  },
  language: 'en',
};

export class ConfigService {
  private static instance: ConfigService;
  private config: UserConfig = DEFAULT_CONFIG;
  private configPath: string;

  private constructor() {
    this.configPath = join(getConfigDir(), 'config.json');
  }

  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  async load(): Promise<void> {
    if (!existsSync(this.configPath)) {
      return;
    }

    try {
      const content = await readFile(this.configPath, 'utf-8');
      const userConfig = JSON.parse(content) as UserConfig;
      this.config = { ...DEFAULT_CONFIG, ...userConfig };
    } catch {
      console.warn('Failed to load user config, using defaults');
    }
  }

  get(key: keyof UserConfig): unknown {
    return this.config[key];
  }

  getAll(): UserConfig {
    return { ...this.config };
  }

  // Get specific configuration values
  getExpPerCommit(): number {
    return this.config.pet?.expPerCommit ?? DEFAULT_CONFIG.pet!.expPerCommit!;
  }

  getShowEmoji(): boolean {
    return this.config.display?.showEmoji ?? DEFAULT_CONFIG.display!.showEmoji!;
  }

  getColorScheme(): string {
    return this.config.display?.colorScheme ?? DEFAULT_CONFIG.display!.colorScheme!;
  }

  getLanguage(): string {
    return this.config.language ?? DEFAULT_CONFIG.language!;
  }
}