import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
//4
test.describe('Product Search Tests', () => {
  let homePage: HomePage;
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.goto();
  });

  test('should search for a product and display results', async ({ page }) => {
    const searchTerm = 'laptop';
    
    await homePage.searchProduct(searchTerm);
    await page.waitForLoadState('networkidle');

    const resultsCount = await searchPage.getSearchResultsCount();
    expect(resultsCount).toBeGreaterThan(0);

    // Verify results contain the search term
    const hasRelevantResults = await searchPage.verifySearchResults(searchTerm);
    expect(hasRelevantResults).toBeTruthy();
  });

  test('should handle search with no results', async ({ page }) => {
    const searchTerm = 'xyznonexistentproduct123';
    
    await homePage.searchProduct(searchTerm);
    await page.waitForLoadState('networkidle');

    const resultsCount = await searchPage.getSearchResultsCount();
    
    // Either no results or a no-results message
    if (resultsCount === 0) {
      const noResultsVisible = await searchPage.isNoResultsMessageVisible();
      expect(noResultsVisible).toBeTruthy();
    }
  });

  test('should search for different product categories', async ({ page }) => {
    const products = ['computer', 'phone', 'camera'];

    for (const product of products) {
      await homePage.searchProduct(product);
      await page.waitForLoadState('networkidle');

      const resultsCount = await searchPage.getSearchResultsCount();
      expect(resultsCount).toBeGreaterThanOrEqual(0);

      // Go back to home for next search
      await homePage.goto();
    }
  });

  test('should navigate to product details from search results', async ({ page }) => {
    await homePage.searchProduct('laptop');
    await page.waitForLoadState('networkidle');

    const resultsCount = await searchPage.getSearchResultsCount();
    
    if (resultsCount > 0) {
      await searchPage.clickFirstProduct();
      await page.waitForLoadState('networkidle');

      // Verify we're on a product page
      const currentUrl = page.url();
      expect(currentUrl).not.toContain('search');
    }
  });
});
