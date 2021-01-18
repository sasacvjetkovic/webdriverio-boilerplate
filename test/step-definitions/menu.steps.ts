import { Given, When } from 'cucumber';
import { menuPage } from '../pageobjects/menu.page';

When('user Bob navigate to login screen from the menu', () => {
  menuPage.tapLoginButton();
});

Given('user Bob is on login page', () => {
  menuPage.tapLoginButton();
});
