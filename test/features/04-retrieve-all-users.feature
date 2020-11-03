Feature: Retrieve all users

  Scenario: Retrieve all users
    Given I already have an account with "example@example.com" as my email and "password1" as my password
    And I'm already logged in
    When I try to get all users
    Then I should get everyone's ID, email, and name
