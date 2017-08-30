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
		console.log(data[0].Iso3);
		console.log(data[0].Code);
		console.log(data);
		console.log(uri);
	$("#landcode").html("<label for=\"Landcode\" id=\"CODEE\" code="+data[0].Code+">Landcode: </label>");
	$("#ISO3").html("<label for=\"ISO3\" id=\"ISO3E\"iso3="+data[0].Iso3+">ISO3Code: </label>");
	$("#Naam").html("<label for=\"Naam\" id=\"NAAME\">Landnaam: </label><textarea rows=\"1\" cols=\"50\" id=\"Editlandnaam\">"+"</textarea>");
	$("#Editlandnaam").text(data[0].Naam);
	$("#Cont").html("<label for=\"Cont\" id=\"CONTE\">Continent:</label><textarea rows=\"1\" cols=\"50\" id=\"Editcontinent\"></textarea>");
	$("#Editcontinent").text(data[0].Continent);
	$("#stad").html("<label for=\"Stad\" id=\"STADE\">Stad: </label><textarea rows=\"1\" cols=\"50\" id=\"Editcapi\"></textarea>");
	$("#Editcapi").text(data[0].Capital);
	$("#regio").html("<label for=\"regio\" id=\"REGIOE\">Regio: </label><textarea rows=\"1\" cols=\"50\" id=\"Editregion\"></textarea>");
	$("#Editregion").text(data[0].Region);
	$("#surface").html("<label for=\"surface\" id=\"OPPE\">Oppervlakte: </label><textarea rows=\"1\" cols=\"50\" id=\"Editsurface\"></textarea>");
	$("#Editsurface").text(data[0].Surface);
	$("#Population").html("<label for=\"Population\" id=\"INWE\">Inwoners: </label><textarea rows=\"1\" cols=\"50\" id=\"Editpop\"></textarea>");
	$("#Editpop").text(data[0].Population);
	$("#Government").html("<label for=\"Government\" id=\"OVERE\">Overheid: </label><textarea rows=\"1\" cols=\"50\" id=\"Editgov\"></textarea>");
	$("#Editgov").text(data[0].Government);
	$("#latitude").html("<label for=\"Latitude\" id=\"LATE\">Latitude: </label><textarea rows=\"1\" cols=\"50\" id=\"Editlat\"></textarea>");
	$("#Editlat").text(data[0].Lat);
	$("#longtitude").html("<label for=\"Longtitude\" id=\"LONGE\">Longtitude: </label><textarea rows=\"1\" cols=\"50\" id=\"Editlng\"></textarea>");
	$("#Editlng").text(data[0].lng);}
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
	add(country);
}
function editcountry(){
	console.log("editcountry")
	var codete = $("CODEE").attr('code');
	var iso3e = $("ISO3E").attr('Iso3');
	var Naamne = $("#Editlandnaam").val();
	var Conte = $("#Editcontinent").val();
	var Stade = $("#Editcapi").val();
	var Regioe = $("#Editregion").val();
	var Surfacee = $("#Editsurface").val();
	var Populatione = $("#Editpop").val();
	var Governmente = $("#Editgov").val();
	var Latitudee = $("#Editlat").val();
	var longtitudee = $("#Editlng").val();
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
		url : "/restservices/countries/deleteland",
		data : JSON.stringify(country),
		contentType: "application/json",
		success : function(msg) {
			console.log("Data Deleted: ");
		}
	});
	function add(country) {
		$.ajax({
			url : '/restservices/countries/addland',
			type : 'POST',
			data : JSON.stringify(country),
			contentType: "application/json",
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
