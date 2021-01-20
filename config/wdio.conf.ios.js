const { config } = require("./wdio.shared.conf");

exports.config = {
  ...config,
  ...{
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

    beforeScenario: (scenario) => {
      console.log("----   Before iOS scenario  ----");
      console.log("scenario name: " + scenario.name);
      driver.reset();
    },
  },
};
