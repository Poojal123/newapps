<?php

class ALPL_model extends CI_Model {

        public $title;
        public $content;
        public $date;

   public function __construct()
   {
           parent::__construct();
   }

   public function get_last_ten_entries()
   {
	         $query = $this->db->get('entries', 10);
             return $query->result();
   }

    public function importData($csvname)
    {
		  return $csvname;
   }

    public function getProcess($id)
    {		
  		$sql = "select * from coreprocessmaster where 1";
			if($id != "0"){
				$sql.=" and processId=".$id;	
			}
			$qparent = $this->db->query($sql);
	        return $qparent->result();
   }

    public function getBatches($processId)
    {
			$result=array();
			$sql = "select * from corebatchmaster where appId=1";
			$qparent = $this->db->query($sql)->result();
			return $qparent;
	}

    public function getUsers()
	{
			$sql = "select t2.fullName, t2.userId from alpluserprocess as t1, coreusers as t2,
			 coreprocessmaster as t3
					where 
					t1.userId=t2.userId 
					and t1.processId= t3.processId";
					$qparent = $this->db->query($sql);
					return $qparent->result();
	}
	
	//PROCESS WISE USER	
    public function getProcessUsers($processId)
	{
		$sql = "select t2.* from alpluserprocess as t1, coreusers as t2, coreprocessmaster as t3 
					where 
					t1.userId=t2.userId 
					and t1.processId= t3.processId 
					and t3.processId=".$processId;
					$qparent = $this->db->query($sql);
	       			 return $qparent->result();
     }
	 
    //BATCH TYPE(AL/PL)   
    public function insertBatchType($batchId,$applicationType)
	{
		
			$sql = "insert into alplbatchtype (batchId,applicationType) values (".$batchId.",'".$applicationType."')";
			$qparent = $this->db->query($sql);
	       
	} 

	public function getApplications()
	{
		
			$sql = "SELECT DISTINCT alplapplications.applicationNo,alplapplications.applicationId 
					FROM 
					alplapplications,alplallocationentry,alpluserentry 
					WHERE 
					alplapplications.applicationId=alplallocationentry.applicationId 
					and alplallocationentry.allocationId NOT IN (SELECT alpluserentry.allocationId FROM alpluserentry )";
					$qparent = $this->db->query($sql);
					return $qparent->result();
		}
	
	//GET APPLICATION PER BATCH PROCESSWISE
	public function getBatchApplication($batchId,$processId)
	{
		
				if($processId==1)
				{
					if($batchId==0)
					{		
						$sql="select t1.* ,t2.* from corebatchmaster as t1 ,alplapplications as t2 
							WHERE 
							t1.batchId=t2.batchId 
							and 
							t2.status!=(select statusId from corestatus where status like 'Duplicate')
							and 
							t2.applicationId not IN( SELECT applicationId from alplallocationentry WHERE processId=".$processId.")";
					}
					else
					{
						
					$sql="select t1.* ,t2.* from corebatchmaster as t1 ,alplapplications as t2 
							WHERE 
							t1.batchId=t2.batchId and t2.batchId=".$batchId."
							and 
							t2.status!=(select statusId from corestatus where status like 'Duplicate')
							and 
							t2.applicationId not IN( SELECT applicationId from alplallocationentry WHERE processId=".$processId.")";
				}
			}
				else
				{
					if($batchId==0)
					{
					$sql="select distinct t1.* ,t2.* 
						 from corebatchmaster as t1 ,alplapplications as t2 , alplallocationentry as t3,alpluserentry as t4 
						 WHERE 
						 t1.batchId=t2.batchId  
						 and 
						 t2.status!=(select statusId from corestatus where status like 'Duplicate') 
						 and 
						 t2.applicationId not IN( SELECT applicationId from alplallocationentry WHERE processId=".$processId.") 
						 and 
						 t2.applicationId IN( SELECT applicationId from alplallocationentry 
						 WHERE processId=(select processId from coreprocessmaster where processName like 'Data Entry')) 
						 and t3.allocationId=t4.allocationId";
					}
					else
					{
						$sql="select distinct t1.* ,t2.* 
						 from corebatchmaster as t1 ,alplapplications as t2 , alplallocationentry as t3,alpluserentry as t4 
						 WHERE 
						 t1.batchId=t2.batchId and t2.batchId='".$batchId."' 
						 and 
						 t2.status!=(select statusId from corestatus where status like 'Duplicate') 
						 and 
						 t2.applicationId not IN( SELECT applicationId from alplallocationentry WHERE processId=".$processId.") 
						 and 
						 t2.applicationId IN( SELECT applicationId from alplallocationentry 
						 WHERE processId=(select processId from coreprocessmaster where processName like 'Data Entry')) 
						 and t3.allocationId=t4.allocationId";

					}
				}
				$qparent= $this->db->query($sql);
				return $qparent->result();
		}
		
		
    public function getRelease($userId,$batchId,$applicationId)
	{
			$sql = "select t4.*,t2.*,t3.batchNo,t1.allocationId 
					from 
					alplallocationentry as t1 , coreusers as t2,alplapplications as t4 ,corebatchmaster as t3 
					where 
					t1.applicationId=t4.applicationId 
					and t1.userId=t2.userId 
					and t4.batchId=t3.batchId 
					and t1.userId='".$userId."' 
					or t4.batchId='".$batchId."'
		  			or t1.applicationId='".$applicationId."'";

			$qparent = $this->db->query($sql);
			return $qparent->result();
	}
	
	//SEARCH ALLOCATED RECORDS FOR RELEASING
	public function getSearchRelease($key, $val)
	{
		$sql = "";
		if($key == "user")
		{

			$sql = "select t4.*,t2.*,t3.batchNo,t3.batchAlias,t1.allocationId, t5.* 
					from alplallocationentry as t1 ,
					coreusers as t2,alplapplications as t4 ,
					corebatchmaster as t3, 
					coreprocessmaster as t5
					where t1.applicationId=t4.applicationId 
					and t1.userId=t2.userId 
					and t4.batchId=t3.batchId 
					and t1.processId = t5.processId
					and t1.userId='".$val."' and t1.allocationId NOT IN (SELECT alpluserentry.allocationId FROM alpluserentry)";
			
				   	$qparent = $this->db->query($sql);
			   		return $qparent->result();
		
		}
		else if ($key == "application")
		{
			$sql = "select t4.*,t2.*,t3.batchNo,t3.batchAlias,t1.allocationId,t5.processName
					from alplallocationentry as t1 ,
					coreusers as t2,alplapplications as t4 ,
					corebatchmaster as t3 ,			
					coreprocessmaster as t5
					where 
					t1.applicationId=t4.applicationId 
					and t1.userId=t2.userId 
					and t4.batchId=t3.batchId 
					and t1.processId = t5.processId
					and t1.applicationId='".$val."' 
					and t1.allocationId NOT IN (SELECT alpluserentry.allocationId FROM alpluserentry)";
			
		    		$qparent = $this->db->query($sql);
		   			return $qparent->result();
			
		}
		else if ($key == "batch")
		{
			
			$sql = "select t4.*,t2.*,t3.batchNo,t3.batchAlias,t1.allocationId,t5.processName 
					from alplallocationentry as t1 , coreusers as t2,alplapplications as t4 ,corebatchmaster as t3,coreprocessmaster as t5
					where 
					t1.applicationId=t4.applicationId 
					and t1.userId=t2.userId 
					and t4.batchId=t3.batchId 
					and t1.processId = t5.processId
					and t4.batchId='".$val."' 
					and t1.allocationId NOT IN (SELECT alpluserentry.allocationId FROM alpluserentry)";
			
		    		$qparent = $this->db->query($sql);
		    		return $qparent->result();
				
		}
		
	}
	
