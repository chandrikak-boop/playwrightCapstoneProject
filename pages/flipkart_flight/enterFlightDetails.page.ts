import {Page,Locator,expect} from '@playwright/test';
class FlightsPage{
    page:Page;
    from:Locator;
    selectFrom:Locator;
    selectTo:Locator;
    to:Locator;
    monthPicker:Locator;
    nextMonthButton:Locator;
    doneButton:Locator;
    searchButton:Locator;
    constructor(page:Page){
        this.page=page;
        this.from=page.locator('//div[@class="NR_GX_ Cv6TNC"]/input').first();
        this.selectFrom=page.locator('//div[@class="fgU7Kf DxUEFR"]//div[@class="oJTCI0"]').first();
        this.selectTo=page.locator('//div[@class="fgU7Kf DxUEFR"]//div[@class="oJTCI0"]').last();
        this.to=page.locator('//div[@class="NR_GX_ Cv6TNC"]/input').last();
        this.monthPicker=page.locator('//table[@class="EK3l1R"]//div[@class="Jo_Kpm"]').first()
        this.nextMonthButton=page.locator('//div[@class="TQgjFN"]').getByRole('button')
        this.doneButton=page.getByRole('button',{name:'Done'});
        this.searchButton=page.getByRole('button',{name:'SEARCH'});
    }

    async enterFromLocation(location:string){
        await this.from.fill(location);
        await this.selectFrom.waitFor()
        await this.selectFrom.click();
    }
    async enterToLocation(location:string){
        await this.to.fill(location);
        await this.selectTo.waitFor()
        await this.selectTo.click();
    }

    async selectDepartureDate(month:string,day:number){
    let currentMonth=await this.monthPicker.textContent();
    while(currentMonth!==month){
        await this.nextMonthButton.click();
        currentMonth=await this.monthPicker.textContent();
    }
    await this.page.locator(`//table[@class="EK3l1R"]//div/button[text()=${day}]`).first().click();
    }

    async clickDone(){
        await expect(this.doneButton).toBeVisible();
        await this.doneButton.click();
    }
    async searchFlights(){
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
    }
}
export default FlightsPage;