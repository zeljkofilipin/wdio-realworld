describe('Homepage', function () {
  it('should load properly', async function () {
    // load the page
    await browser.url('./');

    // Get the title of the homepage, should be 'Conduit'
    await expect(browser).toHaveTitle('Conduit');

    // Click the 'Sign in' navigation link
    await $('=Sign in').click();

    // Get the URL of the sign in page. It should include 'login'
    await expect(browser).toHaveUrl('/login', { containing: true });

    // Click the 'Conduit' logo
    await $('=conduit').click();

    // Get the URL of the sign in page. It should include 'login'
    await expect(browser).toHaveUrl('http://localhost:8080/');
  });
});
