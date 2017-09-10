<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>root@ssh.cia.gov: /home/private</title>
<link rel="icon" href="padlock.svg" sizes="any" type="image/svg+xml"/>
<link rel="icon" href="lock-favicon.png" sizes="16x16" type="image/png"/>
<!-- Lock favicon from the Fugue Icons set by Yusuke Kamiyamane; http://p.yusukekamiyamane.com/ -->
<style type="text/css" title="Secret Government CSS">
@font-face {
	font-family: "Glass TTY VT220X";
	src: local("Glass TTY VT220X"),
		 url("VT220X-optimized-for-this-page.ttf.gz") format("truetype");
}
html, body, #ssh {
	margin: 0;
	padding: 0;
	border: 0;
	position: fixed;
	height: 100%;
	width: 100%;
	outline: none;
}
#ssh, a /* 'a' to hide auto-links */ {
	color: limegreen;
	background: black;
	text-decoration: none;
	font-size: 20px;
	font-family: "Glass TTY VT220X", monospace;
}
::-moz-selection {
	color: black;
	background: limegreen;
}
::selection {
	color: black;
	background: limegreen;
}
</style>
</head>
<body>
<pre id="ssh"><?php echo $_SERVER['REMOTE_ADDR']; ?>@ssh.cia.gov:~$ su
Password: *****************
root@ssh.cia.gov:/home/<?php echo $_SERVER['REMOTE_ADDR']; ?># cd ../private
root@ssh.cia.gov:/home/private# <span id="cursor">&#x2588;</span></pre>
<script type="text/javascript">
//<![CDATA[
var cursor = document.getElementById("cursor");
setInterval(function () {
	cursor.style.visibility = cursor.style.visibility === "hidden" ? "visible" : "hidden";
}, 700);
//]>
</script>
</body>
</html
