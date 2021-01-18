const { join } = require("path");
const { resolveProjectReferencePath } = require("typescript");
const { config } = require("./wdio.shared.conf");

const fs_extra = require("fs-extra");

const argv = require("yargs").argv;
const wdioParallel = require("wdio-cucumber-parallel-execution");
// The below module is used for cucumber html report generation
const reporter = require("cucumber-html-reporter");
const currentTime = new Date().toJSON().replace(/:/g, "-");

const parallelExecutionReportDirectory = `./report/cucumber-parallel`;
const sourceSpecDirectory = `./test/features`;

let featureFilePath = `${sourceSpecDirectory}/*.feature`;

if (argv.parallel === "true") {
  tmpSpecDirectory = `${sourceSpecDirectory}/tmp`;
  wdioParallel.performSetup({
    sourceSpecDirectory: sourceSpecDirectory,
    tmpSpecDirectory: tmpSpecDirectory,
    cleanTmpSpecDirectory: true,
    //if you want login file to be split
    //ff: "test",
  });
  featureFilePath = `${tmpSpecDirectory}/*.feature`;
}

// .app
const SAUCELABS_APP_IOS = "storage:328e693f-5b75-43e4-9e59-c3724cce2fec";
// .ipa
//const SAUCELABS_APP_IOS = "storage:8d26e283-020c-4b2d-b22c-e21bfeb7a394";
const SAUCELABS_APP_IOS_SIMULATOR =
  "storage:797e2131-8dc4-4fd9-8802-3fe776200d5a";

// .apk debug
const SAUCELABS_APP_ANDROID = "storage:60ff9061-5973-4c81-8388-14366d002636";

exports.config = {
  ...config,
  ...{
    specs: ["./test/features/**/tmp/*.feature"],

    services: ["sauce"],

    user: "nemanjaparsablex",
    key: "62761e24-800e-4fb9-874b-f29696127daf",
    region: "eu",
    //config.sauceConnect = true;

    capabilities: [
      {
        maxInstances: 1,
        platformName: "iOS",
        app: SAUCELABS_APP_IOS_SIMULATOR,
        automationName: "XCUITest",
        // testobject_test_name: 'CVSA - iOS test',
        build: "v0.0.2v - Regression test | iOS",
        newCommandTimeout: 10000,

        deviceName: "iPhone 8 Simulator",
        platformVersion: "14.0",
        // If you want to use the Real Device cloud just pass the testobject_api_key in the capabilities like this:
        // The api key that has a reference to the app-project in the RDC cloud
        // testobject_api_key: process.env.SAUCE_RDC_ACCESS_KEY,
      },

      /*  {
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
      }, */
    ],
    onPrepare: () => {
      // Remove the `tmp/` folder that holds the json report files
      fs_extra.removeSync(parallelExecutionReportDirectory);
    },

    beforeSession: (config, capabilities, specs) => {
      capabilities.name = (specs && specs[0].split("/").pop()) || undefined;
    },

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
    onComplete: () => {
      //related to wdio-cucumber-parallel
      try {
        let consolidatedJsonArray = wdioParallel.getConsolidatedData({
          parallelExecutionReportDirectory: parallelExecutionReportDirectory,
        });

        let jsonFile = `${parallelExecutionReportDirectory}/report.json`;
        fs_extra.writeFileSync(jsonFile, JSON.stringify(consolidatedJsonArray));

        // The below code is not part of wdio-cucumber-parallel-execution module
        // but is mentioned to show, how it can be used with other reporting modules
        var options = {
          theme: "hierarchy",
          jsonFile: jsonFile,
          output: `report/html/report-${currentTime}.html`,
          reportSuiteAsScenarios: true,
          scenarioTimestamp: true,
          launchReport: true,
          ignoreBadJsonFile: true,
        };

        reporter.generate(options);
      } catch (err) {
        console.log("err", err);
      }
    },
  },
};
