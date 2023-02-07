const Generic = require('./Generic.page');

class Editor extends Generic {
  constructor() {
    super('./editor')
  }

  get $title () { return $('[data-qa-id="editor-title"]'); }
  get $description () { return $('[data-qa-id="editor-description"]'); }
  get $body () { return $('[data-qa-id="editor-body"] textarea'); }
  get $tags () { return $('[data-qa-id="editor-tags"]'); }
  get $publish () { return $('[data-qa-id="editor-publish"]'); }
}
module.exports = Editor;