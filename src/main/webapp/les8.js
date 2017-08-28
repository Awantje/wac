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
	$("#Landcode").html("<label for=\"Code\" id=\"countrycode\">Landcode: </label><textarea rows=\"1\" cols=\"50\" id=\"Editlandcode\">"+data[0].Code+"</textarea>");
	$("#ISO3").html("<label for=\"Code\" id=\"iso3code\">iso3code: </label><textarea rows=\"1\" cols=\"50\" id=\"Editisocode\">"+data[0].Iso3+"</textarea>");
	$("#Naam").html("<label for=\"Naam\" id=\"NAAM\">Landnaam: </label><textarea rows=\"1\" cols=\"50\" id=\"Editlandnaam\">"+data[0].Naam+"</textarea>");
	$("#Cont").html("<label for=\"Cont\" id=\"CONT\">Continent:</label><textarea rows=\"1\" cols=\"50\" id=\"Editcontinent\">"+data[0].Continent+"</textarea>");
	$("#stad").html("<label for=\"Stad\" id=\"STAD\">Stad: </label><textarea rows=\"1\" cols=\"50\" id=\"Editcapi\">"+data[0].Capital+"</textarea>");
	$("#regio").html("<label for=\"regio\" id=\"REGIO\">Regio: </label><textarea rows=\"1\" cols=\"50\" id=\"Editregion\">"+data[0].Region+"</textarea>");
	$("#surface").html("<label for=\"surface\" id=\"OPP\">Oppervlakte: </label><textarea rows=\"1\" cols=\"50\" id=\"Editsurface\">"+data[0].Surface+"</textarea>");
	$("#Population").html("<label for=\"Population\" id=\"INW\">Inwoners: </label><textarea rows=\"1\" cols=\"50\" id=\"Editpop\">"+data[0].Population+"</textarea>");
	$("#Government").html("<label for=\"Government\" id=\"OVER\">Overheid: </label><textarea rows=\"1\" cols=\"50\" id=\"Editgov\">"+data[0].Government+"</textarea>");
	$("#latitude").html("<label for=\"Latitude\" id=\"LAT\">Latitude: </label><textarea rows=\"1\" cols=\"50\" id=\"Editlat\">"+data[0].Lat+"</textarea>");
	$("#longtitude").html("<label for=\"Longtitude\" id=\"LONG\">Longtitude: </label><textarea rows=\"1\" cols=\"50\" id=\"Editlng\">"+data[0].lng+"</textarea>");}
	);};
	
	$("body").on('click', 'tr', function(){
		editCountry(this.id);
	});

function nieuwcountry(){
	console.log("nieuwcountry")
	var codetn = $("#CODEN").html();
	var iso3n = $("#ISO3N").html();
	var Naamnd = $("#NAAMN").val();
	var Contn = $("#CONTN").val();
	var Stadn = $("#STADN").val();
	var Region = $("#REGION").val();
	var Surfacen = $("#OPPN").val();
	var Populationn = $("#INWN").val();
	var Governmentn = $("#OVERN").val();
	var Latituden = $("#LATN").val();
	var longtituden = $("#LONGN").val();
	var country = {Code: codetn , Iso3 : iso3n , Naam : Naamnd , Continent : Contn , Capital : Stadn , Region : Region , Surface :Surfacen, Population :Populationn, Government : Governmentn , Lat :Latituden, lng :longtituden}
	console.log(country);
	add(country);
}
function editcountry(){
	console.log("editcountry")
	var codetn = $("countrycode").val();
	var iso3n = $("iso3code").val();
	var Naamnd = $("#NAAM").val();
	var Contn = $("#CONT").val();
	var Stadn = $("#STAD").val();
	var Region = $("#REGIO").val();
	var Surfacen = $("#OPP").val();
	var Populationn = $("#INW").val();
	var Governmentn = $("#OVER").val();
	var Latituden = $("#LAT").val();
	var longtituden = $("#LONG").val();
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
