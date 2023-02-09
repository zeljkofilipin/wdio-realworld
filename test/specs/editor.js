const Auth = require('../pageObjects/Auth.page');
const Editor = require('../pageObjects/Editor.page');
const { user1 } = require('../fixtures/users');

const auth = new Auth();
const editor = new Editor();

const Chance = require('chance');
const chance = new Chance();

describe('Post Editor', function () {
  before(async function () {
    await auth.load();
    await auth.login(user1);
  })
  beforeEach(async function () {
    editor.load();
  })
  it.skip('should load page properly', async function () {
    await expect(browser).toHaveUrl(editor.url.href);
    await expect(editor.$title).toBeExisting();
    await expect(editor.$description).toBeExisting();
    await expect(editor.$body).toBeExisting();
    await expect(editor.$tags).toBeExisting();
    await expect(editor.$publish).toBeExisting();
  });
  it('should let you publish a new post', async function () {
    const articleDetails = {
      title: chance.sentence({ words: 3 }),
      description: chance.sentence({ words: 7 }),
      body: chance.paragraph({ sentences: 4 }),
      tags: [chance.word(), chance.word()]
    };
    editor.submitArticle(articleDetails);

    const slug = articleDetails.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
    await expect(browser).toHaveUrl(`articles/${slug}`, { containing: true });

    await $('button*=Delete Article').click()
  });
});