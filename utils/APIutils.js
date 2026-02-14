class APIutils {

    // APIutils file Purpose: To segregate all the API calls that can be reused in the test files by importing this .js file

    constructor(apiContext, requestPayload) {

        // Every JavaScript class should mandatorily contain a constructor. This is useful to pass required arguments from the test file

        this.apiContext = apiContext
        this.requestPayload = requestPayload // Using this keyword to make the parameters accessible across the class file. class level.
    }

    async getToken() {

        const loginApiResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data:this.requestPayload});

        const loginResponseBody = await loginApiResponse.json(); // Here, .json() is a playwright function
        let loginToken = loginResponseBody.token; // Here simply traversing through the JavaScript object and fetching the property
        // called token
        console.log(loginToken);
        return loginToken;
    }

    async createOrder(orderPayload) {

        let response = {} // Creating a JavaScript object here
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

module.exports = { APIutils }; // export .js files that have a class: module.exports = { className } [or] export default className