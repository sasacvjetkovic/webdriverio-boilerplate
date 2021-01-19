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

// .apk debug
const SAUCELABS_APP_ANDROID = "storage:3c065309-b799-421b-9379-bc678ed2f230";

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
        platformName: "Android",
        app: SAUCELABS_APP_ANDROID,
        
        build: "v0.0.2v - Regression test | Android",
        newCommandTimeout: 20000,

        deviceName: "Google Pixel 3a GoogleAPI Emulator",
        platformVersion: "10",

        appPackage: "com.wdiodemoapp",
        appActivity: "com.wdiodemoapp.MainActivity",

        // If you want to use the Real Device cloud just pass the testobject_api_key in the capabilities like this:
        // The api key that has a reference to the app-project in the RDC cloud
        // testobject_api_key: process.env.SAUCE_RDC_ACCESS_KEY,
        // testobject_test_name: 'CVSA - Android test',
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
      console.log("----   Before Android scenario   ----");
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
      console.log("----   After Android scenario   ----");
      console.log("scenario name: " + scenario.name);
      this.config.capabilities.name = scenario.name;
      driver.reset();
    },
  },
};
