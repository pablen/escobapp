import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
    setupNodeEvents(on, config) {
      return config
    },
    specPattern: 'cypress/integration/**/*.spec.ts',
    supportFile: 'cypress/support/index.ts',
  },
  blockHosts: ['www.google-analytics.com'],
  video: false,
})
