import {When} from "@cucumber/cucumber";
import {homePage} from "../pages/homePage";

When(/^User waits for (\d+) seconds$/, async function (duration:number) {
    await homePage.wait(duration*1000);
});