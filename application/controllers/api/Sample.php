<?php
error_reporting( E_ALL );
ini_set( 'display_errors', 1 );

defined('BASEPATH') OR exit('No direct script access allowed');


// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . 'libraries/REST_Controller.php';

class Sample extends REST_Controller
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
		
		$params = json_decode(file_get_contents('php://input'),true);
		//$params = $_REQUEST;
		
		$str = implode($params);
		
		$sql = "INSERT INTO tblAdvantage (treatmentId, details, imgPath)
        VALUES (".$params['treatmentId'].", '".$params['details']."', '".$params['imgPath']."')";
		
		if(isset($params['id'])){
			$sql = "UPDATE tblAdvantage set treatmentId=".$params['treatmentId'].", details='".$params['details']."',imgPath='".$params['imgPath']."' where id=".$params['id'];
		}		

		
		$this->db->query($sql);

		return $this->set_response(array('status'=>'post_success', 'result'=>$this->db->affected_rows()));
	}

	public function index_delete($id){	

		$sql = "delete from tblAdvantage where id=".$id;
		$this->db->query($sql);
		return $this->set_response(array('status'=>'post_success', 'result'=>$this->db->affected_rows()));
	}


		
}

?>