<?php

class CASA_model extends CI_Model
{
        public function __construct()
        {
                parent::__construct();
        }

        public function getDocumentTypes($id=0)
        {
				$sql = "select * from casadoctypemaster";
				$sqlwhere = " WHERE isDel=0 ";
				$params = $_REQUEST;

				if($id!=0)
				{
					$sqlwhere.=" AND documentId = ".$id;
				}

				$sql.=$sqlwhere." ORDER BY documentName ASC";
				$qparent = $this->db->query($sql);
		        return $qparent->result();
        }
	public function folderscan($job)
        {
		// GET ALL FILES FROM SCANDIR INCLUDING . AND ..
//		echo $job;
		$arrFiles = scandir($job, 1);
		$arrSortedFiles = array();
		for($i=0;$i<count($arrFiles);$i++)
		{
			if(!is_dir($job."//".$arrFiles[$i])) $arrSortedFiles[] = $arrFiles[$i];
		}
		return ($arrSortedFiles);
	}

	public function getIndexingTypes($id=0)
        {
				$sql = "select * from casaimageindextype";
				$sqlwhere = " WHERE 1=1 ";
				$params = $_REQUEST;

				if($id!=0)
				{
					$sqlwhere.=" AND indexingId = ".$id;
				}

				$sql.=$sqlwhere." ORDER BY indexingId ASC";
				$qparent = $this->db->query($sql);
		        return $qparent->result();
        }
	public function getNriTypes($id=0)
        {
				$sql = "select * from casanritype";
				$sqlwhere = " WHERE 1=1 ";
				$params = $_REQUEST;

				if($id!=0)
				{
					$sqlwhere.=" AND nriId = ".$id;
				}

				$sql.=$sqlwhere." ORDER BY nriId ASC";
				$qparent = $this->db->query($sql);
		        return $qparent->result();
        }
	    //CREATE FOLDER OF SAVED IMAGES
		public function mergeimages($image,$job,$filename)
		{

			$extData = urldecode($image);
			$arrFiles = explode(",",$extData);
//			print_r($arrFiles);
			$multiTIFF = new Imagick();
			$multiTIFF->clear();
			for($i=0;$i<count($arrFiles);$i++)
			{
 				$auxIMG = new Imagick();
				$auxIMG->readImage(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR.$arrFiles[$i]);
				$multiTIFF->addImage($auxIMG);
				$auxIMG->clear();
			}

			$multiTIFF->writeImages(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$filename.".TIFF", true);
			return $multiTIFF;
		}

