import { build } from 'esbuild';

await build({
  entryPoints: ['src/cli.ts'],
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'cjs',
  outfile: 'dist/cli.cjs',
  banner: {
    js: '#!/usr/bin/env node\n',
  },
  external: ['ink'],
});
