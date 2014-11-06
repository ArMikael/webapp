window.onload = function() {

	/* UTILS API  Section */
	UTILS.ajax('data/notification.txt', {
	done: function(response) {
			//console.log(response);
			var text = document.createTextNode(response);
			var paragraph = document.createElement("p");
			var notification = document.querySelector('.notifications');
			paragraph.appendChild(text);
			notification.appendChild(paragraph);
		},

	fail: function(err) {
		document.querySelector('#xhr');
		}
	});


	/* JS Tabs Section */
	var tab = document.querySelectorAll(".tab"),
		activeTab,
		switchTab;

	switchTab = function(e) {
		var target = e.currentTarget;
		activeTab = document.querySelector("a[data-tab]");
		activeTab.removeAttribute('data-tab');
		target.setAttribute('data-tab', 'active-tab');
		activeTab.querySelector('.content').style.display = "none";
		target.querySelector('.content').style.display = "block";
	};

	for ( var i = 0; i < tab.length; i++ ) {
		UTILS.addEvent(tab[i], 'click', switchTab);
		UTILS.addEvent(tab[i], 'focus', switchTab);
	}

	var menuItems = document.querySelectorAll('.action-list a');
	var lastItem = document.querySelectorAll('.action-list li:last-child a');
	var menus = document.querySelectorAll('.action-list');

	/* Function open categories submenus on focus and highlighting currently
	 selected list items */
	var showMenu = function(e) {
		var target = e.target,
		parent = target.parentNode,
		activeParent;

		activeItem = document.querySelector("[data-item]");
		activeItem.removeAttribute('data-item');
		target.setAttribute('data-item', 'active');

		parent.parentNode.style.height = "160px";
		parent.parentNode.style.zIndex = "3";

		console.log(target.type);
	};

	/* Function closes categories */
	var closeMenu = function(e) {
		var target = e.target,
		parent = target.parentNode;
		parent.parentNode.style.height = "0";
	}

	for ( var i = 0; i < menuItems.length; i++ ) {
		UTILS.addEvent(menuItems[i], 'focus', showMenu);
	}

	for ( var i = 0; i < lastItem.length; i++ ) {
		UTILS.addEvent(lastItem[i], 'blur', closeMenu);
	}

	/* Solution for opened categories issue */
	// var catBlocks = document.querySelectorAll('.action-list');

	// for ( var i = 0; i < catBlocks.length; i++ ) {
	// 	UTILS.addEvent(catBlocks[i], 'hover', closeMenu);
	// }


	/* Reports section */
	var reportsBtn = document.querySelector(".reports-btn"),
	reports = document.querySelector(".reports");

	// Function check if the Reports window is displayed and show it if needed
	var openReports = function(event) {
		if ( reports.style.display === "none" ) {
			reports.style.display = "block";
		} else {
			reports.style.display = "none";
		}
	};

	// Function that checks what event triggered and if on keypress "Enter" was clicked
	var checkEvent = function(event) {
		if ( event.type === "click" ) {
			openReports();
		} else if ( event.type === "keypress" &&  event.keyCode === 13 ) {
			openReports();
		}
	};

	UTILS.addEvent(reportsBtn, 'click', checkEvent);
	UTILS.addEvent(reportsBtn, 'keypress', checkEvent);
};


