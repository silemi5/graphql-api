Feature: Create user

  Scenario: Create a new user
    Given I entered "example@example.com" as my email and "password1" as my password
    When I try to create a new user
    Then I should have given an ID, email, and name
    And email should match with what has given at the start
