'use strict';

const Auth = require( '../pageObjects/Auth.page' );
const Editor = require( '../pageObjects/Editor.page' );
const Article = require( '../pageObjects/Article.page' );
const { user1 } = require( '../fixtures/users' );

const auth = new Auth();
const editor = new Editor();
const article = new Article();

describe( 'Post Editor', () => {
	before( async () => {
		await auth.load();
		await auth.login( user1 );
	} );
	beforeEach( async () => {
		await editor.load();
	} );
	it.skip( 'should load page properly', async () => {
		await expect( browser ).toHaveUrl( editor.url.href );
		await expect( editor.$title ).toBeExisting();
		await expect( editor.$description ).toBeExisting();
		await expect( editor.$body ).toBeExisting();
		await expect( editor.$tags ).toBeExisting();
		await expect( editor.$publish ).toBeExisting();
	} );
	it( 'should let you publish a new post', async () => {
		const articleDetails = {
			title: global.chance.sentence( { words: 3 } ),
			description: global.chance.sentence( { words: 7 } ),
			body: global.chance.paragraph( { sentences: 4 } ),
			tags: [ global.chance.word(), global.chance.word() ]
		};
		await editor.submitArticle( articleDetails );

		await expect( article.$title ).toHaveText( articleDetails.title );
		await expect( article.$body ).toHaveText( articleDetails.body );
		expect( await article.tags ).toEqual( articleDetails.tags );

		await article.$delete.click();
	} );
	describe( '"Unsaved Changes" alerts', () => {
		beforeEach( async () => {
			await editor.$title.setValue( 'Unsaved Change' );
		} );
		it( 'should alert you when using browser navigation', async () => {
			await browser.refresh();
			await expect( browser.acceptAlert() ).resolves.not.toThrow();
		} );
		it( 'should warn you when trying to change URL', async () => {
			await $( '=Home' ).click();
			const alertText = await browser.getAlertText();
			await expect( alertText ).toEqual(
				'Do you really want to leave? You have unsaved changes!'
			);
			await browser.acceptAlert();
		} );
	} );
} );
