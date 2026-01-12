import { Page,Locator, expect } from '@playwright/test';


class ProductPage
{
    brandLink:Locator
    page:Page
    addToCartBtn:Locator
    viewCart:Locator
    constructor(page:Page)
    {
        this.page=page
        this.brandLink=page.getByRole('link',{name:'H&M'})
        this.addToCartBtn=page.getByRole('link',{name:'Add to cart'}).first()
        this.viewCart=page.getByRole('link',{name:'View Cart'})
    }
    async addProductToCart()
    {
        await this.page.waitForLoadState('domcontentloaded',{timeout:50000})
        await this.brandLink.click()
        await this.addToCartBtn.click()
        await this.viewCart.click()
        await this.page.waitForTimeout(3000)
    }
}
export default ProductPage;