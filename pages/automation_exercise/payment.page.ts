import { Page,Locator, expect } from '@playwright/test';
class PaymentPage{
page:Page
nameOnTheCard:Locator
cardNumber:Locator
cvc:Locator
expiryMonth:Locator
expiryYear:Locator
submitBtn:Locator
constructor(page:Page)
{
    this.page=page
    this.nameOnTheCard=page.locator('//div[@class="form-row"]//input[@name="name_on_card"]')
    this.cardNumber=page.locator('//div[@class="form-row"]//input[@name="card_number"]')
    this.cvc=page.locator('//div[@class="form-row"]//input[@name="cvc"]')
    this.expiryMonth=page.locator('//div[@class="form-row"]//input[@name="expiry_month"]')
    this.expiryYear=page.locator('//div[@class="form-row"]//input[@name="expiry_year"]')
    this.submitBtn=page.locator('#submit')


}
async payment(nameOnTheCard:string,cardNumber:string,cvc:string)
{
    await this.nameOnTheCard.fill(nameOnTheCard)
    await this.cardNumber.fill(cardNumber)
    await this.cvc.fill(cvc)
    await this.expiryMonth.fill('12')
    await this.expiryYear.fill('2035')
    await this.submitBtn.click()

}
}
export default PaymentPage