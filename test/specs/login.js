describe('Login Page', function () {
  beforeEach(async function () {
    await browser.url('./login');
  })
  it('should let you log in', async function () {
    await $('input[type="email"]').setValue('demo@learnwebdriverio.com');
    await $('input[type="password"]').setValue('wdiodemo');

    const $signIn = $('button*=Sign in');
    await $signIn.click();
    await $signIn.waitForExist({ reverse: true });

    await expect($('.error-messages li')).not.toBeExisting();
  } )
  // should error with a missing username
  // should error with a missing password
}
)