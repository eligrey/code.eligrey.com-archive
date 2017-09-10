<?php
//jData Host server-side logic

$version = "0.0.3";

header("Content-Type: text/html; charset=UTF-8");
header("ETag: ".$version);
//Uncomment to cache for almost forever
//header('Expires: Wed, 31 Dec 9999 00:00:00 GMT');

?><!doctype html><script><?php include('jdata.min.js')?></script>