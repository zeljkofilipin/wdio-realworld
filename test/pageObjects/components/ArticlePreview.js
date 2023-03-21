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

	async getDetails() {
		// this is important, because `getText` will return an empty string if the
		// article preview is outside the browser's viewport
		await this.$origin.scrollIntoView( true );
		return {
			author: ( await this.$author.getText() ).trim(),
			date: ( await this.$date.getText() ).trim(),
			title: ( await this.$title.getText() ).trim(),
			description: ( await this.$description.getText() ).trim()
		};
	}
}
module.exports = ArticlePreview;
