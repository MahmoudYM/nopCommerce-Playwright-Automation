import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
//4
test.describe('User Login Tests', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.goto();
  });

  test('should login with valid credentials', async ({ page }) => {
    await homePage.clickLogin();

    // Using demo account credentials
    await loginPage.login('test@test.com', 'test123');

    // Verify login success by checking if we're redirected
    await page.waitForLoadState('networkidle');
    const currentUrl = page.url();
    
    // After login, user should be redirected away from login page
    expect(currentUrl).not.toContain('login');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await homePage.clickLogin();

    await loginPage.login('invalid@email.com', 'wrongpassword');

    // Wait for error message
    await page.waitForTimeout(1000);
    
    // Verify error message or still on login page
    const currentUrl = page.url();
    expect(currentUrl).toContain('login');
  });

  test('should show error for empty credentials', async ({ page }) => {
    await homePage.clickLogin();

    await loginPage.clickLogin();

    // Should stay on login page
    const currentUrl = page.url();
    expect(currentUrl).toContain('login');
  });

  test('should navigate to login page correctly', async ({ page }) => {
    await homePage.clickLogin();

    const currentUrl = page.url();
    expect(currentUrl).toContain('login');
  });
});
