import Page from './page';

class LoginPage extends Page {
  /*** Android ***/
  static readonly aLoginPageId = '//*[@content-desc="Login-screen"]';
  static readonly aAlertTitle = '//*[@resource-id="android:id/alertTitle"]';
  static readonly aAlertMessage = '//*[@resource-id="android:id/message"]';
  static readonly aAlertOkButton = '//*[@resource-id="android:id/button1"]';
  static readonly aErrorMessage =
    '//*[@content-desc="input-email"]/../../android.widget.TextView';

  /*** iOS ***/
  static readonly iLoginPageId = '~Login Sign up';
  static readonly iAlertTitle = '//*[@value="Success"]';
  static readonly iAlertMessage = '~You are logged in!';
  static readonly iAlertOkButton = '~OK';
  static readonly iErrorMessage = '~Please enter a valid email address';

  /*** Common ***/
  static readonly email = '~input-email';
  static readonly password = '~input-password';
  static readonly loginButton = '~button-LOGIN';

  get loginPage() {
    return this.isPlatformIOS()
      ? $(LoginPage.iLoginPageId)
      : $(LoginPage.aLoginPageId);
  }

  get emailInput() {
    return $(LoginPage.email);
  }

  get passwordInput() {
    return $(LoginPage.password);
  }

  get loginButton() {
    return $(LoginPage.loginButton);
  }

  get alertTitle() {
    return this.isPlatformIOS()
      ? $(LoginPage.iAlertTitle)
      : $(LoginPage.aAlertTitle);
  }

  get alertMessage() {
    return this.isPlatformIOS()
      ? $(LoginPage.iAlertMessage)
      : $(LoginPage.aAlertMessage);
  }

  get alertOkButton() {
    return this.isPlatformIOS()
      ? $(LoginPage.iAlertOkButton)
      : $(LoginPage.aAlertOkButton);
  }

  get emailErrorMessage() {
    return this.isPlatformIOS()
      ? $(LoginPage.iErrorMessage)
      : $(LoginPage.aErrorMessage);
  }

  isLoginPageDisplayed(): boolean {
    return this.waitForElementToBeDisplayed(this.loginPage);
  }

  enterCredentialsAndLogin(username: string, password: string): void {
    this.waitAndSendKeys(this.emailInput, username);
    this.waitAndSendKeys(this.passwordInput, password);
    this.waitAndTap(this.loginButton);
  }

  successAlertIsShown(): boolean {
    return this.waitForElementToBeDisplayed(this.alertTitle);
  }

  tapOnAlertOkButton(): void {
    return this.waitAndTap(this.alertOkButton);
  }

  credentialsErrorIsShown(): boolean {
    return this.waitForElementToBeDisplayed(this.emailErrorMessage);
  }
}

export const loginPage = new LoginPage();
