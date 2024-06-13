import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      BASE_URL: "https://booking-system-lovat.vercel.app",
      API_URL: "https://booking-system-52fbcxat6q-lz.a.run.app/api",
    },
  },
});
