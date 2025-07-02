
function generateNepaliPhone() {
  return `+97798${Math.floor(10000000 + Math.random() * 9000000)}`;
}

function generateTestUser(overrides = {}) {
  return {
    firstName: 'Test',
    lastName: 'User',
    company: 'TestCo',
    password: 'Password123!',
    retypePassword: 'Password123!',
    tos: true,
    ...overrides
  };
}

module.exports = {
  generateNepaliPhone,
  generateTestUser,
  urls: {
    registration: 'https://dev.docs.ink/register',
    confirmRegistration: 'https://dev.docs.ink/confirm-registration',
    dashboard: 'https://dev.docs.ink/dashboard',
  },
};
