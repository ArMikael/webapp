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
	}

};



var reportsBtn = document.querySelector(".reports-btn");

reportsBtn.onclick = function() {
	var reports = document.querySelector(".reports");
	if ( reports.style.display === "none" ) {
			reports.style.display = "block";
	} else {
		reports.style.display = "none";
	}
};


