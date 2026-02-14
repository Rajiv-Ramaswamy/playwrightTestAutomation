export class APIutils {

    apiContext: any;
    requestPayload: string;

    constructor(apiContext: any, requestPayload: string) {

        // In this APIutils.js file, the functions that perform API calls and bypass UI actions, are segregated. But since this is a different
        // file and the function call statements are in different file, there is import statement on the test file for this class file. Hence
        // object needs to be created for this class in that test file and the required parameters are passed. When object is created with
        // parameters, the duty of constructor of the class is to collect those parameters and initialize them. Here, the initialization is
        // nothing but making the parameters accessible across the class file. For this purpose, the 'this' keyword is used.

        // this.parameter = parameter

        this.apiContext = apiContext
        this.requestPayload = requestPayload
    }

    async getToken() {

        // The same this.apiContext has to be used across the class wherever the constructor argument is needed in the functions

        const loginApiResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data:this.requestPayload});

        const loginResponseBody = await loginApiResponse.json(); // Here, .json() is a playwright function
        let loginToken = loginResponseBody.token;
        console.log(loginToken);
        return loginToken;
    }

    async createOrder(orderPayload: string) {

        let response = {token: "string", orderId: "string"} // Creating a JavaScript object here
        response.token = await this.getToken() // The loginToken returned by .getToken() function is stored as a property to the JS object response
        const orderResponse = await this.apiContext.post(
                'https://rahulshettyacademy.com/api/ecom/order/create-order', {data: orderPayload, headers: {'Authorization' : response.token, 'Content-Type' :'application/json'}});
        
        const orderResponseJson = await orderResponse.json(); // Here .json() is a playwright function.
        let orderId = orderResponseJson.orders[0]; // Here we are traversing the response json to fetch the orderId
        response.orderId = orderId
        console.log(response);
        return response;
    }
}

// This is the most important step for any JavaScript class because without module.exports = { className }, the
// class cannot be imported by any other file within the framework.