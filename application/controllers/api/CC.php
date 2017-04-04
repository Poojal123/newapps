<?php
error_reporting( E_ALL );
ini_set( 'display_errors', 1 );

defined('BASEPATH') OR exit('No direct script access allowed');


// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . 'libraries/REST_Controller.php';

class CC extends REST_Controller
{
    function __construct() {
        parent::__construct();

		if (isset($_SERVER['HTTP_ORIGIN']))
		 {
			
			header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
 		    header('Access-Control-Allow-Credentials: true');
  		    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
  		    header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding,X-Custom-Header");   
   			header('Access-Control-Max-Age: 86400');    // cache for 1 day

   		if ( "OPTIONS" === $_SERVER['REQUEST_METHOD'] )
			 {
    			die();
   			 }
		}

		$this->load->database();
		$this->load->model('Sample_model');
		$this->load->model('CC_model');
		$this->load->helper('file');
	}

	public function index_get()
	{
		
		$sql = "select * from corerole";
		$sqlwhere = " WHERE 1=1 ";		
		$params = $_REQUEST;
	 
		if(isset($params['id']))
		{
			$sqlwhere.=" AND roleId".$params['id'];
		}
		
		$sql.=$sqlwhere." ORDER BY roleId DESC";		
		$qparent = $this->db->query($sql);
		return $this->set_response($qparent->result());
		
	}
	
	//GET IMAGE FROM PATH
	function folderscan_get($job="",$from,$to,$agencyCode)
	{
		
		//echo URL_IMAGE_INDEXING_CC_JOB_ROOT."".$job.SEPARATOR.$agencyCode;
//		echo URL_IMAGE_INDEXING_CC_JOB_ROOT; die;
		$types = $this->CC_model->folderScan(IMAGE_INDEXING_CC_JOB_ROOT."".$job,$from,$to,$agencyCode);

//		echo "<br>";
		return $this->set_response(array("status"=>"success","message"=>"List of All files","result"=>$types,"rootURL"=>URL_IMAGE_INDEXING_CC_JOB_ROOT."".$job.SEPARATOR.$agencyCode));
		
	}
	
	function MergeImages_get($image="",$job="",$imageName="",$userId,$agencyCode)
	{
		
		$types = $this->CC_model->mergeImages($image,$job,$imageName,$userId,$agencyCode);
		
		return $this->set_response(array("status"=>"success","message"=>"List of All files","result"=>$types));
		
	}
	
	//CREATING NEW AGENCY
	function CreateBlankEntry_post()
	{
		
		$params = json_decode(file_get_contents('php://input'),true);
		//print_r($params);
		
		$types = $this->CC_model->createBlankEntry($params['jdNo'],$params['applicationNo'],$params['imageType'],$params['agencyId'],$params['noOfApplication'],$params['jobNo'],$params['userId']);
		
		return $this->set_response(array("status"=>"success","message"=>"List of All files","result"=>$types));
		
	}
	
	
	//ASSINGING CREATED BATCH TO A AGENCY
	function AgencyBatch_post()
	{
		$params = json_decode(file_get_contents('php://input'),true);
		$types = $this->CC_model->createAgencyBatch($params['agencyId'],$params['batchId']);
	
		return $this->set_response(array("status"=>"success","message"=>"List of all process entries","result"=>$types));
		
	}
	function getRange_get($agencyId,$jdNo)
	{
		
		$types = $this->CC_model->getrange($agencyId,$jdNo);
	
		return $this->set_response(array("status"=>"success","message"=>"Batch Range","result"=>$types));
		
	}
	
	function BatchRange_get($agencyId,$jdno)
	{
		
		$types = $this->CC_model->getBatchRange($agencyId,$jdno);
	
		return $this->set_response(array("status"=>"success","message"=>"Batch Range","result"=>$types));
		
	}
	
	function executequery_get($sql)
	{
		
		$sql = rawurldecode($sql);

		$types = $this->CC_model->executequery($sql);

		return $this->set_response(array("status"=>"success","message"=>"Successfull execution","result"=>$types));
		
	}
	