	//ALLOCATE APPLICATION
	public function allocateApplication($processId,$applicationId,$userId)
	{
		$arrApllicationId = explode(",",$applicationId);

			for($i=0;$i<count($arrApllicationId);$i++){
		 
		     	$sql = "insert into alplallocationentry (processId, applicationId, userId, statusId) 
						values(".$processId.",".$arrApllicationId[$i].",".$userId.", 1)";
				
				$this->db->query($sql);
			}
				//return $this->db->insert_id();
	}
		
	//RELEASE RECORDS
    public function DeleteRelease($allocationId="")
	{
              
                $sql="delete from alplallocationentry where allocationId in (".$allocationId.")";
			//	echo $sql;
               $qparent = $this->db->query($sql);
		//return $qparent->result();
        }

	//NEXT RECORD
	public function NextRecord($processId, $userId)
	{
		$sql = "select * from alplallocationentry 
														INNER JOIN corestatus 
															on alplallocationentry.statusId = corestatus.statusId 
														INNER JOIN alplapplications
															on alplallocationentry.applicationId = alplapplications.applicationId
															 INNER JOIN corebatchmaster 
															 on corebatchmaster.batchId = alplapplications.batchId	
															where 
															userId=".$userId." 
															and processId=".$processId." 
															and corestatus.status like 'Pending' LIMIT 0,1";
														//	echo $sql;
		$qparent = $this->db->query($sql);
															
		return $qparent->result();

	}
	
	//INSERTED PROCESS ENTRY
	public function RegisterEntry($allocationId, $userId, $processId)
	{
	
		$qentry = $this->db->query("insert into alpluserentry (startDate, allocationId, rejectReasonId, userId, processId)
		values (NOW(),".$allocationId.",0,".$userId.",".$processId.")
		");
		$entryId = $this->db->insert_id();
		
		$qparent = $this->db->query("update alplallocationentry set statusId = (select statusId from corestatus where status like 'Started') where allocationId=".$allocationId);
		
		return $entryId;
	}
	
	//COMPLETED PROCESS'S ENTRY
	public function CompleteEntry($entryId,$allocationId,$processId,$remark,$reasonId,$customReason="")
	{
		
		if($customReason != "")
		{
			$sql="insert into alplremarkcodemaster(remarkType,remarkDescription) values('Reject','".$customReason."')";
			$result=$this->db->query($sql);
			$id=$this->db->insert_id();
				$reasonId = $id;	
		}
		
		$qentry = $this->db->query("update alpluserentry set endDate=NOW(), rejectReasonId=".$reasonId."  where  entryId=".$entryId);
		$qnextprocess = $this->db->query("select * from coreprocessmaster where processId = ".$processId);
		$qnextprocessresult = $qnextprocess->result();
		
		$nextProcessId = $qnextprocessresult[0]->nextProcessId;
		
		$qparent = $this->db->query("update alplallocationentry set statusId = (select statusId from corestatus where status like 'Completed') where allocationId=".$allocationId);
		
		//
		
		
		$arrRemarkKeys = array_keys($remark);
		//echo "---->";
		//print_r($arrRemarkKeys);
		for($i=0;$i<count($arrRemarkKeys);$i++)
		{
			$sqlselect="select remarkTypeId from alplremarktype where remarkType like '".$arrRemarkKeys[$i]."' ";
			$select = $this->db->query($sqlselect)->result();
			//print_r($select);
			$sql = "insert into alpluserentryremarks (entryId, remarkTypeId,remark) values (".$entryId.",".$select[0]->remarkTypeId.",
			'".$remark[$arrRemarkKeys[$i]]."')";
			$qparent = $this->db->query($sql);
			//echo $sql;
			
					}
		//}
		
		
				
		
		return $entryId;
	}

	//USER PERFORMANCE REPORT
	public function PerformanceRecords($user, $from="", $to="", $processId="",$locationId="")
	{
		
		$sql = "select count(*) as Total,
		        alpluserentry.processId,
				 alpluserentry.userId ,
				 coreusers.fullName,
				 coreprocessmaster.processName,
				 corefiles.filename,
				 coreusers.emailId,
				 alplapplications.location
				 from alpluserentry
				 INNER JOIN coreusers ON alpluserentry.userId = coreusers.userId 
				 INNER JOIN coreprocessmaster ON coreprocessmaster.processId = alpluserentry.processId 
				 INNER JOIN corefiles ON corefiles.fileId = coreusers.imageId 
				 INNER JOIN alplallocationentry ON alplallocationentry.allocationId = alpluserentry.allocationId 
				 INNER JOIN alplapplications ON alplapplications.applicationId = alplallocationentry.applicationId 
				 
				 where 1=1 and alpluserentry.endDate!='' ";
		//INNER JOIN alpllocationmaster ON alpllocationmaster.location=alplapplications.locationId echo date('m', strtotime($from));
		
		
		
		
			
		if($from!="" && $from!="0" && $to != "" && $to!="0"){
			
			$monthFrom=date('m', strtotime($from));
			$orderdateFrom = explode('-', $from);
			$dateFrom=$orderdateFrom[1];
			$yearFrom=$orderdateFrom[2];
			$from1=date_create($yearFrom.'-'.$monthFrom.'-'.$dateFrom);
			
			//$from=date_format($from1,"Y/m/d H:i:s");
			$monthTo=date('m', strtotime($to));
			$orderdateTo = explode('-', $to);
			$dateTo=$orderdateTo[1];
			$yearTo=$orderdateTo[2];
			$to1=date_create($yearTo.'-'.$monthTo.'-'.$dateTo);	
			$to=date_format($to1,"Y-m-d 24:00:00");
		
		//echo "-----".$from;
			$from=date_format($from1,"Y-m-d H:i:s");
			$sql.=" AND alpluserentry.startDate >= '".$from."' and alpluserentry.endDate <= '".$to."'";	
		}
		if($processId != "0" && $processId != ""){
			$sql.=" AND alpluserentry.processId = ".$processId;
			
		}
		if($user != "0" && $user!= ""){
			$sql.=" and alpluserentry.userId in (".$user.")";
		}
		if($locationId != "0" && $locationId!= ""){
			$sql.=" and alplapplications.location like('".$locationId."')";
		}
		
		
		$sql.="  group by alpluserentry.processId, alpluserentry.userId";
		//echo $sql;												
		$qparent = $this->db->query($sql)->result();
															
		return $qparent;

	}

