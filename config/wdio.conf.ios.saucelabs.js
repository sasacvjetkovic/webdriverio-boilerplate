const { join } = require("path");
const { resolveProjectReferencePath } = require("typescript");
const { config } = require("./wdio.shared.conf");

// .app
const SAUCELABS_APP_IOS = "storage:328e693f-5b75-43e4-9e59-c3724cce2fec";
// .ipa
//const SAUCELABS_APP_IOS = "storage:8d26e283-020c-4b2d-b22c-e21bfeb7a394";

// .apk debug
const SAUCELABS_APP_ANDROID = "storage:60ff9061-5973-4c81-8388-14366d002636";

exports.config = {
  ...config,
  ...{
    specs: ["./test/features/**/*.feature"],

    services: ["sauce"],

    user: "cvsa",
    key: "2fbd1822-fd88-4aed-b04e-bf8eac1c906f",
    //config.region = 'eu';
    //config.sauceConnect = true;

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
    capabilities: [
      {
        maxInstances: 1,
        platformName: "iOS",
        app: SAUCELABS_APP_IOS,
        automationName: "XCUITest",
        // testobject_test_name: 'CVSA - iOS test',
        build: "v0.0.2v - Regression test | iOS",
        newCommandTimeout: 30 * 60000,

        deviceName: "iPhone 8 Simulator",
        platformVersion: "14.0",
        // If you want to use the Real Device cloud just pass the testobject_api_key in the capabilities like this:
        // The api key that has a reference to the app-project in the RDC cloud
        // testobject_api_key: process.env.SAUCE_RDC_ACCESS_KEY,
      },

      {
        maxInstances: 1,
        platformName: "Android",
        app: SAUCELABS_APP_ANDROID,
        // testobject_test_name: 'CVSA - iOS test',
        build: "v0.0.2v - Regression test | Android",
        newCommandTimeout: 30 * 60000,

        deviceName: "Google Pixel 3 GoogleAPI Emulator",
        platformVersion: "11.0",
        // If you want to use the Real Device cloud just pass the testobject_api_key in the capabilities like this:
        // The api key that has a reference to the app-project in the RDC cloud
        // testobject_api_key: process.env.SAUCE_RDC_ACCESS_KEY,
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
      console.log("----   Before iOS scenario   ----");
      console.log("scenario name: " + scenario.name);
      // this.capabilities.testobject_test_name = scenario.name;

      this.config.capabilities.testobject_test_name = scenario.name;
      this.config.capabilities.name = scenario.name;
      this.config.capabilities.build = "333";
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
      this.config.capabilities.name = scenario.name;
      this.config.capabilities.build = "444";
      driver.reset();
    },
  },
};
