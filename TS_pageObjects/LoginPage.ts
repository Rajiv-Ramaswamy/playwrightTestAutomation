import {expect, type Locator, type Page} from '@playwright/test';

export class LoginPage {

    // A constructor is mandatory for a class because whenever an object is created for this class, outside this class, then the variables
    // that are passed as a parameter to this class will be initiated and those can be used across this class to build reusable functions
    // that can be called across the project

    page: Page
    usernameField: Locator
    passwordField: Locator
    loginBtn: Locator
    firstCard: Locator
    welcomeHeader: Locator

    constructor(page: Page) {

        // Using 'this' keyword to make the scope of the variables to be in class level, so that they can be used in multiple functions across
        // the class file

        this.page = page;
        this.usernameField = this.page.locator('#userEmail');
        this.passwordField = this.page.locator('#userPassword');
        this.loginBtn = this.page.locator('#login');
        this.firstCard = this.page.locator("h5[style*='text-transform:'] b");
        this.welcomeHeader = this.page.locator('h1 em');
    }

    async goToWebpage(url: string) {

        await this.page.goto(url);
        expect(await this.page.title()).toContain("Let's Shop");
        await expect(this.welcomeHeader).toContainText('Rahul Shetty Academy');
    }

    async validLogin(username: string, password: string) {

        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
        await this.firstCard.nth(1).waitFor(); // This is one way to wait for elements to load after login
    }
}
