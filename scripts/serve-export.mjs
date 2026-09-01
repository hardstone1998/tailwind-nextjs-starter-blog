// Local verification only; production hosting remains unchanged.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
const argument = (name, fallback) =>
  process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback
const port = Number(argument('port', '3001'))
const prefix = argument('base-path', '/review-preview').replace(/\/$/, '')
const failures = process.argv.includes('--failure-states')
const root = path.resolve('out')
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2',
}
createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store')
  if (failures) res.setHeader('Permissions-Policy', 'clipboard-write=()')
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405).end()
    return
  }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://local.invalid').pathname)
    if (prefix && pathname !== prefix && !pathname.startsWith(prefix + '/')) {
      res.writeHead(404).end()
      return
    }
    const relative = pathname.slice(prefix.length) || '/'
    if (failures && relative === '/search.json') {
      res.writeHead(503).end('Intentional search failure for local QA')
      return
    }
    let file = path.resolve(root, '.' + (relative === '/' ? '/index.html' : relative))
    if (!file.startsWith(root + path.sep)) {
      res.writeHead(404).end()
      return
    }
    try {
      if (!(await stat(file)).isFile()) file += '.html'
    } catch {
      file += '.html'
    }
    const content = await readFile(file)
    res.setHeader('Content-Type', types[path.extname(file)] ?? 'application/octet-stream')
    res.writeHead(200).end(req.method === 'HEAD' ? undefined : content)
  } catch {
    res.writeHead(404).end('Not found')
  }
}).listen(port, '127.0.0.1', () =>
  console.log(
    `Static preview: http://127.0.0.1:${port}${prefix}/ ${failures ? '(intentional failure-state QA)' : ''}`
  )
)
