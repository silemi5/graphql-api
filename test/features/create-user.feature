Feature: Create user

  Scenario: Create a new user
    Given I entered "example@example.com" as my email and "password1" as my password
    When we try to create a new user
    Then we should receive
      | id          | name | email               |
      | <Object ID> | null | example@example.com |
