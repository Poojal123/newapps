  // JavaScript Document


bpoApps.controller("importerController",function($scope,$rootScope,Login,sessionService,$location,APPCONSTANTS,$routeParams,toastr,$http,ngTableParams,
$filter,$interval, Upload, CORE_CONFIG, WEB_API,CSVImportUni,IMPORT_JSON)
{
	
    var formdata = new FormData();

	$scope.jsonlist = IMPORT_JSON;

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
			$scope.csv = CSVImportUni.get({
				
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


bpoApps.controller("coreLoginController",function($scope,$rootScope,Login,sessionService,$location,APPCONSTANTS,$routeParams,toastr,$window)
{
	if($routeParams.logout != null)
	{
		sessionService.removeLoginSession(function(){
			sessionService.remove("SESS_USER");			
			toastr.success('Logged Out!', 'Success')
			$window.location = "#/";
		});
	}
	else{
		sessionService.getLoginSession(function(response){
			$location.path ("Core/Company");
		},function(){
		});
	
	}
	
	
	$scope.login = {
			emailId :"",
			passWord: ""
		};
	
	
	$scope.doLogin = function(){
		$scope.loginObj = new Login();
		$scope.loginObj.emailId = $scope.login.emailId;
		$scope.loginObj.passWord = $scope.login.passWord;
		
		$scope.loginObj.$save(function(response){
			//console.log(JSON.stringify(response));
			if(response.status == "success")
			{
				 $rootScope.$emit('loadMenus', null);				
				
				//console.log(response.result[0]);
				sessionService.set(APPCONSTANTS.SESS_USER,response.result[0]);
				$location.search('logout', null)
				$location.path ("Core/Company");

			}
			else{
			toastr.error('Invalid User', 'Error');	
			}
			
		});
	}

	$scope.forgotPass = function(){
		$location.path ("Core/forgot");
	}
	
});


bpoApps.controller("coreForgotController",function($scope,$rootScope,Forgot,$location,ngProgressFactory,APPCONSTANTS,$routeParams,toastr,$window)
{
		$scope.forgot = {
			emailId :""
		};
	 $scope.progressbar = ngProgressFactory.createInstance();
           
	
	$scope.forgotPass = function(){
		   $scope.progressbar.start();
		//console.log(JSON.stringify($scope.forgot.emailId));
		$scope.forgotObj = new Forgot();
		
		
		$scope.forgotObj = Forgot.get({"emailId":$scope.forgot.emailId});
		$scope.forgotObj.$promise.then(function(result){
		//	console.log("-------->>"+JSON.stringify(result.result));
			if(result.result == true)
			{
				toastr.success('Reset password instruction has been sent', 'Success')
	    		$location.path ("login");
	
				$scope.progressbar.complete();
			}
			else if(result.result == false)
			{
				toastr.error('Email Id does not exists', 'Error')
				$scope.progressbar.complete();
			}
		})
	
	}
});

bpoApps.controller("coreNewPassController",function($scope,$rootScope,NewPass,$location,APPCONSTANTS,$routeParams,toastr,$window)
{ //alert("coreForgotController")

	var url = window.location.href;
	var parts = url.split("?");
	var firstUrlTerm = parts[0];
	$scope.tokenValue = parts[1];
	
	$scope.newPass = {
			newPassword :"",
			confrimPassword :"",
			tokenValue :""
		};
	
	
	$scope.newPass = function(){
		
		console.log("token"+JSON.stringify($scope.tokenValue));
		$scope.newPass.tokenValue=$scope.tokenValue;
		
		if($scope.newPass.newPassword==$scope.newPass.confrimPassword)
		{
		$scope.newPassObj = new NewPass();
		$scope.newPassObj.newPassword = $scope.newPass.newPassword;
		$scope.newPassObj.tokenValue = $scope.newPass.tokenValue;
		console.log("IIIIIIII"+JSON.stringify($scope.newPass.tokenValue));
		
		$scope.newPassObj.$save(function(result){
			console.log(JSON.stringify(result));
			if(result.result == true)
			{
				toastr.success('Password Updated', 'Success');
				$location.$$search={};
				
				$location.path ("login");
			}
			else
			{
				toastr.error('Token Expired', 'Error');
				$location.$$search={};
				
				$location.path ("login");
			}
		})
	
		}//if
		else
		{
			toastr.error('Password Does Not Match', 'Error')
		}
	}
	
});





bpoApps.controller("playgroundController",function($scope,Sections,Fields,ProcessField,toastr,coreTable,$routeParams,$parse,sessionService,CCPrepopulated)
{	
//	************************* LAYER CODE STARTS

$scope.getAllCats = {};
$scope.getAllBanks = {};

$scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);

        var uploadUrl = "save_form.php";
        var text = $scope.name;
        fileUpload.uploadFileToUrl(file, uploadUrl, text);
   };

$scope.getAllProcesses = [];

$scope.showme = function(){
//alert("TEST");	
}

$scope.businessValidations = function(value,id,fieldName){ 
		console.log(JSON.stringify(value));
		
}

 $scope.callFunction = function (name,obj){
	 
	 console.log(JSON.stringify(obj));
        //alert(name+":"+angular.isFunction($scope[name]));
		if(angular.isFunction($scope[name])){
		
           $scope[name]();
		}
    }


$scope.showCity = function(){
// $scope.formdata["tmpPlayground__vCompany"] = $scope.getAllProcessesNew[2];
}

$scope.getAllCat = {};
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		
					console.log("********************************");
		console.log(JSON.stringify(data));
		console.log(JSON.stringify(datalist));
		console.log(JSON.stringify(accessor));
		console.log(JSON.stringify(scopevar));							

		
		var tmp = $parse(datalist) ;
		tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});

	}


	$scope.appId=0;
	if($routeParams.appId!=null){
	$scope.appId = $routeParams.appId;
	}
	$scope.search = "";
	$scope.objSections = {};
	$scope.selectedProcess = {};
	$scope.getAllProcesses = {};
	$scope.fieldIds = [];
	$scope.strSection = [];
	
	$scope.selAllEnabled = false;
	$scope.selAllPrePopulated = false;
	$scope.selAllValidated = false;

	$scope.selectAllEnable = function(){
		angular.forEach($scope.selFields, function(value, key) {
			value.isEnabled = $scope.selAllEnabled;
		});
	}
	$scope.selectAllPrePopulated = function(){
		angular.forEach($scope.selFields, function(value, key) {
			value.isPrePopulated = $scope.selAllPrePopulated;
		});
	}
	$scope.selectAllValidated = function(){
		angular.forEach($scope.selFields, function(value, key) {
			value.isValidated = $scope.selAllValidated;
		});
	}
	
	$scope.getSections = function(){
		$scope.objSections = new coreTable();
		$scope.objSections = coreTable.get({"tbl":"coresectionmaster","whr":" and appId ="+$scope.appId});

		$scope.objSections.$promise.then(function(result){
			$scope.objSections = result.result;
			angular.forEach($scope.objSections, function(value, key) {
				$scope.strSection.push(value.sectionId);
			});
			if($scope.strSection.length > 0){
			$scope.getFields();
			}
		});
	}
	
	$scope.getFields = function(){
		$scope.selFields = Fields.get({"id":0,"sectionId":$scope.strSection.toString()});
		$scope.selFields.$promise.then(function(result){
			$scope.selFields = result.result;
				angular.forEach($scope.selFields, function(value, key) {
					value.isEnabled = false;
					value.isPrePopulated = false;
					value.isValidated = false;
					$scope.fieldIds.push(value.fieldId);
				});
			
		});
			
	}
	
	$scope.getMapping = function(){
		$scope.processField = ProcessField.get({"fieldIds":$scope.fieldIds.toString(),"processId":$scope.selectedProcess.selectedItem.processId});
		$scope.processField.$promise.then(function(result){
			$scope.processField = result.result;

			angular.forEach($scope.selFields, function(value, key) {
				value.isEnabled = false;
				value.isPrePopulated = false;
				value.isValidated = false;
				angular.forEach($scope.processField, function(subvalue, key) {
					 if(subvalue.fieldId == value.fieldId){
							if(subvalue.enable  == "1") value.isEnabled = true;
							if(subvalue.prepopulated == "1") value.isPrePopulated = true;
							if(subvalue.validation == "1") value.isValidated = true;
					 }
				});
				
				

			});

//			$scope.getPrepopulated();
		});
		
	}
	
	$scope.getPrepopulated = function(){
		$scope.processField = CCPrepopulated.get({"fieldIds":$scope.fieldIds.toString(),"recordId":3});
		$scope.processField.$promise.then(function(result){
			alert(JSON.stringify(result));
		});
	}
	
	$scope.submitMapping = function(){
		

		
			$scope.pField = new ProcessField();
			$scope.pField.Fields = $scope.selFields;
			$scope.pField.FieldIds = $scope.fieldIds.toString();
			$scope.pField.ProcessId = $scope.selectedProcess.selectedItem.processId;
			
			$scope.pField.$save(function (response) {
				toastr.success('Field settings saved!', 'Done')
			});

	}
	
	$scope.getSections();

	$scope.change = function(){
	//alert("TEST");	
	}

//	************************* LAYER CODE ENDS

	$scope.forms = {};
	$scope.formdata = {};
	$scope.formdata.tmpPlayground__vCategory = {};
	$scope.formdata.tmpPlayground__vCompany = {};

	$scope.sections = Sections.get({"id":27});
	$scope.sections.$promise.then(function(result){
		$scope.sections = result.result;
		angular.forEach(result.result, function(value, key) {
			var fields = Array();
			$scope.sections[key].fields = Array();
			$scope.sections[key].sortedFields = Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
			$scope.getSectionRenderer(value,key);		
			

		});
	});
	
	$scope.formdatadisplay = function()
	{
		$scope.Field = new Fields();
			$scope.Field.formData = $scope.formdata;
			$scope.Field.whr = " ";
			$scope.Field.$save(function (response) {
				});
	}
	$scope.getSectionRenderer = function(section,sectionIndex){
		 $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
		 $scope.fields.$promise.then(function(result){	 	
				$scope.sections[sectionIndex].fields = result.result;
		 		angular.forEach(result.result, function(value, key) {	
				
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
				
				
				
		 }); 			
	}

	$scope.subForm = function(currentSection){

 	if(!$scope.formdata.tmpPlayground__vCategory.selectedItem){
            $scope.forms.myform.category123.$setValidity("unique", false);
	}
 
		 if ($scope.forms.myform.$valid) {
						
			//	if($scope.businessValidations()){
					$scope.Field = new Fields();
					$scope.Field.formData = $scope.formdata;  
					angular.forEach($scope.Field.formData, function(value, key) {
						if(value.selectedItem){
								$scope.Field.formData[key] = value.selectedItem.dbval;
						}
					});
		
					$scope.Field.whr = ""; //" and playgroundId=8";
					$scope.Field.$save(function (response) {
							console.log(JSON.stringify(response));
							console.log(JSON.stringify($scope.formdata));
							angular.forEach(currentSection.fields, function(value, key) {
								console.log(JSON.stringify(value));
								 sessionService.remove(value.fieldId);
							});	
						});
					 
		/*		}else
				{
					alert("ERROR");
					// show toastr $scope.validationMessage
				}*/
						
					}
		else{
			//alert("ERROR:");	
		}
 

	}

	$scope.selectedRole = {};
	$scope.getAllRoles = {};
	$scope.selectedUser = {};
	
	$scope.getAllUsers = {};
	$scope.getAllRoles = {};

});


bpoApps.controller("ccSampleController",function($scope,DocTypes)
{	

	$scope.ddlDocumentTypes = DocTypes.get();


});

bpoApps.controller("menubarController",function($scope,$rootScope,DocTypes,Menus,$timeout)
{	
//console.log("MAYURRRRRRRRRRRRRRRRRRRRRR>>"+($rootScope.SESS_USER.system));

  $rootScope.$on('loadMenus', function(event, args) {
	  
			$scope.getMenu();
	  
	  });
	
	$scope.getMenu = function(){
		$timeout( function(){ 
		
			$scope.menulist = Menus.get({"parentId":"0", "roleId":$rootScope.SESS_USER.roleId, "system":$rootScope.SESS_USER.system});
			$scope.menulist.$promise.then(function(result){
//				console.log(JSON.stringify(result));
			});
	
		
		}, 500);	
	}


  $rootScope.$emit('loadMenus', null);

});

bpoApps.controller("coreCompanyController",function($scope,coreTable,ngTableParams,$filter,$timeout,toastr)
{	

	$scope.showNew = false;
	
	$scope.Companies = Array();

	$scope.Company = new coreTable();
	
	$scope.getCompanies = function(){
			$scope.Companies = coreTable.get({"tbl":"corecompany","whr":""});
			
			$scope.Companies.$promise.then(function(result){
				$scope.Companies = result.result;
				$scope.tableParams.reload();	
			});
	}
		
		
	$scope.tableParams = new ngTableParams(
		{
			debugMode: true,
			page: 1, 
			count: 10,
			sorting: {
					companyId: 'desc',
					companyName: 'desc'
			},
			filter: {
				companyId: '',
				companyName: ''
			}
		}, 
		{
				total: $scope.Companies.length,
				getData: function ($defer, params) {
					
				   var filteredData = params.filter() ? $filter('filter')($scope.Companies, params.filter()) : $scope.Companies;
				   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
				   params.total(orderedData.length);
				   
				   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
		});

	$scope.newCompany = function(){
		$scope.Company.val = Object();
		$scope.Company.primary = Object();
		$scope.showNew = true;
	}
	
	$scope.submitCompany = function(){
		$scope.Company.table = "corecompany";
		$scope.Company.$save(function(response){
				$scope.getCompanies();
				$scope.showNew = false;
				toastr.success('Company saved successfully!', 'Done')
		});
	}
	
	$scope.getCompany = function(company){
		$scope.Company.val = {  "companyName":company.companyName};
		$scope.Company.primary = {"companyId":company.companyId};
		$scope.showNew = true;
	}
	
	$scope.deleteCompany = function(company){
		coreTable.delete({ "tbl": "corecompany", "delkey":"companyId", "delval":company.companyId}, function() {
				toastr.success('Company deleted successfully!', 'Done')			
		$scope.getCompanies();
	  });
		
	}
	
	$timeout(function(){
		$scope.getCompanies();	
	});
	
	
});

bpoApps.controller("coreRolesController",function($scope,coreTable,ngTableParams,$filter,$timeout,toastr)
{	

	$scope.showNew = false;
	
	$scope.Roles = Array();

	$scope.Role = new coreTable();
	
	$scope.getRoles = function(){
			$scope.Roles = coreTable.get({"tbl":"corerole","whr":""});
			
			$scope.Roles.$promise.then(function(result){
				$scope.Roles = result.result;
				$scope.tableParams.reload();	
			});
	}
		
		
	$scope.tableParams = new ngTableParams(
		{
			debugMode: true,
			page: 1, 
			count: 10,
			sorting: {
					roleId: 'desc',
					roleName: 'desc'
			},
			filter: {
				roleId: '',
				roleName: ''
			}
		}, 
		{
				total: $scope.Roles.length,
				getData: function ($defer, params) {
					
				   var filteredData = params.filter() ? $filter('filter')($scope.Roles, params.filter()) : $scope.Roles;
				   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
				   params.total(orderedData.length);
				   
				   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
		});

	$scope.newRole = function(){
		$scope.Role.val = Object();
		$scope.Role.primary = Object();
		$scope.showNew = true;
	}
	
	$scope.submitRole = function(){

		$scope.Role.table = "corerole";
		$scope.Role.$save(function(response){
				$scope.getRoles();
				$scope.showNew = false;
				toastr.success('Role saved successfully!', 'Done')
		});
	}
	
	$scope.getRole = function(role){

		$scope.Role.val = {  "roleName":role.roleName };
		$scope.Role.primary = {"roleId":role.roleId};
		
		console.log(JSON.stringify($scope.Role));		
		$scope.showNew = true;
	}
	
	$scope.deleteRole = function(role){
		coreTable.delete({ "tbl": "corerole", "delkey":"roleId", "delval":role.roleId}, function() {
				toastr.success('Role deleted successfully!', 'Done')			
		$scope.getRoles();
	  });
		
	}
	
	$timeout(function(){
		$scope.getRoles();	
	});
	
	
});

bpoApps.controller("coreUsersController",function($scope,Users,ngTableParams,$filter,$timeout,toastr,Upload,CORE_CONFIG,WEB_API,$filter,$parse)
{	
	
	$scope.getAllRoles = {};
	$scope.getAllLocations = {};


	$scope.baseArray = Array();
	$scope.WEB_URL = WEB_URL;

	$scope.selectedRole = {};
	$scope.selectedLocation = {};

	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		
		var tmp = $parse(datalist) ;
		tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});

	}
		
	$scope.showNew = false;
	$scope.Users = Array();
	$scope.User = new Users();

	$scope.file = Upload;	
	$scope.formdata = {
		file: "",
		fullName: "",
		emailId: "",
		passWord: "",
		roleId: "",
		gender:"Male"
	};

	$scope.cancel = function(){
		$scope.showNew = false;	
		$scope.formdata = {
			file: "",
			fullName: "",
			emailId: "",
			passWord: "",
			roleId: ""
		};		
		$scope.file = Upload;			
		$scope.Users = Array();

	}

	$scope.getArray = function(){
		return $scope.arrRoles;
	}
	
	$scope.getUsers = function(){
			$scope.Users= Users.get();
			
			$scope.Users.$promise.then(function(result){
				$scope.Users = result.result;
				$scope.tableParams.reload();	
			});
	}
				
	$scope.tableParams = new ngTableParams(
		{
			debugMode: true,
			page: 1, 
			count: 10,
			sorting: {
					userId: 'desc',
					fullName: 'desc'
			},
			filter: {
				userId: '',
				fullName: ''
			}
		}, 
		{
				total: $scope.Users.length,
				getData: function ($defer, params) {
					
				   var filteredData = params.filter() ? $filter('filter')($scope.Users, params.filter()) : $scope.Users;
				   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
				   params.total(orderedData.length);
				   
				   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
		});

	$scope.newUser = function(){
		$scope.User = new Users();
		$scope.showNew = true;
		$scope.formdata.userId = "0";		
	}
	
	$scope.subForm = function(file){


//		$scope.selectedRole = {"selectedItem":$scope.arrRoles[1]};
//		console.log("OO:"+$scope.arrRoles[0].roleId+":"+JSON.stringify($scope.selectedRole));
				
				$scope.formdata = {
					"file": file,
					"fullName": $scope.formdata.fullName,
					"emailId": $scope.formdata.emailId,
					"passWord": $scope.formdata.passWord,
					"profilePic":"",
					"gender":$scope.formdata.gender,
					"dateOfBirth":$scope.formdata.dateOfBirth,
					"userId":$scope.formdata.userId,
					"folder": "USER_PROFILE",
					"fileId": $scope.formdata.fileId,
					"roleId": $scope.selectedRole.selectedItem.roleId,
					"locationId": $scope.selectedLocation.selectedItem.locationId
				};
				
				
				
				if(file){
					$scope.file.upload = Upload.upload({
					  url: CORE_CONFIG.WEB_SERVICE+WEB_API.UPLOAD,				  
					  data: $scope.formdata,
					});
					
					console.log("----------------------->"+CORE_CONFIG.WEB_SERVICE+WEB_API.UPLOAD);
					
					$scope.file.upload.then(function (response) {
					//console.log("----------------------->profile pic"+JSON.stringify(response));
					
					if(response.data.status == "success"){
						$scope.logs += "CSV Uploaded successfully.";
						$scope.User.profilePic = response.data.result.upload_data.file_name;
						$scope.postUser();
							

					}else{
						console.log("ERROR");	
							

					}

					$scope.file = Upload;	
				
				}, function (response) {
					
				  if (response.status > 0){
					//$scope.errorMsg = response.status + ': ' + response.data;
				  	//$timeout($scope.progressbar.complete(), 1000);	

				  }
				}, function (evt) {
				
				  	//$timeout($scope.progressbar.complete(), 1000);	
                    //file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				
				});
				}
				else{
					$scope.User.profilePic = "";
					$scope.postUser();				
				}
	}
	
	
	$scope.postUser = function(){
		$scope.User.userId = $scope.formdata.userId;
		$scope.User.fullName = $scope.formdata.fullName;
		$scope.User.emailId = $scope.formdata.emailId;
		$scope.User.passWord = $scope.formdata.passWord;
		$scope.User.gender = $scope.formdata.gender;
		$scope.User.dateOfBirth = $scope.formdata.dateOfBirth;
		$scope.User.fileId = $scope.formdata.fileId;
		$scope.User.roleId = $scope.selectedRole.selectedItem.roleId;
		$scope.User.locationId = $scope.selectedLocation.selectedItem.locationId;		
		console.log("Finale:"+JSON.stringify($scope.User));
		
		$scope.User.$save(function(response){
					$scope.getUsers();
					$scope.showNew = false;
					toastr.success('User saved successfully! Please re-login for new role effect.', 'Done')
					
					$scope.User = new Users();
				
					$scope.file = Upload;	
					$scope.formdata = {
						file: "",
						fullName: "",
						emailId: "",
						passWord: "",
						roleId: ""
					};
					//window.location.reload();
		});
	}
	
	
	$scope.getUser = function(user){
		
		$scope.formdata = user;
		$scope.formdata.userId = user.userId;
		$scope.selectedRole.selectedItem = $scope.getAllRoles[1];
		$scope.showNew = true;
		
	}
	
	$scope.deleteUser = function(user){
		
		Users.delete({"id": user.userId}, function() {
				toastr.success('User deleted successfully!', 'Done')			
				$scope.getUsers();
	  });
		
	}
	
	$timeout(function(){
		$scope.getUsers();	
	});
	
	
});


bpoApps.controller("coreAppsController",function($scope,coreTable,ngTableParams,$filter,$timeout,toastr)
{	

	$scope.showNew = false;
	
	$scope.Apps = Array();

	$scope.App = new coreTable();
	
	$scope.getApps= function(){
			$scope.Apps = coreTable.get({"tbl":"coreapps","whr":""});
			
			$scope.Apps.$promise.then(function(result){
				$scope.Apps = result.result;
				$scope.tableParams.reload();	
			});
	}
		
		
	$scope.tableParams = new ngTableParams(
		{
			debugMode: true,
			page: 1, 
			count: 10,
			sorting: {
					appId: 'desc',
					appname: 'desc'
			},
			filter: {
				appId: '',
				appName: ''
			}
		}, 
		{
				total: $scope.Apps.length,
				getData: function ($defer, params) {
					
				   var filteredData = params.filter() ? $filter('filter')($scope.Apps, params.filter()) : $scope.Apps;
				   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
				   params.total(orderedData.length);
				   
				   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
		});

	$scope.newApp = function(){
		$scope.App.val = Object();
		$scope.App.primary = Object();
		$scope.showNew = true;
	}
	
	$scope.submitApp = function(){
		$scope.App.table = "coreapps";
		console.log(JSON.stringify($scope.App));
		$scope.App.$save(function(response){
				$scope.getApps();
				$scope.showNew = false;
				toastr.success('Application saved successfully!', 'Done')
		});
	}
	
	$scope.getApp= function(app){
		$scope.App.val = {  "appname":app.appname};
		$scope.App.primary = {"appId":app.appId};
		$scope.showNew = true;
	}
	
	$scope.deleteApps = function(app){
		coreTable.delete({ "tbl": "coreapps", "delkey":"appId", "delval":app.appId}, function() {
				toastr.success('Application deleted successfully!', 'Done')			
		$scope.getApps();
	  });
		
	}
	
	$timeout(function(){
		$scope.getApps();	
	});
	
	
});



bpoApps.controller("coreLocationsController",function($scope,coreTable,ngTableParams,$filter,$timeout,toastr,$parse)
{	
	$scope.getAllRegions = {};

	$scope.selectedRegion = Object();

	$scope.showNew = false;
	
	$scope.Locations = Array();

	$scope.Location = new coreTable();
	$scope.Location.val = {  "locationName":"", "regionId":""};
	
	$scope.getLocations = function(){
			$scope.Locations = coreTable.get({"tbl":"corelocations","whr":""});
			
			$scope.Locations.$promise.then(function(result){
				$scope.Locations = result.result;
				$scope.tableParams.reload();	
			});
	}

	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		
		var tmp = $parse(datalist) ;
		tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.Location.val[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});

	}
		
		
	$scope.tableParams = new ngTableParams(
		{
			debugMode: true,
			page: 1, 
			count: 10,
			sorting: {
					locationId: 'desc',
					locationName: 'desc'
			},
			filter: {
				locationId: '',
				locationName: ''
			}
		}, 
		{
				total: $scope.Locations.length,
				getData: function ($defer, params) {
					
				   var filteredData = params.filter() ? $filter('filter')($scope.Locations, params.filter()) : $scope.Locations;
				   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
				   params.total(orderedData.length);
				   
				   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
		});

	$scope.newLocation = function(){
		$scope.Location.val = {  "locationName":"", "regionId":""};
		$scope.Location.primary = Object();
		$scope.showNew = true;
	}
	
	$scope.submitLocation= function(){
		$scope.Location.table = "corelocations";
		$scope.Location.val = {  "locationName":$scope.Location.val.locationName, "regionId":$scope.selectedRegion.selectedItem.regionId};
		$scope.Location.$save(function(response){
				$scope.getLocations();
				$scope.showNew = false;
				toastr.success('Locations saved successfully!', 'Done')
		});
	}
	
	$scope.getLocation = function(location){
		$scope.Location.val = {  "locationName":location.locationName, "regionId":location.regionId};
		$scope.Location.primary = {"locationId":location.locationId};
		$scope.Location.selectedRegion = location.regionId;
		$scope.showNew = true;
	}
	
	$scope.deleteLocation = function(location){
		coreTable.delete({ "tbl": "corelocations", "delkey":"locationId", "delval":location.locationId}, function() {
				toastr.success('Location deleted successfully!', 'Done')			
		$scope.getLocations();
	  });
		
	}
	
	$timeout(function(){
		$scope.getLocations();	
	});
	
	
});



bpoApps.controller("coreContractController",function($scope,coreContracts,ngTableParams,$filter,$timeout,toastr,$parse)
{	

	$scope.showNew = false;
	
	$scope.selectedApplication = {};
	$scope.selectedCompany = {};
	
	$scope.getAllApplications = {};
	$scope.getAllCompanies = {};
	
	$scope.Contracts = Array();

	$scope.Contract = new coreContracts();
	
	$scope.cancel = function(){
	$scope.showNew = false;	
	$scope.Contracts = Array();
	$scope.getAllApplications = {};
	$scope.getAllCompanies = {};


	}

	
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		
		var tmp = $parse(datalist) ;
		tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.Contract[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});

	}
		
	
	$scope.getContracts = function(){
			$scope.Contracts = coreContracts.get();
			
			$scope.Contracts.$promise.then(function(result){
				$scope.Contracts = result.result;
				$scope.tableParams.reload();	
			});
	}
		
		
	$scope.tableParams = new ngTableParams(
		{
			debugMode: true,
			page: 1, 
			count: 10,
			sorting: {
					companyId: 'desc',
					companyName: 'desc'
			},
			filter: {
				companyId: '',
				companyName: ''
			}
		}, 
		{
				total: $scope.Contracts.length,
				getData: function ($defer, params) {
					
				   var filteredData = params.filter() ? $filter('filter')($scope.Contracts, params.filter()) : $scope.Contracts;
				   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
				   params.total(orderedData.length);
				   
				   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
		});

	$scope.newContract = function(){
		$scope.Contract.contractId = "0";
		$scope.showNew = true;
	}
	
	$scope.submitContract = function(){

		$scope.Contract.companyId = $scope.selectedCompany.selectedItem.companyId;
		$scope.Contract.appId = $scope.selectedApplication.selectedItem.appId;
		
		$scope.Contract.$save(function(response){
				$scope.getContracts();
				$scope.showNew = false;
				toastr.success('Contract saved successfully!', 'Done')
		});
	}
	
	$scope.getContract = function(contract){
		$scope.Contract.contractId = contract.contractId;
		$scope.Contract.contractTitle = contract.contractTitle;
		$scope.Contract.companyId = contract.companyId;
		$scope.Contract.appId = contract.appId;
		$scope.showNew = true;
	}
	
	$scope.deleteContract = function(contract){
		coreContracts.delete({ "id":contract.contractId}, function() {
		$scope.getContracts();
				toastr.success('Contract deleted successfully!', 'Done')			

	  });
		
	}
	
	$timeout(function(){
		$scope.getContracts();	
	});
	
	
});

