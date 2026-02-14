const { test, expect, request} = require('@playwright/test');
// import { test, expect, request } from '@playwright/test';

test.describe.configure({mode: 'parallel'});

test ('@Regression My first playwright test', async () =>

    // The test name can be prefixed with the tag name associated to the test function using '@' annotation
    {
        console.log("My first asynchronous playwright test function in JavaScript")
    }
);


test('@Regression Login page practise test', async function({browser})

{

    // TEST STEPS: Try with wrong password to login, capture error screenshot which has correct password. Login and fetch product names

    const context = await browser.newContext();
    const page = await context.newPage();

    // Aborting API calls that display product images in the webpage

    page.route('**/*.{jpg, jpeg, png}', route => route.abort());

    // Printing the API request and response calls details. This helps to debug failures, especially response calls.

    page.on('request', request => console.log(request.url()));

    page.on('response', response => console.log(response.status, response.url));

    const username = page.locator('#username');
    const password = page.locator("[name='password']");
    const signInBtn = page.locator("[type='submit']");
    const errorMsg = page.locator("[style = 'display: block;']");
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await username.fill('rahulshetty');
    await password.fill('learning');
    await signInBtn.click();
    console.log(await errorMsg.textContent());
    await expect(errorMsg).toContainText('Incorrect username/password.');
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signInBtn.click();
    await expect(errorMsg).toContainText('Old password "learning" is no longer valid. Please use the new password "Learning@830$3mK2".');
    const newError = await errorMsg.textContent();
    const newPass = newError.split('"');
    const newPassword = newPass[3];
    await password.fill("");
    await password.fill(newPassword);
    await signInBtn.click();
    await page.locator('a.navbar-brand').nth(1).isEnabled();
    await expect(page.locator('a.navbar-brand').first()).toContainText('ProtoCommerce');

    // Fetching all product names displayed after login.
    await expect(page.locator('h4.card-title').first()).toContainText('iphone X');
    console.log(await page.locator('h4.card-title').allInnerTexts());
}
);

test('@Regression Test to show usage of Page fixture without browser', async ({page}) =>
{

    // page fixture can be directly used without having to call browser fixture and create a new context, when there is no browser information
    // to be passed to the browser context. Since we are just opening a fresh page, directly call page fixture without browser fixture

    await page.goto('https://www.google.co.in/');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});

test('@Regression Registration page practise test RahulShettyAcademy', async function({page}) {

    // TEST STEP: Register and Login to Rahul shetty academy website and fetch the product titles

    await page.goto('https://rahulshettyacademy.com/client/#/auth/register');
    const registerTitle = page.locator('h1.login-title');
    await expect(registerTitle).toContainText('Register');
    const firstName = page.locator('#firstName');
    await firstName.fill('Raaaakfv');
    const lastName = page.locator('#lastName');
    await lastName.fill('Ranaaaaswfmy');
    const email = page.locator('#userEmail');
    await email.fill('rajivsnkctraj894@gmail.com');
    const phone = page.locator('#userMobile');
    await phone.fill('9753486900');
    await page.locator('.custom-select').selectOption('Engineer');
    const gender = page.locator("[value = 'Male']");
    await gender.click();
    const password = page.locator('#userPassword');
    await password.fill('Sashti@2412');
    const confirmPassword = page.locator('#confirmPassword');
    await confirmPassword.fill('Sashti@2412');
    const checkbox = page.locator("[type = 'checkbox']");
    await checkbox.click();
    const register = page.locator('#login');
    await register.click();
    const accountInfo = page.locator('h1.headcolor').textContent();
    expect(await accountInfo).toContain("Account Created Successfully");
    const loginBtn = page.locator('.btn-primary');
    await loginBtn.click();
    const loginPage = page.locator('h1.login-title');
    await expect(loginPage).toContainText('Log in');
    const emailField = page.locator('#userEmail');
    await emailField.fill('rajivsnkctraj894@gmail.com');
    const pswrdField = page.locator('#userPassword');
    await pswrdField.fill('Sashti@2412');
    const loginLst = page.locator('#login');
    await loginLst.click();
    await page.locator("[style = 'text-transform: uppercase;'] b").last().waitFor();
    const firstProduct = page.locator("[style = 'text-transform: uppercase;'] b").first();
    await expect(firstProduct).toContainText('ADIDAS ORIGINAL');
    const products = page.locator("[style = 'text-transform: uppercase;'] b");
    console.log(await products.allTextContents());
}
);

test('@Regression Handling Dropdowns, Radio buttons and checkboxes', async function({browser}) {

    // TEST STEP: Handling dropdowns, radio buttons and checkboxes of Login Page Practise website

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userOption = page.locator('label.customradio span.checkmark').last();
    await userOption.click();
    await page.locator('#okayBtn').click();
    await expect(userOption).toBeChecked(); // Verifying whether the given checkbox element is checked or not
    console.log(await userOption.isChecked()); // This is not an assertion as this will just print true or false
    expect(await userOption.isChecked()).toBeTruthy(); // Whereas this is an assertion since we are asserting whether the boolean expression returns
    // true.
    await page.locator('select.form-control').selectOption('consult');
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await page.locator('#terms').click();

});

