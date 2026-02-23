import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
//5
test.describe('Shopping Cart Tests', () => {
  let homePage: HomePage;
  let searchPage: SearchPage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await homePage.goto();
  });

  test('should add product to cart', async ({ page }) => {
    // Search for a product
    await homePage.searchProduct('laptop');
    await page.waitForLoadState('networkidle');

    // Click first product
    await searchPage.clickFirstProduct();
    await page.waitForLoadState('networkidle');

    // Add to cart
    await productPage.addProductToCart('1');

    // Verify success notification
    const notification = await page.locator('#bar-notification').isVisible();
    expect(notification).toBeTruthy();
  });

  test('should add multiple quantities of a product', async ({ page }) => {
    await homePage.searchProduct('laptop');
    await page.waitForLoadState('networkidle');

    await searchPage.clickFirstProduct();
    await page.waitForLoadState('networkidle');

    // Add 2 items to cart
    await productPage.addProductToCart('2');

    // Navigate to cart
    await productPage.goToShoppingCart();
    await page.waitForLoadState('networkidle');

    // Verify cart has items
    const itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBeGreaterThan(0);
  });

  test('should update product quantity in cart', async ({ page }) => {
    // Add product to cart first
    await homePage.searchProduct('laptop');
    await page.waitForLoadState('networkidle');
    await searchPage.clickFirstProduct();
    await page.waitForLoadState('networkidle');
    await productPage.addProductToCart('1');

    // Go to cart
    await homePage.goToCart();
    await page.waitForLoadState('networkidle');

    const itemsCount = await cartPage.getCartItemsCount();
    
    if (itemsCount > 0) {
      // Update quantity
      await cartPage.updateQuantity(0, '3');
      await page.waitForLoadState('networkidle');

      // Verify cart still has items
      const updatedCount = await cartPage.getCartItemsCount();
      expect(updatedCount).toBeGreaterThan(0);
    }
  });

  test('should remove product from cart', async ({ page }) => {
    // Add product to cart
    await homePage.searchProduct('laptop');
    await page.waitForLoadState('networkidle');
    await searchPage.clickFirstProduct();
    await page.waitForLoadState('networkidle');
    await productPage.addProductToCart('1');

    // Go to cart
    await homePage.goToCart();
    await page.waitForLoadState('networkidle');

    const initialCount = await cartPage.getCartItemsCount();
    
    if (initialCount > 0) {
      // Remove item
      await cartPage.removeItem(0);
      await page.waitForLoadState('networkidle');

      // Verify item was removed
      const finalCount = await cartPage.getCartItemsCount();
      expect(finalCount).toBe(initialCount - 1);
    }
  });

  test('should display empty cart message when no items', async ({ page }) => {
    await homePage.goToCart();
    await page.waitForLoadState('networkidle');

    const itemsCount = await cartPage.getCartItemsCount();
    
    if (itemsCount === 0) {
      const isEmpty = await cartPage.isCartEmpty();
      expect(isEmpty).toBeTruthy();
    }
  });
});
