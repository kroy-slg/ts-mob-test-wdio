export default class basePage {

    basePageRef: any;

    /**
     * Method to check validity
     */
    public async isValid(){
        return await $(this.basePageRef).isDisplayed();
    }

    /**
     * Method for waits
     * @param ms - time in milliseconds
     */
    public wait = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

    /**
     * Method to click page elements
     * @param locator - page element to click
     * @param msg - console log perform before click
     */
    public async click(locator: WebdriverIO.Element, msg: String){
        console.log("clicking on element " + msg);
        await locator.click();
    }

    /**
     * Method to background app
     */
    public async backgroundApp(){
        await driver.execute('mobile: backgroundApp', {seconds: -1})
    }

    /**
     * Method to background app for some time
     * @param time - time in seconds
     */
    public async backgroundAppFor(time:number){
        await driver.execute('mobile: backgroundApp', {seconds: time})
    }

}