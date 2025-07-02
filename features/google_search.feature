Feature: Google Search
  Scenario: Search for Playwright on Google
    Given I am on the Google search page
    When I search for "Playwright"
    Then I should see results related to "Playwright"
