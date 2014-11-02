window.onload = function() {

	var tab = document.querySelectorAll(".tab");
	var activeTab;


	var switchTab = function() {
		activeTab = document.querySelector("a[data]");
		// console.log(this);
		console.log(activeTab);
		activeTab.removeAttribute('data');
		this.setAttribute('data', 'active-tab');
	};

	for ( var i = 0; i < tab.length; i++ ) {
		tab[i].addEventListener("click", switchTab);
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


