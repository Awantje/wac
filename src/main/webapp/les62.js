initpage();
function initpage(){
	var us = localStorage.getItem("user");
	document.getElementById("username").innerHTML = localStorage.getItem("user");
	console.log(window.localStorage);
}