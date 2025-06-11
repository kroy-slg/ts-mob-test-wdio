import {When} from "@cucumber/cucumber";
import {homePage} from "../pages/homePage";
import {bottomNavbarPage, NavbarOptions} from "../pages/bottomNavbarPage";
import {androidUtils} from "../../../../utils/android.utils";

When(/^User waits for (\d+) seconds$/, async function (duration:number) {
    await homePage.wait(duration*1000);
});

When(/^User backgrounds app$/, async function () {
    await homePage.backgroundApp();
});

When(/^User backgrounds app for (\d+) secs & resume back$/, async function (timeInSec:number) {
    await homePage.backgroundAppFor(timeInSec);
});

When(/^User clicks (home|webview|login|forms|swipe|drag) navbar option$/, async function (option:string) {
    await bottomNavbarPage.clickNavbarOption(NavbarOptions[option.toUpperCase().trim().replaceAll(/\s/g, '_')]);
});

When(/^User turn on wifi$/, async function () {
    await androidUtils.turnOnWifi();
});

When(/^User turn off wifi$/, async function () {
    await androidUtils.turnOffWifi();
});