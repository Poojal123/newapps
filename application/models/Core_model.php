<?php

class Core_model extends CI_Model {


        public function __construct()
        {
                parent::__construct();
				
        }

		public function loginEmployees($params){

			$sql = "select coreusers.*,corerole.*, corefiles.filename from coreusers INNER JOIN corerole
												ON coreusers.roleId = corerole.roleId
												LEFT JOIN corefiles
												ON coreusers.imageId = corefiles.fileId
						 where coreusers.isDel=0 and emailId like '".$params['emailId']."' and passWord like '".$params['passWord']."'";
			$qparent = $this->db->query($sql);
			
			return $qparent;
		}

        public function getSections($id=0)
        {
				$sql = "select * from coresectionmaster";
				$sqlwhere = " WHERE isDel=0 ";		
				$params = $_REQUEST;
			 
				if($id!=0)
				{
					$sqlwhere.=" AND sectionId in( ".$id." )";
				}
				
				$sql.=$sqlwhere." ORDER BY sectionId ASC";		
				$qparent = $this->db->query($sql);
		        return $qparent->result();
        }


        public function getFields($id=0,$sectionId=0)
        {
				$sql = "select corefields.metaInfo as metai, corefields.*, 
								corefieldtypes.fieldType
								from corefields INNER JOIN corefieldtypes 
														ON corefields.fieldTypeId = corefieldtypes.fieldTypeId												
								";
				
				$sqlwhere = " WHERE isDel=0 ";		
				$params = $_REQUEST;
			 
				if($id!=0)
				{
					$sqlwhere.=" AND fieldId = ".$id;
				}
				
				if($sectionId!=0)
				{
					$sqlwhere.=" AND sectionId in ( ".$sectionId." )";
				}
				
				$sql.=$sqlwhere." ORDER BY row,col ASC";
				
//echo $sql;
						
				$qparent = $this->db->query($sql);
				
				$result = $qparent->result();
				for($i=0;$i<count($result);$i++){
						$result[$i]->metaInfo = json_decode($result[$i]->metaInfo);
				}
		        return $result;
        }

		public function setFields($keyFields,$arrFields,$whr){
			
//			print_r($arrFields);
//			print_r($keyFields);
			
			//1. GET TABLE NAMES
			$arrTable = array();
			for($i=0;$i<count($keyFields);$i++)
			{
				$tmp = explode("__",$keyFields[$i]);
				if(isset($tmp[0]))	$arrTable[] = $tmp[0];
			}
			$arrTable = array_unique($arrTable);
			//print_r($arrTable);
			
			// CREATE UPDATE QUERIES FOR EACH TABLE
			for($i=0;$i<count($arrTable);$i++){
				if($whr != ""){
					$tmp = explode("__",$keyFields[0]);
					//print_r($arrTable);
					 $sql = "UPDATE ".$arrTable[$i]." SET ".$tmp[1]." = '".$arrFields[$keyFields[0]]."' ";					
					
					for($j=1;$j<count($keyFields);$j++){
						if($keyFields[$j]!=""){
							$tmp = explode("__",$keyFields[$j]);
							if($tmp[0] == $arrTable[$i]){
								if(is_array($arrFields[$keyFields[$j]])){
									
									if(count($arrFields[$keyFields[$j]]) > 0){
									//print_r($arrFields);
									$sql.=", ".$tmp[1]." = '".$arrFields[$keyFields[$j]]["dbval"]."'";
									
									}
									
								}else{
									
									$sql.=", ".$tmp[1]." = '".$arrFields[$keyFields[$j]]."'";
								}
							}
						}
						
					}
					$sql.=" where 1=1 ".$whr;

				}else{
					$sql = "INSERT INTO ".$arrTable[$i]." ( "; //.implode(",",$keyFields).") values( ";
					for($j=0;$j<count($keyFields);$j++){
						if($keyFields[$j]!=""){
							$tmp = explode("__",$keyFields[$j]);
							if($tmp[0] == $arrTable[$i]){
								//$sql.=$keyFields[$j].",";
								$sql.=$tmp[1].",";
							}
						}
					}
					$sql = substr($sql, 0, -1);
					$sql.=" ) VALUES ( ";
					
					$sqlcols="";
					for($j=0;$j<count($keyFields);$j++){
						if($keyFields[$j]!=""){
							$tmp = explode("__",$keyFields[$i]);
							if($tmp[0] == $arrTable[$i]){
								$sqlcols.="'".$arrFields[$keyFields[$j]]."',";
							}
						}
					}					
					$sqlcols = substr($sqlcols, 0, -1);
					$sql.=$sqlcols." )";
				}
				
				$this->db->query($sql);
			}
			
		}

		public function getValidationsString($table, $cols, $whr){
				$sql = "select GROUP_CONCAT($cols  SEPARATOR ', ') as val from $table where 1=1 $whr";
				$qparent = $this->db->query($sql);
		        return $qparent->result();
		}
		
		public function getFolderPath($folder, $isURL=false){
			 $sql = "select * from corefolders where folderConstant like '".$folder."'";
			 $qsourcePath = $this->db->query($sql);
			 $folderPath = $qsourcePath->result();
			 $folderPath = str_replace("/",SEPARATOR,$folderPath);
			 $folderPath = str_replace("\\",SEPARATOR,$folderPath);			 
				if ($isURL){
					return URL_STORAGE_ROOT.$folderPath[0]->folderPath; 						 
				}else{
					return STORAGE_ROOT.$folderPath[0]->folderPath; 		
				}
			 

		}
		
