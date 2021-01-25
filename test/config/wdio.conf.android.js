const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,
  ...{
    capabilities: [
      {
        maxInstances: 1,
        browserName: '',
        appiumVersion: '1.19.1',
        platformName: 'Android',
        deviceName: 'Pixel_3a_API_30_x86',
        avd: 'Pixel_3a_API_30_x86',
        appPackage: 'com.wdiodemoapp',
        appActivity: 'com.wdiodemoapp.MainActivity',
        app: './apps/app-debug.apk',
      },
    ],

    beforeScenario: (scenario) => {
      console.log('----   Before Android scenario   ----');
      console.log('scenario name: ' + scenario.name);
      driver.reset();
    },
  },
};
