import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      API_URL: "https://booking-system-52fbcxat6q-lz.a.run.app/api",
    },
  },
});
