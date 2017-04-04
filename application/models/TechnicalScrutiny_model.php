<?php
class TechnicalScrutiny_model extends CI_Model {

       public function importData($csvname)
        {
		        return $csvname;
        }
		public function startEntry($processId,$userId)
    	{
			$startDate = date('Y-m-d H:i:s', time());
			$pending = $id = 0;
			if($processId == 9)
			{
				 $getAllocated="SELECT * FROM tsallocationentry,tsuploadcheques
								where tsallocationentry.uploadChequesId=tsuploadcheques.uploadChequesId
								and userId=".$userId."
								and processId=".$processId."
								and tsuploadcheques.uploadChequesId NOT IN
							(select tsdataentry.UploadChequesId from tsdataentry
								where tsdataentry.processId=$processId) 
								order by tsuploadcheques.uploadChequesId asc limit 1";
				$rslt=$this->db->query($getAllocated)->result();
				//print_r(count($rslt));
				/*if(count($rslt)==0)
				{
				 $sql = "select tsuploadcheques.* from tsuploadcheques
						where uploadChequesId NOT IN (select UploadChequesId from tsdataentry
						where tsdataentry.processId=9)
						and uploadChequesId NOT IN (select uploadChequesId from tsallocationentry
						where tsallocationentry.processId=9) order by tsuploadcheques.uploadChequesId asc limit 1";
				$qparent = $this->db->query($sql)->result();
				}
				else
				{
*/					$qparent=$rslt;
				//}//print_r($qparent);
				if(count($qparent) > 0)
				{
					if($qparent[0]->batchNo!="")
					{
					$sqlpen= "select count(*) as pendingCount from tsuploadcheques
						where uploadChequesId NOT IN (select UploadChequesId from tsdataentry
						where tsdataentry.processId=9)
						and uploadChequesId IN (select uploadChequesId from tsallocationentry
						where tsallocationentry.processId=9) and batchNo=".$qparent[0]->batchNo." order by tsuploadcheques.uploadChequesId";
				$rslpending = $this->db->query($sqlpen)->result();

				$sql1= "select count(*) as totalCount from tsuploadcheques
							where batchNo=".$qparent[0]->batchNo;
				$pending = $this->db->query($sql1)->result();
					$qparent[0]->total=$pending[0]->totalCount;
					$qparent[0]->pendingCount=$rslpending[0]->pendingCount;
			}
				}
			}

			else if($processId == 10)
			{
				 $getAllocated="SELECT * FROM tsallocationentry,tsuploadcheques
								where tsallocationentry.uploadChequesId=tsuploadcheques.uploadChequesId
								and userId=".$userId."
								and processId=".$processId."
								and tsuploadcheques.uploadChequesId NOT IN
								(select tsdataentry.uploadChequesId from tsdataentry
								where tsdataentry.processId=$processId)
								and tsuploadcheques.uploadChequesId IN
								(select tsdataentry.uploadChequesId from tsdataentry
								where tsdataentry.processId=9 and tsdataentry.reasonId=20)
								
								order by tsuploadcheques.uploadChequesId asc limit 1";
				$rslt=$this->db->query($getAllocated)->result();
				/*if(count($rslt)==0)
				{
				 $sql = "select tsuploadcheques.*,tsdataentry.chequeDate from tsuploadcheques,tsdataentry
						where tsuploadcheques.uploadChequesId NOT IN (select uploadChequesId from tsdataentry
						where tsdataentry.processId=$processId)
						and tsuploadcheques.uploadChequesId IN
								(select tsdataentry.uploadChequesId from tsdataentry
								where tsdataentry.processId=9 and tsdataentry.reasonId=20)
								order by tsdataentry.uploadChequesId asc limit 1";
				 
				$qparent = $this->db->query($sql)->result();
				}
				else
				{*/
					$qparent=$rslt;
				//}
				if(count($qparent) > 0){
				
					if($qparent[0]->batchNo!="")
					{
					$pen="select count(*) as pendingCount from tsuploadcheques
							where tsuploadcheques.uploadChequesId NOT IN (select UploadChequesId from tsdataentry
							where tsdataentry.processId=$processId)
							and tsuploadcheques.uploadChequesId IN
									(select tsdataentry.UploadChequesId from tsdataentry
									where tsdataentry.processId=9 and tsdataentry.reasonId=20)
									and tsuploadcheques.batchNo=".$qparent[0]->batchNo."
									order by uploadChequesId asc";
						$rslpen=$this->db->query($pen)->result();
				//print_r($rslpen);
					$sql1= "select tsuploadcheques.*,count(*) as totalCount from tsuploadcheques
							where
							 tsuploadcheques.uploadChequesId IN
									(select tsdataentry.UploadChequesId from tsdataentry
									where tsdataentry.processId=9 and tsdataentry.reasonId=20) and tsuploadcheques.batchNo=".$qparent[0]->batchNo;
						$pending = $this->db->query($sql1)->result();
						$payeeName="select payeeName from tsdataentry where UploadChequesId=".$qparent[0]->uploadChequesId;
						$payeeRslt=$this->db->query($payeeName)->result();
						
						$qparent[0]->total=$pending[0]->totalCount;
						$qparent[0]->pendingCount=$rslpen[0]->pendingCount;
						//$qparent[0]->chequeDate=$qparent[0]->chequeDate;
						$qparent[0]->payeeName=$payeeRslt[0]->payeeName;
					}
					
				
					
				}
				


			}
			else if($processId == 11)
			{
				//print_r($qparent);
				   $sql11 = "select tsdataentry.*,tsuploadcheques.* 
				   			from tsdataentry,tsuploadcheques,coreusers
							where coreusers.userId = tsdataentry.userId
							and  tsdataentry.uploadChequesId=tsuploadcheques.uploadChequesId
							and tsdataentry.uploadChequesId Not In
							(select uploadChequesId from tsdataentry where processId=11)
							and tsdataentry.reasonId!=20
							ORDER by dataEntryId asc limit 1 ";

				$qparent =  $this->db->query($sql11)->result();
				//print_r($qparent);
				if(count($qparent)>0)
				{
					$sqlfullName = "select fullName from coreusers where userId = ".$qparent[0]->userId;
					$pending = $this->db->query($sqlfullName)->result();
					$qparent[0]->fullName=$pending[0]->fullName;
					 $sqlreasonId= "select reasonName from tsreasonmaster where reasonId=".$qparent[0]->reasonId;
					$pending = $this->db->query($sqlreasonId)->result();

					$qparent[0]->reasonName=$pending[0]->reasonName;

				if($qparent[0]->batchNo!="")
				{
					$sqlpen = "select count(*) as pendingCount from tsdataentry
						INNER JOIN tsreasonmaster
						on  tsreasonmaster.reasonId=tsdataentry.reasonId
						INNER JOIN tsreasontype
						on tsreasonmaster.type=tsreasontype.typeId
						INNER JOIN coreusers
						on coreusers.userId = tsdataentry.userId
						inner join tsuploadcheques
						on tsdataentry.uploadChequesId=tsuploadcheques.uploadChequesId
						and tsdataentry.uploadChequesId Not In
						(select uploadChequesId from tsdataentry where processId=11)
						and tsdataentry.reasonId!=20 and tsuploadcheques.batchNo=".$qparent[0]->batchNo."
						ORDER by dataEntryId asc ";

				$qparentsqlpen =  $this->db->query($sqlpen)->result();

					$sql1= "select *,count(*) as totalCount from tsdataentry
						INNER JOIN tsreasonmaster
						on  tsreasonmaster.reasonId=tsdataentry.reasonId
						INNER JOIN tsreasontype
						on tsreasonmaster.type=tsreasontype.typeId
						INNER JOIN coreusers
						on coreusers.userId = tsdataentry.userId
						inner join tsuploadcheques
						on tsdataentry.uploadChequesId=tsuploadcheques.uploadChequesId
						and tsdataentry.reasonId!=20 and tsuploadcheques.batchNo=".$qparent[0]->batchNo;
					$pending = $this->db->query($sql1)->result();
					$qparent[0]->total=$pending[0]->totalCount;
					
					$sql1= "select amount as amount1 from tsuploadcheques where uploadChequesId=".$qparent[0]->uploadChequesId;
					$pending = $this->db->query($sql1)->result();
					$qparent[0]->amount1=$pending[0]->amount1;
					$qparent[0]->pendingCount=$qparentsqlpen[0]->pendingCount;
					$username1="select fullName from coreusers where userId=".$qparent[0]->userId;
					$userrslt1=$this->db->query($username1)->result();
					$qparent[0]->fullNameD1=$userrslt1[0]->fullName;
					$payeeName="select payeeName from tsdataentry where UploadChequesId=".$qparent[0]->uploadChequesId;
						$payeeRslt=$this->db->query($payeeName)->result();
						$qparent[0]->payeeName=$payeeRslt[0]->payeeName;
											
				}
				}
			}
			else if($processId == 12)
			{
				
				$qparent=array();
				$sql="select t2.UploadChequesId 
						FROM tsdataentry t1, tsdataentry t2 
						where 
						t1.UploadChequesId=t2.UploadChequesId and t1.amount!=t2.amount 
						and t1.UploadChequesId not in (select UploadChequesId from tsdataentry where processId=12)
						order by t2.UploadChequesId asc limit 1";
				$qparent1 =  $this->db->query($sql)->result();
				$getTotal="select count(*) as totalCount 
					FROM tsdataentry t1, tsdataentry t2 
					where 
					t1.UploadChequesId=t2.UploadChequesId and t1.amount!=t2.amount
					and t2.processId=(select processId from coreprocessmaster where processName like 'Data Entry 2')
					order by t2.UploadChequesId";
				$qparenttotal =  $this->db->query($getTotal)->result();
				
				$qparentpending="select count(*) as pendingCount 
						FROM tsdataentry t1, tsdataentry t2 
						where 
						t1.UploadChequesId=t2.UploadChequesId and t1.amount!=t2.amount 
						and t1.UploadChequesId not in (select UploadChequesId from tsdataentry where processId=12)
						order by t2.UploadChequesId";
				$qparentpending =  $this->db->query($qparentpending)->result();		
				if(count($qparent1)>0)
				{
					 $getD1="select fullName,tsdataentry.amount as amountD1,tsdataentry.chequeDate from coreusers ,tsdataentry 
							where coreusers.userId=tsdataentry.userId 
							and tsdataentry.processId in (select processId from coreprocessmaster where processName like 'Data Entry 1')
							and tsdataentry.UploadChequesId=".$qparent1[0]->UploadChequesId;
					$D1Data=$this->db->query($getD1)->result();
					$getD2="select fullName as fullNameD2,tsdataentry.*,tsdataentry.amount as amountD2 from coreusers ,tsdataentry 
							where coreusers.userId=tsdataentry.userId 
						and tsdataentry.processId in (select processId from coreprocessmaster where processName like 'Data Entry 2')													    					and tsdataentry.UploadChequesId=".$qparent1[0]->UploadChequesId;
					$D2Data=$this->db->query($getD2)->result();
					//	print_r($D2Data);
					//$qparent[0]=$g
					$bnkamout="select amount,job,batchNo,recdDate,imageName from tsuploadcheques where uploadChequesId=".$qparent1[0]->UploadChequesId;
					$rsltbnkamt=$this->db->query($bnkamout)->result();
					
					
					$D2Data[0]->total=$qparenttotal[0]->totalCount;
					$D2Data[0]->pendingCount=$qparentpending[0]->pendingCount;
					$D2Data[0]->uploadChequesId=$qparent1[0]->UploadChequesId;
					$D2Data[0]->fullNameD1=$D1Data[0]->fullName;
					$D2Data[0]->amountD1=$D1Data[0]->amountD1;
					$D2Data[0]->bnkamount=$D2Data[0]->amount;
					$D2Data[0]->job=$rsltbnkamt[0]->job;
					$D2Data[0]->batchNo=$rsltbnkamt[0]->batchNo;
					$D2Data[0]->recdDate=$rsltbnkamt[0]->recdDate;
					$D2Data[0]->imageName=$rsltbnkamt[0]->imageName;
					$qparent[0]=$D2Data[0];
							
				}
			}

			//print_r($D2Data);
			return $qparent;

		}


