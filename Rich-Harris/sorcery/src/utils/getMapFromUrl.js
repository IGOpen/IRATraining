import path from 'path';
import sander from 'sander';
import atob from './atob';

/**
 * Turns a sourceMappingURL into a sourcemap
 * @param {string} url - the URL (i.e. sourceMappingURL=url). Can
   be a base64-encoded data URI
 * @param {string} base - the URL against which relative URLS
   should be resolved
 * @param {boolean} sync - if `true`, return a promise, otherwise
   return the sourcemap
 * @returns {object} - a version 3 sourcemap
 */
export default function getMapFromUrl ( url, base, sync ) {
	var json, map, match;

	if ( /^data/.test( url ) ) {
		match = /base64,(.+)$/.exec( url );

		if ( !match ) {
			throw new Error( 'sourceMappingURL is not base64-encoded' );
		}

		json = atob( match[1] );
		map = JSON.parse( json );
		return sync ? map : sander.Promise.resolve( map );
	}

	url = path.resolve( path.dirname( base ), url );

	if ( sync ) {
		return JSON.parse( sander.readFileSync( url ).toString() );
	} else {
		return sander.readFile( url ).then( String ).then( JSON.parse );
	}
}