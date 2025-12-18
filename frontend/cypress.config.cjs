const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:5173",
    specPattern: [
      "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}",
      "cypress/e2e/**/*.feature",
    ],

    async setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);

      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);

      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },

    async setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
  },
});