		//---------------------------------------------------------------------------------------------------

	public function TSgetBatchApplication($processId)
	{
		
				if($processId==9)
				{
					$sql = "SELECT DISTINCT batchNo FROM tsuploadcheques WHERE uploadChequesId NOT IN( SELECT tsallocationentry.uploadChequesId FROM tsallocationentry WHERE tsallocationentry.processId = '$processId' )";
				}

				if($processId==10)
				{
				$sql = "SELECT DISTINCT batchNo,fullName FROM tsuploadcheques,coreusers,tsallocationentry
							 WHERE 
							 tsuploadcheques.uploadChequesId NOT IN( SELECT tsallocationentry.uploadChequesId FROM tsallocationentry WHERE tsallocationentry.processId = '$processId' )
							and
							 tsuploadcheques.uploadChequesId IN( SELECT tsallocationentry.uploadChequesId FROM tsallocationentry WHERE tsallocationentry.processId = 9 )
							 and tsallocationentry.userId= coreusers.userId
							 and tsallocationentry.uploadChequesId=tsuploadcheques.UploadChequesId
"
							 ;
				}
				
//            if($processId==9)
//				{
//
//					$sql="select t2.* from tsuploadcheques as t2
//							WHERE
//							t2.batchNo=".$batchId."
//							and
//							t2.uploadChequesId not IN( SELECT uploadChequesId from tsallocationentry WHERE processId=".$processId.")";
//
//			}
//				else
//				{
//						$sql="select distinct t2.*
//						 from tsuploadcheques as t2 , tsallocationentry as t3,tsdataentry as t4
//						 WHERE
//						 t4.batchId=t2.batchNo and t2.batchNo='".$batchId."'
//						 and
//						 t2.uploadChequesId not IN( SELECT uploadChequesId from tsallocationentry WHERE processId=".$processId.")
//						 and
//						 t2.uploadChequesId IN( SELECT uploadChequesId from tsallocationentry
//						 WHERE processId=(select processId from coreprocessmaster where processName like 'Data Entry'))
//						 and t3.allocationId=t4.allocationId";
//
//
//				}
				$qparent= $this->db->query($sql);
				return $qparent->result();
		}
			//ALLOCATE APPLICATION
	public function TSallocateApplication($processId,$UserId,$batchNo)
	{
		$asd = "select statusId from corestatus where status like 'Allocated'";
		$status = $this->db->query($asd)->result();
		$statusid = $status[0]->statusId;
        $asd2 = "select uploadChequesId from tsuploadcheques where batchNo ='$batchNo' 
						and tsuploadcheques.uploadChequesId not in (select UploadChequesId from tsdataentry where processId=".$processId.")";
		$id = $this->db->query($asd2)->result();
	//print_r($id);
		//$uploadChequesId = "";
                for($i=0;$i<count($id);$i++){
                
                    $uploadChequesId = $id[$i]->uploadChequesId;
				//	print_r($uploadChequesId);
                    $sql = "insert into tsallocationentry (processId, uploadChequesId, userId, statusId) values(".$processId.",".$id[$i]->uploadChequesId.",".$UserId.",".$statusid.")";
				$qparent = $this->db->query($sql);
                	$sql1 = "UPDATE tsuploadcheques set status = ".$statusid." where uploadChequesId = ".$uploadChequesId;
				$qparent = $this->db->query($sql1);
                }
				
				return $this->db->insert_id();
	}
        public function getTSUsers()
	{			$sql = "select fullName,userId from coreusers";
					$qparent = $this->db->query($sql);
					return $qparent->result();
	}
	//SEARCH ALLOCATED RECORDS FOR RELEASING
	public function getSearchTSRelease($key, $val)
	{
		$sql = "";
		if($key == "user")
		{
					$sql = "SELECT 
							distinct tsuploadcheques.batchNo,coreprocessmaster.processName 
							from 
							tsallocationentry,tsuploadcheques,coreusers,coreprocessmaster 
							where 
							tsallocationentry.uploadChequesId=tsuploadcheques.uploadChequesId 
							AND tsallocationentry.userId=coreusers.userId 
							and coreprocessmaster.processId=tsallocationentry.processId 
							and tsallocationentry.userId = ".$val."
							and tsuploadcheques.uploadChequesId not in (SELECT UploadChequesId from tsdataentry)";

				   	$qparent = $this->db->query($sql)->result();
					
					return $qparent;

		}
	}
    public function DeleteTSRelease($allocationId="")
	{
		//echo $allocationId;
				$arr = explode(",",$allocationId);
			//	print_r($arr);
		       for($i=0;$i<count($arr);$i++)
			   {
				$select="select tsuploadcheques.uploadChequesId from tsuploadcheques
				 where batchNo=".$arr[$i]." and tsuploadcheques.uploadChequesId not in(select UploadChequesId from tsdataentry)"  ;   
		        $qparent = $this->db->query($select)->result();
				for($j=0;$j<count($qparent);$j++)
				{
					$sql="DELETE FROM tsallocationentry WHERE uploadChequesId IN (".$qparent[$j]->uploadChequesId.")";
               		$release = $this->db->query($sql);
					$updatesql = "UPDATE tsuploadcheques set status = (select statusId from corestatus where status like 'Non Allocated') where uploadChequesId IN (".$allocationId.") ";
					$updaterslt = $this->db->query($updatesql);

				}
			   //	print_r($qparent);
			   }
			   //$sql="DELETE FROM tsallocationentry WHERE uploadChequesId IN (".$allocationId.")";
               //$qparent = $this->db->query($sql);

			  // $sql1 = "UPDATE tsuploadcheques set status = 0 where uploadChequesId IN (".$allocationId.") ";
				//$qparent = $this->db->query($sql1);

		return $qparent;
    }

//=======================================================================================================================

