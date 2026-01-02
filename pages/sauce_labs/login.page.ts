import { Page,Locator, expect } from '@playwright/test';
class LoginPage {
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.usernameInput = this.page.locator('#user-name');
        this.passwordInput = this.page.locator('#password');
        this.loginButton = this.page.locator('#login-button');
    }

  async navigateToLoginPage() {
    await this.page.goto(`${process.env.BASE_URL}`);
  }

  async enterUsername(username: string) {
    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill(`${username}`);
  }

  async enterPassword(password: string) {
    await expect(this.passwordInput).toBeEditable();
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await expect(this.loginButton).toBeEnabled();
    await this.loginButton.click();
  }
  async displayErrorMessage(){
    console.error("Error Message: " + await this.page.locator('[data-test="error"]').textContent());
  }
}

export default LoginPage;