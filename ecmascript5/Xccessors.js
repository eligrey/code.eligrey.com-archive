(function() {
	var Xccessors = "http://code.eligrey.com/xccessors/standard/latest/xccessors-standard.min.js";
	if (this.Shell && Shell.shellCommands && Shell.shellCommands.load) // in JavaScript Shell (extended shell will hide load message)
		shellCommands.load(Xccessors, false);
	else {
		var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", Xccessors);
		document.documentElement.appendChild(script);
	}
})();