		public function getreport($enddate)
        {
		 if($enddate!="" && $enddate!="0")
		 {
						$monthFrom=date('m', strtotime($enddate));
									$orderdateFrom = explode('-', $enddate);
									$dateFrom=$orderdateFrom[2];
									$yearFrom=$orderdateFrom[0];
									$enddate1=date_create($yearFrom.'-'.$monthFrom.'-'.$dateFrom);
									//echo $enddate1;
									$now=time();

									$enddate=date_format($enddate1,"Y-m-d");
									//$to=$to.' '.'24:00:00';
		 }

	    // $sql = "SELECT UploadChequesId,userId FROM `tsdataentry` where startDate LIKE '$enddate%'";
		// $result=$this->db->query($sql)->result();

			 $sql1="SELECT tsuploadcheques.recdDate,tsuploadcheques.accountNo,tsuploadcheques.chequeId,
			       	tsuploadcheques.MICR,tsuploadcheques.amount,tsdataentry.payeeName,coreprocessmaster.processId,coreprocessmaster.processName,
                   	coreusers.fullName 
				   	FROM tsuploadcheques,tsdataentry,coreusers,coreprocessmaster
	                WHERE 
					tsuploadcheques.uploadChequesId=tsdataentry.uploadChequesId 
					AND coreusers.userId=tsdataentry.userId 
					AND tsdataentry.endDate LIKE '$enddate%'
					and coreprocessmaster.processId=tsdataentry.processId";

		    $result1 = $this->db->query($sql1)->result();
		if(count($result1)>0)
		{
					return $result1;
		}
		else {
		return false;
	    }
		}
                
