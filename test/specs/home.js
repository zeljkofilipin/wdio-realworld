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
	} );
	describe( 'Logged In', () => {
		before( async function () {
			// 1. Require our Api file
			const Api = require( '../../utils/Api' );

			// 2. Instantiate a new Api instance with the url of our Api
			const api = new Api( 'http://localhost:5000/api/' );

			// 3. Call the `getAuthToken` function
			const token = await api.getAuthToken( user1 );

			// 4. Load the page in an unauthorized state
			await home.load();

			// 5. Set the token
			await browser.execute( ( browserToken ) => {
				window.localStorage.setItem( 'id_token', browserToken );
			}, token );

			await home.load();
		} );
		after( async () => {
			await auth.clearSession();
		} );
		it( 'should show both feed tabs', async () => {
			expect( await home.feedTabsText ).toEqual( [ 'Your Feed', 'Global Feed' ] );
		} );
	} );
} );
