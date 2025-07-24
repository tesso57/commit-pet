import { execa } from 'execa';

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
    } catch {
      // If there's an error (e.g., SHA not found), return all commits
      return this.getAllCommits();
    }
  }

  async getAllCommits(): Promise<string[]> {
    try {
      const { stdout } = await execa('git', ['log', '--format=%H']);
      return stdout.split('\n').filter((line) => line.trim().length > 0);
    } catch {
      return [];
    }
  }

  async getLatestCommitSha(): Promise<string> {
    try {
      const { stdout } = await execa('git', ['rev-parse', 'HEAD']);
      return stdout.trim();
    } catch {
      throw new Error('No commits found in this repository');
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
}
