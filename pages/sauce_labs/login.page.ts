import { Page,Locator } from '@playwright/test';
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
    await this.usernameInput.fill(`${username}`);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}

export default LoginPage;