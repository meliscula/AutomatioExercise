const { defineConfig } = require("cypress");

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
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    watchForFileChanges: false
  },
});