test('@Regression Test to Handle Multiple windows or tabs in playwright', async function({browser}) {

    // TEST STEP: Clicking on the blinking text in Login page Practise website to handle multiple windows using playwright

    // Switch to the new window, grab a text there and use that text to login to the Login Page Practise webpage

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const blinkingAlert = page.locator('a[href*="documents-request"]');

    await expect(blinkingAlert).toHaveAttribute('class', 'blinkingText');

    const [newPage] = await Promise.all([

        context.waitForEvent('page'),
        blinkingAlert.click(),
    ]);

    const usernameText = await newPage.locator('a[href*="mailto:mentor"]').textContent();

    const username = usernameText.split("@")[1];

    await page.locator('#username').fill(username);

    expect(await page.locator('#username').inputValue()).toContain(username);

    // When the requirement is to verify the text content entered in an input textbox, then the function to be used is: .inputValue()
});

test('@Regression Test to make use of getBy methods in playwright', async function({page}) {

    // TEST STEP: Automating Automation Practise page of Rahul shetty academy using .getBy functions of playwright

    // Filling up details in the form displayed in the Automation practise website and validating success message for form submission

    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    expect(await page.locator("h1[align='center']").textContent()).toContain('Protractor Tutorial');

    expect(await page.title()).toContain('ProtoCommerce');

    await page.locator("form input[name='name']").fill('Rajiv Ramaswamy');

    expect(await page.locator("form input[name='name']").inputValue('Rajiv Ramaswamy'));

    await page.locator("form input[name='email']").fill('rajivsourav1994@gmail.com');

    expect(await page.locator("form input[name='email']").inputValue('rajivsourav1994@gmail.com'));

    await page.getByPlaceholder('Password').fill('Sashti@2412');

    expect(await page.getByPlaceholder('Password').inputValue('Sashti@2412'));

    await page.getByText('Check me out if you Love IceCreams!').click();

    expect(await page.getByText('Check me out if you Love IceCreams!').isChecked());

    await page.locator('#exampleFormControlSelect1').selectOption('Male');

    expect(await page.locator('#exampleFormControlSelect1').inputValue('Male'));

    await page.getByLabel('Employed').click();

    expect(await page.getByLabel('Employed').isChecked());

    await page.locator("input[name='bday']").fill('1994-09-23');

    expect(await page.locator("input[name='bday']").inputValue('1994-09-23'));

    await page.getByRole('button', {name: 'Submit'}).click();

    expect((await page.locator('div.alert-success').textContent()).trim()).toContain('The Form has been submitted successfully!');
});

test('@Regression Test to work with web Calendar using playwright', async function({browser}) {

    // TEST STEP: Navigating to selenium practise website to pick a particular date in the web calendar element

    // Verify the selected date is the date that was tried to select

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    const [newPage] = await Promise.all([
        
        context.waitForEvent('page'),
        await page.getByRole('link', {name: 'Top Deals'}).click(),
    ]);

    await newPage.locator("label[for='deliveryDate']").waitFor();
    expect(await newPage.locator("label[for='deliveryDate']").textContent()).toContain('Delivery Date');

    const dateText = "23";
    const monthText = "June";
    const yearText = "2027";

    await newPage.locator('.react-date-picker__calendar-button').click();
    await newPage.locator('.react-calendar__navigation__label').click();
    const currentYearText = (await newPage.locator('.react-calendar__navigation__label .react-calendar__navigation__label__labelText').textContent()).trim();
    const currentYear = parseInt(currentYearText);
    const year = parseInt(yearText);
    const date = parseInt(dateText);

    if (year > currentYear) {

        await newPage.locator('.react-calendar__navigation__next-button').click();
    } else {

        await newPage.locator('.react-calendar__navigation__prev-button').click();
    }
    
    const monthNum = 6; // Since monthText is June and is the 6th month of the year

    await newPage.locator('.react-calendar__year-view__months__month').nth(monthNum - 1).click();

    await newPage.locator('.react-calendar__month-view__days__day abbr').filter({ hasText: date }).click();

    const dateInput = await newPage.locator("input[name='date']").inputValue();

    expect(dateInput).toContain('2027-06-23');

});

test('@Regression Test to handle Frames, popups, hidden elements in playwright', async function({page}){

    // TEST STEP: In the Automation Practise website of Rahul Shetty Academy, handle the frame elements, popups, hidden elements etc.,

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    expect(await page.screenshot('')).toMatchSnapshot('landingPage.png');

    // This is visual testing. Fails in the first execution and uses the first screenshot as reference from the 2nd instance
    // The function .toMatchSnapshot() is available only in expect fixture which asserts that instance screenshot with the reference screenshot

    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
    await page.locator('#hide-textbox').click();

    await page.screenshot({path: 'fullScreenshot.png'}); // The function .screenshot({path: }) expects path as arguments within curly braces 

    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();

    await page.locator('#show-textbox').click();

    await page.locator('.displayed-class').screenshot({path: 'elementScreenshot.png'});

    await expect(page.locator('.displayed-class')).toBeVisible();

    await page.getByPlaceholder('Enter Your Name').fill('Rajiv');

    page.on('dialog', dialog => dialog.accept());
    await page.locator('#alertbtn').click();

    await page.locator('#confirmbtn').click();

    await page.getByRole('button', {name: 'Mouse Hover'}).hover();

    await page.getByRole('link', {name: 'Top'}).click();

    // page.locator is for HTML elements in a webpage outside frames whereas page.frameLocator() is for HTML elements within a frame
    
    const framePage = page.frameLocator('#courses-iframe'); // Look for tags like iframe or frameset in the HTML DOM

    await framePage.locator("li a[href='lifetime-access']:visible").click();

    const studentsCount = (await framePage.locator('.text h2').textContent()).split(" ")[1];

    console.log(studentsCount);
});
