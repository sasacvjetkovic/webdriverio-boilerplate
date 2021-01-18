@regression @androidApp @iosApp @login
Feature: Login screen
  I as a regular user
  Would like to navigate the menu and go to login screen
  Because login in the app starts from entering credentials there

  Scenario: Login page is shown
    Given user Bob is on login page
    When user Bob navigate to login screen from the menu
    Then login page is shown with correct label

  @smoke
  Scenario: Login with valid credentials
    Given user Bob is on login page
    When he logs in with valid credentials
    Then alert for successful login is shown

  Scenario: Login with invalid credentials
    Given user Bob is on login page
    When he logs in with invalid credentials
    Then alert for invalid credentials is shown