<?php

class OCTM_model extends CI_Model 
{
public function __construct()
{
  parent::__construct();
	$this->load->helper('file');
  $this->load->model('Core_model');
}	

 public function createbatchid($batchId,$clgdate,$categoryid,$lotid, $type)
{			
	
	$clgdate = str_replace("%20", " ", $clgdate);
	$clgdate = str_replace(",", " ", $clgdate);
	$clgdate = date("Y-m-d", strtotime($clgdate));
	$query = "SELECT * FROM `octmbatchmaster` WHERE batchId=$batchId AND clgDate='$clgdate'";
	$queryResult = $this->db->query($query)->result();
	//echo "counrt===".count($queryResult);
	if(count($queryResult)>0)
	{
		$insert_id="0";
	}
	else
	{
		$sql11 = "SELECT processId FROM `coreprocessmaster` WHERE `processName` LIKE 'Batch Started'";
		$result11 = $this->db->query($sql11)->result();
		//print_r($result11);
		if(count($result11)>0)
		{
		$sql = "INSERT INTO octmbatchmaster (batchId, clgDate, category, lotId, type, Status)
 		VALUE ('$batchId','$clgdate','$categoryid','$lotid','$type','".$result11[0]->processId."')";		    
		$qparent = $this->db->query($sql);
		$insert_id = $this->db->insert_id();
		}
		else
		{
			$insert_id="0";
		}
	}
	return $insert_id;
}
 
public function createbatchid1($batchId,$clgdate,$lotid, $type)
{			
	$array = explode('T', $clgdate);
	$clgdate = $array[0];
	$query = "SELECT * FROM `octmbatchmaster` WHERE batchId=$batchId AND clgDate='$clgdate'";
	$queryResult = $this->db->query($query)->result();
	if(count($queryResult)>0)
	{
		$insert_id="0";
	}
	else
	{
		$sql12 = "SELECT processId FROM `coreprocessmaster` WHERE `processName` LIKE 'Batch Started'";
		$result12 = $this->db->query($sql12)->result();

		$sql = "INSERT INTO octmbatchmaster (batchId, clgDate, lotId, type, Status)
 		VALUE ('$batchId','$clgdate','$lotid','$type','".$result12[0]->processId."')";		    
		$qparent = $this->db->query($sql);
		$insert_id = $this->db->insert_id();
	}
	return $insert_id;
}
public function getcheckrange($cardnumber)
{
		//Change By sangam
		
	$cardnumber = Substr($cardnumber,0,6);
	$sql = "SELECT * FROM `octmcreditcardrangemaster` WHERE Substr(toRange,1,6)>='$cardnumber' AND Substr(fromRange,1,6)<='$cardnumber' ";
	$result=$this->db->query($sql)->result();
	//print_r($result);
	return $result;
}

public function getlotcategory($batchId,$clgdate,$type)
{	
	
	//Change By sangam
	
	$clgdate = str_replace("%20", " ", $clgdate);
	$clgdate = str_replace("%2F", " ", $clgdate);
	$clgdate = str_replace(",", " ", $clgdate);
	$clgdate = date("Y-m-d", strtotime($clgdate));

	$type = str_replace("%20", " ", $type);
	if($type=="Cheque Entry")
	{
		$sql = "SELECT lotId,amount,clgdate,category,batchId,Status FROM `octmamountcategory`,octmbatchmaster 
			where 
				octmbatchmaster.batchId = $batchId AND 
				octmamountcategory.categoryName = octmbatchmaster.category AND
				octmbatchmaster.clgDate = '$clgdate' AND
				octmbatchmaster.type = '$type'";
	}
	else if($type=="Othercheque Entry")
	{
		$sql = "SELECT lotId,clgdate,batchId,Status FROM octmbatchmaster 
			where 
				batchId = $batchId AND
				clgDate = '$clgdate' AND
				type = '$type'";
	}
	$result=$this->db->query($sql)->result();
	//print_r($result);
	return $result;
}
public function getserialnumber($batchId,$clgdate,$lotnumber,$type)
{
		//Change By sangam
	$type = str_replace("%20", " ", $type);
	
	$clgdate = str_replace("%20", " ", $clgdate);
	$clgdate = str_replace(",", " ", $clgdate);
	$clgdate = date("Y-m-d", strtotime($clgdate));
	if($type=="Cheque Entry")
	{
		$sql = "SELECT serialNumber FROM octmchequeentry 
			where 
				batchNumber = '".$batchId."' AND 
				clgDate = '".$clgdate."' AND
				lotNumber = '".$lotnumber."' ORDER BY serialNumber DESC 
                        LIMIT 1 ";
	}
	else if($type=="Othercheque Entry")
	{
		 $sql = "SELECT MAX(serialNumber) as serialNumber FROM octmotherchequeentry 
			where 
				batchId = $batchId AND 
				clgDate = '$clgdate' AND
				lotNumber = $lotnumber";
	}
	$result=$this->db->query($sql)->result();
	//print_r($result);
	return $result;
}
public function getbatchfinish($batchId,$clgdate,$lotnumber,$type)
{	
	$type = str_replace("%20", " ", $type);
	$clgdate = str_replace("%20", " ", $clgdate);
	$clgdate = str_replace("%2F", " ", $clgdate);
	$clgdate = str_replace(",", " ", $clgdate);
	$clgdate = date("Y-m-d", strtotime($clgdate));

	if($type=="Cheque Entry")
	{
		$a = "UPDATE `octmbatchmaster` SET `Status` = 14 WHERE `batchId`='".$batchId."' AND `clgDate`='".$clgdate."' AND `lotId`='".$lotnumber."' AND `type`='".$type."' ";
	}
	else if($type=="Othercheque Entry")
	{
		$a = "UPDATE `octmbatchmaster` SET `Status` = 14 WHERE `batchId`='".$batchId."' AND `clgDate`='".$clgdate."' AND `lotId`='".$lotnumber."' AND `type`='".$type."' ";
	}
	$result=$this->db->query($a);
	return $result;
}
public function getbankname($micr)
{			
	$sql = "SELECT branchName FROM `corebankmaster` where micrCode = $micr ";	
	$result=$this->db->query($sql)->result();
	return $result;
}
public function getreport($clgdate,$lotnumber)
{			
		$clgdate = str_replace("%20", " ", $clgdate);
		$clgdate = str_replace(",", " ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));
	    $sql = "SELECT cardNumber,chequeNumber,chequeAmount,transCode,micrCode,payeeName FROM `octmotherchequeentry` where chequeDate = '".$clgdate."' AND lotNumber = $lotnumber";	
		$result=$this->db->query($sql)->result();
		return $result;
}
public function getbatchslip($batchId,$clgdate,$lotnumber)
{			
		//echo "date===".$clgdate;
		$clgdate = str_replace("%20"," ", $clgdate);
		$clgdate = str_replace("%2F"," ", $clgdate);
		$clgdate = str_replace(","," ", $clgdate);
		$clgdate = date("Y-m-d",strtotime($clgdate));
		
	  	$sql1 = "SELECT 'I C I C I		B A N K		( LOCAL CLEARING DETAILS )' as Title,batchNumber,lotNumber,serialNumber,chequeAmount,clgDate,categoryAmount,accountNumber,payinSlipDate,chequeDate,chequeNumber,micrCode,transCode,payeeName,draweeName,chequeAmnt,solId,accountNumber2,coreusers.fullName FROM coreusers,`octmchequeentry` where batchNumber = '$batchId' AND clgDate='$clgdate' AND lotNumber='$lotnumber' AND coreusers.userId=`octmchequeentry`.userName AND octmchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0";
		$result1=$this->db->query($sql1)->result();
		$totalCheque1="0";
		$totalAmt1="0";
		if(count($result1)>0)
		{
			$sql3 = "SELECT count(*) as totalCheque,SUM(chequeAmnt) as total FROM coreusers,`octmchequeentry` where batchNumber = '$batchId' AND clgDate='$clgdate' AND lotNumber='$lotnumber' AND coreusers.userId=`octmchequeentry`.userName AND octmchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0";
			$result3=$this->db->query($sql3)->result();
			//print_r($result3);
			$totalCheque1 = $result3[0]->totalCheque;
			$totalAmt1 = $result3[0]->total;
		}
		 $sql2 = "SELECT batchId as batchNumber,lotNumber,serialNumber,chequeAmount,clgDate,categoryAmount,accountNumber,chequeDate,chequeNumber,micrCode,transCode,payeeName,draweeName,chequeAmnt,solId,accountNumber2,coreusers.fullName FROM coreusers,`octmotherchequeentry` where batchId = '$batchId' AND clgDate ='$clgdate' AND lotNumber='$lotnumber' AND coreusers.userId=`octmotherchequeentry`.userCode AND `octmotherchequeentry`.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass')";
		$result2=$this->db->query($sql2)->result();
		$totalCheque2="0";
		$totalAmt2="0";
		//print_r($result2);
		if(count($result2)>0)
		{
			$sql4 = "SELECT count(*) as totalCheque,SUM(chequeAmnt) as total FROM coreusers,`octmotherchequeentry` where batchId = '$batchId' AND clgDate ='$clgdate' AND lotNumber='$lotnumber' AND coreusers.userId=`octmotherchequeentry`.userCode AND `octmotherchequeentry`.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass')";
			$result4=$this->db->query($sql4)->result();
			//print_r($result4);
			$totalCheque1 = $result3[0]->totalCheque;
			$totalAmt2 = $result4[0]->total;
		}
		//echo "result2==".count($result2);
		//echo "result1==".count($result1);
		if(count($result1)<=0 && count($result2)>0)
		{
			$result2[0]->totalCheque = $totalCheque1+$totalCheque2;
			$result2[0]->total = $totalAmt1+$totalAmt2;	
		}
		else if(count($result2)<=0 && count($result1)>0)
		{
			//echo "------";
			$result1[0]->totalCheque = $totalCheque1+$totalCheque2;
			$result1[0]->total = $totalAmt1+$totalAmt2;
		}
		else if(count($result1)>0 && count($result2)>0)
		{
			$result1[0]->totalCheque = $totalCheque1+$totalCheque2;
			$result1[0]->total = $totalAmt1+$totalAmt2;
		}
		$result = array_merge($result1,$result2);
		//print_r($result);
		return $result;
}
public function getuserreport()
{		
		$first_day_this_month = date('Y-m-01'); // hard-coded '01' for first day
		$last_day_this_month  = date('Y-m-t');
	        $sql = "SELECT count(*) as Total,userName,DATE(startTime) as date FROM `octmchequeentry` where startTime between '".$first_day_this_month."' AND '".$last_day_this_month."' GROUP BY DATE(startTime),userName";	
		 $result=$this->db->query($sql)->result();
		return $result;
}
public function getcategoryreport()
{		
		$result = array();
		$first_day_this_month = date('Y-m-01'); // hard-coded '01' for first day
		$last_day_this_month  = date('Y-m-t');
	        $sql = "SELECT count(*) as Total,categoryAmount as category,DATE(startTime) as date FROM `octmchequeentry` where startTime between '".$first_day_this_month."' AND '".$last_day_this_month."' GROUP BY DATE(startTime),category";	
	        $sql1 = "SELECT count(*) as Total,nonCtsCategoryName as category,DATE(startTime) as date FROM `octmotherchequeentry`,`octmnonctscategory` where startTime between '".$first_day_this_month."' AND '".$last_day_this_month."' AND octmnonctscategory.nonCtsCategoryId = nonCtsCategory GROUP BY DATE(startTime),nonCtsCategoryName";			
		$result1=$this->db->query($sql)->result();
		$result2=$this->db->query($sql1)->result();
		$result = array_merge($result1,$result2);
		return $result;
}
//For All lot Mis and Summary
public function getdailymisAllLot($clgdate,$MIS)
{			
		$clgdate = str_replace("%20", " ", $clgdate);
		$clgdate = str_replace(",", " ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));
		//echo $MIS;
		
		$sql1= "SELECT corebankmaster.branchName,DATE_FORMAT(clgDate,'%m/%d/%Y') as clgDate1,serialNumber,batchNumber,accountNumber2,chequeNumber,chequeAmnt,`octmchequeentry`.micrCode,transCode,IF(categoryAmount='NON-CTS','NONCTS','CTS') as categoryAmount1,corebankmaster.bankName,corebankmaster.branchName,payeeName,DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1,DATE_FORMAT(payinSlipDate,'%m/%d/%Y') as payinSlipDate1,solId,lotNumber FROM `octmchequeentry`,`corebankmaster` where  DATE(clgDate) = '".$clgdate."' AND corebankmaster.micrCode=`octmchequeentry`.micrCode AND ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE `processName` like 'OctmSecondPass') AND chequeAmnt!=0";
		$sql2 = " SELECT corebankmaster.branchName,DATE_FORMAT(clgDate,'%m/%d/%Y') as clgDate1,serialNumber,batchId as batchNumber,accountNumber2,chequeNumber,chequeAmnt,octmotherchequeentry.micrCode,transCode,IF(nonCtsCategory=29	or nonCtsCategory=30 or nonCtsCategory=31,NONCTS,CTS) as categoryAmount1,corebankmaster.bankName,corebankmaster.branchName,payeeName,cardNumber,DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1,solId,lotNumber FROM octmotherchequeentry,`corebankmaster` where DATE(clgDate) = '".$clgdate."' AND corebankmaster.micrCode=octmotherchequeentry.micrCode AND ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE `processName` like 'OctmSecondPass') AND chequeAmnt!=0";
		
		$sql3 = "SELECT count(*) as chequeCount,sum(chequeAmount) as total,categoryAmount,batchNumber,chequeAmount FROM `octmchequeentry` where DATE(clgDate) = '".$clgdate."' AND ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE `processName` like 'OctmSecondPass') AND chequeAmnt!=0 GROUP BY batchNumber,categoryAmount";
		$sql4 = "SELECT count(*) as chequeCount,sum(chequeAmount) as total,batchId as batchNumber,octmnonctscategory.nonCtsCategoryName as categoryAmount  FROM `octmotherchequeentry`,octmnonctscategory where DATE(clgDate) = '".$clgdate."' AND octmnonctscategory.nonCtsCategoryId=`octmotherchequeentry`.nonCtsCategory AND ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE `processName` like 'OctmSecondPass') AND chequeAmnt!=0 GROUP BY batchId";		 
		$result1=$this->db->query($sql1)->result();
		if(count($result1)>0){
			for($i=0;$i<(count($result1));$i++)
			{
				$result1[$i]->cardNumber = "";
			}
		}
		$result2=$this->db->query($sql2)->result();
		if(count($result2)>0){
			for($i=0;$i<(count($result2));$i++)
			{
				$result2[$i]->payinSlipDate1 = "";
			}
		}
		$result3=$this->db->query($sql3)->result();
		$result4=$this->db->query($sql4)->result();
		$params = array_merge($result1,$result2);
		$params1 = array_merge($result3,$result4);
		/* Sorted array for 
			creating Daily mis for All Lot		
		*/
		
		function sort_objects_by_total($a, $b) {
			if($a->batchNumber == $b->batchNumber){ return 0 ; }
			return ($a->batchNumber < $b->batchNumber) ? -1 : 1;
		}
		usort($params, "sort_objects_by_total");
		
		if(count($params)>0 && count($params1)>0)
		{	
		$clgDate = date("m-d-Y", strtotime($clgdate));					
		$objPHPExcel = new PHPExcel();
		$objPHPExcel->getProperties()->setCreator("Maarten Balliauw")
					 ->setLastModifiedBy("Maarten Balliauw");
		
				$objPHPExcel->setActiveSheetIndex(0);
				$objPHPExcel->getActiveSheet()->getStyle('B1:F3')->applyFromArray(
				array('alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
					 'font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
					 
				$objPHPExcel->getActiveSheet()->getStyle('B4:F4')->applyFromArray(
				array(
					 'borders' => array('allborders' => array( 'style' => PHPExcel_Style_Border::BORDER_THIN)),
					 'alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
					 'font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10))
					 );
				$objPHPExcel->setActiveSheetIndex(0)->mergeCells('B1:F1');
				$objPHPExcel->setActiveSheetIndex(0)->mergeCells('B4:F4');
				$objPHPExcel->getActiveSheet()->getStyle("E")->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
				$objPHPExcel->getActiveSheet()->getStyle("D")->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER);
				$objPHPExcel->getActiveSheet()->SetCellValue('B1', "CLG DT : $clgdate")
											  ->SetCellValue('B4', "CATEGORY - I OUTWARD")
											  ->SetCellValue('B3', "CATEGORY")
											  ->SetCellValue('C3', "BATCH ID")
											  ->SetCellValue('D3', "CHEQUES")
											  ->SetCellValue('E3', "AMOUNT")
											  ->SetCellValue('F3', "DEP. SIGN");				
					$j="5";
					$totalcheque1=0;
					$totalAmount1=0;
					$AlltotalAmount=0;
					$AlltotalCheque=0;
					for($i=0;$i<count($params1);$i++)
					{
						if($params1[$i]->categoryAmount=="A" || $params1[$i]->categoryAmount=="B" || $params1[$i]->categoryAmount=="C" || $params1[$i]->categoryAmount=="D" || $params1[$i]->categoryAmount=="E" || $params1[$i]->categoryAmount=="F" || $params1[$i]->categoryAmount=="NON-CTS" || $params1[$i]->categoryAmount=="CTS REJECTION" || $params1[$i]->categoryAmount=="NON CTS REJECTION" || $params1[$i]->categoryAmount=="PAY NAME DIFFER" || $params1[$i]->categoryAmount=="SL COLLECTION")
							{
								$totalcheque1+=$params1[$i]->chequeCount;
								$totalAmount1+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);
								$j++;			
							}
						}
						$objPHPExcel->getActiveSheet()->getStyle("C$j:E$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
						$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque1);
						$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount1);
						$j=$j+2;
						$objPHPExcel->getActiveSheet()->getStyle("B$j")->applyFromArray(
							array('alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
							 'font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$j:F$j");
						$objPHPExcel->getActiveSheet()->SetCellValue("B$j", "CATEGORY - II CMS A");
						$totalcheque2=0;
						$totalAmount2=0;
						$j=$j+1;
						for($i=0;$i<count($params1);$i++)
						{
							if(($params1[$i]->categoryAmount=="NOT DRAWN IN ICICI") || ($params1[$i]->categoryAmount=="OUTSTATION CHEQUES") || ($params1[$i]->categoryAmount=="FOREIN CURRENCY") || ($params1[$i]->categoryAmount=="CANCELLED CHEQUE") || ($params1[$i]->categoryAmount=="ICICI PRUDENTIAL") || ($params1[$i]->categoryAmount=="NOT A FINANCIAL") || ($params1[$i]->categoryAmount=="CMS") || ($params1[$i]->categoryAmount=="LOAN"))
							{
								$totalcheque2+=$params1[$i]->chequeCount;
								$totalAmount2+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);
								$j++;								
							}					
						}
						$objPHPExcel->getActiveSheet()->getStyle("C$j:E$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
						$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque2);
						$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount2);
						$j=$j+2;
						$objPHPExcel->getActiveSheet()->getStyle("B$j")->applyFromArray(
							array('alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
							 'font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$j:F$j");
						$objPHPExcel->getActiveSheet()->SetCellValue("B$j", "CATEGORY - II CMS B");
						$totalcheque3=0;
						$totalAmount3=0;
						$j=$j+1;
						for($i=0;$i<count($params1);$i++)
						{
							if(($params1[$i]->categoryAmount=="CREDIT CARD") || ($params1[$i]->categoryAmount=="ICICI CREDIT CARD") || ($params1[$i]->categoryAmount=="CREDIT CARD REJECTION") || ($params1[$i]->categoryAmount=="NON CTS CREDIT CARD") || ($params1[$i]->categoryAmount=="ICICI CREDIT CARD REJECTION"))
							{
								$totalcheque3+=$params1[$i]->chequeCount;
								$totalAmount3+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);
								$j++;								
							}							
						}
						$objPHPExcel->getActiveSheet()->getStyle("C$j:E$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));						
						$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
						$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque3);
						$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount3);
						$j=$j+2;
						$objPHPExcel->getActiveSheet()->getStyle("B$j")->applyFromArray(
						array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10))
							 );
						$objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$j:F$j");
						$objPHPExcel->getActiveSheet()->SetCellValue("B$j", "CATEGORY - II CMS C");
						$totalcheque4=0;
						$totalAmount4=0;
						$j=$j+1;
						for($i=0;$i<count($params1);$i++)
						{
							if(($params1[$i]->categoryAmount=="TIKONA") || ($params1[$i]->categoryAmount=="AIRTEL") || ($params1[$i]->categoryAmount=="DELHI JAL BOARD"))
							{
								$totalcheque4+=$params1[$i]->chequeCount;
								$totalAmount4+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);
								$j++;
							}							
						}
						$objPHPExcel->getActiveSheet()->getStyle("C$j:E$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));	
						$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
						$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque4);
						$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount4);
						$j=$j+2;
						$objPHPExcel->getActiveSheet()->getStyle("D")->applyFromArray(array('alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_RIGHT)));
						$objPHPExcel->getActiveSheet()->getStyle("B$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$j:F$j");
						$objPHPExcel->getActiveSheet()->SetCellValue("B$j", "CATEGORY - III TRF");
						$totalcheque5=0;
						$totalAmount5=0;
						$j=$j+1;
						for($i=0;$i<count($params1);$i++)
						{
							if(($params1[$i]->categoryAmount=="TRF CHEQUES") || ($params1[$i]->categoryAmount=="ICICI REJECTION"))
							{
								$totalcheque5+=$params1[$i]->chequeCount;
								$totalAmount5+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);	
								$j++;							
							}							
						}
				$objPHPExcel->getActiveSheet()->getStyle("B$j:F$j")->applyFromArray(
						array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10))
							 );
				$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
				$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque5);
				$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount5);
				$j=$j+1;
				$objPHPExcel->getActiveSheet()->getStyle("B$j:F$j")->applyFromArray(
						array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
				$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "G. TOTAL :");
				$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $AlltotalCheque);
				$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $AlltotalAmount);
				$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(strlen($AlltotalAmount)+8);
				$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(strlen($AlltotalCheque)+8);
				$objPHPExcel->getActiveSheet()->getStyle("B1:F$j")->applyFromArray(
						array('borders' => array('allborders' => array( 'style' => PHPExcel_Style_Border::BORDER_THIN))));
				$objPHPExcel->getActiveSheet()->setTitle('Summary');
									 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
				$objPHPExcel->createSheet();			 
				$objPHPExcel->setActiveSheetIndex(1);
				$objPHPExcel->getActiveSheet()->SetCellValue('A1', "branch")
											->SetCellValue('B1', "clgdate")
											->SetCellValue('C1', "srno")
											->SetCellValue('D1', "batchid")
											->SetCellValue('E1', "ActNumber")
											->SetCellValue('F1', "chqactnumber")
											->SetCellValue('G1', "ChequeAmt")
											->SetCellValue('H1', "ChequeNumber")
											->SetCellValue('I1', "MICR")
											->SetCellValue('J1', "transcode")
											->SetCellValue('K1', "Category")
											->SetCellValue('L1', "bankname")
											->SetCellValue('M1', "branch1")
											->SetCellValue('N1', "payeename")
											->SetCellValue('O1', "cardnumber")
											->SetCellValue('P1', "chequedate")
											->SetCellValue('Q1', "rp")
											->SetCellValue('R1', "PayInDate")
											->SetCellValue('S1', "sol Id");
				$j="2";
				for($i=0;$i<count($params);$i++)
				{
					$objPHPExcel->getActiveSheet()->SetCellValue("A$j", 'CONNAUGHT PLACE');
					$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params[$i]->clgDate1);
					$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params[$i]->serialNumber);
					$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params[$i]->batchNumber);
					if($params[$i]->accountNumber2==0){
					$objPHPExcel->getActiveSheet()->SetCellValue("E$j", 'CRCARDRPCDEL');}
					else{
					$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params[$i]->accountNumber2);}
					$objPHPExcel->getActiveSheet()->SetCellValue("F$j", "");
					$objPHPExcel->getActiveSheet()->SetCellValue("G$j", $params[$i]->chequeAmnt);
					$objPHPExcel->getActiveSheet()->getStyle("G$j")->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
					$objPHPExcel->getActiveSheet()->SetCellValue("H$j", $params[$i]->chequeNumber);
					$objPHPExcel->getActiveSheet()->SetCellValue("I$j", $params[$i]->micrCode);
					$objPHPExcel->getActiveSheet()->SetCellValue("J$j", $params[$i]->transCode);
					$objPHPExcel->getActiveSheet()->SetCellValue("K$j", $params[$i]->categoryAmount1);
					$objPHPExcel->getActiveSheet()->SetCellValue("L$j", $params[$i]->bankName);
					$objPHPExcel->getActiveSheet()->SetCellValue("M$j", $params[$i]->branchName);
					$objPHPExcel->getActiveSheet()->SetCellValue("N$j", $params[$i]->payeeName);
					$objPHPExcel->getActiveSheet()->SetCellValue("O$j", $params[$i]->cardNumber);
					$objPHPExcel->getActiveSheet()->SetCellValue("P$j", $params[$i]->chequeDate1);
					$objPHPExcel->getActiveSheet()->SetCellValue("Q$j", "");
					$objPHPExcel->getActiveSheet()->SetCellValue("R$j", $params[$i]->payinSlipDate1);
					$objPHPExcel->getActiveSheet()->SetCellValue("S$j", $params[$i]->solId);
					$objPHPExcel->setActiveSheetIndex(1)->getStyle("A$j:S$j")->getAlignment()->setWrapText(true);
					$objPHPExcel->getActiveSheet()->getStyle("A$j:S$j")->applyFromArray(
					array(
					 'borders' => array('allborders' => array( 'style' => PHPExcel_Style_Border::BORDER_THIN))));
					$j++;
				}
				$lotNumberlastArray = end($params);
				$lotNumberlast = $lotNumberlastArray->lotNumber;
				$lotNumberFirst = $params[0]->lotNumber;				
				$objPHPExcel->getActiveSheet()->setTitle('MIS');
				
				$objPHPExcel->getActiveSheet()->getStyle('A1:S1')->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_BLUE);
				$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(10);
				$objPHPExcel->setActiveSheetIndex(1)->getStyle('A1:S1')->getAlignment()->setWrapText(true);
				$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(15);
				$styleArray = array();
				$objPHPExcel->getDefaultStyle()->applyFromArray($styleArray);			 			
				$objPHPExcel->getActiveSheet()->getStyle('A1:S1')->applyFromArray(
				array(
					 'borders' => array('allborders' => array( 'style' => PHPExcel_Style_Border::BORDER_THIN)),
					 'alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
					 'font'    => array('bold' => true,'name'  => 'Verdana'),
					 'fill' => array('type'  => PHPExcel_Style_Fill::FILL_GRADIENT_LINEAR,'rotation'   => 90,'startcolor' => array('argb' => 'FFA0A0A0'),'endcolor'   => array('argb' => 'FFFFFFFF')),			
					'fill' => array('type' => PHPExcel_Style_Fill::FILL_SOLID,'color' => array('rgb' => 'CCFFCC')))
					 );				
				$clgdate = date('dmY',strtotime($clgdate));
				// check All lotMIS report
					if (!file_exists(EXPORT_TEXT_ROOT."DAILY MIS"."".SEPARATOR."".$clgDate."".SEPARATOR.""."All-Lot"."".SEPARATOR)) 
					{					  
						mkdir(EXPORT_TEXT_ROOT."DAILY MIS"."".SEPARATOR."".$clgDate."".SEPARATOR.""."All-Lot"."".SEPARATOR, 0777, true);
					}
					 
					$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel5');
					$objWriter->save(EXPORT_TEXT_ROOT."DAILY MIS"."".SEPARATOR."".$clgDate."".SEPARATOR.""."All-Lot"."".SEPARATOR.""."MIS$clgdate"." ".$lotNumberFirst." to ".$lotNumberlast.".xls");
					$result = EXPORT_TEXT_ROOT."DAILY MIS"."".SEPARATOR."".$clgDate."".SEPARATOR.""."All-Lot"."".SEPARATOR.""."MIS$clgdate"." ".$lotNumberFirst." to ".$lotNumberlast.".xls";					
				header('Pragma: public');
					header('Expires: 0');
					header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
					header('Content-Disposition: filename="'.$result.'"');
					header('Cache-Control: max-age=0');
					header('Content-Transfer-Encoding: chunked');
					header('Content-Length: '.filesize($result));	// provide file size
					header('Connection: close');
					readfile($result);
		}
		else
		{
			$result = "NoRecordFound";
		}
		return $result;
}
//For One lot Mis and Summary
public function getdailymisOneLot($clgdate,$lotnumber,$MIS)
{			
		$clgdate = str_replace("%20", " ", $clgdate);
		$clgdate = str_replace(",", " ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));
		$sql1= "SELECT corebankmaster.branchName,DATE_FORMAT(clgDate,'%m/%d/%Y') as clgDate1,serialNumber,batchNumber,accountNumber2,chequeNumber,chequeAmnt,`octmchequeentry`.micrCode,transCode,IF(categoryAmount='NON-CTS','NONCTS','CTS') as categoryAmount1,corebankmaster.bankName,corebankmaster.branchName,payeeName,DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1,DATE_FORMAT(payinSlipDate,'%m/%d/%Y') as payinSlipDate1,solId,lotNumber FROM `octmchequeentry`,`corebankmaster` where  DATE(clgDate) = '".$clgdate."' AND lotNumber=$lotnumber AND corebankmaster.micrCode=`octmchequeentry`.micrCode AND ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE `processName` like 'OctmSecondPass') AND chequeAmnt!=0";
		$sql2 = " SELECT corebankmaster.branchName,DATE_FORMAT(clgDate,'%m/%d/%Y') as clgDate1,serialNumber,batchId as batchNumber,accountNumber2,chequeNumber,chequeAmnt,octmotherchequeentry.micrCode,transCode,'CTS' as categoryAmount1,corebankmaster.bankName,corebankmaster.branchName,payeeName,cardNumber,DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1,solId,lotNumber FROM octmotherchequeentry,`corebankmaster` where DATE(clgDate) = '".$clgdate."' AND lotNumber=$lotnumber AND corebankmaster.micrCode=octmotherchequeentry.micrCode AND ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE `processName` like 'OctmSecondPass') AND chequeAmnt!=0";
		$sql3 = "SELECT count(*) as chequeCount,sum(chequeAmount) as total,categoryAmount,batchNumber,chequeAmount FROM `octmchequeentry` where DATE(clgDate) = '".$clgdate."' AND lotNumber=$lotnumber AND ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE `processName` like 'OctmSecondPass') AND chequeAmnt!=0 GROUP BY batchNumber,categoryAmount";
		$sql4 = "SELECT count(*) as chequeCount,sum(chequeAmount) as total,batchId as batchNumber,octmnonctscategory.nonCtsCategoryName as categoryAmount  FROM `octmotherchequeentry`,octmnonctscategory where DATE(clgDate) = '".$clgdate."' AND lotNumber=$lotnumber AND octmnonctscategory.nonCtsCategoryId=`octmotherchequeentry`.nonCtsCategory AND ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE `processName` like 'OctmSecondPass') AND chequeAmnt!=0 GROUP BY batchId";
		$result1=$this->db->query($sql1)->result();
		if(count($result1)>0){
			for($i=0;$i<(count($result1));$i++)
			{
				$result1[$i]->cardNumber = "";
			}
		}
		$result2=$this->db->query($sql2)->result();
		if(count($result2)>0){
			for($i=0;$i<(count($result2));$i++)
			{
				$result2[$i]->payinSlipDate1 = "";
			}
		}
		$result3=$this->db->query($sql3)->result();
		$result4=$this->db->query($sql4)->result();
		$params = array_merge($result1,$result2);
		$params1 = array_merge($result3,$result4);
		/* Sorted array for 
			creating Daily mis for One Lot		
		*/
		function sort_objects_by_total($a, $b) {
			if($a->batchNumber == $b->batchNumber){ return 0 ; }
			return ($a->batchNumber < $b->batchNumber) ? -1 : 1;
		}
		usort($params, "sort_objects_by_total");

		if(count($params)>0 && count($params1)>0)
		{	
		$clgDate = date("m-d-Y", strtotime($clgdate));					
		$objPHPExcel = new PHPExcel();
		$objPHPExcel->getProperties()->setCreator("Maarten Balliauw")
					 ->setLastModifiedBy("Maarten Balliauw");
		
				$objPHPExcel->setActiveSheetIndex(0);
				$objPHPExcel->getActiveSheet()->getStyle('B1:F3')->applyFromArray(
				array('alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
					 'font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
					 
				$objPHPExcel->getActiveSheet()->getStyle('B4:F4')->applyFromArray(
				array(
					 'borders' => array('allborders' => array( 'style' => PHPExcel_Style_Border::BORDER_THIN)),
					 'alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
					 'font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10))
					 );
				$objPHPExcel->setActiveSheetIndex(0)->mergeCells('B1:F1');
				$objPHPExcel->setActiveSheetIndex(0)->mergeCells('B4:F4');
				$objPHPExcel->getActiveSheet()->getStyle("E")->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
				$objPHPExcel->getActiveSheet()->getStyle("D")->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER);
				$objPHPExcel->getActiveSheet()->SetCellValue('B1', "CLG DT : $clgdate")
											  ->SetCellValue('B4', "CATEGORY - I OUTWARD")
											  ->SetCellValue('B3', "CATEGORY")
											  ->SetCellValue('C3', "BATCH ID")
											  ->SetCellValue('D3', "CHEQUES")
											  ->SetCellValue('E3', "AMOUNT")
											  ->SetCellValue('F3', "DEP. SIGN");				
					$j="5";
					$totalcheque1=0;
					$totalAmount1=0;
					$AlltotalAmount=0;
					$AlltotalCheque=0;
					for($i=0;$i<count($params1);$i++)
					{
						if($params1[$i]->categoryAmount=="A" || $params1[$i]->categoryAmount=="B" || $params1[$i]->categoryAmount=="C" || $params1[$i]->categoryAmount=="D" || $params1[$i]->categoryAmount=="E" || $params1[$i]->categoryAmount=="F" || $params1[$i]->categoryAmount=="NON-CTS" || $params1[$i]->categoryAmount=="CTS REJECTION" || $params1[$i]->categoryAmount=="NON CTS REJECTION" || $params1[$i]->categoryAmount=="PAY NAME DIFFER" || $params1[$i]->categoryAmount=="SL COLLECTION")
							{
								$totalcheque1+=$params1[$i]->chequeCount;
								$totalAmount1+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);
								$j++;			
							}
						}
						$objPHPExcel->getActiveSheet()->getStyle("C$j:E$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
						$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque1);
						$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount1);
						$j=$j+2;
						$objPHPExcel->getActiveSheet()->getStyle("B$j")->applyFromArray(
							array('alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
							 'font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$j:F$j");
						$objPHPExcel->getActiveSheet()->SetCellValue("B$j", "CATEGORY - II CMS A");
						$totalcheque2=0;
						$totalAmount2=0;
						$j=$j+1;
						for($i=0;$i<count($params1);$i++)
						{
							if(($params1[$i]->categoryAmount=="NOT DRAWN IN ICICI") || ($params1[$i]->categoryAmount=="OUTSTATION CHEQUES") || ($params1[$i]->categoryAmount=="FOREIN CURRENCY") || ($params1[$i]->categoryAmount=="CANCELLED CHEQUE") || ($params1[$i]->categoryAmount=="ICICI PRUDENTIAL") || ($params1[$i]->categoryAmount=="NOT A FINANCIAL") || ($params1[$i]->categoryAmount=="CMS") || ($params1[$i]->categoryAmount=="LOAN"))
							{
								$totalcheque2+=$params1[$i]->chequeCount;
								$totalAmount2+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);
								$j++;								
							}					
						}
						$objPHPExcel->getActiveSheet()->getStyle("C$j:E$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
						$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque2);
						$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount2);
						$j=$j+2;
						$objPHPExcel->getActiveSheet()->getStyle("B$j")->applyFromArray(
							array('alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
							 'font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$j:F$j");
						$objPHPExcel->getActiveSheet()->SetCellValue("B$j", "CATEGORY - II CMS B");
						$totalcheque3=0;
						$totalAmount3=0;
						$j=$j+1;
						for($i=0;$i<count($params1);$i++)
						{
							if(($params1[$i]->categoryAmount=="CREDIT CARD") || ($params1[$i]->categoryAmount=="ICICI CREDIT CARD") || ($params1[$i]->categoryAmount=="CREDIT CARD REJECTION") || ($params1[$i]->categoryAmount=="NON CTS CREDIT CARD") || ($params1[$i]->categoryAmount=="ICICI CREDIT CARD REJECTION"))
							{
								$totalcheque3+=$params1[$i]->chequeCount;
								$totalAmount3+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);
								$j++;								
							}							
						}
						$objPHPExcel->getActiveSheet()->getStyle("C$j:E$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));						
						$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
						$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque3);
						$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount3);
						$j=$j+2;
						$objPHPExcel->getActiveSheet()->getStyle("B$j")->applyFromArray(
						array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10))
							 );
						$objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$j:F$j");
						$objPHPExcel->getActiveSheet()->SetCellValue("B$j", "CATEGORY - II CMS C");
						$totalcheque4=0;
						$totalAmount4=0;
						$j=$j+1;
						for($i=0;$i<count($params1);$i++)
						{
							if(($params1[$i]->categoryAmount=="TIKONA") || ($params1[$i]->categoryAmount=="AIRTEL") || ($params1[$i]->categoryAmount=="DELHI JAL BOARD"))
							{
								$totalcheque4+=$params1[$i]->chequeCount;
								$totalAmount4+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);
								$j++;
							}							
						}
						$objPHPExcel->getActiveSheet()->getStyle("C$j:E$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));	
						$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
						$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque4);
						$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount4);
						$j=$j+2;
						$objPHPExcel->getActiveSheet()->getStyle("D")->applyFromArray(array('alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_RIGHT)));
						$objPHPExcel->getActiveSheet()->getStyle("B$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$j:F$j");
						$objPHPExcel->getActiveSheet()->SetCellValue("B$j", "CATEGORY - III TRF");
						$totalcheque5=0;
						$totalAmount5=0;
						$j=$j+1;
						for($i=0;$i<count($params1);$i++)
						{
							if(($params1[$i]->categoryAmount=="TRF CHEQUES") || ($params1[$i]->categoryAmount=="ICICI REJECTION"))
							{
								$totalcheque5+=$params1[$i]->chequeCount;
								$totalAmount5+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);	
								$j++;							
							}							
						}
				$objPHPExcel->getActiveSheet()->getStyle("B$j:F$j")->applyFromArray(
						array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10))
							 );
				$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
				$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque5);
				$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount5);
				$j=$j+1;
				$objPHPExcel->getActiveSheet()->getStyle("B$j:F$j")->applyFromArray(
						array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
				$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "G. TOTAL :");
				$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $AlltotalCheque);
				$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $AlltotalAmount);
				$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(strlen($AlltotalAmount)+8);
				$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(strlen($AlltotalCheque)+8);
				$objPHPExcel->getActiveSheet()->getStyle("B1:F$j")->applyFromArray(
						array('borders' => array('allborders' => array( 'style' => PHPExcel_Style_Border::BORDER_THIN))));
				$objPHPExcel->getActiveSheet()->setTitle('Summary');
				
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
				$objPHPExcel->createSheet();

				// Add some data to the second sheet, resembling some different data types
				$objPHPExcel->setActiveSheetIndex(1);
				$objPHPExcel->getActiveSheet()->SetCellValue('A1', "branch")
											->SetCellValue('B1', "clgdate")
											->SetCellValue('C1', "srno")
											->SetCellValue('D1', "batchid")
											->SetCellValue('E1', "ActNumber")
											->SetCellValue('F1', "chqactnumber")
											->SetCellValue('G1', "ChequeAmt")
											->SetCellValue('H1', "ChequeNumber")
											->SetCellValue('I1', "MICR")
											->SetCellValue('J1', "transcode")
											->SetCellValue('K1', "Category")
											->SetCellValue('L1', "bankname")
											->SetCellValue('M1', "branch1")
											->SetCellValue('N1', "payeename")
											->SetCellValue('O1', "cardnumber")
											->SetCellValue('P1', "chequedate")
											->SetCellValue('Q1', "rp")
											->SetCellValue('R1', "PayInDate")
											->SetCellValue('S1', "solId");
				$j="2";
				for($i=0;$i<count($params);$i++)
				{
					$objPHPExcel->getActiveSheet()->SetCellValue("A$j", 'CONNAUGHT PLACE');
					$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params[$i]->clgDate1);
					$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params[$i]->serialNumber);
					$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params[$i]->batchNumber);
					if($params[$i]->accountNumber2==0){
					$objPHPExcel->getActiveSheet()->SetCellValue("E$j", 'CRCARDRPCDEL');}
					else{
					$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params[$i]->accountNumber2);}
					$objPHPExcel->getActiveSheet()->SetCellValue("F$j", " ");
					$objPHPExcel->getActiveSheet()->getStyle("G$j")->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
					$objPHPExcel->getActiveSheet()->SetCellValue("G$j", $params[$i]->chequeAmnt);					
					$objPHPExcel->getActiveSheet()->SetCellValue("H$j", $params[$i]->chequeNumber);
					$objPHPExcel->getActiveSheet()->SetCellValue("I$j", $params[$i]->micrCode);
					$objPHPExcel->getActiveSheet()->SetCellValue("J$j", $params[$i]->transCode);
					$objPHPExcel->getActiveSheet()->SetCellValue("K$j", $params[$i]->categoryAmount1);
					$objPHPExcel->getActiveSheet()->SetCellValue("L$j", $params[$i]->bankName);
					$objPHPExcel->getActiveSheet()->SetCellValue("M$j", $params[$i]->branchName);
					$objPHPExcel->getActiveSheet()->SetCellValue("N$j", $params[$i]->payeeName);
					$objPHPExcel->getActiveSheet()->SetCellValue("O$j", $params[$i]->cardNumber);
					$objPHPExcel->getActiveSheet()->SetCellValue("P$j", $params[$i]->chequeDate1);
					$objPHPExcel->getActiveSheet()->SetCellValue("Q$j", " ");
					$objPHPExcel->getActiveSheet()->SetCellValue("R$j", $params[$i]->payinSlipDate1);
					$objPHPExcel->getActiveSheet()->SetCellValue("S$j", $params[$i]->solId);
					$objPHPExcel->setActiveSheetIndex(1)->getStyle("A$j:S$j")->getAlignment()->setWrapText(true);
					$objPHPExcel->getActiveSheet()->getStyle("A$j:S$j")->applyFromArray(
					array(
					 'borders' => array('allborders' => array( 'style' => PHPExcel_Style_Border::BORDER_THIN))));
					$j++;
				}
				
				$lotNumberlastArray = end($params);
				$lotNumberlast = $lotNumberlastArray->lotNumber;
				$lotNumberFirst = $params[0]->lotNumber;
				///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				$objPHPExcel->getActiveSheet()->setTitle('MIS');
				
				$clgdate = date('dmY',strtotime($clgdate));
				// check All lotMIS report
					if (!file_exists(EXPORT_TEXT_ROOT."DAILY MIS"."".SEPARATOR."".$clgDate."".SEPARATOR.""."Lot-$lotnumber"."".SEPARATOR)) 
					{					  
						mkdir(EXPORT_TEXT_ROOT."DAILY MIS"."".SEPARATOR."".$clgDate."".SEPARATOR.""."Lot-$lotnumber"."".SEPARATOR, 0777, true);
					}
					$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel5');
					$objPHPExcel->getActiveSheet()->getStyle('A1:S1')->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_BLUE);
					$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(15);
					$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(15);
					$objPHPExcel->setActiveSheetIndex(1)->getStyle('A1:S1')->getAlignment()->setWrapText(true);
					$styleArray = array();
					$objPHPExcel->getDefaultStyle()->applyFromArray($styleArray);			 			
					$objPHPExcel->getActiveSheet()->getStyle('A1:S1')->applyFromArray(
					array(
						 'borders' => array('allborders' => array( 'style' => PHPExcel_Style_Border::BORDER_THIN)),
						 'alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
						 'font'    => array('bold' => true,'name'  => 'Verdana','size'  =>10),
						 'fill' => array('type'  => PHPExcel_Style_Fill::FILL_GRADIENT_LINEAR,'rotation'   => 90,'startcolor' => array('argb' => 'FFA0A0A0'),'endcolor'   => array('argb' => 'FFFFFFFF')),			
						'fill' => array('type' => PHPExcel_Style_Fill::FILL_SOLID,'color' => array('rgb' => 'CCFFCC')))
						 );					
					$objWriter->save(EXPORT_TEXT_ROOT."DAILY MIS"."".SEPARATOR."".$clgDate."".SEPARATOR.""."Lot-$lotnumber"."".SEPARATOR.""."MIS$clgdate.xls");	
					$result = EXPORT_TEXT_ROOT."DAILY MIS"."".SEPARATOR."".$clgDate."".SEPARATOR.""."Lot-$lotnumber"."".SEPARATOR.""."MIS$clgdate.xls";		
					header('Pragma: public');
					header('Expires: 0');
					header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
					header('Content-Disposition: filename="'.$result.'"');
					header('Cache-Control: max-age=0');
					header('Content-Transfer-Encoding: chunked');
					header('Content-Length: '.filesize($result));	// provide file size
					header('Connection: close');
					readfile($result);
		}
		else
		{
			$result = "NoRecordFound";
		}
		return $result;
}
//For One lot Summary
public function getdailymisSummary($clgdate,$lotnumber)
{			
		$clgdate = str_replace("%20", " ", $clgdate);
		$clgdate = str_replace(",", " ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));
		$sql3 = "SELECT count(*) as chequeCount,sum(chequeAmount) as total,categoryAmount,batchNumber,chequeAmount FROM `octmchequeentry` where DATE(clgDate) = '".$clgdate."' AND lotNumber=$lotnumber AND ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE `processName` like 'OctmSecondPass') AND chequeAmnt!=0 GROUP BY batchNumber,categoryAmount";
		$sql4 = "SELECT count(*) as chequeCount,sum(chequeAmount) as total,batchId as batchNumber,octmnonctscategory.nonCtsCategoryName as categoryAmount  FROM `octmotherchequeentry`,octmnonctscategory where DATE(clgDate) = '".$clgdate."' AND lotNumber=$lotnumber AND octmnonctscategory.nonCtsCategoryId=`octmotherchequeentry`.nonCtsCategory AND ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE `processName` like 'OctmSecondPass') AND chequeAmnt!=0 GROUP BY batchId";	
		$result3=$this->db->query($sql3)->result();
		$result4=$this->db->query($sql4)->result();		
		$params1 = array_merge($result3,$result4);
		if(count($params1)>0)
		{			
		$clgDate = date("m-d-Y", strtotime($clgdate));					
		$objPHPExcel = new PHPExcel();
		$objPHPExcel->getProperties()->setCreator("Maarten Balliauw")
					 ->setLastModifiedBy("Maarten Balliauw");
		
				$objPHPExcel->setActiveSheetIndex(0);
				$objPHPExcel->getActiveSheet()->getStyle('B1:F3')->applyFromArray(
				array('alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
					 'font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
					 
				$objPHPExcel->getActiveSheet()->getStyle('B4:F4')->applyFromArray(
				array(
					 'borders' => array('allborders' => array( 'style' => PHPExcel_Style_Border::BORDER_THIN)),
					 'alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
					 'font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10))
					 );
				$objPHPExcel->setActiveSheetIndex(0)->mergeCells('B1:F1');
				$objPHPExcel->setActiveSheetIndex(0)->mergeCells('B4:F4');
				$objPHPExcel->getActiveSheet()->getStyle("E")->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
				$objPHPExcel->getActiveSheet()->getStyle("D")->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER);
				$objPHPExcel->getActiveSheet()->SetCellValue('B1', "CLG DT : $clgdate")
											  ->SetCellValue('B4', "CATEGORY - I OUTWARD")
											  ->SetCellValue('B3', "CATEGORY")
											  ->SetCellValue('C3', "BATCH ID")
											  ->SetCellValue('D3', "CHEQUES")
											  ->SetCellValue('E3', "AMOUNT")
											  ->SetCellValue('F3', "DEP. SIGN");				
					$j="5";
					$totalcheque1=0;
					$totalAmount1=0;
					$AlltotalAmount=0;
					$AlltotalCheque=0;
					for($i=0;$i<count($params1);$i++)
					{
						if($params1[$i]->categoryAmount=="A" || $params1[$i]->categoryAmount=="B" || $params1[$i]->categoryAmount=="C" || $params1[$i]->categoryAmount=="D" || $params1[$i]->categoryAmount=="E" || $params1[$i]->categoryAmount=="F" || $params1[$i]->categoryAmount=="NON-CTS" || $params1[$i]->categoryAmount=="CTS REJECTION" || $params1[$i]->categoryAmount=="NON CTS REJECTION" || $params1[$i]->categoryAmount=="PAY NAME DIFFER" || $params1[$i]->categoryAmount=="SL COLLECTION")
							{
								$totalcheque1+=$params1[$i]->chequeCount;
								$totalAmount1+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);
								$j++;			
							}
						}
						$objPHPExcel->getActiveSheet()->getStyle("C$j:E$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
						$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque1);
						$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount1);
						$j=$j+2;
						$objPHPExcel->getActiveSheet()->getStyle("B$j")->applyFromArray(
							array('alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
							 'font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$j:F$j");
						$objPHPExcel->getActiveSheet()->SetCellValue("B$j", "CATEGORY - II CMS A");
						$totalcheque2=0;
						$totalAmount2=0;
						$j=$j+1;
						for($i=0;$i<count($params1);$i++)
						{
							if(($params1[$i]->categoryAmount=="NOT DRAWN IN ICICI") || ($params1[$i]->categoryAmount=="OUTSTATION CHEQUES") || ($params1[$i]->categoryAmount=="FOREIN CURRENCY") || ($params1[$i]->categoryAmount=="CANCELLED CHEQUE") || ($params1[$i]->categoryAmount=="ICICI PRUDENTIAL") || ($params1[$i]->categoryAmount=="NOT A FINANCIAL") || ($params1[$i]->categoryAmount=="CMS") || ($params1[$i]->categoryAmount=="LOAN"))
							{
								$totalcheque2+=$params1[$i]->chequeCount;
								$totalAmount2+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);
								$j++;								
							}					
						}
						$objPHPExcel->getActiveSheet()->getStyle("C$j:E$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
						$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque2);
						$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount2);
						$j=$j+2;
						$objPHPExcel->getActiveSheet()->getStyle("B$j")->applyFromArray(
							array('alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
							 'font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$j:F$j");
						$objPHPExcel->getActiveSheet()->SetCellValue("B$j", "CATEGORY - II CMS B");
						$totalcheque3=0;
						$totalAmount3=0;
						$j=$j+1;
						for($i=0;$i<count($params1);$i++)
						{
							if(($params1[$i]->categoryAmount=="CREDIT CARD") || ($params1[$i]->categoryAmount=="ICICI CREDIT CARD") || ($params1[$i]->categoryAmount=="CREDIT CARD REJECTION") || ($params1[$i]->categoryAmount=="NON CTS CREDIT CARD") || ($params1[$i]->categoryAmount=="ICICI CREDIT CARD REJECTION"))
							{
								$totalcheque3+=$params1[$i]->chequeCount;
								$totalAmount3+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);
								$j++;								
							}							
						}
						$objPHPExcel->getActiveSheet()->getStyle("C$j:E$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));						
						$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
						$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque3);
						$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount3);
						$j=$j+2;
						$objPHPExcel->getActiveSheet()->getStyle("B$j")->applyFromArray(
						array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10))
							 );
						$objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$j:F$j");
						$objPHPExcel->getActiveSheet()->SetCellValue("B$j", "CATEGORY - II CMS C");
						$totalcheque4=0;
						$totalAmount4=0;
						$j=$j+1;
						for($i=0;$i<count($params1);$i++)
						{
							if(($params1[$i]->categoryAmount=="TIKONA") || ($params1[$i]->categoryAmount=="AIRTEL") || ($params1[$i]->categoryAmount=="DELHI JAL BOARD"))
							{
								$totalcheque4+=$params1[$i]->chequeCount;
								$totalAmount4+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);
								$j++;
							}							
						}
						$objPHPExcel->getActiveSheet()->getStyle("C$j:E$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));	
						$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
						$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque4);
						$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount4);
						$j=$j+2;
						$objPHPExcel->getActiveSheet()->getStyle("D")->applyFromArray(array('alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_RIGHT)));
						$objPHPExcel->getActiveSheet()->getStyle("B$j")->applyFromArray(
							array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
						$objPHPExcel->setActiveSheetIndex(0)->mergeCells("B$j:F$j");
						$objPHPExcel->getActiveSheet()->SetCellValue("B$j", "CATEGORY - III TRF");
						$totalcheque5=0;
						$totalAmount5=0;
						$j=$j+1;
						for($i=0;$i<count($params1);$i++)
						{
							if(($params1[$i]->categoryAmount=="TRF CHEQUES") || ($params1[$i]->categoryAmount=="ICICI REJECTION"))
							{
								$totalcheque5+=$params1[$i]->chequeCount;
								$totalAmount5+=$params1[$i]->total;
								$AlltotalAmount+=$params1[$i]->total;
								$AlltotalCheque+=$params1[$i]->chequeCount;
								$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params1[$i]->categoryAmount);					
								$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params1[$i]->batchNumber);
								$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params1[$i]->chequeCount);
								$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params1[$i]->total);	
								$j++;							
							}							
						}
				$objPHPExcel->getActiveSheet()->getStyle("B$j:F$j")->applyFromArray(
						array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10))
							 );
				$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "TOTAL :");
				$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $totalcheque5);
				$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $totalAmount5);
				$j=$j+1;
				$objPHPExcel->getActiveSheet()->getStyle("B$j:F$j")->applyFromArray(
						array('font'    => array('bold' => true,'name'  => 'Verdana','size'  => 10)));
				$objPHPExcel->getActiveSheet()->SetCellValue("C$j", "G. TOTAL :");
				$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $AlltotalCheque);
				$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $AlltotalAmount);
				$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(strlen($AlltotalAmount)+8);
				$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(strlen($AlltotalCheque)+8);
				$objPHPExcel->getActiveSheet()->getStyle("B1:F$j")->applyFromArray(
						array('borders' => array('allborders' => array( 'style' => PHPExcel_Style_Border::BORDER_THIN))));
				$objPHPExcel->getActiveSheet()->setTitle('Summary');
				
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
				$clgdate = date('dmY',strtotime($clgdate));
				// check All lotMIS report
					if (!file_exists(EXPORT_TEXT_ROOT."DAILY MIS"."".SEPARATOR."".$clgDate."".SEPARATOR.""."Lots-$lotnumber"."".SEPARATOR)) 
					{					  
						mkdir(EXPORT_TEXT_ROOT."DAILY MIS"."".SEPARATOR."".$clgDate."".SEPARATOR.""."Lots-$lotnumber"."".SEPARATOR, 0777, true);
					}
					$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel5');
					$objWriter->save(EXPORT_TEXT_ROOT."DAILY MIS"."".SEPARATOR."".$clgDate."".SEPARATOR.""."Lots-$lotnumber"."".SEPARATOR.""."MIS$clgdate.xls");	
		$result = EXPORT_TEXT_ROOT."DAILY MIS"."".SEPARATOR."".$clgDate."".SEPARATOR.""."Lots-$lotnumber"."".SEPARATOR.""."MIS$clgdate.xls";		
					header('Pragma: public');
					header('Expires: 0');
					header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
					header('Content-Disposition: filename="MIS$clgdate.xls"');
					header('Cache-Control: max-age=0');
					header('Content-Transfer-Encoding: chunked');
					header('Content-Length: '.filesize("MIS$clgdate.xls"));	// provide file size
					header('Connection: close');
					readfile($result);
				
		}
		else
		{
			$result = "NoRecordFound";
		}
		return $result;
}
public function getlotreport($clgdate,$lotnumber)
{			
		$clgdate = str_replace("%20", " ", $clgdate);
		$clgdate = str_replace(",", " ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));
	       	$sql = "SELECT chequeNumber,chequeAmount,payeeName,micrCode,chequeAmnt,transCode,draweeName FROM `octmchequeentry` where DATE(startTime) = '".$clgdate."' AND lotNumber = $lotnumber "; 	
		 $result=$this->db->query($sql)->result();
		return $result;
}
public function last($user,$batchId,$clgdate)
{			
			$clgdate = str_replace("%20", " ", $clgdate);
		$clgdate = str_replace(",", " ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));

	   	$sql = "SELECT chequeNumber ,chequeAmount FROM `octmchequeentry` where processId=7 AND userName = '".$user."' AND clgDate = '".$clgdate."' AND batchNumber = '".$batchId."' order by chequeEntryId desc limit 1 ";	
		$result=$this->db->query($sql)->result();
		return $result;
}
public function lastother($user,$batchId,$clgdate)
{			
		$clgdate = str_replace("%20", " ", $clgdate);
		$clgdate = str_replace(",", " ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));

	    $sql = "SELECT chequeNumber , chequeAmount FROM `octmotherchequeentry` where processId=7 AND userCode = '".$user."' AND clgDate = '".$clgdate."' AND batchId = '".$batchId."' order by otherChequeentryId desc limit 1 ";	
		$result=$this->db->query($sql)->result();
		return $result;
}
public function checkdate()
{			
	   	$sql = "SELECT * FROM octmdatemaster";	
		$result=$this->db->query($sql)->result();
		return $result;
}
public function getrejection($clgdate,$lotnumber)
{			
		$clgdate = str_replace("%20", " ", $clgdate);
		$clgdate = str_replace(",", " ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));
	        $sql = "SELECT payeeName,cardNumber,reason,chequeNumber,chequeDate,categoryAmount,micrCode,chequeAmount FROM `octmotherchequeentry` where nonCtsCategory = '18' AND startTime = '".$clgdate."' AND lotNumber = $lotnumber";	
		 $result=$this->db->query($sql)->result();
		return $result;
}
public function getoutstation($clgdate,$lotnumber,$batchId)
{			
		$clgdate = str_replace("%20", " ", $clgdate);
		$clgdate = str_replace(",", " ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));
	        $sql = "SELECT serialNumber,chequeDate,chequeAmount,accountNumber,payeeName,micrCode,debitAccountNumber FROM `octmotherchequeentry` where startTime = '".$clgdate."' AND lotNumber = $lotnumber AND batchId = $batchId";	
		 $result=$this->db->query($sql)->result();
		return $result;
}
public function getcreditmis($clgdate,$lotnumber)
{			
		$clgdate = str_replace("%20", " ", $clgdate);
		$clgdate = str_replace(",", " ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));
		
	     $sql1 = "SELECT count(*) as count ,sum(chequeAmount) as total,batchId,chequeAmount FROM `octmotherchequeentry` where nonCtsCategory IN( SELECT nonCtsCategoryId FROM `octmnonctscategory` WHERE nonCtsCategoryName like('CREDIT CARD')) AND clgDate = '".$clgdate."' AND lotNumber = $lotnumber GROUP BY batchId";
		$sql2 = "SELECT count(*) as count ,sum(chequeAmount) as total,batchId,chequeAmount FROM `octmotherchequeentry` where nonCtsCategory IN( SELECT nonCtsCategoryId FROM `octmnonctscategory` WHERE nonCtsCategoryName like('ICICI CREDIT CARD')) AND clgDate = '".$clgdate."' AND lotNumber = $lotnumber GROUP BY batchId";			
		 $result1=$this->db->query($sql1)->result();
		 $result2=$this->db->query($sql2)->result();
		 //print_r($result2);
		 if(count($result1)>0)
		 $result1[0]->creditCard ="CREDIT CARD";
		 
		if(count($result2)>0)
		 $result2[0]->creditCard ="ICICI CREDIT CARD";
		 
		 $result = array_merge($result1,$result2);
		return $result;
}
public function getsolId($solId)
{
		$sql ="select * from coresol where solId= $solId";
		$result=$this->db->query($sql)->result();
		return $result;
}
public function getmicrcode($micrCode)
{			
	    $sql = "SELECT bankName FROM corebankmaster where micrCode = $micrCode";	
		$result=$this->db->query($sql)->result();

		return $result;
}
public function getbatch($batchId)
{			
		$sql = "select * from octmbatchmaster where batchId=".$batchId;	
		$qparent = $this->db->query($sql)->result();
		
		return $qparent;
}

public function getdatemaster()
{			
	    $sql = "select * from octmdatemaster where 1";	
		$qparent = $this->db->query($sql)->result();

		return $qparent;
}
public function getdatemaster1()
{			
	    $sql = "select * from octmdatemaster where 1";	
		$qparent = $this->db->query($sql)->result();
		if(count($qparent)>0)
		{
			//$clgDate = date('M d,YYYY',$qparent[0]->clgDate);
			$qparent[0]->clgDate1=date('M d,Y',strtotime($qparent[0]->clgDate));
		}
		return $qparent;
}
public function startentry()
{			
	    	$sql = "insert into octmchequeentry (chequeEntryId,startTime,processId) 
					values ('',now(),7)";	
			$qparent = $this->db->query($sql);
		 	$insert_id1 = $this->db->insert_id();
			$sql1 = "insert into octmchequeentry (chequeEntryId,processId) 
					values ('',8)";	
			$qparent1 = $this->db->query($sql1);
		 	$insert_id2 = $this->db->insert_id();
			return $insert_id=array("process1"=>$insert_id1,
			"process2"=>$insert_id2);
}
public function startotherentry()
{			
	    $sql = "insert into octmotherchequeentry(otherChequeentryId,startTime,processId) values ('',now(),7)";	
		$qparent = $this->db->query($sql);
		$insert_id1 = $this->db->insert_id();
		$sql1 = "insert into octmotherchequeentry (otherChequeentryId,processId) 
					values ('',8)";	
		$qparent1 = $this->db->query($sql1);
		 	$insert_id2 = $this->db->insert_id();
			return $insert_id=array("process1"=>$insert_id1,
			"process2"=>$insert_id2);
	//	return $insert_id;
}
public function deleterecord($batchId,$lotNumber,$serialNumber,$clgDate)
{			
		$clgDate = str_replace("%20"," ", $clgDate);
		$clgDate = str_replace(","," ", $clgDate);
		$clgDate = date("Y-m-d", strtotime($clgDate)); 
	    
		$sql = "DELETE FROM `octmchequeentry` WHERE batchNumber = $batchId AND lotNumber = $lotNumber AND serialNumber = $serialNumber AND clgDate = '".$clgDate."' ";	
		$qparent = $this->db->query($sql);
		return $qparent;
}
public function deleteotherrecord($batchId,$lotNumber,$serialNumber,$clgDate)
{			
		$clgDate = str_replace("%20"," ", $clgDate);
		$clgDate = str_replace(","," ", $clgDate);
		$clgDate = date("Y-m-d", strtotime($clgDate));
	        $sql = "DELETE FROM `octmotherchequeentry` WHERE batchId = $batchId AND lotNumber = $lotNumber AND serialNumber = $serialNumber AND clgDate = '".$clgDate."' ";	
		$qparent = $this->db->query($sql);
		return $qparent;
}
public function getshowlist1($batchId,$user,$clgDate)
{			
		$date = date('Y-m-d',strtotime($clgDate));
	 	$sql = "select otherChequeentryId,batchId,lotNumber,serialNumber,DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate,accountNumber,accountNumber2,chequeNumber,cardNumber,chequeAmount,chequeAmnt,micrCode,bankCode,shortMicrCode,payeeName,draweeName,transCode,cardType,solId,debitAccountNumber,nonCtsCategory,octmnonctscategory.nonCtsCategoryName,startTime,userCode from octmotherchequeentry,octmnonctscategory where batchId = $batchId AND DATE(clgDate) = '".$date."' AND userCode = $user AND ProcessId = 7 AND octmotherchequeentry.nonCtsCategory=octmnonctscategory.nonCtsCategoryId ";	
		$qparent = $this->db->query($sql)->result();
		return $qparent;
}
public function getshowlist2($user)
{			
		$clgDate = date('Y-m-d');
	    $sql = "select requestId,batchId,DATE(requestDate) as requestDate,lotNumber,accountNumber,payeeName,chequeBookNumber from octmchequebookrequest where userCode = $user";
		$qparent = $this->db->query($sql)->result();
		return $qparent;
}
public function getshowlist($batchId,$clgDate,$user)
{			
	  	$sql = "select chequeEntryId,serialNumber,accountNumber,accountNumber2,DATE_FORMAT(payinSlipDate,'%m/%d/%Y') as payinSlipDate,DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate,chequeAmount,chequeNumber,micrCode,transCode,payeeName,draweeName,chequeAmnt,solId from octmchequeentry where batchNumber = $batchId AND DATE(clgDate) = '$clgDate' AND userName = $user AND ProcessId = 7";	
		$qparent = $this->db->query($sql)->result();
		return $qparent;
}
public function getallsecondpass($lotnumber,$clgdate,$usercode)
{
	$clgdate = str_replace("%20"," ", $clgdate);
		$clgdate = str_replace(","," ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));

	$sql = "SELECT count(*) as Total , batchNumber , categoryAmount,octmbatchmaster.secondPassUser FROM octmchequeentry,octmbatchmaster where octmchequeentry.lotNumber = '$lotnumber' AND octmchequeentry.clgDate = '$clgdate' AND octmchequeentry.chequeAmnt = '0.00' AND octmchequeentry.processId = 8 AND octmchequeentry.userName != '$usercode' AND  octmbatchmaster.lotId = octmchequeentry.lotNumber  AND octmbatchmaster.clgDate = octmchequeentry.clgdate AND octmbatchmaster.batchId = octmchequeentry.batchNumber AND (octmbatchmaster.secondPassUser = '0' OR octmbatchmaster.secondPassUser = '$usercode')  GROUP BY octmchequeentry.batchNumber";
	
	$qparent = $this->db->query($sql)->result();
	return $qparent;
}
public function getsecondpass($lotNumber,$clgDate,$batchId)
{			
		$clgDate = str_replace("%20"," ", $clgDate);
		$clgDate = str_replace("%2F"," ", $clgDate);
		$clgDate = str_replace(","," ", $clgDate);
		$clgDate = date("Y-m-d",strtotime($clgDate));

		$sql = "SELECT chequeEntryId,serialNumber,chequeAmount,batchNumber,categoryAmount,chequeNumber,micrCode,accountNumber,coreusers.fullName 
					from octmchequeentry, coreusers
					where clgDate = '".$clgDate."' AND lotNumber = $lotNumber
					and chequeAmnt = 0 and octmchequeentry.userName = coreusers.userId AND
					octmchequeentry.chequeAmnt = '0.00' AND octmchequeentry.batchNumber = '$batchId' ";		 
		$qparent = $this->db->query($sql)->result();		
		
		for($i=0;$i<count($qparent);$i++)
		{
			$update="UPDATE octmchequeentry set startTime='now()' where chequeEntryId=".$qparent[$i]->chequeEntryId;
			$qparentupdate = $this->db->query($update);
		}
		
		//print_r($qparent);
		return $qparent;
}
public function updatesecondpass($batchId,$serialNumber,$secondpassdata)
{			
	        $sql = "UPDATE octmchequeentry SET secondPassentry = $secondpassdata ,secondPassDate =now() where batchNumber = $batchId AND serialNumber = $serialNumber";	
		$qparent = $this->db->query($sql);
		return $qparent;
}
public function getsecondpassallocate($batchId,$clgdate,$lotnumber,$user,$type)
{			
	$clgdate = str_replace("%20"," ", $clgdate);
		$clgdate = str_replace(","," ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));

		$type = str_replace("%20"," ", $type);

	$sql = "UPDATE octmbatchmaster SET secondPassUser = '$user' where batchId = '$batchId' AND lotId = '$lotnumber' AND clgDate = '$clgdate' AND type = '$type'";	
		$qparent = $this->db->query($sql);
		return $qparent;
}
public function getallsecondpass2($lotnumber,$clgdate,$usercode)
{
	$clgdate = str_replace("%20"," ", $clgdate);
	$clgdate = str_replace(","," ", $clgdate);
	$clgdate = date("Y-m-d", strtotime($clgdate));

	  $sql = "SELECT count(*) as Total,octmotherchequeentry.batchId,nonCtsCategory,octmbatchmaster.secondPassUser,(SELECT nonCtsCategoryName FROM octmnonctscategory WHERE nonCtsCategoryId = nonCtsCategory) as nonCtsCategoryName FROM octmotherchequeentry,octmbatchmaster where lotNumber = $lotnumber AND octmotherchequeentry.clgDate = '$clgdate' AND chequeAmnt = '0.00' AND processId = '8' AND octmotherchequeentry.userCode != '$usercode' AND octmbatchmaster.batchId = octmotherchequeentry.batchId AND octmotherchequeentry.ProcessId='8' AND octmbatchmaster.clgDate='".$clgdate."'  AND (octmbatchmaster.secondPassUser = '$usercode' OR octmbatchmaster.secondPassUser = '0') group by octmotherchequeentry.batchId";
	
	$qparent = $this->db->query($sql)->result();
	return $qparent;
}
public function getsecondpass2($lotNumber,$clgDate,$batchId,$userId)
{	
		$clgDate = str_replace("%20"," ", $clgDate);
		$clgDate = str_replace("%2F"," ", $clgDate);
		$clgDate = str_replace(","," ", $clgDate);
		$clgDate = date("Y-m-d",strtotime($clgDate));
			
	     $sql = "SELECT otherChequeentryId,serialNumber,chequeAmount,nonCtsCategory,chequeNumber,octmotherchequeentry.batchId,
					micrCode,coreusers.fullName,cardNumber,accountNumber
					from octmotherchequeentry,coreusers,octmbatchmaster
					where octmotherchequeentry.clgDate = '".$clgDate."'
					AND octmbatchmaster.clgDate = '".$clgDate."' 
					AND octmotherchequeentry.lotNumber = $lotNumber AND octmotherchequeentry.userCode = coreusers.userId AND
					octmotherchequeentry.batchId = '$batchId' AND
					octmotherchequeentry.chequeAmnt = '0.00' AND  octmbatchmaster.batchId = octmotherchequeentry.batchId AND octmotherchequeentry.userCode != '$userId' AND octmotherchequeentry.ProcessId='8' AND (octmbatchmaster.secondPassUser = '$userId' OR octmbatchmaster.secondPassUser = '0')";	
		
		$qparent = $this->db->query($sql)->result();
		for($i=0;$i<count($qparent);$i++)
		{
			$update="update octmotherchequeentry set startTime='now()' where otherChequeentryId=".$qparent[$i]->otherChequeentryId;
			$qparentupdate = $this->db->query($update);
		}
		return $qparent;
}
public function updatesecondpass2($batchId,$serialNumber,$secondpassdata)
{			
	        $sql = "UPDATE octmotherchequeentry SET secondPassentry = $secondpassdata,secondPassDate =now() where batchId = $batchId AND serialNumber = $serialNumber";	
		$qparent = $this->db->query($sql);
		return $qparent;
}
public function exportBatchWiseSlipText($params)
{		
		//print_r($params);
	if(count($params['batchslip'])>0)
	{	print_r($params['batchslip']);
				$isHeader = true;
				$title = true;
				$total = true;
				$json = 'batchWiseSlip';
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
				
				$arrMeta = json_decode($strJSON);
				//echo "<pre>";print_r($arrMeta);echo "</pre>";
				//exit();
				//$result = $this->db->query($sql)->result();			
				$str = "";		
				if($title){ 
					//$str.="\r\n";
					for($k=0;$k<count($arrMeta->Titles);$k++){
						$str.=str_pad($arrMeta->Titles[$k]->TitleName,$arrMeta->Titles[$k]->spaces);
						$str.=str_pad($params['batchslip'][0][$arrMeta->Titles[$k]->dbcol],$arrMeta->Titles[$k]->spaces);
						
						$str.="\r\n";						
					}		
					$str.='                             BATCH WISE SLIP WITH CATEGORY  '.$params['batchslip'][0]['categoryAmount'];
					$str.="\r\n";
								
				}
				
				if($isHeader){ $str.="\r\n";
				if(count($params['batchslip'])>4)
				$count = 3;else $count = count($params['batchslip']);
				for($i=0;$i<$count;$i++){
					for($j=0;$j<count($arrMeta->Columns);$j++){									
						$str.=str_pad($arrMeta->Columns[$j]->header,$arrMeta->Columns[$j]->spaces);
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);								
					}
					
				   }
				}
				$str.="\r\n";
				for($i=0;$i<count($params['batchslip']);$i++){
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
						
						$str.=str_pad($params['batchslip'][$i][$arrMeta->Columns[$j]->dbcol],$arrMeta->Columns[$j]->spaces);
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}	
					if($i==2)	
					$str.="\r\n";					
				}
				$str.="\r\n";
				if($total){ $str.="\r\n";
					for($l=0;$l<count($arrMeta->Totals);$l++){			
						$str.=$arrMeta->Totals[$l]->header;
						$str.=$params['batchslip'][0][$arrMeta->Totals[$l]->dbcol];
						$str.="\r\n";			
					}					
				}
		
		//$print_r($str);
	if (!file_exists(EXPORT_TEXT_ROOT."Batch Wise Slip"."".SEPARATOR."".$params['batchslip'][0]['clgDate']."".SEPARATOR)) 
	{					  
		mkdir(EXPORT_TEXT_ROOT."Batch Wise Slip"."".SEPARATOR."".$params['batchslip'][0]['clgDate']."".SEPARATOR, 0777, true);
	}
	
	$handle = fopen(EXPORT_TEXT_ROOT."Batch Wise Slip"."".SEPARATOR."".$params['batchslip'][0]['clgDate']."".SEPARATOR.$params['batchslip'][0]['batchNumber'].".txt", "w");
	fwrite($handle, $str);
	$this->load->helper('download');
	force_download($params['batchslip'][0]['batchNumber'].".txt", $str);
	
		
		
	}
	else
	{
		$filePath = "NoRecordFound";
	}
			//return $filePath;
	
	//fclose($handle);
	//header('Content-type: text/tab-separated-values');
	//header("Content-Disposition: attachment;filename=bingproductfeed.txt",$result);
	}
	
	
public function getmisAllReport($batchId,$clgdate,$lotnumber)
{			
		$clgdate = str_replace("%20"," ", $clgdate);
		$clgdate = str_replace("%2F"," ", $clgdate);
		$clgdate = str_replace(","," ", $clgdate);
		$selectedDate = date("Y-m-d",strtotime($clgdate));
		
		$sql1 = "SELECT count(*) as dataentry FROM `octmchequeentry` where batchNumber = $batchId AND clgDate='$selectedDate' AND lotNumber=$lotnumber ";
		$sql2 ="SELECT count(*) as QC FROM `octmotherchequeentry` where batchId = $batchId AND clgDate='$selectedDate' AND lotNumber=$lotnumber";	
		$result1=$this->db->query($sql1)->result();
		$result2=$this->db->query($sql2)->result();
		
		$result1[0]->total=$result1[0]->dataentry+$result2[0]->QC;
		$result1[0]->QC = $result2[0]->QC;
		
		//$result = array_merge($result1,$result2);
		//print_r($result1);
		return $result1;
	}
	
	public function getDataentryReport($batchId,$clgdate,$lotnumber)
	{			
		//$date = str_replace('%20', ' ', $clgdate);
		//$selectedDate = date("Y-m-d", strtotime($date));
		$sql1 = "SELECT batchNumber,lotNumber,serialNumber,chequeAmount,clgDate,categoryAmount,accountNumber,payinSlipDate,chequeDate,chequeNumber,micrCode,transCode,payeeName,draweeName,chequeAmnt,solId,accountNumber2,coreusers.fullName FROM coreusers,`octmchequeentry` where batchNumber = '$batchId' AND clgDate='$clgdate' AND lotNumber='$lotnumber' AND coreusers.userId=`octmchequeentry`.userName";	
		$result1=$this->db->query($sql1)->result();		
		//$result = array_merge($result1,$result2);
		//print_r($result1);
		return $result1;
	}
	
	public function getCreditCardSlipreport($clgdate,$category,$batchId)
	{			
		$clgdate = str_replace("%20"," ", $clgdate);
		$clgdate = str_replace("%2F"," ", $clgdate);
		$clgdate = str_replace(","," ", $clgdate);
		$clgdate = date("Y-m-d",strtotime($clgdate));
		if($category==18){ $folderName = 'CREDIT CARD';}
		if($category==23){ $folderName = 'ICICI CREDIT CARD';}
		if($category==29){ $folderName = 'NON CTS CREDIT CARD';}
		if($category==30){ $folderName = 'NON CTS ICICI CREDIT CARD';}
		$sql2 =  "SELECT 'CP' as 'branch','' as 'blank','$folderName' as 'Title',batchId,'".date('m/d/Y h:m:s A')."' as currDateTime,serialNumber,cardNumber,chequeNumber,chequeAmnt as chequeAmount,transCode,micrCode,draweeName,lotNumber,clgDate,octmnonctscategory.nonCtsCategoryName FROM `octmotherchequeentry`,octmnonctscategory where clgDate='$clgdate' AND nonCtsCategory='$category'  AND ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE `processName` like 'OctmSecondPass') AND chequeAmnt!=0 AND octmnonctscategory.nonCtsCategoryId=`octmotherchequeentry`.nonCtsCategory";	
		$result=$this->db->query($sql2)->result();
		if(count($result)>0)
		{
			$sql3 =  "SELECT count(*) as totalCheque,SUM(chequeAmnt) as totalAmount FROM `octmotherchequeentry` where clgDate='$clgdate' AND nonCtsCategory='$category'  AND ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE `processName` like 'OctmSecondPass') AND chequeAmnt!=0";	
			$result3=$this->db->query($sql3)->result();	
			//print_r($result3);
			$result[0]->totalCheque = $result3[0]->totalCheque;
			$result[0]->totalAmount = $result3[0]->totalAmount;
			
		}
		return $result;
	}
	
	public function genarateCreditCardSlipText($params)
	{		
				$json ='creditCardPatti';
				$isHeader = true;
				$title = true;
				$total = true;
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');				
				$arrMeta = json_decode($strJSON);
				$str = "";
				
				if($title){ 
					$str.="\r\n";
					for($k=0;$k<count($arrMeta->Titles);$k++){
						$str.=str_pad("",$arrMeta->Titles[$k]->spaces);
						$str.=str_pad($arrMeta->Titles[$k]->TitleName,$arrMeta->Titles[$k]->spaces);
						$str.=str_pad($params['creditcardslip'][0][$arrMeta->Titles[$k]->dbcol],$arrMeta->Titles[$k]->spaces);
						//$str.=str_pad("",$arrMeta->Titles[$k]->spaces);
					}		
					$str.="\r\n";		
				}
				
				if($isHeader){ $str.="\r\n";
					for($j=0;$j<count($arrMeta->Columns);$j++){
									
						$str.=str_pad($arrMeta->Columns[$j]->header,$arrMeta->Columns[$j]->spaces);
						//$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
					}
					$str.="\r\n";
						$str.='----------------------------------------------------------------------------------------------';
					$str.="\r\n";
				}
				$totalAmount='';
				for($i=0;$i<count($params['creditcardslip']);$i++){
					$totalAmount += $params['creditcardslip'][$i]['chequeAmount'];
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
				
						$str.=str_pad($params['creditcardslip'][$i][$arrMeta->Columns[$j]->dbcol],$arrMeta->Columns[$j]->spaces);
						//$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";
					
				}
				$params['creditcardslip'][0]['totalAmount'] = $totalAmount;
				$params['creditcardslip'][0]['totalRecord'] = count($params['creditcardslip']);
				if($total){ $str.="\r\n";
					for($l=0;$l<count($arrMeta->Totals);$l++){			
						$str.=$arrMeta->Totals[$l]->header;
						$str.=$params['creditcardslip'][0][$arrMeta->Totals[$l]->dbcol];
						$str.="\r\n";			
					}
				}
		//$time = date('H-i-s',strtotime($params['creditcardslip'][0]['clgDate']));
		if (!file_exists(EXPORT_TEXT_ROOT."credit Card Slip"."".SEPARATOR.$params['creditcardslip'][0]['clgDate']."".SEPARATOR)) 
		{					  
			 mkdir(EXPORT_TEXT_ROOT."credit Card Slip"."".SEPARATOR.$params['creditcardslip'][0]['clgDate']."".SEPARATOR, 0777, true);
		}
		
		$filename =  $params['creditcardslip'][0]['nonCtsCategoryName']." ".$params['creditcardslip'][0]['batchId'].".txt";
		$handle = fopen(EXPORT_TEXT_ROOT."credit Card Slip"."".SEPARATOR.$params['creditcardslip'][0]['clgDate']."".SEPARATOR.$filename, "w");
		fwrite($handle, $str);
		
		 if (file_exists(EXPORT_TEXT_ROOT."credit Card Slip"."".SEPARATOR.$params['creditcardslip'][0]['clgDate']."".SEPARATOR.$filename)) {
				return $filename;
		 }
		 else
		 {
				 return false;
		 }
	}
	public function getreplaceBatchAndLotNumber($clgdate,$lotNumber,$batchId,$newclgdate,$newlotNumber,$newbatchId,$chequeEntry,$otherChequeEntry)
	{	
		$clgdate = str_replace("%20", " ", $clgdate);
		$clgdate = str_replace(",", " ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));
		$newclgdate = str_replace("%20", " ", $newclgdate);
		$newclgdate = str_replace(",", " ", $newclgdate);
		$newclgdate = date("Y-m-d", strtotime($newclgdate));
		if($chequeEntry=="1")
		{
			$sql1 =  "SELECT * FROM `octmbatchmaster` WHERE `batchId`=$batchId AND DATE(`clgDate`)='$clgdate' AND `lotId`=$lotNumber AND type='Cheque Entry'";	
			$result1=$this->db->query($sql1)->result();
			if(count($result1)>0)
			{
				$sql2 =  "UPDATE `octmbatchmaster` SET `batchId`=$newbatchId,`clgDate`='$newclgdate',`lotId`=$newlotNumber WHERE `batchId`=$batchId AND DATE(`clgDate`)='$clgdate' AND `lotId`=$lotNumber AND type='Cheque Entry'";	
				$result2=$this->db->query($sql2);
				$resultMaster[0]="MasterUpdated";
				$resultMaster[1]="chequeEntry";
			}
			else
			{
				$resultMaster[0]="0";
			}
			$sql3 =  "SELECT * FROM octmchequeentry WHERE batchNumber=$batchId AND DATE(clgDate)='$clgdate' AND lotNumber=$lotNumber";	
			$result3=$this->db->query($sql3)->result();
			if(count($result3)>0)
			{
				$sql4 =  "UPDATE octmchequeentry SET batchNumber=$newbatchId,clgDate='$newclgdate',lotNumber=$newlotNumber WHERE batchNumber=$batchId AND DATE(clgDate)='$clgdate' AND lotNumber=$lotNumber";	
				$result4=$this->db->query($sql4);
				$resultchequeEntery[0]="ChequeEntryUpdated";
			}
			else
			{
				$resultchequeEntery[0]="0";
			}
			$result_array = $resultchequeEntery;
		}
		if($otherChequeEntry=="1")
		{
			$sql1 =  "SELECT * FROM `octmbatchmaster` WHERE `batchId`=$batchId AND DATE(`clgDate`)='$clgdate' AND `lotId`=$lotNumber AND type='Othercheque Entry'";	
			$result1=$this->db->query($sql1)->result();
			if(count($result1)>0)
			{
				$sql2 =  "UPDATE `octmbatchmaster` SET `batchId`=$newbatchId,`clgDate`='$newclgdate',`lotId`=$newlotNumber WHERE `batchId`=$batchId AND DATE(`clgDate`)='$clgdate' AND `lotId`=$lotNumber AND type='Othercheque Entry'";	
				$result2=$this->db->query($sql2);
				$resultMaster[0]="MasterUpdated";
				$resultMaster[1]="otherChequeEntry";
			}
			else
			{
				$resultMaster[0]="0";
			}
			$sql5 =  "SELECT * FROM octmotherchequeentry WHERE batchId=$batchId AND DATE(clgDate)='$clgdate' AND lotNumber=$lotNumber";	
			$result5=$this->db->query($sql5)->result();
			if(count($result5)>0)
			{
				$sql6 =  "UPDATE octmotherchequeentry SET batchId=$newbatchId,clgDate='$newclgdate',lotNumber=$newlotNumber WHERE batchId=$batchId AND DATE(clgDate)='$clgdate' AND lotNumber=$lotNumber";	
				$result6=$this->db->query($sql6);
				$resultotherChequeEntery[0]="OtherChequeEntryUpdated";
			}
			else
			{
				$resultotherChequeEntery[0]="0";
			}
			$result_array = $resultotherChequeEntery;
		}
		return $result=array_merge($resultMaster,$result_array);
	}
	
	public function deleteBatch($clgdate,$lotNumber,$batchId,$chequeEntry,$otherChequeEntry)
	{
			$clgdate = str_replace("%20"," ", $clgdate);
			$clgdate = str_replace("%2F"," ", $clgdate);
			$clgdate = date("Y-m-d", strtotime($clgdate));
		if($chequeEntry=="1")
		{
			$sql =  "SELECT * FROM `octmbatchmaster` WHERE `batchId`=$batchId AND DATE(`clgDate`)='$clgdate' AND `lotId`=$lotNumber AND type='Cheque Entry'";	
			$result=$this->db->query($sql)->result();
			if(count($result)>0)	
			{		
				$sql1 =  "DELETE FROM `octmbatchmaster` WHERE DATE(clgDate)='$clgdate' AND lotId=$lotNumber AND batchId=$batchId";	
				$result1=$this->db->query($sql1);
				$sql2 =  "DELETE FROM octmchequeentry  WHERE DATE(clgDate)='$clgdate' AND lotNumber=$lotNumber AND batchNumber=$batchId";	
				$result2=$this->db->query($sql2);
				return $result = "chequeEntryDeleteSucess";
			}
			else{
				return $result = "noRecordFoundChequeEntry";
			}
		}
		else if($otherChequeEntry=="1")
		{
			$sql =  "SELECT * FROM `octmbatchmaster` WHERE `batchId`=$batchId AND DATE(`clgDate`)='$clgdate' AND `lotId`=$lotNumber AND type='Othercheque Entry'";	
			$result=$this->db->query($sql)->result();
			if(count($result)>0)	
			{		
				$sql1 =  "DELETE FROM `octmbatchmaster` WHERE DATE(clgDate)='$clgdate' AND lotId=$lotNumber AND batchId=$batchId";	
				$result1=$this->db->query($sql1);
				$sql3 =  "DELETE FROM octmotherchequeentry WHERE DATE(clgDate)='$clgdate' AND lotNumber=$lotNumber AND batchId=$batchId";	
				$result3=$this->db->query($sql3);
				return $result = "otherChequeEnteryDeleteSucess";
			}
			else{
				return $result = "noRecordFoundotherChequeEntery";
			}
		}
		else
		{
				return $result = "pleaseSeleCorO";
		}
	}
		
	public function getbatchStatus($clgdate,$lotNumber)
	{	
		$clgdate = str_replace("%20"," ", $clgdate);
		$clgdate = str_replace("%2F"," ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));
		$sql1 =  "SELECT count(*) as chequeEntryCount, batchNumber, categoryAmount, coreusers.fullName FROM octmchequeentry,coreusers WHERE DATE(clgDate)='$clgdate' AND lotNumber=$lotNumber AND octmchequeentry.userName=coreusers.userId AND octmchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmFirstPass')  GROUP BY batchNumber ORDER BY batchNumber" ;	
		$result1=$this->db->query($sql1)->result();
		$sql2 = "SELECT count(*) as chequeEntryCount, batchId as batchNumber, lotNumber, octmnonctscategory.nonCtsCategoryName as categoryAmount, coreusers.fullName FROM octmotherchequeentry,coreusers,octmnonctscategory WHERE DATE(clgDate)='$clgdate' AND lotNumber=$lotNumber AND octmotherchequeentry.userCode=coreusers.userId AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmFirstPass') AND octmnonctscategory.nonCtsCategoryId=octmotherchequeentry.nonCtsCategory GROUP BY batchId";
		$result2=$this->db->query($sql2)->result();
		//print_r($result2);
		if(count($result1)<=0 && count($result2)>0)
		{
			if($result2[0]->chequeEntryCount=="0")
			{
				$result2[0]->chequeEntryCount = "";
				$result2[0]->batchNumber = "";
				$result2[0]->lotNumber = "";
				$result2[0]->categoryAmount = "";
				$result2[0]->fullName = ""; 
			}
		}
		else if(count($result2)<=0 && count($result1)>0)
		{
			if($result1[0]->chequeEntryCount=="0")
			{
				$result1[0]->chequeEntryCount = "";
				$result1[0]->batchNumber = "";
				$result1[0]->lotNumber = "";
				$result1[0]->categoryAmount = "";
				$result1[0]->fullName = ""; 
			}
		}
		else if(count($result2)>0 && count($result1)>0)
		{
			if($result2[0]->chequeEntryCount=="0")
			{
				$result2[0]->chequeEntryCount = "";
				$result2[0]->batchNumber = "";
				$result2[0]->lotNumber = "";
				$result2[0]->categoryAmount = "";
				$result2[0]->fullName = ""; 
			}
			if($result1[0]->chequeEntryCount=="0")
			{
				$result1[0]->chequeEntryCount = "";
				$result1[0]->batchNumber = "";
				$result1[0]->lotNumber = "";
				$result1[0]->categoryAmount = "";
				$result1[0]->fullName = ""; 
			}
		}
		if(count($result1)>0)
		{
			if($result1[0]->chequeEntryCount=="0" && $result2[0]->chequeEntryCount=="0")
			{
				 $result[0]="0";
			}			
		}
		$result = array_merge($result1,$result2);
		function sort_objects_by_total($a, $b) {
			if($a->batchNumber == $b->batchNumber){ return 0 ; }
			return ($a->batchNumber < $b->batchNumber) ? -1 : 1;
		}
		usort($result, "sort_objects_by_total");
		
		return $result;
	}
	
	public function getdailyOutput($fromDate,$toDate,$morethanlakh,$chequeNo)
	{	
		$fromDate = str_replace("%20"," ", $fromDate);
		$fromDate = str_replace("%2F"," ", $fromDate);
		$fromDate = date("Y-m-d", strtotime($fromDate));
		$toDate = str_replace("%20"," ", $toDate);
		$toDate = str_replace("%2F"," ", $toDate);
		$toDate = date("Y-m-d", strtotime($toDate));
		$sql1="";
		$sql2="";
		$result3=array(); 		
		 $sql1.=  "SELECT  batchNumber, clgDate, categoryAmount, serialNumber, chequeNumber, accountNumber2, chequeAmnt, micrCode, transCode, payeeName, DATE(endTime) as endTime,  coreusers.fullName FROM octmchequeentry,coreusers WHERE DATE(clgDate)>='$fromDate' AND DATE(clgDate)<='$toDate' AND octmchequeentry.userName=coreusers.userId AND chequeNumber='$chequeNo' AND ProcessId IN(SELECT processId FROM coreprocessmaster WHERE processName LIKE 'OctmSecondPass')";
		if($morethanlakh=="1")
		{
			$sql1.=" AND chequeAmnt>=100000"; 
		}	
		$result1=$this->db->query($sql1)->result();		
		$sql2.= "SELECT batchId as batchNumber, clgDate, octmnonctscategory.nonCtsCategoryName as categoryAmount, serialNumber, chequeNumber, accountNumber2, chequeAmnt, micrCode, transCode, payeeName, DATE(endTime), coreusers.fullName FROM octmotherchequeentry,coreusers,octmnonctscategory WHERE DATE(clgDate)>='$fromDate' AND DATE(clgDate)<='$toDate' AND octmotherchequeentry.userCode=coreusers.userId AND chequeNumber=$chequeNo AND ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND octmnonctscategory.nonCtsCategoryId=octmotherchequeentry.nonCtsCategory";
		if($morethanlakh=="1")
		{
			$sql2.=" AND chequeAmnt>=100000"; 
		}
		$result2=$this->db->query($sql2)->result();
		if(count($result1)>0)
		{
			$totalCheque1 =  count($result1);
		}else{$totalCheque1="0";}
		if(count($result2)>0)
		{
			$totalCheque2 =  count($result2);
		}else{$totalCheque2="0";}
		if(count($result1)>0)
		{
		$result1[0]->totalCheque = $totalCheque1+$totalCheque2;
		}
		else if(count($result2)>0)
		{
			$result2[0]->totalCheque = $totalCheque1+$totalCheque2;
		}
		$result = array_merge($result1,$result2);
		return $result = array_merge($result1,$result2);
	}
	public function getproductivityreport($fromDate,$toDate)
	{	
		 	$fromDate = str_replace("%20"," ", $fromDate);
			$fromDate = str_replace("%2F"," ", $fromDate);
			$fromDate = date("Y-m-d", strtotime($fromDate));
			$toDate = str_replace("%20"," ", $toDate);
			$toDate = str_replace("%2F"," ", $toDate);
			$toDate = date("Y-m-d", strtotime($toDate));	
			$sql1=  "SELECT count(chequeEntryId) as count, categoryAmount,coreusers.fullName,clgDate FROM octmchequeentry,coreusers WHERE DATE(clgDate)>='$fromDate' AND DATE(clgDate)<='$toDate' AND octmchequeentry.userName=coreusers.userId AND userName!=0 AND octmchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') GROUP BY userName ";		
			$result1=$this->db->query($sql1)->result();
			if(count($result1)>0)
			{
				for($i=0;$i<count($result1);$i++)
				{
					$result1[$i]->Entry = "Cheque Entry";
				}
			}	
			$sql2= "SELECT count(otherChequeentryId) as count, octmnonctscategory.nonCtsCategoryName as categoryAmount, coreusers.fullName,clgDate FROM octmotherchequeentry,coreusers,octmnonctscategory WHERE DATE(clgDate)>='$fromDate' AND DATE(clgDate)<='$toDate' AND octmotherchequeentry.userCode=coreusers.userId AND userCode!=0 AND octmnonctscategory.nonCtsCategoryId=octmotherchequeentry.nonCtsCategory AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') GROUP BY nonCtsCategory,userCode";
			$result2=$this->db->query($sql2)->result();
			if(count($result2)>0)
			{
				for($i=0;$i<count($result2);$i++)
				{
				$result2[$i]->Entry = "Other Cheque Entry";	
				}
			}	
			return $result=array_merge($result1,$result2);
	}
	public function gethourlyproductivityreport($selectDate)
	{	
		$selectDate = str_replace("%20"," ", $selectDate);
		$selectDate = str_replace("%2F"," ", $selectDate);
		$selectDate = date("Y-m-d", strtotime($selectDate));
		$sql1=  "SELECT Hour(endTime) as Hour, count(*) as total,userName FROM octmchequeentry WHERE DATE(endTime)='$selectDate' AND chequeAmnt!=0 GROUP BY HOUR(endTime), userName";	
		$execute_result=$this->db->query($sql1)->result();
		for($i=0;$i<count($execute_result);$i++)
		{
			$query_userID = "SELECT * FROM coreusers WHERE userId=".$execute_result[$i]->userName;
			$execute_result2=$this->db->query($query_userID)->result();
			$execute_result[$i]->userID = $execute_result2[0]->userId;
			$execute_result[$i]->Operator = $execute_result2[0]->fullName;			
		}
		$sql2=  "SELECT Hour(endTime) as Hour, count(*) as total,userCode FROM octmotherchequeentry WHERE DATE(endTime)='$selectDate' AND chequeAmnt!=0 GROUP BY HOUR(endTime), userCode";	
		$execute_result1=$this->db->query($sql2)->result();
		for($i=0;$i<count($execute_result1);$i++)
		{
			$query_userID = "SELECT * FROM coreusers WHERE userId=".$execute_result1[$i]->userCode;
			$execute_result2=$this->db->query($query_userID)->result();
			$execute_result1[$i]->userID = $execute_result2[0]->userId;
			$execute_result1[$i]->Operator = $execute_result2[0]->fullName;
		}
		$data = array_merge($execute_result,$execute_result1);
		$result = array();
		foreach ($data as $item)
		{	
				$name = $item->Operator;
				if (isset($result[$name]))
				{
					$result[$name]->total += $item->total;
				}
				else // Otherwise
				{
					 $result[$name] = $item;
				}			
		}
	$data = array_values($result);
	for($i=0;$i<count($data);$i++)
	{
		if($data[$i]->Hour==0)
			{
				$data[$i]->Zero=$data[$i]->total;
			}
			else
			{
				$data[$i]->Zero="0";
			}
			if($data[$i]->Hour==1)
			{
				$data[$i]->One=$data[$i]->total;
			}
			else
			{
				$data[$i]->One="0";
			}
			if($data[$i]->Hour==2)
			{
				$data[$i]->Two=$data[$i]->total;
			}
			else
			{
				$data[$i]->Two="0";
			}
			if($data[$i]->Hour==3)
			{
				$data[$i]->Three=$data[$i]->total;
			}
			else
			{
				$data[$i]->Three="0";
			}
			if($data[$i]->Hour==4)
			{
				$data[$i]->Four=$data[$i]->total;
			}
			else
			{
				$data[$i]->Four="0";
			}
			if($data[$i]->Hour==5)
			{
				$data[$i]->Five=$data[$i]->total;
			}
			else
			{
				$data[$i]->Five="0";
			}
			if($data[$i]->Hour==6)
			{
				$data[$i]->Six=$data[$i]->total;
			}
			else
			{
				$data[$i]->Six="0";
			}
			if($data[$i]->Hour==7)
			{
				$data[$i]->Seven=$data[$i]->total;
			}
			else
			{
				$data[$i]->Seven="0";
			}
			if($data[$i]->Hour==8)
			{
				$data[$i]->Eight=$data[$i]->total;
			}
			else
			{
				$data[$i]->Eight="0";
			}
			if($data[$i]->Hour==9)
			{
				$data[$i]->Nine=$data[$i]->total;
			}
			else
			{
				$data[$i]->Nine="0";
			}
			if($data[$i]->Hour==10)
			{
				$data[$i]->Ten=$data[$i]->total;
			}
			else
			{
				$data[$i]->Ten="0";
			}
			if($data[$i]->Hour==11)
			{
				$data[$i]->OneOne=$data[$i]->total;
			}
			else
			{
				$data[$i]->OneOne="0";
			}
			if($data[$i]->Hour==12)
			{
				$data[$i]->OneTwo=$data[$i]->total;
			}
			else
			{
				$data[$i]->OneTwo="0";
			}
			if($data[$i]->Hour==13)
			{
				$data[$i]->OneThree=$data[$i]->total;
			}
			else
			{
				$data[$i]->OneThree="0";
			}
			if($data[$i]->Hour==14)
			{
				$data[$i]->OneFour=$data[$i]->total;
			}
			else
			{
				$data[$i]->OneFour="0";
			}
			if($data[$i]->Hour==15)
			{
				$data[$i]->OneFive=$data[$i]->total;
			}
			else
			{
				$data[$i]->OneFive="0";
			}
			if($data[$i]->Hour==16)
			{
				$data[$i]->OneSix=$data[$i]->total;
			}
			else
			{
				$data[$i]->OneSix="0";
			}
			if($data[$i]->Hour==17)
			{
				$data[$i]->OneSeven=$data[$i]->total;
			}
			else
			{
				$data[$i]->OneSeven="0";
			}
			if($data[$i]->Hour==18)
			{
				$data[$i]->OneEight=$data[$i]->total;
			}
			else
			{
				$data[$i]->OneEight="0";
			}
			if($data[$i]->Hour==19)
			{
				$data[$i]->OneNine=$data[$i]->total;
			}
			else
			{
				$data[$i]->OneNine="0";
			}
			
			if($data[$i]->Hour==20)
			{
				$data[$i]->TwoZero=$data[$i]->total;
			}
			else
			{
				$data[$i]->TwoZero="0";
			}
			if($data[$i]->Hour==21)
			{
				$data[$i]->TwoOne=$data[$i]->total;
			}
			else
			{
				$data[$i]->TwoOne="0";
			}
			if($data[$i]->Hour==22)
			{
				$data[$i]->TwoTwo=$data[$i]->total;
			}
			else
			{
				$data[$i]->TwoTwo="0";
			}
			if($data[$i]->Hour==23)
			{
				$data[$i]->TwoThree=$data[$i]->total;
			}
			else
			{
				$data[$i]->TwoThree="0";
			}
			if($data[$i]->Hour==24)
			{
				$data[$i]->TwoFour=$data[$i]->total;
			}
			else
			{
				$data[$i]->TwoFour="0";
			}
	}
		return $data;
		
	}
	
	public function getamountLog($clgdate,$category,$lotNo)
	{			
		$clgdate = str_replace("%20", " ", $clgdate);
		$clgdate = str_replace(",", " ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate)); 
		$sql1 =  "SELECT chequeEntryId,batchNumber,clgDate,categoryAmount,lotNumber,accountNumber,accountNumber2,chequeNumber,micrCode,chequeAmount,coreusers.fullName FROM coreusers,`octmchequeentry` where clgDate='$clgdate' AND lotNumber=$lotNo AND categoryAmount=(SELECT categoryName FROM octmamountcategory WHERE categoryId='$category') AND  coreusers.userId=`octmchequeentry`.userName AND octmchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmFirstPass')";	
		$result1=$this->db->query($sql1)->result();
		if(count($result1)>0)
		{
			for($i=0;$i<count($result1);$i++)
			{
				$sql2 =  "SELECT chequeAmnt,coreusers.fullName FROM coreusers,`octmchequeentry` where clgDate='$clgdate' AND coreusers.userId=`octmchequeentry`.userName AND lotNumber=$lotNo AND categoryAmount=(SELECT categoryName FROM octmamountcategory WHERE categoryId='$category') AND octmchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass')";	
				$result2=$this->db->query($sql2)->result();
				$result1[$i]->chequeAmnt2 = $result2[$i]->chequeAmnt;
				$result1[$i]->fullName2 = $result2[$i]->fullName;
				if($result1[$i]->chequeAmnt2!=$result1[$i]->chequeAmount)
				{
					$result1[$i]->status = "Amount Mismatch";
				}
				else
				{
					$result1[$i]->status = "";
				}
			}
		}
		
		$sql3 =  "SELECT otherChequeentryId, batchId as batchNumber,clgDate,octmnonctscategory.nonCtsCategoryName as categoryAmount ,lotNumber,accountNumber,accountNumber2,chequeNumber,micrCode,chequeAmount,coreusers.fullName FROM coreusers,`octmotherchequeentry`,octmnonctscategory where clgDate='$clgdate' AND lotNumber=$lotNo AND nonCtsCategory='$category' AND coreusers.userId=`octmotherchequeentry`.userCode AND `octmotherchequeentry`.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmFirstPass') AND octmotherchequeentry.nonCtsCategory = octmnonctscategory.nonCtsCategoryId";	
		$result3=$this->db->query($sql3)->result();
		if(count($result3)>0)
		{
			for($i=0;$i<count($result3);$i++)
			{
			$sql4 =  "SELECT chequeAmnt,coreusers.fullName FROM coreusers,`octmotherchequeentry`,octmnonctscategory where clgDate='$clgdate' AND lotNumber=$lotNo AND nonCtsCategory='$category' AND coreusers.userId=`octmotherchequeentry`.userCode AND `octmotherchequeentry`.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND octmotherchequeentry.nonCtsCategory = octmnonctscategory.nonCtsCategoryId";	
				$result4=$this->db->query($sql4)->result();
				$result3[$i]->chequeAmnt2 = $result4[$i]->chequeAmnt;
				$result3[$i]->fullName2 = $result4[$i]->fullName;
				if($result3[$i]->chequeAmnt2!=$result3[$i]->chequeAmount)
				{
					$result3[$i]->status = "Amount Mismatch";
				}
				else
				{
					$result3[$i]->status = "";
				}
			}
		}
		$result = array_merge($result1,$result3);
		return $result;
	}
	public function getchequebookrequestMIS($requestdate)
	{
		$requestdate = str_replace("%20", " ", $requestdate);
		$requestdate = str_replace(",", " ", $requestdate);
		$requestdate = date("Y-m-d", strtotime($requestdate)); 			
		$sql1 =  "SELECT requestId, accountNumber, payeeName FROM `octmchequebookrequest` where DATE(requestDate)='$requestdate'";	
		$result1=$this->db->query($sql1)->result();
		return $result1;
	}
	public function getcategoryBillingReport($Month)
	{	
		$Month = explode(',',$Month);
			$sql1 =  "SELECT DATE(endTime) as EntryDate,count(categoryAmount) as countCategoryAmount, categoryAmount FROM octmchequeentry WHERE year(endTime)='$Month[1]' AND month(endTime)='$Month[0]' AND octmchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 GROUP BY DATE(endTime),categoryAmount";	
			$result1=$this->db->query($sql1)->result();
			$sql2 =  "SELECT DATE(endTime) as EntryDate, count(nonCtsCategory) as countCategoryAmount, octmnonctscategory.nonCtsCategoryName as categoryAmount FROM octmotherchequeentry,octmnonctscategory WHERE year(endTime)='$Month[1]' AND month(endTime)='$Month[0]' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND octmnonctscategory.nonCtsCategoryId=octmotherchequeentry.nonCtsCategory AND chequeAmnt!=0 GROUP BY DATE(endTime),octmnonctscategory.nonCtsCategoryName";	
			$result2=$this->db->query($sql2)->result();
			$result = array_merge($result1,$result2);
		return $result;
	}
	public function getdrwaeePayeeBillingReport($Month)
	{	
		$Month = explode(',',$Month);
			$sql1 =  "SELECT DATE(endTime) as EntryDate,count(payeeName) as countPayee, count(draweeName) as countDrawee, count(solId) as countSolId FROM octmchequeentry WHERE year(endTime)='$Month[1]' AND month(endTime)='$Month[0]' AND payeeName!='' AND draweeName!='' GROUP BY DATE(endTime)";	
			$result1=$this->db->query($sql1)->result();
			
			$sql2 = "SELECT DATE(endTime) as EntryDate,count(payeeName) as countPayee, count(draweeName) as countDrawee, count(solId) as countSolId FROM octmotherchequeentry WHERE year(endTime)='$Month[1]' AND month(endTime)='$Month[0]' AND payeeName!='' AND draweeName!='' GROUP BY DATE(endTime)";	
			$result2=$this->db->query($sql2)->result();
			$result = array_merge($result1,$result2);
		
		return $result;
	}
	public function getuserEntryBillingReport($Month)
	{	
		$Month = explode(',',$Month);
		//$Month = $Month[1]."-".$Month[0];
		
		$sql1 =  "SELECT count(*) as countUser,DATE(endTime) as EntryDate,coreusers.fullName,userName FROM octmchequeentry,coreusers WHERE year(endTime)='$Month[1]' AND month(endTime)='$Month[0]' AND octmchequeentry.userName=coreusers.userId AND chequeAmnt!=0 GROUP BY userName,DATE(endTime)";	
			$result1=$this->db->query($sql1)->result();
			
			
			$sql2 = "SELECT count(*) as countUser,DATE(endTime) as EntryDate,coreusers.fullName,userCode FROM octmotherchequeentry,coreusers WHERE year(endTime)='$Month[1]' AND month(endTime)='$Month[0]' AND octmotherchequeentry.userCode=coreusers.userId AND chequeAmnt!=0 GROUP BY userCode,DATE(endTime)";
			$result2=$this->db->query($sql2)->result();
			//print_r($result2);
			$data = array_merge($result1,$result2);
			$result = array();
		foreach ($data as $item)
		{	
				$name = $item->fullName;
				if (isset($result[$name]))
				{
					$result[$name]->countUser += $item->countUser;
				}
				else // Otherwise
				{
					 $result[$name] = $item;
				}			
		}
		$data = array_values($result);
		return $data;
	}
	
	public function getGenerateReport($clgDate,$rejectionType1,$lotNumber,$batchId,$company)
	{	
		$clgDate = str_replace("%20", " ", $clgDate);
		$clgDate = str_replace(",", " ", $clgDate);
		$clgDate = date("Y-m-d", strtotime($clgDate));
		
		$query = "SELECT batchId,nonCtsCategory FROM `octmotherchequeentry` WHERE `clgDate`='$clgDate' AND `lotNumber`='$lotNumber' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 GROUP BY batchId,`nonCtsCategory`";
			$query_result=$this->db->query($query)->result();
		//echo "<pre>";print_r($query_result);echo "</pre>";
		for($i=0;$i<count($query_result);$i++)
		{
			$rejectionType = $query_result[$i]->nonCtsCategory;
		if($rejectionType==18 || $rejectionType==23 || $rejectionType==29)
		{							
				$fileNameForTipsLocalFile = 'tipslocalfileformat';
				if($rejectionType==18)
				{
					$column_O = 'DELHI';$fileNameForCSV = 'CC_05M1';$fileNameForXLS = 'CC_M1L';$folderName = 'CREDIT CARD';				
				}
				if($rejectionType==23)
				{
				$column_O = 'DELHI RPC';$fileNameForCSV = 'CTX_05M1';$fileNameForXLS = 'CTX_M1L';$folderName = 'ICICI CREDIT CARD';
				}
				if($rejectionType==29)
				{
				$column_O = 'DELHI';$column_T = 'DELHI';$fileNameForCSV = 'CC_05M1';$fileNameForXLS = 'CC_M1L';$folderName = 'NON CTS CREDIT CARD';
				}
				
				$sql = "SELECT 'RCP' as 'RCP',DATE_FORMAT(clgDate,'%m/%d/%Y')as clgDate1,count(*) as totalCount,SUM(chequeAmnt) as totalAmount, 0 as 'A', 0 as 'B', count(*) as totalCount1 FROM `octmotherchequeentry` WHERE `clgDate`='$clgDate' AND `nonCtsCategory`='$rejectionType' AND `lotNumber`='$lotNumber' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND batchId=".$query_result[$i]->batchId;
				$result=$this->db->query($sql)->result();
				
				 $sql1 = "SELECT (@cnt := @cnt + 1) AS serialNumber,102 as 'B','RCP' as 'C',1 as 'D','N' as 'E',3 as 'F','N' as 'G',cardNumber2,chequeNumber,DATE_FORMAT(chequeDate,'%m/%d/%Y')as chequeDate1,chequeAmnt,`octmotherchequeentry`.micrCode as micrCode, '' as 'M', CONCAT(corebankmaster.bankName,'',corebankmaster.branchName) as bankName, '$column_O' as 'O',0 as 'P',transCode,IF($rejectionType = '29' or $rejectionType = '18', RIGHT(debitAccountNumber, 4), debitAccountNumber) as debitAccountNumber,DATE_FORMAT(clgDate,'%m/%d/%Y')as clgDate1,'ICICI ATM' as 'T','DELHI' as 'U','DELHI' as 'V',10 as 'W',0 as 'X' FROM `octmotherchequeentry`,corebankmaster CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE `clgDate`='$clgDate' AND `nonCtsCategory`='$rejectionType' AND `lotNumber`='$lotNumber' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND `octmotherchequeentry`.micrCode=corebankmaster.micrCode AND batchId=".$query_result[$i]->batchId;
				$result1=$this->db->query($sql1)->result();
			
				$result_export = array_merge($result,$result1);
				$sql3 = "SELECT cardNumber2,chequeNumber,DATE_FORMAT(chequeDate,'%m/%d/%Y')as chequeDate1,chequeAmnt,SUBSTR(micrCode, 4, 3) as bankCode,SUBSTR(micrCode, 7, 3) as branchCode,transCode FROM `octmotherchequeentry`  WHERE `clgDate`='$clgDate' AND `nonCtsCategory`='$rejectionType' AND `lotNumber`='$lotNumber' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND batchId=".$query_result[$i]->batchId;
				$result3=$this->db->query($sql3)->result();
				
				if(count($result1)>0)
				{				
					$dataForXLS = $this->exportExcelForCC_M1($result_export,$fileNameForCSV,$result3,$fileNameForXLS,$clgDate,$folderName,$lotNumber,$fileNameForTipsLocalFile,$rejectionType,$query_result[$i]->batchId);	
				}
				else{
					
				}
				//return $data='';
			}
		}
		
	}
	
	////////////////Credit Card  excel genarate 
	public function exportExcelForCC_M1($result_export,$fileNameForCSV,$params,$fileNameForXLS,$clgDate,$folderName,$lotNumber,$fileNameForTipsLocalFile,$rejectionType,$batchID)
	{	
	///////////////Excel  -----   CC_M1L
		$objPHPExcel = new PHPExcel();
		$objPHPExcel->getProperties()->setCreator("Maarten Balliauw")
					 ->setLastModifiedBy("Maarten Balliauw");				
					 
		$objPHPExcel->setActiveSheetIndex(0);
		$objPHPExcel->getActiveSheet()->SetCellValue('A1', "CHQ_NO")
									->SetCellValue('B1', "CHQ_DT")
									->SetCellValue('C1', "TRANSCODE")
									->SetCellValue('D1', "BANK_CODE")
									->SetCellValue('E1', "BRANCH_CODE")
									->SetCellValue('F1', "CHQ_AMT")
									->SetCellValue('G1', "CARDNO");
		
		$j='2';
		for($i=0;$i<count($params);$i++)
		{
			$objPHPExcel->getActiveSheet()->SetCellValue("A$j", $params[$i]->chequeNumber, PHPExcel_Cell_DataType::TYPE_STRING);
			$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $params[$i]->chequeDate1, PHPExcel_Cell_DataType::TYPE_STRING);
			$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $params[$i]->transCode, PHPExcel_Cell_DataType::TYPE_STRING);
			$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $params[$i]->bankCode, PHPExcel_Cell_DataType::TYPE_STRING);
			$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $params[$i]->branchCode, PHPExcel_Cell_DataType::TYPE_STRING);
			$objPHPExcel->getActiveSheet()->SetCellValue("F$j", $params[$i]->chequeAmnt, PHPExcel_Cell_DataType::TYPE_STRING);
			$objPHPExcel->getActiveSheet(0)->getStyle("F$j")->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
			$objPHPExcel->getActiveSheet()->SetCellValue("G$j", $params[$i]->cardNumber2, PHPExcel_Cell_DataType::TYPE_STRING);
			$objPHPExcel->setActiveSheetIndex(0)->getStyle("A$j:G$j")->getAlignment()->setWrapText(true);
					$objPHPExcel->getActiveSheet(0)->getStyle("A$j:G$j")->applyFromArray(
					array(
					 'borders' => array('allborders' => array( 'style' => PHPExcel_Style_Border::BORDER_THIN))));
			$j++;
		}
		$objPHPExcel->getActiveSheet(0)->setTitle('Summary');
		
		$objPHPExcel->getActiveSheet(0)->getColumnDimension('G')->setWidth(15);
		$objPHPExcel->setActiveSheetIndex(0)->getStyle('A1:G1')->getAlignment()->setWrapText(true);
		
		
		$objPHPExcel->getActiveSheet(0)->getStyle('A1:G1')->applyFromArray(
				array(
					 'borders' => array('allborders' => array( 'style' => PHPExcel_Style_Border::BORDER_THIN)),
					 'alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
					 'font'    => array('bold' => true,'name'  => 'Verdana'),
					 'fill' => array('type'  => PHPExcel_Style_Fill::FILL_GRADIENT_LINEAR,'rotation'   => 90,'startcolor' => array('argb' => 'FFA0A0A0'),'endcolor'   => array('argb' => 'FFFFFFFF')),			
					'fill' => array('type' => PHPExcel_Style_Fill::FILL_SOLID,'color' => array('rgb' => 'CCFFCC')))
					 );	

		if($rejectionType == 18)
		{
			if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR)) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR, 0777, true);
			}
				$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel5');
				$objWriter->save(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR."".$fileNameForXLS.".xls");
			
	 }
	 
	 if($rejectionType == 23)
		{
			if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."TRF-".$batchID."".SEPARATOR)) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."TRF-".$batchID."".SEPARATOR, 0777, true);
			}
				$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel5');
				$objWriter->save(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."TRF-".$batchID."".SEPARATOR."".$fileNameForXLS.".xls");
			
			$result = EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."TRF-".$batchID."".SEPARATOR."".$fileNameForXLS.".xls";
	 }
	 
	 if($rejectionType == 29)
		{
			if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR)) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR, 0777, true);
			}
				$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel5');
				$objWriter->save(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR."".$fileNameForXLS.".xls");
			
			$result = EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR."".$fileNameForXLS.".xls";
	 }
	
		/////////// excel for  tipslocalfileformat
		$objPHPExcel = new PHPExcel();
		$objPHPExcel->getProperties()->setCreator("Maarten Balliauw")
					 ->setLastModifiedBy("Maarten Balliauw");	
		
		$objPHPExcel->setActiveSheetIndex(0);
		$objPHPExcel->getActiveSheet()->SetCellValue('A1', $result_export[0]->RCP)
									->SetCellValue('B1', $result_export[0]->clgDate1)
									->SetCellValue('C1', $result_export[0]->totalCount)
									->SetCellValue('D1', $result_export[0]->totalAmount)
									->SetCellValue('E1', $result_export[0]->A)
									->SetCellValue('F1', $result_export[0]->B)
									->SetCellValue('G1', $result_export[0]->totalCount1)																	
									->SetCellValue('A2', "serial no")
									->SetCellValue('B2', "Type of Cheque as 102 to Transfer Cheques")
									->SetCellValue('C2', "By Deafault")
									->SetCellValue('D2', "By Default")
									->SetCellValue('E2', "By Default 1")
									->SetCellValue('F2', "By Default 2")
									->SetCellValue('G2', "By Default 3")
									->SetCellValue('H2', "card no")
									->SetCellValue('I2', "cheque no")
									->SetCellValue('J2', "date of cheque")
									->SetCellValue('K2', "amount")
									->SetCellValue('L2', "micr code")
									->SetCellValue('M2', "blank")
									->SetCellValue('N2', "Bank name n branch name")
									->SetCellValue('O2', "by default 4")
									->SetCellValue('P2', "by default 5")
									->SetCellValue('Q2', "tran code")
									->SetCellValue('R2', "account no")
									->SetCellValue('S2', "date of deposit")
									->SetCellValue('T2', "pick up location")
									->SetCellValue('U2', "by default 6")
									->SetCellValue('V2', "by default 7")
									->SetCellValue('W2', "by default 8")
									->SetCellValue('X2', "by default 9");		
		$j='3';
		for($i=1;$i<count($result_export);$i++)
		{
			$objPHPExcel->getActiveSheet()->SetCellValue("A$j", $result_export[$i]->serialNumber);
			$objPHPExcel->getActiveSheet()->SetCellValue("B$j", $result_export[$i]->B);
			$objPHPExcel->getActiveSheet()->SetCellValue("C$j", $result_export[$i]->C);
			$objPHPExcel->getActiveSheet()->SetCellValue("D$j", $result_export[$i]->D);
			$objPHPExcel->getActiveSheet()->SetCellValue("E$j", $result_export[$i]->E);
			$objPHPExcel->getActiveSheet()->SetCellValue("F$j", $result_export[$i]->F);
			$objPHPExcel->getActiveSheet()->SetCellValue("G$j", $result_export[$i]->G);
			$objPHPExcel->getActiveSheet()->SetCellValue("H$j", $result_export[$i]->cardNumber2);
			$objPHPExcel->getActiveSheet()->SetCellValue("I$j", $result_export[$i]->chequeNumber, PHPExcel_Cell_DataType::TYPE_STRING);
			$objPHPExcel->getActiveSheet()->SetCellValue("J$j", $result_export[$i]->chequeDate1);
			$objPHPExcel->getActiveSheet()->SetCellValue("K$j", $result_export[$i]->chequeAmnt);
			$objPHPExcel->getActiveSheet()->getStyle("K$j")->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
			$objPHPExcel->getActiveSheet()->SetCellValue("L$j", $result_export[$i]->micrCode, PHPExcel_Cell_DataType::TYPE_STRING);			
			$objPHPExcel->getActiveSheet()->SetCellValue("M$j", $result_export[$i]->M);
			$objPHPExcel->getActiveSheet()->SetCellValue("N$j", $result_export[$i]->bankName);
			$objPHPExcel->getActiveSheet()->SetCellValue("O$j", $result_export[$i]->O);
			$objPHPExcel->getActiveSheet()->SetCellValue("P$j", $result_export[$i]->P);
			$objPHPExcel->getActiveSheet()->SetCellValue("Q$j", $result_export[$i]->transCode);
			$objPHPExcel->getActiveSheet()->SetCellValue("R$j", $result_export[$i]->debitAccountNumber, PHPExcel_Cell_DataType::TYPE_STRING);
			$objPHPExcel->getActiveSheet()->SetCellValue("S$j", $result_export[$i]->clgDate1);
			if($rejectionType ==29)
			$objPHPExcel->getActiveSheet()->SetCellValue("T$j", $result_export[$i]->T);
			else
			$objPHPExcel->getActiveSheet()->SetCellValue("T$j", $result_export[$i]->U);
			$objPHPExcel->getActiveSheet()->SetCellValue("U$j", $result_export[$i]->V);
			$objPHPExcel->getActiveSheet()->SetCellValue("V$j", $result_export[$i]->V);
			if($rejectionType ==29)
			$objPHPExcel->getActiveSheet()->SetCellValue("W$j", $result_export[$i]->W);
			else
			$objPHPExcel->getActiveSheet()->SetCellValue("W$j", $result_export[$i]->X);
			$objPHPExcel->getActiveSheet()->SetCellValue("X$j", $result_export[$i]->X);
			$objPHPExcel->getActiveSheet()->getStyle("A$j:X$j")->applyFromArray(
			array('borders' => array( 'allborders' => array('style' => PHPExcel_Style_Border::BORDER_THIN))));
			$objPHPExcel->setActiveSheetIndex(0)->getStyle("A$j:X$j")->getAlignment()->setWrapText(true);
			$j++;
		}
		
		$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(false);
		$objPHPExcel->getActiveSheet()->getStyle('A2:X2')->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_BLUE);
		$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(10);
		$objPHPExcel->getActiveSheet()->getColumnDimension('L')->setWidth(15);
		$objPHPExcel->setActiveSheetIndex(0)->getStyle('A2:X2')->getAlignment()->setWrapText(true); 
		$objPHPExcel->getActiveSheet()->getRowDimension('A2')->setRowHeight(50);
		$styleArray = array(
     
  );
