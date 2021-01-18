const { join } = require("path");
const { config } = require("./wdio.shared.conf");

// ============
// Specs
// ============

exports.config = {
  ...config,
  ...{
    specs: ["./test/features/**/*.feature"],

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
    capabilities: [
      {
        maxInstances: 1,
        browserName: "",
        appiumVersion: "1.20.0-beta.0",
        platformName: "iOS",
        platformVersion: "14.3",
        deviceName: "iPhone 11",
        app: "./apps/iOS-Simulator-NativeDemoApp-0.2.1.app",
        automationName: "XCUITest",
        newCommandTimeout: 30 * 60000,
        fullReset: false,
        noReset: true,
      },
    ],

    beforeScenario: (
      uri,
      feature,
      scenario,
      result,
      sourceLocation,
      context
    ) => {
      console.log("----   Before iOS scenario  ----");
      console.log("scenario name: " + scenario.name);
      driver.reloadSession();
    },

    afterScenario: (
      uri,
      feature,
      scenario,
      result,
      sourceLocation,
      context
    ) => {
      console.log("----   After iOS scenario   ----");
      console.log("scenario name: " + scenario.name);
      driver.reset();
    },
  },
};