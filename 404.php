<?php
$URI=$_SERVER['HTTP_REFERER'];
$SITE="http://".$_SERVER['HTTP_HOST'];

if( !isset($_GET['css']) ) {
  header("HTTP/1.1 404 Not Found");
  header("Content-Type: text/html; charset=utf-8");
  header('Link: </404.php?css>; rel="stylesheet"; type="text/css"; title="404 CSS";');
  header('Title: 404');

?><!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>404</title>
</head>
<body>
<p>If you were using a browser that supported Link: headers this page would show a fancy 404 error. I reccomend you use <a href="http://www.mozilla.com/firefox/">Firefox</a> and <a href="http://www.opera.com/browser/download/">Opera</a>.</p>
</body>
</html>
<?php
}

else if( isset($_GET['css']) ) {
  header("Content-type: text/css; charset: utf-8");
  header("Expires: -1");
  echo "body {
  background: orange;
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  color: black;
  width: 100%;
  margin: 0px;
}

p {
  display: none;
}

body:after {
  content:\"The URI: ".$URI." could not be found.\"
}

body:hover {
  color:white;
}

body:hover:after {
  content:\"The URI: →".$URI."← could not be found.\";
}";

}

?>
