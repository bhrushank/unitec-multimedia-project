<?php 
		  header("Pragma: public");
		  header("Expires: 0");
		  header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
		  header("Cache-Control: private",false);
		  header("Content-Type: text/x-csv");        
		  header("Content-Transfer-Encoding: binary");
		  header("Content-Disposition: attachment; filename=YourBCSPathway.csv");
		  var_dump($_GET['data']);
		  //$csv = $_GET['data'];
		  //$csv = mb_convert_encoding($csv, 'UTF-16LE', 'UTF-8');
  		  //print $csv;
?>