import { type Locator, type Page } from '@playwright/test';

export class ProductPage {

    page: Page;
    cards: Locator;

    constructor(page: Page) {

        this.page = page;
        this.cards = this.page.locator('.card-body');
    }

    async addItemToCart(cardName: string) {

        let cardPrice;
        
        // await this.page.waitForLoadState('networkidle'); // Here await keyword is valid but should not be used for page.waitForEvent()
        
        const cardCount = await this.cards.count();
        
        // In JavaScript, let is the keyword used for variable declaration within a block scope. If it is a constant, we use const.
        
        // JavaScript assumes variable datatype based on the value assigned. Hence no need to explicitly mention int or String or any datatype.
        for (let i = 0; i < cardCount; i++) {
        
            const elementText = await this.cards.nth(i).locator("h5[style*='text-transform:'] b").textContent();
            console.log(elementText);
            if (elementText === cardName) {
        
                cardPrice = await this.cards.nth(i).locator("div[class*='d-flex'] div").textContent();
                await this.cards.nth(i).locator("button[style*='float:']").click();
                break;
            }
        }

        return cardPrice;
    }
}
