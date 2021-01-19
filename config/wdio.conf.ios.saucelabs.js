const { join } = require("path");
const { resolveProjectReferencePath } = require("typescript");
const { config } = require("./wdio.shared.conf");
require('dotenv').config();

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

exports.config = {
  ...config,
  ...{
    specs: ["./test/features/**/tmp/*.feature"],

    services: ["sauce"],

    user: process.env.SAUCE_USER,
    key: process.env.SAUCE_KEY,
    region: process.env.SAUCE_REGION,
    //config.sauceConnect = true;

    capabilities: [
      {
        maxInstances: 2,
        platformName: "iOS",
        app: SAUCELABS_APP_IOS_SIMULATOR,
        automationName: "XCUITest",
        
        build: "v0.0.2v - Regression test | iOS",
        newCommandTimeout: 10000,

        deviceName: "iPhone 8 Simulator",
        platformVersion: "14.0",
        // If you want to use the Real Device cloud just pass the testobject_api_key in the capabilities like this:
        // The api key that has a reference to the app-project in the RDC cloud
        // testobject_api_key: process.env.SAUCE_RDC_ACCESS_KEY,
        // testobject_test_name: 'CVSA - iOS test',
      }
    ],
    onPrepare: () => {
      // Remove the `tmp/` folder that holds the json report files
      fs_extra.removeSync(parallelExecutionReportDirectory);
    },

    beforeSession: (config, capabilities, specs) => {
      // capabilities.name = (specs && specs[0].split("/").pop()) || undefined;
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
      driver.reset();
    }
  },
};
