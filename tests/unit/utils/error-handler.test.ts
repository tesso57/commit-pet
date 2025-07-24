import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleCommandError, getErrorMessage } from '../../../src/utils/error-handler.js';
import { CommitPetError } from '../../../src/errors/index.js';

describe('error-handler utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleCommandError', () => {
    it('should log error and exit with code 1', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const processExitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called');
      });

      const error = new Error('Test error');

      expect(() => handleCommandError(error)).toThrow('process.exit called');
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(processExitSpy).toHaveBeenCalledWith(1);

      consoleErrorSpy.mockRestore();
      processExitSpy.mockRestore();
    });

    it('should format CommitPetError correctly', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const processExitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called');
      });

      const error = new CommitPetError('Custom error', 'CUSTOM_CODE');

      expect(() => handleCommandError(error)).toThrow('process.exit called');
      
      // Check that console.error was called with the formatted message
      const calls = consoleErrorSpy.mock.calls;
      expect(calls.length).toBe(1);
      expect(calls[0][1]).toContain('[CUSTOM_CODE]');
      expect(calls[0][1]).toContain('Custom error');

      consoleErrorSpy.mockRestore();
      processExitSpy.mockRestore();
    });
  });

  describe('getErrorMessage', () => {
    it('should return error message for Error instances', () => {
      const error = new Error('Test error message');
      expect(getErrorMessage(error)).toBe('Test error message');
    });

    it('should return "Unknown error" for non-Error values', () => {
      expect(getErrorMessage('string error')).toBe('Unknown error');
      expect(getErrorMessage(123)).toBe('Unknown error');
      expect(getErrorMessage(null)).toBe('Unknown error');
      expect(getErrorMessage(undefined)).toBe('Unknown error');
      expect(getErrorMessage({})).toBe('Unknown error');
    });

    it('should handle custom error types', () => {
      const customError = new CommitPetError('Custom pet error', 'PET_ERROR');
      expect(getErrorMessage(customError)).toBe('Custom pet error');
    });
  });
});