	function AllocateBlankEntry_post()
	{
		 $params = json_decode(file_get_contents('php://input'),true);
		$types = $this->CC_model->allocateBlankEntry($params);
		return $this->set_response(array('status'=>'post_success', 'result'=>$types));
		/*if($types==false)
		{
			return $this->set_response(array("status"=>"Error","message"=>"","result"=>""));
		}
		else
		{
			return $this->set_response(array("status"=>"success","message"=>"Batch Range","result"=>$types));
		}*/
	}

	function AgencyCreate_get($agencyCode,$agencyName,$batchId)
 	{
	  $result= $this->CC_model->agencyCreate($agencyCode,$agencyName,$batchId);
		
			return $this->set_response(array("status"=>"Agency","message"=>"data","result"=>$result));

		
	}
	
	function CCUpdateStatus_get($batchId)
	{
		$types = $this->CC_model->updateStatus($batchId);
		return $this->set_response(array("status"=>"success","message"=>"Successfull execution","result"=>$types));
		
	}
	
	function CCAllocateRecord_get($processId,$userId,$agencyCode)
	{
		$types = $this->CC_model->allocateRecord($processId,$userId,$agencyCode);
		return $this->set_response(array("status"=>"success","message"=>"Successfull execution","result"=>$types));
		
	}
	
	function InsertFields_post()
	{	
		
		$params = json_decode(file_get_contents('php://input'),true);
		$keyparams = array_keys($params["formData"]);
			// print_r($params["formData"]);

		$this->CC_model->insertFields($keyparams,$params["formData"],$params["whr"]);

		return $this->set_response(array('status'=>'post_success', 'result'=>""));
	}

	function Data_get($code,$table,$fieldName)
 	{
   	 	$types = $this->CC_model->getdata($code,$table,$fieldName);
   		return $this->set_response(array("status"=>"success","message"=>"Batch Range","result"=>$types));
    }
	
	function CCMarkDup_get($agencyBatchId)
	{
		$types = $this->CC_model->ccMarkDuplicateRecords($agencyBatchId);
		return $this->set_response(array("status"=>"success","message"=>"Successfull execution","result"=>$types));
		
	}
	
 	function CCJdData_get($jdNo,$agencyId)
	{
		$types = $this->CC_model->jddata($jdNo,$agencyId);
		return $this->set_response(array("status"=>"success","message"=>"Successfull execution","result"=>$types));
		
	}
	
	function CCBankreportCsv_get($appref)
	{
		$result = $this->CC_model->ccBankreportCsv($appref);
		//$types = $this->CC_model->generateBankDataReport($from);
		return $this->set_response(array("status"=>"success","message"=>"","result"=>$result));
	  
	 // return $this->set_response(array("status"=>"success","message"=>"Agency Added","result"=>$types));
	}
	function CalculateAge_get($selecteddate)
 	{
  		$age = $this->CC_model->getCalculateAge($selecteddate);
 		return $this->set_response(array("status"=>"success","result"=>$age));
  
 	}	
	
	function MISSummaryreport_get($startingNumber,$endingNumber)
 	{
	  $types = $this->CC_model->generateMISSummaryReport($startingNumber,$endingNumber);
	  
	  return $this->set_response(array("status"=>"success","message"=>"Summary Report","result"=>$types));
 	}
	
	function MISRejectionreport_get($startingNumber,$endingNumber)
 	{
	  $types = $this->CC_model->generateMISRejectionReport($startingNumber,$endingNumber);
	  
	  return $this->set_response(array("status"=>"success","message"=>"Rejection Report","result"=>$types));
 	}
	
 	function DateWiseProductivity_get($startingDate,$endingDate)
 	{
	  $types = $this->CC_model->generateDateWiseReport($startingDate,$endingDate);
	  
	  return $this->set_response(array("status"=>"success","message"=>"Date Wise Report","result"=>$types));
 	}
	function BankDatReport_get()
 	{
	  $types = $this->CC_model->generateBankDatReport();
	  
	  return $this->set_response(array("status"=>"success","message"=>"Agency Added","result"=>$types));
 	}
		
	
	function HourlyProductivity_get($date,$shift,$activity)
 	{
	  $types = $this->CC_model->generateHourlyReport($date,$shift,$activity);
	  
	  return $this->set_response(array("status"=>"success","message"=>"Hourly Report","result"=>$types));
 	}
	function CCMergedImageReport_get()
 	{
	  $types = $this->CC_model->mergedImageReport();
	  
	  return $this->set_response(array("status"=>"success","message"=>"Hourly Report","result"=>$types));
 	}
	
