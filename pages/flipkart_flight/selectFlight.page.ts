import { Page,Locator,expect} from "@playwright/test";
class SelectFlightPage {
    page:Page;
    stopsFilter:Locator;
    bookButton:Locator;
    constructor(page:Page) { 
        this.page=page;
        this.stopsFilter=page.locator('//div[@class="HKHUvj" and text()="Non-stop"]');
        this.bookButton=page.locator('//div[@class="BLSFtx"]').first();
    }
    async applyStopsFilter(){
        await expect(this.stopsFilter).toBeVisible();
        await this.stopsFilter.click();
    }
    async clickBookButton() {
        await expect(this.bookButton).toBeVisible();
        await this.bookButton.click();
    }
}
export default SelectFlightPage;