	//CONSOLIDATE REPORT
	public function MISConsolidatedReport($from="",$to="",$locationId="",$applicationType="")
	{
			//$result= new StdClass;;
			//	RECORDS FOR DATA ENTRY
		 	$dataEntry ="select * from alplapplications 
						INNER JOIN alplallocationentry 
						ON alplapplications.applicationId = alplallocationentry.applicationId
						INNER JOIN alpluserentry
						ON alpluserentry.allocationId = alplallocationentry.allocationId
						INNER JOIN coreusers ON alpluserentry.userId=coreusers.userId
						where 
						alpluserentry.processId IN (select processId from coreprocessmaster where processName like 'Data Entry')";
				
				
				$dataEntryRmrk ="select alpluserentryremarks.remark,alpluserentry.entryId,alpluserentryremarks.remarkTypeId,alpluserentry.rejectReasonId
								 from alpluserentry,alplallocationentry,alplapplications,alpluserentryremarks 
								 where
								 alplallocationentry.applicationId=alplapplications.applicationId
								 and alpluserentry.entryId=alpluserentryremarks.entryId 
								 and alpluserentry.allocationId=alplallocationentry.allocationId 
								 and alpluserentry.processId IN (select processId 
								 from coreprocessmaster where processName like 'Data Entry')";
								 if($from!="" && $from!="0" && $to != "" && $to!="0")
								 {
									 
									$monthFrom=date('m', strtotime($from));
									$orderdateFrom = explode('-', $from);
									$dateFrom=$orderdateFrom[1];
									$yearFrom=$orderdateFrom[2];
									$from1=date_create($yearFrom.'-'.$monthFrom.'-'.$dateFrom);
									
									$now=time();
									$monthTo=date('m', strtotime($to));
									$orderdateTo = explode('-', $to);
									$dateTo=$orderdateTo[1];
									$yearTo=$orderdateTo[2];
									$to1=date_create($yearTo.'-'.$monthTo.'-'.$dateTo);	
									$to=date_format($to1,"Y-m-d" );
									$from=date_format($from1,"Y-m-d H:i:s");
									$to=$to.' '.'24:00:00';
									$dataEntry.=" AND alpluserentry.startDate >= '".$from."' and alpluserentry.endDate <='".$to."'";	
								}
							//print_r($dataEntry);	 
				
				$result=$this->db->query($dataEntry)->result();
				$dataentry= $result;				 
				$resultdataEntryRmrk=$this->db->query($dataEntryRmrk)->result();
							//	print_r($resultdataEntryRmrk);
			for($i=0;$i<count($result);$i++)
										
			{
				
				
				$getuploadedby="SELECT DISTINCT   
				                corebatchmaster.batchId,corebatchmaster.batchAlias,coreusers.userId,corebatchmaster.uploadedBy,
				                coreusers.fullName,alplapplications.batchId,corebatchmaster.batchNo,corebatchmaster.batchDate
								 from
								 coreusers,alplapplications,corebatchmaster   
								WHERE alplapplications.batchId=corebatchmaster.batchId 
								and coreusers.userId=corebatchmaster.uploadedBy 
								and corebatchmaster.batchId=".$dataentry[$i]->batchId;
				$rslt=$this->db->query($getuploadedby)->result();
				if(count($dataentry)>0)
										{
											$timestamp = $dataentry[$i]->endDate;
											$splitTimeStamp = explode(" ",$timestamp);
											$date = $splitTimeStamp[0];
											$time = $splitTimeStamp[1];
											//print_r($date);
											
											
											$uploadtimestamp = $rslt[0]->batchDate;
											$splitUploadTimeStamp = explode(" ",$uploadtimestamp);
											$uploaddate = $splitUploadTimeStamp[0];
											$uploadtime = $splitUploadTimeStamp[1];
																			
											$result[$i]->Img_Name="NI";	
											$result[$i]->Entry_BY=$dataentry[$i]->fullName;									
											$result[$i]->Entry_Date=$date;		
											$result[$i]->Entry_Time=$time;		
											$result[$i]->Uploaded_By=$rslt[0]->fullName;	
											$result[$i]->Batch_No=$rslt[0]->batchAlias;
											$result[$i]->Uploaded_Date=$uploaddate;		
											$result[$i]->Uploaded_Time=$uploadtime;		
											if(!empty($resultdataEntryRmrk[$i]))
											{
								
											if($resultdataEntryRmrk[$i]->remark!='')
											{
												if($resultdataEntryRmrk[$i]->rejectReasonId==0)
												{
													$result[$i]->Entry_Accept_Remarks=$resultdataEntryRmrk[$i]->remark;									
													
												}
												else
												{
													$result[$i]->Entry_Reject_Remarks=$resultdataEntryRmrk[$i]->remark;									
												}
											}
										}
									}
												
										
										
				$fieldInvestigation= "select * from alpluserentry INNER JOIN alplallocationentry
										ON alpluserentry.allocationId = alplallocationentry.allocationId
										INNER JOIN coreusers 
										ON alpluserentry.userId = coreusers.userId
										INNER JOIN corestatus
										ON alplallocationentry.statusId = corestatus.statusId
										where 
										alpluserentry.processId IN (select processId from coreprocessmaster where processName like 'Field Investigation')
										AND alplallocationentry.applicationId ='".$result[$i]->applicationId."'";
									$data=$this->db->query($fieldInvestigation)->result();
									
			$fieldInvestigationRmrk ="select alpluserentryremarks.remark,alpluserentry.entryId,alpluserentryremarks.remarkTypeId,
										 alpluserentry.rejectReasonId,alplremarktype.remarkType
										 from alpluserentry,alplallocationentry,alplapplications,alpluserentryremarks,alplremarktype 
										 where
										 alplallocationentry.applicationId=alplapplications.applicationId
										 and alpluserentry.entryId=alpluserentryremarks.entryId 
										 and alpluserentry.allocationId=alplallocationentry.allocationId
                                         and alpluserentryremarks.remarkTypeId=alplremarktype.remarkTypeId 
										 and alpluserentry.processId IN (select processId 
										 from coreprocessmaster where processName like 'Field Investigation')
										 AND alplallocationentry.applicationId ='".$result[$i]->applicationId."'";
				$resultfieldInvestigationRmrk=$this->db->query($fieldInvestigationRmrk)->result();					
				//echo ">>";	print_r($from);
									if($from!="" && $from!="0" && $to != "" && $to!="0"){
										$fieldInvestigation.=" AND alpluserentry.startDate >= '".$from."' and alpluserentry.endDate <= '".$to."'";	
									}
									if($locationId != "0" && $locationId!= ""){
										$fieldInvestigation.=" and alpllocationmaster.locationId in (".$locationId.")";
									}							
									
										if(!empty($data))
										{
											$fitimestamp = $data[0]->endDate;
											$fisplitTimeStamp = explode(" ",$fitimestamp);
											$fidate = $fisplitTimeStamp[0];
											$fitime = $fisplitTimeStamp[1];
											//$result[$i]->Uploaded_BY=$data[0]->fullName;	
											$result[$i]->FI_BY=$data[0]->fullName;									
											$result[$i]->FI_Date=$fidate;		
											$result[$i]->FI_Time=$fitime;
											for($j=0;$j<count($resultfieldInvestigationRmrk);$j++)
											{
												if(!empty($resultfieldInvestigationRmrk[$j]))
												{
													if($resultfieldInvestigationRmrk[$j]->remark!='')
													{
														if($resultfieldInvestigationRmrk[$j]->rejectReasonId==0)
														{	
														//	print_r($resultfieldInvestigationRmrk[1]);
															if($resultfieldInvestigationRmrk[$j]->remarkType=='OV')
															{
																$result[$i]->OV=$resultfieldInvestigationRmrk[$j]->remarkType;
															}
															if($resultfieldInvestigationRmrk[$j]->remarkType=='RV')
															{
																$result[$i]->RV=$resultfieldInvestigationRmrk[$j]->remarkType;
															}
															
															if($resultfieldInvestigationRmrk[$j]->remarkType=='Waiver')
															{
																$result[$i]->Waiver_Y_N='Y';
																$result[$i]->Waiver_Remarks=$resultfieldInvestigationRmrk[$j]->remark;
															}
															else
															{
																$result[$i]->Waiver_Y_N='N';
															}

															if($resultfieldInvestigationRmrk[$j]->remarkType=='Custom')
															{
																$result[$i]->FI_Accept_Remarks=$resultfieldInvestigationRmrk[$j]->remark;
															}													
															
														}
														else
														{
															
															$result[$i]->FI_Reject_Remarks=$resultfieldInvestigationRmrk[$j]->remark;
														}
														//print_r($result);
													}
												}
											}
										}
				
		$QC= "select * from alpluserentry INNER JOIN alplallocationentry
										ON alpluserentry.allocationId = alplallocationentry.allocationId
										INNER JOIN coreusers 
										ON alpluserentry.userId = coreusers.userId
										INNER JOIN corestatus
										ON alplallocationentry.statusId = corestatus.statusId
										where 
										alpluserentry.processId IN (select processId from coreprocessmaster where processName like 'QC')
										AND alplallocationentry.applicationId ='".$result[$i]->applicationId."'";
					$dataqc=$this->db->query($QC)->result();
					$QCRmrk ="select alpluserentryremarks.remark,alpluserentry.entryId,alpluserentryremarks.remarkTypeId,alpluserentry.rejectReasonId
										 from alpluserentry,alplallocationentry,alplapplications,alpluserentryremarks 
										 where
										 alplallocationentry.applicationId=alplapplications.applicationId
										 and alpluserentry.entryId=alpluserentryremarks.entryId 
										 and alpluserentry.allocationId=alplallocationentry.allocationId 
										 and alpluserentry.processId IN (select processId 
										 from coreprocessmaster where processName like 'QC')";
				$resultQCRmrk=$this->db->query($QCRmrk)->result();			
						
									
									if($from!="" && $from!="0" && $to != "" && $to!="0"){
										$QC.=" AND alpluserentry.startDate >= '".$from."' and alpluserentry.endDate <= '".$to."'";	
									}
									if($locationId != "0" && $locationId!= ""){
										$QC.=" and alpllocationmaster.locationId in (".$locationId.")";
									}							
						
										if(!empty($dataqc))
										{
											$qctimestamp = $dataqc[0]->endDate;
											$qcsplitTimeStamp = explode(" ",$qctimestamp);
											$qcdate = $qcsplitTimeStamp[0];
											$qctime = $qcsplitTimeStamp[1];
											//$result[$i]->Uploaded_BY=$data[0]->fullName;	
											$result[$i]->QC_BY=$dataqc[0]->fullName;									
											$result[$i]->QC_Date=$qcdate;		
											$result[$i]->QC_Time=$qctime;		
											
											if(!empty($resultQCRmrk[$i]))
											{
												if($resultQCRmrk[$i]->remark!='')
												{
													if($resultQCRmrk[$i]->rejectReasonId==0)
													{
														$result[$i]->QC_Accept_Remarks=$resultQCRmrk[$i]->remark;		
													}
													else
													{
														$result[$i]->QC_Reject_Remarks=$resultQCRmrk[$i]->remark;		
													}
												}
											}
										
										}
			
			$CAM= "select * from alpluserentry INNER JOIN alplallocationentry
										ON alpluserentry.allocationId = alplallocationentry.allocationId
										INNER JOIN coreusers 
										ON alpluserentry.userId = coreusers.userId
										INNER JOIN corestatus
										ON alplallocationentry.statusId = corestatus.statusId
										where 
										alpluserentry.processId IN (select processId from coreprocessmaster where processName like 'CAM')
										AND alplallocationentry.applicationId ='".$result[$i]->applicationId."'";
						
										$datacam=$this->db->query($CAM)->result();
					 $CAMRmrk ="select alpluserentryremarks.remark,alpluserentry.entryId,alpluserentryremarks.remarkTypeId,
										 alpluserentry.rejectReasonId,alplremarktype.remarkType
										 from alpluserentry,alplallocationentry,alplapplications,alpluserentryremarks,alplremarktype 
										 where
										 alplallocationentry.applicationId=alplapplications.applicationId
										 and alpluserentry.entryId=alpluserentryremarks.entryId 
										 and alpluserentry.allocationId=alplallocationentry.allocationId
                                         and alpluserentryremarks.remarkTypeId=alplremarktype.remarkTypeId
										 and alpluserentry.processId IN (select processId 
										 from coreprocessmaster where processName like 'CAM')
										 AND alplallocationentry.applicationId ='".$result[$i]->applicationId."'";
				$resultCAMRmrk=$this->db->query($CAMRmrk)->result();				
									if($from!="" && $from!="0" && $to != "" && $to!="0"){
										$CAM.=" AND alpluserentry.startDate >= '".$from."' and alpluserentry.endDate <= '".$to."'";	
									}
									if($locationId != "0" && $locationId!= ""){
										$CAM.=" and alpllocationmaster.locationId in (".$locationId.")";
									}							
						
										if(!empty($datacam))
										{
											$camtimestamp = $datacam[0]->endDate;
											$camsplitTimeStamp = explode(" ",$camtimestamp);
											$camdate = $camsplitTimeStamp[0];
											$camtime = $camsplitTimeStamp[1];
											//$result[$i]->Uploaded_BY=$data[0]->fullName;	
											$result[$i]->CAM_BY=$datacam[0]->fullName;									
											$result[$i]->CAM_Date=$camdate;		
											$result[$i]->CAM_Time=$camtime;		
											
											for($k=0;$k<count($resultCAMRmrk);$k++)
											{
												if(!empty($resultCAMRmrk[$k]))
												{
													$result[$i]->CAM_entryId=$resultCAMRmrk[$k]->entryId;
														if($resultCAMRmrk[$k]->rejectReasonId==0)
														{
															if($resultCAMRmrk[$k]->remarkType=='FNCB')
															{
																$result[$i]->FNCB='Y';
															}
															else
															{
																$result[$i]->FNCB='N';
															}
															if($resultCAMRmrk[$k]->remarkType=='FNCS')
															{
																$result[$i]->FNCS='Y';
															}
															else
															{
																$result[$i]->FNCS='N';
															}
															if($resultCAMRmrk[$k]->remarkType=='Custom')
															{
																$result[$i]->CAM_Accept_Remarks=$resultCAMRmrk[$k]->remark;
															}	
														}
														else
														{
															$result[$i]->CAM_Reject_Remarks=$resultCAMRmrk[$k]->remark;		
														}
													
												}
											}
										}
		//print_r($result);
		$Audit= "select * from alpluserentry INNER JOIN alplallocationentry
										ON alpluserentry.allocationId = alplallocationentry.allocationId
										INNER JOIN coreusers 
										ON alpluserentry.userId = coreusers.userId
										INNER JOIN corestatus
										ON alplallocationentry.statusId = corestatus.statusId
										where 
										alpluserentry.processId IN (select processId from coreprocessmaster where processName like 'Audit Entry')
										AND alplallocationentry.applicationId ='".$result[$i]->applicationId."'";
									$dataaudit=$this->db->query($Audit)->result();
									//echo $from;
				$AuditRmrk ="select alpluserentryremarks.remark,alpluserentry.entryId,alpluserentryremarks.remarkTypeId,alpluserentry.rejectReasonId
										 from alpluserentry,alplallocationentry,alplapplications,alpluserentryremarks 
										 where
										 alplallocationentry.applicationId=alplapplications.applicationId
										 and alpluserentry.entryId=alpluserentryremarks.entryId 
										 and alpluserentry.allocationId=alplallocationentry.allocationId 
										 and alpluserentry.processId IN (select processId 
										 from coreprocessmaster where processName like 'Audit Entry')";
				$resultAuditRmrk=$this->db->query($AuditRmrk)->result();
									if($from!="" && $from!="0" && $to != "" && $to!="0"){
						$Audit.=" AND alpluserentry.startDate >= '".$from."' and alpluserentry.endDate <= '".$to."'";	
									}
									if($locationId != "0" && $locationId!= ""){
										$Audit.=" and alpllocationmaster.locationId in (".$locationId.")";
									}							
						
										if(!empty($dataaudit))
										{
											$audittimestamp = $dataaudit[0]->endDate;
											$auditsplitTimeStamp = explode(" ",$audittimestamp);
											$auditdate = $auditsplitTimeStamp[0];
											$audittime = $auditsplitTimeStamp[1];
											//$result[$i]->Uploaded=$data[0]->fullName;	
											$result[$i]->Audit_BY=$dataaudit[0]->fullName;									
											$result[$i]->Audit_Date=$auditdate;		
											$result[$i]->Audit_Time=$audittime;		
											if(!empty($resultAuditRmrk[$i]))
											{
												if($resultAuditRmrk[$i]->remark!='')
												{
													if($resultAuditRmrk[$i]->rejectReasonId==0)
													{
														$result[$i]->Audit_Accept_Remarks=$resultAuditRmrk[$i]->remark;		
													}
													else
													{
														$result[$i]->Audit_Reject_Remarks=$resultAuditRmrk[$i]->remark;		
													}
												}
											}
										}
			
					if(empty($data))
					{
						$result[$i]->Status="FI Pending";
					}
					else if(empty($dataqc))
					{
						$result[$i]->Status="QC Pending";
					}
					else if(empty($datacam))
					{
						$result[$i]->Status="CAM Pending";
					}				
					else if(empty($dataaudit))
					{
						$result[$i]->Status="Audit Pending";
					}
					else
					{
						$result[$i]->Status="Complete";
					}
			
			}
			return $result;
		}
	   
