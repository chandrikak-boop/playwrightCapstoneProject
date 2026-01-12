import {test,expect} from '@playwright/test'
import SignUpPage from '../pages/automation_exercise/signup.page'
import AccountInfoPage from '../pages/automation_exercise/accountinfo.page'
import ProductPage from '../pages/automation_exercise/product.page'
import CheckOutPage from '../pages/automation_exercise/checkOut.page'
import PaymentPage from '../pages/automation_exercise/payment.page';
import OrderConfirmation from '../pages/automation_exercise/orderConfirmation.page'
import { faker } from '@faker-js/faker';
import { fi } from 'zod/locales'
import { lstat } from 'node:fs'
test('order a product',async({page})=>{
    await page.goto('https://automationexercise.com/login')
    let signUpPage = new SignUpPage(page);
    let accountInfoPage=new AccountInfoPage(page)
    let productPage=new ProductPage(page) 
    let checkOutPage=new CheckOutPage(page)
    let paymentPage=new PaymentPage(page)
    let orderConfirmation=new OrderConfirmation(page)
    //generating username and email
    let username:string='testuser'+Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    let email:string='testuser'+Math.floor(Math.random() * (1000 - 100 + 1)) + 100+'@gmail.com'

    await signUpPage.signup(username,email)

   // generating fake signup details
const firstName: string = faker.person.firstName();
const lastName: string = faker.person.lastName();
const address: string = faker.location.streetAddress();
const city: string = faker.location.city();
const state: string = faker.location.state();
const country: string = faker.location.country();
const company: string = faker.company.name();

// Use postalCode instead of countryCode for zip
const zipcode: string = faker.location.zipCode();

// Mobile number without special chars (form-friendly)
const mobileNum: string = faker.phone.number()


    //generating details for payment
    const nameOnTheCard:string=firstName+" "+lastName
    const card_number:string=faker.finance.creditCardNumber()
    const cvc:string=faker.finance.creditCardCVV()
    await accountInfoPage.enterDeatails('Passwor@2123','14','April','2000',firstName,lastName,address,country,state,city,zipcode,mobileNum)
    await page.waitForLoadState('networkidle',{timeout:1800000})
    await page.pause()
    await productPage.addProductToCart()
    await checkOutPage.proceedToCheckOut()
    await paymentPage.payment(nameOnTheCard,card_number,cvc)
    await orderConfirmation.downloadInvoiceFunc()
})