const Auth = require('../pageObjects/Auth.page');
const Editor = require('../pageObjects/Editor.page');
const { user1 } = require('../fixtures/users');

const auth = new Auth();
const editor = new Editor();

describe('Post Editor', function () {
  before(async function () {
    await auth.load();
    await auth.login(user1);
  })
  beforeEach(async function () {
    editor.load();
  })
  it('should load page properly', async function () {
    await expect(browser).toHaveUrl(editor.url.href);
    await expect(editor.$title).toBeExisting();
    await expect(editor.$description).toBeExisting();
    await expect(editor.$body).toBeExisting();
    await expect(editor.$tags).toBeExisting();
    await expect(editor.$publish).toBeExisting();
  });
  it.only('should let you publish a new post', async function () {
    await editor.$title.setValue('Test Title');
    await editor.$description.setValue('Test Description');
    await editor.$body.setValue('Test Body');
    await editor.$tags.setValue('Tag1');
    await editor.$tags.keys('Enter');
    await editor.$publish.click();

    await expect(browser).toHaveUrl('articles/test-title', { containing: true });

    await $('button*=Delete Article').click()
  });
});