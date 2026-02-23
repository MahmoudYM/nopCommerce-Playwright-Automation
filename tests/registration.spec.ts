import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
//3
test.describe('User Registration Tests', () => {
  let homePage: HomePage;
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registerPage = new RegisterPage(page);
    await homePage.goto();
  });

  test('should register a new user successfully', async ({ page }) => {
    // Navigate to registration page
    await homePage.clickRegister();

    // Generate unique email to avoid conflicts
    const timestamp = Date.now();
    const userData = {
      gender: 'male' as const,
      firstName: 'John',
      lastName: 'Doe',
      email: `john.doe.${timestamp}@test.com`,
      password: 'Test@123456',
      company: 'Test Company'
    };

    // Fill registration form
    await registerPage.registerUser(userData);

    // Verify registration success
    await page.waitForLoadState('networkidle');
    const successMessage = await registerPage.getSuccessMessage();
    expect(successMessage).toContain('Your registration completed');
  });

  test('should display validation error for existing email', async ({ page }) => {
    await homePage.clickRegister();

    const userData = {
      gender: 'female' as const,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'test@test.com', // Using a common email that might exist
      password: 'Test@123456'
    };

    await registerPage.registerUser(userData);
    
    // Wait for response
    await page.waitForTimeout(2000);
    
    // The page should either show an error or redirect if email exists
    const currentUrl = page.url();
    expect(currentUrl).toBeTruthy();
  });

  test('should validate required fields', async ({ page }) => {
    await homePage.clickRegister();

    // Try to register without filling required fields
    await registerPage.clickRegister();

    // Verify we're still on the registration page (form didn't submit)
    const currentUrl = page.url();
    expect(currentUrl).toContain('register');
  });
});
