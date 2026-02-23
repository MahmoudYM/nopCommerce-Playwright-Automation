import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Locators
  private readonly cartItems = 'tr.cart-item-row';
  private readonly productName = 'td.product a';
  private readonly quantity = 'input.qty-input';
  private readonly removeCheckbox = 'input[name="removefromcart"]';
  private readonly updateCartButton = 'button[name="updatecart"]';
  private readonly emptyCartMessage = 'div.no-data';
  private readonly checkoutButton = '#checkout';
  private readonly totalPrice = 'span.product-subtotal';

  constructor(page: Page) {
    super(page);
  }

  async getCartItemsCount(): Promise<number> {
    return await this.page.locator(this.cartItems).count();
  }

  async getProductNames(): Promise<string[]> {
    return await this.page.locator(this.productName).allTextContents();
  }

  async updateQuantity(index: number, quantity: string) {
    await this.page.locator(this.quantity).nth(index).fill(quantity);
    await this.clickElement(this.updateCartButton);
  }

  async removeItem(index: number) {
    await this.page.locator(this.removeCheckbox).nth(index).check();
    await this.clickElement(this.updateCartButton);
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.isElementVisible(this.emptyCartMessage);
  }

  async proceedToCheckout() {
    await this.clickElement(this.checkoutButton);
  }

  async getTotalPrice(): Promise<string> {
    return await this.getElementText(this.totalPrice);
  }
}
