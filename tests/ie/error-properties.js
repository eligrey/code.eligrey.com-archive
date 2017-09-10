try {
	0();
} catch (e) {
	var ex = e;
}
var res = document.getElementById("results");
for (var prop in ex) {
	res.innerHTML += prop + " (" + typeof prop + "):\n<br />" + ex[prop] + "\n<br />\n <br />";
}
