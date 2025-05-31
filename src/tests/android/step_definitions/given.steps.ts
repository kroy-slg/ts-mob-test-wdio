import {Given} from "@cucumber/cucumber";
import {homePage} from "../pages/homePage";

Given(/^User is on home page$/, async function () {
    await homePage.wait(2*1000);
});