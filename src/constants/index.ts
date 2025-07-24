/**
 * Constants for commit-pet CLI
 */

import { StageColor } from '../types/index.js';

// Pet evolution thresholds
export const STAGE_THRESHOLDS = {
  EGG: {
    MIN: 0,
    MAX: 4,
  },
  CHICK: {
    MIN: 5,
    MAX: 14,
  },
  CHICKEN: {
    MIN: 15,
    MAX: 29,
  },
  DRAGON: {
    MIN: 30,
    MAX: null as null,
  },
} as const;

// Application metadata
export const APP_NAME = 'commit-pet';
export const CONFIG_DIR_NAME = 'commit-pet';
export const STATE_FILE_NAME = 'state.json';

// Experience settings
export const EXP_PER_COMMIT = 1;

// Display settings
export const DISPLAY = {
  BORDER_COLOR: 'cyan',
  ERROR_COLOR: 'red',
  SUCCESS_COLOR: 'green',
  WARNING_COLOR: 'yellow',
  EVOLUTION_COLOR: 'magenta',
} as const;

// ASCII art for each stage
export const STAGE_ASCII = {
  egg: `
  ╭───╮
  │ ● │
  ╰───╯`,
  chick: `
  ╭◝◜╮
  │˙◡˙│
  ╰─┬─╯
   ╱ ╲`,
  chicken: `
  ╭─◜◝─╮
  │ ˙◡˙ │
  ├─┬─┬─┤
  │ │ │ │
  ╰─┴─┴─╯`,
  dragon: `
  ╭──🔥──╮
  │ ⚡◉◉⚡ │
  ├─╫─╫─╫─┤
  │ ╫ ╫ ╫ │
  ╰─🔥─🔥─╯`,
} as const;

// Stage colors
export const STAGE_COLORS: Record<string, StageColor> = {
  egg: 'white',
  chick: 'yellow',
  chicken: 'magenta',
  dragon: 'red',
};

// Error messages
export const ERROR_MESSAGES = {
  NOT_GIT_REPO: 'Not in a git repository! Initialize with: git init',
  NO_COMMITS: 'No commits found! Make your first commit with: git commit',
  UNKNOWN_STAGE: 'Unknown pet stage',
  STATE_PARSE_ERROR: 'Failed to parse state file',
  STATE_SAVE_ERROR: 'Failed to save state',
  CONFIG_DIR_ERROR: 'Failed to create config directory',
} as const;