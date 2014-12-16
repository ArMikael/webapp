 // Fixing issue with IE8 console.log support and error message
// if (!window.console) {
// 	console = {log: function() {}};
// }

(function ($) {
	'use strict';

	$.ready = function() {

		/* UTILS API  Section */
		// UTILS.ajax('data/notification.txt', {
		// done: function(response) {
		// 		//console.log(response);
		// 		var text = document.createTextNode(response);
		// 		var paragraph = document.createElement('p');
		// 		var notification = UTILS.qs('.notifications');
		// 		paragraph.appendChild(text);
		// 		notification.appendChild(paragraph);
		// 	},

		// fail: function(err) {
		// 	document.querySelector('#xhr');
		// 	}
		// });

	 	/** GLOBAL VARIABLES **/
		// Array for saving sites as JS Object
		var sitesCollector = [],
			$activeTab,
			savedReports;


		// Creating "Select" options
		var createOptions = function (sitesCollector) {

			for (var i = 0; i < sitesCollector.length; i++) {
				if (typeof(sitesCollector[i]) === 'object') {
					var $parentForm = $('#' + sitesCollector[i].formID),
						$select = $parentForm.parent().find('select'),
						$prevSelect = $select.find('option[selected="selected"]'),
						$iframe = $parentForm.parent().find('iframe');

					// Remove previosly selected item if exist
					if ($prevSelect !== null) {
						$prevSelect.removeAttr('selected');
					}

					$('<option>' + sitesCollector[i].siteName + '</option>')
						.attr({
							selected: 'select',
							value: sitesCollector[i].url
						})
						.appendTo($select);

					// Sending last site url to iframe for loading the web-site
					if (typeof (sitesCollector[i + 1]) !== 'object') {
						$iframe.attr('src', sitesCollector[i].url);
					}
				}
			}
		};


		/**
		 * Tabs Section
		 */
		var switchTab = function(e) {

			var target = e.currentTarget;
			$activeTab = $('.active-tab');
			$activeTab.removeClass('active-tab');
			// UTILS.addClass(target, 'active-tab');
			$(target).addClass('active-tab');


			// Saving the active tab to localStorage
			if (Modernizr.localstorage) {
				savedReports = localStorage.getItem('savedReports');

				// Checks if localStorage has "savedReports"
				if (savedReports !== null) {
					var parsedData = JSON.parse(savedReports),
						lastCell = parsedData[parsedData.length - 1],
						lastIndex = parsedData.length - 1;

					if (typeof(lastCell) === 'string') {
						// Removing old active tab
						parsedData.splice(lastIndex, 1, target.id);
					}

					localStorage.savedReports = JSON.stringify(parsedData);

				} else {
					var newArray = [target.id];
					localStorage.savedReports = JSON.stringify(newArray);
				}
			}
		};


		/* Function open categories submenus on focus and highlighting currently
		 selected list items */
		var showMenu = function(e) {
			var target = e.target,
				$activeItem = $('.active-item'),
				$parent = $(target).parent();

			if ($activeItem !== null) {
				$activeItem.removeClass('active-item');
			}

			$(target).addClass('active-item');

			if (!$parent.parent().hasClass('active-menu')) {
				$parent.parent().addClass('active-menu');
			}
		};

		/* Function closes categories */
		var closeMenu = function(e) {
			var target = e.target,
				$parent = $(target).parent(),
				$submenus = $('.action-list');

			$submenus.each(function() {
				 $(this).removeClass('active-menu');
			});

			if (e.type === 'focus') {
				$parent.parent().addClass('active-menu');
			}
		};


		/**
		 * Reports section
		 */

		// Check if the Reports window in current tab is displayed and show it if needed
		var openReports = function(e) {
			var $reports;

			// Checks if the Event trigger is not on "Open Reports" button
			if (!$(e.currentTarget).hasClass('app-button')) {
				$reports = $(e.currentTarget).parent();
				$reports.toggleClass('active-window');

				// If the clicked button is "Save" run loadFrame function,
				// otherwise do nothing (for ignoring "Cancel" button).
				if ($(e.currentTarget).hasClass('submit_btn')) {
					loadFrame(e);
				}

			// If not, the trigger was "Reports" button
			} else {
				$reports = $(e.currentTarget).parent().find('.reports');
				$reports.toggleClass('active-window');
			}
		};

		var loadFrame = function (e) {
			var $parent = $(e.currentTarget).parent(),
				$tabContent = $parent.parent(),
				// Finding iframe element in the current tab content
				$iframe = $tabContent.find('iframe'),
				// Finding previously selected item
				$prevSelect = $tabContent.find('option[selected="selected"]'),
				index,
				$newSelect,
				$selectedOpt;

			// Change iframe when user choose another option from the sites dropdown list
			if (e.type === 'change') {
				// Removes "selected" attribute from the previously selected item if exist
				if ($prevSelect !== null) {
					$prevSelect.removeAttr('selected');
				}

				index = e.currentTarget.selectedIndex;
				$newSelect = $(e.currentTarget).options[index];
				$newSelect.attr('selected', 'selected');
			}

			// Finding the newly selected option
			$selectedOpt = $tabContent.find('option[selected="selected"]');
			// Changing iframe src to the choosed or currently added site
			$iframe.attr('src', $selectedOpt[0].value);
		};

		// Function that checks what event triggered and if on keypress "Enter" was clicked
		var checkEvent = function(e) {
			e.preventDefault();

			if ( e.type === 'click' ) {
				openReports(e);
			} else if ( e.type === 'keypress' &&  e.keyCode === 13 ) {
				openReports(e);
			}
		};

		// Function for open in new tab button
		var openNewTab = function(e) {
			var $iframe = $(e.currentTarget).parent().find('iframe'),
			$src = $iframe.attr('src'),
			newWindow;

			newWindow = window.open($src, '_blank');
			newWindow.focus();
		};

		var checkNewTabEvent = function (e) {
			if ( e.type === 'click' ) {
				openNewTab(e);
			} else if ( e.type === 'keypress' &&  e.keyCode === 13 ) {
				openNewTab(e);
			}
		};


		var searchReport = function(e) {
			var target = e.target,
				//searchInput = target.childNodes[1].value,
				$searchInput = $(target).children().val(),
				$notification = $('.notifications'),
				$nameFields = $('.js-site-name'),
				sitesNames = [],
				// This rexExp ignores key-case and allows
				// to input report without last 1/2 letters
				regExRep = new RegExp('(' + $searchInput + '(([a-z]|\\d){1,2})?)', 'i'),
				match;

				console.log('SearchedInput: ' + $searchInput);

			e.preventDefault();


			$nameFields.each(function(index) {
		   		if($(this).val() !== '') {
					console.log('This val: ' + $(this).val());
					sitesNames.push($(this).val());
					console.log('index: ' + index);
					console.log('sitesNames: ' + sitesNames[0]);
				}
			});


			if (sitesNames.length === 0) {
				$notification.html('<p>' + 'The searched report "' + $searchInput +
				 '" is not found.' + '</p>');
			}

			for (var i = 0; i < sitesNames.length; i++) {
				match = sitesNames[i].match(regExRep);
				console.log('match: ' + match);

				if (match[0].toLowerCase() === sitesNames[i].toLowerCase()) {
					$notification.html('<p>' + 'Report "' + $searchInput +
					 '" is found.' + '</p>');

					// Finding the parent tab of input for activation
					var content = UTILS.qs('#' + sitesCollector[i].formID).parentNode,
						tab = content.parentNode,
						activeTab = UTILS.qs('.active-tab'),
						iframe = content.querySelector('iframe'),
						preSelect,
						newSelect;

					// Changing active tab
					UTILS.removeClass(activeTab, 'active-tab');
					UTILS.addClass(tab, 'active-tab');

					// Removing selection from previous item in the list
					preSelect = content.querySelector('option[selected="selected"]');
					preSelect.removeAttribute('selected');

					// Adding "selected" attribute to the searched report
					newSelect = content.querySelector('option[value="' +
					 sitesCollector[i].url + '"]');
					newSelect.setAttribute('selected', 'selected');

					// Changing iframe src to the searched one
					iframe.setAttribute('src', newSelect.value);

				} else {
					$notification.html('<p>' + 'The searched report "' +
					 $searchInput + '" is not found.' + '</p>');
				}
			}
		};


		/**
		 * Validating fields and saving new sites in reports window
		 */

		// Checks if some of the inputs is not empty
		var checkFields = function (parentForm, e) {

			var $fields = $(parentForm).find('.report-row'),
				$firstInputName = $fields.eq(0).find('.js-site-name'),
				$firstInputURL = $fields.eq(0).find('.js-site-url'),
				$message = $(parentForm).find('.system-message'),
				$wrongInputs = $('.wrong'),
				localSaver = localStorage.savedReports,
				i,
				$field,
				$siteTitle,
				$siteURL,
				validationAnswer;

			// Removing all elements from "sitesCollector" array
			sitesCollector = [];

			// Removing red border from all inputs before running again over them
			$wrongInputs.each(function(){
				$(this).removeClass('wrong');
			});

			// Removing previous system message
			$message.html('');

			// Checks if at least the first fieldset inputs is not empty
			if ($firstInputName.val() === '' && $firstInputURL.val() === '' &&
				// Checks if there is any saved reports in localStorage
				!localSaver || localSaver.length <= 8) {
				$message.html('Please, write site name and URL before saving.');

				$firstInputName.focus();
			} else if ($firstInputName.val() === '' && $firstInputURL.val() === '' &&
				localSaver.length > 8 ) {

				// Closing the "Report" window
				$(parentForm).toggleClass('active-window');

				// Removes all sites from 'Select' options list
				$(parentForm).prev().empty();

				// Cleaning localStorage
				localStorage.removeItem(savedReports);

				// Removing iframe
				$(parentForm).next().find('iframe').removeAttr('src');
			}

			// Checks every field in current tab "Report" form
			for (i = 0; i < $fields.length; i++) {
				$field = $fields.eq(i);

				// Variables to check every input value in the Report window
				$siteTitle = $field.find('.js-site-name');
				$siteURL = $field.find('.js-site-url');


				//	Checks all inputs in Reports window and return some message or func
				if ($siteTitle.val() !== '' || $siteURL.val() !== '') {

					// Adding "http" protocol to the entered url value without it
					if ($siteURL.val().substring(0, 4) !== 'http') {
						$siteURL.val('http://' + $siteURL.val());
					}

					if ($siteTitle.val() !== '' && $siteURL.val() === '') {
						$message.html('Please, enter the site URL!');
						$siteURL.addClass('wrong');
						$siteURL.focus();
					} else if ($siteTitle.value === '' && $siteURL.value !== '') {
						$message.html('Please, write the title for entered URL!');
						$siteTitle.addClass('wrong');
						$siteTitle.focus();
					} else if ($siteTitle.val() !== '' && $siteURL.val() !== '') {
						// Sends url for validation
						validationAnswer = validateField($siteURL.val());

						// If it's valid add it to list of sites
						if (validationAnswer) {
							saveNewSite($siteTitle.val(), $siteURL.val(), e, parentForm, $field);

						} else {
							$message.html('Please, enter valid URL!');
							$siteURL.addClass('wrong');
							$siteURL.focus();
						}
					}
				}
			}
		};

		// Validating fields
		var validateField = function (url) {
			var regEx = /http(s)?:\/\/w{0,3}.+\.\w{2,4}(.+)?/g;
			return regEx.test(url);
		};

		// Preventing default activity of form submition and running checkFields function
		var checkNewSite = function (e) {
			var parentForm = e.target.parentNode;

			e.preventDefault();

			checkFields(parentForm, e);
		};


		// Adding new site to the select element
		var saveNewSite = function (title, url, e, parentForm, field) {
			var sitesList = parentForm.parentNode.querySelector('select'),
				selectedOpt = sitesList.querySelector('option[selected="selected"]'),
				contentDiv = parentForm.parentNode,
				activeTab = contentDiv.parentNode.id,
				fieldID = field.id,
				site = {},
				newOption;

			// Removing all previously saved sites in the "Select" element
			sitesList.innerHTML = '';

			// Creating "site" object and pushing it to "sitesCollector" array
			site = {
				siteName: title,
				url: url,
				fieldID: fieldID,
				formID: parentForm.id
			};

			// Creating options in Select for each element in "sitesCollector" array
			createOptions(sitesCollector);

			// Adding the last element separate to give him "selected" attribute
			sitesCollector.push(site);

			// Adding active-tab at the end of array
			sitesCollector.push(activeTab);

			// Checking if browser allows to use localStorage and if yes adding
			// new reports to the localStorage
			if (Modernizr.localstorage) {
				// Sets the key "savedReports" and siteCollector array as a value
				localStorage.savedReports = JSON.stringify(sitesCollector);
			}

			// Creating new option in select element
			newOption = document.createElement('option');
			newOption.value = url;

			// Removing selection from previous item in the list
			if (selectedOpt) {
				selectedOpt.removeAttribute('selected');
			}

			// Adding "selected" attribute to the new list item
			newOption.setAttribute('selected', 'selected');

			newOption.innerHTML = title;
			sitesList.appendChild(newOption);

			// Call for checkEvent and then for toggle function that checks
			// if the Reports window was opened and close it.
			checkEvent(e);
		};


		// Closing Reports window on pressing "Escape"
		var escapeReports = function (e) {
			var target = e.target,
				parent = target.parentNode,
				reportsDiv = parent.parentNode;

			if (e.keyCode === 27) {
				UTILS.removeClass(reportsDiv, 'active-window');
			}
		};



		// Init function starts all event listeners on the page and restoring previously
		// saved data from local storage
		var init = function(e) {
			var i;

			// Checking saved key in localStorage
			savedReports = localStorage.getItem('savedReports');
			console.log('Init');
			console.log(savedReports);


			/** IE8 PLACEHOLDERS **/
			// Adding placeholders to Report's inputs for IE8 with Modernizer
			console.log('Modernizr.input.placeholder: ' + Modernizr.input.placeholder);

			// Arrays for IE8 placeholders
			var nameArr = UTILS.qsa('.js-site-name'),
				urlArr = UTILS.qsa('.js-site-url'),
				searchForm = UTILS.qs('#search'),
				search = UTILS.qs('#search > input');

			// Event listener for "Submit" click for search button
			UTILS.addEvent(searchForm, 'submit', searchReport);


			if (!Modernizr.input.placeholder) {

				var checkInput = function (e) {
					var target = e.target;

					// Checks if the current value is placeholder and only then removes it
					if (target.value === 'Site name' || target.value === 'Site URL' ||
						target.value === 'Search') {
						target.value = '';
					}
				};

				// Adding placeholder and event listener to the Search field in IE8
				search.value = 'Search';
				UTILS.addEvent(search, 'focus', checkInput);

				// Adding IE placeholders and event listeners to reports inputs
				for (i = 0; i < nameArr.length; i++) {
					nameArr[i].value = 'Site name';
					urlArr[i].value = 'Site URL';

					UTILS.addEvent(nameArr[i], 'focus', checkInput);
					UTILS.addEvent(urlArr[i], 'focus', checkInput);
				}
			 }


			// Checks if localStorage is supported and allowed by the browser
			if (Modernizr.localstorage) {
				savedReports = localStorage.getItem('savedReports');

				// Checks if localStorage has "savedReports"
				if (savedReports) {
					var parsedData = JSON.parse(savedReports),
						fieldsetID,
						fieldset,
						nameInput,
						urlInput;

					/** Restoring Reports fields from Local Storage **/
					for (i = 0; i < parsedData.length; i++) {

						// Checks if current cell is "site" object
						if (parsedData[i].fieldID) {
							fieldsetID = parsedData[i].fieldID;
							fieldset = UTILS.qs('#' + fieldsetID);
							nameInput = fieldset.querySelector('.js-site-name');
							urlInput = fieldset.querySelector('.js-site-url');

							// Adding site name and url to apropriate input fields
							urlInput.value = parsedData[i].url;
							nameInput.value = parsedData[i].siteName;
						}
					}

					/** Restoring active tab from Local Storage **/
					if (typeof(parsedData[parsedData.length - 1]) === 'string') {
						var $restoredTab;

						$activeTab = $('.active-tab');
						$activeTab.removeClass('active-tab');

						$restoredTab = $('#' + parsedData[parsedData.length - 1]);
						$restoredTab.addClass('active-tab');
					}

					// Creation options in "Select" dropdown
					var	sitesCollector = [];

					for (i = 0; i < parsedData.length; i++) {
						if (typeof parsedData[i] === 'object') {
							sitesCollector.push(parsedData[i]);
						}
					}

					// Adding options to SELECT elements from saved data
					createOptions(sitesCollector);
				}
			}


			/** NAVIGATION EVENT LISTENER **/

			// Event listeners for shifting between menu items
			var menuItems = UTILS.qsa('.action-list a');

			for (i = 0; i < menuItems.length; i++ ) {
				UTILS.addEvent(menuItems[i], 'focus', showMenu);
			}

			// Event listeneres for closing previous submenus
			// on focusing of first list items in every category
			var firstItem = UTILS.qsa('.action-list li:first-child a');

			for (i = 0; i < firstItem.length; i++) {
				UTILS.addEvent(firstItem[i], 'focus', closeMenu);
			}

			// Event listeners for closing last category submenu after leaving the last item
			var lastItem = UTILS.qs('.last-menu-item');

			UTILS.addEvent(lastItem, 'blur', closeMenu);


			/** TABS AND REPORTS EVENT LISTENER **/

			// Event Listeners for switching tab function
			var tabs = UTILS.qsa('.tab');

			for (i = 0; i < tabs.length; i++) {
				UTILS.addEvent(tabs[i], 'click focus', switchTab);
			}

			// Event lisnteres that calls to function to open report in new tab
			var newTabBtn = UTILS.qsa('.new-tab-btn');

			for (i = 0; i < newTabBtn.length; i++ ) {
				UTILS.addEvent(newTabBtn[i], 'click keypress', checkNewTabEvent);
			}

			// Event listeners for "Reports" app button for opening "Reports" section
			var reportsBtn = UTILS.qsa('.reports-btn');

			for (i = 0; i < reportsBtn.length; i++ ) {
				UTILS.addEvent(reportsBtn[i], 'click keypress', checkEvent);
			}

			// Event listeneres for "Cancel" button that closing Reports window
			var cancelBtn = UTILS.qsa('.cancel-btn');

			for (i = 0; i < cancelBtn.length; i++ ) {
				UTILS.addEvent(cancelBtn[i], 'click keypress', checkEvent);
			}

			// Listeners that chekcs "Submit" button click
			var saveBtns = UTILS.qsa('.submit_btn');

			for (i = 0; i < saveBtns.length; i++) {
				UTILS.addEvent(saveBtns[i], 'click', checkNewSite);
			}

			// Listener that checks if anothor site was choosed by user in dropdown list.
			var selects = UTILS.qsa('select');

			for (i = 0; i < selects.length; i++) {
				UTILS.addEvent(selects[i], 'change', loadFrame);
			}

			// Event listeners for escaping "Reports" on "Esc" button
			var inputs = UTILS.qsa('.reports input');

			for (i = 0; i < inputs.length; i++) {
				UTILS.addEvent(inputs[i], 'keyup', escapeReports);
			}
		};

		init();
	};
}(jQuery));

