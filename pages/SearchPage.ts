import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  // Locators
  private readonly searchResults = 'div.product-item';
  private readonly noResultsMessage = 'div.no-result';
  private readonly productTitle = 'h2.product-title a';
  private readonly addToCartButton = 'button.add-to-cart-button';

  constructor(page: Page) {
    super(page);
  }

  async getSearchResultsCount(): Promise<number> {
    return await this.page.locator(this.searchResults).count();
  }

  async isNoResultsMessageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.noResultsMessage);
  }

  async getProductTitles(): Promise<string[]> {
    const titles = await this.page.locator(this.productTitle).allTextContents();
    return titles;
  }

  async clickFirstProduct() {
    await this.page.locator(this.productTitle).first().click();
  }

  async verifySearchResults(expectedKeyword: string): Promise<boolean> {
    const titles = await this.getProductTitles();
    return titles.some(title => 
      title.toLowerCase().includes(expectedKeyword.toLowerCase())
    );
  }
}
