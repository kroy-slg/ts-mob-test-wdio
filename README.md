## WDIO-MOBILE-TEST


#### Prerequisites:
  - Node  `brew install node` for mac
  - JDK `Java Development Kits`
  - Appium `node i -g appium@latest`
  - WebdriverIO


### Initialize Projects:
  - Create project dir- `mkdir wdio-mob-test`
  - Go inside project dir- `cd wdio-mob-test`
  - Initialize node project- `npm init -y`


### Install dependencies:
  - `npm i --save-dev @wdio/cli`
  - `npm i --save-dev appium`
  - `npm i --save-dev @wdio/appium-service`
  - `npm i --save-dev @wdio/mocha-framework`
  - `npm i --save-dev @wdio/spec-reporter`
  - `npm i --save-dev @wdio/types`
  - `npm i --save-dev typescript`
  - `npm i --save-dev ts-node`
  - `npm i --save-dev @wdio/cucumber-framework`
  - `npm i --save-dev chromedriver`


### Run wdio configuration wizard:
  - `npm init wdio .`


### Run Test:
  - `npm run wdio`