    /****** renameBatch format functions ******/
    public function renameBatchFormatRegular($job,$csv){
        try {
              $inputFileName = IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$csv.".xls";
              $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
              $objReader = PHPExcel_IOFactory::createReader($inputFileType);
              $objPHPExcel = $objReader->load($inputFileName);
        } catch(Exception $e) {
              die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
        }
        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();
        /* skip first row */
        for ($row = 2; $row <= $highestRow; $row++){
            $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            $appName = $rowData[0][15];
            $proCode = $rowData[0][16];
            $appNum = $rowData[0][17];
            $AccNum = $rowData[0][30];
            if (is_numeric($proCode) && is_numeric($appNum) && is_numeric($AccNum)){
                  // account num validations
                  $AccNum = str_pad($AccNum,12,'0',STR_PAD_LEFT);
                  // app num validations
                  $appNum = str_pad($appNum,8,'0',STR_PAD_LEFT);
                  $appNameInitials = $this->getNameInitials($appName);

                  $docTypes = $this->getDocType($proCode.'-'.$appNum.'_XX_', $job);
                  foreach ($docTypes as $docType) {
                      $oldFileName = $proCode.'-'.$appNum.'_XX_'.$docType.'.tiff';
                      $newFileName = $AccNum.'_'.$appNameInitials.'_'.$docType.'.tiff';
                      if(file_exists(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName)){
                          copy(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName,IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR."renamedoutput".SEPARATOR.$newFileName);

                          //edit excel file and done the column
                          $objPHPExcel->setActiveSheetIndex(0);
                          $colNumber = (int) PHPExcel_Cell::columnIndexFromString($highestColumn);
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, 1, 'Index Renaming');
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, $row, 'DONE');
                          $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $inputFileType);
                          $objWriter->save($inputFileName);
                      }
                  }
            }else{
                  return "Valid fields not found.";
            }
        }
        return count($highestRow);
    }
    public function renameBatchFormatNRIFFA($job,$csv){
        try {
              $inputFileName = IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$csv.".xls";
              $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
              $objReader = PHPExcel_IOFactory::createReader($inputFileType);
              $objPHPExcel = $objReader->load($inputFileName);
        } catch(Exception $e) {
              die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
        }
        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();
        /* skip first row */
        for ($row = 2; $row <= $highestRow; $row++){

            $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            $appName = $rowData[0][15];
            $proCode = $rowData[0][16];
            $appNum = $rowData[0][17];
            $AccNum = $rowData[0][30];

           if ( is_numeric ($proCode) && is_numeric ($appNum) && is_numeric ($AccNum)){
                  // account num validations
                  $AccNum = str_pad($AccNum,12,'0',STR_PAD_LEFT);
                  // app num validations
                  $appNum = str_pad($appNum,9,'0',STR_PAD_LEFT);
                  $docTypes = $this->getDocType($proCode.'-'.$appNum.'_XX_', $job);
                  foreach ($docTypes as $docType) {
                      $oldFileName = $proCode.'-'.$appNum.'_XX_'.$docType.'.tiff';
                      $newFileName = $AccNum.'_'.$appNameInitials.'_'.$docType.'.tiff';
                      if(file_exists(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName)){
                          copy(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName,IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR."renamedoutput".SEPARATOR.$newFileName);

                          //edit excel file and done the column
                          $objPHPExcel->setActiveSheetIndex(0);
                          $colNumber = (int) PHPExcel_Cell::columnIndexFromString($highestColumn);
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, 1, 'Index Renaming');
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, $row, 'DONE');
                          $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $inputFileType);
                          $objWriter->save($inputFileName);
                      }
                  }
            }else{
                  return "Valid fields not found.";
            }
        }
        return count($highestRow);
    }
    public function renameBatchFormatNRINFF($job,$csv){
        try {
              $inputFileName = IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$csv.".xls";
              $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
              $objReader = PHPExcel_IOFactory::createReader($inputFileType);
              $objPHPExcel = $objReader->load($inputFileName);
        } catch(Exception $e) {
              die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
        }
        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();
        /* skip first row */
        for ($row = 2; $row <= $highestRow; $row++){

            $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            $appName = $rowData[0][15];
            $appNum = $rowData[0][17];
            $AccNum = $rowData[0][30];

           if ( is_numeric ($appNum) && is_numeric ($AccNum)){
                  // account num validations
                  $AccNum = str_pad($AccNum,12,'0',STR_PAD_LEFT);
                  // app num validations
                  $appNum = str_pad($appNum,5,'0',STR_PAD_LEFT);
                  $appNameInitials = $this->getNameInitials($appName);

                  $docTypes = $this->getDocType($proCode.'-'.$appNum.'_XX_', $job);
                  foreach ($docTypes as $docType) {
                      $oldFileName = $appNum.'_XX_'.$docType.'.tiff';
                      $newFileName = $AccNum.'_'.$appNameInitials.'_'.$docType.'.tiff';
                      if(file_exists(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName)){
                          copy(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName,IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR."renamedoutput".SEPARATOR.$newFileName);

                          //edit excel file and done the column
                          $objPHPExcel->setActiveSheetIndex(0);
                          $colNumber = (int) PHPExcel_Cell::columnIndexFromString($highestColumn);
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, 1, 'Index Renaming');
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, $row, 'DONE');
                          $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $inputFileType);
                          $objWriter->save($inputFileName);
                      }
                  }
            }else{
                  return "Valid fields not found.";
            }
        }
        return count($highestRow);
    }
    public function renameBatchFormatNRINFF1($job,$csv){
        try {
              $inputFileName = IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$csv.".xls";
              $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
              $objReader = PHPExcel_IOFactory::createReader($inputFileType);
              $objPHPExcel = $objReader->load($inputFileName);
        } catch(Exception $e) {
              die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
        }
        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();
        /* skip first row */
        for ($row = 2; $row <= $highestRow; $row++){

            $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            $appName = $rowData[0][15];
            $proCode = $rowData[0][16];
            $appNum = $rowData[0][17];
            $AccNum = $rowData[0][30];

           if ( is_numeric ($proCode) && is_numeric ($proCode)){
                  // account num validations
                  $AccNum = str_pad($AccNum,12,'0',STR_PAD_LEFT);
                  // app num validations
                  $appNum = str_pad($appNum,6,'0',STR_PAD_LEFT);
                  $appNameInitials = $this->getNameInitials($appName);

                  $docTypes = $this->getDocType($proCode.'-'.$appNum.'_XX_', $job);
                  foreach ($docTypes as $docType) {
                      $oldFileName = $proCode.'-'.$appNum.'_XX_'.$docType.'.tiff';
                      $newFileName = $AccNum.'_'.$appNameInitials.'_'.$docType.'.tiff';
                      if(file_exists(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName)){
                          copy(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName,IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR."renamedoutput".SEPARATOR.$newFileName);

                          //edit excel file and done the column
                          $objPHPExcel->setActiveSheetIndex(0);
                          $colNumber = (int) PHPExcel_Cell::columnIndexFromString($highestColumn);
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, 1, 'Index Renaming');
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, $row, 'DONE');
                          $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $inputFileType);
                          $objWriter->save($inputFileName);
                      }
                  }
            }else{
                  return "Valid fields not found.";
            }
        }
        return count($highestRow);
    }
    public function renameBatchFormatReKyc($job,$csv){
        try {
              $inputFileName = IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$csv.".xls";
              $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
              $objReader = PHPExcel_IOFactory::createReader($inputFileType);
              $objPHPExcel = $objReader->load($inputFileName);
        } catch(Exception $e) {
              die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
        }
        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();
        /* skip first row */
        for ($row = 2; $row <= $highestRow; $row++){

            $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            $appName = $rowData[0][3];
            $AccNum = $rowData[0][2];

           if ( is_numeric ($AccNum)){
                  // account num validations
                  $AccNum = str_pad($AccNum,12,'0',STR_PAD_LEFT);
                  $appNameInitials = $this->getNameInitials($appName);

                  $docTypes = $this->getDocType($proCode.'-'.$appNum.'_XX_', $job);
                  foreach ($docTypes as $docType) {
                    $oldFileName = $AccNum.'_'.$docType.'.tiff';
                    $newFileName = $AccNum.'_'.$appNameInitials.'_'.$docType.'.tiff';
                      if(file_exists(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName)){
                          copy(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName,IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR."renamedoutput".SEPARATOR.$newFileName);

                          //edit excel file and done the column
                          $objPHPExcel->setActiveSheetIndex(0);
                          $colNumber = (int) PHPExcel_Cell::columnIndexFromString($highestColumn);
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, 1, 'Index Renaming');
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, $row, 'DONE');
                          $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $inputFileType);
                          $objWriter->save($inputFileName);
                      }
                  }
            }else{
                  return "Valid fields not found.";
            }
        }
        return count($highestRow);
    }
    public function renameBatchFormatSalaryWeeding($job,$csv){
        try {
              $inputFileName = IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$csv.".xls";
              $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
              $objReader = PHPExcel_IOFactory::createReader($inputFileType);
              $objPHPExcel = $objReader->load($inputFileName);
        } catch(Exception $e) {
              die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
        }
        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();
        /* skip first row */
        for ($row = 2; $row <= $highestRow; $row++){

            $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            $appName = $rowData[0][3];
            $AccNum = $rowData[0][2];

           if ( is_numeric ($AccNum)){
                  // account num validations
                  $AccNum = str_pad($AccNum,12,'0',STR_PAD_LEFT);
                  $appNameInitials = $this->getNameInitials($appName);


                  $docTypes = $this->getDocType($proCode.'-'.$appNum.'_XX_', $job);
                  foreach ($docTypes as $docType) {
                      $oldFileName = $AccNum.'_XX_'.$docType.'.tiff';
                      $newFileName = $AccNum.'_'.$appNameInitials.'_'.$docType.'.tiff';
                      if(file_exists(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName)){
                          copy(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName,IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR."renamedoutput".SEPARATOR.$newFileName);

                          //edit excel file and done the column
                          $objPHPExcel->setActiveSheetIndex(0);
                          $colNumber = (int) PHPExcel_Cell::columnIndexFromString($highestColumn);
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, 1, 'Index Renaming');
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, $row, 'DONE');
                          $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $inputFileType);
                          $objWriter->save($inputFileName);
                      }
                  }
            }else{
                  return "Valid fields not found.";
            }
        }
        return count($highestRow);
    }
    public function renameBatchFormatPrivilageForms($job,$csv){
        try {
              $inputFileName = IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$csv.".xls";
              $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
              $objReader = PHPExcel_IOFactory::createReader($inputFileType);
              $objPHPExcel = $objReader->load($inputFileName);
        } catch(Exception $e) {
              die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
        }
        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();
        /* skip first row */
        for ($row = 2; $row <= $highestRow; $row++){

            $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            $appName = $rowData[0][15];
            $proCode = $rowData[0][16];
            $appNum = $rowData[0][17];
            $AccNum = $rowData[0][30];

            if ( is_numeric ($proCode) && is_numeric ($appNum) && is_numeric ($AccNum)){
                  // account num validations
                  $AccNum = str_pad($AccNum,12,'0',STR_PAD_LEFT);
                  // app num validations
                  $appNum = str_pad($appNum,8,'0',STR_PAD_LEFT);
                  $appNameInitials = $this->getNameInitials($appName);

                  $docTypes = $this->getDocType($proCode.'-'.$appNum.'_XX_', $job);
                  foreach ($docTypes as $docType) {
                      $oldFileName = $proCode.'-'.$appNum.'_XX_'.$docType.'.tiff';
                      $newFileName = $AccNum.'_'.$appNameInitials.'_'.$docType.'.tiff';
                      if(file_exists(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName)){
                          copy(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName,IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR."renamedoutput".SEPARATOR.$newFileName);

                          //edit excel file and done the column
                          $objPHPExcel->setActiveSheetIndex(0);
                          $colNumber = (int) PHPExcel_Cell::columnIndexFromString($highestColumn);
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, 1, 'Index Renaming');
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, $row, 'DONE');
                          $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $inputFileType);
                          $objWriter->save($inputFileName);
                      }
                  }
            }else{
                  return "Valid fields not found.";
            }
        }
        return count($highestRow);
    }
    public function renameBatchFormatWealthForms($job,$csv){
        try {
              $inputFileName = IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$csv.".xls";
              $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
              $objReader = PHPExcel_IOFactory::createReader($inputFileType);
              $objPHPExcel = $objReader->load($inputFileName);
        } catch(Exception $e) {
              die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
        }
        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();
        /* skip first row */
        for ($row = 2; $row <= $highestRow; $row++){

            $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            $appName = $rowData[0][15];
            $proCode = $rowData[0][16];
            $appNum = $rowData[0][17];
            $AccNum = $rowData[0][30];

            if ( is_numeric ($proCode) && is_numeric ($appNum) && is_numeric ($AccNum)){
                  // account num validations
                  $AccNum = str_pad($AccNum,12,'0',STR_PAD_LEFT);
                  // app num validations
                  $appNum = str_pad($appNum,8,'0',STR_PAD_LEFT);
                  $appNameInitials = $this->getNameInitials($appName);

                  $docTypes = $this->getDocType($proCode.'-'.$appNum.'_XX_', $job);
                  foreach ($docTypes as $docType) {
                      $oldFileName = $proCode.'-'.$appNum.'_XX_'.$docType.'.tiff';
                      $newFileName = $AccNum.'_'.$appNameInitials.'_'.$docType.'.tiff';
                      if(file_exists(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName)){
                          copy(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName,IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR."renamedoutput".SEPARATOR.$newFileName);

                          //edit excel file and done the column
                          $objPHPExcel->setActiveSheetIndex(0);
                          $colNumber = (int) PHPExcel_Cell::columnIndexFromString($highestColumn);
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, 1, 'Index Renaming');
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, $row, 'DONE');
                          $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $inputFileType);
                          $objWriter->save($inputFileName);
                      }
                  }
            }else{
                  return "Valid fields not found.";
            }
        }
        return count($highestRow);
    }
    public function renameBatchFormatCurrentAccount($job,$csv){
        try {
              $inputFileName = IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$csv.".xls";
              $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
              $objReader = PHPExcel_IOFactory::createReader($inputFileType);
              $objPHPExcel = $objReader->load($inputFileName);
        } catch(Exception $e) {
              die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
        }
        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();
        /* skip first row */
        for ($row = 2; $row <= $highestRow; $row++){

            $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);

            $barCode = $rowData[0][3];
            $clientName = $rowData[0][4];
            $AccNum = $rowData[0][5];

            if ( is_numeric ($barCode) && is_numeric ($AccNum)){
                  // account num validations
                  $AccNum = str_pad($AccNum,12,'0',STR_PAD_LEFT);
                  // barcode validations
                  $barCode = str_pad($barCode,11,'0',STR_PAD_LEFT);
                  $appNameInitials = $this->getNameInitials($clientName);

                  $docTypes = $this->getDocType($proCode.'-'.$appNum.'_XX_', $job);
                  foreach ($docTypes as $docType) {
                      $oldFileName = $barCode.'_XX_'.$docType.'.tiff';
                      $newFileName = $appNameInitials.'_'.$docType.'.tiff';
                      if(file_exists(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName)){
                          copy(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName,IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR."renamedoutput".SEPARATOR.$newFileName);

                          //edit excel file and done the column
                          $objPHPExcel->setActiveSheetIndex(0);
                          $colNumber = (int) PHPExcel_Cell::columnIndexFromString($highestColumn);
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, 1, 'Index Renaming');
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, $row, 'DONE');
                          $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $inputFileType);
                          $objWriter->save($inputFileName);
                      }
                  }
            }else{
                  return "Valid fields not found.";
            }
        }
        return count($highestRow);
    }
    public function renameBatchFormatECSMandate($job,$csv){
        try {
              $inputFileName = IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$csv.".xls";
              $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
              $objReader = PHPExcel_IOFactory::createReader($inputFileType);
              $objPHPExcel = $objReader->load($inputFileName);
        } catch(Exception $e) {
              die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
        }
        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();
        /* skip first row */
        for ($row = 2; $row <= $highestRow; $row++){

            $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            $AccNum = $rowData[0][1];
            $AccHolderName = $rowData[0][2];

            if (is_numeric ($AccNum)){
                  // account num validations
                  $AccNum = str_pad($AccNum,12,'0',STR_PAD_LEFT);
                  $appNameInitials = $this->getNameInitials($AccHolderName);

                  $docTypes = $this->getDocType($proCode.'-'.$appNum.'_XX_', $job);
                  foreach ($docTypes as $docType) {
                      $oldFileName = $AccNum.'_XX_'.$docType.'.tiff';
                      $newFileName = $AccNum.'_'.$appNameInitials.'_'.$docType.'.tiff';
                      if(file_exists(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName)){
                          copy(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR.$oldFileName,IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output".SEPARATOR."renamedoutput".SEPARATOR.$newFileName);

                          //edit excel file and done the column
                          $objPHPExcel->setActiveSheetIndex(0);
                          $colNumber = (int) PHPExcel_Cell::columnIndexFromString($highestColumn);
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, 1, 'Index Renaming');
                          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($colNumber, $row, 'DONE');
                          $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $inputFileType);
                          $objWriter->save($inputFileName);
                      }
                  }
            }else{
                  return "Valid fields not found.";
            }
        }
        return count($highestRow);
    }
    // find name initials
    public function getNameInitials($name){
        $words = explode(" ", $name);
        $nameInitials ="";
        $i = 0;
        $len = count($words);
        if ($len == 1){
            $nameInitials = substr($words[0], 0, 2);
        }
        else{
            foreach ($words as $w) {
                if ($i == 0) {
                    $nameInitials .= $w[0];
                } else if ($i == $len - 1) {
                    $nameInitials .= $w[0];
                }
                $i++;
            }
        }
        return $nameInitials;
    }
    public function getDocType($string,$job){
        $outputFolderPath = IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR."output/";
        $jpgfiles = scandir($outputFolderPath);
        $images = glob($outputFolderPath.$string."*.tiff");
        $docTypes = array();
        foreach ($images as $img) {
            $file = basename($img,".tiff");
            array_push($docTypes, substr($file, strpos($file, "_XX_") + 4));
        }
        return $docTypes;
    }
    /****** renameBatch format functions ends ******/

		public function renameBatch($job,$csv){
        $formatID = 1;
        switch ($formatID) {
            case 1:
                return $this->renameBatchFormatRegular($job,$csv);
                break;
            case 2:
                return $this->renameBatchFormatNRIFFA($job,$csv);
                break;
            case 3:
                return $this->renameBatchFormatNRINFF($job,$csv);
                break;
            case 4:
                return $this->renameBatchFormatNRINFF1($job,$csv);
                break;
            case 5:
                return $this->renameBatchFormatReKyc($job,$csv);
                break;
            case 6:
                return $this->renameBatchFormatSalaryWeeding($job,$csv);
                break;
            case 7:
                return $this->renameBatchFormatPrivilageForms($job,$csv);
                break;
            case 8:
                return $this->renameBatchFormatWealthForms($job,$csv);
                break;
            case 9:
                return $this->renameBatchFormatCurrentAccount($job,$csv);
                break;
            case 10:
                return $this->renameBatchFormatECSMandate($job,$csv);
                break;
            default:
                echo "Invalid Selection";
        }
		}

		function optimizeImage($job){
			// CONVERT ALL IMAGES TO TIFF
			$arrFiles = $this->folderscan(IMAGE_INDEXING_JOB_ROOT."".$job);
			$counter=0;
print_r($arrFiles);

			for($i=0;$i<count($arrFiles);$i++)
			{
				$arrFileName = explode(".",$arrFiles[$i]);
 				if($arrFileName[1] != "tiff" && $arrFileName[1] != "tif" && $arrFileName[1] != "TIFF" && $arrFileName[1] != "TIF" ){

echo "IN";
echo IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR.$arrFileName[0].".TIFF";
					$auxIMG = new Imagick();
					$auxIMG->readImage(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR.$arrFiles[$i]);
					$auxIMG->writeImages(IMAGE_INDEXING_JOB_ROOT.$job.SEPARATOR.$arrFileName[0].".TIFF", true);
					$counter++;
				}
			}

			return $counter;
		}
}





?>
