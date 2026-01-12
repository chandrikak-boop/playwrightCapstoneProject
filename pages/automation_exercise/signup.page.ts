import { Page,Locator, expect } from '@playwright/test';
class SignUpPage
{
signupBtn:Locator
page:Page
name:Locator
email:Locator
constructor(page:Page)
{
    this.page=page;
    this.signupBtn=page.getByRole('button',{name:'Signup'})
    this.name=page.getByPlaceholder('Name')
    this.email=page.locator('//form[@action="/signup"]').getByPlaceholder('Email Address')
}

async signup(name:string,email:string)
{
await this.name.fill(name)
await this.email.fill(email)
await this.signupBtn.click()
}

}
export default SignUpPage;