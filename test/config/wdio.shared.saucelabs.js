require('dotenv').config();
const { config } = require('./wdio.shared.conf');
const fs_extra = require('fs-extra');
const axios = require('axios');
const wdioParallel = require('wdio-cucumber-parallel-execution');

const sourceSpecDirectory = './test/features';
let featureFilePath = `${sourceSpecDirectory}/*.feature`;
let tmpSpecDirectory = './test/tmp_features';
featureFilePath = `${tmpSpecDirectory}/*.feature`;
wdioParallel.performSetup({
  sourceSpecDirectory: sourceSpecDirectory,
  tmpSpecDirectory: tmpSpecDirectory,
  cleanTmpSpecDirectory: true,
});

exports.config = {
  ...config,
  ...{
    capabilities: [
      {
        newCommandTimeout: 10000,
      },
    ],

    specs: [featureFilePath],
    services: ['sauce'],
    user: process.env.SAUCE_USER,
    key: process.env.SAUCE_KEY,
    //config.sauceConnect = true;

    beforeScenario: (
      uri,
      feature,
      scenario,
      result,
      sourceLocation,
      context,
    ) => {
      // Call to SauceLabs' REST API to change Job name
      let sauceJobName = scenario.name;
      let sauceJobId = browser.sessionId;
      let dataObject = { name: `${sauceJobName}` };

      let headers = {
        'Content-type': 'application/json',
      };

      axios({
        method: 'put',
        url: `https://saucelabs.com/rest/v1/${process.env.SAUCE_USER}/jobs/${sauceJobId}`,
        data: dataObject,
        headers: headers,
        auth: {
          username: `${process.env.SAUCE_USER}`,
          password: `${process.env.SAUCE_KEY}`,
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    onComplete: () => {
      fs_extra.removeSync(tmpSpecDirectory);
    },
  },
};
