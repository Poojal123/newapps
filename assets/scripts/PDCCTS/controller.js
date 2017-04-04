bpoApps.controller("PDCCTSdataPurging",function($scope,Sections,Fields,$location,$timeout)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	$scope.date = new Date();
	
	$scope.sections = Sections.get({"id":43});
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
            console.log("Field : -   "+Fields);
			$scope.Field.whr = " and communicationmasterId = 1";
			$scope.Field.$save(function (response) {
				console.log("response : -   "+response);
				});
	}
	$scope.getSectionRenderer = function(section,sectionIndex){
		 $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
		 $scope.fields.$promise.then(function(result){	 	
				$scope.sections[sectionIndex].fields = result.result;
		 		angular.forEach(result.result, function(value, key) {	
					$scope.formdata[value.model] = "";
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 }); 
	}
	
	$scope.dataPurgeClick=function(){
	 	
	}
	
});

bpoApps.controller("PDCCTScommunicationmaster",function($scope,toastr,coreTable,$filter,$routeParams,CommunicationModules,ngTableParams,$timeout)
{
	$scope.showNew = false;
	
	$scope.Communications = Array();

	$scope.Communication = new coreTable();
	$scope.Communication.val = {"communicationmasterId":"","locationCode":"","locationName":"","accountNumber":"", "phoneNumber":"", "address1":"", "address2":"", "address3":"", "address4":"", "address5":"", "payableAt":"", "isActive":"Active"};
	$scope.getCommunications = function(){
			$scope.Communications = coreTable.get({"tbl":"pdcctscommunicationmaster","whr":""});
			
			$scope.Communications.$promise.then(function(result){
				$scope.Communications = result.result;
				
 		 			console.log("console.log(JSON.stringify($scope.Communication));"+JSON.stringify($scope.Communications));
					$scope.tableParams.reload();	
			});
	}
		
	$scope.getAllTypes = {};
	
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
				communicationmasterId:'desc',
				locationCode:'desc',
				locationName:'desc',
				accountNumber:'desc',
				phoneNumber:'desc',
				address1:'desc',
				isActive:'desc'
			},
			filter: {
				communicationmasterId: '',
				locationCode: '',
				locationName: '',
				accountNumber: '',
				phoneNumber: '',
				address1: '',
				isActive: '',
			}
		}, 
		{
				total: $scope.Communications.length,
				getData: function ($defer, params) {
					
				   var filteredData = params.filter() ? $filter('filter')($scope.Communications, params.filter()) : $scope.Communications;
				   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
				   params.total(orderedData.length);
				   
				   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
		});

	$scope.newCommunication = function(){
		$scope.Communication.val = Object();
		$scope.Communication.primary = Object();
		$scope.showNew = true;
	}
	
	$scope.submitCommunication = function(){

		$scope.Communication.table = "pdcctscommunicationmaster";
		$scope.Communication.$save(function(response){
				$scope.getCommunications();
				$scope.showNew = false;
				toastr.success('Communication saved successfully!', 'Done')
		});
	}

	$scope.cancelCommunication = function(){
		$scope.showNew = false;
	}
	
	$scope.getCommunication = function(communication){

		$scope.Communication.val = {"communicationmasterId":communication.communicationmasterId,"locationCode":communication.locationCode ,"locationName":communication.locationName,"accountNumber":communication.accountNumber, "phoneNumber":communication.phoneNumber, "address1":communication.address1, "address2":communication.address2, "address3":communication.address3, "address4":communication.address4, "address5":communication.address5, "payableAt":communication.payableAt, "isActive":communication.isActive};
		
		$scope.Communication.primary = {"communicationmasterId":communication.communicationmasterId};
		
		console.log(JSON.stringify($scope.Communication));		
		$scope.showNew = true;
	}
	
	$scope.deleteCommunication = function(communication){
		coreTable.delete({ "tbl": "pdcctscommunicationmaster", "delkey":"communicationmasterId", "delval":communication.communicationmasterId}, function() {
				toastr.success('Communication deleted successfully!', 'Done')			
		$scope.getCommunications();
	  });
		
	}
	
	$timeout(function(){
		$scope.getCommunications();	
	});
	
	
});

