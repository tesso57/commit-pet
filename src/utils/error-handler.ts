/**
 * Shared error handling utilities
 */

import chalk from 'chalk';
import { formatErrorMessage } from '../errors/index.js';

/**
 * Handle command errors by logging and exiting
 * @param error - The error to handle
 */
export function handleCommandError(error: unknown): never {
  console.error(chalk.red('Error:'), formatErrorMessage(error));
  process.exit(1);
}

/**
 * Get a safe error message from an unknown error
 * @param error - The error to get message from
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error';
}