Feature: End to End validation for Rahul Shetty Academy Shopping website

@E2Etests
Scenario: Place an order and verify the order in order history page

    Given I login with valid credentials "rajivsoiraz894@gmail.com" and "Sashti@2412" on the webpage "https://rahulshettyacademy.com/client/#/auth/login"
    When I add a product "ZARA COAT 3" to the cart
    Then I verify the details of "ZARA COAT 3" in the cart page and checkout the order
    When I confirm details like "rajivsoiraz894@gmail.com", "ZARA COAT 3", apply coupon "rahulshetttyacademy", search sequentially "ind" and select "India" to submit order
    Then I should see the order details in the orders history page

@E2Etests
Scenario: Add an item to cart and verify it in cart page

    Given I login with valid credentials "rajivsoorav@gmail.com" and "Sashti@2412" on the webpage "https://rahulshettyacademy.com/client/#/auth/login"
    When I add a product "ADIDAS ORIGINAL" to the cart
    Then I verify the details of "ADIDAS ORIGINAL" in the cart page and checkout the order