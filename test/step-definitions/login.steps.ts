import { When, Then } from 'cucumber';

import { loginPage } from '../pageobjects/login.page';
import { storage } from '../data-share/dataStorage';

Then('login page is shown with correct label', () => {
  expect(loginPage.isLoginPageDisplayed()).toBeTruthy();
});

When('he logs in with valid credentials', () => {
  let email: string = 'bob@test.com';
  let password: string = 'Test123456789';
  loginPage.enterCredentialsAndLogin(email, password);
  storage.loginEntity.email = email;
  storage.loginEntity.password = password;
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
