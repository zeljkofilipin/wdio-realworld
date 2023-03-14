'use strict';

module.exports = {
	getTrimmedText: ( $el ) => $el.getText().then( ( text ) => text.trim() )
};
