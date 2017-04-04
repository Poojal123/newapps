<?php

class GOLDBOND_model extends CI_Model {

        public $title;
        public $content;
        public $date;

        public function __construct()
        {
                // Call the CI_Model constructor
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

        public function getBatches()
		{
		
		$sql = "select * from corebatchmaster where 1 ";
		$qparent = $this->db->query($sql);
	        return $qparent->result();
	}

        public function getUsers()
		{
		
		$sql = "select t2.fullName, t2.userId from alpluserprocess as t1, coreusers as t2, coreprocessmaster as t3 where t1.userId=t2.userId and t1.processId= t3.processId";
				$qparent = $this->db->query($sql);
				return $qparent->result();
		}
		
        public function getProcessUsers($processId)
		{
		
		$sql = "select t2.* from alpluserprocess as t1, coreusers as t2, coreprocessmaster as t3 where t1.userId=t2.userId and t1.processId= t3.processId and t3.processId=".$processId;
			$qparent = $this->db->query($sql);
	        return $qparent->result();
            
	    } 
       

}
?>