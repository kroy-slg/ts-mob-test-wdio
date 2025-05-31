import basePage from "./basePage";

let homeNavbarOptionSelector = '//*[(@text="Home")]/preceding-sibling::*[(@class="android.widget.TextView")]';
let webviewNavbarOptionSelector = '//*[(@text="Webview")]/preceding-sibling::*[(@class="android.widget.TextView")]';
let loginNavbarOptionSelector = '//*[(@text="Login")]/preceding-sibling::*[(@class="android.widget.TextView")]';
let formsNavbarOptionSelector = '//*[(@text="Forms")]/preceding-sibling::*[(@class="android.widget.TextView")]';
let swipeNavbarOptionSelector = '//*[(@text="Swipe")]/preceding-sibling::*[(@class="android.widget.TextView")]';
let dragNavbarOptionSelector = '//*[(@text="Drag")]/preceding-sibling::*[(@class="android.widget.TextView")]';

export const NavbarOptions: { [key: string]: { locator: string; pageReturn: any } } = {
    HOME: {locator:homeNavbarOptionSelector, pageReturn:this},
    WEBVIEW: {locator:webviewNavbarOptionSelector, pageReturn:this},
    LOGIN: {locator:loginNavbarOptionSelector, pageReturn:this},
    FORMS: {locator:formsNavbarOptionSelector, pageReturn:this},
    SWIPE: {locator:swipeNavbarOptionSelector, pageReturn:this},
    DRAG: {locator:dragNavbarOptionSelector, pageReturn:this}
}

class BottomNavbarPage extends basePage {

    constructor() {
        super();
        this.basePageRef = homeNavbarOptionSelector;
    }

    public async clickNavbarOption(option: { locator: string, pageReturn: basePage }) {
        await this.click(await $(option.locator), option.locator);
    }

}

export const bottomNavbarPage = new BottomNavbarPage();