const { URL } = require('url');

class Generic {
  constructor(path) {
    this.path = path;

    // store the url by combining specific page path with WDIO base url
    // using the NodeJS URL utility
    this.url = new URL(path, browser.config.baseUrl);
  }
  async load() {
    await browser.url(this.path);
  }

}

module.exports = Generic;