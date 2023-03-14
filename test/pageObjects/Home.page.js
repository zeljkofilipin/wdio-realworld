'use strict';

const Generic = require( './Generic.page' );
const { getTrimmedText } = require( '../../utils/functions' );

class Home extends Generic {
	constructor() {
		super( './' );
	}

	get $feedsContainer() {
		return $( '[data-qa-id="feed-tabs"]' );
	}
	get $$feedTabs() {
		return this.$feedsContainer.$$( '[data-qa-type="feed-tab"]' );
	}
	get feedTabsText() {
		return this.$$feedTabs.map( getTrimmedText );
	}
	get activeFeedTabText() {
		return this.$feedsContainer.$$( '[data-qa-type="feed-tab"] .active' ).map( getTrimmedText );
	}
}

module.exports = Home;
