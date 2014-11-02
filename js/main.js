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
		activeTab;

	var switchTab = function() {
		activeTab = document.querySelector("a[data-tab]");
		// console.log(activeTab);
		activeTab.removeAttribute('data-tab');
		this.setAttribute('data-tab', 'active-tab');
		activeTab.querySelector('.content').style.display = "none";
		this.querySelector('.content').style.display = "block";
	};

	for ( var i = 0; i < tab.length; i++ ) {
		if ( document.addEventListener ) {
			tab[i].addEventListener("click", switchTab, "handler");
		} else {
			tab[i].attachEvent("onclick", switchTab);
		}
	}

	// UTILS.addEvent('click', switchTab, false);

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


