import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators
  private readonly emailInput = '#Email';
  private readonly passwordInput = '#Password';
  private readonly loginButton = 'button.login-button';
  private readonly errorMessage = 'div.message-error';
  private readonly myAccountLink = 'a.ico-account';

  constructor(page: Page) {
    super(page);
  }

  async fillEmail(email: string) {
    await this.fillInput(this.emailInput, email);
  }

  async fillPassword(password: string) {
    await this.fillInput(this.passwordInput, password);
  }

  async clickLogin() {
    await this.clickElement(this.loginButton);
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
    await this.waitForPageLoad();
  }

  async getErrorMessage(): Promise<string> {
    return await this.getElementText(this.errorMessage);
  }

  async isMyAccountVisible(): Promise<boolean> {
    return await this.isElementVisible(this.myAccountLink);
  }
}
