<?php
	header("Content-Type: application/x-javascript");
	include "json2.js";
	echo ";";
	include "latest/jil.min.js";
	if ( isset($_GET["dollar"]) && $_GET["dollar"] == "true" ) echo "var $ = JIL;";
	if ( isset($_GET["moobugger"]) && $_GET["moobugger"] == "true" ) echo "(function(){if (!window.debug || !debug.path){window.debug = {path: 'http://code.eligrey.com/moobugger/'}; var script = document.createElement('script'); script.id = 'debug-bookmarklet'; script.src = debug.path + 'debugger.js'; document.getElementsByTagName('head')[0].appendChild(script);if (!window.dbug) { return; } dbug.firebug = true;}})();";
?>
