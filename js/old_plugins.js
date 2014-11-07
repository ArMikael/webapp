/**
 * Utils library
 */

var UTILS = (function () {

	return {

		qs: function (selector) {
			return document.querySelector(selector);
		},

		qsa: function (selector) {
			return document.querySelectorAll(selector);
		},

		/**
		 * Check if a given value is a plain Object
		 *
		 * @param  {*}       o Any value to be checked
		 * @return {Boolean}   true if it's an Object
		 */
		isObject: function (o) {
			var toString = Object.prototype.toString;
			return (toString.call(o) === toString.call({}));
		},

		addEvent: function (elem, type, handler) {
			if ( window.addEventListener ) {
				elem.addEventListener(type, handler, false);
			} else if ( window.attachEvent ) {
				// elem.attachEvent("on" + type, handler);
				// Shifty IE event handling
				elem.attachEvent("on" + type, function (e){
					// Lets add missing properties to the event object
					e.target = e.target || e.srcElement;
					e.currentTarget = elem;

					e.stopPropagation = e.stopPropagation || function () {
						e.cancelBubble = true;
					};

					e.preventDefault = e.preventDefault || function () {
						e.returnValue = false;
					};

					// Lets call the event handler, with the improved event object
					// Same as the modern browsers
					// Need to 'call' to set 'this' context to be 'elem', as it should be
					handler.call(elem, e);
				});
			}
		},

		/**
		 * AJAX helper function (similar to jQuery, but far from it!)
		 *
		 * @param {string} url     URL for the ajax request
		 * @param {Object} options AJAX settings
		 */
		ajax: function (url, options) {
			var xhr = new XMLHttpRequest(),
				method = 'GET',
				options = UTILS.isObject(options) ? options : {};

			// Check if "method" was supplied
			if (options.method) {
				method = options.method;
			}

			// Setup the request
			xhr.open(method.toUpperCase(), url);

			xhr.onreadystatechange = function () {
				var status;

				// If request finished
				if (xhr.readyState === 4) {
					status = xhr.status;

					// If response is OK or fetched from cache
					if ((status >= 200 && status < 300) || status === 304) {
						var res = xhr.responseText,
							contentType = xhr.getResponseHeader('Content-Type');

						// If server sent a content type header, handle formats
						if (contentType) {
							// Handle JSON format
							if (contentType === 'text/json' ||
								contentType === 'application/json') {

								// JSON throws an exception on invalid JSON
								try {
									res = JSON.parse(res);
								} catch (err) {
									// Trigger "fail" callback if set
									if (options.fail) {
										options.fail.call(xhr, err);
										return;
									}
								}
							// Handle XML format
							} else if (contentType === 'text/xml' ||
								contentType === 'application/xml') {
								// responseXML returns a document object
								res = xhr.responseXML;

								// if XML was invalid, trigger fail callback
								if (res === null && options.fail) {
									options.fail.call(xhr, 'Bad XML file');
									return;
								}
							}
						}

						// Trigger done callback with the proper response
						if (options.done) {
							options.done.call(xhr, res);
						}
					}

				}
			};

			// Fire the request
			xhr.send(null);
		}
	};
}());
