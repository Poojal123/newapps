
bpoApps.controller("pldeDataEntryController",function($scope,Sections,Fields,$routeParams,ProcessField,$timeout)
{    
	var formdata = new FormData();
	$scope.proval = 0;
	$scope.progressbarstatus = "";
	$scope.currentstatus = "";

		
	$scope.process = "1";
	if($routeParams.process != null)
	{
		$scope.process = $routeParams.process;
	}


	$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
	}
	

	$scope.fieldIds = [];
	$scope.formdata ={};

	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		//alert(JSON.stringify(data));
		var tmp = $parse(datalist) ;
		
		tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});

	}
	

	$scope.currentRow = 0;
	
	$scope.setLog(10,"Please wait while we preparing the form",""); // = function(proval, currentstatus, css, newlog)
	$scope.sections = Sections.get();
	$scope.sections.$promise.then(function(result){
		$scope.sections = result.result;
		$scope.setLog(20,"Please wait while we preparing the form",""); // = function(proval, currentstatus, css, newlog)
		
		angular.forEach(result.result, function(value, key) {
			var fields = Array();
			$scope.sections[key].fields = Array();
			$scope.sections[key].sortedFields = Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
			$scope.getSectionRenderer(value,key);		
		});
	});
	
	

	$scope.getSectionRenderer = function(section,sectionIndex){
		 
		 $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
		 $scope.fields.$promise.then(function(result){
				$scope.sections[sectionIndex].fields = result.result;

					$scope.selFields = result.result;
						angular.forEach($scope.selFields, function(value, key) {
							value.isEnabled = false;
							value.isPrePopulated = false;
							value.isValidated = false;
							$scope.fieldIds.push(value.fieldId);
						});
				$scope.setLog(70,"Please wait while we preparing the form",""); // = function(proval, currentstatus, css, newlog)
								
		 		angular.forEach(result.result, function(value, key) {	
					
					//$scope.formdata[value.model] = "";
				
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;

				});
				
				
				$scope.getMapping();
		 });
		  //$scope.$apply(); 
			
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

				$scope.setLog(100,"Form is ready to process",""); // = function(proval, currentstatus, css, newlog)
					$timeout(function(){
						$scope.proval = 0;
					}, 1000);

			});

			
		});
		
	}
	


	$scope.subForm = function(){
			$scope.Field = new Fields();
			$scope.Field.formData = $scope.formdata;
			$scope.Field.whr = " and entryId = 1";
			
			$scope.Field.$save(function (response) {
					console.log(JSON.stringify(response));
				});
	}




});



bpoApps.controller("processSettingsController",function($scope,Sections,Fields,ProcessField,toastr,coreTable,$routeParams,$parse,sessionService,$timeout)
{	
//	************************* LAYER CODE STARTS
    var formdata = new FormData();

$scope.proval = 0;
$scope.progressbarstatus = "";
$scope.currentstatus = "";

$scope.getAllProcesses = [];

$scope.showme = function(){
//alert("TEST");	
}


$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
	}

$scope.getAllCat = {};

	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		//alert(JSON.stringify(data));
		var tmp = $parse(datalist) ;
		
		tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				//if(value[scopevar] == $scope.formdata[scopevar]){
			//		accessor.assign($scope, {"selectedItem":value});
			//	}
		});

	}


	$scope.appId=11;

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
			$scope.setLog(50,"Reading all fields",""); // = function(proval, currentstatus, css, newlog)

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
			$scope.setLog(100,"Received all fields",""); // = function(proval, currentstatus, css, newlog)
			    $timeout(function(){
					$scope.proval = 0;
				}, 2000);
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

			
		});
		
	}
	
	$scope.submitMapping = function(){
		
			$scope.setLog(20,"Preparing to save",""); // = function(proval, currentstatus, css, newlog)
 
		
			$scope.pField = new ProcessField();
			$scope.pField.Fields = $scope.selFields;
			$scope.pField.FieldIds = $scope.fieldIds.toString();
			$scope.pField.ProcessId = $scope.selectedProcess.selectedItem.processId;
			
			$scope.pField.$save(function (response) {
			$scope.setLog(100,"Field settings saved!",""); // = function(proval, currentstatus, css, newlog)
			    $timeout(function(){
					$scope.proval = 0;
				}, 2000);				
				toastr.success('Field settings saved!', 'Done')
			});

	}
	
	$scope.getSections();

//	************************* LAYER CODE ENDS



	$scope.selectedRole = {};
	$scope.getAllRoles = {};
	$scope.selectedUser = {};
	
	$scope.getAllUsers = {};
	$scope.getAllRoles = {};

});
