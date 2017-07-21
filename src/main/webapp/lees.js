var textarea = document.getElementById("Bert");
var textoud = textarea.value;
var textnieuw = textarea.value;
var interval = setInterval(function (){print()}, 5000);

function print() {
	textnieuw = textarea.value;
	if (textoud !== textnieuw) {
		console.log(textnieuw);
		textoud = textarea.value;
	}
}
