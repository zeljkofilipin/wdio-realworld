class Generic {
  constructor(path) {
    this.path = path;
  }
  async load() {
    await browser.url(this.path);
  }

}

module.exports = Generic;