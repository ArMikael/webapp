window.onload = function() {

	/* UTILS API  Section */
	// UTILS.ajax('data/notification.txt', {
	// done: function(response) {
	// 		//console.log(response);
	// 		var text = document.createTextNode(response);
	// 		var paragraph = document.createElement("p");
	// 		var notification = document.querySelector('.notifications');
	// 		paragraph.appendChild(text);
	// 		notification.appendChild(paragraph);
	// 	},

	// fail: function(err) {
	// 	document.querySelector('#xhr');
	// 	}
	// });


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

	// var tabIndexArr = document.querySelectorAll('[tabindex="0"]');
	// console.log(tabIndexArr);
	var menuItems = document.querySelectorAll('.action-list a');
	var lastItem = document.querySelectorAll('.action-list li:last-child a');
	// console.log(lastItem);
	var menus = document.querySelectorAll('.action-list');

	/* This function open categories submenus on focus and highlighting currently
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

	};

	var closeMenu = function(e) {
		var target = e.target,
		parent = target.parentNode;
		console.log(parent.parentNode);
		parent.parentNode.style.height = "0";
	}

	for ( var i = 0; i < menuItems.length; i++ ) {
		UTILS.addEvent(menuItems[i], 'focus', showMenu);
	}

	for ( var i = 0; i < lastItem.length; i++ ) {
		UTILS.addEvent(lastItem[i], 'blur', closeMenu);
	}

};



var reportsBtn = document.querySelector(".reports-btn");
var reports = document.querySelector(".reports");

reportsBtn.onclick = function() {
	if ( reports.style.display === "none" ) {
		reports.style.display = "block";
	} else {
		reports.style.display = "none";
	}
};

reportsBtn.onkeypress = function(event) {
    console.log(event.keyCode);
    if (event.keyCode === 13 ) {
    	if ( reports.style.display === "none" ) {
    		reports.style.display = "block";
    	} else {
    		reports.style.display = "none";
    	}
    };
};



