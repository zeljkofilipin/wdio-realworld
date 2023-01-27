const Register = require('../pageObjects/Register.page');
const register = new Register();

describe('Register Page', function () {
  beforeEach(async function () {
    await browser.url('./register');
  })
  it('requires username', async function () {
    await register.register('', 'register@learnwebdriverio.com', 'password');
    await expect(register.error).toHaveText(`username can't be blank`);
  } )
}
)