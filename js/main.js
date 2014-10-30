var reportsBtn = document.querySelector(".reports-btn"); 

reportsBtn.onclick = function() {
	var reports = document.querySelector(".reports"); 
	if ( reports.style.display === "none" ) {
			reports.style.display = "block";
	} else {
		reports.style.display = "none";
	}
};