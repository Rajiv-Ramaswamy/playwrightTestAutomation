const { test, expect, request } = require('@playwright/test')

const username = "rajivsoiraz894@gmail.com";
let webContext;

test.beforeAll('Login Steps', async function({browser}) {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    expect(await page.title()).toContain("Let's Shop");

    await expect(page.locator('h1 em')).toContainText('Rahul Shetty Academy');

    await page.locator('#userEmail').fill(username);

    await page.locator('#userPassword').fill('Sashti@2412');

    await page.locator('#login').click();

    await page.locator("h5[style*='text-transform:'] b").nth(1).waitFor();

    // Completing the login steps in the beforeAll() functions and saving the storageState of the context in the desired path with filename

    // Point to be noted: The storageState() doesn't exist in the window or page but is in the browser context. Hence context.storageState

    await context.storageState({path: 'state.json'});

    webContext = await browser.newContext({storageState: 'state.json'}) // Passing the storage state to the new context of the browser and
    
    // by using webContext object, we can skip the login information in all the following tests.
});

test('@E2E End to End Test', async function() {

    const cardName = "ZARA COAT 3";
    const couponCode = "rahulshettyacademy";
    const country = "India";
    let cardPrice;

    const page = await webContext.newPage();
    
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    const cards = page.locator('.card-body');

    const cardCount = await cards.count();

    for (let i = 0; i < cardCount; i++) {

        const elementText = await cards.nth(i).locator("h5[style*='text-transform:'] b").textContent();
        console.log(elementText);
        if (elementText === cardName) {

            cardPrice = await cards.nth(i).locator("div[class*='d-flex'] div").textContent();
            await cards.nth(i).locator("button[style*='float:']").click();
            break;
        }
    }

    await page.locator("li button[routerlink= '/dashboard/cart']").click();

    await page.locator("button[routerlink='/dashboard']").waitFor();

    expect(await page.locator('div h1').textContent()).toContain("My Cart");

    expect(await page.locator('.cartSection h3').textContent()).toContain(cardName);

    expect(await page.locator('.prodTotal p').textContent()).toContain(cardPrice);

    await page.getByRole('Button', {name: 'Checkout'}).click();

    expect(await page.locator('.item__details .item__title').textContent()).toContain(cardName);

    expect(await page.locator('.item__details .item__price').textContent()).toContain(cardPrice);

    expect(await page.locator('.item__details .item__quantity').textContent()).toContain(' Quantity: 1 ');

    await page.locator("//div[text() = 'CVV Code ']/parent::div/child::input[@type='text']").fill("123");

    await page.locator("//div[text()='Name on Card ']/following-sibling::input[@type='text']").fill("Rajiv Ramaswamy");

    await page.locator("input[name='coupon']").fill(couponCode);

    await page.locator("button[type='submit']").click();

    await expect(page.locator("p[class*='ng-star-inserted']")).toBeVisible();

    expect(await page.locator("input[class*='ng-untouched']").inputValue()).toContain(username);

    await page.getByPlaceholder("Select Country").pressSequentially('ind');

    await page.locator('.list-group-item span').nth(1).waitFor();

    const countryList = page.locator('.list-group-item span');

    console.log(countryList);
    const countryCount = await countryList.count();

    console.log("Total Results: ", countryCount);

    console.log(await countryList.nth(1).textContent());

    for(let i=0; i<countryCount;i++) {

        if ((await countryList.nth(i).textContent()).trim() === country) {

            await countryList.nth(i).click();
            break;
        }
    }

    await page.locator('.action__submit').click();

    expect(await page.locator('.hero-primary').textContent()).toContain('Thankyou for the order.');

    const orderId = (await page.locator('.em-spacer-1 .ng-star-inserted').textContent()).replaceAll('|', '').trim();

    console.log('The given order ID is: ', orderId);

    expect(await page.locator(".product-info-column div[style*='5px;']").first().textContent()).toContain(cardName);

    expect(await page.locator(".product-info-column div[style*='5px;']").last().textContent()).toContain(cardPrice);

    await page.locator("label[routerlink='/dashboard/myorders']").click();

    await page.locator('.table-bordered').waitFor();

    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();

    for (let i =0; i<rowCount;i++) {

        const fetchedOrderId = (await rows.nth(i).locator('th').textContent()).trim();

        if(fetchedOrderId === orderId) {

            await rows.nth(i).locator('td .btn-primary').click();
            await page.locator('.email-title:visible').waitFor();
            expect((await page.locator('div .col-text').textContent()).trim()).toContain(orderId);
            break;
        }

    }
});

test('@E2E Validate Add to Cart Option', async function() {

    const cardName = "ZARA COAT 3";
    let cardPrice;

    const page = await webContext.newPage();
    
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    const cards = page.locator('.card-body');

    const cardCount = await cards.count();

    for (let i = 0; i < cardCount; i++) {

        const elementText = await cards.nth(i).locator("h5[style*='text-transform:'] b").textContent();
        console.log(elementText);
        if (elementText === cardName) {

            cardPrice = await cards.nth(i).locator("div[class*='d-flex'] div").textContent();
            await cards.nth(i).locator("button[style*='float:']").click();
            break;
        }
    }

    await page.locator("li button[routerlink= '/dashboard/cart']").click();

    await page.locator("button[routerlink='/dashboard']").waitFor();

    expect(await page.locator('div h1').textContent()).toContain("My Cart");

    expect(await page.locator('.cartSection h3').textContent()).toContain(cardName);

    expect(await page.locator('.prodTotal p').textContent()).toContain(cardPrice);
});
