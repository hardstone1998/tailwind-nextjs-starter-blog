import { build } from 'esbuild'
export async function loadReviewSources() {
  const result = await build({
    stdin: {
      contents: `export * from './data/siteConfig'; export * from './data/capability-rubrics'; export * from './data/capability-assessments'; export {default as professionalProjects} from './data/professionalProjects'; export * from './data/professionalProjects.en'; export {default as projectsData} from './data/projectsData'; export * from './lib/assessment'; export * from './lib/blog-language';`,
      resolveDir: process.cwd(),
      loader: 'ts',
    },
    bundle: true,
    platform: 'node',
    format: 'esm',
    write: false,
    logLevel: 'silent',
  })
  return import(
    'data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text).toString('base64')
  )
}
