describe('Homepage', function () {
  it('should load properly', async function () {
    // load the page
    await browser.url('./');

    // Get the title of the homepage, should be 'Conduit'
    if (await browser.getTitle() !== 'Conduit') {
      // throw an error explaining what went wrong
      throw new Error('Title of the homepage should be "Conduit"');
    }

    // Click the 'Sign in' navigation link
    await $('[href*=login]').click();

    // Get the URL of the sign in page. It should include 'login'
    if (await browser.getUrl() !== 'http://localhost:8080/login') {
      throw new Error('URL of "login" page should be correct');
    }
  });
});
