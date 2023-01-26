class Auth {
  get $email () { return $('input[type="email"]'); }
  get $password () { return $('input[type="password"]'); }
  get $signIn () { return $('button*=Sign in'); }
  get $errorMessages () { return $('.error-messages li'); }

  async login(email, password) {
    await this.$email.setValue(email);
    await this.$password.setValue(password);
    await this.$signIn.click();
  }
}

const auth = new Auth();

describe('Login Page', function () {
  beforeEach(async function () {
    await browser.url('./login');
  })
  it('should let you log in', async function () {
    await auth.login('demo@learnwebdriverio.com', 'wdiodemo');
    await auth.$signIn.waitForExist({ reverse: true });
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