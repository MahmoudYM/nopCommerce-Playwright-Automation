import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  // Locators
  private readonly productName = 'div.product-name h1';
  private readonly productPrice = 'div.product-price span';
  private readonly addToCartButton = '#add-to-cart-button-1';
  private readonly quantityInput = '#product_enteredQuantity_1';
  private readonly successNotification = '#bar-notification';
  private readonly closeNotification = 'span.close';
  private readonly shoppingCartLink = 'a[href="/cart"]';

  constructor(page: Page) {
    super(page);
  }

  async getProductName(): Promise<string> {
    return await this.getElementText(this.productName);
  }

  async getProductPrice(): Promise<string> {
    return await this.getElementText(this.productPrice);
  }

  async setQuantity(quantity: string) {
    await this.page.fill(this.quantityInput, '');
    await this.fillInput(this.quantityInput, quantity);
  }

  async clickAddToCart() {
    await this.clickElement(this.addToCartButton);
  }

  async waitForSuccessNotification() {
    await this.page.waitForSelector(this.successNotification, { state: 'visible' });
  }

  async closeNotificationBar() {
    await this.clickElement(this.closeNotification);
  }

  async goToShoppingCart() {
    await this.clickElement(this.shoppingCartLink);
  }

  async addProductToCart(quantity: string = '1') {
    await this.setQuantity(quantity);
    await this.clickAddToCart();
    await this.waitForSuccessNotification();
  }
}
