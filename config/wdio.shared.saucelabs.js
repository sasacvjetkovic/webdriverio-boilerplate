const { config } = require("./wdio.shared.conf");
require("dotenv").config();
const fs_extra = require("fs-extra");

//const argv = require("yargs").argv;
const wdioParallel = require("wdio-cucumber-parallel-execution");
//get current time for naming tests
//const currentTime = new Date().toJSON().replace(/:/g, "-");
const parallelExecutionReportDirectory = `./report/cucumber-parallel`;
const sourceSpecDirectory = `./test/features`;
let featureFilePath = `${sourceSpecDirectory}/*.feature`;

tmpSpecDirectory = `${sourceSpecDirectory}/tmp`;
wdioParallel.performSetup({
  sourceSpecDirectory: sourceSpecDirectory,
  tmpSpecDirectory: tmpSpecDirectory,
  cleanTmpSpecDirectory: true,
  //if you want login file to be split
  //ff: "test",
});
featureFilePath = `${tmpSpecDirectory}/*.feature`;

exports.config = {
  ...config,
  ...{
    capabilities: [
      {
        newCommandTimeout: 10000,
      },
    ],

    specs: ["./test/features/**/tmp/*.feature"],
    services: ["sauce"],
    user: process.env.SAUCE_USER,
    key: process.env.SAUCE_KEY,
    region: process.env.SAUCE_REGION,
    //config.sauceConnect = true;

    onPrepare: () => {
      // Remove the `tmp/` folder that holds the json report files
      fs_extra.removeSync(parallelExecutionReportDirectory);
    },

    beforeSession: (config, capabilities, specs) => {
      //capabilities.name = (specs && specs[0].split("/").pop()) || undefined;
    },
  },
};
