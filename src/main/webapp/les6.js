function init() {
var user = document.getElementById("username");
user.onkeyup = function(){
	console.log(username.value);
    window.localStorage.setItem('user', username.value);
    console.log(window.localStorage);
};
}
window.onload = init;