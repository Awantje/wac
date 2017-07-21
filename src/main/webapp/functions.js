
code = document.getElementById($("#landcode")).innerHTML = display;

country = getLandbyCode(code);

function edit(country) {
	$.ajax({
		url : 'localhost',
		type : 'PUT',
		data : JSON.stringify(country),
		contentType: "application/json; charset=utf-8",
		success : function(msg) {
			console.log("Data Edited: ");
		}
	});
}
function remove(country) {
}
$.ajax({
	type : "DELETE",
	url : "delete_script.php",
	data : JSON.stringify(country),
	contentType: "application/json; charset=utf-8",
	success : function(msg) {
		console.log("Data Deleted: ");
	}
});
function add(country) {
	$.ajax({
		url : 'localhost',
		type : 'POST',
		data : JSON.stringify(country),
		contentType: "application/json; charset=utf-8",
		success : function(msg) {
			console.log("Data added: ");
		}
	});
}
function getLandByCode(code) {
	$.get("http://localhost:4711/firstapp/restservices/countries/" + code);
}