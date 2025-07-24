import { describe, it, expect } from 'vitest';
import {
  CommitPetError,
  GitError,
  StateError,
  PetError,
  ValidationError,
  FileSystemError,
  isCommitPetError,
  formatErrorMessage,
} from '../../../src/errors/index.js';

describe('Error Classes', () => {
  describe('CommitPetError', () => {
    it('should create error with message and code', () => {
      const error = new CommitPetError('Test error', 'TEST_CODE');
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(CommitPetError);
      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_CODE');
      expect(error.name).toBe('CommitPetError');
    });
  });

  describe('GitError', () => {
    it('should create GitError with GIT_ERROR code', () => {
      const error = new GitError('Git operation failed');
      
      expect(error).toBeInstanceOf(CommitPetError);
      expect(error.message).toBe('Git operation failed');
      expect(error.code).toBe('GIT_ERROR');
      expect(error.name).toBe('GitError');
    });
  });

  describe('StateError', () => {
    it('should create StateError with STATE_ERROR code', () => {
      const error = new StateError('State operation failed');
      
      expect(error).toBeInstanceOf(CommitPetError);
      expect(error.message).toBe('State operation failed');
      expect(error.code).toBe('STATE_ERROR');
      expect(error.name).toBe('StateError');
    });
  });

  describe('PetError', () => {
    it('should create PetError with PET_ERROR code', () => {
      const error = new PetError('Pet operation failed');
      
      expect(error).toBeInstanceOf(CommitPetError);
      expect(error.message).toBe('Pet operation failed');
      expect(error.code).toBe('PET_ERROR');
      expect(error.name).toBe('PetError');
    });
  });

  describe('ValidationError', () => {
    it('should create ValidationError with VALIDATION_ERROR code', () => {
      const error = new ValidationError('Validation failed');
      
      expect(error).toBeInstanceOf(CommitPetError);
      expect(error.message).toBe('Validation failed');
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.name).toBe('ValidationError');
    });
  });

  describe('FileSystemError', () => {
    it('should create FileSystemError with FILESYSTEM_ERROR code', () => {
      const error = new FileSystemError('File operation failed');
      
      expect(error).toBeInstanceOf(CommitPetError);
      expect(error.message).toBe('File operation failed');
      expect(error.code).toBe('FILESYSTEM_ERROR');
      expect(error.name).toBe('FileSystemError');
    });
  });

  describe('isCommitPetError', () => {
    it('should return true for CommitPetError instances', () => {
      expect(isCommitPetError(new CommitPetError('test', 'TEST'))).toBe(true);
      expect(isCommitPetError(new GitError('test'))).toBe(true);
      expect(isCommitPetError(new StateError('test'))).toBe(true);
      expect(isCommitPetError(new PetError('test'))).toBe(true);
      expect(isCommitPetError(new ValidationError('test'))).toBe(true);
      expect(isCommitPetError(new FileSystemError('test'))).toBe(true);
    });

    it('should return false for non-CommitPetError instances', () => {
      expect(isCommitPetError(new Error('test'))).toBe(false);
      expect(isCommitPetError('string')).toBe(false);
      expect(isCommitPetError(123)).toBe(false);
      expect(isCommitPetError(null)).toBe(false);
      expect(isCommitPetError(undefined)).toBe(false);
      expect(isCommitPetError({})).toBe(false);
    });
  });

  describe('formatErrorMessage', () => {
    it('should format CommitPetError with code', () => {
      const error = new GitError('Git failed');
      expect(formatErrorMessage(error)).toBe('[GIT_ERROR] Git failed');
    });

    it('should format regular Error without code', () => {
      const error = new Error('Regular error');
      expect(formatErrorMessage(error)).toBe('Regular error');
    });

    it('should handle non-Error values', () => {
      expect(formatErrorMessage('string')).toBe('An unknown error occurred');
      expect(formatErrorMessage(123)).toBe('An unknown error occurred');
      expect(formatErrorMessage(null)).toBe('An unknown error occurred');
      expect(formatErrorMessage(undefined)).toBe('An unknown error occurred');
    });
  });
});