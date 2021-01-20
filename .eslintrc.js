module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {},
  plugins: ['webdriverio'],
  env: {
    // "webdriverio/wdio": true,
    // cucumber: true,
    "browser": true,
    // "$": true
  },
  globals: {
    $:true,
    browser:true,
    expect:true,
    driver:true
  }
};
