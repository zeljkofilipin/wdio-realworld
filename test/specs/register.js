const Register = require('../pageObjects/Register.page');
const register = new Register();

describe('Register Page', function () {
  beforeEach(async function () {
    await browser.url('./register');
  })
  it('requires username', async function () {
    await register.register('', 'register10@learnwebdriverio.com', 'password');
    await expect(register.error).toHaveText(`username can't be blank`);
  } )
  it('requires email', async function () {
    await register.register('register11', '', 'password');
    await expect(register.error).toHaveText(`email can't be blank`);
  } )
  it('requires password', async function () {
    await register.register('register12', 'register12@learnwebdriverio.com', '');
    await expect(register.error).toHaveText(`email can't be blank`);
  } )
  it('requires unique username', async function () {
    await register.register('demo', 'register13@learnwebdriverio.com', 'password');
    await expect(register.error).toHaveText(`username is already taken.`);
  } )
  it('requires valid email', async function () {
    await register.register('register14', 'register14', 'password');
    await expect(register.error).toHaveText(`email is invalid`);
  } )
  it('requires unique email', async function () {
    await register.register('register15', 'demo@learnwebdriverio.com', 'password');
    await expect(register.error).toHaveText(`email is already taken.`);
  } )
  it('opens home page after registration', async function () {
    await register.register('register16', 'register16@learnwebdriverio.com', 'password');
    await expect(browser).toHaveUrl('https://demo.learnwebdriverio.com/')
  } )
}
)