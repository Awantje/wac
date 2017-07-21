function filter() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("zoeken");
  filter = input.value.toUpperCase();
  table = document.getElementById("Countries");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 1; i < tr.length; i++) {
    tds = tr[i].getElementsByTagName("td");
    if (tds) {
		var display = false;
		for (j = 0; j < tds.length; j++) {
			var td = tds[j];
			if (td){
			  if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
				display = true;
			  } 
			}
		}
		if (display) {
			tr[i].style.display = "";
		}
		else {
			tr[i].style.display = "none";
		}
    } 
  }
}