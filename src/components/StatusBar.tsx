import React from 'react';
import { Box, Text } from 'ink';
import { PetStage } from '../types/index.js';

interface StatusBarProps {
  currentExp: number;
  nextStageExp: number | null;
  stage: PetStage;
  progress: number;
}

const SimpleProgressBar: React.FC<{ percent: number }> = ({ percent }) => {
  const width = 30;
  const filled = Math.round((percent / 100) * width);
  const empty = width - filled;
  
  return (
    <Box>
      <Text color="green">{'█'.repeat(filled)}</Text>
      <Text dimColor>{'░'.repeat(empty)}</Text>
    </Box>
  );
};

export const StatusBar: React.FC<StatusBarProps> = ({
  currentExp,
  nextStageExp,
  stage,
  progress,
}) => {
  if (stage === 'dragon') {
    return (
      <Box flexDirection="column" marginTop={1}>
        <Text bold color="red">
          🔥 MAX LEVEL REACHED! 🔥
        </Text>
        <Text dimColor>Your pet has evolved into a mighty dragon!</Text>
      </Box>
    );
  }

  const remaining = nextStageExp ? nextStageExp - currentExp : 0;

  return (
    <Box flexDirection="column" marginTop={1}>
      <Box>
        <Text>Progress to next stage: </Text>
        <Text bold color="green">
          {progress}%
        </Text>
      </Box>
      <Box marginY={0.5}>
        <SimpleProgressBar percent={progress} />
      </Box>
      <Text dimColor>
        {remaining} more commit{remaining !== 1 ? 's' : ''} to evolve!
      </Text>
    </Box>
  );
};