$objPHPExcel->getDefaultStyle()->applyFromArray($styleArray);			 			
		$objPHPExcel->getActiveSheet()->getStyle('A2:X2')->applyFromArray(
		array(
			 'borders' => array('allborders' => array( 'style' => PHPExcel_Style_Border::BORDER_THIN)),
			 'alignment' => array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT),		
			 'font'    => array('bold' => true,'name'  => 'Verdana'),
			 'fill' => array('type'  => PHPExcel_Style_Fill::FILL_GRADIENT_LINEAR,'rotation'   => 90,'startcolor' => array('argb' => 'FFA0A0A0'),'endcolor'   => array('argb' => 'FFFFFFFF')),			
			'fill' => array('type' => PHPExcel_Style_Fill::FILL_SOLID,'color' => array('rgb' => 'CCFFCC')))
			 );
		$objPHPExcel->getActiveSheet()->setTitle('Summary');
		if($rejectionType == 18)
		{
			if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR)) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR, 0777, true);
			}
				$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel5');
				$objWriter->save(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR."".$fileNameForTipsLocalFile.".xls");
			//generate CSV file 	
			$dataForCSV = $this->exportCSV($result_export,$fileNameForCSV,$clgDate,$folderName,$lotNumber,$batchID,$rejectionType);	
					
	$result = EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR."".$fileNameForTipsLocalFile.".xls";
		}
		if($rejectionType == 23)
		{
			if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."TRF-".$batchID."".SEPARATOR)) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."TRF-".$batchID."".SEPARATOR, 0777, true);
			}
				$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel5');
				$objWriter->save(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."TRF-".$batchID."".SEPARATOR."".$fileNameForTipsLocalFile.".xls");
			//generate CSV file 
			$dataForCSV = $this->exportCSV($result_export,$fileNameForCSV,$clgDate,$folderName,$lotNumber,$batchID,$rejectionType);	
					
	$result = EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR."".$fileNameForTipsLocalFile.".xls";
		}
		if($rejectionType == 29)
		{
			if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR)) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR, 0777, true);
			}
				$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel5');
				$objWriter->save(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR."".$fileNameForTipsLocalFile.".xls");
			//Call generate CSV file 
			$dataForCSV = $this->exportCSV($result_export,$fileNameForCSV,$clgDate,$folderName,$lotNumber,$batchID,$rejectionType);	
					
	$result = EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR."".$fileNameForTipsLocalFile.".xls";
		}
	}	
