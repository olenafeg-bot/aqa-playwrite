
import { test, expect } from '@playwright/test';
import LoginPage from '../support/pom/LoginPage.js';


test.describe('Profile page', () => {

  test.beforeEach(async ({ page, browser }) => {
    // Basic Auth
    const context = await browser.newContext({
      httpCredentials: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });

    // Login
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.openLogin();
    await loginPage.login('test1232@mailinator.com', 'Capital123');

    await expect(page).toHaveURL(/panel\/garage/);
  });

  test('profile page shows mocked user data', async ({ page }) => {

    // Mock API response
    await page.route('**/api/users/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            userId: 350328,
            photoFilename: 'default-user.png',
            name: 'test1',
            lastName: 'test2',
          },
        }),
      });
    });

    // Open profile page
   
    await page.goto('/panel/profile');

    // Assert UI shows mocked data
    await expect(page.getByText('test1 test2')).toBeVisible();
  });
});

