import { expect, type Locator, type Page } from '@playwright/test';

export class OrdersPage {

    page: Page;
    ordersBtn: Locator;
    ordersTable: Locator;
    orderRows: Locator;
    orderSummaryHeading: Locator;
    orderIdSummaryPage: Locator;

    constructor(page: Page) {

        this.page = page;
        this.ordersBtn = this.page.locator("button[routerlink='/dashboard/myorders']");
        this.ordersTable = this.page.locator('.table-bordered');
        this.orderRows = this.page.locator('tbody tr');
        this.orderSummaryHeading = this.page.locator('.email-title:visible');
        this.orderIdSummaryPage = this.page.locator('div .col-text');
    }

    async verifyOrder(orderId: string) {

        await this.ordersBtn.click();
    
        await this.ordersTable.waitFor();
    
        let rows: any;
        rows = this.orderRows;
        const rowCount = await rows.count();
        // Here, count() is playwright function and hence since an action is performed to count the number of matching elements to rows, the
        // await keyword is must here.
    
        let orderSummaryId: any;

        for (let i =0; i<rowCount;i++) {
    
            const fetchedOrderId = (await rows.nth(i).locator('th').textContent()).trim();
    
            if(fetchedOrderId === orderId) {
    
                await rows.nth(i).locator('td .btn-primary').click();
                await this.orderSummaryHeading.waitFor();
                orderSummaryId = await this.orderIdSummaryPage.textContent();
                expect((await orderSummaryId).trim()).toContain(orderId);
                break;
            }
    
        }
    }
}
