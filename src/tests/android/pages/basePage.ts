export default class basePage {

    basePageRef: any;

    public async isValid(){
        return await $(this.basePageRef).isDisplayed();
    }

    public wait = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));


}