import { execa, ExecaError } from 'execa';
import { GitError } from '../errors/index.js';
import { ERROR_MESSAGES } from '../constants/index.js';
import { getErrorMessage } from '../utils/error-handler.js';

export class GitService {
  async isGitRepository(): Promise<boolean> {
    try {
      await execa('git', ['rev-parse', '--git-dir']);
      return true;
    } catch {
      return false;
    }
  }

  async getCommitsSince(sha: string | null): Promise<string[]> {
    try {
      const args = ['log', '--format=%H'];

      if (sha) {
        // Get commits after the specified SHA
        args.push(`${sha}..HEAD`);
      }

      const { stdout } = await execa('git', args);
      return stdout.split('\n').filter((line) => line.trim().length > 0);
    } catch (error) {
      if (error instanceof Error && error.message.includes('bad revision')) {
        // If SHA is not found, return all commits
        return this.getAllCommits();
      }
      throw new GitError(`Failed to get commits: ${this.formatGitError(error)}`);
    }
  }

  async getAllCommits(): Promise<string[]> {
    try {
      const { stdout } = await execa('git', ['log', '--format=%H']);
      return stdout.split('\n').filter((line) => line.trim().length > 0);
    } catch (error) {
      if (error instanceof Error && error.message.includes('does not have any commits')) {
        return [];
      }
      throw new GitError(`Failed to get commits: ${this.formatGitError(error)}`);
    }
  }

  async getLatestCommitSha(): Promise<string> {
    try {
      const { stdout } = await execa('git', ['rev-parse', 'HEAD']);
      return stdout.trim();
    } catch (error) {
      if (error instanceof Error && error.message.includes('fatal: ambiguous argument')) {
        throw new GitError(ERROR_MESSAGES.NO_COMMITS.split('!')[0]);
      }
      throw new GitError(`Failed to get latest commit: ${this.formatGitError(error)}`);
    }
  }

  async hasCommits(): Promise<boolean> {
    try {
      await this.getLatestCommitSha();
      return true;
    } catch {
      return false;
    }
  }

  private formatGitError(error: unknown): string {
    if (error instanceof ExecaError) {
      return error.stderr || error.message;
    }
    return getErrorMessage(error);
  }
}
