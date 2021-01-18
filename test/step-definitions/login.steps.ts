import { When, Then } from 'cucumber';

import { loginPage } from '../pageobjects/login.page';

Then('login page is shown with correct label', () => {
  expect(loginPage.isLoginPageDisplayed()).toBeTruthy();
});

When('he logs in with valid credentials', () => {
  loginPage.enterCredentialsAndLogin('bob@test.com', 'Test123456789');
});

Then('alert for successful login is shown', () => {
  expect(loginPage.successAlertIsShown()).toBeTruthy();
  expect(loginPage.alertMessage).toHaveText('You are logged in!');
});

When('he logs in with invalid credentials', () => {
  loginPage.enterCredentialsAndLogin('bob', 'Test123456789');
});

Then('alert for invalid credentials is shown', () => {
  expect(loginPage.credentialsErrorIsShown()).toBeTruthy();
  expect(loginPage.emailErrorMessage).toHaveText(
    'Please enter a valid email address',
  );
});
