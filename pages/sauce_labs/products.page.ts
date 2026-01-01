import { Locator, Page } from "@playwright/test";

class ProductsPage {
page:Page;
product:Locator;
cart:Locator;
checkoutButton:Locator;
  // Add methods and locators for the Products Page here
  constructor(page:Page, productName:string) {
    // Initialize locators
    this.page = page;
    this.product=page.locator(`//div[@class="inventory_item_description"]//div[@class="inventory_item_name " and .="${productName}"]/ancestor::div[@class="inventory_item_description"]//button`);
    this.cart=page.locator('.shopping_cart_link');
    this.checkoutButton=page.getByRole('button',{name:'Checkout'});
    }
    async addProductToCart(){   
        await this.product.click();
    }
    async navigateToCart(){
        await this.cart.click();
    }
    async clickCheckout(){
        await this.checkoutButton.click();
    }
}

export default ProductsPage;