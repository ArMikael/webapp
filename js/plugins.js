/**
 * Utils Library
 */

var UTILS = (function () {

	return {

		/**
		 * AJAX helper function
		 * @param  {string} url     URL for the ajax request
		 * @param  {Object} options AJAX settings
		 */
		ajax: function ( url, options ) {
			var xhr = new XMLHttpRequest(),
				method = 'GET',
				isOptions = ( typeof options === 'object' );
				// method = ( options && options.method ) || 'GET';

			// Check if the "method" was supplied
			if ( isOptions && options.method ) {
				method = options.method;
			}

			// Setup the request
			xhr.open( method, url );

			xhr.onreadystatechange = function () {

				// If request finished
				if ( xhr.readyState === 4 ) {

					// If response is OK or fetched from cache
					if ( xhr.status === 200 || xhr.status === 304) {
						var res = xhr.responseText,
							contentType = xhr.getResponseHeader('Content-Type');

						// If server sent a content type header, handle formats
						if ( contentType ) {

							// Handle JSON format
							if ( contentType === 'application/json' ) {

								// JSON throws an exception on invalid JSON
								try {
									res = JSON.parse( res );
								} catch (err) {
									// Trigger fail callback if set
									if ( isOptions && options.fail ) {
										options.fail.call( xhr, err );
										return;
									}
								}

							// Handle XML format
							} else if ( contentType === 'application/xml' ) {
								// responseXML returns a document object
								res = xhr.responseXML;

								// If XML was invalid, trigger fail callback
								if ( res === null && isOptions && options.fail ) {
									options.fail.call( xhr, 'Bad XML file' );
									return;
								}
							}
						}

						// Trigger done callback  with the proper response
						if ( isOptions && options.done ) {
							options.done.call( xhr, res );

						}
					}
				}
			};

			// Fire the request
			xhr.send(null);
		}
 	};
}());
