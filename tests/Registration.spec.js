import { test, expect } from '@playwright/test';

function generateRandomEmail() {
  const emailLogin = "-olena123";
  const emailAt = "@gmail.com";
  return emailLogin + Math.random().toString(36).substring(2, 10) + emailAt;
}

test('should open site with basic auth', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto'
    }
  });
  const page = await context.newPage();
  await page.goto('https://qauto.forstudy.space/');
  await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
});

test('should register a new user', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto'
    }
  });
  const page = await context.newPage();
  await page.goto('https://qauto.forstudy.space/');

  const email = generateRandomEmail();

  //Negative tests for registration form validation. Incrorrect name entered 
  
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.locator('#signupName').fill('test1');
  await page.locator('#signupLastName').click();
  await expect(page.locator('.invalid-feedback')).toHaveText('Name is invalid');
  await expect(page.locator('.invalid-feedback')).toBeVisible();
  await page.locator('#signupLastName').fill('test');
  await page.locator('#signupEmail').fill(email);
  await page.locator('#signupPassword').fill('123Capital');
  await page.locator('#signupRepeatPassword').fill('123Capital');
  await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();

  //Negative tests for registration form validation. Empty Last name field
  const name = " test"; 
  const lastName = "test ";
  await page.locator('#signupName').fill(name.trim());
  await page.locator('#signupLastName').fill(lastName.trim());
  await page.locator('#signupLastName').clear();
  await page.locator('#signupPassword').click();
  await expect(page.locator('.invalid-feedback')).toHaveText('Last name required');
  await expect(page.locator('.invalid-feedback')).toBeVisible();
  await page.locator('#signupEmail').fill(email);
  await page.locator('#signupPassword').fill('123Capital');
  await page.locator('#signupRepeatPassword').fill('123Capital');
  await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();

  //Negative tests for registration form validation. Incrorrect email entered 
  await page.locator('#signupName').fill(name.trim());
  await page.locator('#signupLastName').fill(lastName.trim());
  await page.locator('#signupEmail').fill('olena');
  await page.locator('#signupPassword').click();
  await expect(page.locator('.invalid-feedback')).toHaveText('Email is incorrect');
  await expect(page.locator('.invalid-feedback')).toBeVisible();
  await page.locator('#signupPassword').fill('123Capital');
  await page.locator('#signupRepeatPassword').fill('123Capital');
  await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();

    //Negative tests for registration form validation. Incrorrect password entered
  await page.locator('#signupName').fill(name.trim());
  await page.locator('#signupLastName').fill(lastName.trim());
  await page.locator('#signupEmail').fill(email);
  await page.locator('#signupPassword').fill('TestPassword123!');
  await page.locator('#signupRepeatPassword').click();
  await expect(page.locator('.invalid-feedback').filter({ hasText: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' })).toBeVisible();
  await page.locator('#signupRepeatPassword').fill('TestPassword123!');
  await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();

    //Negative tests for registration form validation. Passwords do not match
  await page.locator('#signupName').fill(name.trim());
  await page.locator('#signupLastName').fill(lastName.trim());
  await page.locator('#signupEmail').fill(email);
  await page.locator('#signupPassword').fill('123Capital');
  await page.locator('#signupRepeatPassword').fill('1234Capital');
  await expect(page.locator('.invalid-feedback')).toHaveText('Passwords do not match');
  await expect(page.locator('.invalid-feedback')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();

    //Positive test for registration form validation. All fields are filled in correctly
  await page.locator('#signupName').fill(name.trim());
  await page.locator('#signupLastName').fill(lastName.trim());
  await page.locator('#signupEmail').fill(email);
  await page.locator('#signupPassword').fill('123Capital');
  await page.locator('#signupRepeatPassword').fill('123Capital');
  await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled();
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');

});
