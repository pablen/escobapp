import { readFile } from 'node:fs/promises'

const [serviceWorker, manifest] = await Promise.all([
  readFile('dist/service-worker.js', 'utf8'),
  readFile('dist/manifest.webmanifest', 'utf8'),
])

const assert = (condition, message) => {
  if (!condition) throw new Error(message)
}

assert(
  serviceWorker.includes('precacheAndRoute'),
  'The generated service worker must precache the application bundle.',
)
assert(
  serviceWorker.includes('cleanupOutdatedCaches'),
  'The generated service worker must clean outdated precaches.',
)

const parsedManifest = JSON.parse(manifest)
assert(parsedManifest.name === 'Escobapp', 'The PWA manifest has an invalid name.')
assert(
  parsedManifest.display === 'standalone',
  'The PWA manifest must use standalone display mode.',
)
