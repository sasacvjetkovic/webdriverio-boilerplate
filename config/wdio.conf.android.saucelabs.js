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

//TODO test parallelization on separate features - uz custom code? (featuresplitter fajl u modulu )
//TODO check how to pass tags to CLI - other than shell script?
//TODO saucelabs job = scenario name? - Name of a file after splitting each scenario into its own separate file, OR try using SL API in after hooks

let featureFilePath = `${sourceSpecDirectory}/*.feature`;

// If parallel execution is set to true, then create the Split the feature files
// And store then in a tmp spec directory (created inside `the source spec directory)

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
  "storage:4b8ac985-fd96-409a-afc2-ab4c21c679ae";

// .apk debug
const SAUCELABS_APP_ANDROID = "storage:3c065309-b799-421b-9379-bc678ed2f230";

exports.config = {
  ...config,
  ...{
    specs: ["./test/features/**/tmp/*.feature"],

    services: ["sauce"],

    user: "nemanjaparsablex",
    key: "62761e24-800e-4fb9-874b-f29696127daf",
    region: "eu",
    //config.sauceConnect = true;

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
    capabilities: [
      {
        maxInstances: 2,
        platformName: "Android",
        app: SAUCELABS_APP_ANDROID,
        // testobject_test_name: 'CVSA - iOS test',
        build: "v0.0.2v - Regression test | Android",
        newCommandTimeout: 10000,

        deviceName: "Google Pixel 3a GoogleAPI Emulator",
        platformVersion: "10",
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
          output: `reports/html/report-${currentTime}.html`,
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
