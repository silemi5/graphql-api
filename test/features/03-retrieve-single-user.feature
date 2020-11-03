Feature: Retrieve a single user

  Scenario: Retrieve a single user
    Given I already have an account with "example@example.com" as my email and "password1" as my password
    And I'm already logged-in with an account
    When I try to get a single user
    Then I should get its ID, email, and name
