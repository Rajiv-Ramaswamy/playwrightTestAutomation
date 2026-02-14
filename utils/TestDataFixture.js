const base =require('@playwright/test'); // Here we are importing @playwright/test because we are extending the capabilities of the test
// object. This doesn't need curly braces like { base } because we are keeping it as a variable only for now, as we are going to extend
// it.

exports.customTest = base.test.extend({

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
})