'use strict';

const Component = require( './Component' );
class ArticlePreview extends Component {
	get $author() { return this.$origin.$( '[data-qa-type="author-name"]' ); }
	get $date() { return this.$origin.$( '[data-qa-type="article-date"]' ); }
	get $title() { return this.$origin.$( '[data-qa-type="preview-title"]' ); }
	get $description() {
		return this.$origin.$( '[data-qa-type="preview-description"]' );
	}
	get $readMoreLink() { return this.$origin.$( '[data-qa-type="preview-link"]' ); }
	get $favorite() { return this.$origin.$( '[data-qa-type="article-favorite"]' ); }
	get $$tags() { return this.$origin.$$( '[data-qa-type="tag-list"] li' ); }
}
module.exports = ArticlePreview;
