import { Element } from '@wdio/sync';

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  /**
   * Wait for element to be displayed, enabled and tap on it
   * @param element
   */
  waitAndTap(element: Element): void {
    this.waitForDisplayedAndEnabled(element);
    element.click();
  }

  /**
   * Wait for element to be displayed, enabled and get text from it
   * @param element
   * @returns text if element is displayed, otherwise empty string
   */
  waitAndGetText(element: Element): string {
    this.waitForDisplayedAndEnabled(element);
    return element.getText();
  }

  /**
   * Wait for element to be displayed, enabled and set value to it
   * @param element
   * @param text
   */
  waitAndSendKeys(element: Element, text: string): void {
    this.waitForDisplayedAndEnabled(element);
    element.setValue(text);
  }

  /**
   * Wait for element to be displayed
   * @param element
   * @returns true if element is displayed, otherwise false
   */
  waitForElementToBeDisplayed(element: Element): boolean {
    return driver.waitUntil(() => element.isDisplayed());
  }

  /**
   * Wait for element to be displayed and enabled
   * @param element
   */
  waitForDisplayedAndEnabled(element: Element): void {
    driver.waitUntil(() => element.isDisplayed());
    driver.waitUntil(() => element.isEnabled());
  }

  /**
   * Check is platform iOS
   * @returns true if platform is iOS
   */
  isPlatformIOS(): boolean {
    return driver.isIOS;
  }
}
