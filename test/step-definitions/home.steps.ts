import { Then } from 'cucumber';
import { homePage } from '../pageobjects/home.page';

Then('home page label is shown', () => {
  expect(homePage.homePageLabel).toHaveText(
    'Demo app for the appium-boilerplate',
  );
});
