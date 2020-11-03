Feature: Updates own information

  Scenario: Updates own information
    Given I already have an account with "example@example.com" as my email and "password1" as my password
    And I'm already logged-in
    When I try to update my name and or password to "new_name" and "new password" respectively
    Then I should get my updated name, along with ID and email
