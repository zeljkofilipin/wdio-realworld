const Auth = require( '../pageObjects/Auth.page' );
const { user1 } = require( '../fixtures/users' );

const auth = new Auth();

describe( 'Login Page', () => {
	it( 'should let you log in', async () => {
		await auth.login( user1 );
		await expect( auth.$errorMessages ).not.toBeExisting();
	} );
	it( 'should error with a missing username', async () => {
		await auth.login( {
			email: '',
			password: user1.password
		} );
		await expect( auth.$errorMessages ).toHaveText( 'email can\'t be blank' );
	} );
	it( 'should error with a missing password', async () => {
		auth.login( {
			email: user1.email,
			password: ''
		} );
		await expect( auth.$errorMessages ).toHaveText( 'password can\'t be blank' );
	} );
} );
