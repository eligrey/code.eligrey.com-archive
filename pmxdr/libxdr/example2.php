<?php
header("Content-Type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

echo $_POST["foo"]=="bar" ? "foo is bar" : "foo is NOT bar";
?>
