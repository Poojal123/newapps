<?php
error_reporting( E_ALL );
ini_set( 'display_errors', 1 );

defined('BASEPATH') OR exit('No direct script access allowed');


// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . 'libraries/REST_Controller.php';

class JLA extends REST_Controller
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
		$this->load->model('Core_model');		
        $this->load->helper('file');    
		$this->load->library('Csvreader');	
		$this->load->library('excel_reader');
		$this->load->model('JLA_model');
		$this->load->model('Sample_model');

			
				
	}


function JlaImportCSV_get($file,$folderId,$json,$extData="",$extention="csv",$separator="", $arrDuplicate=array(), $dbunique=false, $prefix=false ){
			 
			 $path = $this->Core_model->getFolderPath($folderId);
			 $data = $this->JLA_model->jlaimportCSV($path.$file.".".$extention,IMPORT_CSVJSON_ROOT.$json.'.json',json_encode($extData),$separator,$extention,$prefix,$arrDuplicate,$dbunique);
			 return $this->set_response(array('status'=>'post_success', 'result'=>$data));
	}
}
?>