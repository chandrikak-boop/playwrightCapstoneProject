import {test,expect} from '@playwright/test'
import { log } from 'node:console'
test('',async({browser})=>{
const context=await browser.newContext()
const page=await context.newPage()
await page.on('dialog',dialog=>{
dialog.dismiss()
});
await page.goto('https://www.flipkart.com/')
await page.getByPlaceholder('Search for Products, Brands and More').fill('laptops')
await page.keyboard.press('Enter')
let product=page.locator('//div[@class="RG5Slk"]').first()
// await product.scrollIntoViewIfNeeded()
 let [newpage]=await Promise.all([page.waitForEvent('popup'),
 await product.click()])
 console.log(await newpage.bringToFront());
 console.log(await page.url());

 await newpage.getByRole('button',{name:'ADD TO CART'}).first().click()
 await newpage.locator('//a[@class="WGWdFn"]').locator('//*[.="Cart"]').click()
 
})