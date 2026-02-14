//const{test, expect, request}=require('@playwright/test');
import {test, expect, request} from '@playwright/test';

const { APIutils } = require('../utils/APIutils.js')

const requestPayload = {userEmail: "rajivsoiraz894@gmail.com", userPassword: "Sashti@2412"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
const fakeResponseOrder = {data: [], message: "No Orders"}; // This is a JavaScript Object but we are sending it as a fake body for
// API response
let response;

// TEST STEP: Performing Networking Intercepting in playwright. Sending fake response to browser by overwriting actual response
// Also redirecting API request call to a different URL

test.beforeAll('@API I am skipping the login & place order UI test steps by performing the same using API calls', async function() {

    const apiContext = await request.newContext();

    let apiUtils = new APIutils(apiContext, requestPayload)

    response = await apiUtils.createOrder(orderPayload)
});

test('@API Rewriting the actual API response received from server and sending fake response to browser', async function({page}) {

    let body = JSON.stringify(fakeResponseOrder); // Here we are converting the JavaScript object to JSON API response body as required
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/');

    // The network intercept needs to be done before the operation we are performing on the respective element. That's when playwright will
    // wait for the respective API call which is triggered on interaction on the respective element.

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', async route => {

        // The * in the API request call URL indicates that any data after the mentioned URL can be routed. Because the portion where * is,
        // might have a unique value specific to an account as well. So if a different account is used, the api call should not fail. The
        // route => variable has the information for the API request to be made in order to fetch response (URL)

        const realRespo = await page.request.fetch(route.request()) // Here request is not a function like request(). It is rather an API
        // testing helper associated with the page fixture and that exposes the fetch() function to collect API response for the given
        // request (passed as argument) since the route variable has multiple properties like request, response, header etc., we need to
        // explicitly specify route.request()

        await route.fulfill({

            realRespo,
            body,
        });
        
        // Fulfulling the api call in the browser by sending the fake response. If fulfill() function sent without any arguments, the
        // existing API response will be sent to browser as such without any changes and hence we won't get expected no orders page.
        // There is response body in the real response as well. The body which we are sending will overwrite that. That's why the
        // arguments of fulfill() function is crucial.
    });

    // In order to intercept an API call using playwright, we first need to fetch the API response which we are faking. Hence
    // request() function on route.request() will fetch the response for the API request URL mentioned. Basically the server which
    // returns the response for the API call, will send it to the browser and once browser receives it, the UI is rendered accordingly
    // in the front end. Here is where we are hyjacking the API response from the server to the browser and sending a fake response
    // instead, so that the browser renders a UI matching the fake response
    
    await page.getByRole('button', {name: 'ORDERS'}).click();

    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')

    console.log(await page.locator(".mt-4").textContent());

});

let username = "rajivsoiraz894@gmail.com";

// TEST STEP: Passing order ID of another account's order into this account by redirecting the API call that fetches order details

test('@API Security Testing in Playwright using network intercepting - redirecting to different request url', async function({page}) {

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    expect(await page.title()).toContain("Let's Shop");

    await expect(page.locator('h1 em')).toContainText('Rahul Shetty Academy');

    await page.locator('#userEmail').fill(username);

    await page.locator('#userPassword').fill('Sashti@2412');

    await page.locator('#login').click();

    await page.locator("h5[style*='text-transform:'] b").nth(1).waitFor();

    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.locator('.table-bordered').waitFor();

    // The intercepting has to be conveyed to playwright before interacting with the respective element whose call we are intercepting

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*', route => {

        route.continue( { url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=698372cfc941646b7ad4a27e'}, )
    });

    // The route.continue( {} ) function takes arguments in { } so that we can include as many arguments as we want in key - value pairs.
    // Like headers, URL, cookie etc.,

    await page.locator("button:has-text('View')").first().click();

    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});