import React from 'react';
import { render } from 'ink';
import { Box, Text } from 'ink';
import { createServices } from '../services/factory.js';
import { PetDisplay } from '../components/PetDisplay.js';
import { FeedResult, StageInfo, toExperiencePoints, toCommitSHA } from '../types/index.js';
import { GitError } from '../errors/index.js';
import { handleCommandError } from '../utils/error-handler.js';
import { ERROR_MESSAGES, EXP_PER_COMMIT, DISPLAY } from '../constants/index.js';

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
          <Text color={DISPLAY.WARNING_COLOR}>No new commits since last feeding!</Text>
          <Text dimColor>Make some commits and try again.</Text>
        </Box>
      ) : (
        <>
          <Box marginBottom={1}>
            <Text>
              Fed your pet with{' '}
              <Text bold color={DISPLAY.SUCCESS_COLOR}>
                {result.commitCount}
              </Text>{' '}
              commit{result.commitCount > 1 ? 's' : ''}!
            </Text>
          </Box>

          {isEvolved && (
            <Box marginBottom={1}>
              <Text bold color={DISPLAY.EVOLUTION_COLOR}>
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
  try {
    const { git: gitService, state: stateService, pet: petService } = createServices();

    // Check if we're in a git repository
    const isGitRepo = await gitService.isGitRepository();
    if (!isGitRepo) {
      throw new GitError(ERROR_MESSAGES.NOT_GIT_REPO);
    }

    // Check if there are any commits
    const hasCommits = await gitService.hasCommits();
    if (!hasCommits) {
      throw new GitError(ERROR_MESSAGES.NO_COMMITS);
    }

    // Load current state
    const currentState = await stateService.load();

    // Get commits since last feed
    const commits = await gitService.getCommitsSince(currentState.lastSha);
    const commitCount = commits.length;

    // Calculate new experience
    const newExp = toExperiencePoints(currentState.exp + (commitCount * EXP_PER_COMMIT));
    const previousStage = currentState.stage;
    const newStage = petService.calculateStage(newExp);

    // Get latest commit SHA
    const latestSha = toCommitSHA(await gitService.getLatestCommitSha());

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
      experienceGained: toExperiencePoints(commitCount * EXP_PER_COMMIT),
      totalExp: newExp,
    };

    // Get stage info for display
    const stageInfo = petService.getStageInfo(newStage);

    // Render UI
    const { waitUntilExit } = render(<FeedUI result={result} stageInfo={stageInfo} />);

    await waitUntilExit();
  } catch (error) {
    handleCommandError(error);
  }
}