bpoApps.controller("coreContractUsersController",function($scope,ngTableParams,$filter,$timeout,toastr,Users,ContractUsers,$routeParams)
{

	$scope.contractId = $routeParams.contractId;
	$scope.contractName = $routeParams.contractName;
		
		$scope.WEB_URL = WEB_URL;	
		$scope.Users = Array();
		$scope.User = new Users();

		$scope.checkAll=false;
		
		$scope.getUsers = function(){
			$scope.Users = ContractUsers.get({"contractId":$scope.contractId});
			
			$scope.Users.$promise.then(function(result){
				$scope.Users = result.result;
				for(var i=0;i<$scope.Users.length;i++) $scope.Users[i].isSelected = false;
				$scope.tableParams.reload();	
				
				
			});
		}
					
		$scope.tableParams = new ngTableParams(
			{
				debugMode: true,
				page: 1, 
				count: 10,
				sorting: {
						userId: 'desc',
						fullName: 'desc'
				},
				filter: {
					userId: '',
					fullName: ''
				}
			}, 
			{
					total: $scope.Users.length,
					getData: function ($defer, params) {
						
					   var filteredData = params.filter() ? $filter('filter')($scope.Users, params.filter()) : $scope.Users;
					   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
					   params.total(orderedData.length);
					   
					   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
					}
			});

	
		$timeout(function(){
			$scope.getUsers();	
		});
		

		$scope.selectAll = function() {
		$scope.checkAll=!$scope.checkAll;
		for(var i=0;i<$scope.Users.length;i++) $scope.Users[i].isSelected = $scope.checkAll;
	  };
	  
	  	$scope.allocateUsers = function(isAllocate){
			
			$scope.selectedUsers= Array();
			angular.forEach($scope.Users, function(value, key) {

					if(value.isSelected == true) $scope.selectedUsers.push(value.coreuserId);	
			});
		
		console.log(JSON.stringify($scope.selectedUsers));
			
			$scope.contractUsers = new ContractUsers();
			$scope.contractUsers.contractId = $scope.contractId;
			$scope.contractUsers.users = $scope.selectedUsers.toString();
			
			if(isAllocate){
				$scope.contractUsers.$save(function(response){
					toastr.success('Employees Allocated!', 'Done')		
					$scope.getUsers();

				});		
			}else{
				
				ContractUsers.delete({ "contractId":  $scope.contractId, "users":$scope.selectedUsers.toString()}, function() {
						toastr.success('Employees removed successfully!', 'Done')			
						$scope.getUsers();

			  });
				
			}

		}
		
		
});


