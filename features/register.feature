Feature: User Registration

  Scenario: Successful registration
    Given I am on the registration page
    When I register with valid and unique details
    Then I should be redirected to the confirm registration page
    And I enter the OTP sent to my email
    Then I should be redirected to the dashboard page

  Scenario: All fields are required
    Given I am on the registration page
    When I submit the registration form with missing fields
    Then I should see required field error messages

  Scenario: Email already exists validation
    Given I am on the registration page
    When I register with an already used email "aryalhari86@gmail.com"
    Then I should see "User already exists" error

  Scenario: Terms and conditions validation
    Given I am on the registration page
    When I submit the registration form without accepting terms
    Then I should see "Please accept the terms and conditions" error
