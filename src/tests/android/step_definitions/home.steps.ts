import {Then} from "@cucumber/cucumber";
import {homePage} from "../pages/homePage";

Then(/^User verifies home page is displayed$/, async function () {
    await homePage.wait(3000);
    await expect(await homePage.isValid()).toBeTruthy();
});