	//SUMMARIZED REPORT
	public function MISSummaryReport($from="",$to="",$locationId="",$applicationType="")
	{
			
			$sql="SELECT * FROM alplapplications,corebatchmaster,alplbatchtype,alplallocationentry,alpluserentry
					 where alplapplications.batchId=corebatchmaster.batchId 
					 and  alplapplications.batchId=alplbatchtype.batchId
					 and alplapplications.status!=(select statusId from corestatus where status like 'Duplicate') 
					 and alplbatchtype.applicationType='".$applicationType."'
					 and alplallocationentry.allocationId=alpluserentry.allocationId 
					 and alplapplications.applicationId=alplallocationentry.applicationId ";
					 if($from!="" && $from!="0" && $to != "" && $to!="0")
					 {
						$monthFrom=date('m', strtotime($from));
									$orderdateFrom = explode('-', $from);
									$dateFrom=$orderdateFrom[1];
									$yearFrom=$orderdateFrom[2];
									$from1=date_create($yearFrom.'-'.$monthFrom.'-'.$dateFrom);
									
									$now=time();
									$monthTo=date('m', strtotime($to));
									$orderdateTo = explode('-', $to);
									$dateTo=$orderdateTo[1];
									$yearTo=$orderdateTo[2];
									$to1=date_create($yearTo.'-'.$monthTo.'-'.$dateTo);	
									$to=date_format($to1,"Y-m-d 24:00:00" );
									$from=date_format($from1,"Y-m-d H:i:s");
									//$to=$to.' '.'24:00:00';

						$sql.=" AND alpluserentry.startDate >= '".$from."' and alpluserentry.endDate <= '".$to."'";	
					 }
									
				$sql.="group by alplapplications.batchId";
			//echo $sql;
			$result = $this->db->query($sql)->result();
		//	print_r($result);
			for($i=0;$i<count($result);$i++)
			{
				/*
				$appType="select applicationType,alplapplications.batchId from alplbatchtype,alplapplications
							where alplapplications.batchId=alplbatchtype.batchId 
				 			AND alplapplications.batchId='".$result[$i]->batchId."'
							 and alplbatchtype.applicationType='".$applicationType."'";
																
								
				$dataappType= $this->db->query($appType)->result();
				*/
				$sqlCount="SELECT alplapplications.applicationId as total 
							FROM alplapplications,corebatchmaster 
							where alplapplications.batchId=corebatchmaster.batchId 
							and alplapplications.status!=(select statusId from corestatus where status like 'Duplicate')  
							AND alplapplications.batchId=".$result[$i]->batchId;
				//echo $sqlCount;
				$resultsqlCount = $this->db->query($sqlCount)->result();
			
				
				$getuploadedby="SELECT DISTINCT   
				                corebatchmaster.batchId,coreusers.userId,corebatchmaster.uploadedBy,
				                coreusers.fullName,alplapplications.batchId,corebatchmaster.batchNo,corebatchmaster.batchDate from                			                                coreusers,alplapplications,corebatchmaster   
								WHERE alplapplications.batchId=corebatchmaster.batchId 
								and coreusers.userId=corebatchmaster.uploadedBy 
								and corebatchmaster.batchId=".$result[$i]->batchId;
				$rslt=$this->db->query($getuploadedby)->result();
						$result[$i]->NoOfFiles=count($resultsqlCount);
								
				if(count($result)>0)
				{
					$result[$i]->Uploaded_By=$rslt[0]->fullName;
					$uploadtimestamp = $rslt[0]->batchDate;
											$splitUploadTimeStamp = explode(" ",$uploadtimestamp);
											$uploaddate = $splitUploadTimeStamp[0];
											$uploadtime = $splitUploadTimeStamp[1];
					$result[$i]->Upload_Date=$uploaddate;
					$result[$i]->Upload_Time=$uploadtime;
										
				}
				
						//	print_r($dataappType);		
				$dataentry="select * from alpluserentry 
							INNER JOIN alplallocationentry 
							ON alpluserentry.allocationId = alplallocationentry.allocationId 
							INNER JOIN coreusers 
							ON alpluserentry.userId = coreusers.userId 
							INNER JOIN corestatus 
							ON alplallocationentry.statusId = corestatus.statusId 
							INNER JOIN alplapplications 
							ON alplapplications.applicationId=alplallocationentry.applicationId
							where alpluserentry.processId IN (select processId from coreprocessmaster where processName like 'Data Entry')
				  			AND alplapplications.batchId=".$result[$i]->batchId;
									
										$data= $this->db->query($dataentry)->result();
										if(count($data)==count($resultsqlCount))
										{
											$result[$i]->DE='Y';
										}
										else
										{
											$result[$i]->DE='N';
										}
									
											
			$FIentry="select * from alpluserentry INNER JOIN alplallocationentry
										ON alpluserentry.allocationId = alplallocationentry.allocationId
										INNER JOIN coreusers 
										ON alpluserentry.userId = coreusers.userId
										INNER JOIN corestatus
										ON alplallocationentry.statusId = corestatus.statusId
										INNER JOIN alplapplications ON alplapplications.applicationId=alplallocationentry.applicationId
										where 
										alpluserentry.processId IN (select processId from coreprocessmaster where processName like 'Field Investigation')
										AND alplapplications.batchId=".$result[$i]->batchId;
									
										$FIdata= $this->db->query($FIentry)->result();
										if(count($FIdata)==count($resultsqlCount))
										{
											$result[$i]->FI='Y';
										}
										else
										{
											$result[$i]->FI='N';
										}	
										
					$QCentry="select * from alpluserentry INNER JOIN alplallocationentry
										ON alpluserentry.allocationId = alplallocationentry.allocationId
										INNER JOIN coreusers 
										ON alpluserentry.userId = coreusers.userId
										INNER JOIN corestatus
										ON alplallocationentry.statusId = corestatus.statusId
										INNER JOIN alplapplications ON alplapplications.applicationId=alplallocationentry.applicationId
										where 
										alpluserentry.processId IN (select processId from coreprocessmaster where processName like 'QC')
										AND alplapplications.batchId=".$result[$i]->batchId;
										$QCdata= $this->db->query($QCentry)->result();
										if(count($QCdata)==count($resultsqlCount))
										{
											$result[$i]->QC='Y';
										}
										else
										{
											$result[$i]->QC='N';
										}
									
				$CAMentry="select * from alpluserentry INNER JOIN alplallocationentry
										ON alpluserentry.allocationId = alplallocationentry.allocationId
										INNER JOIN coreusers 
										ON alpluserentry.userId = coreusers.userId
										INNER JOIN corestatus
										ON alplallocationentry.statusId = corestatus.statusId
										INNER JOIN alplapplications ON alplapplications.applicationId=alplallocationentry.applicationId
										where 
										alpluserentry.processId IN (select processId from coreprocessmaster where processName like 'CAM')
										AND alplapplications.batchId=".$result[$i]->batchId;
									
										$CAMdata= $this->db->query($CAMentry)->result();
										if(count($CAMdata)==count($resultsqlCount))
										{
											$result[$i]->CAM='Y';
										}
										else
										{
											$result[$i]->CAM='N';
										}			
									
				$Auditentry="select * from alpluserentry INNER JOIN alplallocationentry
										ON alpluserentry.allocationId = alplallocationentry.allocationId
										INNER JOIN coreusers 
										ON alpluserentry.userId = coreusers.userId
										INNER JOIN corestatus
										ON alplallocationentry.statusId = corestatus.statusId
										INNER JOIN alplapplications ON alplapplications.applicationId=alplallocationentry.applicationId
										where 
										alpluserentry.processId IN (select processId from coreprocessmaster where processName like 'Audit Entry')
										AND alplapplications.batchId=".$result[$i]->batchId;
									
										$Auditdata= $this->db->query($Auditentry)->result();
										if(count($Auditdata)==count($resultsqlCount))
										{
											$result[$i]->Audit='Y';
										}
										else
										{
											$result[$i]->Audit='N';
										}
									

						
		}
		return $result;
			
	}
	
