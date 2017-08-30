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
	$("#Landcode").html("<label for=\"Landcode\" id=\"CODE\">Landcode: "+data[0].Code+"</label>");
	$("#ISO3").html("<label for=\"ISO3\" id=\"Iso3\">ISO3Code: "+data[0].Iso3+"</label>");
	$("#Naam").html("<label for=\"Naam\" id=\"NAAM\">Landnaam: </label><textarea rows=\"1\" cols=\"50\" id=\"Editlandnaam\">"+"</textarea>");
	$("#NAAM").text(data[0].Naam);
	console.log(data[0].Naam);
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
	var codetn = $("#CODEN").val();
	var iso3n = $("#ISO3N").val();
	var Naamn = $("#NAAMN").val();
	var Contn = $("#CONTN").val();
	var Stadn = $("#STADN").val();
	var Region = $("#REGION").val();
	var Surfacen = $("#OPPN").val();
	var Populationn = $("#INWN").val();
	var Governmentn = $("#OVERN").val();
	var Latituden = $("#LATN").val();
	var longtituden = $("#LONGN").val();
	var country = {Code: codetn , Iso3 : iso3n , Naam : Naamn , Continent : Contn , Capital : Stadn , Region : Region , Surface :Surfacen, Population :Populationn, Government : Governmentn , Lat :Latituden, lng :longtituden}
	console.log(country);
	console.log(codetn);
	console.log($("#CODEN").val());
	console.log($("#ISO3N").val());
	console.log($("NAAMN").val());
	console.log("debug");
	//add(country);
}
function editcountry(){
	console.log("editcountry")
	var codete = $("CODE").val();
	var iso3e = $("Iso3").val();
	var Naamne = $("#Naam").val();
	var Conte = $("#CONT").val();
	var Stade = $("#STAD").val();
	var Regioe = $("#REGIO").val();
	var Surfacee = $("#OPP").val();
	var Populatione = $("#INW").val();
	var Governmente = $("#OVER").val();
	var Latitudee = $("#LAT").val();
	var longtitudee = $("#LONG").val();
	var country = {Code: codete , Iso3 : iso3e , Naam : Naamne , Continent : Conte , Capital : Stade , Region : Regioe , Surface :Surfacee, Population :Populatione, Government : Governmente , Lat :Latitudee, lng :longtitudee}
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
