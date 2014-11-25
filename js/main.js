console.log('Im in main.js before onload');

window.onload = function() {
	console.log('Im in main.js');

	/* UTILS API  Section */
	// UTILS.ajax('data/notification.txt', {
	// done: function(response) {
	// 		//console.log(response);
	// 		var text = document.createTextNode(response);
	// 		var paragraph = document.createElement("p");
	// 		var notification = UTILS.qs('.notifications');
	// 		paragraph.appendChild(text);
	// 		notification.appendChild(paragraph);
	// 	},

	// fail: function(err) {
	// 	document.querySelector('#xhr');
	// 	}
	// });

	/**
	 * Tabs Section
	 */
	var tab = UTILS.qsa(".tab"),
		activeTab,
		switchTab;

	switchTab = function(e) {
		var target = (e.currentTarget) ? e.currentTarget : this;
		activeTab = UTILS.qs('.active-tab');
		UTILS.removeClass(activeTab, 'active-tab');
		UTILS.addClass(target, 'active-tab');
	};

	for (var i = 0; i < tab.length; i++) {
		UTILS.addEvent(tab[i], 'click', switchTab);
		UTILS.addEvent(tab[i], 'focus', switchTab);
	}

	var menus = UTILS.qsa('.action-list');
	var menuItems = UTILS.qsa('.action-list a');

	/* Function open categories submenus on focus and highlighting currently
	 selected list items */
	var showMenu = function(e) {
		var target = e.target || e.srcElement,
		parent = target.parentNode,
		activeParent;

		activeItem = UTILS.qs('.active-item');

		if (activeItem !== null) {
			UTILS.removeClass(activeItem, 'active-item');
		};

		UTILS.addClass(target, 'active-item');

		if (UTILS.hasClass(parent.parentNode, 'active-menu') === false ) {
			UTILS.addClass(parent.parentNode, 'active-menu');
		}
	};

	/* Function closes categories */
	var closeMenu = function(e) {
		var target = e.target || e.srcElement,
		parent = target.parentNode;
		UTILS.removeClass(parent.parentNode, 'active-menu');
	}

	for ( var i = 0; i < menuItems.length; i++ ) {
		UTILS.addEvent(menuItems[i], 'focus', showMenu);
	}

	// IE8 doesn't support CSS3 selectors, so we have to check if it's a modern browser
	// that supports CSS3 features
	console.log('Modernizr CSS3 support: ' + Modernizr.csstransforms);

	if (Modernizr.csstransforms) {
		// Takes last item in each submenu to listen for blur event
		// when jumping to the next submenu
		var lastItem = UTILS.qsa('.action-list li:last-child a');

		for ( var i = 0; i < lastItem.length; i++ ) {
			UTILS.addEvent(lastItem[i], 'blur', closeMenu);
		}	
	}


	/**
	 * Reports section
	 */

	var reportsBtn = UTILS.qsa('.reports-btn'),
		selectedOpt;

	// Check if the Reports window in current tab is displayed and show it if needed
	var openReports = function(e) {
		var reports,
			target = (e.currentTarget) ? e.currentTarget : this;

		// Checks if the Event trigger is not on "Open Reports" button
		if (!UTILS.hasClass(target, 'app-button')) {
			reports = target.parentNode;
			UTILS.toggle(reports, 'active-window');

			// If the clicked button is "Save" run loadFrame function,
			// otherwise do nothing (for ignoring "Cancel" button).
			if (UTILS.hasClass(target, 'submit_btn')) {
				loadFrame(e);
			}
		// If not, the trigger was "Reports" button
		} else {
			reports = target.parentNode.querySelector(".reports");
			UTILS.toggle(reports, 'active-window');
		}
	};

	var loadFrame = function (e) {
		var target = (e.currentTarget) ? e.currentTarget : this,
			parent = target.parentNode,
			tabContent = parent.parentNode,
			// Finding iframe element in the current tab content
			iframe = tabContent.querySelector('iframe'),
			// Finding previously selected item
			prevSelect = selectedOpt;

		// Change iframe when user choose another option from the sites dropdown list
		if (e.type === 'change') {
			// Removes "selected" attribute from the previously selected item
			prevSelect.removeAttribute('selected');
			index = target.selectedIndex;
			newSelect = target.options[index];
			newSelect.setAttribute('selected', 'selected');
		}

		// Finding the newly selected option
		selectedOpt = tabContent.querySelector('option[selected="selected"]');
		// Changing iframe src to the choosed or currently added site
		iframe.setAttribute('src', selectedOpt.value);


	};

	// Function that checks what event triggered and if on keypress "Enter" was clicked
	var checkEvent = function(e) {
		
		e.preventDefault = e.preventDefault || function () {
			e.returnValue = false;
		};

		if ( e.type === "click" ) {
			openReports(e);
		} else if ( e.type === "keypress" &&  e.keyCode === 13 ) {
			openReports(e);
		}
	};

	for ( var i = 0; i < reportsBtn.length; i++ ) {
		UTILS.addEvent(reportsBtn[i], 'click', checkEvent);
		UTILS.addEvent(reportsBtn[i], 'keypress', checkEvent);
	}

	// Cancel button that closing Reports window
	var cancelBtn = UTILS.qsa('.cancel-btn');

	for ( var i = 0; i < cancelBtn.length; i++ ) {
		UTILS.addEvent(cancelBtn[i], 'click', checkEvent);
		UTILS.addEvent(cancelBtn[i], 'keypress', checkEvent);
	}

	// Function for open in new tab button
	var newTabBtn = UTILS.qsa('.new-tab-btn');

	var openNewTab = function(e) {
		var target = (e.currentTarget) ? e.currentTarget : this,
		iframe = target.parentNode.querySelector('iframe'),
		src = iframe.getAttribute('src'),
		newWindow;

		newWindow = window.open(src, '_blank');
		newWindow.focus();
	};

	var checkNewTabEvent = function (e) {
		if ( e.type === 'click' ) {
			openNewTab(e);
		} else if ( e.type === "keypress" &&  e.keyCode === 13 ) {
			openNewTab(e);
		}
	};

	for ( var i = 0; i < newTabBtn.length; i++ ) {
		UTILS.addEvent(newTabBtn[i], 'click', checkNewTabEvent);
		UTILS.addEvent(newTabBtn[i], 'keypress', checkNewTabEvent);
	}


	// Adding placeholders to Report's inputs for IE8 with Modernizer
	console.log('Modernizr.input.placeholder: ' + Modernizr.input.placeholder);

	if (!Modernizr.input.placeholder) {

		var nameArr = UTILS.qsa('.js-site-name'),
			urlArr = UTILS.qsa('.js-site-url'),
			search = UTILS.qs('#search > input');

		var checkInput = function (e) {
			target = e.target || e.srcElement;

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
		for (var i = 0; i < nameArr.length; i++) {
			nameArr[i].value = 'Site name';
			urlArr[i].value = 'Site URL';

			UTILS.addEvent(nameArr[i], 'focus', checkInput);
			UTILS.addEvent(urlArr[i], 'focus', checkInput);
		};

	 };

	// Adding and removing sites to/from JS Object
	var sitesCollector = [],
		site = {};

	var addToCollector = function (siteTitle, siteURL, e) {

		site = {
			title: siteTitle,
			url: siteURL
		};

		if (sitesCollector.length === 0) {
			sitesCollector.push(site);
		};

		// console.log('Site ' + site.title + ' and URL: ' + site.url);
		console.log('sitesCollector[] Length: ' + sitesCollector.length);
		console.log('sitesCollector[0] URL: ' + sitesCollector[0].url);

		for (var i = 0; i < sitesCollector.length; i++) {
			console.log('sitesCollector[i].url: ' + sitesCollector[i].url);
			if (sitesCollector[i].url !== siteURL) {
				sitesCollector.push(site);
			}

			console.log('Number ' + i + ' Title: ' + sitesCollector[i].title + ' URL: ' + sitesCollector[i].url);
		}

		console.log('sitesCollector[] length after FOR: ' + sitesCollector.length);

		var stringArr = sitesCollector.toString();
		console.log(stringArr);
	};

	/**
	 * Validating fields and saving new sites in reports window
	 */

	// Checks if some of the inputs is not empty
	var checkFields = function (curForm, e) {

		var fields = curForm.querySelectorAll('.report-row'),
			firstInputName = fields[0].querySelector('.js-site-name'),
			firstInputURL = fields[0].querySelector('.js-site-url'),
			message = curForm.querySelector('.system-message'),
			wrongInputs = UTILS.qsa('.wrong'),
			field,
			siteTitle,
			siteURL,
			validationAnswer;

		// Removing red border from all inputs before running again over them
		for (var i = 0; i < wrongInputs.length; i++) {
			UTILS.removeClass(wrongInputs[i], 'wrong');
		};

		// Checks if at least the first fieldset inputs is not empty
		if (firstInputName.value === '' && firstInputURL.value === '') {
			message.innerHTML = 'Please, write site name and URL before saving.';
			UTILS.addClass(firstInputName, 'wrong');
			UTILS.addClass(firstInputURL, 'wrong');
			firstInputName.focus();
		}

		// Checks every field in current tab "Report" form
		for (var i = 0; i < fields.length; i++) {
			field = fields[i];

			// Variables to check every input value in the Report window
			siteTitle = field.querySelector('.js-site-name');
			siteURL = field.querySelector('.js-site-url');

			//	Checks all inputs in Reports window and return some message or func
			if (siteTitle.value !== '' || siteURL.value !== '') {

				// Adding "http" protocol to the entered url value without it
				if (siteURL.value.substring(0, 4) !== 'http') {
					siteURL.value = 'http://' + siteURL.value;
				}

				if (siteTitle.value !== '' && siteURL.value === '') {
					message.innerHTML = 'Please, enter the site URL!';
					UTILS.addClass(siteURL, 'wrong');
					siteURL.focus();
				} else if (siteTitle.value === '' && siteURL.value !== '') {
					message.innerHTML = 'Please, write the title for entered URL!';
					UTILS.addClass(siteTitle, 'wrong');
					siteTitle.focus();
				} else if (siteTitle.value !== '' && siteURL.value !== '') {
					validationAnswer = validateField(siteURL.value);

					// Sends url for validation and
					// if it's valid add it to list of sites
					if (validationAnswer) {
						saveNewSite(siteTitle.value, siteURL.value, e, curForm);
						addToCollector(siteTitle.value, siteURL.value, e);
					} else {
						message.innerHTML = 'Please, enter valid URL!';
						UTILS.addClass(siteURL, 'wrong');
						siteURL.focus();
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
		var target = e.target || e.srcElement,
			parentForm = target.parentNode;
		
		e.preventDefault = e.preventDefault || function () {
			e.returnValue = false;
		};

		checkFields(parentForm, e);
	};

	// Adding new site to the select element
	var saveNewSite = function (title, url, e, curForm) {
		var sitesList = curForm.parentNode.querySelector('select'),
			options = sitesList.querySelectorAll('option'),
			selectedOpt = sitesList.querySelector('option[selected="selected"]'),
			message = curForm.querySelector('.system-message'),
			newOption;

			// Checks if new URL provided by user is already exist
			for (var i = 0; i < options.length; i++) {
				if (options[i].value === url) {
					console.log('This site is already exists in the list.');
					message.innerHTML = 'This site is already exists in the list.';
					return false;
				}
			};

			newOption = document.createElement('option');
			newOption.value = url;

			// Removing selection from previous item in the list
			selectedOpt.removeAttribute('selected');
			// Adding "selected" attribute to the new list item
			newOption.setAttribute('selected', 'selected');

			newOption.innerHTML = title;
			sitesList.appendChild(newOption);

			// Call for checkEvent and then for toggle function that checks
			// if the Reports window was opened and close it.
			checkEvent(e);
	};

	var saveBtns = UTILS.qsa('.submit_btn');

	for (var i = 0; i < saveBtns.length; i++) {
		UTILS.addEvent(saveBtns[i], 'click', checkNewSite);
	};

	// Listener that checks if anothor site was choosed by user in dropdown list.
	var selects = UTILS.qsa('select');

	for (var i = 0; i < selects.length; i++) {
		UTILS.addEvent(selects[i], 'change', loadFrame);
	};

	// Closing Reports window on pressing "Escape"
	var reportsDivs = UTILS.qsa('.reports'),
		inputs = UTILS.qsa('.reports input');


	var escapeReports = function (e) {
		var target = e.target || e.srcElement,
			parent = target.parentNode,
			reportsDiv = parent.parentNode;

		if (e.keyCode === 27) {
			UTILS.removeClass(reportsDiv, 'active-window');
		}
	};

	for (var i = 0; i < inputs.length; i++) {
		UTILS.addEvent(inputs[i], 'keyup', escapeReports);
	}
};


