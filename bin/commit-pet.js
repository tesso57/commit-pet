#!/usr/bin/env node
/* eslint-env node */

// Use tsx to run TypeScript files directly
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tsxPath = join(__dirname, '..', 'node_modules', '.bin', 'tsx');
const cliPath = join(__dirname, '..', 'src', 'cli.ts');

// Check if tsx exists
if (!existsSync(tsxPath)) {
  console.error('Error: tsx not found. Please run "npm install" first.');
  process.exit(1);
}

// Check if cli.ts exists
if (!existsSync(cliPath)) {
  console.error('Error: CLI file not found. The package may be corrupted.');
  process.exit(1);
}

const child = spawn(tsxPath, [cliPath, ...process.argv.slice(2)], {
  stdio: 'inherit'
});

child.on('error', (error) => {
  console.error('Failed to start commit-pet:', error.message);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code || 0);
});