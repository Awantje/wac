$("#login").click(function(event) {
	var data = $("#loginform").serialize();
	$.post("restservices/authentication", data, function(response) {
		window.sessionStorage.setItem("sessionToken", response);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(textStatus);
		console.log(errorThrown);
	});
});