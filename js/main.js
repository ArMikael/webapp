window.onload = function() {

	/* UTILS API  Section */
	UTILS.ajax('data/notification.txt', {
	done: function(response) {
			//console.log(response);
			var text = document.createTextNode(response);
			var paragraph = document.createElement("p");
			var notification = UTILS.qs('.notifications');
			paragraph.appendChild(text);
			notification.appendChild(paragraph);
		},

	fail: function(err) {
		document.querySelector('#xhr');
		}
	});

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

	var menuItems = UTILS.qsa('.action-list a');
	var lastItem = UTILS.qsa('.action-list li:last-child a');
	var menus = UTILS.qsa('.action-list');

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
	var reportsBtn = UTILS.qsa(".reports-btn");

	// Check if the Reports window in current tab is displayed and show it if needed
	var openReports = function(event) {
		var reports = event.currentTarget.parentNode.querySelector(".reports");
		UTILS.toggle(reports, 'active-window');
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

	// Cancel button that closing Reports window
	var cancelBtn = UTILS.qsa(".cancel-btn");

	var closeReports = function (event) {
		var reports = event.currentTarget.parentNode;
		reports.style.display = "none";
	};

	for ( var i = 0; i < cancelBtn.length; i++ ) {
		UTILS.addEvent(cancelBtn[i], 'click', closeReports);
		UTILS.addEvent(cancelBtn[i], 'keypress', closeReports);
	}

	// Saving inputs from Reports Form to Object
	var qrSaveBtn = UTILS.qs("#qr-form");
	var mtfSaveBtn = UTILS.qs("#mtf-form");

	var saveNewSite = function (e) {
		console.log(e.target);
		console.log(e.currentTarget);
	};

	// UTILS.addEvent(qrSaveBtn, 'submit', saveNewSite);
	// UTILS.addEvent(mtfSaveBtn, 'submit', saveNewSite);

	UTILS.addEvent(qrSaveBtn, 'click', saveNewSite);

};


