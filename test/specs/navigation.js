const assert = require('assert');

describe('Homepage', function () {
  it('should load properly', async function () {
    // load the page
    await browser.url('./');

    // Get the title of the homepage, should be 'Conduit'
    assert.strictEqual(await browser.getTitle(), 'Conduit');

    // Click the 'Sign in' navigation link
    await $('[href*=login]').click();

    // Get the URL of the sign in page. It should include 'login'
    assert.strictEqual(await browser.getUrl(), 'http://localhost:8080/login');
  });
});
