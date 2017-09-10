<?php
//pmxdr host server-side logic

ob_start("ob_gzhandler");

$version = "0.0.5";

header("Content-Type: text/html; charset=UTF-8");
header("ETag: ".$version);
//Uncomment to cache for almost forever
//header('Expires: Wed, 31 Dec 9999 00:00:00 GMT');

?><!doctype html><script><?php include('host/code.eligrey.com/pmxdr-host.min.js'); ?></script>
