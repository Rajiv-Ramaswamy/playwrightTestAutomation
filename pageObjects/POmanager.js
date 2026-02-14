const { LoginPage } = require('./LoginPage');
const { ProductPage } = require('./ProductPage');
const { CartPage } = require('./CartPage');
const { SubmitOrderPage } = require('./SubmitOrderPage');
const { OrdersPage } = require('./OrdersPage');

class POmanager {

    constructor(page) {

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

module.exports = { POmanager };