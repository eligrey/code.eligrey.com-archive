<?php
$URI=$_SERVER['HTTP_REFERER'];
$SITE="http://".$_SERVER['HTTP_HOST'];
if( !isset($_GET['css']) )
{
header("HTTP/1.1 404 Not Found");
if(!stripos($_SERVER['HTTP_USER_AGENT'],'msie'))
	{
	header('Link: <'.$SITE.'/404.php?css=true>; REL="stylesheet"; MEDIA="screen"; TYPE="text/css";');
	header('Title: <404>;');
	echo "<title>404</title>";
	}
else if(stripos($_SERVER['HTTP_USER_AGENT'],'msie')) {
echo '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title>404</title>
<style type="text/css">
/*<![CDATA[*/
body {background:orange;font-size:50px;font-weight:bold;text-align:center;}
body:hover {color:white;}
/*]]>*/
</style>
</head>
<body><p>The URI: '.$URI.' could not be found.</p></body>
</html>';
}
}

else if( isset($_GET['css']) && $_GET['css']=="true" )
{
header("Content-type: text/css; charset: utf-8");
echo "body {background:orange;font-size:50px;font-weight:bold;text-align:center;}
body:after {content:\"The URI: ".$URI." could not be found.\"}
body:hover {color:white;}
body:hover:after {color:white;}";
}
?>