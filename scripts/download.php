<?php
//var_dump($data[0]);
$data=array_values($_POST);
//var_dump($data[0]);
getCSV($data[0],'YourBCSPathway');

function getCSV($res,$fileName){	
		  session_start();	
		  if(!empty($_SESSION['download_'.$fileName]) && (time() - $_SESSION['download_'.$fileName] < 10))
			  exit;		
		  // Check, then exit if you have requested before in 10 seconds
  
		  $_SESSION['download_'.$fileName] = time();
		  
		  $header = "Semester;Code;Subject Name";
		  
		  $data="";
		  foreach ( $res as $row )
		  {                  
			  $line = '';
			  foreach( $row as $value )
			  {                
				  if ( ( !isset( $value ) ) || ( $value == "" ) )
				  {
					  $value = ";";
				  }
				  else
				  {
					  $value = str_replace( '"' , '""' , $value );                    
					  $value = '"' . $value . '"' . ";";
				  }
				  $line .= $value;
			  }
			  $data .= trim( $line ) . "\n";
		  }
		  $data = str_replace( "\r" , "" , $data );
		  if ( $data == "" )
		  {
			  $data = "\n(0) Records Found!\n";
		  }
  
		  header("Pragma: public");
		  header("Expires: 0");
		  header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
		  header("Cache-Control: private",false);
		  header("Content-Type: text/x-csv");        
		  header("Content-Transfer-Encoding: binary");
		  header("Content-Disposition: attachment; filename=".$fileName.".csv");
		  $csv = "$header\n$data";
		  $csv = mb_convert_encoding($csv, 'UTF-16LE', 'UTF-8');
		  //print $csv;
		  writeCSV($csv,$fileName);
		  session_destroy();
		  }
		  
		  function writeCSV($csv_data,$name){
			  // Delete Temp CSV Files - Older Than 1 Day
			$temp_csv_files = glob('*.csv');
			if (is_array($temp_csv_files) && sizeof($temp_csv_files)) {
				foreach ($temp_csv_files as $temp_csv_file) {
					if (is_file($temp_csv_file) && time() - filemtime($temp_csv_file) >= 24*60*60) { // 1 Day Old
						unlink($temp_csv_file);
						}
				}
			}
 
			// Write CSV To Disk
			//$csv_data = explode("\r\n", $_POST['csv_data']);
			$csv_file_name =  uniqid( $name.'_', true) .'.csv';
			try{
			$h = @fopen($csv_file_name, 'w') or die("Unable to open file!");
			if (false !== $h) {
				if (sizeof($csv_data)) {
					foreach ($csv_data as $csv_row) {
						fputcsv($h, $csv_row);
					}  
				}
				fclose($h);
			}
			var_dump(ini_get('allow_url_fopen'));
				//echo $csv_file_name;//file_exists($csv_file_name) ? $csv_file_name : '';
			}
			catch(Exception $e)
			{
				echo $e;
			}
			
		  }
?>