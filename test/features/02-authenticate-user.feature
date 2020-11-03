Feature: Authenticate user

  Scenario: Authenticate an user
    Given I already have an account with "example@example.com" as my email and "password1" as my password
    When I try to login using the abovementioned credentials
    Then I should receive a token, with my id, name, and email as the payload
