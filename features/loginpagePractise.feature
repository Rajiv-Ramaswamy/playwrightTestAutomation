Feature: Negative validation for Rahul Shetty Academy Login page practise website

@NegativeScenarios
Scenario Outline: Verify error message for logging in with wrong credentials

    Given I login with invalid credentials "<username>" and "<password>" on the webpage "<url>"
    Then I confirm error message for invalid login

    Examples:
    |   username                    |   password    |   url                                                     |
    |   rajivsoiraz894@gmail.com    |   Sashti@2412 |   https://www.rahulshettyacademy.com/loginpagePractise/   |
    |   hello123@gmail.com          |   hello@1234  |   https://www.rahulshettyacademy.com/loginpagePractise/   |