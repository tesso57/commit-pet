import React from 'react';
import { render } from 'ink';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import { StateService } from '../services/state.js';
import { PetService } from '../services/pet.js';
import { PetDisplay } from '../components/PetDisplay.js';
import { StatusBar } from '../components/StatusBar.js';
import { PetState, StageInfo } from '../types/index.js';

interface StatusUIProps {
  state: PetState;
  stageInfo: StageInfo;
  progress: number;
}

const StatusUI: React.FC<StatusUIProps> = ({ state, stageInfo, progress }) => {
  return (
    <Box flexDirection="column" paddingX={2}>
      <Box borderStyle="round" borderColor="cyan" paddingX={1}>
        <Text bold>Commit Pet Status</Text>
      </Box>

      <PetDisplay
        stage={state.stage}
        exp={state.exp}
        lastUpdated={new Date(state.updatedAt)}
        ascii={stageInfo.ascii}
        color={stageInfo.color}
      />

      <StatusBar
        currentExp={state.exp}
        nextStageExp={stageInfo.nextStageExp}
        stage={state.stage}
        progress={progress}
      />

      <Box marginTop={1}>
        <Text dimColor>Config: {new StateService().getConfigPath()}</Text>
      </Box>
    </Box>
  );
};

export async function statusCommand(): Promise<void> {
  const stateService = new StateService();
  const petService = new PetService();

  try {
    // Load current state
    const state = await stateService.load();

    // Get stage info
    const stageInfo = petService.getStageInfo(state.stage);
    const progress = petService.getProgressPercentage(state.exp);

    // Render UI
    const { waitUntilExit } = render(
      <StatusUI state={state} stageInfo={stageInfo} progress={progress} />
    );

    await waitUntilExit();
  } catch (error) {
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}
