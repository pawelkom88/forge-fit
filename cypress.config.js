import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:5173/app",
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    video: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    // env: {
    //   baseUrl: "http://localhost:5173",
    // },
    defaultBrowser: "chrome",
  },
});
