<?php
error_reporting( E_ALL );
ini_set( 'display_errors', 1 );

defined('BASEPATH') OR exit('No direct script access allowed');


// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . 'libraries/REST_Controller.php';

class Alpl extends REST_Controller
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
		$this->load->model('ALPL_model');		
		$this->load->model('Core_model');		
        $this->load->helper('file');    
		$this->load->library('Csvreader');	
		$this->load->library('excel_reader');			

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
	
	function Process_get($id=0)
	{
		$types = $this->ALPL_model->getProcess($id);
		//echo $types;
		return $this->set_response(array("status"=>"success","message"=>"List of all process entries","result"=>$types));
		
	}
	
	function Batches_get($processId=0)
	{
		$types = $this->ALPL_model->getBatches($processId);
		//echo $types;
		return $this->set_response(array("status"=>"success","message"=>"List of all Batches entries","result"=>$types));
		
	}
	
	function Users_get($id=0)
	{
		$types = $this->ALPL_model->getUsers($id);
		//echo $types;
		return $this->set_response(array("status"=>"success","message"=>"List of all Users entries","result"=>$types));
		
	}
		function ProcessUsers_get($processId=0)
	{
		$types = $this->ALPL_model->getProcessUsers($processId);
		//echo $types;
		return $this->set_response(array("status"=>"success","message"=>"List of Process Users entries","result"=>$types));
		
	}

	function Applications_get($id=0)
	{
		$types = $this->ALPL_model->getApplications($id);
		//echo $types;
		return $this->set_response(array("status"=>"success","message"=>"List of all applications entries","result"=>$types));
		
	}

	function Release_get($userId=0,$batchId=0,$applicationId=0)
	{
		$types = $this->ALPL_model->getRelease($userId,$batchId,$applicationId);
		
		return $this->set_response(array("status"=>"success","message"=>"List of all allocation entries","result"=>$types));
		
	}
	function SearchRelease_get($key=0,$val=0)
	{
		
		$types = $this->ALPL_model->getSearchRelease($key, $val);
		return $this->set_response(array("status"=>"success","message"=>"List of all allocation entries","result"=>$types));
		
	}

	function DeleteRelease_get($allocationIds="")
	{
		
		$types=$this->ALPL_model->DeleteRelease($allocationIds);
		return $this->set_response(array("status"=>"success","message"=>"Record is release","result"=>$types));
	}

	function BatchApplication_get($batchId=0,$processId=0)
	{
		$types = $this->ALPL_model->getBatchApplication($batchId,$processId);
		
		return $this->set_response(array("status"=>"success","message"=>"List of all allocation enteries","result"=>$types));
	}
	function AllocateApplication_post($processId=0,$applicationId=0,$userId=0)
	{
		$params = json_decode(file_get_contents('php://input'),true);
		//echo $params;
		$types = $this->ALPL_model->allocateApplication($params["processId"],$params["applicationId"],$params["userId"]);
		//echo $types;
		return $this->set_response(array("status"=>"success","message"=>"application allocated","result"=>$types));
	}
	function InsertBatchType_post()
	{
		$params = json_decode(file_get_contents('php://input'),true);
		//echo $params;
		$types = $this->ALPL_model->insertBatchType($params["batchId"],$params["applicationType"]);
		//echo $types;
		return $this->set_response(array("status"=>"success","message"=>"application allocated","result"=>$types));
	}


	function NextRecord_get($processId, $userId){
		$record = $this->ALPL_model->NextRecord($processId, $userId);
		if(count($record) > 0){
			$entryId = $this->ALPL_model->RegisterEntry($record[0]->allocationId, $userId, $processId);
			$record[0]->entryId = $entryId;
			return $this->set_response(array("status"=>"success","message"=>"List of Process Users entries","result"=>$record));
		}
		else{
			return $this->set_response(array("status"=>"error","message"=>"No Records Available","result"=>""));
		}
	}
	
	function NextRecord_post(){
		$params = json_decode(file_get_contents('php://input'),true);
		
		$customReason = "";
		if(isset($params['customReason'])){
			$customReason = $params['customReason'];	
		}
		
 		$record = $this->ALPL_model->CompleteEntry($params['entryId'],$params['allocationId'],$params['processId'],
		$params["remark"][0],$params['rejectReasonId'],$customReason);
		return $this->set_response(array("status"=>"success","message"=>"","result"=>"true"));
	}
	

	function Performance_get($user="", $from="", $to="",$processId="",$locationId=""){
	
		$result = $this->ALPL_model->PerformanceRecords($user, $from, $to, $processId,$locationId);
		return $this->set_response(array("status"=>"success","message"=>"","result"=>$result));
	}

	function MISSummaryReport_get($from="",$to="",$locationId="",$applicationType=""){
		$result = $this->ALPL_model->MISSummaryReport($from,$to,$locationId,$applicationType);
		return $this->set_response(array("status"=>"success","message"=>"","result"=>$result));
	}
	function MISConsolidatedReport_get($from="",$to="",$locationId="",$applicationType=""){
		$result = $this->ALPL_model->MISConsolidatedReport($from,$to,$locationId,$applicationType);
		return $this->set_response(array("status"=>"success","message"=>"","result"=>$result));
	}
	
	function RejectReport_get($user="", $from="", $to="",$processId="",$locationId=""){
		$result = $this->ALPL_model->rejectReport($user, $from, $to, $processId,$locationId);
		return $this->set_response(array("status"=>"success","message"=>"","result"=>$result));
	}
	//get All users
	function CoreUser_get($locationId,$processId){
		$result = $this->ALPL_model->getcoreuser($locationId,$processId);
		return $this->set_response(array("status"=>"success","message"=>"","result"=>$result));
	}
	//get all allocated user for the location and process
	function ALPLUser_get($locationId,$processId){
		$result = $this->ALPL_model->getalpluser($locationId,$processId);
		return $this->set_response(array("status"=>"success","message"=>"","result"=>$result));
	}
	
	// created user for process
	function UserProcess_post(){
		$params = json_decode(file_get_contents('php://input'),true);
		$result = $this->ALPL_model->createuserprocess($params['processId'] ,$params['userId']);
		return $this->set_response(array("status"=>"success","message"=>"Success","result"=>""));
	}
	//for allocation get process related user
	function getALPLUsers_get($processId){
		//$params = json_decode(file_get_contents('php://input'),true);
		$result = $this->ALPL_model->getALPLUsers($processId);
		return $this->set_response(array("status"=>"success","message"=>"Success","result"=>$result));
	}
	
	//for duplicate records while importing CSV
	function DuplicateRecords_get($batchId){
		//echo "------";
		$result = $this->ALPL_model->getDuplicateRecords($batchId);
		
		return $this->set_response(array("status"=>"success","message"=>"Success","result"=>$result));
	}
	
	//for duplicate records while importing CSV
	function ExcelDuplicateRecords_get($batchId,$batchName){
		
		
		$result = $this->ALPL_model->getExcelDuplicateRecords($batchId,$batchName);
		//echo $result;
		return $this->set_response(array("status"=>"success","message"=>"Success","result"=>$result));
	}
	function UserProcess_delete($processId,$userId){
		$result = $this->ALPL_model->deleteProcessUser($processId,$userId);
		return $this->set_response(array('status'=>'success', 'result'=>""));		
		
	}
	function GetPreviousRemarks_get($processId,$applicationId){
		
		$result = $this->ALPL_model->getPreviousRemarks($processId,$applicationId);
		return $this->set_response(array('status'=>'success', 'result'=>$result));		
		
	}
	//for allocation get process related user
	function CheckAps_get($applicationId,$apsNo){
		//$params = json_decode(file_get_contents('php://input'),true);
		$result = $this->ALPL_model->checkAps($applicationId,$apsNo);
		return $this->set_response(array("status"=>"success","message"=>"Success","result"=>$result));
	}
	function SearchStatus_get($applicationNo,$apsNo){
		//$params = json_decode(file_get_contents('php://input'),true);
		$result = $this->ALPL_model->searchStatus($applicationNo,$apsNo);
		return $this->set_response(array("status"=>"success","message"=>"Success","result"=>$result));
	}
	function PLDEMasterImport_get($tbl,$primary,$file,$folderId,$json,$extData="",$extention="csv",$separator="",$prefix=false){
			 
			 $path = $this->Core_model->getFolderPath($folderId);
			 $lastId = $this->ALPL_model->getLastId($tbl, $primary);
			 if($lastId == ""){
				 $lastId = 0;
				 }
			 $data = $this->Core_model->importCSV($path.$file.".".$extention,IMPORT_CSVJSON_ROOT.$json.'.json',json_encode($extData),$separator,$extention,$prefix);
			 if($data["status"] == true)
			 {
				 $lastId = $this->ALPL_model->purgeMasters($tbl," AND ".$primary." <= ".$lastId);
			 }
			 return $this->set_response(array('status'=>'post_success', 'result'=>$data));
	}


}

?>