import {join} from "path";

const {config} = require('./wdio.conf');

config.capabilities = [
    {
        platformName: 'Android',
        'appium:deviceName': 'Pixel 6',
        'appium:platformVersion': '14.0',
        'appium:udid': '24151FDF60093T',
        'appium:appWaitActivity': 'com.wdiodemoapp.MainActivity',
        'appium:app': join(process.cwd(), 'src/resources/apps/android.native.app.apk'),
        'appium:automationName': 'UiAutomator2',
        'appium:noReset': false,
        'appium:newCommandTimeout': 120,
    }
];

config.specs = [
    '../src/tests/android/**/*.feature'
];

config.cucumberOpts.require = [
    './src/tests/android/step_definitions/**/*.ts',
];

exports.config = config;
