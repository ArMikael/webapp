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
				options = ( typeof options === 'object' ) ? options : {};

			// Check if the "method" was supplied
			if ( options && options.method ) {
				method = options.method;
			}

			// Setup the request
			xhr.open( method, url );

			xhr.onreadystatechange = function () {
				var status;

				// If request finished
				if ( xhr.readyState === 4 ) {
					status = xhr.status;

					// If response is OK or fetched from cache
					if (( status >= 200 && status < 300 ) || status === 304) {
						var res = xhr.responseText,
							contentType = xhr.getResponseHeader('Content-Type'),
							failed = false;

						// If server sent a content type header, handle formats
						if ( contentType ) {

							// Handle JSON format
							if ( contentType === 'application/json' ) {

								// JSON throws an exception on invalid JSON
								try {
									res = JSON.parse( res );
								} catch (err) {
									// Trigger fail callback if set
									if ( options && options.fail ) {
										options.fail.call( xhr, err );
										return;
									}
								}

							// Handle XML format
							} else if ( contentType === 'application/xml' ) {
								// responseXML returns a document object
								res = xhr.responseXML;

								// If XML was invalid, trigger fail callback
								if ( res === null && options && options.fail ) {
									options.fail.call( xhr, 'Bad XML file' );
									return;
								}
							}
						}

						// Trigger done callback  with the proper response
						if ( options && options.done ) {
							options.done.call( xhr, res );
						}
					}
				}

				// Fire the request
				xhr.send(null);
			};
		}
 	};
}());
