describe('Login Page', function () {
  it('should let you log in', async function () {
    await browser.url('./login');
    await $('input[type="email"]').setValue('demo@learnwebdriverio.com');
    await $('input[type="password"]').setValue('wdiodemo');
    await $('button=Sign in').click();

    await $('a[href="/settings"]').waitForExist();
    await expect(browser.getUrl()).not.toContain('/login');
  } )
  // should error with a missing username
  // should error with a missing password
}
)