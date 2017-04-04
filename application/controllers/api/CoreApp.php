<?php
error_reporting( E_ALL );
ini_set( 'display_errors', 1 );

defined('BASEPATH') OR exit('No direct script access allowed');


// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . 'libraries/REST_Controller.php';

class CoreApp extends REST_Controller
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

		$this->load->library('session');				
		$this->load->database();
        $this->load->helper('url'); 		
		$this->load->model('Sample_model');
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
	
	public function index_post(){
		
		
	}


	public function FilePreview_get($pagenumber,$pagesize,$folder,$file,$extension){

		$start = ($pagenumber * $pagesize) - $pagesize;
 		if($start == 0) $start = 1; // REMOVE HEADER BEING DUPLICATED IN ROWS
		$arrresult = array();
		$path = $this->Core_model->getFolderPath($folder);
		$fullpath = $path.$file.".".$extension;

	
		if($extension == "xls" || $extension == "xlsx" ){
			   $worksheet = $this->excel_reader->read($fullpath);
			   $excelArray = $this->excel_reader->sheets[0];
 			   $data = array_values($excelArray['cells']);
			   foreach ($data as &$value) {
					$value = array_values($value);
				}
			   $headers = $data[0];
				if (count($data) > 0) {
					 for($i=$start;$i<$start+$pagesize;$i++)
					 {
						if(isset($data[$i])){
							$row = $data[$i];
							$arrLines[] = $row;
							$arrRow = array();
							for($j=0;$j<count($headers);$j++)
							{
								$arrRow[$headers[$j]] = trim($row[$j]);
							}
							array_push($arrresult, $arrRow);					
						}
					  }
				}	
		}
		else{
			$file = new SplFileObject($fullpath);
			$arrLines = array();
			
			$file->seek($file->getSize());
			$linesTotal = $file->key();
	 
			
			header("count:".$linesTotal);
			
			$file->seek(0);
			$headers = explode(",",$file->current());
			 for($i=0;$i<count($headers);$i++)
			 {
				 $headers[$i] = trim($headers[$i]);
			 }
	
			if (!$file->eof()) {
				 for($i=$start;$i<$start+$pagesize;$i++)
				 {
					$file->seek($i);
					if(!$file->eof()){
						$row = explode(",",$file->current()); // $contents would hold the data from line x	 
						$arrLines[] = $row;
						
						$arrRow = array();
						for($j=0;$j<count($headers);$j++)
						{
							$arrRow[$headers[$j]] = trim($row[$j]);
						}
						array_push($arrresult, $arrRow);					
						
					}
				  }
				 
			}	
		}
		
		return $this->set_response($arrresult);					
	}

	public function loginemployee_get(){
		if($this->session->has_userdata('SESSION_USER')){
			return $this->set_response(array('status'=>'success', 'message'=>'LoggedIn User', 'result'=>$this->session->SESSION_USER));					
		}else{
			return $this->set_response(array('status'=>'error', 'message'=>'No Session', 'result'=>''));						
		}
	}

	public function loginemployee_post()
	{
		$params = json_decode(file_get_contents('php://input'),true);

		$qparent = $this->Core_model->loginEmployees($params);
		if($qparent->num_rows() > 0){
			$result = $qparent->result();
			$this->session->SESSION_USER = $result[0];
			return $this->set_response(array('status'=>'success', 'message'=>'Success', 'result'=>$qparent->result()));					
		}else{
			return $this->set_response(array('status'=>'error', 'message'=>'Invalid User', 'result'=>""));	
		}	
	}
	
	public function loginemployee_delete(){
		$this->session->sess_destroy();	
		return $this->set_response(array('status'=>'success', 'message'=>'Session Removed', 'result'=>""));	
	}

	public function Sessoin_get(){
			
	}

	public function index_delete($id){	

		$sql = "delete from tblAdvantage where id=".$id;
		$this->db->query($sql);
		return $this->set_response(array('status'=>'post_success', 'result'=>$this->db->affected_rows()));
	}

	function getSections_get($id=0)
	{
		$types = $this->Core_model->getSections($id);
		return $this->set_response(array("status"=>"success","message"=>"List of All Form Sections","result"=>$types));
		
	}

	function Fields_get($id=0,$sectionId=0)
	{
		$types = $this->Core_model->getFields($id,$sectionId);
		 
		for($i=0;$i<count($types);$i++)
		{
			if($types[$i]->validationIds != ""){
				$arrVal = $this->Core_model->getValidationsString("corefieldvalidations","validationName"," and validationId in (".$types[$i]->validationIds.")");
				$types[$i]->validations  = explode(",",$arrVal[0]->val);
			}else{
				$types[$i]->validations  = array();
			}
		}
		return $this->set_response(array("status"=>"success","message"=>"List of All Fields","result"=>$types));
		
	}

	function Fields_post(){	
		
		$params = json_decode(file_get_contents('php://input'),true);
		$keyparams = array_keys($params["formData"]);
			// print_r($params["formData"]);

		$this->Core_model->setFields($keyparams,$params["formData"],$params["whr"]);

		return $this->set_response(array('status'=>'post_success', 'result'=>""));
	}

	function PrePopulated_get($fieldIds, $recordId){
		$result = $this->Core_model->getPrePopulated($fieldIds, $recordId);
		return $this->set_response(array('status'=>'post_success', 'result'=>$result));
	}
	function ProcessFields_get($fieldIds, $processId){
		$result = $this->Core_model->getFieldsProcess($fieldIds, $processId);
		return $this->set_response(array('status'=>'post_success', 'result'=>$result));
	}
	
	function ProcessFields_post(){
		$params = json_decode(file_get_contents('php://input'),true);
		$result = $this->Core_model->setFieldsProcess($params);
		return $this->set_response(array('status'=>'post_success', 'result'=>$result));
	}
	

	function ImportCSV_get($file,$folderId,$json,$extData="",$extention="csv",$separator="",$prefix=false){
			 
			 $path = $this->Core_model->getFolderPath($folderId);
			 $data = $this->Core_model->importCSV($path.$file.".".$extention,IMPORT_CSVJSON_ROOT.$json.'.json',json_encode($extData),$separator,$extention,$prefix);
			 return $this->set_response(array('status'=>'post_success', 'result'=>$data));
	}
	
	function ImportCSVUni_get($file,$folderId,$json,$extData="",$extention="csv",$separator="", $arrDuplicate=array(), $dbunique=false, $prefix=false ){
			 
			 $path = $this->Core_model->getFolderPath($folderId);
			 $data = $this->Core_model->importCSVUni($path.$file.".".$extention,IMPORT_CSVJSON_ROOT.$json.'.json',json_encode($extData),$separator,$extention,$prefix,$arrDuplicate,$dbunique);
			 return $this->set_response(array('status'=>'post_success', 'result'=>$data));
	}
	
			function ExcelImport_get($file,$folderId,$json,$extData="",$extention="xls",$separator=""){
//			  echo "json==".$json;
			 $path = $this->Core_model->getFolderPath($folderId);
			 $data = $this->Core_model->importExcel($path.$file.".".$extention,IMPORT_CSVJSON_ROOT.$json.'.json',json_encode($extData)			             ,$separator,$extention);
			 return $this->set_response(array('status'=>'post_success', 'result'=>$data));
	}
		function ExportCSV_get($file="",$json="",$type=""){
			 
 		     $this->Core_model->exportCSV(IMPORT_CSV_ROOT.$file.'.csv',"select appno,apsNo,batchId from tmpalpl","export",",","\r\n",'"',".csv");
			 return $this->set_response(array('status'=>'post_success'));
	}
	
	function Menus_get($parentId, $roleId, $system){
		$menus = $this->Core_model->getMenu($parentId, $roleId,$system);
		 return $this->set_response(array('status'=>'success', 'result'=>$menus));	
	}
	
	function Upload_post(){
 
		 $filename = date("Ymdhis")."_".$_FILES['file']['name'];
		
		 $path = $this->Core_model->getFolderPath($_REQUEST['folder']);
 
		if(isset($_REQUEST["extPath"]))
		{
			$path.=$_REQUEST["extPath"];	
			
		}		 
			 $path = str_replace("\\",SEPARATOR,$path);			
			 $path = str_replace("\\",SEPARATOR,$path);			
			 $path = str_replace("\\\\",SEPARATOR,$path);			
			 $path = str_replace("/",SEPARATOR,$path);
 
 
		 $config['upload_path']   = $path; 
         $config['allowed_types'] = 'gif|jpg|png|csv|dat|pdf|txt|xls'; 
         $config['max_size']      = 990000; 
		 $config['file_name']      = $filename; 
		//print_r($config);
		//echo"<br>--->><<<<".$filename;
		//echo "----";
        $this->load->library('upload', $config);
		 if ( !$this->upload->do_upload('file')) {
			 return $this->set_response(array('status'=>'error', 'result'=>$this->upload->display_errors()));	
         }
			
         else { 
			$data = $this->upload->data();
		 	$url = $this->Core_model->getFolderPath($_REQUEST['folder'], true);
            $data = array('upload_data' => $this->upload->data(), 'fileurl' => $url."".$data["file_name"]); 
			return $this->set_response(array('status'=>'success', 'result'=>$data));	
         } 
	}

	function Batch_post(){	
		
		$params = json_decode(file_get_contents('php://input'),true);
		//echo "<<<<<<<".$params['uploadedBy'];

		$id = $this->Core_model->generateBatch($params['appId'],$params['batchId'],$params['uploadedBy']);

		return $this->set_response(array('status'=>'post_success', 'result'=>$id));
	}


	function getDDL_get($tbl,$dbval,$lblval,$whr="",$sql=""){
		
		$result = $this->Core_model->getDDL($tbl,$dbval,$lblval,$whr,$sql);
		return $this->set_response(array('status'=>'ddl_success', 'result'=>$result));		
	}
	
	
	function Table_get($tbl, $whr=""){
		$result = $this->Core_model->getTable($tbl,$whr);
		return $this->set_response(array('status'=>'success', 'result'=>$result));		
	}

	function Contracts_get(){
		$result = $this->Core_model->getContracts();
		return $this->set_response(array('status'=>'success', 'result'=>$result));		
	}
	
	function Contracts_post(){
		$params = json_decode(file_get_contents('php://input'),true);		

		$result = $this->Core_model->setContracts($params["contractId"], $params["contractTitle"], $params["companyId"], $params["appId"]);
		return $this->set_response(array('status'=>'success', 'result'=>$result));		
	}

	function Contracts_delete($id){
		$result = $this->Core_model->deleteContract($id);
		return $this->set_response(array('status'=>'success', 'result'=>$result));		
	}
	
	function Table_post(){
		$params = json_decode(file_get_contents('php://input'),true);		

		if(!isset($params["primary"])){
				$params["primary"]=array();
			}
		$result = $this->Core_model->setTable($params["table"], $params["val"], $params["primary"]);
		return $this->set_response(array('status'=>'success', 'result'=>$result));		
	}
	
	function Table_delete($tbl, $delkey, $delval){
		$result = $this->Core_model->deleteTable($tbl, $delkey, $delval);
		return $this->set_response(array('status'=>'success', 'result'=>$result));		
	}

	function Users_get(){
		$result = $this->Core_model->getUsers();
		return $this->set_response(array('status'=>'success', 'result'=>$result));		
	}

	function Users_post(){

		$params = json_decode(file_get_contents('php://input'),true);		
		
		if(!isset($params["primary"])){
				$params["primary"]=array();
		}
		$fileId=0;
		
		if($params["profilePic"]!="")
		{
			$fileId = $this->Core_model->registerFile($params["profilePic"]);
		}
		else if (isset($params["fileId"]))		
		{
				$fileId = $params["fileId"];
		}
		$params["imageId"] = $fileId;
		
		
		
		$result = $this->Core_model->setUser($params);

		return $this->set_response(array('status'=>'success', 'result'=>$result));		
	}
	
	function Users_delete(){
		$result = $this->Core_model->deleteUser($_REQUEST["id"]);
		return $this->set_response(array('status'=>'success', 'result'=>$result));		
	}	
	
	function RoleModules_post(){
		$params = json_decode(file_get_contents('php://input'),true);		

		$result = $this->Core_model->updateRoleModules($params["roleId"], $params["modules"], $params["parent"]);
		return $this->set_response(array('status'=>'success', 'result'=>$result));		
		
	}
	
	function ContractUsers_post(){
		$params = json_decode(file_get_contents('php://input'),true);		

		$result = $this->Core_model->updateContractUsers($params["contractId"], $params["users"]);
		return $this->set_response(array('status'=>'success', 'result'=>$result));		
		
	}
	
	function ContractUsers_get($contractId){
		$result = $this->Core_model->getContractUsers($contractId);
		return $this->set_response(array('status'=>'success', 'result'=>$result));		
		
	}
	
	function ContractUsers_delete($contractId,$users){
		$result = $this->Core_model->deleteContractUsers($contractId,$users);
		return $this->set_response(array('status'=>'success', 'result'=>""));		
		
	}
		function Forgot_get($emailId){
		
		$result = $this->Core_model->getEmailId($emailId);
		return $this->set_response(array('status'=>'success', 'result'=>$result));		
		
	}
	
	function NewPass_post(){
		$params = json_decode(file_get_contents('php://input'),true);	
		$result = $this->Core_model->saveNewPass($params['newPassword'],$params['tokenValue']);
		return $this->set_response(array('status'=>'success', 'result'=>$result));		
		
	}

}

?>