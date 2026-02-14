import { LoginPage } from './LoginPage';
import { ProductPage } from './ProductPage';
import { CartPage } from './CartPage';
import { SubmitOrderPage } from './SubmitOrderPage';
import { OrdersPage } from './OrdersPage';
import { type Page } from '@playwright/test';

export class POmanager {

    page: Page;
    loginPage: LoginPage; // Here each object of the respective files have the class contents within them. Hence the type for these objects is
    // className itself
    productPage: ProductPage;
    cartPage: CartPage;
    submitOrderPage: SubmitOrderPage;
    ordersPage: OrdersPage;

    constructor(page: Page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.productPage = new ProductPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.submitOrderPage = new SubmitOrderPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
    }

    getLoginPage() {

        return this.loginPage;
    }

    getProductPage() {

        return this.productPage;
    }

    getCartPage() {

        return this.cartPage;
    }

    getSubmitOrderPage() {

        return this.submitOrderPage;
    }

    getOrdersPage() {

        return this.ordersPage;
    }
}
