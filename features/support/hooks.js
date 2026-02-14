const { Before, After, BeforeStep, AfterStep, BeforeAll, AfterAll, Status } = require('@cucumber/cucumber');
const playwright = require('playwright');
const { POmanager } = require('../../pageObjects/POmanager');

Before({tags: '@NegativeScenarios or @E2Etests'}, async function() {

    const browser = await playwright.chromium.launch({

        headless: false,
        args: ['--start-maximized']
    });
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.poManager = new POmanager(this.page);
});

After(async function() {

    console.log("This executes after each scenario");
});

BeforeStep(async function() {

    console.log("This executes before each step");
});

AfterStep(async function({result}) {

    if (result.status === Status.FAILED) {

        await this.page.screenshot({path: 'screenshot_Cucumber.png'});
    }
    console.log("This executes after each step");
});

BeforeAll(async function() {

    console.log("This executes before all scenarios in the feature file");
});

AfterAll(async function() {

    console.log("This executes after all scenarios in the feature file")
});