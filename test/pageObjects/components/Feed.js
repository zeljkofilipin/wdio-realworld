'use strict';

const Component = require( './Component' );
const ArticlePreview = require( './ArticlePreview' );

class Feed extends Component {
	get $$articles() {
		return this.$origin.$$( '[data-qa-type="article-preview"]' );
	}
	get articles() {
		return this.$$articles.map( ( $article ) => new ArticlePreview( $article ) );
	}
	get $articleLoadingIndicator() {
		return this.$origin.$( '[data-qa-id="article-loading-indicator"]' );
	}
	async waitForLoad() {
		await this.$articleLoadingIndicator.waitForExist( { reverse: true } );
	}
}

module.exports = Feed;
