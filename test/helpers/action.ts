class ActionHelper {
  launchBrowserUrl(urlToLaunch: string): void {
    browser.url(urlToLaunch);
  }

  getTitle(): string {
    return browser.getTitle();
  }

  launchApp(): void {
    driver.launchApp();
  }

  switchToNativeContext(): void {
    browser.switchContext('NATIVE_APP');
  }

  pause(seconds: number): void {
    browser.pause(seconds * 1000);
  }

  isVisible(locator: string): boolean {
    return $(locator).isDisplayed() ? true : false;
  }

  click(locator: string): void {
    $(locator).click();
  }

  waitForElement(locator: string): boolean {
    return $(locator).waitForDisplayed();
  }

  clearText(locator: string): void {
    $(locator).clearValue();
  }

  sendText(locator: string, inputText: string) {
    $(locator).addValue(inputText);
  }

  getText(locator: string): string {
    return $(locator).getText();
  }
}

export default new ActionHelper();
