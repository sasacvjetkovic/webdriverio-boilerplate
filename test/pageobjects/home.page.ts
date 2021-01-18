import { Element } from '@wdio/sync';
import Page from './page';

class HomePage extends Page {
  /*** Android ***/
  static readonly aHomePageLabel = '~Home-screen';
    //'//android.widget.ScrollView[@content-desc="Home-screen"]/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[3]';
  /*** iOS ***/
  static readonly iHomePageLabel = '~Demo app for the appium-boilerplate';

  get homePageLabel(): Element {
    return this.isPlatformIOS()
      ? $(HomePage.iHomePageLabel)
      : $(HomePage.aHomePageLabel);
  }

  homePageIsShown(): boolean {
    return this.waitForElementToBeDisplayed(this.homePageLabel);
  }
}

export const homePage = new HomePage();