		function unique_multidim_array($array, $key){
		$temp_array = array();
		$i = 0;
		$key_array = array();
		
		foreach($array as $val){

			if($val[$key] != ""){
				if(!in_array($val[$key],$key_array) ){
					$key_array[$i] = $val[$key];
					$temp_array[$i] = $val;
				}	
			}
			else{
					$key_array[$i] = "";
					$temp_array[$i] = $val;
			}
			$i++;
			
			
		}

		return $temp_array; 
		
	}
		
		public function importCSVUni($file,$json,$extData,$separator=",",$extention,$prefix, $arrDuplicate, $dbunique){
 
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
			
			if($prefix==true)
			{  
				$locSubstr=strtoupper(substr($arrData[0][2],0,3));
				$getLoc="SELECT * FROM corebatchmaster where batchAlias like ('$locSubstr%') ORDER BY corebatchmaster.batchAlias DESC limit 1 ";
				$result=$this->db->query($getLoc)->result();
				//$objresult = json_decode($resultgetcount);
				if(count($result)>0)
				{
					$getStr=explode("_",$result[0]->batchAlias);
					$total=intval($getStr[1])+1;
				}
				else
				{
					$total=1;
				}
				$batchAlias="update corebatchmaster set batchAlias='".$locSubstr."_".$total."' where batchId=".$obj->batchId;
				$resultbatchAlias=$this->db->query($batchAlias);
				$batchName=$locSubstr."_".$total;
			
			}
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

		public function importCSV($file,$json,$extData,$separator,$extention,$prefix){
			$totalRows = 0;
			$batchName = "";
			$locSubstr="";
			$extData = stripslashes(urldecode($extData));
			$extData = substr($extData,1,-1);

			$obj = json_decode($extData);
			$extDataKeys = array_keys((array)$obj);	
			$arrData = $this->csvreader->parse_file($file,$separator);
			
			$arrData = array_values($arrData); 
                        print_r($arrData);
    // CREATE 0 BASED ARRAY SINCE CSVREADER CLASS RETURN 1 BASED ARRAY
			if($prefix==true)
			{  
				$locSubstr=strtoupper(substr($arrData[0][2],0,3));
				$getLoc="SELECT * FROM corebatchmaster where batchAlias like ('$locSubstr%') ORDER BY corebatchmaster.batchAlias DESC limit 1 ";
				$result=$this->db->query($getLoc)->result();
				//$objresult = json_decode($resultgetcount);
				if(count($result)>0)
				{
					$getStr=explode("_",$result[0]->batchAlias);
					$total=intval($getStr[1])+1;
				}
				else
				{
					$total=1;
				}
				$batchAlias="update corebatchmaster set batchAlias='".$locSubstr."_".$total."' where batchId=".$obj->batchId;
				$resultbatchAlias=$this->db->query($batchAlias);
				$batchName=$locSubstr."_".$total;
			
			}
			$strJSON = read_file($json);
		    $arrMeta = json_decode($strJSON);
				
			// PREPARE TABLE COLUMNS			 
			$sql = "insert into ".$arrMeta->PrimaryTable."( ";
			$cols = "";
			 for($i=0;$i<count($arrMeta->Columns);$i++){
				 if($arrMeta->PrimaryTable == $arrMeta->Columns[$i]->table)
				 {
					 $cols.=",".$arrMeta->Columns[$i]->dbcol;
				 }
			 }
			 
			 
			 
			// INSERT INTO tmp (COL,COL,COL) VALUES ('','',''), VALUES ('','',''), VALUES ('','','')			 
			 $cols = substr($cols, 1);
			 $sql.= $cols." )";
			 
			 // PREPARE TABLE ROWS
			 $rows = "";
			 $sql.=" VALUES ";
			 
			 for($i=0;$i<count($arrData);$i++){
					$sql.="";
					if($i!=0) $rows = ", "; 
					$rows.="(";
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
						if($j!=0) $rows.=",";

						if($arrMeta->Columns[$j]->csvindex != "-1")
						{
							if($arrMeta->Columns[$j]->dbdatatype == "string")	
							
								$rows.="'".$this->db->escape_str($arrData[$i][$j])."'";	
							else
								$rows.="".$arrData[$i][$j]."";								
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
					$totalRows++;				 
					$rows.=")";	 	 
					$sql.=($rows);
			 }
			 
			 
			 $db_debug = $this->db->db_debug;
			 $this->db->db_debug = FALSE;
			 $result = $this->db->query($sql);
			 $this->db->db_debug = $db_debug;
			 $error = $this->db->error();
			
			$csvResult = array(
				"status"=>($error["code"] == "0")?true:false,
				"sql"=>$sql,
				"dberror"=>$error["message"],
				"totalRows"=>$totalRows,
				"mysqlerrorcode"=>$error,
				"batchName"=>$batchName,
				"batchAbr"=>$locSubstr
			);

				return $csvResult;
		}
		
		
public function importExcel($file,$json,$extData,$separator=",",$extention){
   $totalRows = 0;
   //echo $file;
   $extData = stripslashes(urldecode($extData));
   $extData = substr($extData,1,-1);
   $obj = json_decode($extData);
   $extDataKeys = array_keys((array)$obj); 
   //$arrData = $this->csvreader->parse_file($file,$separator);
   $worksheet = $this->excel_reader->read($file);
   //var_dump($worksheet);
   $excelArray = $this->excel_reader->sheets[0];
   $data = $excelArray['cells'];
  	//$excelArray = $excelArray['cells'];
//echo "<pre>"; print_r($data); echo "</pre>";     
  // foreach($data as $arrData1){}
   //echo $file;   
   $arrData = array_values($data); // CREATE 0 BASED ARRAY SINCE CSVREADER CLASS RETURN 1 BASED ARRAY
 
   $strJSON = read_file($json);   
      $arrMeta = json_decode($strJSON);
  $total=count($arrData);
   //echo "<pre>";print_r($arrMeta->Columns);echo "</pre>";
   $dup=0; 
   $uniqueRecords=0;
   if($arrMeta->PrimaryTable=='ccpromocodemaster')
   {
	   		//echo "<pre>"; print_r(count($arrData)); echo "</pre>";
	       	for($i=1;$i<count($arrData);$i++){
				$selsql="select logoId from cclogomaster where logoCode='".$arrData[$i][2]."'";
				$getRslt=$this->db->query($selsql)->result();
   		 		$get="select promoCode,logoId from ccpromocodemaster where promoCode='".$arrData[$i][1]."'
		 		and logoId='".$getRslt[0]->logoId."'";   
				$qparent=$this->db->query($get)->result();
				if(count($qparent)>0)
				{
					//print_r($i);
					//print_r(count($qparent));
					$dup++;
					unset($arrData[$i]);
					//$dup++;
				}
				$arrData = array_values($arrData);
				
			}
		
     $sql = "insert into ".$arrMeta->PrimaryTable."( `promoId`, `promoCode`, `logoId`, `promoDescription`, `flag`, `modifyOn`, `modifyBy`";
     $cols = "";
     $cols = substr($cols, 1);
     $sql.= $cols." )";
      
      // PREPARE TABLE ROWS
      $rows = "";
      $sql.=" VALUES ";
    
     //echo count($arrData);
    // echo "<pre>"; print_r($arrData); echo "</pre>";
     for($i=1;$i<count($arrData);$i++)
     {
	//	 echo $i;
		 if(!empty($arrData[$i]))
		 {
     		 $sql.="";
       		
			if($i!=1) $rows = ","; 
      	 
      	$rows.="('',";
       //if($j!=0)  $rows.=",";
	   //print_r($arrData);        
         $promoCode = trim($arrData[$i][1]);    
         $logo = trim($arrData[$i][2]);
         
          $sql_query = "SELECT * FROM `cclogomaster` WHERE `logoCode`=".$logo;
         $sql_query_result = $this->db->query($sql_query)->result();
         
         
         foreach($sql_query_result as $result){}
         
        // echo "---<pre>"; print_r($result); echo "</pre>";
         $logoID = $result->logoId;
         if(($arrData[$i][3])=="Y")
         {
          $flag='N';
         }
         if(($arrData[$i][4])=='Y')
         {
          $flag='P';
         }
         if(($arrData[$i][5])=='Y')
         {
          $flag='B';
         }
         if(($arrData[$i][6])=='Y')
         {
          $flag='S';
         }
      
         $promoDescription = trim($arrData[$i][7]);
         $modifyOn= trim($arrData[$i][8]);
         $modifyBy = trim($arrData[$i][9]); 
         $rows.="'".$this->db->escape_str($arrData[$i][1])."',";
         $rows.="'".$this->db->escape_str($logoID)."',";
         $rows.="'".$this->db->escape_str($flag)."',";
         $rows.="'".$this->db->escape_str($arrData[$i][7])."',";         
         $rows.="'".$this->db->escape_str($arrData[$i][8])."',";
         $rows.="'".$this->db->escape_str($arrData[$i][9])."'";
         $rows.=")";
         //$rows.=",";
        
        
         
     	$sql.=($rows);
		 
		$uniqueRecords++;
		 }
		  $totalRows++;
     }
     //echo $sql;
     $db_debug = $this->db->db_debug;
      $this->db->db_debug = FALSE;
      $result = $this->db->query($sql);
      $this->db->db_debug = $db_debug;
      $error = $this->db->error();
      $csvResult = array(
      "status"=>($error["code"] == "0")?true:false,
      "sql"=>$sql,
      "dberror"=>$error["message"],
      "totalRows"=>$totalRows,
      "mysqlerrorcode"=>$error,
	  "duplicate"=>$dup,
	  "Total"=>$total);
  //print_r($csvResult);
      return $csvResult;
    
   }
  
   else
   {
	  
	   if($arrMeta->PrimaryTable=='cccompanymaster')
	   {
		   //print_r(count($arrData));
		   
		    for($i=1;$i<count($arrData);$i++){
   		 $get="select companyCode from cccompanymaster where companyCode='".$arrData[$i][1]."'";   
				$qparent=$this->db->query($get)->result();
				if(count($qparent)>0)
				{
					//print_r($i);
				//	print_r(count($qparent));
					$dup++;
					unset($arrData[$i]);
					//$dup++;
				}
				else
				{
					
				
				}
				
			}
			
			
	   }
	  
	  	if($arrMeta->PrimaryTable=='ccdmamaster')
	   {
		   //print_r(count($arrData));
		   
		    for($i=1;$i<count($arrData);$i++){
   			$get="select dmaCode from ccdmamaster where dmaCode='".$arrData[$i][1]."'";   
				$qparent=$this->db->query($get)->result();
				if(count($qparent)>0)
				{
					//print_r($i);
				//	pr/int_r(count($qparent));
					$dup++;
					unset($arrData[$i]);
					//$dup++;
				}
				else
				{
					
				
				}
				
			}
			
			
	   }
	   
	    if($arrMeta->PrimaryTable=='ccimagetypemaster')
	   {
		   
		   
		    for($i=1;$i<count($arrData);$i++){
   			$get="select imageId from ccimagetypemaster where imageId='".$arrData[$i][1]."'";   
				$qparent=$this->db->query($get)->result();
				if(count($qparent)>0)
				{
					//print_r($i);
				//	print_r(count($qparent));
					$dup++;
					unset($arrData[$i]);
					//$dup++;
				}
				else
				{
					
				
				}
				
			}
			
			
	   }
	   
	   if($arrMeta->PrimaryTable=='ccpincodemasternew')
	   {
		
		   
		    for($i=1;$i<count($arrData);$i++){
   		 $get="select pincode from ccpincodemasternew where pincode='".$arrData[$i][1]."'";   
				$qparent=$this->db->query($get)->result();
				if(count($qparent)>0)
				{
					//print_r($i);
				//	print_r(count($qparent));
					$dup++;
					unset($arrData[$i]);
					//$dup++;
				}
				else
				{
					
				
				}
				
			}
			
			
	   }
	   
	   if($arrMeta->PrimaryTable=='ccpricemaster')
	   {
		
		   
		    for($i=1;$i<count($arrData);$i++){
				$selsql="select logoId from cclogomaster where logoCode='".$arrData[$i][2]."'";
				$getRslt=$this->db->query($selsql)->result();
				if(!empty($getRslt))
				{
   		 		$get="select priceCode,logoId from ccpricemaster where priceCode='".$arrData[$i][1]."'
		 		and logoId='".$getRslt[0]->logoId."'";   
				$qparent=$this->db->query($get)->result();
				
				if(count($qparent)>0)
				{
					//print_r($i);
				//	print_r(count($qparent));
					$dup++;
					unset($arrData[$i]);
					//$dup++;
				}
			}
				else
				{
					
				
				}
				
			}
			
			
	   }
	   
	   if($arrMeta->PrimaryTable=='ccsurrogatecodemaster')
	   {
		   //print_r(count($arrData));
		   
		    for($i=1;$i<count($arrData);$i++){
   			$get="select surrogateCode from ccsurrogatecodemaster where surrogateCode='".$arrData[$i][1]."'";   
				$qparent=$this->db->query($get)->result();
				if(count($qparent)>0)
				{
					//print_r($i);
				//	print_r(count($qparent));
					$dup++;
					unset($arrData[$i]);
					//$dup++;
				}
				else
				{
					
				
				}
				
			}
			
			
	   }
	   
	   if($arrMeta->PrimaryTable=='cctiercodemaster')
	   {
			   
		    for($i=1;$i<count($arrData);$i++){
				//print_r($arrData[$i]);
   		 		$get="select coCode,tierType from cctiercodemaster where coCode='".$arrData[$i][1]."'
		 		and tierType='".$arrData[$i][2]."'";   
				$qparent=$this->db->query($get)->result();
				if(count($qparent)>0)
				{
					//print_r($i);
				//	print_r(count($qparent));
					$dup++;
					unset($arrData[$i]);
					//$dup++;
				}
				else
				{
					
				
				}
				
			}
			
			
	   }
	  
	   if($arrMeta->PrimaryTable=='cclogomaster')
	   {
		  
		    for($i=1;$i<count($arrData);$i++){
   				 $get="select logoCode from cclogomaster where logoCode=".$arrData[$i][1];   
				$qparent=$this->db->query($get)->result();
				
				if(count($qparent)>0)
				{
					
					$dup++;
					unset($arrData[$i]);
				}
				
			
			}
			$arrData = array_values($arrData);
			
	   }
	   
	     // PREPARE TABLE COLUMNS
     // echo "<pre>"; print_r($arrMeta); echo "</pre>";

	$arrData=array_values($arrData);
	
	$sql = "insert into ".$arrMeta->PrimaryTable."( ";
   $cols = "";
 //  echo "in else";
  
	for($i=1;$i<count($arrMeta->Columns);$i++){
     if($arrMeta->PrimaryTable == $arrMeta->Columns[$i]->table)
     {
     $cols.=",".$arrMeta->Columns[$i]->dbcol;
      }
    }
   // echo "<pre>"; print_r($cols); echo "</pre>";
  
   
   // INSERT INTO tmp (COL,COL,COL) VALUES ('','',''), VALUES ('','',''), VALUES ('','','')    
    $cols = substr($cols, 1);
    $sql.= $cols." )";
    
    // PREPARE TABLE ROWS
    $rows = "";
     $sql.=" VALUES ";
   
    for($i=1;$i<count($arrData);$i++){
		//echo $arrMeta->PrimaryTable;
		
  // echo "<pre>"; print_r($arrData[$i]); echo "</pre>";

    if(!empty($arrData[$i]))
	{		
	
	 	$sql.="";
     	if($i!=1) $rows = ", "; 
     	$rows.="(";
     	for($j=1;$j<count($arrMeta->Columns);$j++){
      	if($j!=1)  $rows.=","; 
      	if($arrMeta->Columns[$j]->csvindex != "-1")
      	{ 
       		if($arrMeta->Columns[$j]->dbdatatype == "string")
       		{ 
			if(!empty($arrData[$i][$j]))
			{
			 $rows.="'".$this->db->escape_str($arrData[$i][$j])."'";         
			}
			else
			{
				$rows.="''";
			}
			}
	   		if($arrMeta->PrimaryTable=="ccpricemaster")
        	{
			  $LogoCode="'".$arrData[$i][2]."'";
			//  echo $LogoCode;
			 $sql_query = "SELECT logoId FROM `cclogomaster` WHERE `logoCode`=".$LogoCode;
			  $sql_query_result = $this->db->query($sql_query)->result();
			  
			// print_r($sql_query_result);
			  foreach($sql_query_result as $result){}
			 // echo "<pre>"; print_r($result); echo "</pre>";
			  $logoID = $result->logoId;
			  if($j==2)
			  {
				$rows.="'".$logoID."'"; 
			  }
			  else
			  {          
			   $rows.="'".$arrData[$i][$j]."'";
			  }
        }
        
      }
     
	 else
      { 
       if(!is_object($extData))
       {
     	  $extData = json_decode($extData);
       }
       if($arrMeta->Columns[$j]->dbdatatype == "string") {
        $rows.="'".$this->db->escape_str($extData->{$arrMeta->Columns[$j]->dbcol})."'"; }
       else{
        $rows.="'".$extData->{$arrMeta->Columns[$j]->dbcol}."'";}         
      }
	 }
	 
     $rows.=")";    
     $sql.=($rows);
	// echo $sql;
      $totalRows++;

	 } 
	 // $totalRows++; 
            }
   
   //else close
   //echo  $sql;
    $db_debug = $this->db->db_debug;
    $this->db->db_debug = FALSE;
    $result = $this->db->query($sql);
    $this->db->db_debug = $db_debug;
    $error = $this->db->error();
    $csvResult = array(
    "status"=>($error["code"] == "0")?true:false,
    "dberror"=>$error["message"],
    "totalRows"=>$totalRows,
    "mysqlerrorcode"=>$error,
	"duplicate"=>$dup,
	"Total"=>$total);

  return $csvResult;
   
  }
  }
		public function importExcel_1($file,$json,$extData,$separator=",",$extention){
			$totalRows = 0;
			
			$extData = stripslashes(urldecode($extData));
			$extData = substr($extData,1,-1);

			$obj = json_decode($extData);
			$extDataKeys = array_keys((array)$obj);	
			//$arrData = $this->csvreader->parse_file($file,$separator);
			$arrData = $this->excel_reader->read($file);
			print_r($arrData);
			$arrData = array_values($arrData); // CREATE 0 BASED ARRAY SINCE CSVREADER CLASS RETURN 1 BASED ARRAY
			
			$strJSON = read_file($json);
		    $arrMeta = json_decode($strJSON);
				
			// PREPARE TABLE COLUMNS			 
			$sql = "insert into ".$arrMeta->PrimaryTable."( ";
			$cols = "";
			 for($i=0;$i<count($arrMeta->Columns);$i++){
				 if($arrMeta->PrimaryTable == $arrMeta->Columns[$i]->table)
				 {
					 $cols.=",".$arrMeta->Columns[$i]->dbcol;
				 }
			 }
			 
			 
			 
			// INSERT INTO tmp (COL,COL,COL) VALUES ('','',''), VALUES ('','',''), VALUES ('','','')			 
			 $cols = substr($cols, 1);
			 $sql.= $cols." )";
			 
			 // PREPARE TABLE ROWS
			 $rows = "";
			 $sql.=" VALUES ";
			 
			 for($i=0;$i<count($arrData);$i++){
					$sql.="";
					if($i!=0) $rows = ", "; 
					$rows.="(";
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
						if($j!=0) $rows.=",";

						if($arrMeta->Columns[$j]->csvindex != "-1")
						{
							if($arrMeta->Columns[$j]->dbdatatype == "string")	
							
								$rows.="'".$this->db->escape_str($arrData[$i][$j])."'";	
							else
								$rows.="".$arrData[$i][$j]."";								
						}
						else
						{
							if(!is_object($extData))
							{
							$extData = json_decode($extData);
							}

//							echo ($extData->batchId);
							if($arrMeta->Columns[$j]->dbdatatype == "string")	
								$rows.="'".$this->db->escape_str($extData->{$arrMeta->Columns[$j]->dbcol})."'";	
							else
								$rows.="".$extData->{$arrMeta->Columns[$j]->dbcol}."";									
						}
						
					}	
					$totalRows++;				 
					$rows.=")";	 	 
					$sql.=($rows);
			 }
			 
			 $db_debug = $this->db->db_debug;
			 $this->db->db_debug = FALSE;
			 $result = $this->db->query($sql);
			 $this->db->db_debug = $db_debug;
			 $error = $this->db->error();
			$csvResult = array(
				"status"=>($error["code"] == "0")?true:false,
				"sql"=>$sql,
				"dberror"=>$error["message"],
				"totalRows"=>$totalRows,
				"mysqlerrorcode"=>$error);

				return $csvResult;
		}
		
		public function exportCSV($json,$sql,$filename="export",$delimiter=",",$newline="\r\n",$enclosure='"',$ext=".csv"){
				$q = $this->db->query($sql);
				$this->load->dbutil();
				$data = $this->dbutil->csv_from_result($q, $delimiter, $newline, $enclosure); 
				$this->load->helper('download');
				force_download($filename.$ext, $data);

		}
		
        public function getMenu($parentId=0, $roleId=0, $system=0)
        {
				$menus = array();
				
//				$sql = "select * from coremenu where parentId = $parentId ORDER BY priority ASC";
				$sql = "select DISTINCT t1.menuId, t1.name, t2.parentId from coremenu t1, corerolemodule t2 
							 where 
							 t1.menuId = t2.parentId AND
							 t2.roleId = ".$roleId." AND
							 t1.parentId = ".$parentId." ORDER BY priority ASC
						";
				//echo $sql;
				if($system == 1){
					$sql = "select * from coremenu where parentId = $parentId ORDER BY priority ASC";	
				}
						
				$params = $_REQUEST;

				$qparent = $this->db->query($sql);
				$resultParent = $qparent->result();
		        for($i=0;$i<count($resultParent);$i++)
				{
					$menus[] = $resultParent[$i];
					$this->getChildMenu($resultParent[$i], $roleId,$system);
					
				}
				
				return $menus;
        }

		public function getChildMenu(&$menu, $roleId, $system){
					$menu->child = array();
//					$sql = "select * from coremenu where parentId = ".$menu->menuId." ORDER BY priority ASC";
					$sql = "select DISTINCT t1.menuId, t1.name, t2.parentId, t1.url from coremenu t1, corerolemodule t2  
								 where 
								 t1.menuId = t2.menuId AND
								 t2.roleId = ".$roleId." AND
								 t1.parentId = ".$menu->menuId." ORDER BY priority ASC
							";

					if($system == 1){
						$sql = "select * from coremenu where parentId = ".$menu->menuId." ORDER BY priority ASC";
					}

					$qchild = $this->db->query($sql);
					if($qchild->num_rows() > 0)
					{
						$resultChild = $qchild->result();
						$menu->child = $resultChild;
						for($j=0;$j<count($resultChild);$j++){
							$this->getChildMenu($resultChild[$j], $resultChild[$j]->menuId, $system);							
						}

					}
					
		}
		
		public function generateBatch($appId, $batchId, $uploadedBy){
		//	echo ">>>".$uploadedBy;
			$newBachId = "0";
			$sql = "select MAX(CONVERT(batchNo, SIGNED INTEGER)) as lastBatch from corebatchmaster";
			$qchild = $this->db->query($sql);
			if($qchild->num_rows() > 0)
			{
				$resultChild = $qchild->result();
				$newBatchId = $resultChild[0]->lastBatch;
				
			}
			$newBatchId++;
			
				$sql = "insert into corebatchmaster (batchNo, batchDate, appId,uploadedBy) values('".$newBatchId."',NOW(),".$appId.",".$uploadedBy.")";
			//	echo $sql;
				$this->db->query($sql);
				return $this->db->insert_id();
			
		}
		
		
        public function getDDL($tbl,$dbval,$lblval,$whr,$sql)
        {
		//	echo $tbl.":".$dbval;
//				$sql = "select *, vFullName as displaylabel from tbl where .."
					  
				$sql = urldecode($sql);
				$whr = urldecode($whr);
//echo "THIS IS SQL:".$sql;
				
				if($sql==""){
			
					$sql = "select *, ".$lblval." as displaylabel from ".$tbl;
					if($whr!=""){
					$sql.= " WHERE 1=1 ".$whr;		
					}
				}
				


				$qparent = $this->db->query($sql);

		        return $qparent->result();
        }

        public function getTable($tbl,$whr)
        {
			
				$sql = "select * from ".$tbl." where 1=1 ".urldecode ($whr);
				$qparent = $this->db->query($sql);
		        return $qparent->result();
        }

        public function setTable($table, $val, $primary)
        {
			$arrCols = array_keys($val);
			$arrWhrCols = array_keys($primary);
			$sql = "";
				if(count($primary) > 0)
				{
					$sql = "update ".$table." set ";			
					$fields = "";
					
					for($i=0;$i<count($val);$i++){
						if($val[$arrCols[$i]] == "NOW()"){
						$fields.=",".$arrCols[$i]." = ".$val[$arrCols[$i]]."";	
						}else{
						$fields.=",".$arrCols[$i]." = '".$val[$arrCols[$i]]."'";	
						}
						
					}
					$fields = substr($fields, 1);
					$sql.=$fields;
					
					$sql .= " where 1=1 ";
					$arrWhr = "";
					for($i=0;$i<count($arrWhrCols);$i++){
						$arrWhr.=" and ".$arrWhrCols[$i]." = '".$primary[$arrWhrCols[$i]]."'";
					}
					
					$sql.=$arrWhr;
					
				}
				else
				{
					$sql = "insert into ".$table."( ";
					$cols = "";
					for($i=0;$i<count($val);$i++){
						$cols.=",".$arrCols[$i];
					}
					$cols = substr($cols, 1);
					$sql.=$cols.") values(";


					$vals = "";
					for($i=0;$i<count($val);$i++){
						if($val[$arrCols[$i]] == "NOW()"){
							$vals.=",".$val[$arrCols[$i]]."";								
						}else
						{
							$vals.=",'".$val[$arrCols[$i]]."'";	
						}
						
					}
					$vals = substr($vals, 1);
					$sql.=$vals.")";

				}
//echo $sql;
				$qparent = $this->db->query($sql);
		    	return true;
        }
		
		
		
		public function deleteTable($table,$delkey,$delval){
				
				$sql = "delete  from ".$table." where 1=1 ";
				
				$sql.=" and ".$delkey." = '".$delval."'";
				
//echo $sql;
				$qparent = $this->db->query($sql);
		    	return true;
				
		}


      public function getContracts()
        {
				$sql = "select * from corecontracts INNER JOIN corecompany ON corecontracts.companyId = corecompany.companyId INNER JOIN coreapps ON corecontracts.appId = coreapps.appId";
				
				$qparent = $this->db->query($sql);
		        return $qparent->result();
        }

	public function setContracts($contractId,$title, $compId, $appId){
		if($contractId == "0"){
			$sql = "insert into corecontracts (contractTitle, companyId, appId) values ('".$title."',".$compId.",".$appId.")";	
		}
		else{
			$sql = "update corecontracts set contractTitle='".$title."', companyId=".$compId.", appId=".$appId." where contractId = ".$contractId;	
			
		}
//		echo $sql;
		$qparent = $this->db->query($sql);
		return true;
	}
	
	function deleteContract($id){
		
		$sql = "delete from coreContracts where contractId=".$id;		
		$qparent = $this->db->query($sql);
		return true;
	}
	
	public function getUsers()
	{
			$sql = "select * from coreusers 
						INNER JOIN corerole
								ON coreusers.roleId = corerole.roleId
						LEFT JOIN corefiles 
								ON coreusers.imageId = corefiles.fileId 
						LEFT JOIN corelocations
								ON coreusers.locationId = corelocations.locationId
						LEFT JOIN coreregions
								ON corelocations.regionId = coreregions.regionId
						WHERE coreusers.isDel=0";			
			$qparent = $this->db->query($sql);
			return $qparent->result();
	}

	public function setUser($params){
		if($params["userId"]!="0"){
			$sql = "update coreusers set fullName='".$params['fullName']."', emailId='".$params['emailId']."', passWord='".$params['passWord']."', imageId=".$params['imageId'].", gender='".$params['gender']."', isDel=0, dateOfBirth='".$params['dateOfBirth']."', roleId=".$params["roleId"].", locationId=".$params["locationId"]." where userId=".$params["userId"];
		}
		else{
			
			$sql = "insert into coreusers (fullName, emailId, passWord, imageId, gender, dateOfBirth, roleId,locationId) values 
			('".$params["fullName"]."','".$params["emailId"]."','".$params["passWord"]."',".$params["imageId"].",'".$params["gender"]."','".$params["dateOfBirth"]."',".$params["roleId"].",".$params["locationId"].")";	
		}

		$qparent = $this->db->query($sql);
		return true;
	}

	public function registerFile($filename){
			$sql = "insert into corefiles (filename, fileheaders, creationdate) values 
			('".$filename."','',NOW())";	

		$qparent = $this->db->query($sql);
		return $this->db->insert_id();
	}

	public function deleteUser($id){

		$sql = "update coreusers set isDel=1 where userId=".$id;	
		$qparent = $this->db->query($sql);
		return $this->db->insert_id();
	}
	
	public function updateRoleModules($roleId, $modules, $parent){
		$qempty = $this->db->query("delete from corerolemodule where roleId=".$roleId." and menuId in (select menuId from coremenu where parentId=".$parent.")");	
		$arrModules = explode(",",$modules);
//		print_r($arrModules);
		if(count($arrModules) > 0){
		for($i=0;$i<count($arrModules);$i++)
		{
			if($arrModules[$i]!=""){
			 $this->db->query("insert into corerolemodule (roleId, menuId, parentId)  values (".$roleId.",".$arrModules[$i].",".$parent.")");	
			}
		}
		}
		return true;
	}

	public function updateContractUsers($contractId, $users){
//		echo $users;
		$qempty = $this->db->query("delete from corecontractusers where contractId=".$contractId);	
		$arrUser = explode(",",$users);
		if(count($arrUser) > 0){
		for($i=0;$i<count($arrUser);$i++)
		{
			if($arrUser[$i]!=""){
//				echo "insert into corecontractusers (contractId, userId, allocateDate)  values (".$contractId.",".$arrUser[$i].", NOW())";
			 $this->db->query("insert into corecontractusers (contractId, userId, allocateDate)  values (".$contractId.",".$arrUser[$i].", NOW())");	
			}
		}
		}
		return true;
	}

	public function getContractUsers($contractId)
	{
			$sql = "select 
						(case when (contractuserId IS null ) 
						 THEN
							  'Available'
						 ELSE
							  'Allocated'
						 END)
						as allocationStatus,						
						coreusers.userId as coreuserId, coreusers.*, corerole.*, corefiles.*, corelocations.*, 
						
						coreregions.*, corecontractusers.* from coreusers 
						
						INNER JOIN corerole
								ON coreusers.roleId = corerole.roleId
						LEFT JOIN corefiles 
								ON coreusers.imageId = corefiles.fileId 
						LEFT JOIN corelocations
								ON coreusers.locationId = corelocations.locationId
						LEFT JOIN coreregions
								ON corelocations.regionId = coreregions.regionId
                        LEFT JOIN corecontractusers
                        		ON corecontractusers.userId = coreusers.userId
						WHERE 	coreusers.isDel=0";
						if($contractId != "0"){
								$sql.=" AND (corecontractusers.contractId = ".$contractId." OR corecontractusers.contractId IS null)";			
						}
//						echo $sql;
			$qparent = $this->db->query($sql);
			return $qparent->result();
	}

	public function getFieldsProcess($fieldIds, $processId)
	{
			$sql = "select * from coreprocessfieldsenable where processId=".$processId." and fieldId in (".$fieldIds.")";
					//echo $sql;
			$qparent = $this->db->query($sql);
			return $qparent->result();
	}
	public function getPrePopulated($fieldIds, $recordId)
	{				
			$arrCols = array();
			$sql = "select * from corefields where fieldId in (".$fieldIds.")";
//echo $sql;
			$qparent = $this->db->query($sql);
			$cols = $qparent->result();
			for($i=0;$i<count($cols);$i++){
				$model = $cols[$i]->model;
//				echo $model;
				$arrModel = explode("__",$model);
				if(isset($arrModel[1])){
					$arrCols[]=$arrModel[1];		
				}				
			}
			
			$sqlCols = implode(",",$arrCols);
			$sql = "select ".$sqlCols." from ccdataentry where entryId=".$recordId." limit 0,1";
//			$sql = "select ".$sqlCols." from tmpplayground where playgroundId=".$recordId." limit 0,1";
			$qparent = $this->db->query($sql);
			return $qparent->result();

	}
	
	public function setFieldsProcess($params)
	{
		$this->db->query("delete from coreprocessfieldsenable where processId = ".$params["ProcessId"]." and fieldId in (".$params["FieldIds"].")");
		$sql = "";
		$fields = $params["Fields"];

		for($i=0;$i<count($fields);$i++)
		{

			if($fields[$i]['isEnabled'] == "1")
			{
				$sql="insert into coreprocessfieldsenable (processId, fieldId, enable, prepopulated, validation) values";				
				$sql.="(".$params["ProcessId"].",".$fields[$i]['fieldId'].",1"; // ENABLED
				
				($fields[$i]['isPrePopulated'] == "1")?$sql.=",1":$sql.=",0"; // PREPOPLUATED
				($fields[$i]['isValidated'] == "1")?$sql.=",1":$sql.=",0"; // PREPOPLUATED
								
				$sql.=")";
				
				$this->db->query($sql);
			}
		}
	}
	

	
	public function deleteContractUsers($contractId, $users){

		$qempty = $this->db->query("delete from corecontractusers where contractId=".$contractId." and userId in (".$users.")");	
		return true;
	}


	public function getEmailId($emailId)
	{
			require 'assets//lib//phpmailer//PHPMailerAutoload.php';
			$sql ="select * from coreusers where emailId='".$emailId."'";
			$parent = $this->db->query($sql);
			 
			 if($parent->num_rows()>0)
			 {
				$this->load->helper('string');
				$tokenID = random_string('alnum', 10);
				$sql ="INSERT INTO `coretoken`(`id`, `emailId`, `token`, `tokenGenerationDate`) VALUES (0,'$emailId','$tokenID',NOW())";
			
				$qparent = $this->db->query($sql);

				$abc = $parent->result();
				$fullname= $abc[0]->fullName;
				
				$arr = array(
					"#fullname#"=> $abc[0]->fullName,
					"#url#"=>"http://199.217.116.18/bpoapps/#/Core/newPass?".$tokenID
					
				);
				
				function sendTicketMail_phpmailer($to,$subject,$data,$template)
				{
					$mail = new PHPMailer;
					$mail->SMTPDebug = 0;                               // Enable verbose debug output
					$mail->isSMTP();                                      // Set mailer to use SMTP
					$mail->Host = 'mail.varaunited.in';  // Specify main and backup SMTP servers
					$mail->SMTPAuth = true;                               // Enable SMTP authentication
					$mail->Username = 'mayur.patil@varaunited.in';                 // SMTP username
					$mail->Password = 'mayur#123456';                           // SMTP password
					$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
					$mail->Port = 465;                                    // TCP port to connect to
					$mail->FromName = '';
					

					$arrAdmin = explode(",",$to);
					$file = file_get_contents("mailtemplates/".$template);
					$file = str_replace(array_keys($data), array_values($data), $file);
					
					for($i=0;$i<count($arrAdmin);$i++)
					{
						$mail->addAddress(trim($arrAdmin[$i]), 'Administrator');     // Add a recipient	
					}	
			
					$mail->isHTML(true);                                // Set email format to HTML
					$mail->Subject = $subject;
					$mail->Body    = $file;
					$mail->AltBody = '';
					
			
						if(!$mail->send())
						{		
							//echo 'Message could not be sent.';		
							//echo 'Mailer Error: ' . $mail->ErrorInfo;		
						} 
						else 
						{	
							//echo 'Message has been sent';		
						}		
					for($i=0;$i<count($arrAdmin);$i++)
					{
						$headers = 'From: mayur.patil@vikarta.co.in' . "\r\n" .
							'Reply-To: mayur.patil@vikarta.co.in' . "\r\n" .
							'X-Mailer: PHP/' . phpversion();			
						$headers .= "MIME-Version: 1.0" . "\r\n";
						$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";		
						//mail(trim($arrAdmin[$i]), $subject, $file,$headers);	
						mail(trim($arrAdmin[$i]), $subject, $file,$headers);
					}
				}
				sendTicketMail_phpmailer($emailId,'Change Password - Vara BPO Apps',$arr,"register.html");
				
				return true;
			 }
			 else
			 {
				 return false;
			 }			
		}

		public function saveNewPass($newPassword,$tokenValue){
        
		    date_default_timezone_set("Asia/Kolkata");
			
		     $qempty ="SELECT * FROM `coretoken` WHERE `token`='".$tokenValue."'";
             $result=$this->db->query($qempty)->result();
             $emailId = $result[0]->emailId;
            $dbTime = date($result[0]->tokenGenerationDate);
            $a=date_create($dbTime); 
			$date = date("Y-m-d H:i:s");           
            $b=date_create("$date");
            $diff = date_diff($a, $b);
			//echo $diff->i;
            if($diff->d==0 && $diff->m==0 && $diff->y==0 && $diff->h==0 && $diff->i<30 )
            {
              $qempty ="UPDATE `coreusers` SET `passWord`='$newPassword' WHERE `emailId`='".$emailId."'";
                $result=$this->db->query($qempty);                
                //echo '--Update successfull';
                return true;
                                
            }
            else
            {
                //echo "--Token expired";
                return false;
            }            
    }


}
?>