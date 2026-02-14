"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POmanager = void 0;
var LoginPage_1 = require("./LoginPage");
var ProductPage_1 = require("./ProductPage");
var CartPage_1 = require("./CartPage");
var SubmitOrderPage_1 = require("./SubmitOrderPage");
var OrdersPage_1 = require("./OrdersPage");
var POmanager = /** @class */ (function () {
    function POmanager(page) {
        this.page = page;
        this.loginPage = new LoginPage_1.LoginPage(this.page);
        this.productPage = new ProductPage_1.ProductPage(this.page);
        this.cartPage = new CartPage_1.CartPage(this.page);
        this.submitOrderPage = new SubmitOrderPage_1.SubmitOrderPage(this.page);
        this.ordersPage = new OrdersPage_1.OrdersPage(this.page);
    }
    POmanager.prototype.getLoginPage = function () {
        return this.loginPage;
    };
    POmanager.prototype.getProductPage = function () {
        return this.productPage;
    };
    POmanager.prototype.getCartPage = function () {
        return this.cartPage;
    };
    POmanager.prototype.getSubmitOrderPage = function () {
        return this.submitOrderPage;
    };
    POmanager.prototype.getOrdersPage = function () {
        return this.ordersPage;
    };
    return POmanager;
}());
exports.POmanager = POmanager;
