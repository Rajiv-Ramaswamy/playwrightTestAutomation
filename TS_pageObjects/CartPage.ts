import { expect, type Locator, type Page} from '@playwright/test';

export class CartPage{

    page: Page
    cartBtn: Locator
    myCartText: Locator
    continueShoppingBtn: Locator
    cartItemHeading: Locator
    cartCardPriceText: Locator
    checkoutBtn: Locator

    constructor(page: Page) {

        this.page = page;
        this.cartBtn = this.page.locator("li button[routerlink= '/dashboard/cart']");
        this.myCartText = this.page.getByText('My Cart');
        this.continueShoppingBtn = this.page.locator("button[routerlink='/dashboard']");
        this.cartItemHeading = this.page.locator('.cartSection h3');
        this.cartCardPriceText = this.page.locator('.prodTotal p');
        this.checkoutBtn = this.page.getByRole('button', {name: 'Checkout'});
    }

    async verifyCartAndCheckout(cardName: string, cardPrice: string) {

        await this.cartBtn.click();
        
        await this.continueShoppingBtn.waitFor();
        
        expect(await this.myCartText.textContent()).toContain("My Cart");
        
        expect(await this.cartItemHeading.textContent()).toContain(cardName);
        
        expect(await this.cartCardPriceText.textContent()).toContain(cardPrice);
        
        await this.checkoutBtn.click();
    }
}