        public function deletepurgedata($clgDate)
		{
			$selectSql="select uploadChequesId from tsuploadcheques where recdDate='$clgDate'";
			$qparent=$this->db->query($selectSql)->result();
			if(count($qparent)>0)
			{
				for($i=0;$i<count($qparent);$i++)
				{
					 $deletesql="DELETE FROM tsallocationentry WHERE uploadChequesId=".$qparent[$i]->uploadChequesId;
					$deleteqparent = $this->db->query($deletesql);
				}
			}
			$sql="DELETE FROM tsuploadcheques WHERE recdDate='$clgDate'";
			$qparent1 = $this->db->query($sql);
			$qu= $this->db->affected_rows();
			$sql1 = "DELETE FROM tsdataentry WHERE clgDate='$clgDate'";
			$qparent = $this->db->query($sql1);
			$qu += $this->db->affected_rows();
			return $qu;
        }

                public function processStatusGetReport($enddate)
        {	//	echo "-----";

		  if($enddate!="" && $enddate!="0")
		 {
						$monthFrom=date('m', strtotime($enddate));
									$orderdateFrom = explode('-', $enddate);
									$dateFrom=$orderdateFrom[2];
									$yearFrom=$orderdateFrom[0];
									$enddate1=date_create($yearFrom.'-'.$monthFrom.'-'.$dateFrom);

									$now=time();
								//
									$enddate=date_format($enddate1,"Y-m-d");
									//$to=$to.' '.'24:00:00';


		 }
		
			$sql1="SELECT 
					tsdataentry.batchNo,
					tsdataentry.totalCheque,
					MIN(tsdataentry.pendingCheque) as pendingCheque, 
					coreprocessmaster.processName,
					coreusers.fullName 
					FROM 
					tsdataentry,
					coreprocessmaster,
					coreusers 
					WHERE 
					tsdataentry.processId=coreprocessmaster.processId 
					AND 
					tsdataentry.processId='9' 
					AND 
					coreusers.userId = tsdataentry.userId 
					AND DATE(endDate)='$enddate%' 
					GROUP BY tsdataentry.userId,tsdataentry.batchNo";
		   	 $result1 = $this->db->query($sql1)->result();
			
			 $sql2="SELECT 
					tsdataentry.batchNo,tsdataentry.totalCheque,MIN(tsdataentry.pendingCheque) as pendingCheque, 					
					coreprocessmaster.processName,coreusers.fullName 
					FROM 
					tsdataentry,coreprocessmaster,coreusers 
					WHERE tsdataentry.processId=coreprocessmaster.processId 
					AND tsdataentry.processId='10' 
					AND coreusers.userId = tsdataentry.userId 
					AND DATE(endDate)='$enddate' GROUP BY tsdataentry.userId,tsdataentry.batchNo";
		    
			$result2 = $this->db->query($sql2)->result();
			
		    $sql3="SELECT 
				  tsdataentry.batchNo,tsdataentry.totalCheque,MIN(tsdataentry.pendingCheque) as pendingCheque, 									 				  coreprocessmaster.processName,coreusers.fullName 
				  FROM 
				  tsdataentry,coreprocessmaster,coreusers 
				  WHERE 				   	
				  tsdataentry.processId=coreprocessmaster.processId 
				  AND coreusers.userId = tsdataentry.userId 
				  AND DATE(endDate)='$enddate' 
				  AND tsdataentry.processId='11' 
				  GROUP BY tsdataentry.userId,tsdataentry.batchNo ";
		    $result3 = $this->db->query($sql3)->result();
			/*$sql4="SELECT count(* ) as total 
					from tsdataentry t1,tsdataentry t2
					where( t1.amount!=t2.amount 
					and t1.processId=9 
					and t2.processId=10)";
 			$result4 = $this->db->query($sql4)->result();*/
 		
			$sql4="SELECT count(*) as totalCheque,t2.batchNo,coreusers.fullName ,coreprocessmaster.processName
					from tsdataentry t1,tsdataentry t2,coreusers,coreprocessmaster
					where t1.amount!=t2.amount 
					and t1.processId=9 
					and t2.processId=10
					and coreusers.userId=t2.userId
					and coreprocessmaster.processId=12
					and t2.reasonId=20
					and t1.reasonId=20";
 		$result4 = $this->db->query($sql4)->result();
 		$sql5="SELECT count(* ) as pendingCheque,t2.batchNo,coreusers.fullName ,coreprocessmaster.processName 
				from tsdataentry t1,tsdataentry t2 ,coreusers,coreprocessmaster
				where( t1.amount!=t2.amount and t1.processId=9 and t2.processId=10) 
				and t2.processId not IN(12)
				and coreusers.userId=t2.userId
				and coreprocessmaster.processId=12
				and t2.reasonId=20
					and t1.reasonId=20";
 		$result5 = $this->db->query($sql5)->result();
		
		
	$totalcount="SELECT count( * ) AS totalCheque,t2.batchNo,coreprocessmaster.processName,coreusers.fullName
					FROM tsdataentry t1, tsdataentry t2,tsdataentry,coreprocessmaster,coreusers
					WHERE t1.UploadChequesId = t2.UploadChequesId
					AND t1.amount != t2.amount
					AND t2.processId = (
					SELECT processId
					FROM coreprocessmaster
					WHERE processName LIKE 'Data Entry 2' )
					AND t1.processId =9
					AND t2.processId =10
					and tsdataentry.userId=coreusers.userId
					and tsdataentry.processId=coreprocessmaster.processId
					ORDER BY t2.UploadChequesId";
				$qparenttotal =  $this->db->query($totalcount)->result();

		$pending="SELECT count( * ) AS pendingCheque
					FROM tsdataentry t1, tsdataentry t2
					WHERE t1.UploadChequesId = t2.UploadChequesId
					AND t1.amount != t2.amount
					AND t2.processId = (
					SELECT processId
					FROM coreprocessmaster
					WHERE processName LIKE 'Data Entry 2' )
					AND t2.UploadChequesId NOT
					IN (SELECT UploadChequesId
					FROM tsdataentry
					WHERE processId =12
					)
					
					ORDER BY t2.UploadChequesId";
				$qparentpending =  $this->db->query($pending)->result();
				
		//print_r();
 		$qparenttotal[0]->pendingCheque=$qparentpending[0]->pendingCheque;
 
 			return $result = array_merge($result1,$result2,$result3,$qparenttotal	);
		}
		
