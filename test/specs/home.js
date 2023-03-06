const Home = require('../pageObjects/Home.page');

const home = new Home();

describe('Homepage', function (){
  before(function () {
        home.load();
    });
  it('should load properly', async function () {
    await expect(home.$siteHeader).toBeExisting();
    await expect(home.$siteFooter).toBeExisting();
    await expect(home.$siteNav).toBeExisting();
  });
});