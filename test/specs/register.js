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
  it('requires email', async function () {
    await register.register('register', '', 'password');
    await expect(register.error).toHaveText(`email can't be blank`);
  } )
  it('requires password', async function () {
    await register.register('register', 'register@learnwebdriverio.com', '');
    await expect(register.error).toHaveText(`email can't be blank`);
  } )
  it('requires unique username', async function () {
    await register.register('demo', 'register2@learnwebdriverio.com', 'password');
    await expect(register.error).toHaveText(`username is already taken.`);
  } )
  it('requires valid email', async function () {
    await register.register('register2', 'register2', 'password');
    await expect(register.error).toHaveText(`email is invalid`);
  } )
}
)