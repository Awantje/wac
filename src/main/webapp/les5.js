initpage()
var appid = "66c11be2f15c518c5a8567f29c6b202d"
function initpage(){
	$.get("http://ip-api.com/json", function(data) {
		console.log(data);
		stad = data.city;
		lat = data.lat;
		lon = data.lon;
		$("#landcode").append(data.countryCode);
		$("#regio").append(data.regionName);
		$("#land").append(data.country);
		$("#stad").append(data.city);
		$("#postcode").append(data.zip);
		$("#lat").append(data.lat);
		$("#long").append(data.lon);
		$("#IP").append(data.query);
		$("#weatherInfo").append(data.city);
		showWeather(data.lat, data.lon, data.city);
		loadcountries();
		});
}

function showWeather(lat, lon, city){
	Time =  new Date();
	Second = Time.getTime();
	stad = city;
	stadn = localStorage.getItem("stad")
	if (( Math.floor((new Date() - Second)/60000)> 10) || (stad !==  stadn)){
		var uri = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID="+appid;
		$.get(uri, function(reply){
			console.log(reply);
			console.log(reply.main);
			console.log(reply.main.temp);
			console.log("if 1");
			console.log(stad);
			console.log(stadn);
			console.log( Math.floor((new Date() - Second)/60000)< 10);
			window.localStorage.setItem('stad', stad);
			$("#Temp").html("Temperatuur: " + Math.floor(reply.main.temp-272.15)+" Graden Celsius");
			window.localStorage.setItem('temp', reply.main.temp);
			console.log(reply.main.temp);
			$("#Vocht").html("Luchtvochtigheid: "+reply.main.humidity+" %");
			window.localStorage.setItem('vocht', reply.main.humidity);
			console.log(reply.main.humidity);
			$("#Wind").html("Windsnelheid: "+(Math.round(reply.wind.speed*3.6*100)/100)+" Kilometer per uur");
			window.localStorage.setItem('wind', reply.wind.speed);
			console.log(reply.wind.speed);
			$("#Windr").html("Windrichting: "+reply.wind.deg);
			window.localStorage.setItem('graden', reply.wind.deg);
			console.log(reply.wind.deg);
			$("#Zonop").html("Zonopkomst: "+Math.floor(reply.sys.sunrise % 86400 / 3600+ 2)+":"+Math.floor(reply.sys.sunrise % 3600 / 60));
			window.localStorage.setItem('zonop', reply.sys.sunrise);
			console.log(reply.sys.sunrise);
			$("#Zonne").html("Zonsondergang: "+Math.floor(reply.sys.sunset % 86400 / 3600 + 2)+":"+Math.floor(reply.sys.sunset % 3600 / 60));
			window.localStorage.setItem('zonne', reply.sys.sunset);
			console.log(reply.sys.sunset);
			window.localStorage.setItem('tijd', new Date().getTime());});
		
	}
	else {
	console.log(stad);
	console.log(stadn);
	console.log( Math.floor((new Date() - Second)/60000)< 10);
	$("#Temp").html("Temperatuur: " + Math.floor(localStorage.getItem("temp")-272.15)+" Graden Celsius");
	$("#Vocht").html("Luchtvochtigheid: "+localStorage.getItem("vocht")+" %");
	$("#Wind").html("Windsnelheid: "+(Math.round(localStorage.getItem("wind")*3.6*100)/100)+" Kilometer per uur");
	$("#Windr").html("Windrichting: "+localStorage.getItem("graden"));
	$("#Zonop").html("Zonopkomst: "+Math.floor(localStorage.getItem("zonop") % 86400 / 3600+ 2)+":"+Math.floor(localStorage.getItem("zonop") % 3600 / 60));
	$("#Zonne").html("Zonsondergang: "+Math.floor(localStorage.getItem("zonne") % 86400 / 3600 + 2)+":"+Math.floor(localStorage.getItem("zonne") % 3600 / 60));
	console.log(localStorage.getItem("tijd"));
	console.log(Second);
	console.log("if 2");
	console.log(localStorage.getItem("tijd"));
	console.log(Second);}
}
function loadcountries(){
	$.get("http://localhost:4711/firstapp/restservices/countries", function(landen){
		console.log(landen);
		console.log(landen[0]);
		console.log(landen[0].Naam);
		$.each(landen, function(i, item){
			var naam = "<td>"+landen[i].Naam+"</td>";
			var hoofdstad = "<td>"+landen[i].Capital+"</td>";
			var regio = "<td>"+landen[i].Region+"</td>";
			var oppervlakte = "<td>"+landen[i].Surface+"</td>";
			var inwoners = "<td>"+landen[i].Population+"</td>";
			var string = "<tr id="+landen[i].Lat+","+landen[i].lng+","+landen[i].Capital+">"+naam+hoofdstad+regio+oppervlakte+inwoners+"<button type=\"button\">verwijder</button>"+"</tr>";
			$("#Countries").append(string)});
			
		});
	
}

$("body").on('click', 'tr', function(){
	var res = this.id.split(",");
	showWeather(res[0], res[1], res[2]);
});
$("div").on('click', '#stad', function(){
	showWeather(lat, lon, city);
});


