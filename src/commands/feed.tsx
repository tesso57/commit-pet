import React from 'react';
import { render } from 'ink';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import { GitService } from '../services/git.js';
import { StateService } from '../services/state.js';
import { PetService } from '../services/pet.js';
import { PetDisplay } from '../components/PetDisplay.js';
import { FeedResult, StageInfo } from '../types/index.js';

interface FeedUIProps {
  result: FeedResult;
  stageInfo: StageInfo;
}

const FeedUI: React.FC<FeedUIProps> = ({ result, stageInfo }) => {
  const isEvolved = result.previousStage !== result.currentStage;

  return (
    <Box flexDirection="column" paddingX={2}>
      {result.commitCount === 0 ? (
        <Box flexDirection="column" alignItems="center">
          <Text color="yellow">No new commits since last feeding!</Text>
          <Text dimColor>Make some commits and try again.</Text>
        </Box>
      ) : (
        <>
          <Box marginBottom={1}>
            <Text>
              Fed your pet with{' '}
              <Text bold color="green">
                {result.commitCount}
              </Text>{' '}
              commit{result.commitCount > 1 ? 's' : ''}!
            </Text>
          </Box>

          {isEvolved && (
            <Box marginBottom={1}>
              <Text bold color="magenta">
                🎉 Your pet evolved from {result.previousStage} to {result.currentStage}! 🎉
              </Text>
            </Box>
          )}

          <PetDisplay
            stage={result.currentStage}
            exp={result.totalExp}
            lastUpdated={new Date()}
            ascii={stageInfo.ascii}
            color={stageInfo.color}
          />

          <Box marginTop={1}>
            <Text dimColor>
              Total EXP: <Text bold>{result.totalExp}</Text>
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
};

export async function feedCommand(): Promise<void> {
  const gitService = new GitService();
  const stateService = new StateService();
  const petService = new PetService();

  // Check if we're in a git repository
  const isGitRepo = await gitService.isGitRepository();
  if (!isGitRepo) {
    console.error(chalk.red('Error:'), 'Not in a git repository!');
    console.log(chalk.dim('Initialize a git repository with: git init'));
    process.exit(1);
  }

  // Check if there are any commits
  const hasCommits = await gitService.hasCommits();
  if (!hasCommits) {
    console.error(chalk.red('Error:'), 'No commits found in this repository!');
    console.log(chalk.dim('Make your first commit with: git commit'));
    process.exit(1);
  }

  // Load current state
  const currentState = await stateService.load();

  // Get commits since last feed
  const commits = await gitService.getCommitsSince(currentState.lastSha);
  const commitCount = commits.length;

  // Calculate new experience
  const newExp = currentState.exp + commitCount;
  const previousStage = currentState.stage;
  const newStage = petService.calculateStage(newExp);

  // Get latest commit SHA
  const latestSha = await gitService.getLatestCommitSha();

  // Update state
  const newState = {
    stage: newStage,
    exp: newExp,
    lastSha: latestSha,
    updatedAt: new Date().toISOString(),
  };
  await stateService.save(newState);

  // Prepare result
  const result: FeedResult = {
    previousStage,
    currentStage: newStage,
    commitCount,
    experienceGained: commitCount,
    totalExp: newExp,
  };

  // Get stage info for display
  const stageInfo = petService.getStageInfo(newStage);

  // Render UI
  const { waitUntilExit } = render(<FeedUI result={result} stageInfo={stageInfo} />);

  await waitUntilExit();
}
