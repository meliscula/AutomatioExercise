const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'https://automationexercise.com',
    setupNodeEvents(on, config) {
      on('task', {
        setEmail: (email) => {
          savedEmail = email;
          return null;
        },
        getEmail: () => {
          return savedEmail;
        }
      });
      allureWriter(on, config);
      return config;
    },
    env: {
      allure: true,
      allureReuseAfterSpec: true
    },
    chromeWebSecurity: false,
    watchForFileChanges: false
  },
});
