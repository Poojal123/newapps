// JavaScript Document

// 1. FILE UPLOAD
// 2. BATCH CREATE
// 3. IMPORT CALL



bpoApps.controller("JLAuploadController",function($scope,$rootScope,Login,sessionService,$location,APPCONSTANTS,$routeParams,toastr,$http,ngTableParams,
$filter,$interval, Upload, CORE_CONFIG, WEB_API,JLA_IMPORT_JSON,JLACSVImport)
{
	
    var formdata = new FormData();

	$scope.jsonlist = JLA_IMPORT_JSON;

	$scope.colunique = {
		
		};
	$scope.coluniquedb = true;	

	$scope.headers = Array();
		
	$scope.serverfile = "";
	$scope.serverfileext = "";
	$scope.uploadedURL = "";
	$scope.proval = 0;
	$scope.currentstatus = "Processing";
	$scope.progressbarstatus = ""; //"progress-bar-danger";
	
	$scope.setLog = function(proval, currentstatus, css, newlog){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
		if(newlog!="") $scope.logs = new Date().toLocaleString()+" - "+newlog+"\n"+$scope.logs;	
	}
	
	var X = XLSX;
	$scope.logs = "";
	$scope.formatValidations = [];
	$scope.importconfig = "alplmasterDesignation.json"; //"ccpinCodeMasterUpload.json"; 
	$scope.jsonconfig = null;
	$scope.csvObject = null;
	
 	$scope.readConfig = function(){

		$scope.setLog(10,"Processing - Get meta info",""," Reading Meta Info from server"); // = function(proval, currentstatus, css, newlog)

		$http({
		  method: 'GET',
		  url: WEB_URL+"/storage/config/"+$scope.importconfig
		}).then(function successCallback(response) {
				$scope.jsonconfig = angular.fromJson(response);
				$scope.setLog(20,"Processing - meta info received",""," Meta Info received from server"); // = function(proval, currentstatus, css, newlog)
		  }, function errorCallback(response) {

		  });
		
			
	}
 
	$scope.CSVToArray = function(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
    // Delimiters.
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    // Quoted fields.
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    // Standard fields.
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData); }

	$scope.CSV2JSON = function(csv) {
		var array = $scope.CSVToArray(csv);
		var json =  JSON.stringify(array);  
		var str = json.replace(/},/g, "},\r\n");
		return str; 
	}

	$scope.to_csv = function (workbook) {
		var result = [];
		workbook.SheetNames.forEach(function(sheetName) {
			var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
			if(csv.length > 0){
				result.push("SHEET: " + sheetName);
				result.push("");
				result.push(csv);
			}
		});
		return result.join("\n");
	}
	
	$scope.to_json = function (workbook) {
	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		if(roa.length > 0){
			result[sheetName] = roa;
		}
	});
	return result; }
	
	$scope.fixdata = function (data) {
		var o = "", l = 0, w = 10240;
		for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
		o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
		return o;
	}

	$scope.normalizeJSON = function(jsonObj){
		var newArray = [];
		var jsonindex = 0;
		var newrow= [];
		angular.forEach(jsonObj, function(value, key) {
			angular.forEach(value, function(colvalue, key) {
				  if(jsonindex == 0){
					newrow.push(key);
				  }else
				  {
					newrow.push(colvalue);
				  }
			});

			newArray.push(newrow);			  
			newrow= Array();
			jsonindex++;
			
		});
		
		return newArray;
	}

	$scope.startNew = function(){
		$scope.formatValidations = [];
		$scope.jsonconfig = null;
		$scope.csvObject = null;
		$scope.headers = Array();

		$scope.proval = 0;
		$scope.currentstatus = "";
		$scope.progressbarstatus = ""; //"progress-bar-danger";


	}
	
	// STEPS FOR EXECUTION
	// 1. READ THE CONFIG FILE DEFAULTED TO DESIGNATION AS OF NOW, LATER IT WOULD BE ON CHANGE EVENT FOR DROP DOWN 	
	// BELOW WE READ THE META INFO FROM JSON FILE TO COMPARE LATER FOR FORMATTING AND VALIDATION
