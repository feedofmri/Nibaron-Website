#!/usr/bin/env node

// Custom build script to handle Vite build with proper permissions
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const vitePath = join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');

const buildProcess = spawn('node', [vitePath, 'build'], {
  stdio: 'inherit',
  cwd: __dirname
});

buildProcess.on('exit', (code) => {
  process.exit(code);
});

buildProcess.on('error', (error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
