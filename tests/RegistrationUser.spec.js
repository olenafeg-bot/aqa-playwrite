import { test, expect } from '@playwright/test';
import Registration from '../support/pom/Registration';
import {generateRandomEmail} from '../support/pom/emailGenerator';

test('should open site with basic auth', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto'
    }
  });
  const page = await context.newPage();
  const registration = new Registration(page);
  const name = " test"; 
  const lastName = "test ";
  const email = generateRandomEmail();

  await registration.open();
  await registration.openRegistrationForm();
  //Negative tests for registration form validation. Incrorrect name entered 

  await registration.fillName('test1');
  await registration.clickLastName();
  await expect(registration.getErrorMessage('Name is invalid')).toBeVisible();

  await registration.fillLastName(lastName);
  await registration.fillEmail(email);
  await registration.fillPassword('123Capital');
  await registration.fillRepeatPassword('123Capital');
  await expect(registration.registerButton).toBeDisabled();

  //Negative tests for registration form validation. Empty Last name field

  await registration.clearName();
  await registration.fillName(name);
  await registration.clearLastName();  
  await registration.clickEmail();
  await expect(registration.getErrorMessage('Last name required')).toBeVisible();
  await expect(registration.registerButton).toBeDisabled();

//Negative tests for registration form validation. Incrorrect email entered 

  await registration.clearLastName();
  await registration.fillLastName(lastName);
  await registration.clearEmail();
  await registration.fillEmail('olena');
  await registration.clickPassword();
  await expect(registration.getErrorMessage('Email is incorrect')).toBeVisible();
  await expect(registration.registerButton).toBeDisabled();

//Negative tests for registration form validation. Incrorrect password entered


  await registration.clearEmail();
  await registration.fillEmail(email);
  await registration.clearPassword();
  await registration.fillPassword('TestPassword123!');
  await registration.clickRepeatPassword();
  await expect(registration.incorrectPasswordErrorMessage()).toBeVisible();  
  await expect(registration.registerButton).toBeDisabled();
  
//Negative tests for registration form validation. Passwords do not match

  await registration.clearRepeatPassword();
  await registration.fillPassword('123Capital');
  await registration.clearRepeatPassword();
  await registration.fillRepeatPassword('124Capital');
  await expect(registration.getErrorMessage('Passwords do not match')).toBeVisible();
  await expect(registration.registerButton).toBeDisabled();
  
//Positive test for registration form validation. All fields are filled in correctly

    await registration.clearRepeatPassword();
    await registration.fillRepeatPassword('123Capital');
    await registration.clickRegister();
    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    
});