		public function pendingWorkGetReport($batchno)
        {
			$sql1="SELECT coreprocessmaster.processName,tsdataentry.totalCheque,MIN(tsdataentry.pendingCheque) as pendingCheque
			 FROM tsdataentry,coreprocessmaster
			 WHERE coreprocessmaster.processId = tsdataentry.processId AND
			 tsdataentry.batchNo = '$batchno' AND tsdataentry.processId='9'";
		    $result1 = $this->db->query($sql1)->result();
			$sql2="SELECT coreprocessmaster.processName,tsdataentry.totalCheque,MIN(tsdataentry.pendingCheque) as pendingCheque
			 FROM tsdataentry,coreprocessmaster
			 WHERE coreprocessmaster.processId = tsdataentry.processId AND
			 tsdataentry.batchNo = '$batchno' AND tsdataentry.processId='10'";
		    $result2 = $this->db->query($sql2)->result();
			 $sql3="SELECT coreprocessmaster.processName,tsdataentry.totalCheque,MIN(tsdataentry.pendingCheque) as pendingCheque
			 FROM tsdataentry,coreprocessmaster
			 WHERE coreprocessmaster.processId = tsdataentry.processId AND
			 tsdataentry.batchNo = '$batchno' AND tsdataentry.processId='11'";
		    $result3 = $this->db->query($sql3)->result();
			$sql4="SELECT count(* ) as totalCheque,coreprocessmaster.processName
					from tsdataentry t1,tsdataentry t2,coreusers,coreprocessmaster
					where( t1.amount!=t2.amount 
					and t1.processId=9 
					and t2.processId=10)
					and coreusers.userId=t2.userId
					and coreprocessmaster.processId=12
					and t2.reasonId=20
					and t1.reasonId=20
					and t2.batchNo=$batchno
					and t1.batchNo=$batchno";
 		$result4 = $this->db->query($sql4)->result();
 		$sql5="SELECT count(* ) as pendingCheque,coreprocessmaster.processName 
				from tsdataentry t1,tsdataentry t2 ,coreusers,coreprocessmaster
				where( t1.amount!=t2.amount and t1.processId=9 and t2.processId=10) 
				and t2.processId not IN(12)
				and coreusers.userId=t2.userId
				and coreprocessmaster.processId=12
				and t2.reasonId=20
					and t1.reasonId=20
					and t2.batchNo=$batchno
					and t1.batchNo=$batchno";
 		$result5 = $this->db->query($sql5)->result();
		//print_r();
 		$result4[0]->pendingCheque=$result5[0]->pendingCheque;

			
			return $result = array_merge($result1,$result2,$result3,$result4);
		}
		//public static function genreport($batchNo,$clgDate)
			//genreport function

		public function inwardTechnicalScrutinyGetReport($batchNoFrom,$batchNoTo,$clgDate)
        {
			$date = str_replace('%20', ' ', $clgDate);
			$clgDate = date("Y-m-d", strtotime($date));
			$newarr = array();
			$result2 = array();
			$returnINC=array();
			$returnComplete=array();
			$returnAlready=array();
			$resultnew=array();
			$returnNoRecord = array();

			$diff = (int)ltrim($batchNoTo,"0") - (int)ltrim($batchNoFrom,"0");
			$k=$batchNoFrom;

			for($i=(int)ltrim($batchNoFrom,"0");$i<=(int)ltrim($batchNoTo,"0");$i++){
			 $batchNo = str_pad($k++, 6, 0, STR_PAD_LEFT);
			 $newarr =array();
			 $sql="SELECT dataEntryId,tsdataentry.UDKNo,tsdataentry.rejectReasonId,tsreasonmaster.reasonName,tsdataentry.payeeName,tsdataentry.batchNo,tsdataentry.UploadChequesId FROM tsdataentry,tsreasonmaster,tsuploadcheques
			 WHERE tsreasonmaster.reasonId = tsdataentry.reasonId AND
			 tsdataentry.batchNo='$batchNo' AND clgDate='$clgDate' AND tsdataentry.chequeId=tsuploadcheques.chequeId AND tsdataentry.status=1";
		    $result = $this->db->query($sql)->result();
			//print_r($result);
			
			
			
			
			
			
			$resultnew[$batchNo]=$result;
			if(count($result)>0)
			{
			   for($j=0;$j<count($result);$j++)
			   {
				   if($result[$j]->reasonName=="Ok / Clear")
				   {
					   $result[$j]->reasonName="";
					   $result[$j]->rejectReasonId="0";
					}
					else
					{
						$result[$j]->rejectReasonId="1";
					}
					$getpnstatus="select payeeName from tsuploadcheques where uploadChequesId=".$result[$j]->UploadChequesId;
					$rsltpnstatus=$this->db->query($getpnstatus)->result();
					if($rsltpnstatus[0]->payeeName=="" && $result[$j]->payeeName!="" )
					{
						$pnstatus="A";
					}
					else if($rsltpnstatus[0]->payeeName==$result[$j]->payeeName)
					{
						$pnstatus="N";
					}
					else if($rsltpnstatus[0]->payeeName!=$result[$j]->payeeName)
					{
						$pnstatus="M";
					}
			   		array_push($newarr,$result[$j]->UDKNo."|");
			   		array_push($newarr,$result[$j]->rejectReasonId."|");
			   		array_push($newarr,$result[$j]->reasonName."|");
			   		array_push($newarr,$result[$j]->payeeName."|");
					array_push($newarr,$pnstatus);
					array_push($newarr,PHP_EOL);
					
			   }

     		   $textdata = implode("",$newarr);
			  // print_r($textdata);
				
			  $job=date('Ymd');
			  $fn=date('ymd');
			  //echo date('H:i:s');
			  $fileName = "CTS_IW_".$fn."_".$batchNo;
				  if (!file_exists(IMAGE_INDEXING_TS_JOB_ROOT.$job."".SEPARATOR)) {

					 mkdir(IMAGE_INDEXING_TS_JOB_ROOT.$job."".SEPARATOR, 0777, true);

					}

				  if (!file_exists(IMAGE_INDEXING_TS_JOB_ROOT.$job."".SEPARATOR.$fileName.'.txt'))
				  {
					  //echo "File name==".IMAGE_INDEXING_TS_JOB_ROOT.$job."".SEPARATOR.$fileName.'.txt';
					  $sql = "SELECT COUNT(*) as records FROM tsdataentry WHERE tsdataentry.batchNo='$batchNo' AND clgDate='$clgDate' and status=1";
					  $result2 = $this->db->query($sql)->result();
					  $records=$result2[0]->records;

					  $sql = "SELECT COUNT(*) as records1 FROM tsuploadcheques WHERE batchNo='$batchNo' AND recdDate='$clgDate'";
					  $result2 = $this->db->query($sql)->result();
					  $records1=$result2[0]->records1;
					 // echo $records."==".$records1;
						  if($records==$records1)
						  {
							  write_file(IMAGE_INDEXING_TS_JOB_ROOT.$job."".SEPARATOR.$fileName.'.txt', $textdata);
							  $sql="INSERT INTO `tsinwardfilenames`( `fileNames`, `batchNo`, `clgDate`) VALUES ('$fileName.txt','$batchNo','$clgDate')";
			      			  $result4 = $this->db->query($sql);
							 //$resultnew[$i]->complete=$i;
							  $returnComplete[$batchNo]=$batchNo;
						  }
						  else
						  { $returnINC[$batchNo]=$batchNo;
						  }
				   }
				   else{ $returnAlready[$batchNo]=$batchNo;}

			}
			else
			{ $returnNoRecord[$i]=$batchNo;}

	}

	//print_r($returnNoRecord);


	//print_r($returnComplete);
		$return_result = array("NoRecordFound"=>$returnNoRecord,"incomplete"=>$returnINC,"alreadyExit"=>$returnAlready,"complete"=>$returnComplete,"result1"=>$resultnew);
		

			return $return_result;
		}



