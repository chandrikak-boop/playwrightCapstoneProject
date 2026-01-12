import { Page,Locator, expect } from '@playwright/test';

class CheckOutPage
{
    chechOutBtn:Locator
    page:Page
   // checkOutComment:Locator
    placeOrderBtn:Locator
    constructor(page:Page)
    {
        this.page=page
        this.chechOutBtn=page.locator('//div/a[@class="btn btn-default check_out"]')
        this.placeOrderBtn=page.getByRole('link',{name:'Place Order'})  
    }
    async proceedToCheckOut() {

        await this.page.waitForLoadState('domcontentloaded',{timeout:20000})
        await expect(this.page.locator('//td[@class="cart_quantity"]/button')).toHaveText('1')
       await this.chechOutBtn.click()
      // await this.checkOutComment.fill('Great Product')    
       await this.placeOrderBtn.click()  
    }
}
 export default CheckOutPage