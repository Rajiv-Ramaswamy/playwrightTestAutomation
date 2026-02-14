//const{test, expect, request}=require('@playwright/test');
import {test, expect, request} from '@playwright/test';

const { APIutils } = require('../utils/APIutils.js');

const requestPayload = {userEmail: "rajivsoiraz894@gmail.com", userPassword: "Sashti@2412"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
let response

// TEST STEP: Bypassing login & placing order in the E2E Test through API Calls and directly validating the order ID in orders page

test.beforeAll('@API I am skipping login & order placing steps in E2E test', async function() {

    // await is required even for the API Tests written in Playwright because JavaScript is single-threaded and hence response json might be
    // tried to fetch even before request is sent.

    const apiContext = await request.newContext();

    let apiUtils = new APIutils(apiContext, requestPayload) // Object created for APIutils class which is imported in line number 4 and the
    // apiContext is passed as an argument to the APIutils class.

    response = await apiUtils.createOrder(orderPayload) // Calling an async function from the imported class using the object created for it
});

test('@API Bypassing UI steps in End to End Test using API calls', async function({page}) {

    // The .addInitScript() function is used to add the login token to the Local storage of the application and hence the session is active
    // without actually logging in from the login page

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value)
    }, response.token); // The response.token comes from the function call statement for createOrder whose response is collected as response

    // and to traverse to token, we use response.token

    await page.goto('https://rahulshettyacademy.com/client/');

    await page.getByRole('button', {name: 'ORDERS'}).click();

    await page.locator('.table-bordered').waitFor();

    // Here, the requirement is to narrow down to the number of rows present in the orders page first. By this way the scope of the webpage is
    // limited to the particular row under validation. From the row, the orderId column and the view button column can be reached.

    const rows = page.locator('tbody tr');

    const rowCount = await rows.count();

    // Here, await keyword is required because, the .count() is a playwright function that performs an action to return the number of elements
    // matching the locator.

    for (let i =0; i<rowCount;i++) {

        const fetchedOrderId = (await rows.nth(i).locator('th').textContent()).trim();
        if(fetchedOrderId === response.orderId) {

            await rows.nth(i).locator('td .btn-primary').click();
            await page.locator('.email-title:visible').waitFor();
            expect(await page.locator('div .col-text').textContent()).toContain(response.orderId);
            break;
        }
    }

});