const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "viewportHeight": 880,
    "viewportWidth": 1280,
    "defaultCommandTimeout": 30000	
  },
});
