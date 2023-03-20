'use strict';

const Home = require( '../pageObjects/Home.page' );
const Auth = require( '../pageObjects/Auth.page' );
const { user1 } = require( '../fixtures/users' );

const home = new Home();
const auth = new Auth();

describe( 'Homepage', () => {
	describe( 'Anonymous', () => {
		before( () => {
			home.load();
		} );
		it( 'should load properly', async () => {
			await expect( home.$siteHeader ).toBeExisting();
			await expect( home.$siteFooter ).toBeExisting();
			await expect( home.$siteNav ).toBeExisting();
		} );
		it( 'should only show the global feed tab', async () => {
			expect( await home.feedTabsText ).toEqual( [ 'Global Feed' ] );
		} );
		it( 'should default to showing the global feed', async function () {
			// get all tabs with an 'active' class, check only one returns with correct text
			expect( await home.activeFeedTabText ).toEqual( [ 'Global Feed' ] );
		} );
	} );
	describe( 'Logged In', () => {
		before( async function () {
			await auth.loginViaApi( user1 );
			await home.load();
		} );
		after( async () => {
			await auth.clearSession();
		} );
		it( 'should show both feed tabs', async () => {
			expect( await home.feedTabsText ).toEqual( [ 'Your Feed', 'Global Feed' ] );
		} );
		it( 'should let you switch between global and personal feeds', async function () {
			// click on 'Your feed' tab
			await home.clickTab( 'Your Feed' );
			// validate 'active' tabs are correct
			expect( await home.activeFeedTabText ).toEqual( [ 'Your Feed' ] );
			// click 'Global' tab
			await home.clickTab( 'Global Feed' );
			// validate again
			expect( await home.activeFeedTabText ).toEqual( [ 'Global Feed' ] );
		} );
		describe( 'Personal Feed', function () {
			before( async function () {
				// ensure we're on the personal feed tab
				if ( await home.activeFeedTabText[ 0 ] !== 'Your Feed' ) {
					await home.clickTab( 'Your Feed' );
				}
			} );
			it( 'should show most recent articles from people you follow', async function () {
				await expect( home.currentFeed.$$articles ).toBeElementsArrayOfSize( 1 );
			} );
		} );
	} );
} );
