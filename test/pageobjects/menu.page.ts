import Page from './page';

class MenuPage extends Page {
  /*** Common ***/
  static readonly loginButtonLocator = '~Login';

  get loginButton() {
    return $(MenuPage.loginButtonLocator);
  }

  tapLoginButton(): void {
    this.waitAndTap(this.loginButton);
  }
}

export const menuPage = new MenuPage();
