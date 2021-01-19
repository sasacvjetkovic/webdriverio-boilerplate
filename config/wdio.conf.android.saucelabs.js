const { config } = require("./wdio.shared.saucelabs");

// .apk debug
const SAUCELABS_APP_ANDROID = "storage:3c065309-b799-421b-9379-bc678ed2f230";

exports.config = {
  ...config,
  ...{
    capabilities: [
      {
        maxInstances: 2,
        platformName: "Android",
        platformVersion: "10",
        deviceName: "Google Pixel 3a GoogleAPI Emulator",
        app: SAUCELABS_APP_ANDROID,
        build: "v0.0.2v - Regression test | Android",
        appPackage: "com.wdiodemoapp",
        appActivity: "com.wdiodemoapp.MainActivity",

        // If you want to use the Real Device cloud just pass the testobject_api_key in the capabilities like this:
        // The api key that has a reference to the app-project in the RDC cloud
        // testobject_api_key: process.env.SAUCE_RDC_ACCESS_KEY,
        // testobject_test_name: 'CVSA - Android test',
      },
    ],
  },
};
