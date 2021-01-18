import BasePage from "../pageobjects/page";

const SELECTORS = {
    ANDROID: {
        ALERT_TITLE: '*//android.widget.TextView[@resource-id="android:id/alertTitle"]',
        ALERT_MESSAGE: '*//android.widget.TextView[@resource-id="android:id/message"]',
        ALERT_BUTTON: '*//android.widget.Button[@text="{BUTTON_TEXT}"]',
    },
    IOS: {
        ALERT: '-ios predicate string:type == \'XCUIElementTypeAlert\'',
    },
};

class NativeAlert extends BasePage{
    /**
     * Wait for the alert to exist
     */
    static waitForIsShown (isShown = true) {
        const selector = driver.isAndroid ? SELECTORS.ANDROID.ALERT_TITLE : SELECTORS.IOS.ALERT;
        $(selector).waitForExist({
            timeout: 11000,
            reverse: !isShown,
        });
    }

    /**
     * Press a button in a cross-platform way.
     *
     * IOS:
     *  iOS always has an accessibilityID so use the `~` in combination
     *  with the name of the button as shown on the screen
     * ANDROID:
     *  Use the text of the button, provide a string and it will automatically transform it to uppercase
     *  and click on the button
     *
     * @param {string} selector
     */
    pressButton (selector :string) {
        const buttonSelector = driver.isAndroid
            ? SELECTORS.ANDROID.ALERT_BUTTON.replace(/{BUTTON_TEXT}/, selector.toUpperCase())
            : `~${selector}`;

        this.waitAndTap($(buttonSelector));
    }

    /**
     * Get the alert text
     *
     * @return {string}
     */
     text (): string {
        if (driver.isIOS) {
            // wait until alert window is shown
            this.waitAndGetText($(SELECTORS.IOS.ALERT));
            return driver.getAlertText();
        }

        else
            return this.waitAndGetText($(SELECTORS.ANDROID.ALERT_TITLE)) + '\n' + this.waitAndGetText($(SELECTORS.ANDROID.ALERT_MESSAGE));
    }
}

export default NativeAlert;