bpoApps.controller("coreRoleModulesController",function($scope,toastr,coreTable,$filter,$routeParams,RoleModules)
{
	$scope.roleId = $routeParams.roleId;
	$scope.roleName = $routeParams.roleName;

	$scope.selectedApplication = {};

	$scope.rootEle = {isChecked:true};

	$scope.selectAll = function(){
//		console.log($scope.rootEle.isChecked);	
		angular.forEach($scope.Modules, function(value, key) {
			value.isChecked = $scope.rootEle.isChecked;
		});
	}
			
	$scope.showModules = function(){
		$scope.Modules= new coreTable();
		$scope.Modules = coreTable.get({"tbl":"coremenu","whr":" and parentId="+$scope.selectedApplication.selectedItem.menuId});

		$scope.Modules.$promise.then(function(result){
			$scope.rootEle.isChecked = false; 
			$scope.Modules = result.result;
			angular.forEach($scope.Modules, function(value, key) {
				value.isChecked = false;
			});
				$scope.getRoleModules();
		});
	}
	
	$scope.getRoleModules = function(){
		$scope.RoleModules= new coreTable();
		$scope.RoleModules = coreTable.get({"tbl":"corerolemodule","whr":" and roleId ="+$scope.roleId});
		$scope.RoleModules.$promise.then(function(result){
			$scope.RoleModules = result.result;
				angular.forEach($scope.Modules, function(value, key) {
					var obj = $filter('filter')($scope.RoleModules,{"menuId":value.menuId},true);
				   	if(obj.length > 0){
						value.isChecked = true;	
					}else{
						value.isChecked = false;		
					}
				});
		});
	}
	
	
	$scope.getAllItems = function(){
		
	}
	
	$scope.submitRoleModule = function(){
		$scope.roleModules = new RoleModules();
	
		$scope.arrModules = Array();
		
		
		angular.forEach($scope.Modules, function(value, key) {
				if(value.isChecked == true) $scope.arrModules.push(value.menuId);	
		});
		
		$scope.roleModules.roleId = $scope.roleId;
		$scope.roleModules.modules = $scope.arrModules.toString();
		$scope.roleModules.parent = $scope.selectedApplication.selectedItem.menuId;
		
		$scope.roleModules.$save(function(response){
			toastr.success('Permissions updated!', 'Done')		
		});		
	}
});











