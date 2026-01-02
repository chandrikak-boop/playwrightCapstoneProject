import LoginPage from '../pages/sauce_labs/login.page';
import ProductsPage from '../pages/sauce_labs/products.page';
import FinishPage from '../pages/sauce_labs/finish.page';
import CheckoutInfoPage from '../pages/sauce_labs/checkoutInfo.page';
import { test, expect } from '@playwright/test';
import testData from '../data/testdata.json';
import {faker} from '@faker-js/faker'

test.describe('Sauce Labs Purchase Product', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  test('Valid Login Test', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.enterUsername(process.env.USERNAME || '');
    await loginPage.enterPassword(process.env.PASSWORD || '');
    await loginPage.clickLoginButton();

    // Verify successful login 
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.inventory_list')).toBeVisible();

    // Add a product to the cart
    productsPage = new ProductsPage(page, `${testData.product}`);
    await productsPage.addProductToCart();  
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Navigate to the cart
    await productsPage.navigateToCart();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('.cart_item')).toBeVisible();

    //click on checkout
    await productsPage.clickCheckout();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');


//Enter Checkout Info
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();
    const checkoutInfoPage = new CheckoutInfoPage(page);
    await checkoutInfoPage.EnterDetails(firstName,lastName,postalCode);
    await checkoutInfoPage.clickContinue();


    // Verify navigation to the next checkout step
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

      //Finish Checkout


    const finishPage = new FinishPage(page);
    await finishPage.clickFinish();

    // Verify successful checkout completion
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});