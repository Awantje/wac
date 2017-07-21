var display = 0;
document.getElementById('btn_1').onclick = function() {
	input("1");
};
document.getElementById('btn_2').onclick = function() {
	input("2");
};
document.getElementById('btn_3').onclick = function() {
	input("3");
};
document.getElementById('btn_4').onclick = function() {
	input("4");
};
document.getElementById('btn_5').onclick = function() {
	input("5");
};
document.getElementById('btn_6').onclick = function() {
	input("6");
};
document.getElementById('btn_7').onclick = function() {
	input("7");
};
document.getElementById('btn_8').onclick = function() {
	input("8");
};
document.getElementById('btn_9').onclick = function() {
	input("9");
};
document.getElementById('btn_0').onclick = function() {
	input("0");
};
document.getElementById('btn_div').onclick = function() {
	input("/")
};
document.getElementById('btn_prod').onclick = function() {
	input("*")
};
document.getElementById('btn_min').onclick = function() {
	input("-")
};
document.getElementById('btn_plus').onclick = function() {
	input("+")
};

document.getElementById('btn_clear').onclick = function() {
	display = "0"
	input("0");
};
document.getElementById('btn_eq').onclick = function() {
	uitkomst()
};

function input(a) {
	if (display == "0") {
		display = a
	} else {
		display = display + a;
	}
	document.getElementById("display").innerHTML = display;
}
function uitkomst() {
	display = eval(display)
	document.getElementById("display").innerHTML = display;
}