	public function rejectReport($user, $from="", $to="", $processId="",$locationId="")
	{
		$sql="select DISTINCT                                                                       
		                       	coreusers.fullName,alpluserentry.endDate,alplapplications.applicationNo,alplapplications.apsNo,
							   	alplremarkcodemaster.remarkDescription,alpluserentryremarks.remark,corebatchmaster.batchAlias 
		                       	from 
							   	alpluserentry,coreusers,alplremarkcodemaster,
								alplallocationentry,alplapplications,alpluserentryremarks,corebatchmaster 
								where 
								alpluserentry.userId=coreusers.userId
							    and alpluserentry.rejectReasonId !=0 
								and alpluserentry.allocationId=alplallocationentry.allocationId 
								and alplallocationentry.applicationId=alplapplications.applicationId 
								and alpluserentry.rejectReasonId=alplremarkcodemaster.remarkId 
								and alpluserentry.entryId=alpluserentryremarks.entryId
								and alplapplications.batchId=corebatchmaster.batchId";
					if($from!="" && $from!="0" && $to != "" && $to!="0"){
					
					$monthFrom=date('m', strtotime($from));
					$orderdateFrom = explode('-', $from);
					$dateFrom=$orderdateFrom[1];
					$yearFrom=$orderdateFrom[2];
					$from1=date_create($yearFrom.'-'.$monthFrom.'-'.$dateFrom);
					
					//$from=date_format($from1,"Y/m/d H:i:s");
					$monthTo=date('m', strtotime($to));
					$orderdateTo = explode('-', $to);
					$dateTo=$orderdateTo[1];
					$yearTo=$orderdateTo[2];
					$to1=date_create($yearTo.'-'.$monthTo.'-'.$dateTo);	
					$to=date_format($to1,"Y-m-d 24:00:00");
				
				//echo "-----".$from;
					$from=date_format($from1,"Y-m-d H:i:s");
					$sql.=" AND alpluserentry.startDate >= '".$from."' and alpluserentry.endDate <= '".$to."'";	
				}
				if($processId != "0" && $processId != ""){
					$sql.=" AND alpluserentry.processId = ".$processId;
					
				}
				if($user != "0" && $user!= ""){
					$sql.=" and alpluserentry.userId in (".$user.")";
				}
				if($locationId != "0" && $locationId!= ""){
					$sql.=" and alplapplications.location like('".$locationId."')";
				}
			//echo $sql;

		$data=$this->db->query($sql)->result();
		//print_r($data);
		for($i=0;$i<count($data);$i++)
		{
			$data[$i]->ALPL_ImageName='NI';
			$data[$i]->ALPL_Status='Rejected';
		}
		return $data;
	}
	
