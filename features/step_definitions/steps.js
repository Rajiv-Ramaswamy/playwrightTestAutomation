const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Scenario: Place an order and verify the order in order history page

Given('I login with valid credentials {string} and {string} on the webpage {string}', {timeout: 45*1000}, async function (username, password, url) {

    const loginPage = this.poManager.getLoginPage();
    await loginPage.goToWebpage(url);
    await loginPage.validLogin(username, password);
});

When('I add a product {string} to the cart', async function (cardName) {

    const productPage = this.poManager.getProductPage();
    this.cardPrice = await productPage.addItemToCart(cardName);
});

Then('I verify the details of {string} in the cart page and checkout the order', async function (cardName) {

    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyCartAndCheckout(cardName, this.cardPrice);
});

When('I confirm details like {string}, {string}, apply coupon {string}, search sequentially {string} and select {string} to submit order', async function (username, cardName, couponCode, sequentialText, country) {
    
    const submitOrderPage = this.poManager.getSubmitOrderPage();
    this.orderId = await submitOrderPage.submitOrder(username, cardName, this.cardPrice, couponCode, sequentialText, country);
});

Then('I should see the order details in the orders history page', async function () {
    
    const ordersPage = this.poManager.getOrdersPage();
    await ordersPage.verifyOrder(this.orderId);
});

Given('I login with invalid credentials {string} and {string} on the webpage {string}', {timeout: 30*1000}, async function (username, password, url) {

    const usernameField = this.page.locator('#username');
    const passwordField = this.page.locator("[name='password']");
    const signInBtn = this.page.locator("[type='submit']");
    await this.page.goto(url);
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await usernameField.fill(username);
    await passwordField.fill(password);
    await signInBtn.click();
});

Then('I confirm error message for invalid login', async function () {

    const errorMsg = this.page.locator("[style = 'display: block;']");
    console.log(await errorMsg.textContent());
    await expect(errorMsg).toContainText('Incorrect username/password.');
});