<?php

class JLA_model extends CI_Model {

        public function importData($csvname)
        {
		        return $csvname;
        }
	public function jlaimportCSV($file,$json,$extData,$separator=",",$extention,$prefix, $arrDuplicate, $dbunique){
 
			$arrDuplicateDBCols = array();

			$totalRows = 0;
			$batchName = "";
			$locSubstr="";
			$extData = stripslashes(urldecode($extData));
			$extData = substr($extData,1,-1);

			$obj = json_decode($extData);
			$extDataKeys = array_keys((array)$obj);	
			
			if($extention == "xls" || $extention == "xlsx"){
				
			   $worksheet = $this->excel_reader->read($file);
			   $excelArray = $this->excel_reader->sheets[0];
 			   $arrData = array_values($excelArray['cells']);
			   foreach ($arrData as &$value) {
					$value = array_values($value);
				}
				array_shift($arrData);
				//echo "<pre>";
				//print_r($arrData);
				//echo "</pre>";				
			}
			else{
				$arrData = $this->csvreader->parse_file($file,$separator);
				$arrData = array_values($arrData); // CREATE 0 BASED ARRAY SINCE CSVREADER CLASS RETURN 1 BASED ARRAY	
			}
			
			
			$totalFileRows = count($arrData);
			$arrDuplicate = (array)json_decode(urldecode($arrDuplicate));

			// VALIDATING COLUMN LEVEL DUPLICATION AND REMOVE SUCH DATA
			if(count($arrDuplicate) > 0){

				//for($i=0;$i<count($arrDuplicate);$i++){
				foreach ($arrDuplicate as $key => $value)
				{
					
					if($value == "unique"){
						
						$arrData = $this->unique_multidim_array($arrData,$key);			
					}
				}
			}
			//echo "<pre>";
			//print_r($arrData);
			//echo "</pre>";
			
			
			$strJSON = read_file($json);
		    $arrMeta = json_decode($strJSON);
 
			// PREPARE TABLE COLUMNS			 
			$mastersql = "insert into ".$arrMeta->PrimaryTable."( ";
			$cols = "";
			 for($i=0;$i<count($arrMeta->Columns);$i++){
				 if($arrMeta->PrimaryTable == $arrMeta->Columns[$i]->table)
				 {
					 $cols.=",".$arrMeta->Columns[$i]->dbcol;
						foreach ($arrDuplicate as $key => $value)
						{
							if($key == $i){
							if($value == "unique"){
								$arrDuplicateDBCols[] = array($i=>$arrMeta->Columns[$i]->dbcol);	 		
							}
							}
						}

				 }
			 }
			 
			 
			 
			// INSERT INTO tmp (COL,COL,COL) VALUES ('','',''), VALUES ('','',''), VALUES ('','','')			 
			 $cols = substr($cols, 1);
			 $mastersql.= $cols." )";
			 
			 // PREPARE TABLE ROWS
			 $rows = "";
			 $mastersql.=" SELECT "; //" VALUES ";
			$arrDataKeys = array_keys($arrData);
			$sql = "";		
			
			 for($i=0;$i<count($arrData);$i++){
					$sql = "";	
					$rows = "";				
					$sql.=$mastersql;

					for($j=0;$j<count($arrMeta->Columns);$j++){
						if($j!=0) $rows.=",";

						if($arrMeta->Columns[$j]->csvindex != "-1")
						{
							if($arrMeta->Columns[$j]->dbdatatype == "string")	
							{
								$rows.="'".$this->db->escape_str($arrData[$arrDataKeys[$i]][$j])."'";		
							}
							else
								$rows.="".$arrData[$arrDataKeys[$i]][$j]."";								
						}
						else
						{
							if(!is_object($extData))
							{
							$extData = json_decode($extData);
							}

							//echo ($extData->batchId);
							if($arrMeta->Columns[$j]->dbdatatype == "string")	
								$rows.="'".$this->db->escape_str($extData->{$arrMeta->Columns[$j]->dbcol})."'";	
							else
								$rows.="".$extData->{$arrMeta->Columns[$j]->dbcol}."";									
						}
						
					}	
					
					$sql.=($rows);
					$whr = "";

					for($k=0;$k<count($arrDuplicateDBCols);$k++){
						
							$keys = array_keys($arrDuplicateDBCols[$k]);
//					print_r($keys);
//					print_r($arrData);
//					echo ">>".$i."\n";
							if($arrMeta->Columns[$keys[0]]->dbdatatype == "string")
							{
								$whr.=" OR ".$arrDuplicateDBCols[$k][$keys[0]]." = '".$arrData[$arrDataKeys[$i]][$keys[0]]."'";
							}
							else{
								$whr.=" OR ".$arrDuplicateDBCols[$k][$keys[0]]." = ".$arrData[$i][$keys[0]];
							}
							
					}
					
					$whr = substr($whr,3);
					if($whr != ""){
						$sql.="  WHERE NOT EXISTS (SELECT * FROM ".$arrMeta->PrimaryTable." WHERE ".$whr.") LIMIT 1";
					} 
					 $db_debug = $this->db->db_debug;
					 $this->db->db_debug = true;
					 $result = $this->db->query($sql);
					 $this->db->db_debug = $db_debug;
					 $error = $this->db->error();
					$totalRows+=$this->db->affected_rows();
			 }

			$csvResult = array(
				"status"=>($error["code"] == "0")?true:false,
				"sql"=>$sql,
				"dberror"=>$error["message"],
				"totalRows"=>$totalFileRows,
				"successfulRows"=>$totalRows,
				"ignoredRows"=>(intval($totalFileRows)-($totalRows)),
				"mysqlerrorcode"=>$error,
				"batchName"=>$batchName,
				"batchAbr"=>$locSubstr
			);

				return $csvResult;
		}
}
?>