//	$scope.readConfig();
		
	// 2. NOW READ EVENT ON FILE SELECTION
   $scope.displayFileContents = function(contents, ext, filename, fileobj) {
   	$scope.serverfile = "";
	$scope.serverfileext = "";
	$scope.uploadedURL = "";
	$scope.proval = 0;
	$scope.currentstatus = "Processing";
	$scope.progressbarstatus = ""; //"progress-bar-danger";
 
		$scope.tableParams.reload();
		$scope.headers = Array();
		
	 	$scope.setLog(25,"Processing - analysing file "+filename,""," File selected and analysing - "+filename); // = function(proval, currentstatus, css, newlog)			
		var data = contents;
		$scope.formatValidations = [];
		if(ext == '.xlsx' || ext == '.xls' || ext == '.XLSX' || ext == '.XLS')
		{
			
			var arr = $scope.fixdata(data);
			wb = X.read(btoa(arr), {type: 'base64'});
			$scope.csvObject  = $scope.normalizeJSON($scope.to_json(wb).Sheet1);
//                        console.log("sharvari ===> "+$scope.csvObject);
				
		}else if (ext == ".csv" || ext == ".CSV"){
			
			$scope.results = contents;
			$scope.csvObject = angular.fromJson($scope.CSV2JSON(contents));
		}
		else
		{
		 	$scope.setLog(25,"Error - Invalid File","progress-bar-danger"," Error - Invalid File Type! You can import only CSV, XLS or XLSX file. Selected file is "+ext); 
			// = function(proval, currentstatus, css, newlog)			
		}
		
		if($scope.formatValidations.length == 0){
			// 3. NOW VALIDATE COLUMN LENGTH
			if($scope.validateColLen()){
				if($scope.validateHeaders()){

					// 4. UPLOAD FILE TO SERVER FOR PREVIEW - THIS IS UPLOADED TO HANDLE LARGE FILES
				 	$scope.setLog(60,"Processing - Uploading "+filename+" to server","progress-bar"," Uploading "+filename+" to server"); 

					$scope.formdata = {
							 "file":fileobj,
							 "folder":"ALPL_IMPORT_CSV"
						};
												
					$file = Upload.upload({
					  url: CORE_CONFIG.WEB_SERVICE+WEB_API.UPLOAD,
					  data: $scope.formdata,
					});
					
					$file.then(function (response) {
							if(response.data.status == "success")
							{
								$scope.setLog(70,"Processing - "+filename+" uploaded to server","progress-bar"," Upload completed on server for "+filename+" "); 
							
								var processedFileName = response.data.result.upload_data.file_name.split(".");
								$scope.serverfile = processedFileName[0];
								$scope.serverfileext = response.data.result.upload_data.file_ext.replace('.','');
								$scope.tableParams.reload();
								  
							}
							else
							{
								$scope.setLog(70,"Error - "+filename+" failed to upload","progress-bar-danger"," Error on "+filename+" - "+response.data.result); 								
							}
						}
					);
					
				}
			}
	//		$scope.tableParams.reload();		
	
		}
		
    };
	
	$scope.validateColLen = function(){
		var jsonCount = $scope.jsonconfig.data.Columns.length;
		var csvCount = $scope.csvObject[0].length;
                console.log("hbjhbvf ===>> "+$scope.csvObject[0]);
		if(jsonCount != csvCount){
				
			$scope.formatValidations.push({"title":"Number of Columns mismatch","details":"Expected count is "+jsonCount+" and found "+csvCount+" columns"});			
		 	$scope.setLog(25,"Error - Columns mismatch","progress-bar-danger"," Error - Number of Columns mismatch! Expected count is "+jsonCount+" and found "+csvCount+" columns"); 
			
			return false;
				
		}
		else {
		 	$scope.setLog(40," Validation succeeded on column length"," "," Validation succeeded on column length of selected file to import"); 

			return true;	
		}
	}
	
	$scope.validateHeaders = function(){
		var isHeaders = true;
		var index=0;
		angular.forEach($scope.jsonconfig.data.Columns, function(value, key) {
                    console.log("svv "+$scope.csvObject[0][index])
                    
			if(value.header != $scope.csvObject[0][index]){

			 	$scope.setLog(25,"Error - Invalid Header","progress-bar-danger"," Error - Invalid or missing header in CSV! Expected header "+value.header+" , found "+$scope.csvObject[0][index]); 

				isHeaders = false;
			}
 			index++;	
		});	
	 	
		if (isHeaders == true) 
		{
			$scope.setLog(50," Validation succeeded on column headers"," "," Validation succeeded on column headers of selected file to import"); 
		}
		return isHeaders;
	}
	
	
	$scope.tableParams = new ngTableParams({
			debugMode: true,
			page: 1,           
			count: 10,          
			sorting: {
			},
			filter: {
			}
		}, {
			
			getData: function ($defer, params) {
	            
				
				
				var receiveData = function(data, responseHeaders) {
				
				$scope.headers = Array();
				
				var uniqueindex=0;
				angular.forEach(data[0], function(value, key) {
				  $scope.headers.push(key);
                                  console.log("headers =>> "+$scope.headers);
                                  console.log("value =>> "+value);
				  $scope.colunique[uniqueindex] = "duplicate";
				  uniqueindex++;
				});
				  params.total(responseHeaders("count"));
				  
				  $defer.resolve(data);
				  $scope.status = "";
				};
				
				var filteredData = $scope.filter;				
				var pageNumber = params.$params.page;
				var pageSize = params.$params.count;
				
				 
				var sortby = Object.getOwnPropertyNames(params.sorting())[0];
				var sortdir = params.$params.sorting[sortby];				
				//alert(sortby+":"+sortdir);
				
				$scope.status = "Please wait, loading data may take a while...";

				if($scope.serverfile != ""){
					$scope.uploadedURL = CORE_CONFIG.WEB_SERVICE+WEB_API.IMPORTPREVIEW+"/"+pageNumber+"/"+pageSize+"/ALPL_IMPORT_CSV/"+$scope.serverfile+"/"+$scope.serverfileext;
 

					if($scope.uploadedURL!=""){
						$http.get($scope.uploadedURL)
							.success(function(data, status, headers, config){
									receiveData(data, headers);
							}
						);				
						
					}	
				}

				
					

			}
		});
		
		
	$scope.processImport = function(){


			var extData = {};
			$scope.csv = JLACSVImport.get({
				
				"file":$scope.serverfile,
				"folderId":"ALPL_IMPORT_CSV",
				"json":$scope.importconfig.replace(".json",""),
				"extData":"{}",
				"extention":$scope.serverfileext,
				"separator":",",
				"arrDuplicate":JSON.stringify($scope.colunique),
				"dbunique":$scope.coluniquedb
				
				});

								
			$scope.csv.$promise.then(function(result){	
			 	$scope.setLog(100,"File imported successfully","","File imported successfully."); // = function(proval, currentstatus, css, newlog)			
			 	$scope.setLog(100,"File imported successfully","","Total Rows :"+result.result.totalRows); // = function(proval, currentstatus, css, newlog)			
			 	$scope.setLog(100,"File imported successfully","","Successfully imported rows : "+result.result.successfulRows); // = function(proval, currentstatus, css, newlog)			
			 	$scope.setLog(100,"File imported successfully","","Ignored rows : "+result.result.ignoredRows); // = function(proval, currentstatus, css, newlog)			

				toastr.success(' CSV Imported successfully', 'Error')
			});
			
	}
		
	
	
});
