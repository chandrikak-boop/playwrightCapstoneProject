import { test, expect } from '@playwright/test';
import LoginPage from '../pages/sauce_labs/login.page';
import  data from '../data/multipleusers.json';
test.describe('Sauce Labs Negative Login Tests', () => {
    for(let user of data.users)
    {
        test(`Login Test ${user.username}`, async ({ page }) => {
        let loginPage = new LoginPage(page);
        try{
        loginPage.navigateToLoginPage();
        await loginPage.enterUsername(user.username);
        await loginPage.enterPassword(user.password);
        await loginPage.clickLoginButton();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        console.log(user.username + ' User Login Successful');
        }
        catch(error){
            console.error(user.username + ' User Login Failed');
            await loginPage.displayErrorMessage();
        }  
    })      
}
});