<?php
class PDCCTS_Pro_model extends CI_Model {


        public function __construct()
        {
                parent::__construct();
				
        }

		
		public function getFolderPath($folder){
			 $sql = "select * from corefolders where folderConstant like '".$folder."'";
			 $qsourcePath = $this->db->query($sql);
			 $folderPath = $qsourcePath->result();
	
			 return STORAGE_ROOT.$folderPath[0]->folderPath; 

		}
		
		public function importCSV($file,$json,$extData,$separator=",",$extention){
			$totalRows = 0;
			$extData = stripslashes(urldecode($extData));
			$extData = substr($extData,1,-1);

			$obj = json_decode($extData);
			$extDataKeys = array_keys((array)$obj);	
			
			
			$arrData = $this->csvreader->parse_file($file,$separator);
			$arrData = array_values($arrData); // CREATE 0 BASED ARRAY SINCE CSVREADER CLASS RETURN 1 BASED ARRAY
			
			
			//print_r($arrData); 
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
						$totalRows++;
					}					 
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
		
		
		public function generateBatch($appId){
			
			$newBachId = "0";
			$sql = "select MAX(CONVERT(batchNo, SIGNED INTEGER)) as lastBatch from corebatchmaster";
			$qchild = $this->db->query($sql);
			if($qchild->num_rows() > 0)
			{
				$resultChild = $qchild->result();
				$newBatchId = $resultChild[0]->lastBatch;
				
			}
			$newBatchId++;
			
				$sql = "insert into corebatchmaster (batchNo, batchDate, appId) values('".$newBatchId."',NOW(),".$appId.")";
				$this->db->query($sql);
				return $this->db->insert_id();
			
		}
}
?>