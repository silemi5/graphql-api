Feature: Retrieve a single user

  Scenario: Retrieve a single user
    Given I already have an account with "example@example.com" as my email and "password1" as my password
    And I'm already logged-in with this account
    When I try to get a single user
    Then I should get his/her ID, email, and name
