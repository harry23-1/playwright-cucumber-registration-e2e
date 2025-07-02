const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

const RegisterPage = require('../../pages/registerPage');
const assert = require('assert');
const { MailSlurp } = require('mailslurp-client');
const testData = require('../../testData');

setDefaultTimeout(30000);

let browser, page, registerPage;
let uniqueEmail = `test${Date.now()}@example.com`;
const mailslurp = new MailSlurp({ apiKey: "b58319714b31d0691f21c6362f2ed9544ba4089eec831b9208efb51f628f03eb" });

Given('I am on the registration page', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  registerPage = new RegisterPage(page);
  await registerPage.goto();
});

When('I submit the registration form with missing fields', async function () {
  await registerPage.submit();
});

Then('I should see required field error messages', async function () {
  const errors = await registerPage.getErrorMessages();
  assert(errors.some(e => e.includes('The first name field is required.')));
  assert(errors.some(e => e.includes('The last name field is required.')));
  assert(errors.some(e => e.includes('The email field is required.')));
  assert(errors.some(e => e.includes('The password field is required.')));
  assert(errors.some(e => e.includes('The retype password field is required.')));
  assert(errors.some(e => e.includes('The company name field is required.')));
});

When('I register with an already used email {string}', async function (usedEmail) {
  const phone = testData.generateNepaliPhone();
  await registerPage.fillForm(testData.generateTestUser({
    email: usedEmail,
    phone
  }));
  await registerPage.submit();
  const toastSelector = 'div.group-[.toast]';
  await page.waitForSelector(toastSelector, { timeout: 5000 });
  const toastText = await page.textContent(toastSelector);
  assert(toastText.includes('User already exists'));
});

Then('I should see {string} error', async function (msg) {
  const errors = await registerPage.getErrorMessages();
  assert(errors.some(e => e.includes(msg)));
});

When('I submit the registration form without accepting terms', async function () {
  const phone = testData.generateNepaliPhone();
  await registerPage.fillForm(testData.generateTestUser({
    email: uniqueEmail,
    phone,
    tos: false
  }));
  await registerPage.submit();
});

When('I register with valid and unique details', async function () {
  const inbox = await mailslurp.inboxController.createInboxWithDefaults();
  const email = inbox.emailAddress;

  await registerPage.fillForm(testData.generateTestUser({
    email,
    phone: testData.generateNepaliPhone(),
  }));
  const submittedAt = new Date();
  await registerPage.submit();

  await page.waitForURL(testData.urls.confirmRegistration, { timeout: 10000 });
  if (page.url() !== testData.urls.confirmRegistration) {
    throw new Error('Did not redirect to confirm-registration page');
  }

  const emailObj = await mailslurp.waitForLatestEmail(inbox.id, 30000, true, submittedAt.toISOString());
  console.log('Fetched OTP email subject:', emailObj.subject);
  console.log('Fetched OTP email body:', emailObj.body);
  const otpMatch = emailObj.body.match(/\b\d{6}\b/);
  const otp = otpMatch ? otpMatch[0] : null;
  if (!otp) throw new Error('OTP not found in email');
  console.log('Extracted OTP:', otp);

  await page.fill('#otp-input', otp);
  await page.click('button[type="submit"]:has-text("Confirm")');

  await page.waitForURL(testData.urls.dashboard, { timeout: 10000 });
  if (page.url() !== testData.urls.dashboard) {
    throw new Error('Did not redirect to dashboard after OTP');
  }
});

Then('I should be redirected to the confirm registration page', async function () {
  await page.waitForURL('https://dev.docs.ink/confirm-registration', { timeout: 10000 });
  assert.strictEqual(page.url(), 'https://dev.docs.ink/confirm-registration');
  await browser.close();
});
