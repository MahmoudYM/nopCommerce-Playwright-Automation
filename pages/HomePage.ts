import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Locators
  private readonly registerLink = 'a.ico-register';
  private readonly loginLink = 'a.ico-login';
  private readonly searchBox = '#small-searchterms';
  private readonly searchButton = 'button[type="submit"].search-box-button';
  private readonly cartLink = 'a.ico-cart';
  private readonly categoryComputers = '(//ul[@class="top-menu notmobile"]//a[contains(text(),"Computers")])[1]';
  private readonly categoryElectronics = '(//ul[@class="top-menu notmobile"]//a[contains(text(),"Electronics")])[1]';

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigateTo('/');
    await this.waitForPageLoad();
  }

  async clickRegister() {
    await this.clickElement(this.registerLink);
  }

  async clickLogin() {
    await this.clickElement(this.loginLink);
  }

  async searchProduct(productName: string) {
    await this.fillInput(this.searchBox, productName);
    await this.clickElement(this.searchButton);
  }

  async goToCart() {
    await this.clickElement(this.cartLink);
  }

  async hoverComputersCategory() {
    await this.page.hover(this.categoryComputers);
  }

  async clickComputersCategory() {
    await this.clickElement(this.categoryComputers);
  }

  async isLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.searchBox);
  }
}
