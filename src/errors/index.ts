/**
 * Custom error classes for commit-pet CLI
 */

export class CommitPetError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'CommitPetError';
    Object.setPrototypeOf(this, CommitPetError.prototype);
  }
}

export class GitError extends CommitPetError {
  constructor(message: string) {
    super(message, 'GIT_ERROR');
    this.name = 'GitError';
  }
}

export class StateError extends CommitPetError {
  constructor(message: string) {
    super(message, 'STATE_ERROR');
    this.name = 'StateError';
  }
}

export class PetError extends CommitPetError {
  constructor(message: string) {
    super(message, 'PET_ERROR');
    this.name = 'PetError';
  }
}

export class ValidationError extends CommitPetError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class FileSystemError extends CommitPetError {
  constructor(message: string) {
    super(message, 'FILESYSTEM_ERROR');
    this.name = 'FileSystemError';
  }
}

export function isCommitPetError(error: unknown): error is CommitPetError {
  return error instanceof CommitPetError;
}

export function formatErrorMessage(error: unknown): string {
  if (isCommitPetError(error)) {
    return `[${error.code}] ${error.message}`;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred';
}