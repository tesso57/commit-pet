import meow from 'meow';
import chalk from 'chalk';
import { feedCommand } from './commands/feed.js';
import { statusCommand } from './commands/status.js';

const cli = meow(
  `
  ${chalk.bold('Usage')}
    $ commit-pet <command>

  ${chalk.bold('Commands')}
    feed     Feed your pet with commits
    status   Show pet status

  ${chalk.bold('Examples')}
    $ commit-pet feed
    $ commit-pet status
`,
  {
    importMeta: import.meta,
    flags: {
      help: {
        type: 'boolean',
        shortFlag: 'h',
      },
      version: {
        type: 'boolean',
        shortFlag: 'v',
      },
    },
  }
);

const command = cli.input[0];

async function main() {
  try {
    switch (command) {
      case 'feed':
        await feedCommand();
        break;
      case 'status':
        await statusCommand();
        break;
      default:
        cli.showHelp();
        break;
    }
  } catch (error) {
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

main();
