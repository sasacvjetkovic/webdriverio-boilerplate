const { join } = require('path');
const { config } = require('./wdio.shared.conf');

// ============
// Specs
// ============
config.specs = [
  './test/features/**/*.feature',
];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    maxInstances: 1,
    browserName: '',
    appiumVersion: '1.19.1',
    platformName: 'Android',
    deviceName: 'Pixel_3a_API_30_x86',
    avd: 'Pixel_3a_API_30_x86',
    appPackage: 'com.wdiodemoapp',
    appActivity: 'com.wdiodemoapp.MainActivity',
    app: './apps/app-debug.apk'
  },
]

config.beforeScenario = () => {
  console.log('----   Before Android scenario   ----');
  driver.reloadSession();
}

config.afterScenario = () => {
  console.log('----   After Android scenario   ----');
  driver.reloadSession();
}


exports.config = config;
