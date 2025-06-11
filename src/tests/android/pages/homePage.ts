import basePage from "../../basePage";

let homePageRefSelector = "//*[(@text='WEBDRIVER')]";

class HomePage extends basePage {
    constructor() {
        super();
        this.basePageRef = homePageRefSelector;
    }
}

export const homePage = new HomePage();