bpoApps.controller("playgroundnewController",function($scope,Sections,Fields,ProcessField,toastr,coreTable,$routeParams,$parse,sessionService,$timeout,CCPrepopulated,filterFilter,$filter)
{


$scope.onfocus = function(field){
//	alert("IN ON FOCUS");	
console.log("IN FOCUS");
}

$scope.checkform = function(form){

}
//$scope.getAllCats = [{"nonCtsCategoryId":"13","nonCtsCategoryName":"AIRTEL","displaylabel":"AIRTEL","dbcol":"nonCtsCategoryId","dbval":"13"},{"nonCtsCategoryId":"14","nonCtsCategoryName":"CANCELLED CHEQUE","displaylabel":"CANCELLED CHEQUE","dbcol":"nonCtsCategoryId","dbval":"14"}];
//$scope.getAllBanks = [{"companyId":"1","companyName":"ICICI1","displaylabel":"ICICI"},{"companyId":"2","companyName":"HDFC","displaylabel":"HDFC"},{"companyId":"3","companyName":"Jet Airways","displaylabel":"Jet Airways"}];

//$scope.getAllCats = {};
//$scope.getAllBanks = {};

$scope.formdata = {};
$scope.fieldIds = [];
	
	$scope.businessValidations = function(value,id,fieldName){ 
			console.log(JSON.stringify(value)+":"+id+":"+fieldName);		
	}
	
	$scope.changeCompany = function(){
			// SEARCH REQUIRED ITEM FROM BANK LIST I.E. FROM DATALIST OBJECT OF BANK I.E. getAllBanks
			$scope.formdata.tmpPlayground__vCompany.selectedItem = $scope.getAllBanks[0];
	}
	
	$scope.filterCategory = function(){
	 
			$scope.$broadcast('getDDLData',{"model":"tmpPlayground__vCategory","whr":" and  nonCtsCategoryId IN (13,14,16)"});
	}
	
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var lblaccessor = accessor;
		$scope.formdata[lblaccessor]={};
		var tmp = $parse(datalist) ;
		tmp.assign($scope, data);
		accessor = "formdata['"+accessor+"']";
		var accessor = $parse(accessor); 
		angular.forEach(data, function(value, key) {
			if(value[scopevar] == $scope.formdata[scopevar]){ 
				accessor.assign($scope, {"selectedItem":value});
			}
		});
	
	}	
	$scope.sections = Sections.get({"id":27});
	$scope.sections.$promise.then(function(result){
		$scope.sections = result.result;
		angular.forEach(result.result, function(value, key) {

			// FOR GET PROCESS ORIENTED DATA
			$scope.getFields();			
			
			var fields = Array();
			$scope.sections[key].lastIndex=0;
			$scope.sections[key].fields = Array();
			$scope.sections[key].sortedFields = Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
			$scope.getSectionRenderer(value,key);		
			

		});
	});
	
	
	$scope.getSectionRenderer = function(section,sectionIndex){
		 $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
		 $scope.fields.$promise.then(function(result){	 	
				$scope.sections[sectionIndex].fields = result.result;
				
		 		angular.forEach(result.result, function(value, key) {					
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
					
				});


			 $timeout(function(){
				$scope.getMapping();				 
				 angular.forEach($scope.sections[sectionIndex].fields, function(value, key) {					
						if(value.fieldTypeId != 2){
					//	$scope.formdata[value.model] = "2";
						 	
						}
						
				});
			 }, 1000);
							

			
		 }); 			
	}
	
	
	$scope.formdatadisplay = function()
	{
			$scope.Field = new Fields();
			$scope.Field.formData = $scope.formdata;
			$scope.Field.whr = " ";
			$scope.Field.$save(function (response) {
				});
	}
	


	// PROCESS HANDLING IS STARTED
	$scope.process = 1;

	$scope.process = $routeParams.process;


	$scope.getFields = function(){
		$scope.selFields = Fields.get({"id":0,"sectionId":"27"});
		$scope.selFields.$promise.then(function(result){
			$scope.selFields = result.result;
				angular.forEach($scope.selFields, function(value, key) {
					value.isEnabled = false;
					value.isPrePopulated = false;
					value.isValidated = false;
					$scope.fieldIds.push(value.fieldId);
				});
			//$scope.getMapping();
			//$scope.getPrepopulated();
		});
			
	}
	
	$scope.getMapping = function(){
		$scope.processField = ProcessField.get({"fieldIds":$scope.fieldIds.toString(),"processId":$scope.process});
		$scope.processField.$promise.then(function(result){
			$scope.processField = result.result;

			angular.forEach($scope.selFields, function(value, key) {
				value.isEnabled = false;
				value.isPrePopulated = false;
				value.isValidated = false;
				angular.forEach($scope.processField, function(subvalue, key) {
					 if(subvalue.fieldId == value.fieldId){
							if(subvalue.enable  == "1") value.isEnabled = true;
							if(subvalue.prepopulated == "1") value.isPrePopulated = true;
							if(subvalue.validation == "1") value.isValidated = true;
					 }
				});

			});
			
			$scope.getPrepopulated();

//alert("IN");
		//	console.log("****"+JSON.stringify($scope.processField));		
		});
		
	}

	$scope.getPrepopulated = function(){
		
		$scope.prepopulated = CCPrepopulated.get({"fieldIds":$scope.fieldIds.toString(),"recordId":3});
		$scope.prepopulated.$promise.then(function(result){
			$scope.prepopulated = result.result[0];
			//alert(JSON.stringify($scope.processField));
			console.log(">>><<<<"+JSON.stringify($scope.prepopulated));
			angular.forEach($scope.prepopulated, function(value, key) {
				angular.forEach($scope.sections[0].sortedFields, function(rowvalue, rowkey) {
 					angular.forEach(rowvalue, function(fieldvalue, fieldkey) {

 						if(fieldvalue.model == 'tmpPlayground__'+key){	
							fieldvalue.prevVal = value;
								if(fieldvalue.fieldTypeId == 2){
								angular.forEach($scope[fieldvalue.metaInfo.datalist], function(value, key) {
									var newobj = angular.fromJson(fieldvalue.metai);
									if(fieldvalue.prevVal == value[newobj.Val]){
										fieldvalue.prevVal = value[newobj.DisplayLabel];

									}
								});
								}

							var tmpProcessField = $filter('filter')($scope.processField, {"fieldId":fieldvalue.fieldId})[0];
							//alert(JSON.stringify(tmpProcessField));
							if(tmpProcessField.prepopulated == "1"){
//								alert(JSON.stringify(fieldvalue));									
								if(fieldvalue.fieldTypeId == "1" || fieldvalue.fieldTypeId == "5" || fieldvalue.fieldTypeId == "14") {
									$scope.formdata[fieldvalue.model] = value;	
								}
								
								if(fieldvalue.fieldTypeId == "2") {
									
									console.log("####>"+JSON.stringify($scope.getAllBanks));
									var col = (fieldvalue.metaInfo.Val);
									var tmpVal = null;

									angular.forEach($scope[fieldvalue.metaInfo.datalist], function(orival, orikey) {
										if(orival[col] == value){
										tmpVal = orival;	
										}
									});									
									$scope.formdata[fieldvalue.model].selectedItem = tmpVal; //$scope[fieldvalue.metaInfo.datalist][2];	
								}
							}
							
							if(tmpProcessField.validation == "1"){
								fieldvalue.prevValidation = true;	
							}else
							{
								fieldvalue.prevValidation = false;	
							}
							
						}
					 
					});			 
				});
				
				 
			});
		});
	}
	// PROCESS HANDLING IS ENDED

});