		public function pendencyCheckGetReport($enddate)
        {
		 	$date = str_replace('%20', ' ', $enddate);
			$enddate = date("Y-m-d", strtotime($date));
			$job = date("Ymd", strtotime($date));

			$sql="SELECT tsinwardfilenames.fileNames,totalCheque-sum(processId='9') as pendingInTs,totalCheque-sum(processId='10') as pendingInCap2,totalCheque-sum(processId='11') as pendingInReject, totalCheque,tsdataentry.batchNo FROM `tsdataentry`,tsinwardfilenames,tsuploadcheques WHERE DATE(endDate) = '$enddate' AND tsuploadcheques.recdDate='$enddate' AND tsuploadcheques.chequeId=tsdataentry.chequeId";
			$result = $this->db->query($sql)->result();

			if(count($result)>0)
			{
					return $result;
			}
			else {
			return false;
	    	}
		}

		public function userProductivityStatusGetReport($batchNo,$from,$to)
        {
			$from = str_replace('%20', ' ', $from);
			$from = date("Y-m-d", strtotime($from));
			$to = str_replace('%20', ' ', $to);
			$to = date("Y-m-d", strtotime($to));
			$sql="SELECT
			 batchNo,coreprocessmaster.processName,
			endDate,COUNT(tsdataentry.processId) as totalCount,coreusers.fullName
			FROM tsdataentry, coreusers,coreprocessmaster where batchNo='$batchNo' AND DATE(endDate)>='$from' AND DATE(endDate)<='$to'
			 AND coreprocessmaster.processId=tsdataentry.processId AND coreusers.userId=tsdataentry.userId GROUP BY  tsdataentry.userId,tsdataentry.processId ";
			$result = $this->db->query($sql)->result();
			if(count($result)>0)
			{
					return $result;
			}
			else {
			return false;
	    	}
		}



