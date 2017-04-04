<?php
error_reporting( E_ALL );
ini_set( 'display_errors', 1 );

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/PHPExcel/IOFactory.php';
// This can be removed if you use __autoload() in config.php OR use Modular Extensions
//require APPPATH . 'libraries/REST_Controller.php';

class CASA extends REST_Controller
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
                $this->load->helper('url'); 		
		$this->load->database();
		$this->load->model('CASA_model');
                 $this->load->helper('file');    
		$this->load->library('csvreader');		

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

	function getDocumentTypes_get($id=0)
	{
		$types = $this->CASA_model->getDocumentTypes($id);
		return $this->set_response(array("status"=>"success","message"=>"List of All Document Types","result"=>$types));
		
	}

	function folderscan_get($job="")
	{
	//	echo dirname(__FILE__);
		$types = $this->CASA_model->folderscan(IMAGE_INDEXING_JOB_ROOT."".$job);
		return $this->set_response(array("status"=>"success","message"=>"List of All files","result"=>$types,"rootURL"=>URL_IMAGE_INDEXING_JOB_ROOT."".$job));
		
	}
	function mergeimages_get($image="",$job="", $filename="")
	{
		$types = $this->CASA_model->mergeimages($image,$job,$filename);
		return $this->set_response(array("status"=>"success","message"=>"List of All files","result"=>$types));
		
	}
	function getIndexingTypes_get($id=0)
	{
		$types = $this->CASA_model->getIndexingTypes($id);
		return $this->set_response(array("status"=>"success","message"=>"List of All Indexing Types","result"=>$types));
		
	}
	function getNriTypes_get($id=0)
	{
		$types = $this->CASA_model->getNriTypes($id);
		return $this->set_response(array("status"=>"success","message"=>"List of All Indexing Types","result"=>$types));
		
	}
		
	function renameBatch_get($job, $csv, $indexingtype, $nritype){
		$cnt = $this->CASA_model->renameBatch($job,$csv, $indexingtype, $nritype);
		return $this->set_response(array("status"=>"success","message"=>"Renamed Files from CSV","result"=>$cnt));
	}
	
	function optimize_get($job){
		$files = $this->CASA_model->optimizeImage($job);	
		return $this->set_response(array("status"=>"success","message"=>"File optimized","result"=>$files));		
	}
}

?>