<?php
error_reporting( E_ALL );
ini_set( 'display_errors', 1 );

defined('BASEPATH') OR exit('No direct script access allowed');


// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . 'libraries/REST_Controller.php';

class PDCCTS_Pro extends REST_Controller
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
		$this->load->model('PDCCTSPro_model');		
        $this->load->helper('file');    
		$this->load->library('csvreader');		
	}
	
	
	function PurgeData_get($id=0)
	{
		$types = $this->PDCCTSPro_model->getPurgeDatas($id);
		//echo $types;
		return $this->set_response(array("status"=>"success","message"=>"List of all Purge Data ","result"=>$types));
		
	}
	

	function PDCImportCSV_get($file,$folderId,$json,$extData="",$extention="csv",$separator=""){
			  
			 $path = $this->Core_model->getFolderPath($folderId);
			// echo $path.$file.".".$extention;
 		     $data = $this->PDCCTSPro_model->PDCimportCSV($path.$file.".".$extention,IMPORT_CSVJSON_ROOT.$json.'.json',json_encode($extData),$separator,$extention);
			 return $this->set_response(array('status'=>'post_success', 'result'=>$data));
	}

	function ExportCSV_get($file="",$json="",$type=""){
			 
 		     $this->Core_model->exportCSV(IMPORT_CSV_ROOT.$file.'.csv',"select appno,apsNo,batchId from tmpalpl","export",",","\r\n",'"',".csv");
			 return $this->set_response(array('status'=>'post_success'));
	}
	
	
	function Upload_post(){
 
		 $filename = date("Ymdhis")."_".$_FILES['file']['name'];
		 $path = $this->Core_model->getFolderPath($_REQUEST['folder']);

		if(isset($_REQUEST["extPath"]))
		{
			$path.=$_REQUEST["extPath"];	
		}		 

		 $config['upload_path']   = $path; 
         $config['allowed_types'] = 'gif|jpg|png|csv|dat|pdf|txt'; 
         $config['max_size']      = 99000; 
		 $config['file_name']      = $filename; 

         $this->load->library('upload', $config);
		 if ( !$this->upload->do_upload('file')) {
			 return $this->set_response(array('status'=>'error', 'result'=>$this->upload->display_errors()));	
         }
			
         else { 
            $data = array('upload_data' => $this->upload->data()); 
			return $this->set_response(array('status'=>'success', 'result'=>$data));	
         } 
	}

	function Batch_post(){	
		
		$params = json_decode(file_get_contents('php://input'),true);

		$id = $this->Core_model->generateBatch($params['appId'],$params['batchId']);

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

}

?>