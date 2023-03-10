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
		before( async () => {
			await auth.load();
			await auth.login( user1 );
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
