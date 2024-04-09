import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: "wwor6x",
  e2e: {
    baseUrl: 'https://madison-timeline.vercel.app/',
    
    setupNodeEvents(on, config) {
        // implement node event listeners here
      },
  },
})