// Import necessary modules from Selenium WebDriver
const { Builder, By, until } = require('selenium-webdriver');
// Import Mocha's describe, it, after, and before functions for structuring tests
const { describe, it, after, before, beforeEach } = require('mocha');
// Import Node.js assert module for assertions
const assert = require('assert');

// Ensure Chromedriver is installed and required
require('chromedriver');

describe('Login Functionality', function() {
  // Declare a variable to hold the WebDriver instance
  let driver;

  // This block runs before all tests; it sets up the WebDriver instance
  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  // This block runs after all tests; it quits the WebDriver instance
  after(async function() {
    await driver.quit();
  });

  // This block runs before each test; it navigates to the login page
  beforeEach(async function() {
    await driver.get('Enter login url');
  });

  // Test case for successful login with valid credentials
  it('Successful login with valid credentials', async function() {
    // Find the username input field and enter a valid username
    let validUsername = await driver.findElement(By.id('username'));
    await validUsername.sendKeys('validUsername');
    // Find the password input field and enter a valid password
    let validPassword = await driver.findElement(By.id('password'));
    await validPassword.sendKeys('validPassword');
    // Find the login button and click it
    let loginButtonClick1 = await driver.findElement(By.id('loginButton'));
    await loginButtonClick1.click();
    // Wait until the URL contains '/dashboard' indicating a successful login
    await driver.wait(until.urlContains('/dashboard'), 5000); // assuming /dashboard is the redirect after successful login
    // Get the current URL and assert that it includes '/dashboard'
    let currentUrl = await driver.getCurrentUrl();
    assert(currentUrl.includes('/dashboard'));
  });

  // Test case for failed login with invalid credentials
  it('Failed login with invalid credentials', async function() {
    // Find the username input field and enter an invalid username
    let invalidUsername = await driver.findElement(By.id('username'));
    await invalidUsername.sendKeys('invalidUsername');
    // Find the password input field and enter an invalid password
    let invalidPassword = await driver.findElement(By.id('password'));
    await invalidPassword.sendKeys('invalidPassword');
    // Find the login button and click it
    let loginButtonClick2 = await driver.findElement(By.id('loginButton'));
    await loginButtonClick2.click();
    // Find the error message element
    let errorMessage = await driver.findElement(By.id('errorMessage'));
    // Check if the error message is displayed
    let isDisplayed = await errorMessage.isDisplayed();
    // Get the text of the error message
    let text = await errorMessage.getText();
    // Assert that the error message is displayed and contains the expected text
    assert(isDisplayed);
    assert.strictEqual(text, 'Invalid credentials');
  });

  // Test case for displaying the error message when login fails
  it('Error message display when login fails', async function() {
    // Find the username input field and enter an invalid username
    await driver.findElement(By.id('username')).sendKeys('invalidUsername');
    // Find the password input field and enter an invalid password
    await driver.findElement(By.id('password')).sendKeys('invalidPassword');
    // Find the login button and click it
    await driver.findElement(By.id('loginButton')).click();
    // Find the error message element
    let errorMessage = await driver.findElement(By.id('errorMessage'));
    // Check if the error message is displayed
    let isDisplayed = await errorMessage.isDisplayed();
    // Get the text of the error message
    let text = await errorMessage.getText();
    // Assert that the error message is displayed and contains the expected text
    assert(isDisplayed);
    assert.strictEqual(text, 'Invalid credentials');
  });
});