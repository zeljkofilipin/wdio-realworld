'use strict';

const got = require( 'got' );

class Api {
	constructor( prefixUrl ) {
		this.client = got.extend( {
			prefixUrl,
			responseType: 'json'
		} );
	}

	async getAuthToken( { email, password } ) {
		try {
			const { body } = await this.client.post( 'users/login', {
				json: { user: { email, password } }
			} );

			return body.user.token;
		} catch ( err ) {
			console.log( err );
		}
	}
}

module.exports = Api;
