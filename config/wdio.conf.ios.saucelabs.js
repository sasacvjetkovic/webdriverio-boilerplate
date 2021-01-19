const { config } = require("./wdio.shared.saucelabs");

// .ipa;
const SAUCELABS_APP_IOS = "storage:328e693f-5b75-43e4-9e59-c3724cce2fec";
// .app
const SAUCELABS_APP_IOS_SIMULATOR =
  "storage:797e2131-8dc4-4fd9-8802-3fe776200d5a";

exports.config = {
  ...config,
  ...{
    capabilities: [
      {
        maxInstances: 2,
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
