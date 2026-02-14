const { test, expect, request } = require('@playwright/test');
const { POmanager } = require('../pageObjects/POmanager');
const dataset = JSON.parse(JSON.stringify(require('../utils/testdata.json')));
const { customTest } = require('../utils/TestDatafixture');


for (const data of dataset) {
test(`@E2E End to End Test for ${data.cardName} product`, async function({page}) {

    const poManager = new POmanager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goToWebpage(data.url);
    await loginPage.validLogin(data.username, data.password);

    const productPage = poManager.getProductPage();
    const cardPrice = await productPage.addItemToCart(data.cardName);

    const cartPage = poManager.getCartPage();
    await cartPage.verifyCartAndCheckout(data.cardName, cardPrice);

    const submitOrderPage = poManager.getSubmitOrderPage();
    const orderId = await submitOrderPage.submitOrder(data.username, data.cardName, cardPrice, data.couponCode, data.sequentialText, data.country);

    const ordersPage = poManager.getOrdersPage();
    await ordersPage.verifyOrder(orderId);
    
});
}

customTest('@E2E check product added to cart', async function({page, cartCheckTestData}) {

    const poManager = new POmanager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goToWebpage(cartCheckTestData.url);
    await loginPage.validLogin(cartCheckTestData.username, cartCheckTestData.password);

    const productPage = poManager.getProductPage();
    const cardPrice = await productPage.addItemToCart(cartCheckTestData.cardName);

    const cartPage = poManager.getCartPage();
    await cartPage.verifyCartAndCheckout(cartCheckTestData.cardName, cardPrice);
});

customTest('@E2E End to End Test', async function({page, End_to_End_Testdata}) {

    const poManager = new POmanager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goToWebpage(End_to_End_Testdata.url);
    await loginPage.validLogin(End_to_End_Testdata.username, End_to_End_Testdata.password);

    const productPage = poManager.getProductPage();
    const cardPrice = await productPage.addItemToCart(End_to_End_Testdata.cardName);

    const cartPage = poManager.getCartPage();
    await cartPage.verifyCartAndCheckout(End_to_End_Testdata.cardName, cardPrice);

    const submitOrderPage = poManager.getSubmitOrderPage();
    const orderId = await submitOrderPage.submitOrder(End_to_End_Testdata.username, End_to_End_Testdata.cardName, cardPrice, End_to_End_Testdata.couponCode, End_to_End_Testdata.sequentialText, End_to_End_Testdata.country);

    const ordersPage = poManager.getOrdersPage();
    await ordersPage.verifyOrder(orderId);
    
});
