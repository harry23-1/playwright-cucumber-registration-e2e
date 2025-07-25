# playwright-cucumber-registration-e2e

End-to-end automation framework for user registration on https://dev.docs.ink using Playwright, Cucumber, and the Page Object Model (POM).

## Features
- Automated registration flow with OTP email verification
- Page Object Model for maintainable selectors and actions
- Cucumber BDD for readable, business-friendly scenarios
- Unique Nepali phone and email generation for each test
- Robust error and popup message assertions
- Centralized test data and reusable utilities

## Project Structure
```
├── features/
│   ├── register.feature         # Cucumber feature scenarios
│   └── step_definitions/       # Step definitions for scenarios
├── pages/
│   └── registerPage.js         # Page Object Model for registration
├── testData.js                 # Test data generators and URLs
├── README.md                   # Project documentation
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies and scripts
```

## Getting Started
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure MailSlurp API key:**
   - Set your MailSlurp API key in the step definitions file or use an environment variable.
3. **Run all tests:**
   ```sh
   npx cucumber-js
   ```
4. **Run a specific scenario:**
   ```sh
   npx cucumber-js features/register.feature --name "Successful registration"
   ```

## Customization
- Update selectors in `pages/registerPage.js` if the UI changes.
- Add or modify test data in `testData.js`.
- Add new scenarios in `features/register.feature`.

## Best Practices
- Use unique emails and phone numbers for each test run.
- Keep test data and URLs centralized for easy updates.
- Use the POM for all page interactions.

## License
MIT
