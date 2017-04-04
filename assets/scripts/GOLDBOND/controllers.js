bpoApps.controller("GOLDBOND_uploadController",function($scope,Sections,Fields,Upload,$timeout,toastr,CORE_CONFIG,WEB_API,Batch,CSVImport)
{	
	$scope.logs = "";
	$scope.currentFileName = "";
	$scope.currentRow = 0;
	$scope.formdata = {
			file: ""
	};
	$scope.file = Upload;	
	$scope.sections = Sections.get({"id":"3"});
	
	$scope.sections.$promise.then(function(result){
		$scope.sections = result.result;
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
		 		angular.forEach(result.result, function(value, key) {	
					$scope.formdata[value.model] = "";
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
			
	}

	$scope.subForm = function(file){
		
	}


});


bpoApps.controller("GOLDBOND_batchallocationController",function($scope,Sections,Fields,$filter,ngTableParams,ProcessUsers,Process,Batches,Users
,AllocateApplication,Release,BatchApplication,toastr){
		$scope.currentRow = 0;
		$scope.formdata = {};
		$scope.batchApplications = Array();
		$scope.sections = Sections.get({"id":"4"});
	
		$scope.sections.$promise.then(function(result){
			$scope.sections = result.result;
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
					angular.forEach(result.result, function(value, key) {	
						$scope.formdata[value.model] = "";
						$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
					});
			 });
		}
		
});



bpoApps.controller("GOLDBOND_dataEntryController",function($scope,Sections,Fields,$filter,ngTableParams,Process,Batches,Users,$routeParams,NextRecord,toastr){

	$scope.UserId = 81;
	$scope.isStarted=false;
	
	$scope.currentRow = 0;
	$scope.formdata = {};
	$scope.application = {};
	$scope.selectedReason = {};	 

	$scope.ProcessId = $routeParams.process;
	$scope.process = Process.get({"id":$scope.ProcessId});
	$scope.process.$promise.then(function(result){
		$scope.process = result.result[0];
	});

	
	$scope.sections = Sections.get({"id":"13"});
	
	$scope.sections.$promise.then(function(result){
		$scope.sections = result.result;
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
		 		angular.forEach(result.result, function(value, key) {	
					$scope.formdata[value.model] = "";

					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
			
	}
});

bpoApps.controller("GOLDBOND_reportController",function($scope,Sections,Fields){

	$scope.currentRow = 0;
		$scope.formdata = {};
		

		$scope.sections = Sections.get({"id":"14"});
	
		$scope.sections.$promise.then(function(result){
			$scope.sections = result.result;
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
					angular.forEach(result.result, function(value, key) {	
						$scope.formdata[value.model] = "";
						$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
					});
			 });
		}
});

