const Auth = require('../pageObjects/Auth.page');
const Editor = require('../pageObjects/Editor.page');
const Article = require('../pageObjects/Article.page');
const { user1 } = require('../fixtures/users');

const auth = new Auth();
const editor = new Editor();
const article = new Article();

const Chance = require('chance');
const chance = new Chance();

describe('Post Editor', function () {
  before(async function () {
    await auth.load();
    await auth.login(user1);
  })
  beforeEach(async function () {
    await editor.load();
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
    await editor.submitArticle(articleDetails);

    await expect(article.$title).toHaveText(articleDetails.title);
    await expect(article.$body).toHaveText(articleDetails.body);

    await article.$delete.click();
  });
});