"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitOrderPage = void 0;
var test_1 = require("@playwright/test");
var SubmitOrderPage = /** @class */ (function () {
    function SubmitOrderPage(page) {
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
    SubmitOrderPage.prototype.submitOrder = function (username, cardName, cardPrice, couponCode, sequentialText, country) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, countryList, countryCount, i, _e, orderId, fetcherOrderId, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _a = test_1.expect;
                        return [4 /*yield*/, this.cardHeadingSubmitPage.textContent()];
                    case 1:
                        _a.apply(void 0, [_h.sent()]).toContain(cardName);
                        _b = test_1.expect;
                        return [4 /*yield*/, this.cardPriceSubmitPage.textContent()];
                    case 2:
                        _b.apply(void 0, [_h.sent()]).toContain(cardPrice);
                        _c = test_1.expect;
                        return [4 /*yield*/, this.quantityInfo.textContent()];
                    case 3:
                        _c.apply(void 0, [_h.sent()]).toContain(' Quantity: 1 ');
                        return [4 /*yield*/, this.cvvCode.fill("123")];
                    case 4:
                        _h.sent();
                        return [4 /*yield*/, this.cardHolderName.fill("Rajiv Ramaswamy")];
                    case 5:
                        _h.sent();
                        return [4 /*yield*/, this.couponCodeInput.fill(couponCode)];
                    case 6:
                        _h.sent();
                        return [4 /*yield*/, this.couponSubmit.click()];
                    case 7:
                        _h.sent();
                        return [4 /*yield*/, (0, test_1.expect)(this.couponAppliedMsg).toBeVisible()];
                    case 8:
                        _h.sent();
                        _d = test_1.expect;
                        return [4 /*yield*/, this.usernameSubmitPage.inputValue()];
                    case 9:
                        _d.apply(void 0, [_h.sent()]).toContain(username);
                        return [4 /*yield*/, this.countryDropdown.pressSequentially(sequentialText)];
                    case 10:
                        _h.sent(); // To input key by key
                        return [4 /*yield*/, this.countrySuggestions.nth(0).waitFor()];
                    case 11:
                        _h.sent();
                        countryList = this.countrySuggestions;
                        console.log(countryList);
                        return [4 /*yield*/, countryList.count()];
                    case 12:
                        countryCount = _h.sent();
                        console.log("Total Results: ", countryCount);
                        i = 0;
                        _h.label = 13;
                    case 13:
                        if (!(i < countryCount)) return [3 /*break*/, 17];
                        return [4 /*yield*/, countryList.nth(i).textContent()];
                    case 14:
                        if (!((_h.sent()).trim() === country)) return [3 /*break*/, 16];
                        return [4 /*yield*/, countryList.nth(i).click()];
                    case 15:
                        _h.sent();
                        return [3 /*break*/, 17];
                    case 16:
                        i++;
                        return [3 /*break*/, 13];
                    case 17: return [4 /*yield*/, this.placeOrderBtn.click()];
                    case 18:
                        _h.sent();
                        _e = test_1.expect;
                        return [4 /*yield*/, this.thanksTextOrder.textContent()];
                    case 19:
                        _e.apply(void 0, [_h.sent()]).toContain('Thankyou for the order.');
                        return [4 /*yield*/, this.fetchOrderId.textContent()];
                    case 20:
                        fetcherOrderId = _h.sent();
                        return [4 /*yield*/, fetcherOrderId];
                    case 21:
                        orderId = (_h.sent()).replaceAll('|', '').trim();
                        console.log('The given order ID is: ', orderId);
                        // .trim, .replace functions are not immediate functions after .textContent(), these functions can be called by enclosing entire expression
                        // within a parenthesis.
                        _f = test_1.expect;
                        return [4 /*yield*/, this.productDetails.first().textContent()];
                    case 22:
                        // .trim, .replace functions are not immediate functions after .textContent(), these functions can be called by enclosing entire expression
                        // within a parenthesis.
                        _f.apply(void 0, [_h.sent()]).toContain(cardName);
                        _g = test_1.expect;
                        return [4 /*yield*/, this.productDetails.last().textContent()];
                    case 23:
                        _g.apply(void 0, [_h.sent()]).toContain(cardPrice);
                        return [2 /*return*/, orderId];
                }
            });
        });
    };
    return SubmitOrderPage;
}());
exports.SubmitOrderPage = SubmitOrderPage;
