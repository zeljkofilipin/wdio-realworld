const Home = require('../pageObjects/Home.page');

const home = new Home();

describe('Homepage', function (){
  describe('Anonymous', function () {
    before(function () {
      home.load();
    });
    it('should load properly', async function () {
      await expect(home.$siteHeader).toBeExisting();
      await expect(home.$siteFooter).toBeExisting();
      await expect(home.$siteNav).toBeExisting();
    });
    it('should only show the global feed tab', async function () {
      expect(await home.feedTabsText).toEqual(['Global Feed']);
    })
  });
  describe('Logged In', function () {
    // we'll fill this out soon
  });
});