	//GET ALL USERS FROM CORE FOR ALLOCATING TO PROCESS
	public function getalpluser($locationId,$processId)
	{
		
		$sql = "select DISTINCT *,corefiles.filename 
				from coreusers LEFT JOIN corefiles ON coreusers.imageId = corefiles.fileId 
				INNER JOIN corelocations on corelocations.locationId=coreusers.locationId 
				and coreusers.locationId=".$locationId." 
				and coreusers.userId IN(select userId from alplprocessusers where processId=".$processId.")";
		//echo $sql;
		$qparent = $this->db->query($sql);
	    return $qparent->result();
	}
	
	public function getcoreuser($locationId,$processId)
	{
		
		$sql = "select DISTINCT *,corefiles.filename 
				from coreusers LEFT JOIN corefiles ON coreusers.imageId = corefiles.fileId 
				INNER JOIN corelocations on corelocations.locationId=coreusers.locationId 
				and coreusers.locationId=".$locationId." 
				and coreusers.userId NOT IN(select userId from alplprocessusers where processId=".$processId.")";
		//echo $sql;
		$qparent = $this->db->query($sql);
	        return $qparent->result();
	}
	
	//SAVE USERS FOR ALLOCATED PROCESS
	public function createuserprocess($processId,$userId)
	{
		$arrUserId = explode(",",$userId);
		for($i=0;$i<count($arrUserId);$i++)
		{
			$sql = "insert into  alplprocessusers(userId,processId) values(".$arrUserId[$i].",".$processId.")";
			//echo $sql;
			$qparent = $this->db->query($sql);
	}
		  //  return $qparent->result();
	}
	//fetching user allocated for the process
	public function getALPLUsers($processId)
	{
				$sql = "select * from coreusers,alplprocessusers WHERE coreusers.userId=alplprocessusers.userId and alplprocessusers.processId=".$processId." group by coreusers.userId";			
			//echo $sql;
			$qparent = $this->db->query($sql);
			return $qparent->result();
	}
	
