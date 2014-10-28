var reportsBtn = document.querySelector(".reports-btn"); 

reportsBtn.onclick = function() {
	var reportsDiv = document.querySelector(".reports"); 
	if ( reportsDiv.style.display === "none" ) {
			reportsDiv.style.display = "block";
	} else {
		reportsDiv.style.display = "none";
	}
};