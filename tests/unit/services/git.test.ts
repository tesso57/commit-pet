import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GitService } from '../../../src/services/git.js';
import { execa } from 'execa';

// Mock execa
vi.mock('execa');

describe('GitService', () => {
  let gitService: GitService;

  beforeEach(() => {
    gitService = new GitService();
    vi.clearAllMocks();
  });

  describe('isGitRepository', () => {
    it('should return true when in a git repository', async () => {
      vi.mocked(execa).mockResolvedValue({ stdout: '.git', stderr: '', exitCode: 0 } as any);
      
      const result = await gitService.isGitRepository();
      
      expect(result).toBe(true);
      expect(execa).toHaveBeenCalledWith('git', ['rev-parse', '--git-dir']);
    });

    it('should return false when not in a git repository', async () => {
      vi.mocked(execa).mockRejectedValue(new Error('not a git repository'));
      
      const result = await gitService.isGitRepository();
      
      expect(result).toBe(false);
    });
  });

  describe('getCommitsSince', () => {
    it('should return commits since specified SHA', async () => {
      const mockCommits = 'abc123\ndef456\nghi789';
      vi.mocked(execa).mockResolvedValue({ stdout: mockCommits, stderr: '', exitCode: 0 } as any);
      
      const result = await gitService.getCommitsSince('oldsha');
      
      expect(result).toEqual(['abc123', 'def456', 'ghi789']);
      expect(execa).toHaveBeenCalledWith('git', ['log', '--format=%H', 'oldsha..HEAD']);
    });

    it('should return all commits when SHA is null', async () => {
      const mockCommits = 'abc123\ndef456';
      vi.mocked(execa).mockResolvedValue({ stdout: mockCommits, stderr: '', exitCode: 0 } as any);
      
      const result = await gitService.getCommitsSince(null);
      
      expect(result).toEqual(['abc123', 'def456']);
      expect(execa).toHaveBeenCalledWith('git', ['log', '--format=%H']);
    });

    it('should return all commits when SHA is not found', async () => {
      const mockError = new Error('bad revision');
      vi.mocked(execa)
        .mockRejectedValueOnce(mockError)
        .mockResolvedValueOnce({ stdout: 'abc123', stderr: '', exitCode: 0 } as any);
      
      const result = await gitService.getCommitsSince('nonexistent');
      
      expect(result).toEqual(['abc123']);
    });
  });

  describe('getAllCommits', () => {
    it('should return all commits', async () => {
      const mockCommits = 'abc123\ndef456\nghi789';
      vi.mocked(execa).mockResolvedValue({ stdout: mockCommits, stderr: '', exitCode: 0 } as any);
      
      const result = await gitService.getAllCommits();
      
      expect(result).toEqual(['abc123', 'def456', 'ghi789']);
    });

    it('should return empty array when repository has no commits', async () => {
      const mockError = new Error('does not have any commits');
      vi.mocked(execa).mockRejectedValue(mockError);
      
      const result = await gitService.getAllCommits();
      
      expect(result).toEqual([]);
    });

    it('should throw GitError for other errors', async () => {
      const mockError = new Error('fatal error');
      vi.mocked(execa).mockRejectedValue(mockError);
      
      await expect(gitService.getAllCommits()).rejects.toThrow('Failed to get commits');
    });
  });

  describe('getLatestCommitSha', () => {
    it('should return the latest commit SHA', async () => {
      vi.mocked(execa).mockResolvedValue({ stdout: 'abc123def456', stderr: '', exitCode: 0 } as any);
      
      const result = await gitService.getLatestCommitSha();
      
      expect(result).toBe('abc123def456');
      expect(execa).toHaveBeenCalledWith('git', ['rev-parse', 'HEAD']);
    });

    it('should throw GitError when no commits found', async () => {
      const mockError = new Error('fatal: ambiguous argument');
      vi.mocked(execa).mockRejectedValue(mockError);
      
      await expect(gitService.getLatestCommitSha()).rejects.toThrow('No commits found');
    });
  });

  describe('hasCommits', () => {
    it('should return true when repository has commits', async () => {
      vi.mocked(execa).mockResolvedValue({ stdout: 'abc123', stderr: '', exitCode: 0 } as any);
      
      const result = await gitService.hasCommits();
      
      expect(result).toBe(true);
    });

    it('should return false when repository has no commits', async () => {
      vi.mocked(execa).mockRejectedValue(new Error('no commits'));
      
      const result = await gitService.hasCommits();
      
      expect(result).toBe(false);
    });
  });
});