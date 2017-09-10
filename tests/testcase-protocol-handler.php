<?php
// simple protcol handler

$redirect_base_uri = "http://code.eligrey.com/testcases/";

if ( isset($_GET["uri"]) && preg_match("/^[\w-]+:/i", $_GET["uri"]) ) {
  header("Location: ".$redirect_base_uri.preg_replace("/^([\w-]+:\/*)/", "", $_GET["uri"]));
}
?>
