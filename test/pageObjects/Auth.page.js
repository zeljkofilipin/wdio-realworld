'use strict';

const Api = require( '../../utils/Api' );
const Generic = require( './Generic.page' );

class Auth extends Generic {
	constructor() {
		super( './login' );
	}

	get $email() { return $( 'input[type="email"]' ); }

	get $password() { return $( 'input[type="password"]' ); }

	get $signIn() { return $( 'button*=Sign in' ); }

	get $errorMessages() { return $( '.error-messages li' ); }

	async clearSession() {
		await browser.execute( () => {
			window.localStorage.clear();
		} );
	}

	async login( { email, password } ) {
		await super.load( this.path );
		await this.$email.setValue( email );
		await this.$password.setValue( password );
		await this.$signIn.click();
		await browser.waitUntil(
			async () => {
				const signInExists = await this.$signIn.isExisting();
				const errorExists = await this.$errorMessages.isExisting();
				return !signInExists || errorExists;
			},
			{
				timoutMsg:
          'The "Sign in" button still exists and an error never appeared'
			}
		);
	}

	async loginViaApi( user ) {
		const api = new Api( 'http://localhost:3000/api/' );
		const token = await api.getAuthToken( user );

		// load the base page so we can set the token
		await browser.url( './' );

		// inject the auth token
		await browser.execute( ( browserToken ) => {
			window.localStorage.setItem( 'id_token', browserToken );
		}, token );
	}
}
module.exports = Auth;
