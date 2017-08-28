loadcountries();

function loadcountries() {
	$.get("/restservices/countries", function(
			landen) {
		console.log(landen);
		console.log(landen[0]);
		console.log(landen[0].Naam);
		var countries = $("#Countries");
		countries.append("<tbody>");
		$.each(landen, function(i, item) {
			var naam = "<td>" + landen[i].Naam + "</td>";
			var hoofdstad = "<td>" + landen[i].Capital + "</td>";
			var regio = "<td>" + landen[i].Region + "</td>";
			var string = "<tr id=" + landen[i].Code + ">" + naam + hoofdstad
					+ regio + "</tr>";
			countries.append(string)
		});
		countries.append("</tbody>");

	});

}

function editCountry(code) {
	uri = "/restservices/countries/"+code;
		$.get(uri, function(data){
		console.log("Editcountrycode");
		console.log(code);
		console.log(data);
		console.log(uri);
	$("#Landcode").html("<label for=\"Landcode\" id=\"countrycode\">Landcode: "+code+"</label>");
	$("#ISO3").html("<label for=\"ISO3\" id=\"countrycode\">ISO3Code: "+data[0].Iso3+"</label>");
	$("#Naam").html("<label for=\"Naam\" id=\"landnaam\">Landnaam: </label><textarea rows=\"1\" cols=\"50\" id=\"Nieuwlandnaam\">"+data[0].Naam+"</textarea>");
	$("#Cont").html("<label for=\"Cont\" id=\"countrycode\">Continent:</label><textarea rows=\"1\" cols=\"50\" id=\"Nieuwcontinent\">"+data[0].Continent+"</textarea>");
	$("#stad").html("<label for=\"Stad\" id=\"countrycode\">Stad: </label><textarea rows=\"1\" cols=\"50\" id=\"Nieuwcapi\">"+data[0].Capital+"</textarea>");
	$("#regio").html("<label for=\"regio\" id=\"countrycode\">Regio: </label><textarea rows=\"1\" cols=\"50\" id=\"Nieuwregion\">"+data[0].Region+"</textarea>");
	$("#surface").html("<label for=\"surface\" id=\"countrycode\">Oppervlakte: </label><textarea rows=\"1\" cols=\"50\" id=\"Nieuwsurface\">"+data[0].Surface+"</textarea>");
	$("#Population").html("<label for=\"Population\" id=\"countrycode\">Inwoners: </label><textarea rows=\"1\" cols=\"50\" id=\"Nieuwpop\">"+data[0].Population+"</textarea>");
	$("#Government").html("<label for=\"Government\" id=\"countrycode\">Overheid: </label><textarea rows=\"1\" cols=\"50\" id=\"Nieuwgov\">"+data[0].Government+"</textarea>");
	$("#latitude").html("<label for=\"Latitude\" id=\"countrycode\">Latitude: </label><textarea rows=\"1\" cols=\"50\" id=\"Nieuwlat\">"+data[0].Lat+"</textarea>");
	$("#longtitude").html("<label for=\"Longtitude\" id=\"countrycode\">Longtitude: </label><textarea rows=\"1\" cols=\"50\" id=\"Nieuwlng\">"+data[0].lng+"</textarea>");}
	);};
	
	$("body").on('click', 'tr', function(){
		editCountry(this.id);
	});

function nieuwcountry(){
	console.log("nieuwcountry")
	var codetn = $("textarea#Landcode").text;
	var iso3n = $("textarea#ISO3").text;
	var Naamnd = $("textarea#Naam").text;
	var Contn = $("#Cont").text;
	var Stadn = $("#Stad").text;
	var Region = $("#regio").text;
	var Surfacen = $("#surface").text;
	var Populationn = $("#Population").text;
	var Governmentn = $("#Government").text;
	var Latituden = $("#Latitude").text;
	var longtituden = $("#Longtitude").text;
	var country = {Code: codetn , Iso3 : iso3n , Naam : Naamnd , Continent : Contn , Capital : Stadn , Region : Region , Surface :Surfacen, Population :Populationn, Government : Governmentn , Lat :Latituden, lng :longtituden}
	console.log(country);
	add(country);
}
function editcountry(){
	console.log("editcountry")
	var codetn = $("Landcode").val();
	var iso3n = $("ISO3").value;
	var Naamnd = $("#Naam").text;
	var Contn = $("#Cont").text;
	var Stadn = $("#Stad").text;
	var Region = $("#regio").text;
	var Surfacen = $("#surface").text;
	var Populationn = $("#Population").text;
	var Governmentn = $("#Government").text;
	var Latituden = $("#Latitude").text;
	var longtituden = $("#Longtitude").text;
	var country = {Code: codetn , Iso3 : iso3n , Naam : Naamnd , Continent : Contn , Capital : Stadn , Region : Region , Surface :Surfacen, Population :Populationn, Government : Governmentn , Lat :Latituden, lng :longtituden}
	console.log(country);
	edit(country);
}
	function edit(country) {
		$.ajax({
			url : '/restservices/countries/updateland',
			type : 'PUT',
			data : JSON.stringify(country),
			contentType: "application/json",
			success : function(msg) {
				console.log("Data Edited: ");
			}
		});
	}
	function remove(country) {
	}
	$.ajax({
		type : "DELETE",
		url : "/countries/deleteland",
		data : JSON.stringify(country),
		contentType: "application/json;",
		success : function(msg) {
			console.log("Data Deleted: ");
		}
	});
	function add(country) {
		$.ajax({
			url : '/countries/addland',
			type : 'POST',
			data : JSON.stringify(country),
			contentType: "application/json;",
			success : function(msg) {
				console.log("Data added: ");
			}
		});
	}
	function getLandByCode(code) {
		$.get("/restservices/countries/" + code);
	}

	document.getElementById("nieuw").onclick = nieuwcountry;
	document.getElementById("edit").onclick = editcountry;