	//DUPLICATION CHECKING FOR APPLICATION NO AND APS NO IN DB
	public function getDuplicateRecords($batchId)
	{
		$select="select statusId from corestatus where status like ('Unique')";
				$resultsel=$this->db->query($select)->result();
			
				$insert="update alplapplications set status=".$resultsel[0]->statusId;
			
		$result=array();
		$duplicate=0;
		$sql="SELECT * from alplapplications where batchId=".$batchId;
		
		$resultsql=$this->db->query($sql)->result();
		//	print_r(count($resultsql));
		for($i=0;$i<count($resultsql);$i++)
		{
			$sqlselect="SELECT * from alplapplications 
						where 
						batchId not in (".$batchId.") 
						and (applicationNo  IN ('".$resultsql[$i]->applicationNo."') 
						OR ( apsNo  IN ('".$resultsql[$i]->apsNo."') AND apsNo NOT LIKE '') )";
				
						$resultselect=$this->db->query($sqlselect)->result();
/*				echo $sqlselect;
				print_r($resultselect);
				echo $resultselect[$i]->applicationNo;
				echo $resultselect[$i]['applicationNo'];*/
				//echo count($resultselect);
						if(count($resultselect)>0)
						{
							$sqlupdate="Delete from alplapplications where 
										applicationNo='".$resultselect[0]->applicationNo."'
										and batchId=".$batchId;
										$execute=$this->db->query($sqlupdate);
									$duplicate++;
						}
						else
						{
							$sqlupdate="UPDATE alplapplications SET 
										status=(select statusId from corestatus where status like 'Unique') 
										where status!=(select statusId from corestatus where status like 'Duplicate') 
										and batchId=".$batchId;
							
									$execute=$this->db->query($sqlupdate);
							
						}
		}
			return $duplicate;	
	}
	
	//DUPLICATION CHECKING FOR APPLICATION NO AND APS NO IN Excel
	public function getExcelDuplicateRecords($batchId,$batchName)
	{
		
		
	$duplicate1=0;
	
	 
	
		$sql="SELECT * from alplapplications where batchId=".$batchId." and status !=(select statusId from corestatus where status like 'Duplicate') ";
	//	echo $sql;
		$resultsql=$this->db->query($sql)->result();
		for($i=0;$i<count($resultsql);$i++)
		{
			
			$sqlselect="SELECT * from alplapplications where batchId in (".$batchId.") and (applicationNo IN ('".$resultsql[$i]->applicationNo."') OR 
			(apsNo IN ('".$resultsql[$i]->apsNo."') AND apsNo NOT LIKE '')  )";
	//			echo $sqlselect;
				$resultselect=$this->db->query($sqlselect)->result();
				//print_r(count($resultselect));
				if(count($resultselect)>1)
				{
					//$result=$resultselect;
					for($j=0;$j<count($resultselect);$j++)
					{
						
					//print_r($resultselect);
					$sqlupdate="delete from alplapplications  
					 where applicationNo='".$resultselect[$j]->applicationNo."' and batchId=".$batchId;
					//echo $sqlupdate;
					$execute=$this->db->query($sqlupdate);
					
					}
					$duplicate1++;
				}
						
		}
					$getcount="SELECT count(*) as total FROM alplapplications,corebatchmaster,corestatus 
						where corebatchmaster.batchAlias like ('$batchName%') 
						and alplapplications.batchId=corebatchmaster.batchId
						and (alplapplications.status=corestatus.statusId)
						and alplapplications.status!=(select statusId from corestatus where status like 'Duplicate')";
				$resultgetcount=$this->db->query($getcount)->result();
				$totalcount=$resultgetcount[0]->total;
							
