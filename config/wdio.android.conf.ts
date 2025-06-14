import {join} from 'path';
import * as fs from "node:fs";

const { removeSync } = require('fs-extra');
const multipleCucumberHtmlReporter = require('multiple-cucumber-html-reporter');

let executionTime = new Map();

async function formatReport() {
    let logFiles= fs.readdirSync('./reports/json/tmp')
    for (let file of logFiles) {
        let cucumberLogs = fs.readFileSync('./reports/json/tmp/'+file);
        let array = JSON.parse(cucumberLogs.toString())
        await array.forEach(obj=> {
            obj.elements = obj.elements.filter((item, index, self) => {
                let elementIndex= self.filter((t) => (t.id === item.id)).at(-1).steps.some(s => s.result.status === "failed")?
                    self.findIndex((t) => t.id === item.id) :self.findLastIndex((t) => t.id === item.id);
                let duplicate = (self.filter((t) => t.id === item.id).length >1) && (elementIndex != index);
                let failed = item.steps.some(s => s.result.status === "failed");
                return !(duplicate && failed);
            });})
        fs.writeFileSync('./reports/json/tmp/'+file,  JSON.stringify(await array));
    }
}

export let config: WebdriverIO.Config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    // WebdriverIO supports running e2e tests as well as unit and component tests.
    runner: 'local',

    port: 4723,
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // of the configuration file being run.
    //
    specs: [
        '../src/tests/android/**/*.feature'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://saucelabs.com/platform/platform-configurator
    //
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Pixel 6',
        'appium:platformVersion': '14.0',
        'appium:udid': '24151FDF60093T',
        'appium:appWaitActivity': 'com.wdiodemoapp.MainActivity',
        'appium:app': join(process.cwd(), 'src/resources/apps/android.native.app.apk'),
        'appium:automationName': 'UiAutomator2',
        'appium:noReset': false,
        'appium:newCommandTimeout': 120,
    }],

    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/browserstack-service, @wdio/lighthouse-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/appium-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    // baseUrl: 'http://localhost:8080',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['appium'],

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: [
        'dot',
        ['spec', {
            symbols: {
                passed: '✓',
                failed: '✖',
                skipped: '-'
            },
            showPreface: false,
        }],
        ['cucumberjs-json', {
                jsonFolder: './reports/json/tmp/',
                language: 'en',
        }],
        ['junit', {
        outputDir: './reports/',
            utputFileFormat:  function (options) {
            return `results-${options.cid}.xml`
        },
        }],
    ],

    cucumberOpts: {
        require: ['./src/tests/android/step_definitions/**/*.ts'],
        timeout: 50000,
        tagExpression: '',
        ignoreUndefinedDefinitions: false,
    },

    onPrepare: function () {
        removeSync('./reports/json/tmp/');
    },

    onComplete: async function () {
        executionTime.set("startTime", new Date().toLocaleString());
        executionTime.set("endTime", new Date().toLocaleString());
        await formatReport();
        await multipleCucumberHtmlReporter.generate({
            openReportInBrowser: false,
            reportName: 'Automation Test Report',
            displayDuration: true,
            displayReportTime:true,
            saveCollectedJSON: false,
            jsonDir: './reports/json/',
            reportPath: './reports/html',
            customMetadata: true,
            customData: {
                title: "Run info",
                data: [
                    { label: "Execution Start Time", value: executionTime.get("startTime") },
                    { label: "Execution End Time", value: executionTime.get("endTime") }
                ],
            },
        });
    }

}

exports.config = config;