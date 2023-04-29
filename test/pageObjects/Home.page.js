'use strict';

const Feed = require( './components/Feed' );
const Generic = require( './Generic.page' );
const { getTrimmedText } = require( '../../utils/functions' );

class Home extends Generic {
	// set default URL to homepage, but allow for a custom URL to be passed in
	constructor( url = './' ) {
		super( url );
	}

	get $articleLoadingIndicator() {
		return $( '[data-qa-id="article-loading-indicator"]' );
	}

	get currentFeed() {
		return new Feed( '[data-qa-type="article-list"]' );
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
			async ( $tab ) => await $tab.getText() === tabText );
		await tabToClick.click();
		await browser.waitUntil(
			async () => {
				return ( await this.activeFeedTabText[ 0 ] ) === tabText;
			},
			{ timeoutMsg: 'Active tab text never switched to desired text' }
		);
		await this.currentFeed.waitForLoad();
	}

	async load() {
		await super.load();
		await this.currentFeed.waitForLoad();
	}
}

module.exports = Home;