bpoApps.controller("canvasController",function($scope,$http,$rootScope)
{
	
	 
	$scope.isDraw = true;
	$scope.fileInput = "";
 
	$scope.overlays =  [{x : 0, y:0, w:300, h:300, color:'#ff00ff'}];
	$scope.rects = Array();
	
	$scope.options = { controls : { toolbar : true}};


//	 	$scope.$apply();

	
	$http.get("http://localhost/bpoapps/storage/apps/cc/20170106/mergedImages/2017027860002.tif",{responseType: "blob"}).success(function(data)
		{
								 var file = new File([data], "a.tif", {type: "image/tiff"});
								$scope.fileInput = file;
								 
							});	
	

	$scope.x1 = 0;
	$scope.y1 = 0;
	$scope.x2 = 0;
	$scope.y2 = 0;
	
	var x1=y1= 0;
	var x2=y2= 0;
	var width = 0;
	var height = 0;
	var dragok = false;

	$scope.move = function(xseed, yseed){
		if(xseed!=0){
		$scope.overlays[0].x += xseed; 
		}
		if(yseed!=0){
		$scope.overlays[0].y += yseed; 	
		}
	}
	
	$scope.size = function(wseed, hseed){
		if(wseed!=0){
		$scope.overlays[0].w += wseed; 
		}
		if(hseed!=0){
		$scope.overlays[0].h += hseed; 	
		}
	}	

	$scope.draw = function () {
	 	ctx.fillStyle = "#ff0000";
	 	//$scope.rect(x1,y1,(x2-x1),(y2-y1));

		var x = x1;
		var y = y1;
		var w = (x2-x1)+(x2-x1);
		var h = (y2-y1)+(y2-y1);
		w = ((1/$scope.options.zoom.value)*w);
		w = w/2;
		h = ((1/$scope.options.zoom.value)*h);
		h = h/2;

		x = ((1/$scope.options.zoom.value)*x);
		x = x/2;
		y = ((1/$scope.options.zoom.value)*y);
		y = y/2;
		x1 = x; //+$scope.options.size.w;
		y1 = y;
		x1 = x1+$scope.options.position.x;
		y1 = x1+$scope.options.position.y;		
		alert(x1+":"+y1);				
		$scope.overlays.push({x : x1, y:y1, w:w, h:h, color:'#ffff00'});
	//	$scope.overlays.push({x : x1*$scope.options.zoom.value, y:y1*$scope.options.zoom.value, w:(x2-x1)*$scope.options.zoom.value, h:(y2-y1)*$scope.options.zoom.value, color:'#ff0000'});
//		$scope.rects.push({"x":x1,"y":y1,"w":(x2-x1),"h":(y2-y1)});
		 $scope.$apply();
 
	}

	$scope.rect = function (x,y,w,h) {
		ctx.beginPath();
//		alert($scope.options.zoom.value);
		var sc = $scope.options.zoom.value;
//		ctx.scale( sc , sc);
	 	ctx.rect(x,y,w,h);
	 	ctx.closePath();
	 	ctx.fill();
	}	
	
	$scope.myMove = function(e){
	 	if (dragok){
	 	 	x1 = e.pageX - canvas.offsetLeft;
	  		y1 = e.pageY - canvas.offsetTop;
		}
	}
	
	$scope.myDown = function (e){
	 	if (e.pageX < x1 + 15 + canvas.offsetLeft && e.pageX > x1 - 15 +
	 		canvas.offsetLeft && e.pageY < y1 + 15 + canvas.offsetTop &&
	 		e.pageY > y1 -15 + canvas.offsetTop || 1==1)
		{
	  		x1 = e.pageX - canvas.offsetLeft;
	  		y1 = e.pageY - canvas.offsetTop;
	  		dragok = true;
			canvas.onmousemove = $scope.myMove;
	 	}
		
	}
		
	$scope.myUp = function(e){
	 	dragok = false;
	 	canvas.onmousemove = null;
		x2 = e.pageX - canvas.offsetLeft;
	  	y2 = e.pageY - canvas.offsetTop;
	 	dragok = true;
		canvas.onmousedown = $scope.myMove;
		$scope.draw();
 
		//alert("DRAW RECT: W>"+Number(x2-x1)+":"+Number(y2-y1));
		//alert(" x1 : "+ x1 + "  y1 : " + y1 +"  x2 : " + x2 + "  y2 : " + y2+":"+$scope.options.zoom.value);
	}
	
	$scope.clearCanvas = function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);	
	}
	//var canvas = document.getElementById("drawpanel");
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	canvas.onmousedown = $scope.myDown;
	canvas.onmouseup = $scope.myUp;
	
	//$scope.overlays =  [{x : 0, y:0, w:300, h:300, color:'#ff00ff'}];
	
	$scope.addRect = function(){
	//	$scope.overlays.push({x : 50, y:255, w:300, h:300, color:'#00ffff'});
//		applyTransform();	
	 
	}
	
	
	
	
	/*
	var canvas = document.getElementById("drawpanel");
	var ctx = canvas.getContext("2d");
	x=100;y=100;w=100;h=100;
	ctx.fillStyle = "#ff0000";
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
	*/
	
	
	
	

});