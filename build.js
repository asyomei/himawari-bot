import dedent from 'dedent'
import { build } from 'esbuild'

await build({
  entryPoints: ['./src/main.ts'],
  outdir: 'dist',
  format: 'esm',
  outExtension: { '.js': '.mjs' },
  platform: 'node',
  bundle: true,
  sourcemap: 'linked',
  banner: {
    js: dedent`
      import { createRequire } from "node:module";
      var require = createRequire(import.meta.dirname);
    `,
  },
})
