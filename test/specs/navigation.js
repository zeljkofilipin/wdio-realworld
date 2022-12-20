describe('Homepage', function () {
  it('should load properly', async function () {
    // load the page
    await browser.url('./');

    // Get the title of the homepage, should be 'Conduit'
    console.log(await browser.getTitle());

    // Click the 'Sign in' navigation link
    await $('[href*=login]').click();

    // Get the URL of the sign in page. It should include 'login'
    console.log(await browser.getUrl());
  });
});
