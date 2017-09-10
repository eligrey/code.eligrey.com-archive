<?php
if ( isset($_SERVER['QUERY_STRING']) )
{
	$headers = preg_split('/(?<!~)\|/', urldecode($_SERVER['QUERY_STRING']));
	for ($i=0; $i<count($headers); $i++)
	{
	header(preg_replace('/~\|/', '|', $headers[$i]));
	}
}
?>