<?php
/*
   http-index-format Automator
   @version 0.0.1
   @license: GNU GPL, X11/MIT License
       http://eligrey.com/about/license
   @author: Elijah Grey, http://eligrey.com

    Recomended use: Use in conjunction with mod_rewrite to make all directories automatically served as http-index-format.php?dir=DIRECTORY for Gecko browsers and default index view for normal browsers.
	To have info in directories, place an index.info file in a directory to show comments in the generated application/http-index-format output
*/

header("Content-Type: application/http-index-format");
$dir = $_GET["dir"];
$dir = preg_replace("/\/{2,}/", "/", $dir) == "" ? "./" : $dir ;

echo "300: http://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"] . "\n";

if (is_dir($dir)) {
	if($dh = opendir($dir)) {
		if ( is_file($dir . "/index.info.php") ) {
			echo "101: ";
			include($dir . "/index.info.php");
			echo "\n";
		}
	
		else if ( is_file($dir . "/index.info") ) {
			$info = file($dir . "/index.info");
			for($x = 0; $x <= count($info); $x++) {
				if ($info[$x] != "") { echo "101: " . $info[$x]; }
			}
			echo "\n";
		}

		echo "200: Filename Content-Length File-type Last-Modified\n";
		while ( ($file = readdir($dh)) !== false ) {
			if ($file != "." && $file != ".." && $file != "index.info" && $file != "index.info.php" && $file != ".htaccess") {
				if (is_link($dir."/".$file)) {
					echo "201: ".'"'.$file.'"'." 0 SYMBOLIC-LINK \n";
				}
				elseif ( is_dir($dir."/".$file)) {
					echo "201: ".'"'.$file.'"'." 0 DIRECTORY \n";
				}
				elseif ( is_file($dir."/".$file)) {
					echo "201: ".'"'.$file.'" '.filesize($dir."/".$file)." FILE ".date("D,%20C%20j%20M%20Y%20G%3\AH%3\As", filemtime($dir."/".$file))."GMT\n";
				}
			}
		}
	}
}
echo "\n";
exit();
?>
