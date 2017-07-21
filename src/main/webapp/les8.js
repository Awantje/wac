loadcountries();
function loadcountries(){
	$.get("http://localhost:4711/firstapp/restservices/countries", function(landen){
		console.log(landen);
		console.log(landen[0]);
		console.log(landen[0].Naam);
		$.each(landen, function(i, item){
			var naam = "<td>"+landen[i].Naam+"</td>";
			var hoofdstad = "<td>"+landen[i].Capital+"</td>";
			var regio = "<td>"+landen[i].Region+"</td>";
			var string = "<tr id="+landen[i].code+">"+naam+hoofdstad+regio+"</tr>";
			$("#Countries").append(string)});
			
		});
	
}

function land(id){
	$("#landcode").append(this.countryCode);
	$("#regio").append(this.regionName);
	$("#land").append(this.country);
	$("#stad").append(this.city);
	$("#postcode").append(this.zip);
	$("#lat").append(this.lat);
	$("#long").append(this.lon);
	$("#weatherInfo").append(this.city);
}

$("body").on('click', 'tr', function(){
	land(this.id);
});

function myFunction() {
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("myInput");
	  filter = input.value.toUpperCase();
	  table = document.getElementById("countries");
	  tr = table.getElementsByTagName("tr");


	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];
	    if (td) {
	      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    } 
	  }
	}