const { config } = require("./wdio.shared.saucelabs");

const SAUCELABS_APP_IOS_SIMULATOR =
  "storage:53b9a9dd-3142-4ca6-9b50-6218233e6334";

exports.config = {
  ...config,
  ...{
    capabilities: [
      {
        maxInstances: 5,
        platformName: "iOS",
        platformVersion: "14.0",
        deviceName: "iPhone 8 Simulator",
        app: SAUCELABS_APP_IOS_SIMULATOR,
        build: "v0.0.2v - Regression test | iOS",
        automationName: "XCUITest",

        // If you want to use the Real Device cloud just pass the testobject_api_key in the capabilities like this:
        // The api key that has a reference to the app-project in the RDC cloud
        // testobject_api_key: process.env.SAUCE_RDC_ACCESS_KEY,
        // testobject_test_name: 'CVSA - iOS test',
      },
    ],
  },
};
