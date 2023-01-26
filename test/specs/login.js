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
  it('should error with a missing username', async function () {
    await $('input[type="password"]').setValue('wdiodemo');
    await $('button*=Sign in').click();
    await expect($('.error-messages li')).toHaveText(`email can't be blank`);
  });
  it('should error with a missing password', async function () {
    await $('input[type="email"]').setValue('demo@learnwebdriverio.com');
    await $('button*=Sign in').click();
    await expect($('.error-messages li')).toHaveText(`password can't be blank`);
});
}
)