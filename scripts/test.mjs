import { build } from 'esbuild'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'research-rubric-tests-'))
try {
  const outfile = path.join(temp, 'tests.mjs')
  await build({
    entryPoints: ['scripts/review.test.ts'],
    outfile,
    bundle: true,
    platform: 'node',
    format: 'esm',
    logLevel: 'silent',
  })
  const result = spawnSync(process.execPath, ['--test', outfile], { stdio: 'inherit' })
  process.exitCode = result.status ?? 1
} finally {
  // Delete only the unique temporary directory created by this process.
  fs.rmSync(temp, { recursive: true, force: true })
}