bpoApps.controller("PDCCTScpdataupload",function(Upload,toastr,CORE_CONFIG,WEB_API,PDCPROCSVImport,$scope,Sections,Fields,$location,$timeout)
{	
	$scope.logs = "";
	$scope.currentFileName = "";
	$scope.currentRow = 0;
	$scope.formdata = {
			file: ""
	};
	$scope.file = Upload;	
	$scope.getAllTypes = {};

	$scope.selectedTypes = Object();

	$scope.sections = Sections.get({"id":25});
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
            console.log("Field : -   "+Fields);
			$scope.Field.whr = " and communicationmasterId = 1";
			$scope.Field.$save(function (response) {
				console.log("response : -   "+response);
		});
	}
	
	$scope.getSectionRenderer = function(section,sectionIndex){
		 $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
		 $scope.fields.$promise.then(function(result){	 	
				$scope.sections[sectionIndex].fields = result.result;
		 		angular.forEach(result.result, function(value, key) {	
					$scope.formdata[value.model] = "";
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 }); 
	}
		$scope.getAllTypes = {};

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
	 $scope.subForm = function(file){
				$scope.formdata = {
						 "file":file,
						 "folder":"PDCCTS_IMPORT_CSV"
					};
			
				
				$scope.file.upload = Upload.upload({
				  url: CORE_CONFIG.WEB_SERVICE+WEB_API.UPLOAD,
				  data: $scope.formdata,
				});
		        console.log("------upload"+JSON.stringify($scope.formdata))	
				$scope.file.upload.then(function (response) {
					console.log("--------------")
					if(response.data.status == "success"){
		
						$scope.logs += "PDCCTS-Pro Data Uploaded successfully.";
						$scope.currentFileName = response.data.result.upload_data.file_name;
						
					
								var arrFile = $scope.currentFileName.split(".");
								$scope.currentFileName = arrFile[0];
								$scope.csv = PDCPROCSVImport.get({"file":$scope.currentFileName,"folderId":"PDCCTS_IMPORT_CSV","json":"pdcctsimport","extData":"0"});
								$scope.csv.$promise.then(function(result){		
									console.log("jjjjjjjjjjjj"+JSON.stringify(result.result));
									$scope.logs += "\n"+result.result.totalRows+" records imported successfully.";									
									toastr.success('PDCCTS-Pro Data Imported Successfully ', 'Done')
							});	
						
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
	
	
	
	
	
});

bpoApps.controller("PDCCTSpayslipsummaryreport",function($scope,Sections,Fields,$location,$timeout)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	
	$scope.getAllTypes = {};
	
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
	$scope.sections = Sections.get({"id":41});
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
            console.log("Field : -   "+Fields);
			$scope.Field.whr = " and communicationmasterId = 1";
			$scope.Field.$save(function (response) {
				console.log("response : -   "+response);
				});
	}
	$scope.getSectionRenderer = function(section,sectionIndex){
		 $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
		 $scope.fields.$promise.then(function(result){	 	
				$scope.sections[sectionIndex].fields = result.result;
		 		angular.forEach(result.result, function(value, key) {	
					$scope.formdata[value.model] = "";
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 }); 
	}
});

bpoApps.controller("PDCCTSchequeuploaddownload",function($scope,Sections,Fields,$location,$timeout)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	
	$scope.sections = Sections.get({"id":42});
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
            console.log("Field : -   "+Fields);
			$scope.Field.whr = " and communicationmasterId = 1";
			$scope.Field.$save(function (response) {
				console.log("response : -   "+response);
				});
	}
	$scope.getSectionRenderer = function(section,sectionIndex){
		 $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
		 $scope.fields.$promise.then(function(result){	 	
				$scope.sections[sectionIndex].fields = result.result;
		 		angular.forEach(result.result, function(value, key) {	
					$scope.formdata[value.model] = "";
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 }); 
	}
});