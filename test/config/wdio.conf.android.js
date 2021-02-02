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
        deviceName: 'Pixel_4_XL_API_30',
        avd: 'Pixel_4_XL_API_30',
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
