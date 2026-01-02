import { Page,Locator,expect } from '@playwright/test';
class HomePage{
    page:Page;
    flightsLink:Locator
    constructor(page:Page){
        this.page=page;
        this.flightsLink=page.getByAltText("Flight Bookings");
    }
    async navigateToFlights(){
        await this.page.goto(`${process.env.FLIPKART_URL}`);
        await expect(this.flightsLink).toBeVisible();
        await this.flightsLink.click();
    }
}
export default HomePage;