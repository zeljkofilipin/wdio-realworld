async function login(email, password) {
  await $('input[type="email"]').setValue(email);
  await $('input[type="password"]').setValue(password);
  await $('button*=Sign in').click();
}

describe('Login Page', function () {
  beforeEach(async function () {
    await browser.url('./login');
  })
  it('should let you log in', async function () {
    await login('demo@learnwebdriverio.com', 'wdiodemo');
    $('button*=Sign in').waitForExist({ reverse: true });
    await expect($('.error-messages li')).not.toBeExisting();
  } )
  it('should error with a missing username', async function () {
    await login('', 'wdiodemo');
    await expect($('.error-messages li')).toHaveText(`email can't be blank`);
  });
  it('should error with a missing password', async function () {
    await login('demo@learnwebdriverio.com', '');
    await expect($('.error-messages li')).toHaveText(`password can't be blank`);
});
}
)