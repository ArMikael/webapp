window.onload = function() {

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
		var target = e.currentTarget;
		activeTab = UTILS.qs('.active-tab');
		UTILS.removeClass(activeTab, 'active-tab');
		UTILS.addClass(target, 'active-tab');
	};

	for ( var i = 0; i < tab.length; i++ ) {
		UTILS.addEvent(tab[i], 'click', switchTab);
		UTILS.addEvent(tab[i], 'focus', switchTab);
	}

	var menus = UTILS.qsa('.action-list');
	var menuItems = UTILS.qsa('.action-list a');
	// Takes last item in each submenu to listen for blur event
	// when jumping to the next submenu
	var lastItem = UTILS.qsa('.action-list li:last-child a');

	/* Function open categories submenus on focus and highlighting currently
	 selected list items */
	var showMenu = function(e) {
		var target = e.target,
		parent = target.parentNode,
		activeParent;

		activeItem = UTILS.qs('.active-item');

		if ( activeItem !== null ) {
			UTILS.removeClass(activeItem, 'active-item');
		};

		UTILS.addClass(target, 'active-item');

		if ( UTILS.hasClass(parent.parentNode, 'active-menu') === false ) {
			UTILS.addClass(parent.parentNode, 'active-menu');
		}
	};

	/* Function closes categories */
	var closeMenu = function(e) {
		var target = e.target,
		parent = target.parentNode;
		UTILS.removeClass(parent.parentNode, 'active-menu');
	}

	for ( var i = 0; i < menuItems.length; i++ ) {
		UTILS.addEvent(menuItems[i], 'focus', showMenu);
	}

	for ( var i = 0; i < lastItem.length; i++ ) {
		UTILS.addEvent(lastItem[i], 'blur', closeMenu);
	}


	/**
	 * Reports section
	 */
	var reportsBtn = UTILS.qsa('.reports-btn'),
		buttons = UTILS.qsa(),
		// Finding "Select" element on the Quick Reports Tab
		sitesDropDown = UTILS.qs('#qs-sites-list'),
		selectedOpt = sitesDropDown.querySelector('option[selected="selected"]');


	// Check if the Reports window in current tab is displayed and show it if needed
	var openReports = function(e) {
		var reports;

		// Checks if the Event trigger is "Save" or "Cancel" button
		if (event.currentTarget.nodeName === 'BUTTON') {
			reports = event.currentTarget.parentNode;
			UTILS.toggle(reports, 'active-window');
			loadFrame(e);
		// If not, the trigger was "Reports" button
		} else {
			reports = event.currentTarget.parentNode.querySelector(".reports");
			UTILS.toggle(reports, 'active-window');
		}
	};

	var loadFrame = function (e) {
		var parent = e.currentTarget.parentNode,
			tabContent = parent.parentNode,
			// Finding iframe element in the current tab content
			iframe = tabContent.querySelector('iframe'),
			// Finding previously selected item
			prevSelect = selectedOpt;

		// Change iframe when user choose another option from the sites dropdown list
		if (e.type === 'change') {
			// Removes "selected" attribute from the previously selected item
			prevSelect.removeAttribute('selected');
			index = e.currentTarget.selectedIndex;
			newSelect = e.currentTarget.options[index];
			newSelect.setAttribute('selected', 'selected');
		}

		// Finding the newly selected option
		selectedOpt = tabContent.querySelector('option[selected="selected"]');
		// Changing iframe src to the choosed or currently added site
		iframe.setAttribute('src', selectedOpt.value);


	};

	// Function that checks what event triggered and if on keypress "Enter" was clicked
	var checkEvent = function(event) {
		if ( event.type === "click" ) {
			openReports(event);
		} else if ( event.type === "keypress" &&  event.keyCode === 13 ) {
			openReports(event);
		}
	};

	for ( var i = 0; i < reportsBtn.length; i++ ) {
		UTILS.addEvent(reportsBtn[i], 'click', checkEvent);
		UTILS.addEvent(reportsBtn[i], 'keypress', checkEvent);
	}

	// Cancel button that closing Reports window
	var cancelBtn = UTILS.qsa(".cancel-btn");

	for ( var i = 0; i < cancelBtn.length; i++ ) {
		UTILS.addEvent(cancelBtn[i], 'click', checkEvent);
		UTILS.addEvent(cancelBtn[i], 'keypress', checkEvent);
	}

	// Function for open in new tab button
	var newTabBtn = UTILS.qsa(".new-tab-btn");

	var openNewTab = function(event) {
		var iframe = event.currentTarget.parentNode.querySelector("iframe"),
		src = iframe.getAttribute('src'),
		newWindow;

		newWindow = window.open(src, '_blank');
		newWindow.focus();
	};

	var checkNewTabEvent = function (event) {
		if ( event.type === "click" ) {
			openNewTab(event);
		} else if ( event.type === "keypress" &&  event.keyCode === 13 ) {
			openNewTab(event);
		}
	};

	for ( var i = 0; i < newTabBtn.length; i++ ) {
		UTILS.addEvent(newTabBtn[i], 'click', checkNewTabEvent);
		UTILS.addEvent(newTabBtn[i], 'keypress', checkNewTabEvent);
	}



	/**
	 * Validating fields and saving new sites in reports window
	 */


	// Check if some of the inputs is not empty
	var checkFields = function (curForm, e) {

		var fields = curForm.querySelectorAll('.report-row'),
			firstInputName = UTILS.qs('#qr-name1').value,
			firstInputURL = UTILS.qs('#qr-url1').value,
			message = UTILS.qs('.system-message'),
			field,
			input,
			siteTitle,
			siteURL,
			validationAnswer,
			firstInputName,
			firstInputURL;

			// Checks if at least the first fieldset inputs is not empty
			if ( firstInputName === '' && firstInputURL === '') {
				console.log('Please, write site name and URL before saving.');
				message.innerHTML = 'Please, write site name and URL before saving.';
			}

		for (var i = 0; i < fields.length; i++) {
				field = fields[i];

				// Variables to check every input in the Report window
				siteTitle = field.querySelector('input[type="text"]').value;
				siteURL = field.querySelector('input[type="url"]').value;


				//	Checks all inputs in Reports window and return some message or func
				if (siteTitle !== '' || siteURL !== '') {

					if (siteTitle !== '' && siteURL === '') {
						console.log('Please, enter the site URL!');
						message.innerHTML = 'Please, enter the site URL!';
					} else if (siteTitle === '' && siteURL !== '') {
						console.log('Please, write the title for entered URL!');
						message.innerHTML = 'Please, write the title for entered URL!';
					} else if (siteTitle !== '' && siteURL !== '') {
						validationAnswer = validateField(siteURL);

						// Sends url for validation and
						// if it's valid add it to list of sites
						if (validationAnswer) {
							saveNewSite(siteTitle, siteURL, e, curForm);
						} else {
							console.log('Please, enter valid URL!');
							message.innerHTML = 'Please, enter valid URL!';
						}
					}
				}
		};
	};

	// Validating fields
	var validateField = function (url) {
		var regEx = /(http|https):\/\/?/;
		return regEx.test(url);
	};


	// Saving inputs from Reports Form to Object
	var qrForm = UTILS.qs("#qr-form");
	var mtfForm = UTILS.qs("#mtf-form");
	var saveBtns = UTILS.qsa('.submit_btn');


	var checkNewSite = function (e) {
		var parentForm = e.target.parentNode;
		e.preventDefault();
		checkFields(parentForm, e);
	};

	// Adding new site to the select element
	var saveNewSite = function (title, url, e, curForm) {
		var sitesList = curForm.parentNode.querySelector('select'),
			options = sitesList.querySelectorAll('option'),
			newOption;

			console.log(curForm);
			console.log(curForm.parentNode);
			console.log(options);

			for (var i = 0; i < options.length; i++) {
				if ( options[i].value === url ) {
					console.log('This site is already exists in the list.');
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

	for (var i = 0; i < saveBtns.length; i++) {
		UTILS.addEvent(saveBtns[i], 'click', checkNewSite);
	};

	// Listener that checks if anothor site was choosed by user in dropdown list.
	var selects = UTILS.qsa('select');

	for (var i = 0; i < selects.length; i++) {
		UTILS.addEvent(selects[i], 'change', loadFrame);
	};

};


