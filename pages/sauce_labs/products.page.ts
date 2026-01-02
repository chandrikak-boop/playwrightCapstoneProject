import { Locator, Page,expect } from "@playwright/test";

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
        await expect(this.product).toBeEnabled();  
        await this.product.click();
    }
    async navigateToCart(){
        await expect(this.cart).toBeEnabled();
        await this.cart.click();
    }
    async clickCheckout(){
        await expect(this.checkoutButton).toBeEnabled();
        await this.checkoutButton.click();
    }
}

export default ProductsPage;