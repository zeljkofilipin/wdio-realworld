'use strict';

const Generic = require( './Generic.page' );
const { getTrimmedText } = require( '../../utils/functions' );

class Home extends Generic {
	constructor() {
		super( './' );
	}

	get $articleLoadingIndicator() {
		return $( '[data-qa-id="article-loading-indicator"]' );
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

	async clickTab( tabText ) {
		const tabToClick = await this.$$feedTabs.find(
			async ( $tab ) => await $tab.getText() === tabText
		);
		await tabToClick.click();
		await browser.waitUntil(
			async () => {
				return ( await this.activeFeedTabText[ 0 ] ) === tabText;
			},
			{ timeoutMsg: 'Active tab text never switched to desired text' }
		);
		await this.$articleLoadingIndicator.waitForExist( { reverse: true } );
	}
}

module.exports = Home;
