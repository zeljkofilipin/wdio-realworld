'use strict';

const Generic = require( './Generic.page' );

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
		return this.$$feedTabs.map( ( $tab ) => $tab.getText() );
	}
	get activeFeedTabText() {
		return this.$feedsContainer.$$( '[data-qa-type="feed-tab"] .active' ).map( ( $tab ) => $tab.getText() );
	}
}

module.exports = Home;
