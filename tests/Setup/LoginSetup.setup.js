
import { test as setup, expect } from "@playwright/test";
import LoginPage from "../support/pom/LoginPage";
import GaragePage from "../support/pom/GaragePage";

//setup("Login tests", () => {

  setup ("authorization", async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });

    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.openLogin();
    await loginPage.login("test1232@mailinator.com", "Capital123");

    await expect(page).toHaveURL(/panel\/garage/);

    await context.storageState({ path: 'storageState.json' });
    await context.close();
  });