//  Function for generate CSV
public function exportCSV($result,$fileNameForCSV,$clgDate,$folderName,$lotNumber,$batchID,$rejectionType)
	{	
		$filename = $fileNameForCSV.".csv";
		if($rejectionType==18)
		{
			$fp = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR.$fileNameForCSV.'.csv', 'w');
		}
		if($rejectionType==23)
		{
			$fp = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."TRF-".$batchID."".SEPARATOR.$fileNameForCSV.'.csv', 'w');
		}
		if($rejectionType==29)
		{
			$fp = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$batchID."".SEPARATOR.$fileNameForCSV.'.csv', 'w');
		}
		
		foreach ($result as $fields) {
			fputcsv($fp, get_object_vars($fields));			
		}		
	}
				
/////////generate output text files	
	
public function generateTEXT($clgDate,$rejectionType1,$lotNumber)
{
		$clgDate = str_replace("%20", " ", $clgDate);
		$clgDate = str_replace(",", " ", $clgDate);
		$clgDate = date("Y-m-d", strtotime($clgDate));
	
		$query = "SELECT batchId,nonCtsCategory FROM `octmotherchequeentry` WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 GROUP BY batchId,nonCtsCategory";
		$query_result=$this->db->query($query)->result();
	if(count($query_result)>0)
	{
		for($m=0;$m<count($query_result);$m++)
		{
			$rejectionType = $query_result[$m]->nonCtsCategory;
			if($rejectionType == 18)
			{
				$folderName = 'CREDIT CARD';
				$sql = "SELECT *,'0026SLCARDCL' as AccountNo,'INR' as 'INR',CONCAT(chequeAmnt,'',transCode) as amntAndTrans FROM octmotherchequeentry WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND batchId=".$query_result[$m]->batchId;		
				$isHeader = false;
				$json = 'octmgenerateCreditCardUC';
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
				$arrMeta = json_decode($strJSON);
				$result = $this->db->query($sql)->result();				
				 $str = "";			
				if($isHeader){ 
				
					for($j=0;$j<count($arrMeta->Columns);$j++){			
						$str.=$arrMeta->Columns[$j]->headers;
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
					}
				}
				
				for($i=0;$i<count($result);$i++){					
					for($j=0;$j<count($arrMeta->Columns);$j++){						
						$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";
				}
				if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".$folderName."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$query_result[$m]->batchId."".SEPARATOR)) 
				{					  
					mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".$folderName."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$query_result[$m]->batchId."".SEPARATOR, 0777, true);
				}
		$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".$folderName."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$query_result[$m]->batchId."".SEPARATOR."".'UC_'.$query_result[$m]->batchId.'_1'.'.txt', "w");
				fwrite($handle, $str);
			}
			
			//////text for credit card UPL
			if($rejectionType == 18)
			{
				$folderName = 'CREDIT CARD';
				$sql = "SELECT *,'0026SLCARDCL' as AccountNo,'INR' as 'INR',CONCAT('/','',chequeNumber,'/',corebankmaster.shortName) as chequeNumberShortBankCode,CONCAT(chequeAmnt,'',transCode) as amntAndTrans FROM octmotherchequeentry,corebankmaster WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND corebankmaster.micrCode=`octmotherchequeentry`.micrCode AND batchId=".$query_result[$m]->batchId;		
				$isHeader = false;
				$json = 'octmgenerateCreditCardUPL';
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
				$arrMeta = json_decode($strJSON);
				$result = $this->db->query($sql)->result();				
				$str = "";			
				if($isHeader){
					for($j=0;$j<count($arrMeta->Columns);$j++){			
						$str.=$arrMeta->Columns[$j]->header;
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
					}
				}
				
				for($i=0;$i<count($result);$i++)
				{					
					for($j=0;$j<count($arrMeta->Columns);$j++){						
						$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";
				}
if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".$folderName."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$query_result[$m]->batchId."".SEPARATOR)) 
				{					  
					mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".$folderName."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$query_result[$m]->batchId."".SEPARATOR, 0777, true);
				}
				$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".$folderName."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$query_result[$m]->batchId."".SEPARATOR.'UPL_'.$query_result[$m]->batchId.'.txt', "w");
				fwrite($handle, $str);
			}
			//////text for ICIC credit card UC
			if($rejectionType == 23)
			{			
				$folderName = 'ICICI CREDIT CARD';
				$sql = "SELECT *,CONCAT('INR','',LEFT(debitAccountNumber, 4)) as INRDebitAccountNo,'D' as 'D',CONCAT(chequeAmnt,'CR.CRD',cardNumber2) as amuntAndCreditCardNumber,'CHQ' as 'CHQ' FROM octmotherchequeentry WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND batchId=".$query_result[$m]->batchId;		
				$isHeader = false;
				$json = 'octmgenerateICICICreditCardECT';
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
				$arrMeta = json_decode($strJSON);
				$result = $this->db->query($sql)->result();				
				$str = "";			
				if($isHeader){
					for($j=0;$j<count($arrMeta->Columns);$j++){			
						$str.=$arrMeta->Columns[$j]->header;
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
					}
				}
				
				for($i=0;$i<count($result);$i++){
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
						
						$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";
				}
				if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."TRF-".$query_result[$m]->batchId."".SEPARATOR)) 
				{					  
					mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."TRF-".$query_result[$m]->batchId."".SEPARATOR, 0777, true);
				}
				$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."TRF-".$query_result[$m]->batchId."".SEPARATOR.'ECT_'.$query_result[$m]->batchId.'_1'.'.txt', "w");
				fwrite($handle, $str);
			}
			//////text for ICIC credit card UPL
			if($rejectionType == 23)
			{ 
				$sql = "SELECT *,'0026SLCARDCL' as AccountNo,'INR' as 'INR',CONCAT(chequeNumber,'',shortMicrCode) as chequeNumberShortBankCode,CONCAT(chequeAmnt,'',transCode) as amntAndTrans FROM octmotherchequeentry WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND batchId=".$query_result[$m]->batchId;		
				$isHeader = false;
				$json = 'octmgenerateICICICreditCardUPL';
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
				$arrMeta = json_decode($strJSON);
				$result = $this->db->query($sql)->result();				
				$str = "";			
				if($isHeader){
					for($j=0;$j<count($arrMeta->Columns);$j++){			
						$str.=$arrMeta->Columns[$j]->header;
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
					}
				}
				
				for($i=0;$i<count($result);$i++){
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
						
						$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";
				}
				if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."TRF-".$query_result[$m]->batchId."".SEPARATOR)) 
				{					  
					mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."TRF-".$query_result[$m]->batchId."".SEPARATOR, 0777, true);
				}
				$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."TRF-".$query_result[$m]->batchId."".SEPARATOR.'UPL_'.$query_result[$m]->batchId.'.txt', "w");
				fwrite($handle, $str);
			}			
			//////text for Non CTS credit card UC
			if($rejectionType == 29)
			{
				$folderName = 'NON CTS CREDIT CARD';
				$sql = "SELECT *,'0026SLCARDCL' as AccountNo,'INR' as 'INR',CONCAT(chequeAmnt,'',transCode) as amntAndTrans FROM octmotherchequeentry WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND batchId=".$query_result[$m]->batchId;
				$isHeader = false;
				$json = 'octmgenerateNONCTSCreditCardUC';
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
				$arrMeta = json_decode($strJSON);
				$result = $this->db->query($sql)->result();				
				$str = "";			
				if($isHeader){
					for($j=0;$j<count($arrMeta->Columns);$j++){			
						$str.=$arrMeta->Columns[$j]->header;
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
					}
				}
				
				for($i=0;$i<count($result);$i++){
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
						
						$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";
				}
				if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$query_result[$m]->batchId."".SEPARATOR)) 
				{					  
					mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$query_result[$m]->batchId."".SEPARATOR, 0777, true);
				}
				$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.""."CLG-".$query_result[$m]->batchId."".SEPARATOR.'UC_'.$query_result[$m]->batchId.'_1'.'.txt', "w");
				fwrite($handle, $str);
			}			
			//////text for credit card Rejection UPL
			if($rejectionType == 19)
			{
				$folderName = 'CREDIT CARD REJECTION';
				$sql = "SELECT *,(@cnt := @cnt + 1) AS serialNumber,DATE_FORMAT(chequeDate,'%m/%d/%Y') as convertedchequeDate,octmreason.reason as rejectionReason FROM octmotherchequeentry,octmreason CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND octmotherchequeentry.reason=octmreason.reasonId AND batchId=".$query_result[$m]->batchId;
				$isHeader = false;
				$json = 'octmgenerateCreditCardRejectionUPL';
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
							$arrMeta = json_decode($strJSON);
							$result = $this->db->query($sql)->result();							
							$str = "";						
							if($isHeader){
								for($j=0;$j<count($arrMeta->Columns);$j++){			
									$str.=$arrMeta->Columns[$j]->header;
									$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
								}
							}
							
							for($i=0;$i<count($result);$i++){
								
								for($j=0;$j<count($arrMeta->Columns);$j++){
									
									$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
									$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
								}		
								$str.="\r\n";
							}
							if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName)) 
							{					  
								mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR, 0777, true);
							}
							$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.'CREDITCARDREJ- - '.$query_result[$m]->batchId.'.txt', "w");
							fwrite($handle, $str);
							//die();
			}
			//////text for ICICI credit card Rejection UPL
			if($rejectionType == 24)
			{
				$folderName = 'ICICI CREDIT CARD REJECTION';
				$sql = "SELECT *,(@cnt := @cnt + 1) AS serialNumber,DATE_FORMAT(chequeDate,'%m/%d/%Y') as convertedchequeDate,octmreason.reason as rejectionReason FROM octmotherchequeentry,octmreason CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND octmotherchequeentry.reason=octmreason.reasonId AND batchId=".$query_result[$m]->batchId;
				$isHeader = false;
				$json = 'octmgenerateICICICreditCardRejectionUPL';
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
				$arrMeta = json_decode($strJSON);
				$result = $this->db->query($sql)->result();				
				$str = "";			
				if($isHeader){
					for($j=0;$j<count($arrMeta->Columns);$j++){			
						$str.=$arrMeta->Columns[$j]->header;
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
					}
				}
				
				for($i=0;$i<count($result);$i++){
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
						
						$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";
				}
				if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName)) 
				{					  
					mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR, 0777, true);
				}
				$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.'ICICICREDITCARDREJ- - '.$query_result[$m]->batchId.'.txt', "w");
				fwrite($handle, $str);
			}
			//////text for NON CTS credit card Rejection UPL
			if($rejectionType == 30)
			{
				$folderName = 'NON CTS CREDIT CARD REJECTION';
				$sql = "SELECT *,'0026SLCARDCL' as AccountNo,'INR' as 'INR',CONCAT(chequeAmnt,'',transCode) as miscAndTrans,DATE_FORMAT(chequeDate,'%m/%d%Y') as convertedchequeDate,octmreason.reason as rejectionReason FROM octmotherchequeentry,octmreason WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND octmotherchequeentry.reason=octmreason.reasonId AND chequeAmnt!=0 AND batchId=".$query_result[$m]->batchId;
				$isHeader = false;
				$json = 'octmgenerateNONCTSCreditCardRejectionUPL';
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
				$arrMeta = json_decode($strJSON);
				$result = $this->db->query($sql)->result();				
				$str = "";			
				if($isHeader){
					for($j=0;$j<count($arrMeta->Columns);$j++){			
						$str.=$arrMeta->Columns[$j]->header;
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
					}
				}
				
				for($i=0;$i<count($result);$i++){
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
						
						$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
						$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";
				}
				if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName)) 
				{					  
					mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR, 0777, true);
				}
				$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'CREDIT CARD'."-".$lotNumber."-".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".$folderName."".SEPARATOR.'NONCTSCREDITCARDREJ- - '.$query_result[$m]->batchId.'.txt', "w");
				fwrite($handle, $str);
			}
			//////text for AIRTEL,CANCELLED CHEQUE,CMS,DELHI JAL BOARD,FOREIN CURRENCY,ICICI PRUDENTIAL,NOT A FINANCIAL,NOT DRAWN IN ICICI,SCHOOL FEES,SL COLLECTION,rejectionType UPL
		if($rejectionType == 13 || $rejectionType == 14 || $rejectionType == 16 || $rejectionType == 21 || $rejectionType == 22 || $rejectionType == 25 || $rejectionType == 32 || $rejectionType == 33 || $rejectionType == 37 || $rejectionType == 38 || $rejectionType == 39)
		{
			if($rejectionType == 13){
			$folderName = 'AIRTEL';}
			if($rejectionType == 14){
			$folderName = 'CANCELLED CHEQUE';}
			if($rejectionType == 16){
			$folderName = 'CMS';}
			if($rejectionType == 21){
			$folderName = 'DELHI JAL BOARD';}
			if($rejectionType == 22){
			$folderName = 'FOREIN CURRENCY';}
			if($rejectionType == 25){
			$folderName = 'ICICI PRUDENTIAL';}
			if($rejectionType == 32){
			$folderName = 'NOT A FINANCIAL';}
			if($rejectionType == 33){
			$folderName = 'NOT DRAWN IN ICICI';}
			if($rejectionType == 37){
			$folderName = 'SCHOOL FEES';}
			if($rejectionType == 38){
			$folderName = 'SL COLLECTION';}
			if($rejectionType == 39){
			$folderName = 'TIKONA';}
			$sql = "SELECT *,(IF($rejectionType = 22 ,CONCAT('0000','',accountNumber2),IF($rejectionType = 14 or $rejectionType = 22 or $rejectionType = 25 or $rejectionType = 32 or $rejectionType = 33 or $rejectionType = 37 or $rejectionType = 38,'00000106SL0COLLN','0106SL0COLLN')))  as AccountNo,'INR' as 'INR',CONCAT('/','',CONCAT(chequeNumber,'/',corebankmaster.shortName)) as chequeNumberShortBankName,CONCAT(chequeAmnt,'',transCode) as chequeAmntTransCode FROM octmotherchequeentry,`corebankmaster` WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND corebankmaster.micrCode=`octmotherchequeentry`.micrCode AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;
			$json = 'octmgenerateAirtelUPL';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);
			$result = $this->db->query($sql)->result();			
			$str = "";		
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
			}
			
			for($i=0;$i<count($result);$i++){				
				for($j=0;$j<count($arrMeta->Columns);$j++){					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
			}
			if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName)) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName, 0777, true);
			}
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR."".'UPL-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
		}
		////// UPL for ICICI Rejection 
		if($rejectionType == 26)
		{
			$folderName = 'ICICI REJECTION';
			$sql = "SELECT *,'' as 'Blank',CONCAT('INR','',LEFT(debitAccountNumber,4)) as INRDebitAccountNumber,CONCAT('INR','',LEFT(accountNumber2,4)) as INRaccountNumber2,CONCAT(chequeAmnt,'',draweeName) as amntDraweeName,CONCAT(chequeAmnt,'',payeeName) as amntPayeeName,octmreason.reason as reason1,'D' as 'flagD','C' as 'flagC','CHQ' as 'CHQ'	 FROM octmotherchequeentry,octmreason CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND octmotherchequeentry.reason=octmreason.reasonId AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;
			$json = 'octmgenerateICICIRejectionUPL';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');			
			$arrMeta = json_decode($strJSON);
			$result = $this->db->query($sql)->result();
			$str = "";		
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
				$str.="\r\n";
			}
			
			for($i=0;$i<count($result);$i++){
				
				for($j=0;$j<count($arrMeta->Columns);$j++){
					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
				for($k=0;$k<count($arrMeta->Columns1);$k++){
					
					$str.=$result[$i]->{$arrMeta->Columns1[$k]->dbcol};
					$str.=str_pad("",$arrMeta->Columns1[$k]->spaces);
				}		
				$str.="\r\n";
			}
			if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR)) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR, 0777, true);
			}
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR."".$lotNumber.'REJLOT'.$lotNumber.'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
		}		
		////// UPL for LOAN, INCOME TAX REFUND,NON CTS REJECTION,PAY NAME DIFFER,RBI RELIEF BOND
		if($rejectionType == 28 || $rejectionType == 27 || $rejectionType == 31 || $rejectionType == 35 || $rejectionType == 36)
		{	
			if($rejectionType == 28)
			$folderName = 'LOAN';
			if($rejectionType == 27)
			$folderName = 'INCOME TAX REFUND';
			if($rejectionType == 31)
			$folderName = 'NON CTS REJECTION';
			if($rejectionType == 35)
			$folderName = 'PAY NAME DIFFER';
			if($rejectionType == 36)
			$folderName = 'RBI RELIEF BOND';
			$sql = "SELECT *,IF($rejectionType = 28  or $rejectionType = 31 or $rejectionType = 35 or $rejectionType = 36,accountNumber2,'0106SL0COLLN')  as AccountNo,'INR' as 'INR',CONCAT(draweeName,'/',CONCAT(chequeNumber,'/',corebankmaster.shortName)) as draweeNamechequeNumberShortBankName,CONCAT(chequeAmnt,'',transCode) as chequeAmntTransCode,IF($rejectionType = 31 ,octmreason.reason,payeeName) as payeeORREASON FROM octmotherchequeentry,`corebankmaster`,octmreason WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND corebankmaster.micrCode=`octmotherchequeentry`.micrCode AND octmotherchequeentry.reason=octmreason.reasonId AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;
			$json = 'octmgenerateCtsRejectionLoanUPL';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);
			$result = $this->db->query($sql)->result();			
			$str = "";		
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
			}
			
			for($i=0;$i<count($result);$i++){
				
				for($j=0;$j<count($arrMeta->Columns);$j++){
					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
			}
			if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName)) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName, 0777, true);
			}
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR."".'UPL-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);		
		}	
		////// UPL for Outstation Cheque 
		if($rejectionType == 34)
		{	
			$folderName = 'OUTSTATION CHEQUES';
			$sql = "SELECT *,DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1 FROM octmotherchequeentry WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;
			$json = 'octmgenerateOutstationUPL';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);
			$result = $this->db->query($sql)->result();			
			$str = "";		
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
			}
			
			for($i=0;$i<count($result);$i++){
				
				for($j=0;$j<count($arrMeta->Columns);$j++){
					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
			}
			if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName)) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName, 0777, true);
			}
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR."".'NDU-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
		
		}
		////// UPL for CTS Rejection 
		if($rejectionType == 20)
		{	
			$folderName = 'CTS REJECTION';
			$sql = "SELECT *,'INR' as 'INR',CONCAT(draweeName,'/',CONCAT(chequeNumber,'/',corebankmaster.shortName)) as draweeCheaqueNumberShortbankName,CONCAT(chequeAmnt,'',transCode) as chequeAmntTransCode FROM octmotherchequeentry,corebankmaster,octmreason.reason as rejectReason WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND octmreason.reason=octmotherchequeentry.reason AND chequeAmnt!=0 AND corebankmaster.micrCode=`octmotherchequeentry`.micrCode AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;
			$json = 'octmgenerateCtsRejectionUPL';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);
			$result = $this->db->query($sql)->result();			
			$str = "";		
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
			}
			
			for($i=0;$i<count($result);$i++){				
				for($j=0;$j<count($arrMeta->Columns);$j++){					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
			}
			if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName)) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName, 0777, true);
			}
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR."".'UPL-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);		
		}
		////// UPL for TRF IPAY (TRF report IPAY file)
		if($rejectionType == 41)
		{	
			$folderName = 'TRF I PAY';
			$sql = "SELECT *,'TRANSFER CHEQUES REPORT : ' as 'Title',CONCAT('INR','',LEFT(accountNumber2,4)) as INRAccountNumber,CONCAT(chequeAmnt,'/',chequeNumber,'/') as amountCheaqueNumber,CONCAT(shortMicrCode,'','/') as shortMicrCode1,'C' as 'flagC' FROM octmotherchequeentry,`corebankmaster` WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND corebankmaster.micrCode=`octmotherchequeentry`.micrCode AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;
			$title = true;
			$json = 'octmgenerateIpay1-TRF REPORT(IPAY FILE))1UPL';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);			
			$result = $this->db->query($sql)->result();
			$str = "";			
			if($title){				
				for($j=0;$j<count($arrMeta->Titles);$j++){
					$str.=$arrMeta->Titles[$j]->TitleName;
					$str.=$result[0]->{$arrMeta->Titles[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Titles[$j]->spaces);
				}		
				$str.="\r\n";			
			}
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
			}
			
			for($i=0;$i<count($result);$i++){				
				for($j=0;$j<count($arrMeta->Columns);$j++){					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
			}
	if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR."".'TRF')) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR."".'TRF', 0777, true);
			}			
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR."".'TRF'."".SEPARATOR.'1-TRF REPORT(IPAY FILE))'.$lotNumber.'-'.$query_result[$m]->batchId.'.txt', "w");//1-TRF REPORT(IPAY FILE))LotNumber-BatchNumber
			fwrite($handle, $str);
		}
		////// UPL for TRF IPAY ----10TRFLOT1-101
		if($rejectionType == 41)
		{	
			$folderName = 'TRF I PAY';
			
			$sql = "SELECT *,'INR' as 'INR',CONCAT(draweeName,'/',CONCAT(chequeNumber,'/',corebankmaster.shortName)) as draweeCheaqueNumberShortbankName,CONCAT(chequeAmnt,'',transCode) as chequeAmntTransCode FROM octmotherchequeentry,`corebankmaster` WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND corebankmaster.micrCode=`octmotherchequeentry`.micrCode  AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;
			$title = false;
			$json = 'octmgenerateIpayO1TRFLOT1101';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);			
			$result = $this->db->query($sql)->result();
			$str = "";			
			if($title){				
				for($j=0;$j<count($arrMeta->Titles);$j++){
					$str.=$arrMeta->Titles[$j]->TitleName;
					$str.=$result[0]->{$arrMeta->Titles[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Titles[$j]->spaces);
				}		
				$str.="\r\n";
			
			}
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
			}
			
			for($i=0;$i<count($result);$i++){				
				for($j=0;$j<count($arrMeta->Columns);$j++){					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
			}
			if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName)) 
			{					  
	mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName, 0777, true);
			}
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR."".'O1TRFLOT'.$lotNumber.'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR."".'O2TRFLOT'.$lotNumber.'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR."".'O3TRFLOT'.$lotNumber.'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR."".'O4TRFLOT'.$lotNumber.'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
		}
		
		////// UPL for TRF Chequea  (Amount equal to or less than 50000----O1TRFLOT----folder-CTS)
		
		if($rejectionType == 40)
		{	
			$folderName = 'TRF CHEQUES';
			////////Amount equal to or less than 50000----O1TRFLOT----CTS
			$sql = "SELECT *,'INR' as 'INR',CONCAT(draweeName,'/',CONCAT(chequeNumber,'/',corebankmaster.shortName)) as draweeCheaqueNumberShortbankName,CONCAT(chequeAmnt,'',transCode) as chequeAmntTransCode FROM octmotherchequeentry,`corebankmaster` WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND corebankmaster.micrCode=`octmotherchequeentry`.micrCode AND chequeAmnt<=50000 AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;
			$title = false;
			$json = 'octmgenerateTransferCTSO1TRFLOT1';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);			
			$result = $this->db->query($sql)->result();
			$str = "";
			if($title){
				for($j=0;$j<count($arrMeta->Titles);$j++){
					$str.=$arrMeta->Titles[$j]->TitleName;
					$str.=$result[0]->{$arrMeta->Titles[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Titles[$j]->spaces);
				}		
				$str.="\r\n";
			}
			
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
			}
			
			for($i=0;$i<count($result);$i++){
				
				for($j=0;$j<count($arrMeta->Columns);$j++){
					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
			}
		if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'CTS')) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'CTS', 0777, true);
			}
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'CTS'."".SEPARATOR.'O1TRFLOT'.$lotNumber.'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
			
			////////Amount equal to or less than 50001----O2TRFLOT----CTS
			$sql = "SELECT *,'INR' as 'INR',CONCAT(draweeName,'/',CONCAT(chequeNumber,'/',corebankmaster.shortName)) as draweeCheaqueNumberShortbankName,CONCAT(chequeAmnt,'',transCode) as chequeAmntTransCode FROM octmotherchequeentry,`corebankmaster` WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND corebankmaster.micrCode=`octmotherchequeentry`.micrCode AND chequeAmnt>=50001 AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;
			$title = false;
			$json = 'octmgenerateTransferCTSO1TRFLOT1';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);
			
			$result = $this->db->query($sql)->result();
			$str = "";			
			if($title){				
				for($j=0;$j<count($arrMeta->Titles);$j++){
					$str.=$arrMeta->Titles[$j]->TitleName;
					$str.=$result[0]->{$arrMeta->Titles[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Titles[$j]->spaces);
				}		
				$str.="\r\n";			
			}
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);		
				}
			}
			
			for($i=0;$i<count($result);$i++){				
				for($j=0;$j<count($arrMeta->Columns);$j++){					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
			}
		if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'CTS')) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'CTS', 0777, true);
			}
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'CTS'."".SEPARATOR.'O2TRFLOT'.$lotNumber.'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);	
		}
		
		////// UPL for TRF Chequea   (Amount equal to or less than 50000----O1TRFLOT----folder-NEW)
		
		if($rejectionType == 40)
		{	
			$folderName = 'TRF CHEQUES';
			///////Amount equal to or less than 50000 --I1TRFLOT----NEW
			$sql = "SELECT *,'110229001' as 'A',DATE_FORMAT(clgDate,'%m%d%Y') as clgDate,LPAD(REPLACE(chequeAmnt,'.',''),13,0) as chequeAmnt1,'0000000001' as '0000000001' FROM octmotherchequeentry WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND chequeAmnt<=50000 AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;
			$title = false;
			$json = 'octmgenerateTransferNEWI1TRFLOT';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);			
			$result = $this->db->query($sql)->result();
			$str = "";			
			if($title){
				
				for($j=0;$j<count($arrMeta->Titles);$j++){
					$str.=$arrMeta->Titles[$j]->TitleName;
					$str.=$result[0]->{$arrMeta->Titles[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Titles[$j]->spaces);
				}		
				$str.="\r\n";			
			}
			
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
			}
			
			for($i=0;$i<count($result);$i++){				
				for($j=0;$j<count($arrMeta->Columns);$j++){					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					//$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
			}
		if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'NEW')) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'NEW', 0777, true);
			}			
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'NEW'."".SEPARATOR.'I1TRFLOT'.$lotNumber.($lotNumber+100).'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
			
			////// ////Amount equal to or more than 50001---I2TRFLOT--NEW
			
			$sql = "SELECT *,'110229001' as 'A',DATE_FORMAT(clgDate,'%m%d%Y') as clgDate,LPAD(REPLACE(chequeAmnt,'.',''),13,0) as chequeAmnt1,'0000000001' as '0000000001' FROM octmotherchequeentry WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND chequeAmnt>=50001 AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;
			$title = false;
			$json = 'octmgenerateTransferNEWI1TRFLOT';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);			
			$result = $this->db->query($sql)->result();
			$str = "";			
			if($title){				
				for($j=0;$j<count($arrMeta->Titles);$j++){
					$str.=$arrMeta->Titles[$j]->TitleName;
					$str.=$result[0]->{$arrMeta->Titles[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Titles[$j]->spaces);
				}		
				$str.="\r\n";			
			}
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
			}
			
			for($i=0;$i<count($result);$i++){				
				for($j=0;$j<count($arrMeta->Columns);$j++){					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					//$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
			}
		if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'NEW')) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'NEW', 0777, true);
			}			
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'NEW'."".SEPARATOR.'I2TRFLOT'.$lotNumber.($lotNumber+100).'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
			
			////// ////Amount equal to or more than 50000--O1TRFLOT1---NEW
			
			$sql = "SELECT *,'INR' as 'INR',CONCAT(draweeName,'/',CONCAT(chequeNumber,'/',corebankmaster.shortName)) as draweeCheaqueNumberShortbankName,CONCAT(chequeAmnt,'',transCode) as chequeAmntTransCode FROM octmotherchequeentry,`corebankmaster` WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND corebankmaster.micrCode=`octmotherchequeentry`.micrCode AND chequeAmnt<=50000 AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;
			$title = false;
			$json = 'octmgenerateTransferNEW';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);			
			$result = $this->db->query($sql)->result();	
			$str = "";			
			if($title){				
				for($j=0;$j<count($arrMeta->Titles);$j++){
					$str.=$arrMeta->Titles[$j]->TitleName;
					$str.=$result[0]->{$arrMeta->Titles[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Titles[$j]->spaces);
				}		
				$str.="\r\n";			
			}
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
			}
			
			for($i=0;$i<count($result);$i++){				
				for($j=0;$j<count($arrMeta->Columns);$j++){					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
			}
		if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'NEW')) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'NEW', 0777, true);
			}
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'NEW'."".SEPARATOR.'O1TRFLOT'.$lotNumber.($lotNumber+100).'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
			
			////// ////Amount equal to or more than 500001--O2TRFLOT1---NEW
			
			$sql = "SELECT *,'INR' as 'INR',CONCAT(draweeName,'/',CONCAT(chequeNumber,'/',corebankmaster.shortName)) as draweeCheaqueNumberShortbankName,CONCAT(chequeAmnt,'',transCode) as chequeAmntTransCode FROM octmotherchequeentry,`corebankmaster` WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND corebankmaster.micrCode=`octmotherchequeentry`.micrCode AND chequeAmnt>=50001 AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;
			$title = false;
			$json = 'octmgenerateTransferNEW';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);
			$result = $this->db->query($sql)->result();
			$str = "";			
			if($title){				
				for($j=0;$j<count($arrMeta->Titles);$j++){
					$str.=$arrMeta->Titles[$j]->TitleName;
					$str.=$result[0]->{$arrMeta->Titles[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Titles[$j]->spaces);
				}		
				$str.="\r\n";			
			}
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
			}
			
			for($i=0;$i<count($result);$i++){				
				for($j=0;$j<count($arrMeta->Columns);$j++){					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
			}
		if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'NEW')) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'NEW', 0777, true);
			}
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'NEW'."".SEPARATOR.'O2TRFLOT'.$lotNumber.($lotNumber+100).'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'NEW'."".SEPARATOR.'O3TRFLOT'.$lotNumber.($lotNumber+100).'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'NEW'."".SEPARATOR.'O4TRFLOT'.$lotNumber.($lotNumber+100).'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
		}
		
		////// UPL for TRF Chequea 1TRFLOT  (Amount equal to or less than 50000----O1TRFLOT----folder-TRANSFER)
		
		if($rejectionType == 40)
		{	
			$folderName = 'TRF CHEQUES';
			////// ////Amount equal to or more than 500000--1TRFLOT---Transfer  
			 $sql = "SELECT *,'D' as 'flagD','C' as 'flagC',CONCAT('INR','',LEFT(debitAccountNumber,4)) as INRDebitAccountNumber,CONCAT(chequeAmnt,'',payeeName) as chequeAmntPayeeName,'CHQ' as 'CHQ',DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1,CONCAT('INR','',LEFT(accountNumber2,4)) as INRaccountNumber2,CONCAT(chequeAmnt,'',draweeName) as chequeAmntDraweeName,CONCAT(chequeAmnt,'',payeeName) as chequeAmntPayeeName FROM octmotherchequeentry WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND chequeAmnt<=50000 AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;//
			$title = false;
			$json = 'octmgenerateTransfer';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);
			$result = $this->db->query($sql)->result();
			$str = "";			
			if($title){				
				for($j=0;$j<count($arrMeta->Titles);$j++){
					$str.=$arrMeta->Titles[$j]->TitleName;
					$str.=$result[0]->{$arrMeta->Titles[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Titles[$j]->spaces);
				}		
				$str.="\r\n";			
			}
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
			}
			
			for($i=0;$i<count($result);$i++){	
				for($j=0;$j<count($arrMeta->Columns);$j++){					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
				for($k=0;$k<count($arrMeta->Columns1);$k++){
					
					$str.=$result[$i]->{$arrMeta->Columns1[$k]->dbcol};
					$str.=str_pad("",$arrMeta->Columns1[$k]->spaces);
				}		
				$str.="\r\n";
			}
		if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName)) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName, 0777, true);
			}
			
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'1TRFLOT'.$lotNumber.($lotNumber+100).'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);
			
			////// ////Amount equal to or more than 500001--2TRFLOT---Transfer  
			
			$sql = "SELECT *,'D' as 'flagD','C' as 'flagC',CONCAT('INR','',LEFT(debitAccountNumber,4)) as INRDebitAccountNumber,CONCAT(chequeAmnt,'',payeeName) as chequeAmntPayeeName,'CHQ' as 'CHQ',DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1,CONCAT('INR','',LEFT(accountNumber2,4)) as INRaccountNumber2,CONCAT(chequeAmnt,'',payeeName) as chequeAmntPayeeName,CONCAT(chequeAmnt,'',draweeName) as chequeAmntDraweeName FROM octmotherchequeentry WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND chequeAmnt>=50001 AND batchId=".$query_result[$m]->batchId;
			$isHeader = false;
			$title = false;
			$json = 'octmgenerateTransfer';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);
			$result = $this->db->query($sql)->result();
			$str = "";			
			if($title){				
				for($j=0;$j<count($arrMeta->Titles);$j++){
					$str.=$arrMeta->Titles[$j]->TitleName;
					$str.=$result[0]->{$arrMeta->Titles[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Titles[$j]->spaces);
				}		
				$str.="\r\n";			
			}
			
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
			}
			
			for($i=0;$i<count($result);$i++){				
				for($j=0;$j<count($arrMeta->Columns);$j++){					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
				for($k=0;$k<count($arrMeta->Columns1);$k++){					
					$str.=$result[$i]->{$arrMeta->Columns1[$k]->dbcol};
					$str.=str_pad("",$arrMeta->Columns1[$k]->spaces);
				}		
				$str.="\r\n";
			}
		if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName)) 
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))
				."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName, 0777, true);
			}
			
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."Lot-".$lotNumber."".SEPARATOR."".'Rejection'."".SEPARATOR."".$folderName."".SEPARATOR.'2TRFLOT'.$lotNumber.($lotNumber+100).'-'.$query_result[$m]->batchId.'.txt', "w");
			fwrite($handle, $str);			
		}		
	  }	
  }
  else
  {	
  		return $result = '';
  }
}				
/////////generate Patti for non cts category text files	
public function generateTEXTPatti($clgDate,$rejectionType,$lotNumber,$batchId,$company)
{
		$clgDate = str_replace("%20", " ", $clgDate);
		$clgDate = str_replace(",", " ", $clgDate);
		$clgDate = date("Y-m-d", strtotime($clgDate));
		if($company!='0'){
			$companyName = str_replace("%20", " ", $company);
		}
		else{$companyName='';}	
	$query = "SELECT batchId FROM `octmotherchequeentry` WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND nonCtsCategory=$rejectionType AND chequeAmnt!=0 GROUP BY batchId";
	$query_result=$this->db->query($query)->result();
	//print_r($query_result);	
	if(count($query_result)>0)
	{	
		////////// Credit Card Patti for CREDIT CARD REJECTION,ICICI CREDIT CARD REJECTION
		if($rejectionType == 19 || $rejectionType == 24)
		{
			if($rejectionType == 19){
			$folderName = 'CREDIT CARD REJECTION';$fileName = 'PATTI-';$json = 'octmgenerateCreditCardRejectionPatti';}
			if($rejectionType == 24){
			$folderName = 'ICICI CREDIT CARD REJECTION';$fileName = 'ICICICREDITCARD - -';$json = 'octmgenerateCreditCardRejectionPatti';}
			
			$sql = "SELECT *,'' as 'Blank','' as 'AAA','$folderName' as 'Title','".date('m/d/Y h:m:s A')."' as currDateTime,lotNumber,(@cnt := @cnt + 1) AS serialNumber,DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1,octmreason.reason FROM octmotherchequeentry,octmreason CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND octmotherchequeentry.reason=octmreason.reasonId AND batchId=$batchId";
			$result = $this->db->query($sql)->result();
			if(count($result)>0)
			{
				$isHeader = true;
				$title = true;
				$total = true;
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');				
				$arrMeta = json_decode($strJSON);
				$str = "";				
				if($title){ $str = $companyName;
					$str.="\r\n";
					for($k=0;$k<count($arrMeta->Titles);$k++){
						$str.=str_pad($arrMeta->Titles[$k]->TitleName,$arrMeta->Titles[$k]->spaces);
						$str.=str_pad($result[0]->{$arrMeta->Titles[$k]->dbcol},$arrMeta->Titles[$k]->spaces);
						//$str.=str_pad("",$arrMeta->Titles[$k]->spaces);
					}		
					$str.="\r\n";		
				}
				
				if($isHeader){ $str.="\r\n";
					for($j=0;$j<count($arrMeta->Columns);$j++){									
						$str.=str_pad($arrMeta->Columns[$j]->header,$arrMeta->Columns[$j]->spaces);
						//$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
					}
					$str.="\r\n";
						$str.='----------------------------------------------------------------------------------------------';
					$str.="\r\n";
				}
				$totalAmount='';
				for($i=0;$i<count($result);$i++){
					$totalAmount += $result[$i]->chequeAmnt;
					for($j=0;$j<count($arrMeta->Columns);$j++){				
						$str.=str_pad($result[$i]->{$arrMeta->Columns[$j]->dbcol},$arrMeta->Columns[$j]->spaces);
						//$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";					
				}
				$result[0]->totalAmount = $totalAmount;
				$result[0]->totalRecord = count($result);
				if($total){ $str.="\r\n";
					for($l=0;$l<count($arrMeta->Totals);$l++){			
						$str.=$arrMeta->Totals[$l]->header;
						$str.=$result[0]->{$arrMeta->Totals[$l]->dbcol};
						$str.="\r\n";			
					}
				}
				if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."CREDIT CARD PATTI"."".SEPARATOR."".$folderName)) 
				{					  
					mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."CREDIT CARD PATTI"."".SEPARATOR."".$folderName, 0777, true);
				}
				
				$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."CREDIT CARD PATTI"."".SEPARATOR."".$folderName."".SEPARATOR."".$fileName.$batchId.'.txt', "w");
				
				fwrite($handle, $str);
				$this->load->helper('download');
				force_download($fileName.$batchId.'.txt', $str);
				return $result;
			}
			else
			{
			return $result='';
			}
		}
		////////// Batch wise Patti for AIRTEL,CANCEL CHEQUES,DELHI JAL BOARD,FOREIN CURRENCY,ICICI PRUDENTIAL,INCOME TAX REFUND,NOT A FINANCIAL,NOT DRAWN IN ICICI,OUTSTATION CHEQUES,RBI RELIEF BOND		
		if($rejectionType == 13 || $rejectionType == 14 || $rejectionType == 21 || $rejectionType == 22 || $rejectionType == 25 || $rejectionType == 27 || $rejectionType == 32 || $rejectionType == 33 || $rejectionType == 34 || $rejectionType == 36 || $rejectionType == 37 || $rejectionType == 39)
		{
			if($rejectionType == 13){
			$folderName = 'AIRTEL';$fileName = 'PATTI-';$json = 'octmgenerateAirtelPatti';}
			if($rejectionType == 14){
			$folderName = 'CANCEL CHEQUES';$fileName = 'ICIPRU - -';$json = 'octmgenerateCancelChequePatti';}
			if($rejectionType == 21){
			$folderName = 'DELHI JAL BOARD';$fileName = 'ICIPRU - -';$json = 'octmgenerateCancelChequePatti';}
			if($rejectionType == 22){
			$folderName = 'FOREIN CURRENCY';$fileName = 'ICIPRU - -';$json = 'octmgenerateCancelChequePatti';}
			if($rejectionType == 25){
			$folderName = 'ICICI PRUDENTIAL';$fileName = 'ICIPRU - -';$json = 'octmgenerateCancelChequePatti';}
			if($rejectionType == 27){
			$folderName = 'INCOME TAX REFUND';$fileName = 'INCTX - -';$json = 'octmgenerateCancelChequePatti';}
			if($rejectionType == 32){
			$folderName = 'NOT A FINANCIAL';$fileName = 'ICIPRU - -';$json = 'octmgenerateCancelChequePatti';}
			if($rejectionType == 33){
			$folderName = 'NOT DRAWN IN ICICI';$fileName = 'ICIPRU - -';$json = 'octmgenerateCancelChequePatti';}
			if($rejectionType == 34){
			$folderName = 'OUTSTATION CHEQUES';$fileName = 'NDU - -';$json = 'octmgenerateOutstationChequePatti';}
			if($rejectionType == 36){
			$folderName = 'RBI RELIEF BOND';$fileName = 'RBI - -';$json = 'octmgenerateCancelChequePatti';}
			if($rejectionType == 37){
			$folderName = 'SCHOOL FEES';$fileName = 'SLCOL - -';$json = 'octmgenerateCancelChequePatti';}
			if($rejectionType == 39){
			$folderName = 'TIKONA';$fileName = 'UPL - -';$json = 'octmgenerateCancelChequePatti';}
			$sql = "SELECT *,'' as 'Blank','' as 'AAA','$folderName' as 'Title','".date('m/d/Y h:m:s A')."' as currDateTime,lotNumber,(@cnt := @cnt + 1) AS serialNumber,DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1,'' as reason,'CP' as 'branch',RIGHT(debitAccountNumber,3) as debitAccountNumber1 FROM octmotherchequeentry CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND batchId=$batchId ";
			$result = $this->db->query($sql)->result();
			if(count($result)>0)
			{
				$isHeader = true;
				$title = true;
				$total = true;				
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');				
				$arrMeta = json_decode($strJSON);
				$str = "";				
				if($title){ $str = $companyName;
					$str.="\r\n";
					for($k=0;$k<count($arrMeta->Titles);$k++){
						$str.=str_pad($arrMeta->Titles[$k]->TitleName,$arrMeta->Titles[$k]->spaces);
						$str.=str_pad($result[0]->{$arrMeta->Titles[$k]->dbcol},$arrMeta->Titles[$k]->spaces);
						//$str.=str_pad("",$arrMeta->Titles[$k]->spaces);
					}		
					$str.="\r\n";			
				}
				
				if($isHeader){$str.="\r\n";
					for($j=0;$j<count($arrMeta->Columns);$j++){									
						$str.=str_pad($arrMeta->Columns[$j]->header,$arrMeta->Columns[$j]->spaces);								
					}
					$str.="\r\n";
						$str.='-------------------------------------------------------------------------------------------------------------';	
					$str.="\r\n";
				}
				$totalAmount='';
				for($i=0;$i<count($result);$i++){
					$totalAmount += $result[$i]->chequeAmnt;
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
				
						$str.=str_pad($result[$i]->{$arrMeta->Columns[$j]->dbcol},$arrMeta->Columns[$j]->spaces);
						//$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";
				}
				$result[0]->totalAmount = $totalAmount;
				$result[0]->totalRecord = count($result);
				if($total){ $str.="\r\n";
					for($l=0;$l<count($arrMeta->Totals);$l++){			
						$str.=$arrMeta->Totals[$l]->header;
						$str.=$result[0]->{$arrMeta->Totals[$l]->dbcol};
						$str.="\r\n";			
					}
				}
				
				if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName)) 
				{					  
					mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName, 0777, true);
				}
				
				$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName."".SEPARATOR."".$fileName.$batchId.'.txt', "w");
				
				fwrite($handle, $str);
				$this->load->helper('download');
				force_download($fileName.$batchId.'.txt', $str);
				return $result;
			}
			else
			{
			return $result='';
			}
		}	
		////////// Batch wise Patti for CTS REJECTION CMS,CTS REJECTION LOAN,NON CTS REJECTION		
		if($rejectionType == 16 || $rejectionType == 28 || $rejectionType == 31)
		{
			if($rejectionType == 16){
			$folderName = 'CTS REJECTION CMS';$fileName = 'PATTI - -';$json = 'octmgenerateCTSRejectionCmsPatti';}
			if($rejectionType == 28){
			$folderName = 'CTS REJECTION LOAN';$fileName = 'PATTI - -';$json = 'octmgenerateCTSRejectionCmsPatti';}
			if($rejectionType == 31){
			$folderName = 'NON CTS REJECTION';$fileName = 'NONCTSREJECTION - -';$json = 'octmgenerateNONCTSRejectionPatti';}
			$sql = "SELECT *,'' as 'Blank','' as 'AAA','$folderName' as 'Title','".date('m/d/Y h:m:s A')."' as currDateTime,lotNumber,(@cnt := @cnt + 1) AS serialNumber,DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1,octmreason.reason as reason,'CP' as 'branch' FROM octmotherchequeentry,octmreason CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND batchId=$batchId AND octmotherchequeentry.reason=octmreason.reasonId";
			$result = $this->db->query($sql)->result();
			if(count($result)>0)
			{
				$isHeader = true;
				$title = true;
				$total = true;				
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');				
				$arrMeta = json_decode($strJSON);
				$str = "";				
				if($title){ $str = $companyName;
					$str.="\r\n";
					for($k=0;$k<count($arrMeta->Titles);$k++){
						$str.=str_pad($arrMeta->Titles[$k]->TitleName,$arrMeta->Titles[$k]->spaces);
						$str.=str_pad($result[0]->{$arrMeta->Titles[$k]->dbcol},$arrMeta->Titles[$k]->spaces);
						//$str.=str_pad("",$arrMeta->Titles[$k]->spaces);
					}		
					$str.="\r\n";			
				}
				
				if($isHeader){ $str.="\r\n";
					for($j=0;$j<count($arrMeta->Columns);$j++){									
						$str.=str_pad($arrMeta->Columns[$j]->header,$arrMeta->Columns[$j]->spaces);								
					}
					$str.="\r\n";
						$str.='----------------------------------------------------------------------------------------------';	
					$str.="\r\n";
				}
				$totalAmount='';
				for($i=0;$i<count($result);$i++){
					$totalAmount += $result[$i]->chequeAmnt;
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
				
						$str.=str_pad($result[$i]->{$arrMeta->Columns[$j]->dbcol},$arrMeta->Columns[$j]->spaces);
						//$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";					
				}
				$result[0]->totalAmount = $totalAmount;
				$result[0]->totalRecord = count($result);
				if($total){ $str.="\r\n";
					for($l=0;$l<count($arrMeta->Totals);$l++){			
						$str.=$arrMeta->Totals[$l]->header;
						$str.=$result[0]->{$arrMeta->Totals[$l]->dbcol};
						$str.="\r\n";			
					}					
				}
				
				if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName)) 
				{					  
					mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName, 0777, true);
				}
				
				$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName."".SEPARATOR."".$fileName.$batchId.'.txt', "w");
				
				fwrite($handle, $str);
				$this->load->helper('download');
				force_download($fileName.$batchId.'.txt', $str);
				return $result;
			}
			else
			{
			return $result='';
			}
		}	
		////////// Batch wise Patti for PAYEE NAME DIFFER 
		if($rejectionType == 35)
		{
			if($rejectionType == 35){
			$folderName = 'PAYEE NAME DIFFER';$fileName = 'PAYEE NAME DIFFER - -';$json = 'octmgeneratePayeeNameDifferPatti';}
			$sql = "SELECT *,'' as 'Blank','' as 'AAA','$folderName' as 'Title','".date('m/d/Y h:m:s A')."' as currDateTime,lotNumber,(@cnt := @cnt + 1) AS serialNumber,DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1,octmreason.reason as reason,'CP' as 'branch' FROM octmotherchequeentry,octmreason CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND batchId=$batchId AND octmotherchequeentry.reason=octmreason.reasonId";
			$result = $this->db->query($sql)->result();
			if(count($result)>0)
			{
				$isHeader = true;
				$title = true;
				$total = true;				
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');				
				$arrMeta = json_decode($strJSON);
				$str = "";				
				if($title){ $str = $companyName;
					$str.="\r\n";
					for($k=0;$k<count($arrMeta->Titles);$k++){
						$str.=str_pad($arrMeta->Titles[$k]->TitleName,$arrMeta->Titles[$k]->spaces);
						$str.=str_pad($result[0]->{$arrMeta->Titles[$k]->dbcol},$arrMeta->Titles[$k]->spaces);
						//$str.=str_pad("",$arrMeta->Titles[$k]->spaces);
					}		
					$str.="\r\n";			
				}
				
				if($isHeader){ $str.="\r\n";
					for($j=0;$j<count($arrMeta->Columns);$j++){									
						$str.=str_pad($arrMeta->Columns[$j]->header,$arrMeta->Columns[$j]->spaces);								
					}
					$str.="\r\n";
						$str.='---------------------------------------------------------------------------------------------------------';	
					$str.="\r\n";
				}
				$totalAmount='';
				for($i=0;$i<count($result);$i++){
					$totalAmount += $result[$i]->chequeAmnt;
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
				
						$str.=str_pad($result[$i]->{$arrMeta->Columns[$j]->dbcol},$arrMeta->Columns[$j]->spaces);
						//$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";					
				}
				$result[0]->totalAmount = $totalAmount;
				$result[0]->totalRecord = count($result);
				if($total){ $str.="\r\n";
					for($l=0;$l<count($arrMeta->Totals);$l++){			
						$str.=$arrMeta->Totals[$l]->header;
						$str.=$result[0]->{$arrMeta->Totals[$l]->dbcol};
						$str.="\r\n";			
					}					
				}				
				if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName)) 
				{					  
					mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName, 0777, true);
				}
				
				$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName."".SEPARATOR."".$fileName.$batchId.'.txt', "w");				
				fwrite($handle, $str);
				$this->load->helper('download');
				force_download($fileName.$batchId.'.txt', $str);
				return $result;
			}
			else
			{
			return $result='';
			}
		}
		//////// Batch Wise Patti for ICICI REJECTION		
		if($rejectionType == 26)
		{
			$folderName = 'ICICI REJECTION';
			$sql = "SELECT *,'' as 'Blank',CONCAT('INR','',LEFT(debitAccountNumber,4)) as INRDebitAccountNumber,CONCAT('INR','',LEFT(accountNumber2,4)) as INRaccountNumber2,CONCAT(chequeAmnt,'',draweeName) as amntDraweeName,CONCAT(chequeAmnt,'/',payeeName) as amntPayeeName,octmreason.reason as reason1,'D' as 'flagD','C' as 'flagC','CHQ' as 'CHQ' ,DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1 FROM octmotherchequeentry,octmreason CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND octmotherchequeentry.reason=octmreason.reasonId AND batchId=$batchId";
			$isHeader = true;
			$json = 'octmgenerateICICIRejectionUPL';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);
			$result = $this->db->query($sql)->result();
			$str = "";
			if(count($result)>0)
			{
				if($isHeader){ $str = $companyName;
								
						$str.='                    Date : '.date('m/d/Y',strtotime($clgDate));
						$str.='';			
					
					$str.="\r\n";
				}
				
			for($i=0;$i<count($result);$i++){
				
				for($j=0;$j<count($arrMeta->Columns);$j++){
					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
				for($k=0;$k<count($arrMeta->Columns1);$k++){
					
					$str.=$result[$i]->{$arrMeta->Columns1[$k]->dbcol};
					$str.=str_pad("",$arrMeta->Columns1[$k]->spaces);
				}		
				$str.="\r\n";
			}
				if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName)) 
					{					  
						mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName, 0777, true);
					}
					
					$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName."".SEPARATOR."".'REJLOT'.$lotNumber.'-'.$batchId.'.txt', "w");
					
					fwrite($handle, $str);
					$this->load->helper('download');
					force_download('REJLOT'.$lotNumber.'-'.$batchId.'.txt', $str);
					return $result;
				}
				else
				{
					return $result='';
				}
			}
			
			
		////////// Batch wise Patti for CTS REJECTION CMS,CTS REJECTION LOAN,NON CTS REJECTION		
		if($rejectionType == 20)
		{
			if($rejectionType == 20){
			$folderName = 'CTS REJECTION';$fileName = 'CTS REJECTION- -';$json = 'octmgenerateCTSRejectionPatti';}
			$sql = "SELECT *,'' as 'Blank','' as 'AAA','CTS REJECTION CHEQUES' as 'Title','".date('m/d/Y h:m:s A')."' as currDateTime,lotNumber,(@cnt := @cnt + 1) AS serialNumber,DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1,octmreason.reason as reason,'CP' as 'branch' FROM octmotherchequeentry,octmreason CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND batchId=$batchId AND octmotherchequeentry.reason=octmreason.reasonId";
			$result = $this->db->query($sql)->result();
			if(count($result)>0)
			{
				$isHeader = true;
				$title = true;
				$total = true;				
				$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');				
				$arrMeta = json_decode($strJSON);
				$str = "";				
				if($title){ $str = $companyName;
					$str.="\r\n";
					for($k=0;$k<count($arrMeta->Titles);$k++){
						$str.=str_pad($arrMeta->Titles[$k]->TitleName,$arrMeta->Titles[$k]->spaces);
						$str.=str_pad($result[0]->{$arrMeta->Titles[$k]->dbcol},$arrMeta->Titles[$k]->spaces);
						//$str.=str_pad("",$arrMeta->Titles[$k]->spaces);
					}		
					$str.="\r\n";			
				}
				
				if($isHeader){ $str.="\r\n";
					for($j=0;$j<count($arrMeta->Columns);$j++){									
						$str.=str_pad($arrMeta->Columns[$j]->header,$arrMeta->Columns[$j]->spaces);								
					}
					$str.="\r\n";
						$str.='----------------------------------------------------------------------------------------------';	
					$str.="\r\n";
				}
				$totalAmount='';
				for($i=0;$i<count($result);$i++){
					$totalAmount += $result[$i]->chequeAmnt;
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
				
						$str.=str_pad($result[$i]->{$arrMeta->Columns[$j]->dbcol},$arrMeta->Columns[$j]->spaces);
						//$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";					
				}
				$result[0]->totalAmount = $totalAmount;
				$result[0]->totalRecord = count($result);
				if($total){ $str.="\r\n";
					for($l=0;$l<count($arrMeta->Totals);$l++){			
						$str.=$arrMeta->Totals[$l]->header;
						$str.=$result[0]->{$arrMeta->Totals[$l]->dbcol};
						$str.="\r\n";			
					}					
				}
				
				if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName)) 
				{					  
					mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName, 0777, true);
				}
				
				$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName."".SEPARATOR."".$fileName.$batchId.'.txt', "w");
				
				fwrite($handle, $str);
				$this->load->helper('download');
				force_download($fileName.$batchId.'.txt', $str);
				return $result;
			}
			else
			{
			return $result='';
			}
		}		

		/////// Batch Wise Slip For TRF Cheques
		if($rejectionType == 40)
		{
			$folderName = 'TRF CHEQUES';
			$sql = "SELECT *,(@cnt := @cnt + 1) AS serialNumber1,'TRANSFER CHEQUES REPORT' as 'Title', DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1, DATE_FORMAT(clgDate,'%m/%d/%Y') as clgDate1 FROM octmotherchequeentry CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND batchId=$batchId AND chequeAmnt<=50000";
			$isHeader = true;
			$title = true;
			$total = true;
			$json = 'octmgenerateTRFChequePatti';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);
			$result = $this->db->query($sql)->result();
			$str = "";
			if(count($result)>0)
			{
				if($title){ $str = $companyName;
					$str.="\r\n";
					for($k=0;$k<count($arrMeta->Titles);$k++){
						$str.=str_pad($arrMeta->Titles[$k]->TitleName,$arrMeta->Titles[$k]->spaces);
						$str.=str_pad($result[0]->{$arrMeta->Titles[$k]->dbcol},$arrMeta->Titles[$k]->spaces);
						//$str.=str_pad("",$arrMeta->Titles[$k]->spaces);
					}		
					$str.="\r\n";	
					$str.='AMOUNT IS LESS THAN OR EQUAL TO 50000/-';
					$str.="\r\n";		
				}
				
				if($isHeader){$str.="\r\n";
					for($j=0;$j<count($arrMeta->Columns);$j++){
									
						$str.=str_pad($arrMeta->Columns[$j]->header,$arrMeta->Columns[$j]->spaces);
								
					}
					$str.="\r\n";
						$str.='---------------------------------------------------------------------------------------------------------';	
					$str.="\r\n";
				}
				$totalAmount='';
				for($i=0;$i<count($result);$i++){
					$totalAmount += $result[$i]->chequeAmnt;
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
				
						$str.=str_pad($result[$i]->{$arrMeta->Columns[$j]->dbcol},$arrMeta->Columns[$j]->spaces);
						//$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";
				}
				$result[0]->totalAmount = $totalAmount;
				$result[0]->totalRecord = count($result);
				$result[0]->Title2 = '1TRFLOT'.$lotNumber.'-'.$batchId;
				if($total){ $str.="\r\n";
					for($l=0;$l<count($arrMeta->Totals);$l++){			
						$str.=$arrMeta->Totals[$l]->header;
						$str.=$result[0]->{$arrMeta->Totals[$l]->dbcol};
						$str.="\r\n";			
					}
					
				}
				if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName)) 
					{					  
						mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName, 0777, true);
					}
					
					$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName."".SEPARATOR."".'1TRFLOT'.$lotNumber.'-'.$batchId.'.txt', "w");
					
					fwrite($handle, $str);
					//$this->load->helper('download');
					//force_download('1TRFLOT'.$lotNumber.'-'.$batchId.'.txt', $str);
			}
				else
				{
					return $result='';
				}
			} 
		
		if($rejectionType == 40)
			{
			$folderName = 'TRF CHEQUES';
					
					$sql = "SELECT *,(@cnt := @cnt + 1) AS serialNumber1,'TRANSFER CHEQUES REPORT' as 'Title', DATE_FORMAT(chequeDate,'%m/%d/%Y') as chequeDate1, DATE_FORMAT(clgDate,'%m/%d/%Y') as clgDate1 FROM octmotherchequeentry CROSS JOIN (SELECT @cnt := 0) AS dummy WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND batchId=$batchId AND chequeAmnt>=50001";
			$isHeader = true;
			$title = true;
			$total = true;
			$json = 'octmgenerateTRFChequePatti';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);
			$result = $this->db->query($sql)->result();
			$str = "";			
				if($title){ $str = $companyName;
					$str.="\r\n";
					for($k=0;$k<count($arrMeta->Titles);$k++){
						$str.=str_pad($arrMeta->Titles[$k]->TitleName,$arrMeta->Titles[$k]->spaces);
						$str.=str_pad($result[0]->{$arrMeta->Titles[$k]->dbcol},$arrMeta->Titles[$k]->spaces);
						//$str.=str_pad("",$arrMeta->Titles[$k]->spaces);
					}		
					$str.="\r\n";	
					$str.='AMOUNT IS GREATER THAN 50001/-';
					$str.="\r\n";		
				}
				
				if($isHeader){$str.="\r\n";
					for($j=0;$j<count($arrMeta->Columns);$j++){
									
						$str.=str_pad($arrMeta->Columns[$j]->header,$arrMeta->Columns[$j]->spaces);
								
					}
					$str.="\r\n";
						$str.='---------------------------------------------------------------------------------------------------------';	
					$str.="\r\n";
				}
				$totalAmount='';
				for($i=0;$i<count($result);$i++){
					$totalAmount += $result[$i]->chequeAmnt;
					
					for($j=0;$j<count($arrMeta->Columns);$j++){
				
						$str.=str_pad($result[$i]->{$arrMeta->Columns[$j]->dbcol},$arrMeta->Columns[$j]->spaces);
						//$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
					}		
					$str.="\r\n";
				}
				$result[0]->totalAmount = $totalAmount;
				$result[0]->totalRecord = count($result);
				$result[0]->Title2 = '1TRFLOT'.$lotNumber.'-'.$batchId;
				if($total){ $str.="\r\n";
					for($l=0;$l<count($arrMeta->Totals);$l++){			
						$str.=$arrMeta->Totals[$l]->header;
						$str.=$result[0]->{$arrMeta->Totals[$l]->dbcol};
						
						$str.="\r\n";			
					}
					
					
				}
				if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName)) 
					{					  
						mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName, 0777, true);
					}
					
					$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName."".SEPARATOR."".'2TRFLOT'.$lotNumber.'-'.$batchId.'.txt', "w");
					
					fwrite($handle, $str);
					$this->load->helper('download');
					force_download('2TRFLOT'.$lotNumber.'-'.$batchId.'.txt', $str);
			
					return $result;
				}
			
		if($rejectionType == 41)
		{	
			$folderName = 'TRF I PAY';
			$sql = "SELECT *,'TRANSFER CHEQUES REPORT : ' as 'Title',CONCAT('INR','',LEFT(accountNumber2,4)) as INRAccountNumber,CONCAT(chequeAmnt,'/',chequeNumber,'/') as amountCheaqueNumber,CONCAT(shortMicrCode,'','/') as shortMicrCode1,'C' as 'flagC' FROM octmotherchequeentry,`corebankmaster` WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND nonCtsCategory='$rejectionType' AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 AND corebankmaster.micrCode=`octmotherchequeentry`.micrCode AND batchId=$batchId";
			$isHeader = false;
			$title = true;
			$total = true;
			$json = 'octmgenerateIpay1-TRF REPORT(IPAY FILE))1UPL';
			$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');
			$arrMeta = json_decode($strJSON);			
			$result = $this->db->query($sql)->result();
			$str = "";			
			if($title){				
				for($j=0;$j<count($arrMeta->Titles);$j++){
					$str.=$arrMeta->Titles[$j]->TitleName;
					$str.=$result[0]->{$arrMeta->Titles[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Titles[$j]->spaces);
				}		
				$str.="\r\n";			
			}
			if($isHeader){
				for($j=0;$j<count($arrMeta->Columns);$j++){			
					$str.=$arrMeta->Columns[$j]->header;
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
				}
			}
			$str.="\r\n";
			$totalAmount='';
			for($i=0;$i<count($result);$i++){	
			$totalAmount += $result[$i]->chequeAmnt;			
				for($j=0;$j<count($arrMeta->Columns);$j++){					
					$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
					$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
				}		
				$str.="\r\n";
			}
			$result[0]->totalAmount = $totalAmount;
			$result[0]->totalRecord = count($result);
			$result[0]->Title2 = '1TRFLOT'.$lotNumber.'-'.$batchId;
			if($total){ $str.="\r\n";
					for($l=0;$l<count($arrMeta->Totals);$l++){			
						$str.=$arrMeta->Totals[$l]->header;
						$str.=$result[0]->{$arrMeta->Totals[$l]->dbcol};						
						$str.="\r\n";			
					}
				}
	if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName."".SEPARATOR))
			{					  
				mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName."".SEPARATOR, 0777, true);
			}			
			$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR.""."BATCH WISE PATTI"."".SEPARATOR."".$folderName."".SEPARATOR."".'1-TRF REPORT(IPAY FILE))'.$lotNumber.'-'.$batchId.'.txt', "w");//1-TRF REPORT(IPAY FILE))LotNumber-BatchNumber
			fwrite($handle, $str);
			$this->load->helper('download');
			force_download('1-TRF REPORT(IPAY FILE))'.$lotNumber.'-'.$batchId.'.txt', $str);
		}						
	} else{ return $result = '';}
}		
///////UPL for CTS
	public function generateTEXTCts($clgDate,$lotNumber,$batchId,$company)
	{
			$clgDate = str_replace("%20", " ", $clgDate);
			$clgDate = str_replace(",", " ", $clgDate);
			$clgDate = date("Y-m-d", strtotime($clgDate));
		$query = "SELECT `batchNumber` FROM `octmchequeentry` WHERE clgDate='$clgDate' AND lotNumber='$lotNumber' AND octmchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt!=0 GROUP BY `batchNumber`";
		$query_result=$this->db->query($query)->result();
		//print_r($query_result);
		if(count($query_result>0))
		{
			for($k=0;$k<count($query_result);$k++)
			{					
				if($company!='0')
				{
					$companyName = str_replace("%20", " ", $company);
				}
				else{$companyName='';}
					$sql = "SELECT *,CONCAT(draweeName,'/',chequeNumber,'/',corebankmaster.shortName) as draweeChequeNumberShortmicr,CONCAT(chequeAmnt,'',transCode) as chequeAmntTransCode,'INR' as 'INR' FROM `octmchequeentry`,`corebankmaster` WHERE `clgDate`='$clgDate' AND `batchNumber`=".$query_result[$k]->batchNumber." AND `lotNumber`=$lotNumber AND chequeAmnt!=0 AND corebankmaster.micrCode=`octmchequeentry`.micrCode AND `octmchequeentry`.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass')";
					$result = $this->db->query($sql)->result();					
					$isHeader = false;
					$json = 'octmgenerateCTS';
					$strJSON = read_file(IMPORT_CSVJSON_ROOT.$json.'.json');					
					$arrMeta = json_decode($strJSON);
					$str = "";		
					if($isHeader){ $str = $companyName;
						for($j=0;$j<count($arrMeta->Columns);$j++){			
							$str.=$arrMeta->Columns[$j]->header;
							$str.=str_pad("",$arrMeta->Columns[$j]->spaces);			
						}
					}
					
					for($i=0;$i<count($result);$i++){						
						for($j=0;$j<count($arrMeta->Columns);$j++){							
							$str.=$result[$i]->{$arrMeta->Columns[$j]->dbcol};
							$str.=str_pad("",$arrMeta->Columns[$j]->spaces);
						}		
						$str.="\r\n";
					}
					//echo "<pre>";print_r($str);echo "</pre>";
					if (!file_exists(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".'Lot-'.$lotNumber."".SEPARATOR."".'CTS'."".SEPARATOR)) 
					{					  
						mkdir(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".'Lot-'.$lotNumber."".SEPARATOR."".'CTS'."".SEPARATOR, 0777, true);
					}
						$handle = fopen(EXPORT_TEXT_ROOT."Output"."".SEPARATOR."".date("m-d-Y", strtotime($clgDate))."".SEPARATOR."".'Lot-'.$lotNumber."".SEPARATOR."".'CTS'."".SEPARATOR.'/UPL-'.$query_result[$k]->batchNumber.'.txt', "w");
					fwrite($handle, $str);
			  }
			  return $result = 'File created';
		}
		else{
			return $result = '';
		}
	}
		
public function getNRECheque($accountNumber2)
{	
	$sql = "SELECT * FROM `octmnrimaster` WHERE accountNumber=$accountNumber2";	
	$result=$this->db->query($sql)->result();
	 //print_r($result);
	return $result;
}
				
public function getbatchStatusForSecondPass($clgdate,$lotNumber)
{	
		$clgdate = str_replace("%20"," ", $clgdate);
		$clgdate = str_replace("%2F"," ", $clgdate);
		$clgdate = date("Y-m-d", strtotime($clgdate));
		$sql1 =  "SELECT count(*) as chequeEntryCount, batchNumber, categoryAmount, coreusers.fullName FROM octmchequeentry,coreusers WHERE DATE(clgDate)='$clgdate' AND lotNumber=$lotNumber AND octmchequeentry.userName=coreusers.userId AND octmchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass')  GROUP BY batchNumber ORDER BY batchNumber" ;	
		$result1=$this->db->query($sql1)->result();
		$sql2 = "SELECT count(*) as chequeEntryCount, batchId as batchNumber, lotNumber, octmnonctscategory.nonCtsCategoryName as categoryAmount, coreusers.fullName FROM octmotherchequeentry,coreusers,octmnonctscategory WHERE DATE(clgDate)='$clgdate' AND lotNumber=$lotNumber AND octmotherchequeentry.userCode=coreusers.userId AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND octmnonctscategory.nonCtsCategoryId=octmotherchequeentry.nonCtsCategory GROUP BY batchId";
		$result2=$this->db->query($sql2)->result();
		
		if(count($result1)<=0 && count($result2)>0)
		{
			if($result2[0]->chequeEntryCount=="0")
			{
				$result2[0]->pendingCount = $result34[0]->pendingCount;
				$result2[0]->chequeEntryCount = "";
				$result2[0]->batchNumber = "";
				$result2[0]->lotNumber = "";
				$result2[0]->categoryAmount = "";
				$result2[0]->fullName = ""; 
			}
		}
		else if(count($result2)<=0 && count($result1)>0)
		{
			if($result1[0]->chequeEntryCount=="0")
			{
				$result1[0]->pendingCount = $result34[0]->pendingCount;
				$result1[0]->chequeEntryCount = "";
				$result1[0]->batchNumber = "";
				$result1[0]->lotNumber = "";
				$result1[0]->categoryAmount = "";
				$result1[0]->fullName = ""; 
			}
		}
		else if(count($result2)>0 && count($result1)>0)
		{
			if($result2[0]->chequeEntryCount=="0")
			{
				$result2[0]->pendingCount = $result34[0]->pendingCount;
				$result2[0]->chequeEntryCount = "";
				$result2[0]->batchNumber = "";
				$result2[0]->lotNumber = "";
				$result2[0]->categoryAmount = "";
				$result2[0]->fullName = ""; 
			}
			if($result1[0]->chequeEntryCount=="0")
			{
				$result1[0]->pendingCount = $result34[0]->pendingCount;
				$result1[0]->chequeEntryCount = "";
				$result1[0]->batchNumber = "";
				$result1[0]->lotNumber = "";
				$result1[0]->categoryAmount = "";
				$result1[0]->fullName = ""; 
			}
		}
		if(count($result1)>0)
		{
			if($result1[0]->chequeEntryCount=="0" && $result2[0]->chequeEntryCount=="0")
			{
				 $result[0]="0";
			}			
		}
		$result = array_merge($result1,$result2);		
		$pendingCount = "";
		for($i=0;$i<count($result);$i++)
		{
			$sql_checkBatch =  "SELECT secondPassUser FROM octmbatchmaster WHERE DATE(clgDate)='$clgdate' AND lotId=$lotNumber AND batchId=".$result[$i]->batchNumber ;	
			$result_checkBatch=$this->db->query($sql_checkBatch)->result();
			$secondPassUser = $result_checkBatch[0]->secondPassUser;
			if($secondPassUser!=0)
			{
				$sql3 =  "SELECT * FROM octmchequeentry,coreusers WHERE DATE(clgDate)='$clgdate' AND lotNumber=$lotNumber AND octmchequeentry.userName=coreusers.userId AND octmchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND chequeAmnt=0 AND batchNumber=".$result[$i]->batchNumber ;	
				$result3=$this->db->query($sql3)->result();
				$sql4 = "SELECT * FROM octmotherchequeentry,coreusers,octmnonctscategory WHERE DATE(clgDate)='$clgdate' AND lotNumber=$lotNumber AND octmotherchequeentry.userCode=coreusers.userId AND octmotherchequeentry.ProcessId IN(SELECT processId FROM `coreprocessmaster` WHERE processName LIKE 'OctmSecondPass') AND octmnonctscategory.nonCtsCategoryId=octmotherchequeentry.nonCtsCategory AND chequeAmnt=0 AND batchid=".$result[$i]->batchNumber;
				$result4=$this->db->query($sql4)->result();
				if(count($result3)!='0')
				{
					$result[$i]->pendingCountCheque = count($result3);
				}
				if(count($result4)!='0')
				{
					$result[$i]->pendingCountCheque = count($result4);
				}
				if(count($result3)=='0' && count($result4)=='0')
				{
					$result[$i]->pendingCountCheque = '0';
				}
			}
			else
			{
				$result[$i]->pendingCountCheque = 'Not Started';
			}
	}
		
		return $result;
}
				
}
?>