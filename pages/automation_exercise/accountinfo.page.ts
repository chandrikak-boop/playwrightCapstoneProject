import { Page,Locator, expect } from '@playwright/test';
import { exactOptional } from 'zod';
class AccountInfoPage
{
page:Page
title:Locator

password:Locator
day:any
month:Locator
year:Locator
firstName:Locator
lastName:Locator
address:Locator
company:Locator
country:any
state:Locator
city:Locator
zipcode:Locator
mobile:Locator
createAccountBtn:Locator
continueBtn:Locator
constructor(page:Page)
{
    this.page=page;
    this.title=page.getByRole('radio').first()
    this.password=page.getByRole('textbox',{name:'Password *'})
    this.day=page.getByRole('combobox').first()
    this.month=page.getByRole('combobox').nth(1)
    this.year=page.getByRole('combobox').nth(2)
    this.firstName=page.getByRole('textbox',{name:'First name *'})
    this.lastName=page.getByRole('textbox',{name:'Last name *'})
    this.company=page.getByRole('textbox',{name:'Company',exact:true})
    this.address=page.getByRole('textbox',{name:'Address * (Street address, P.O. Box, Company name, etc.)'})
    this.country=page.getByRole('combobox',{name:'Country *'})
    this.state=page.getByRole('textbox',{name:'State *'})
    this.city=page.getByRole('textbox',{name:'City *'})
    this.zipcode=page.getByRole('textbox').nth(10)
    this.mobile=page.getByRole('textbox',{name:'Mobile Number * '})
    this.createAccountBtn=page.getByRole('button',{name:'Create Account'}) 
    this.continueBtn=page.getByRole('link',{name:'Continue'}) 
}

async enterDeatails(password:string,day:string,month:string,year:string,firstName:string,lastName:string,company:string,address:string,state:string,city:string,zipcode:string,mobile:string)
{
await this.title.check()
await this.password.fill(password)
await this.day.selectOption(day)
await this.month.selectOption(month)
await this.year.selectOption(year)
await this.firstName.fill(firstName)
await this.lastName.fill(lastName)
await this.company.fill(company)
await this.address.fill(address)
await this.country.selectOption('India')
await this.state.fill(state)
await this.city.fill(city)
await expect(await this.city).toBeTruthy()
await this.zipcode.fill(zipcode)
await this.mobile.fill(mobile)
await this.createAccountBtn.click()
await expect('//*[text()="Account Created!"]').toContain('Account Created!')
await this.continueBtn.click()

}
}
export default AccountInfoPage;