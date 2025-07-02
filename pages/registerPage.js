class RegisterPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://dev.docs.ink/register';
    this.selectors = {
      firstName: 'input[name="first_name"]',
      lastName: 'input[name="last_name"]',
      email: 'input[name="email"]',
      phone: 'input[name="phoneNumber"]',
      password: 'input[name="password"]',
      retypePassword: 'input[name="confirmPassword"]',
      company: 'input[name="company_name"]',
      tos: '#checkbox-tos',
      registerBtn: 'button[type="submit"]',
      errorMsg: '.ant-form-item-explain-error, .text-destructive, .text-red-500'
    };
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async fillForm({ firstName, lastName, email, phone, password, retypePassword, company, tos }) {
    if (firstName !== undefined) await this.page.fill(this.selectors.firstName, firstName);
    if (lastName !== undefined) await this.page.fill(this.selectors.lastName, lastName);
    if (email !== undefined) await this.page.fill(this.selectors.email, email);
    if (phone !== undefined) await this.page.fill(this.selectors.phone, phone);
    if (password !== undefined) await this.page.fill(this.selectors.password, password);
    if (retypePassword !== undefined) await this.page.fill(this.selectors.retypePassword, retypePassword);
    if (company !== undefined) await this.page.fill(this.selectors.company, company);
    if (tos) await this.page.check(this.selectors.tos);
  }

  async submit() {
    await this.page.click(this.selectors.registerBtn);
  }

  async getErrorMessages() {
    return this.page.$$eval(this.selectors.errorMsg, nodes => nodes.map(n => n.textContent.trim()));
  }
}

module.exports = RegisterPage;
