const Auth = require('../pageObjects/Auth.page');
const auth = new Auth();

describe('Login Page', function () {
  beforeEach(async function () {
    await browser.url('./login');
  })
  it('should let you log in', async function () {
    await auth.login('demo@learnwebdriverio.com', 'wdiodemo');
    await expect(auth.$errorMessages).not.toBeExisting();
  } )
  it('should error with a missing username', async function () {
    await auth.login('', 'wdiodemo');
    await expect(auth.$errorMessages).toHaveText(`email can't be blank`);
  });
  it('should error with a missing password', async function () {
    await auth.login('demo@learnwebdriverio.com', '');
    await expect(auth.$errorMessages).toHaveText(`password can't be blank`);
});
}
)