		public function importTXT($file,$json,$extData,$separator,$extention){
			$totalRows = 0;
			$batchName = "";
			$locSubstr="";
			$extData = stripslashes(urldecode($extData));
			$extData = substr($extData,1,-1);

			$obj = json_decode($extData);
			$extDataKeys = array_keys((array)$obj);
			//echo "SEP:".urlencode($separator);
			$arrData = $this->csvreader->parse_file($file,$separator);

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
							if($j ==  5){
								$arrData[$i][$j] = ltrim($arrData[$i][$j],"0");
							}
							if($j ==  8){
								$arrData[$i][$j] = $arrData[$i][$j]."F.JPG";
								//print_r($arrData[$i][$j]);
							}
							//echo "CURRENT i:".$i." j:".$j;
							if($arrMeta->Columns[$j]->dbdatatype == "string")
							{
									$rows.="'".$this->db->escape_str($arrData[$i][$j])."'";
							}
							else
							{
								$rows.="".$arrData[$i][$j]."";
							}
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
		public function hourlyStatusGetReport($date,$shift,$activity)
        {

				if($shift=="Day")//Shift Selected day
				{
					$monthFrom=date('m', strtotime($date));
					$orderdateFrom = explode('-', $date);
					$dateFrom=$orderdateFrom[2];
					$yearFrom=$orderdateFrom[0];
				    $from1=date_create($yearFrom.'-'.$monthFrom.'-'.$dateFrom);
					$checkDate=date_format($from1,"Y-m-d");
					//echo $activity;
				$activity = str_replace('%20', ' ', $activity);
				//$checkDate = date("Y-m-d",strtotime($startdate));
					$stime = "08:00:00";
					$etime = "20:00:00";

					$sql= "SELECT `userId`, Hour(endDate) as Hour,count(*) as total FROM `tsdataentry` WHERE `endDate`>='$checkDate $stime' AND `endDate`<='$checkDate $etime' AND processId=(SELECT processId FROM `coreprocessmaster` WHERE processName='$activity') GROUP BY HOUR(endDate),userId";


					$execute_result=$this->db->query($sql)->result();
					//print_r($execute_result);
					//echo "<pre>";print_r($execute_result);echo "</pre>";
					for($i=0;$i<count($execute_result);$i++)
					{

						$query_userID = "SELECT * FROM coreusers WHERE userId=".$execute_result[$i]->userId;
						$execute_result2=$this->db->query($query_userID)->result();
						//echo "<pre>";print_r($execute_result2);echo "</pre>";
						$execute_result[$i]->userID = $execute_result2[0]->userId;
						$execute_result[$i]->Operator = $execute_result2[0]->fullName;

						if($execute_result[$i]->Hour==8)
						{
							$execute_result[$i]->Eight=$execute_result[$i]->total;
						}
						else
						{
							$execute_result[$i]->Eight="0";
						}
						if($execute_result[$i]->Hour==9)
						{
							$execute_result[$i]->Nine=$execute_result[$i]->total;
						}
						else
						{
							$execute_result[$i]->Nine="0";
						}
						if($execute_result[$i]->Hour==10)
						{
							$execute_result[$i]->Ten=$execute_result[$i]->total;
						}
						else
						{
							$execute_result[$i]->Ten="0";
						}
						if($execute_result[$i]->Hour==11)
						{
							$execute_result[$i]->OneOne=$execute_result[$i]->total;
						}
						else
						{
							$execute_result[$i]->OneOne="0";
						}
						if($execute_result[$i]->Hour==12)
						{
							$execute_result[$i]->OneTwo=$execute_result[$i]->total;
						}
						else
						{
							$execute_result[$i]->OneTwo="0";
						}
						if($execute_result[$i]->Hour==13)
						{
							$execute_result[$i]->OneThree=$execute_result[$i]->total;
						}
						else
						{
							$execute_result[$i]->OneThree="0";
						}
						if($execute_result[$i]->Hour==14)
						{
							$execute_result[$i]->OneFour=$execute_result[$i]->total;
						}
						else
						{
							$execute_result[$i]->OneFour="0";
						}
						if($execute_result[$i]->Hour==15)
						{
							$execute_result[$i]->OneFive=$execute_result[$i]->total;
						}
						else
						{
							$execute_result[$i]->OneFive="0";
						}
						if($execute_result[$i]->Hour==16)
						{
							$execute_result[$i]->OneSix=$execute_result[$i]->total;
						}
						else
						{
							$execute_result[$i]->OneSix="0";
						}
						if($execute_result[$i]->Hour==17)
						{
							$execute_result[$i]->OneSeven=$execute_result[$i]->total;
						}
						else
						{
							$execute_result[$i]->OneSeven="0";
						}
						if($execute_result[$i]->Hour==18)
						{
							$execute_result[$i]->OneEight=$execute_result[$i]->total;
						}
						else
						{
							$execute_result[$i]->OneEight="0";
						}
						if($execute_result[$i]->Hour==19)
						{
							$execute_result[$i]->OneNine=$execute_result[$i]->total;
						}
						else
						{
							$execute_result[$i]->OneNine="0";
						}


						for($j=1;$j<count($execute_result);$j++)
						{
							if($execute_result[$i]->userId == $execute_result[$j]->userId)
							{
								if($execute_result[$j]->Hour==8)
								{
								$execute_result[$i]->Eight=$execute_result[$j]->total;
								}

						if($execute_result[$j]->Hour==9)
						{
							$execute_result[$i]->Nine=$execute_result[$j]->total;
						}

						if($execute_result[$j]->Hour==10)
						{
							$execute_result[$i]->Ten=$execute_result[$j]->total;
						}

						if($execute_result[$j]->Hour==11)
						{
							$execute_result[$i]->OneOne=$execute_result[$j]->total;
						}

						if($execute_result[$j]->Hour==12)
						{
							$execute_result[$i]->OneTwo=$execute_result[$j]->total;
						}

						if($execute_result[$j]->Hour==13)
						{
							$execute_result[$i]->OneThree=$execute_result[$j]->total;
						}

						if($execute_result[$j]->Hour==14)
						{
							$execute_result[$i]->OneFour=$execute_result[$j]->total;
						}

						if($execute_result[$j]->Hour==15)
						{
							$execute_result[$i]->OneFive=$execute_result[$j]->total;
						}

						if($execute_result[$j]->Hour==16)
						{
							$execute_result[$i]->OneSix=$execute_result[$j]->total;
						}

						if($execute_result[$j]->Hour==17)
						{
							$execute_result[$i]->OneSeven=$execute_result[$j]->total;
						}
						if($execute_result[$j]->Hour==18)
						{
							$execute_result[$i]->OneEight=$execute_result[$j]->total;
						}

						if($execute_result[$j]->Hour==19)
						{
							$execute_result[$i]->OneNine=$execute_result[$j]->total;
						}

						}
					}
					}
					//print_r($execute_result);
					//echo "<pre>";print_r($execute_result);echo "</pre>";
						return ($execute_result);
				}
				if($shift=="Night")//Shift Selected Night
				{}
			}
			//return ($execute_queryEntryID);
		public function getPrevious($entryId,$userId,$processId)
        {
			if($entryId==0)
			{
				$sql="select tsdataentry.*,tsuploadcheques.imageName,tsuploadcheques.job 
						from tsdataentry,tsuploadcheques
						where tsuploadcheques.uploadChequesId=tsdataentry.uploadChequesId
						and userId=".$userId." and processId=".$processId."
					order by dataEntryId desc limit 1";
				$qparent=$this->db->query($sql)->result();
			}
			else
			{
				$sql="select tsdataentry.* ,tsuploadcheques.imageName,tsuploadcheques.job 
						from tsdataentry,tsuploadcheques
						where tsuploadcheques.uploadChequesId=tsdataentry.uploadChequesId 
						and dataEntryId <".$entryId." and userId=".$userId." and processId=".$processId."
						order by dataEntryId desc limit 1";
			$qparent=$this->db->query($sql)->result();
			}
			//echo $sql;
			return $qparent;
		}
		
		public function getNext($entryId,$userId,$processId)
        {
			$sql="select *,tsuploadcheques.imageName,tsuploadcheques.job,tsdataentry.payeeName from tsdataentry,tsuploadcheques
						where tsuploadcheques.uploadChequesId=tsdataentry.uploadChequesId and dataEntryId >".$entryId." and userId=".$userId."
					and processId=".$processId."
				order by dataEntryId asc limit 1";
			$qparent=$this->db->query($sql)->result();
			return $qparent;
	    }

		public function folderscan($job,$jobName)
 	   {
		// GET ALL FILES FROM SCANDIR INCLUDING . AND ..
		$date = date('Y-m-d');
		//print_r($date);
		$arrFiles = array_diff(scandir($job), array('..', '.'));
		$arrSortedFiles = array();
		$arrFiles = array_values($arrFiles);
		$suffix='';
		$contents="";
		//$addRow="header".PHP_EOL;
		//print_r($arrFiles);
		//echo "count arrayFiles==".count($arrFiles);
		for($i=0;$i<count($arrFiles);$i++)
		{
			//echo "i==".$i;
			if(!is_dir($job."//".$arrFiles[$i]))
			$arrSortedFiles1[] = $arrFiles[$i];
			$arrFiles1 = array_diff(scandir($job."/".$arrFiles[$i]), array('..', '.'));
			//echo "<pre>";print_r($arrFiles1);echo "</pre>";
			$arrFiles1 = array_values($arrFiles1);
			for($j=0;$j<count($arrFiles1);$j++)
			{
				if(!is_dir($job."//".$arrFiles[$i]."//".$arrFiles1[$j]))
				$arrSortedFiles[] = $arrFiles1[$j];

				//echo "batch ID=".$arrFiles1;
			}

			$files = glob($file = $job."//".$arrFiles[$i] . '/*.txt');
			//print_r($files[0]);
			$ext = pathinfo(($files[0].'/*.txt'), PATHINFO_EXTENSION);

			if($ext=="txt")
			{
				$totalRows = 0;
				$locSubstr="";
				$batchNo = $arrFiles[$i];
				$extData=array("batchNo"=>$arrFiles[$i],
								"recdDate"=>$date,
								"job"=>$jobName
								);
				$separator="|";//$file,$json,$extData,$separator,$extention
				$json = IMPORT_CSVJSON_ROOT."tsUploadCheques.json";

				/*//$addrow=fopen($files[0],rw);
				//$addRow= file_get_contents($files[0]);
				$addRow=explode("\n",file_get_contents($files[0], 1));
				echo "<pre>";print_r(file_put_contents($files[0],$addRow));echo "</pre>";
				//file_put_contents($files[0],$contents[0]);
				/*$addRow="|".PHP_EOL;
				$addRow.=file_get_contents($files[0]);
				file_put_contents($files[0],$addRow);
				$addRow.=explode("\n", file_get_contents($addRow[0], 2);

				file_put_contents($files[0],$addRow);
						//	echo "<pre>";print_r($files[0]);echo "</pre>";
*/                              $str = "1810201611001000|0016|11001|337105|29|00000000|GAHIR|CTS\INWARD\|18102016110010000";
                               $fileContent = file_get_contents ($files[0]);
                               
                               if(strpos($fileContent, $str) !== false){
                                    
                               }else{
                                   $fo = fopen($files[0], "w");
                                    file_put_contents ($files[0], $str . "\r\n" . $fileContent);
                               }
                                    
				$arrData = $this->csvreader->parse_file($files[0],$separator);
                                
				//$arrData = $this->csvreader->parse_file($files[0],$separator);


				//echo "<pre>";print_r($arrData);echo "</pre>";
				$arrData = array_values($arrData); // CREATE 0 BASED ARRAY SINCE CSVREADER CLASS RETURN 1 BASED ARRAY
				$strJSON = read_file($json);
				$arrMeta = json_decode($strJSON);
				// PREPARE TABLE COLUMNS
				$sql = "insert into ".$arrMeta->PrimaryTable."( ";
				$cols = "";
				//echo "count=".count($arrMeta->Columns);
				 for($k=0;$k<count($arrMeta->Columns);$k++){
					 if($arrMeta->PrimaryTable == $arrMeta->Columns[$k]->table)
					 {
						 $cols.=",".$arrMeta->Columns[$k]->dbcol;
					 }
				 }

				 // INSERT INTO tmp (COL,COL,COL) VALUES ('','',''), VALUES ('','',''), VALUES ('','','')
			 	$cols = substr($cols, 1);
			 	$sql.= $cols." )";
			// exit();
			 // PREPARE TABLE ROWS
			 $rows = "";
			 $sql.=" VALUES ";

			 for($k=0;$k<count($arrData);$k++){
					$sql.="";
					if($k!=0) $rows = ", ";
					$rows.="(";

					for($l=0;$l<count($arrMeta->Columns);$l++){
						if($l!=0) $rows.=",";

						if($arrMeta->Columns[$l]->csvindex != "-1")
						{
							if($l ==  5){
								$suffix='';
								$arrData[$k][$l] = ltrim($arrData[$k][$l],"0");
								$suffix=$arrData[$k][$l]%100;
								if($suffix!=0)
								{
									$arrData[$k][$l]=substr($arrData[$k][$l],0,-2).".".$suffix;
								}
								else
								{
									$arrData[$k][$l]=substr($arrData[$k][$l],0,-2);
								}
							//	echo "<pre>";print_r(substr($arrData[$k][$l],0,-2));echo"</pre>";

							}
							if($l ==  8){
								$arrData[$k][$l] = $arrData[$k][$l]."F.JPG";

							}
							//echo "CURRENT i:".$k." j:".$l;
							if($arrMeta->Columns[$l]->dbdatatype == "string")
							{
									$rows.="'".$this->db->escape_str($arrData[$k][$l])."'";
							}
							else
							{
								$rows.="".$arrData[$k][$l]."";
							}
						}
						else
						{
							
							if(!is_object($extData))
							{
								$extData = json_decode(json_encode($extData));
							}
							if($arrMeta->Columns[$l]->dbdatatype == "string")
								$rows.="'".$this->db->escape_str($extData->{$arrMeta->Columns[$l]->dbcol})."'";
							else
								$rows.="".$extData->{$arrMeta->Columns[$l]->dbcol}."";
						}

					}
					$totalRows++;
					$rows.=")";
					$sql.=($rows);
			 }

			 //echo $sql;
			 $db_debug = $this->db->db_debug;
			 $this->db->db_debug = FALSE;
			 $result = $this->db->query($sql);
			 $this->db->db_debug = $db_debug;
			 $error = $this->db->error();

			$csvResult = array(
				"status"=>($error["code"] == "0")?true:false,
				"dberror"=>$error["message"],
				"mysqlerrorcode"=>$error,
				"batchNo"=>$arrFiles
			);

			}
		}
		return ($csvResult);
	}
	
		public function SearchStatus($account,$cheque)
        {
			$sql="select tsdataentry.*,coreusers.fullName,coreprocessmaster.processName ,tsreasonmaster.reasonName
						from tsdataentry,coreusers,coreprocessmaster,tsreasonmaster
						where 
						tsdataentry.userId=coreusers.userId
						and tsdataentry.processId=coreprocessmaster.processId
						and tsdataentry.reasonId=tsreasonmaster.reasonId
						";
			if($account!=0)
			{
				$sql.= " and accountNo='".$account."' " ;
			}			
			if($cheque!=0)
			{
				$sql.= " and chequeId='".$cheque."' ";
			}
			 $sql.="  order by UploadChequesId asc";
			$qparent=$this->db->query($sql)->result();
			return $qparent;
	    }
		public function UpdateStatus()
		{
			$sql="SELECT DISTINCT t2.UploadChequesId
			FROM tsdataentry t1, tsdataentry t2
			WHERE t1.UploadChequesId = t2.UploadChequesId
			AND t1.amount = t2.amount
			AND t1.UploadChequesId NOT
			IN (
			
			SELECT UploadChequesId
			FROM tsdataentry
			WHERE processId =12
			)
			AND t2.status =0
			AND t2.processId =10";
			$qparent=$this->db->query($sql)->result();
			for($i=0;$i<count($qparent);$i++)
			{
				$updatestatus="update tsdataentry set status=1 
				where processId=(select processId from coreprocessmaster where processName like 'Data Entry 2') and UploadChequesId=".$qparent[$i]->UploadChequesId." and status=0";
				$result=$this->db->query($updatestatus);
			}
			return $qparent;
		}

}
?>
