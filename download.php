<?php
/*	License
   download.php - v1.0.1
   Creative Commons GNU Lesser General Public License
   http://creativecommons.org/licenses/LGPL/2.1/
   Author: Elijah Grey - www.eligrey.com
*/
if ( isset($_GET['file']) && $_GET['file'] != '' )
{
	if ( isset($_GET['name']) ) {
		$filename = $_GET['name'];
	}
	$file = $_GET['file'];
	$file = preg_replace('/[\?#].*$/', '', (preg_replace('/^((.+:\/\/)([a-zA-Z\d\-\.]+)(:\d+)?)?[\.\/]*(\.\.*\/)*(.*)/', '$6', stripslashes($file))));
	if ( !isset($filename) ) {
		$filename = preg_replace('/(.*\/)*(.*)/', '$2', $file);
	}

	if ( is_file('./'.$file) )
	{
		header("Content-Type: application/octet-stream");
		header("content-disposition: attachment; filename=\"{$filename}\"");
		header("Content-Length: ".filesize('./'.$file));
		flush();
		readfile('./'.$file);
	}
	else {
		header("HTTP/1.1 404 Not Found");
		header("Content-Type: text/plain");
		echo "File not found.";
	}
}
else { ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Download a File From <?php echo $_SERVER['HTTP_HOST']; ?></title>
<style type="text/css">
/*<![CDATA[*/
input[type="text"] {
	width: 90%;
}
input[type="submit"] {
	width: 20px;
}
/*]]>*/
</style>
</head>
<body>
<p>Use this form to download a file from <?php echo $_SERVER['HTTP_HOST']; ?></p>
<div>
<form method="get" action="./download.php">
<div><label for="file">File:</label> <input type="text" name="file" id="file" /><input type="submit" value="&rsaquo;" /></div>
</form>
</div>
</body>
</html>
<?php } ?>