		$Result = array(
				"duplicate"=>$duplicate1,
				"total"=>$totalcount
				);
		return $Result;
	}
	//DELETE ALLOCATED USER PER PROCESS
	function deleteProcessUser($processId,$userId){
		
		$sql = "delete from alplprocessusers where processId=".$processId." and userId=".$userId;		
		$qparent = $this->db->query($sql);
		return true;
	}
	
	//GET PREVIOUS REMARKS
	function getPreviousRemarks($processId,$applicationId)
	{
		$sql="select * from alpluserentryremarks 
				Inner join alpluserentry
    			on alpluserentry.entryId=alpluserentryremarks.entryId
    			Inner join coreprocessmaster
    			on alpluserentry.processId=coreprocessmaster.processId
				Inner join alplallocationentry 
				on alplallocationentry.allocationId=alpluserentry.allocationId 
				Inner join alplapplications 
				on alplallocationentry.applicationId=alplapplications.applicationId
    			and  alpluserentry.processId < '$processId' and  alpluserentryremarks.remark !=' ' and alplapplications.applicationId=".$applicationId;
	//echo $sql;
		$qparent = $this->db->query($sql)->result();
			
	
		for($i=0;$i<count($qparent);$i++)
		{
			//echo $qparent[$i]->processName;
			if($qparent[$i]->processName=='Data Entry')
			{
				$qparent[$i]->DEremark=$qparent[$i]->remark;
			}
			else
			{$qparent[$i]->DEremark=" ";}
			if($qparent[$i]->processName=='Field Investigation')
			{
				$qparent[$i]->FIremark=$qparent[$i]->remark;
			}
			else
			{$qparent[$i]->FIremark=" ";}
			if($qparent[$i]->processName=='QC')
			{
				$qparent[$i]->QCremark=$qparent[$i]->remark;
			}
			if($qparent[$i]->processName=='CAM')
			{
				$qparent[$i]->CAMremark=$qparent[$i]->remark;
			}
			else
			{$qparent[$i]->QCremark=" ";}
			if($qparent[$i]->processName=='Audit Entry')
			{
				$qparent[$i]->Auditremark=$qparent[$i]->remark;
			}
			else
			{$qparent[$i]->Auditremark=" ";}
			
		}
		 return $qparent;
	}
	
	function checkAps($applicationId,$apsNo)
	{
		$sql="select apsNo from alplapplications where apsNo like ('$apsNo') and applicationId!=".$applicationId;
		$result=$this->db->query($sql)->result();
		
		if(count($result)>0)
		{
			return false;
		}	
		else
		{
			$insert="update alplapplications set apsNo='".$apsNo."' where applicationId=".$applicationId;
			$insertResult=$this->db->query($insert);
			return true;
		}
	}
	function searchStatus($applicationNo=0,$apsNo=0)
	{
		$sql="select * from alplapplications,corebatchmaster 
						where 1=1 and alplapplications.batchId=corebatchmaster.batchId";
						
		if($applicationNo != "" && $applicationNo != "0"){
			$sql.=" AND (applicationNo like '%".$applicationNo."%') ";	
		}
		
		if($apsNo != "" && $apsNo != "0"){
			$sql.=" AND (apsNo like '%".$apsNo."%')";	
		}
		// echo $sql;
		$result=$this->db->query($sql)->result();
		if(count($result)>0)
		{
			for($i=0;$i<count($result);$i++)
			{
				$getDup="select status from alplapplications where applicationId=".$result[$i]->applicationId;
					$resultDup=$this->db->query($getDup)->result();
					$status="select status from corestatus where statusId=".$resultDup[0]->status;
					$resultStatus=$this->db->query($status)->result();
					if(count($resultStatus)>0)
					{
						if($resultStatus[0]->status=='Duplicate')
						{
						$result[$i]->Status='Marked As Duplicate';
						}
					}
					else
					{
						$getData="select * from alplapplications,alplallocationentry
								where
								alplapplications.applicationId=alplallocationentry.applicationId
								and alplapplications.applicationId=".$result[$i]->applicationId;
						$resultData=$this->db->query($getData)->result();
						if(count($resultData)>0)
						{
							for($j=0;$j<count($resultData);$j++)
							{
								$process="select applicationId,processName,corestatus.status from alplallocationentry,corestatus,coreprocessmaster
										where 
										alplallocationentry.processId=coreprocessmaster.processId 
										and alplallocationentry.statusId=corestatus.statusId
										and corestatus.statusId like (".$resultData[$j]->statusId.") 
										and coreprocessmaster.processId like (".$resultData[$j]->processId.")
										and applicationId=".$result[$i]->applicationId;
										
								$resultprocess=$this->db->query($process)->result();
								//print_r($resultData[$j]->statusId);
								//print_r($resultprocess[0]);
								if($resultprocess[0]->processName=='Data Entry')
								{
									if($resultprocess[0]->status=='Started')
									{$result[$i]->DE_Status=$resultprocess[0]->status;}
									else
									if($resultprocess[0]->status=='Pending')
									{$result[$i]->DE_Status='Allocated';}
									else
									if($resultprocess[0]->status=='Completed')
									{$result[$i]->DE_Status=$resultprocess[0]->status;}
								
								}
								if($resultprocess[0]->processName=='Field Investigation')
								{
									if($resultprocess[0]->status=='Started')
									{$result[$i]->FI_Status=$resultprocess[0]->status;}
									else
									if($resultprocess[0]->status=='Pending')
									{$result[$i]->FI_Status='Allocated';}
									else
									if($resultprocess[0]->status=='Completed')
									{$result[$i]->FI_Status=$resultprocess[0]->status;}
								
								}
								if($resultprocess[0]->processName=='QC')
								{
									if($resultprocess[0]->status=='Started')
									{$result[$i]->QC_Status=$resultprocess[0]->status;}
									else
									if($resultprocess[0]->status=='Pending')
									{$result[$i]->QC_Status='Allocated';}
									else
									if($resultprocess[0]->status=='Completed')
									{$result[$i]->Qc_Status=$resultprocess[0]->status;}
								
								}
								if($resultprocess[0]->processName=='CAM')
								{
									if($resultprocess[0]->status=='Started')
									{$result[$i]->CAM_Status=$resultprocess[0]->status;}
									else
									if($resultprocess[0]->status=='Pending')
									{$result[$i]->CAM_Status='Allocated';}
									else
									if($resultprocess[0]->status=='Completed')
									{$result[$i]->CAM_Status=$resultprocess[0]->status;}
								
								}
								if($resultprocess[0]->processName=='Audit Entry')
								{
									if($resultprocess[0]->status=='Started')
									{$result[$i]->Audit_Status=$resultprocess[0]->status;}
									else
									if($resultprocess[0]->status=='Pending')
									{$result[$i]->Audit_Status='Allocated';}
									else
									if($resultprocess[0]->status=='Completed')
									{$result[$i]->Audit_Status=$resultprocess[0]->status;}
								
								}
							}
						}
						else
						{
							$result[$i]->Status="No Process Started";
						}
							
					}
			}
					return $result;
		}
		else
		{
			return false;
		}
	}
	
	function purgeMasters($masterTbl,$whr){

		$sql = "update ".$masterTbl." set isDel=1 where 1=1 ".$whr;
		$qparent = $this->db->query($sql);
		return true;
			
	}
	function getLastId($masterTbl, $primary){

		$sql="select max(".$primary.") as lastCount from ".$masterTbl;
						
		// echo $sql;
		$result=$this->db->query($sql)->result();
		if(count($result)>0)
		{
			return $result[0]->lastCount;		
		}	
		return 0;
			
	}
}
?>