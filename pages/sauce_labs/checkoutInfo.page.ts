import { expect, Locator, Page } from '@playwright/test';
class CheckoutInfoPage {
  firstname:Locator;
  lastname:Locator;
  postalcode:Locator;
    continueButton:Locator;
 constructor(page:Page) {
  this.firstname = page.getByPlaceholder('First Name');
  this.lastname = page.getByPlaceholder('Last Name');
  this.postalcode = page.getByPlaceholder('Zip/Postal Code');
  this.continueButton = page.getByRole('button',{name:'Continue'});

    }
    async EnterDetails(firstName:string,lastName:string,postalCode:string){
        await expect(this.firstname).toBeVisible();
        await this.firstname.fill(firstName);

        await expect(this.lastname).toBeEditable();
        await this.lastname.fill(lastName);

        await expect(this.postalcode).toBeEditable();
        await this.postalcode.fill(postalCode);
    }
    async clickContinue(){
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
    }
}

export default CheckoutInfoPage;