import LoginPage from '../pages/sauce_labs/login.page';
import ProductsPage from '../pages/sauce_labs/products.page';
import FinishPage from '../pages/sauce_labs/finish.page';
import { test, expect } from '@playwright/test';
import testData from '../data/testdata.json';

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
    productsPage = new ProductsPage(page,'Sauce Labs Bike Light');
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
    // You can create a CheckoutInfoPage class similar to LoginPage and ProductsPage for better structure
    const firstNameInput = page.getByPlaceholder('First Name');
    const lastNameInput = page.getByPlaceholder('Last Name');
    const postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    const continueButton = page.getByRole('button',{name:'Continue'});

    await firstNameInput.fill(testData.firstName);
    await lastNameInput.fill(testData.lastName);
    await postalCodeInput.fill(testData.postalCode);
    await continueButton.click();

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