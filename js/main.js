window.onload = function() {

	var tab = document.querySelectorAll(".tab"),
		activeTab;


	var switchTab = function() {
		activeTab = document.querySelector("a[data-tab]");
		console.log(activeTab);
		activeTab.removeAttribute('data-tab');
		this.setAttribute('data-tab', 'active-tab');
		activeTab.querySelector('.content').style.display = "none";
		this.querySelector('.content').style.display = "block";
	};

	for ( var i = 0; i < tab.length; i++ ) {
		tab[i].addEventListener("click", switchTab, "handler");
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