	function DashboardSummaryReport_get($from,$to)
 	{
	  $types = $this->CC_model->generateDashboardSummaryReport($from,$to);
	  
	  return $this->set_response(array("status"=>"success","message"=>"Dashboard Summary Report","result"=>$types));
 	}
	

	function CCgetJob_get($application)
	{
			$types = $this->CC_model->getJob($application);
	  
		  return $this->set_response(array("status"=>"success","message"=>"Hourly Report","result"=>$types));
		
	}
	
	function DashboardDownload_get($from,$to,$agencyId)
 	{
	  $types = $this->CC_model->generateDashboardDownload($from,$to,$agencyId);
	  
	  return $this->set_response(array("status"=>"success","message"=>"Dashboard Summary Report","result"=>$types));
 	}
	
	
	function AuditSetting_get($agencyCode,$jdNo,$type,$value)
 	{
	  $types = $this->CC_model->auditsetting($agencyCode,$jdNo,$type,$value);
	  
	  return $this->set_response(array("status"=>"success","message"=>"Dashboard Summary Report","result"=>$types));
 	}
	function WIPReport_get($applicationFrom,$applicationTo)
 	{
	  $types = $this->CC_model->generateWIPReport($applicationFrom,$applicationTo);
	  
	  return $this->set_response(array("status"=>"success","message"=>"Dashboard Summary Report","result"=>$types));
 	}
	function CapErrorReport_get($applicationFrom,$applicationTo)
 	{
	  $types = $this->CC_model->generateCapError($applicationFrom,$applicationTo);
	  
	  return $this->set_response(array("status"=>"success","message"=>"Dashboard Summary Report","result"=>$types));
 	}
	function ImageName_get($jdNo,$agencyId)
 	{
	  $types = $this->CC_model->imageName($jdNo,$agencyId);
	  
	  return $this->set_response(array("status"=>"success","message"=>"Dashboard Summary Report","result"=>$types));
 	}	

	function Snippet_post()
	{
		$params = json_decode(file_get_contents('php://input'),true);
		$types = $this->CC_model->updateSnippet($params['fieldId'], $params['pageNo'], $params['location'], $params['appId'], $params['imgPosition'],$params["imageTypeId"]);
		return $this->set_response(array("status"=>"success","message"=>"Snippet Updated","result"=>$types));
		
	}
	
	function Snippet_get($fieldId,$imageTypeId)
	{
		$result = $this->CC_model->getSnippet($fieldId,$imageTypeId);
		return $this->set_response(array("status"=>"success","message"=>"Snippet","result"=>$result));
		
	}
		function unMapped_get($agencyId,$jobNo)
	{
		$result = $this->CC_model->getunmapped($agencyId,$jobNo);
		return $this->set_response(array("status"=>"success","message"=>"Data","result"=>$result));
		
	}
		function Previous_get($agencyId,$userId)
	{
		$result = $this->CC_model->getprevious($agencyId,$userId);
		return $this->set_response(array("status"=>"success","message"=>"Data","result"=>$result));
		
	}
			function SearchApp_get($appref)
	{
		$result = $this->CC_model->searchApp($appref);
		return $this->set_response(array("status"=>"success","message"=>"Data","result"=>$result));
		
	}
	
	function generateOutput_get($ref){

			$result = $this->CC_model->generateOutput($ref);
			return $this->set_response(array("status"=>"success","message"=>"Records found"));
	}
	function pincode_get($pincode){

			$result = $this->CC_model->getpincode($pincode);
			return $this->set_response(array("status"=>"success","message"=>"Data","result"=>$result));
	}
	function CheckSerialNo_get($appSerialNo,$processId){

			$result = $this->CC_model->checkSerialNo($appSerialNo,$processId);
			return $this->set_response(array("status"=>"success","message"=>"Data","result"=>$result));
	}
	
	
}

?>