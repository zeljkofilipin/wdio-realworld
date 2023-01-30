const Auth = require('../pageObjects/Auth.page');
const Editor = require('../pageObjects/Editor.page');

const auth = new Auth();
const editor = new Editor();

describe('Post Editor', function () {
  before(async function () {
    await browser.url('./login');
    await auth.login('demo@learnwebdriverio.com', 'wdiodemo');
  })
  this.beforeEach(async function () {
    await browser.url('./editor');
  })
  it('should load page properly', async function () {
    await expect(browser).toHaveUrl('editor', { containing: true });
    await expect(editor.$title).toBeExisting();
    await expect(editor.$description).toBeExisting();
    await expect(editor.$body).toBeExisting();
    await expect(editor.$tags).toBeExisting();
    await expect(editor.$publish).toBeExisting();
  });
});