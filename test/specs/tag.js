'use strict';

const { user1 } = require( '../fixtures/users' );
const Tag = require( '../pageObjects/Tag.page' );

describe( 'Tag Feed', function () {
	let articleDetails, tagName, tagPage, articleResponse;

	before( async function () {
		articleDetails = {
			title: global.chance.sentence( { words: 3 } ),
			description: global.chance.sentence( { words: 7 } ),
			body: global.chance.paragraph( { sentences: 2 } ),
			tagList: [ global.chance.word( { length: 30 } ) ]
		};

		tagName = articleDetails.tagList[ 0 ];

		// create the article we need to get the specific tag
		articleResponse = await global.api.createArticle( user1, articleDetails );

		tagPage = new Tag( tagName );

		// load the page
		await tagPage.load();
	} );

	after( async function () {
		await global.api.deleteArticle( user1, articleResponse.slug );
	} );

	it( 'should have tag tab', async function () {
		// check that we're on the tag tab
		expect( await tagPage.activeFeedTabText[ 0 ] ).toEqual( tagName, {
			trim: true
		} );
	} );

	it( 'should load only articles for that tag', async function () {
		await expect( tagPage.currentFeed.$$articles ).toBeElementsArrayOfSize( 1 );
	} );

	it( 'should load correct article preview details', async function () {
		const firstArticleDetails = await tagPage.currentFeed.articles[ 0 ].getDetails();
		expect( firstArticleDetails ).toMatchObject( {
			title: articleDetails.title,
			description: articleDetails.description
		} );
	} );
} );
