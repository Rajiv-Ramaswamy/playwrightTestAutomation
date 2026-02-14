"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customTest = void 0;
var test_1 = require("@playwright/test");
exports.customTest = test_1.test.extend({
    // It's very important to use exports.fixtureName here, only then the testdata fixture created here will be available for all the files
    // across the framework to utilize it.
    cartCheckTestData: {
        // Here the cartCheckTestData is a property created for the customTest JavaScript object
        url: "https://rahulshettyacademy.com/client/#/auth/login",
        username: "rajivsoiraz894@gmail.com",
        password: "Sashti@2412",
        cardName: "ZARA COAT 3"
    },
    End_to_End_Testdata: {
        url: "https://rahulshettyacademy.com/client/#/auth/login",
        username: "rajivsoiraz894@gmail.com",
        password: "Sashti@2412",
        couponCode: "rahulshettyacademy",
        cardName: "ZARA COAT 3",
        country: "India",
        sequentialText: "ind"
    }
});
