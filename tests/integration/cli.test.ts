import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execa, execaCommand } from 'execa';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

describe('CLI Integration Tests', () => {
  let tempDir: string;
  let originalCwd: string;

  beforeEach(async () => {
    // Create a temporary directory for testing
    tempDir = await mkdtemp(join(tmpdir(), 'commit-pet-test-'));
    originalCwd = process.cwd();
    process.chdir(tempDir);
    
    // Set up a test git repository
    await execaCommand('git init');
    await execaCommand('git config user.email "test@example.com"');
    await execaCommand('git config user.name "Test User"');
    
    // Set XDG_CONFIG_HOME to use temp directory
    process.env.XDG_CONFIG_HOME = join(tempDir, '.config');
  });

  afterEach(async () => {
    // Restore original directory
    process.chdir(originalCwd);
    
    // Clean up
    await rm(tempDir, { recursive: true, force: true });
    delete process.env.XDG_CONFIG_HOME;
  });

  describe('commit-pet status', () => {
    it('should show initial status with egg stage', async () => {
      const result = await execaCommand('commit-pet status');
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Egg');
      expect(result.stdout).toContain('0 EXP');
    });

    it('should show help when called with --help', async () => {
      const result = await execaCommand('commit-pet --help');
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Usage');
      expect(result.stdout).toContain('Commands');
      expect(result.stdout).toContain('feed');
      expect(result.stdout).toContain('status');
    });
  });

  describe('commit-pet feed', () => {
    it('should show error when no commits in repository', async () => {
      try {
        await execaCommand('commit-pet feed');
      } catch (error: any) {
        expect(error.exitCode).toBe(1);
        expect(error.stderr).toContain('No commits found');
      }
    });

    it('should feed pet with new commits', async () => {
      // Create a commit
      await writeFile(join(tempDir, 'test.txt'), 'test content');
      await execaCommand('git add test.txt');
      await execa('git', ['commit', '-m', 'Initial commit']);
      
      // Feed the pet
      const result = await execaCommand('commit-pet feed');
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Fed your pet with');
      expect(result.stdout).toContain('1 commit');
      expect(result.stdout).toContain('1 EXP');
    });

    it('should handle evolution', async () => {
      // Create multiple commits to trigger evolution
      for (let i = 0; i < 5; i++) {
        await writeFile(join(tempDir, `test${i}.txt`), `content${i}`);
        await execaCommand(`git add test${i}.txt`);
        await execa('git', ['commit', '-m', `Commit ${i}`]);
      }
      
      // Feed the pet
      const result = await execaCommand('commit-pet feed');
      
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Your pet evolved');
      expect(result.stdout).toContain('Chick');
    });
  });

  describe('Error handling', () => {
    it('should show error when not in git repository', async () => {
      // Change to a non-git directory
      const nonGitDir = await mkdtemp(join(tmpdir(), 'non-git-'));
      process.chdir(nonGitDir);
      
      try {
        await execaCommand('commit-pet feed');
      } catch (error: any) {
        expect(error.exitCode).toBe(1);
        expect(error.stderr).toContain('Not in a git repository');
      }
      
      // Clean up
      process.chdir(originalCwd);
      await rm(nonGitDir, { recursive: true, force: true });
    });

    it('should show error when repository has no commits', async () => {
      try {
        await execaCommand('commit-pet feed');
      } catch (error: any) {
        expect(error.exitCode).toBe(1);
        expect(error.stderr).toContain('No commits found');
      }
    });
  });
});