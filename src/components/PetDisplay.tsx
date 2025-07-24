import React from 'react';
import { Box, Text } from 'ink';
import { PetStage } from '../types/index.js';

interface PetDisplayProps {
  stage: PetStage;
  exp: number;
  lastUpdated: Date;
  ascii: string;
  color: string;
}

export const PetDisplay: React.FC<PetDisplayProps> = ({
  stage,
  exp,
  lastUpdated,
  ascii,
  color,
}) => {
  const formatStage = (stage: PetStage): string => {
    return stage.charAt(0).toUpperCase() + stage.slice(1);
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return 'just now';
    }
  };

  return (
    <Box flexDirection="column" alignItems="center" paddingY={1}>
      <Text color={color}>{ascii}</Text>
      <Box marginTop={1}>
        <Text bold color={color}>
          {formatStage(stage)}
        </Text>
        <Text dimColor> • </Text>
        <Text dimColor>{exp} EXP</Text>
      </Box>
      <Text dimColor>Last fed: {formatDate(lastUpdated)}</Text>
    </Box>
  );
};
