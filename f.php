<?php
if ( isset($_GET['file']) && $_GET['file'] != '' )
{
	$get_param = 'file';
	header("Content-Type: application/octet-stream");
	header("content-disposition: attachment; filename=\"{$_GET[$get_param]}\"");
}
else { ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Download an Empty File</title>
</head>
<body>
<p>Use this form to download an empty file of the name you specify. This is useful for when you are unable to name file in Windows starting with a dot and don't want to get out the command prompt to do it manually.</p>
<div>
<form method="get" action="./f.php">
<label for="file">Filename:</label> <input type="text" name="file" id="file" /> <input type="submit" value="Download" />
</form>
</div>
</body>
</html>
<?php } ?>