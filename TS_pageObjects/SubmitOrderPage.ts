import { expect, type Locator, type Page} from '@playwright/test';

export class SubmitOrderPage {

    page: Page;
    cardHeadingSubmitPage: Locator;
    cardPriceSubmitPage: Locator;
    quantityInfo: Locator;
    cvvCode: Locator;
    cardHolderName: Locator;
    couponCodeInput: Locator;
    couponSubmit: Locator;
    couponAppliedMsg: Locator;
    usernameSubmitPage: Locator;
    countryDropdown: Locator;
    countrySuggestions: Locator;
    placeOrderBtn: Locator;
    thanksTextOrder: Locator;
    fetchOrderId: Locator;
    productDetails: Locator;

    constructor(page: Page) {

        this.page = page;
        this.cardHeadingSubmitPage = this.page.locator('.item__details .item__title');
        this.cardPriceSubmitPage = this.page.locator('.item__details .item__price');
        this.quantityInfo = this.page.locator('.item__details .item__quantity');
        this.cvvCode = this.page.locator("//div[text() = 'CVV Code ']/parent::div/child::input[@type='text']");
        this.cardHolderName = this.page.locator("//div[text()='Name on Card ']/following-sibling::input[@type='text']");
        this.couponCodeInput = this.page.locator("input[name='coupon']");
        this.couponSubmit = this.page.locator("button[type='submit']");
        this.couponAppliedMsg = this.page.locator("p[class*='ng-star-inserted']");
        this.usernameSubmitPage = this.page.locator("input[class*='ng-untouched']");
        this.countryDropdown = this.page.getByPlaceholder("Select Country");
        this.countrySuggestions = this.page.locator('.list-group-item span');
        this.placeOrderBtn = this.page.locator('.action__submit');
        this.thanksTextOrder = this.page.locator('.hero-primary');
        this.fetchOrderId = this.page.locator('.em-spacer-1 .ng-star-inserted');
        this.productDetails = this.page.locator(".product-info-column div[style*='5px;']");
    }

    async submitOrder(username: string, cardName: string, cardPrice: string, couponCode: string, sequentialText: string, country:string) {

        expect(await this.cardHeadingSubmitPage.textContent()).toContain(cardName);
        
        expect(await this.cardPriceSubmitPage.textContent()).toContain(cardPrice);
        
        expect(await this.quantityInfo.textContent()).toContain(' Quantity: 1 ');
        
        await this.cvvCode.fill("123");
        
        await this.cardHolderName.fill("Rajiv Ramaswamy");
        
        await this.couponCodeInput.fill(couponCode);
        
        await this.couponSubmit.click();
        
        await expect(this.couponAppliedMsg).toBeVisible();
        
        expect(await this.usernameSubmitPage.inputValue()).toContain(username);
        
        await this.countryDropdown.pressSequentially(sequentialText); // To input key by key
        
        await this.countrySuggestions.nth(0).waitFor();
        
        let countryList: any;
        countryList = this.countrySuggestions;
        
        console.log(countryList);
        const countryCount = await countryList.count();
        
        console.log("Total Results: ", countryCount);
        
        for(let i=0; i<countryCount;i++) {
        
            if ((await countryList.nth(i).textContent()).trim() === country) {
        
                await countryList.nth(i).click();
                break;
            }
        }
        
        await this.placeOrderBtn.click();
        
        expect(await this.thanksTextOrder.textContent()).toContain('Thankyou for the order.');
        
        let orderId: any;
        let fetcherOrderId: any;
        fetcherOrderId = await this.fetchOrderId.textContent();
        orderId = (await fetcherOrderId).replaceAll('|', '').trim();
        
        console.log('The given order ID is: ', orderId);
        
        // .trim, .replace functions are not immediate functions after .textContent(), these functions can be called by enclosing entire expression
        // within a parenthesis.
        
        expect(await this.productDetails.first().textContent()).toContain(cardName);
        
        expect(await this.productDetails.last().textContent()).toContain(cardPrice);

        return orderId;
    }
}
