bpoApps.controller("OCTMnewchequeentrycontroller",function($scope,createbatchid,Batch,Sections,Fields,$location,toastr,$filter,
$timeout,$parse,$rootScope,focus)
{
	$scope.formdata = {};
	$scope.formdata.newchequeentry__batchId = "";
	$scope.formdata.newchequeentry__Category = {};
	$scope.formdata.newchequeentry__clgdate = "";
	$scope.formdata.newchequeentry__lotnumber = {};
	$scope.formdata.newchequeentry__type ="";
	$scope.workerDetail = {};


	
	$scope.formats = ['MM/dd/yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'MM/dd/yyyy'];
  	$scope.format = $scope.formats[0];
	
	$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
	}
	
	$scope.createbatch = function()
	{	
		if($scope.formdata.newchequeentry__clgdate=="")
		{
			toastr.error("Please enter clg date!",'error');
		}
		else if($scope.formdata.newchequeentry__Category.selectedItem==null)
		{
			toastr.error("Please select category!",'error');
		}
		else if($scope.formdata.newchequeentry__lotnumber.selectedItem==null)
		{
			toastr.error("Please select lot no.!",'error');
		}
		else
		{
			$scope.setLog(30,"Please wait Batch Creating","");
			$scope.createbatchid = new createbatchid();
			// $scope.formdata.newchequeentry__clgdate = $filter('date')(new Date($scope.formdata.newchequeentry__clgdate.split('-').join('-')), "yyyy-MM-dd");
			//console.log("------>"+$scope.formdata.batchId);
			
			$scope.createbatchid.batchId = $scope.formdata.newchequeentry__batchId;
			$scope.createbatchid.clgdate = $scope.formdata.newchequeentry__clgdate;
			$scope.createbatchid.categoryid = $scope.formdata.newchequeentry__Category.selectedItem.categoryName;
			$scope.createbatchid.lotid = $scope.formdata.newchequeentry__lotnumber.selectedItem.lotNumber;
			$scope.createbatchid.type = "Cheque Entry";
			//console.log('--------'+JSON.stringify($scope.createbatchid));
			$scope.createbatchid.$save(function(response)
			{
				$scope.setLog(50,"Please wait Batch Creating","");
				console.log(response);
					if(response.result == "0")
					{
						toastr.error("Record already exist!",'error');
						$timeout(function(){
							$("#1049").focus();	
						}, 500);
						$timeout(function(){
								$scope.proval = 0;
							}, 1000);
					}
					else
					{
						$rootScope.batchnumber = response.result;
						$scope.setLog(100,"Batch Created","");
							$timeout(function(){
								$scope.proval = 0;
							}, 1000);					toastr.success("Created batch id is :  "+$scope.formdata.newchequeentry__batchId,'Done');
					}
						$scope.formdata.newchequeentry__batchId = "";
						$scope.formdata.newchequeentry__Category = {};
						$scope.formdata.newchequeentry__clgdate = "";
						$scope.formdata.newchequeentry__lotnumber = {};
						$scope.formdata.newchequeentry__type ="";
					
					})
			}
	}
	$scope.sections = Sections.get({"id":16});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		})
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

})

bpoApps.controller("OCTMnewchequeentry2controller",function($scope,createbatchid1,Batch,Sections,Fields,$location,toastr,$filter,$timeout,$parse,$rootScope,focus)
{
		$scope.formdata = {};
		
		$scope.formdata.newchequeentry2__batchId = "";
		$scope.formdata.newchequeentry2__clgdate = "";
		$scope.formdata.newchequeentry2__lotnumber = {};
		$scope.formdata.newchequeentry2__type ="";
		$scope.workerDetail = {};

		$scope.getAllId = {};
		$scope.formats = ['MM/dd/yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'MM/dd/yyyy'];
  		$scope.format = $scope.formats[0];
	
		$scope.sections = Sections.get({"id":56});
		$scope.sections.$promise.then(function(result){
		
			$scope.sections = result.result;
			angular.forEach(result.result, function(value, key) {
				var fields = Array();
				$scope.sections[key].fields = Array();
				$scope.sections[key].sortedFields = Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
				$scope.getSectionRenderer(value,key);		
			});
		});
	
	$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
	}
	

		$scope.getSectionRenderer = function(section,sectionIndex){
		 
			$scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
		 	$scope.fields.$promise.then(function(result)
			{
				$scope.sections[sectionIndex].fields = result.result;
		 		angular.forEach(result.result, function(value, key) {	
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
			})
		}
		 
		$scope.getAllItems = function(data, datalist, accessor, scopevar)
		{
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
		
		$scope.createbatch = function()
		{	
			if($scope.formdata.newchequeentry2__clgdate=="")
			{
				toastr.error("Please enter date!",'error');
			}
			else if($scope.formdata.newchequeentry2__lotnumber.selectedItem==null)
			{
				toastr.error("Please select lot no.!",'error');
			}
			else
			{
			$scope.setLog(30,"Please wait Batch Creating","");
			$scope.createbatchid1 = new createbatchid1();
						
			$scope.createbatchid1.batchId = $scope.formdata.newchequeentry2__batchId;
			// $scope.createbatchid1.clgdate = $filter('date')(new Date($scope.formdata.newchequeentry2__clgdate.split('-').join('-')), "yyyy-MM-dd");
		// 	$scope.cYr = ($scope.formdata.newchequeentry2__clgdate.split(' ')[0]);
		// $scope.cMnth = ($scope.formdata.newchequeentry2__clgdate.split(' ')[1]);
		// $scope.cDate = ($scope.formdata.newchequeentry2__clgdate.split(' ')[2]);
		// $scope.createbatchid1.clgdate = $scope.formdata.newchequeentry2__clgdate + '/' + $scope.cMnth + '/' + $scope.cYr;

		// 	console.log($scope.createbatchid1.clgdate);

		$scope.createbatchid1.clgdate = $filter('date')($scope.formdata.newchequeentry2__clgdate, "yyyy/MM/dd");
	console.log($scope.createbatchid1.clgdate);
			$scope.createbatchid1.lotid = $scope.formdata.newchequeentry2__lotnumber.selectedItem.lotNumber;
			$scope.createbatchid1.type = "Othercheque Entry";
			
			//console.log('--------'+JSON.stringify($scope.createbatchid));
			$scope.setLog(50,"Please wait Batch Creating","");
			$scope.createbatchid1.$save(function(response)
			{
				console.log(response);
				if(response.result == "0")
				{
					toastr.error("Record already exist!",'error');
					$timeout(function(){
						$("#1089").focus();	
					}, 500);
					
				}
				else
				{
						$rootScope.batchnumber = response.result;
						$scope.setLog(100,"Batch Created","");
						$timeout(function(){
							$scope.proval = 0;
						}, 1000);
						toastr.success("Created batch id is :  "+$scope.formdata.newchequeentry2__batchId,'Done');
				}
				$scope.formdata.newchequeentry2__batchId = "";
				$scope.formdata.newchequeentry2__clgdate = "";
				$scope.formdata.newchequeentry2__lotnumber = {};
				$scope.formdata.newchequeentry2__type ="";

			})
	}
}
})

bpoApps.controller("OCTMchequerequestcontroller",function($scope,$rootScope,Sections,Fields,ngTableParams,toastr,$location,$timeout,$parse,getshowlist2,getlotcategory,getbankname,GetBatch,StartEntry,$filter)
{	

	$scope.formdata = {};
	$scope.formdata.octmchequebookrequest__lotNumber = "";
	$scope.formdata.octmchequebookrequest__requestDate = "";
	$scope.formdata.octmchequebookrequest__payeeName = "";
	$scope.formdata.octmchequebookrequest__accountNumber = "";
	$scope.formdata.octmchequebookrequest__chequebookNumber = "";
	$scope.formdata.octmchequebookrequest__batchId = "";
	$scope.chequelist1 = new Array();
	$scope.showlist = true;
	$scope.hidelist = false;
	$scope.chequelisttable = false;
	
	$scope.fieldIds = [];

	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		console.log("data :- "+JSON.stringify(data));
		console.log("datalist :- "+ datalist);
		console.log("accessor :- " + accessor);
		console.log("scopevar :- " + scopevar);
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
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	$scope.currentRow = 0;
	$scope.sections = Sections.get({"id":"48"});
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

		$scope.selFields = result.result;
		angular.forEach($scope.selFields, function(value, key) {
				value.isEnabled = false;
				value.isPrePopulated = false;
				value.isValidated = false;
				$scope.fieldIds.push(value.fieldId);
		});
				 
								
		angular.forEach(result.result, function(value, key) {	
			$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
			});
		}); 
	}
	
	$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
	}

	
	$scope.hide = function()
	{
		$scope.showlist = true;
		$scope.hidelist = false;
		$scope.chequelisttable = false;
	}
	
	$scope.chequelist = function()
	{ 
		$scope.showlist = false;
		$scope.hidelist = true;
		$scope.chequelisttable = true;
		//$scope.clgDate = new Date();
		//console.log($scope.clgDate);
		$scope.showlist2 = getshowlist2.get({"user":$rootScope.SESS_USER.userId});
				$scope.showlist2.$promise.then(function(response){
					$scope.chequelist1 = response.result;
					$scope.totalrecords = response.result.length;
					//console.log(JSON.stringify(response.result));
					$scope.tableParams.reload();
		});
	}
	
	$scope.showme = function(field)
	{
		if(field == "octmchequebookrequest__batchId")
		{
			$scope.lotcategory = getlotcategory.get({"batchId":$scope.formdata.octmchequebookrequest__batchId.selectedItem.batchId})
			$scope.lotcategory.$promise.then(function(response)
			{
				$scope.formdata.octmchequebookrequest__lotNumber = response.result[0].lotId;
			})
		}
	}


	$scope.formdatadisplay = function()
	{
				if($scope.formdata.octmchequebookrequest__requestDate=="")
				{
					toastr.error('Please enter date!','Done');
				}
				else
				{
					console.log("clg date=="+$scope.formdata.octmchequebookrequest__requestDate);
				$scope.formdata.octmchequebookrequest__requestDate = $filter('date')($scope.formdata.octmchequebookrequest__requestDate,"yyyy-MM-dd");
				$scope.setLog(30,"Please wait Request is in process","");
				$scope.Fields = new Fields();
				$scope.Fields.formData=$scope.formdata;
				$scope.Fields.formData.octmchequebookrequest__userCode = $rootScope.SESS_USER.userId;

			 $scope.setLog(50,"Please wait Request is in process","");
			$scope.Fields.whr="";
			$scope.Fields.$save(function (response) {
				$scope.setLog(100,"Request Created","");
					$timeout(function(){
					$scope.proval = 0;
					}, 1000);
					$timeout(function(){
						$("#1043").focus();	
					}, 500);
					
				//console.log("response------->>>>"+JSON.stringify(response));
				toastr.success('Chequebook requested successfully!','Done');
				//$scope.formdata.octmchequebookrequest__lotNumber = "";
				//$scope.formdata.octmchequebookrequest__requestDate = "";
				$scope.formdata.octmchequebookrequest__payeeName = "";
				$scope.formdata.octmchequebookrequest__accountNumber = "";
				$scope.formdata.octmchequebookrequest__chequebookNumber = "";
				//$scope.formdata.octmchequebookrequest__batchId = "";
				
			});
			//console.log("$scope.Field.formData--->>>>> "+JSON.stringify($scope.Field.formData));
			}
		}
$scope.tableParams = new ngTableParams({
					
					debugMode: true,
					page: 1, 
					count: 10,
					sorting: {
								requestId: 'asc',
								batchId: 'desc',
								requestDate: 'desc',
								lotNumber: 'desc',
								accountNumber: 'desc',
								payeeName: 'desc',
								chequeBookNumber:'desc',
						},
					filter: {
								requestId: '',
								batchId: '',
								requestDate: '',
								lotNumber: '',
								accountNumber: '',
								payeeName: '',
								chequeBookNumber:'',
						}
	
					}, {
							total: $scope.chequelist1.length,
							getData: function ($defer, params) {
							
								var filteredData = params.filter() ? $filter('filter')($scope.chequelist1, params.filter()) : $scope.chequelist1;
							   	var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
							   	$defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
						}
	
	});
});

bpoApps.controller("OCTMchequeentrycontroller",function($scope,$rootScope,Sections,Fields,last,checkdate,ngTableParams,toastr,getserialnumber,getbatchfinish,getshowlist,getNRECheque,getmicrcode,getsolId,$location,$timeout,$parse,getlotcategory,getbankname,GetBatch,StartEntry,$filter,focus,deleterecord)
{	
	$scope.formdata = {};
	$scope.formdata.octmchequeentry__batchNumber = "";
	$scope.formdata.octmchequeentry__clgdate = "";
	$scope.formdata.octmchequeentry__serialNumber = "";
	$scope.formdata.octmchequeentry__lotNumber = "";
	$scope.formdata.octmchequeentry__categoryAmount = "";
	$scope.formdata.octmchequeentry__accountNumber = "";
	$scope.formdata.octmchequeentry__accountNumber2 = "";
	$scope.formdata.octmchequeentry__payinSlipDate = "";
	$scope.formdata.octmchequeentry__chequeDate = "";
	$scope.formdata.octmchequeentry__chequeNumber = "";
	$scope.formdata.octmchequeentry__micrCode = "";
	$scope.formdata.octmchequeentry__transCode = "";
	$scope.formdata.octmchequeentry__payeeName = "";
	$scope.formdata.octmchequeentry__draweeName = "";
	$scope.formdata.octmchequeentry__chequeAmnt = "";
	$scope.formdata.octmchequeentry__solId = "";
	$scope.formdata.octmchequeentry__userName = "";
	$scope.category = ""
	$scope.bankName = "";
	$scope.category = ""
	$scope.bankName = "";
	$scope.amountletter1 = "";
	$scope.amountletter2 = "";
	$scope.lastChequeAmount = "";
	$scope.lastChequeNumber = "";
	$scope.formdata1 = {};
	$scope.formdata1.bulkEntry = "";
	$scope.fieldIds = [];
	$scope.accno =false;
	//$scope.getAllId={};
	$scope.formdata.octmchequeentry__endTime="";

	
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

	$scope.formats = ['mm/dd/yyyy'];
  	$scope.format = $scope.formats[0];
	$scope.currentRow = 0;
	$scope.entryId='';
	$scope.disabled=false;
	$scope.isValid=false;

	$scope.sections = Sections.get({"id":"15"});
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
				$scope.selFields = result.result;
						angular.forEach($scope.selFields, function(value, key) {
							value.isEnabled = false;
							value.isPrePopulated = false;
							value.isValidated = false;
							$scope.fieldIds.push(value.fieldId);
						});
				 
					angular.forEach(result.result, function(value, key) {	
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
	}

$scope.deleterecord2 = function(serialNumber,misreport)
	{

			$scope.deleterecord1 = deleterecord.get({
							   "batchId": misreport.batchNumber ,			                               
							   "lotNumber":misreport.lotNumber,
							   "serialNumber":serialNumber,"clgDate":misreport.clgDate});

			$scope.deleterecord1.$promise.then(function(response){
				$scope.setLog(30,"Please wait Deleting Record","");
			if(response.result == true)
			{
					toastr.success("Record deleted successfully! DELETED ID : "+serialNumber,'Done');
					$scope.setLog(50,"Please wait Record deleting","");
					$scope.setLog(100,"Record Saved successfully","");
						$timeout(function(){
							$scope.proval = 0;
						}, 1000);
						$scope.tableParams.reload();
					$scope.chequelist();
					
			}
			else{
				toastr.error("Record Not Deleted");
				$scope.setLog(50,"Please wait Record deleting","");
				$scope.setLog(100,"Record Saved successfully","");
						$timeout(function(){
							$scope.proval = 0;
						}, 1000);
			}
		})
	}	
	$scope.formdata9 = {};
	$scope.update = function(chequeentry,misreport,flag)
	{
		//console.log("cheque----"+chequeentry);
		console.log("--misreport---"+JSON.stringify(misreport));
		$scope.endDate = $filter('date')(new Date(),"yyyy-MM-dd HH:mm:ss");
		
	$scope.Fields = new Fields();
	//$scope.clgDate = $filter('date')(new Date($scope.formdata.octmchequeentry__clgdate),"yyyy-MM-dd HH:mm:ss");	
	$scope.formdata9.octmchequeentry__serialNumber = misreport.serialNumber;
	$scope.formdata9.octmchequeentry__accountNumber = misreport.accountNumber;
	$scope.formdata9.octmchequeentry__accountNumber2 = misreport.accountNumber2;
	$scope.formdata9.octmchequeentry__payinSlipDate = $filter('date')(new Date(misreport.payinSlipDate.split('/').join('/')), "yyyy-MM-dd");
	$scope.formdata9.octmchequeentry__chequeDate = $filter('date')(new Date(misreport.chequeDate.split('/').join('/')), "yyyy-MM-dd");
	$scope.formdata9.octmchequeentry__chequeNumber = misreport.chequeNumber;
	$scope.formdata9.octmchequeentry__micrCode = misreport.micrCode;
	$scope.formdata9.octmchequeentry__transCode = misreport.transCode;
	$scope.formdata9.octmchequeentry__payeeName = misreport.payeeName;
	$scope.formdata9.octmchequeentry__draweeName = misreport.draweeName;
	$scope.formdata9.octmchequeentry__chequeAmount = misreport.chequeAmount;
	$scope.formdata9.octmchequeentry__chequeAmnt = misreport.chequeAmnt;
	$scope.formdata9.octmchequeentry__solId = misreport.solId;
	$scope.formdata.octmchequeentry__userName =misreport.userName;
		$scope.chequeEntryId = parseInt(misreport.chequeEntryId)+1;
		console.log("==FORMDATA=="+JSON.stringify($scope.formdata9));
		$scope.Fields.formData=$scope.formdata9;		
		$scope.Fields.whr=" AND chequeEntryId="+misreport.chequeEntryId;
		$scope.Fields.$save(function (response) {
							$scope.Fields = new Fields();
							console.log("==FORMDATA=1=="+JSON.stringify($scope.formdata9));
							$scope.formdata9.octmchequeentry__chequeAmnt = 0;
							$scope.Fields.formData=$scope.formdata9;
							$scope.Fields.whr=" AND chequeEntryId="+$scope.chequeEntryId;
							$scope.Fields.$save(function (response) {
												console.log("response----"+response);
												toastr.success('Record saved successfully!','Done');															
											});
							$scope.tableParams.reload();										
						});
		
		}

$scope.convertNumberToWords = function(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
	var index = 0;
	//var words=[];
	var number;
	var n_length;
	var words_string = "";
    while(index < 2)
	{
		number = atemp[index].split(",").join("");
		n_length = number.length;
		if (n_length <= 9) 
		{
			var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
			var received_n_array = new Array();
			for (var i = 0; i < n_length; i++) {
				received_n_array[i] = number.substr(i, 1);
			}
			for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
				n_array[i] = received_n_array[j];
			}
			for (var i = 0, j = 1; i < 9; i++, j++) {
				if (i == 0 || i == 2 || i == 4 || i == 7) {
					if (n_array[i] == 1) {
						n_array[j] = 10 + parseInt(n_array[j]);
						n_array[i] = 0;
					}
				}
			}
			value = "";
			for (var i = 0; i < 9; i++) {
				if (i == 0 || i == 2 || i == 4 || i == 7) {
					value = n_array[i] * 10;
				} else {
					value = n_array[i];
				}
				if (value != 0) {
					words_string += words[value] + " ";
				}
				if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
					words_string += "Crores ";
				}
				if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
					words_string += "Lakhs ";
				}
				if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
					words_string += "Thousand ";
				}
				if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
					words_string += "Hundred and ";
				} else if (i == 6 && value != 0) {
					words_string += "Hundred ";
				}
			}
			
			words_string = words_string.split("  ").join(" ");
			
		}
		//words[index]=words_string.split("  ").join(" ");
		if(index == 0)
			words_string = words_string + " Rupees And ";
		else
		{
			var tmpVar = words_string.split('And');
			console.log(">>>>>>>>" + tmpVar[1]);
			if(tmpVar[1] == ' ')
				words_string = words_string + " Zero Paise";
			else
				words_string = words_string + " Paise ";
		}
				
		index++;
		//words[index]=words_string;
	}
	return words_string;
	}


$scope.checkdate1 = function(field)
{
		if(field == "octmchequeentry__chequeDate")
		{
			if($scope.formdata.octmchequeentry__chequeDate == "" || $scope.formdata.octmchequeentry__chequeDate == undefined)
			{
				toastr.error("Cheque Date Is Blank");
				$timeout(function(){
							$("#480").focus();	
						}, 500);
			}
			else
			{
			console.log("===========> "+$scope.formdata.octmchequeentry__chequeDate);
			$scope.date = $filter('date')(new Date($scope.formdata.octmchequeentry__chequeDate), "yyyy-MM-dd");

			console.log("=====>"+$scope.date);
			$scope.checkdate2 = checkdate.get();
			$scope.checkdate2.$promise.then(function(response){
				
				if(response.status == "success")
				{
					if($scope.date < response.result[0].staleDate)
					{
						toastr.error('check date is smaller than stale date!');
						$scope.formdata.octmchequeentry__chequeDate="";
						$timeout(function(){
							$("#480").focus();	
						}, 500);
						$scope.validdate = false;
					}
					else if($scope.date > response.result[0].pdcDate){
						toastr.error('check date is smaller than pdc date!');
						$scope.formdata.octmchequeentry__chequeDate="";
							$timeout(function(){
								$("#480").focus();	
							}, 500);
							$scope.validdate = false;
					}
					else{
							$scope.validdate = true;
					}
				}
				else if(response.result == "error")
				{
					toastr.error('Cheque date is not valid!');
					$scope.formdata.octmchequeentry__chequeDate="";
					$timeout(function(){
						$("#480").focus();	
					}, 500);
					$scope.validdate = false;
				}
			});

			}
			
		}
	}

	$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
 	}

	$scope.change = function(field)
	{
		//===========================================
		if(field == "octmchequeentry__chequeAmount")
		{
			if($scope.formdata.octmchequeentry__chequeAmount != "")
			{
				if($scope.formdata.octmchequeentry__chequeAmount.includes(".")==false)
				{
					$scope.formdata.octmchequeentry__chequeAmount=$scope.formdata.octmchequeentry__chequeAmount+".00";
				}
				$scope.chqamnt = true;
				$scope.word1 = $scope.convertNumberToWords($scope.formdata.octmchequeentry__chequeAmount);
				if($scope.amountflag == true)
				{
					$timeout(function(){
						$("#489").focus();	
					}, 500);
				}
			}
		}
		if(field == "octmchequeentry__chequeAmnt")
		{
			if($scope.formdata.octmchequeentry__chequeAmnt.includes(".")==false)
			{
				$scope.formdata.octmchequeentry__chequeAmnt=$scope.formdata.octmchequeentry__chequeAmnt+".00";
			}
			if($scope.formdata.octmchequeentry__chequeAmnt != $scope.formdata.octmchequeentry__chequeAmount)
			{
				toastr.error('Cheque amount does not matched','Error');
				$scope.chqamnt = false;
				$scope.valid11 = false;
				$scope.amountflag = true;
				$scope.formdata.octmchequeentry__chequeAmnt = ""; 
				$scope.formdata.octmchequeentry__chequeAmount = "";
				$timeout(function(){
						$("#483").focus();	
					}, 500);
			}
			else if($scope.formdata.octmchequeentry__chequeAmnt == $scope.formdata.octmchequeentry__chequeAmount)
			{
				$scope.amountflag = false;
				$scope.chqamnt = true;
				$scope.valid11 = true;
				$scope.word2 = $scope.convertNumberToWords($scope.formdata.octmchequeentry__chequeAmnt);
			}
		}
		if(field == "octmchequeentry__transCode")
		{
			if($scope.formdata.octmchequeentry__transCode == "00")
			{
				toastr.error(" '00' is Not Accepted in Trans Code");
				$scope.formdata.octmchequeentry__transCode = "";
				$timeout(function(){
									$("#486").focus();	
								}, 500);
			}
			else{
				if($scope.formdata.octmchequeentry__transCode >= 21 && $scope.formdata.octmchequeentry__transCode <= 27)
				{
					$scope.validmicr = $scope.formdata.octmchequeentry__micrCode.slice(0,3);
					console.log("------> "+$scope.validmicr);
					if($scope.validmicr == "110")
					{
						toastr.info("This is An OCC cheque");
					}
				}
			}
		}
		if(field == "octmchequeentry__solId")
		{
			if($scope.formdata.octmchequeentry__solId != "" || $scope.formdata.octmchequeentry__solId != undefined)
			{
				$scope.solId = getsolId.get({"solId":$scope.formdata.octmchequeentry__solId});
				$scope.solId.$promise.then(function(response){
					
					if(response.result == "")
					{
						toastr.error('SolId is not valid!');
						$timeout(function(){
							$("#490").focus();	
						}, 500);
					}
					else{
						$scope.formdatadisplay();
					}
				})
			}
			
		}
	 	if(field == "octmchequeentry__micrCode")
		{
			if($scope.formdata.octmchequeentry__micrCode=="" || $scope.formdata.octmchequeentry__micrCode == undefined)
			{
				toastr.error('MICR code is blank!');
				$timeout(function(){
					$("#484").focus();	
				}, 500);
			}
			else
			{
				$scope.micr = getmicrcode.get({"micrCode":$scope.formdata.octmchequeentry__micrCode});
				$scope.micr.$promise.then(function(response){
					if(response.result == "")
					{
						$scope.formdata.octmchequeentry__micrCode = "";
						toastr.error('MICR code is wrong');
						$timeout(function(){
							$("#484").focus();	
						}, 500);
					}
					else
					{
						$scope.micr1 = response.result[0].bankName;
					}
				})
			}
		}
		if(field == "octmchequeentry__batchNumber")
		{
			if($scope.formdata.octmchequeentry__batchNumber == "" || $scope.formdata.octmchequeentry__batchNumber == undefined)
			{
				toastr.error('Batch no is blank!');
			}
			if($scope.formdata.octmchequeentry__clgdate == "")
			{
				toastr.error("Clearing Date Is Blank");
						$timeout(function(){
							$("#1119").focus();
						}, 500);
			}
			else
			{
				$scope.lotcategory = getlotcategory.get({"batchId":$scope.formdata.octmchequeentry__batchNumber,"clgdate":$scope.formdata.octmchequeentry__clgdate,"type":"Cheque Entry"});
				$scope.lotcategory.$promise.then(function(response)
				{
					if(response.result == "")
					{
						toastr.error('Batch number is wrong!');
						$scope.formdata.octmchequeentry__batchNumber = "";
						$scope.formdata.octmchequeentry__clgdate = "";
						$timeout(function(){
							$("#1119").focus();
						}, 500);
					}
					else if(response.result[0].Status == "14")
					{
						toastr.error("Batch Is Finished");
						$scope.formdata.octmchequeentry__batchNumber = "";
						$scope.formdata.octmchequeentry__clgdate = "";
						$timeout(function(){
							$("#473").focus();
						}, 500);
					}
					else{
						$scope.lastcheq();

						$scope.formdata.octmchequeentry__lotNumber = response.result[0].lotId;
						$scope.formdata.octmchequeentry__categoryAmount = response.result[0].category;
						$scope.formdata.octmchequeentry__clgdate = $filter('date')(response.result[0].clgdate,"MM/dd/yyyy");
						
						$scope.serailnumber1 = getserialnumber.get({"batchId":$scope.formdata.octmchequeentry__batchNumber,
														"clgdate":$filter('date')(new Date($scope.formdata.octmchequeentry__clgdate.split('-').join('-')), "mediumDate"),
														"lotnumber":$scope.formdata.octmchequeentry__lotNumber,
														"type":"Cheque Entry"})
						$scope.serailnumber1.$promise.then(function(response){
							if(response.result == "")
							{
								$scope.formdata.octmchequeentry__serialNumber = 1;
							}
							else{
								console.log(JSON.stringify(response));
								$scope.formdata.octmchequeentry__serialNumber = parseInt(response.result[0].serialNumber)+1;
							}
						})
						console.log("amountt====="+JSON.stringify(response.result[0]));
						$scope.user = $rootScope.SESS_USER.fullName;
						if(response.result[0].amount!=10000000)
						$scope.categoryamnt = response.result[0].amount+".99";
						else
						$scope.categoryamnt = response.result[0].amount;
					}
				})
			}
		
		}
		
		if(field == "octmchequeentry__accountNumber")
		{
			if($scope.formdata.octmchequeentry__accountNumber.length == 12 )
			{
				$scope.accno = true;
			}
		}
		if(field == "octmchequeentry__chequeAmount")
		{
			if($scope.formdata.octmchequeentry__categoryAmount == "A")
			{
				if($scope.formdata.octmchequeentry__chequeAmount > 49999.99 || $scope.formdata.octmchequeentry__chequeAmount < 0)
				{
					toastr.error('Amount out of category!');
					$scope.formdata.octmchequeentry__chequeAmnt = ""; 
					$scope.formdata.octmchequeentry__chequeAmount = ""; 
					$scope.chqamnt = false;
					$timeout(function(){
						$("#483").focus();	
					}, 500);
				}
			}
			else if($scope.formdata.octmchequeentry__categoryAmount == "B")
			{
				if($scope.formdata.octmchequeentry__chequeAmount > 99999.99 || $scope.formdata.octmchequeentry__chequeAmount < 0)
				{
					toastr.error('Amount out of category!');
					$scope.chqamnt = false;
					$scope.formdata.octmchequeentry__chequeAmnt = ""; 
				$scope.formdata.octmchequeentry__chequeAmount = "";
				
					$timeout(function(){
						$("#483").focus();	
					}, 500);
				}
			}
			else if($scope.formdata.octmchequeentry__categoryAmount == "C")
			{
				if($scope.formdata.octmchequeentry__chequeAmount > 499999.99 || $scope.formdata.octmchequeentry__chequeAmount < 0)
				{
					toastr.error('Amount out of category!');
					$scope.chqamnt = false;
					$scope.formdata.octmchequeentry__chequeAmnt = ""; 
				$scope.formdata.octmchequeentry__chequeAmount = "";
					$timeout(function(){
						$("#483").focus();	
					}, 500);
				}
			}
			else if($scope.formdata.octmchequeentry__categoryAmount =="D")
			{
				if($scope.formdata.octmchequeentry__chequeAmount > 2499999.99 || $scope.formdata.octmchequeentry__chequeAmount < 0)
				{
					toastr.error('Amount out of category!');
					$scope.chqamnt = false;
					$scope.formdata.octmchequeentry__chequeAmnt = ""; 
				$scope.formdata.octmchequeentry__chequeAmount = "";
					$timeout(function(){
						$("#483").focus();	
					}, 500);
				}
			}
			else if($scope.formdata.octmchequeentry__categoryAmount == "E")
			{
				if($scope.formdata.octmchequeentry__chequeAmount > 9999999.99  || $scope.formdata.octmchequeentry__chequeAmount < 0)
				{
					toastr.error('Amount out of category!');
					$scope.chqamnt = false;
					$scope.formdata.octmchequeentry__chequeAmnt = ""; 
					$scope.formdata.octmchequeentry__chequeAmount = "";
					$timeout(function(){
						$("#483").focus();	
					}, 500);
				}
			}
			else if($scope.formdata.octmchequeentry__categoryAmount == "F")
			{
				if($scope.formdata.octmchequeentry__chequeAmount < 10000000)
				{
					toastr.error('Amount out of category!');
					$scope.chqamnt = false;
					$scope.formdata.octmchequeentry__chequeAmnt = ""; 
					$scope.formdata.octmchequeentry__chequeAmount = "";
					$timeout(function(){
						$("#483").focus();	
					}, 500);
				}
			}
		}
	 	if(field == "octmchequeentry__accountNumber2")
		{
				if($scope.formdata.octmchequeentry__accountNumber2 != $scope.formdata.octmchequeentry__accountNumber)
				{
					toastr.error('Account numbers does not matched');
					$scope.accno = false;
					$scope.formdata.octmchequeentry__accountNumber = "";
					$scope.formdata.octmchequeentry__accountNumber2 =""; 
					$timeout(function(){
						$("#478").focus();	
					}, 500);
				}
				else if($scope.formdata.octmchequeentry__accountNumber2 == $scope.formdata.octmchequeentry__accountNumber)
				{
					$scope.accno = true;
					$scope.NRECheque = getNRECheque.get({"accountNumber2":$scope.formdata.octmotherchequeentry__accountNumber2});
					$scope.NRECheque.$promise.then(function(response){
					console.log(JSON.stringify(response));
						if(response.result!="")
						{
							//toastr.success("NRE Cheque");
							alert("NRE Cheque");
							
						}
						else{
							
						}
					});
				}
		}
		if(field == "octmchequeentry__chequeNumber")
		{
			if($scope.formdata.octmchequeentry__chequeNumber.length < 6)
			{
				 $scope.number1 = "000000"+$scope.formdata.octmchequeentry__chequeNumber;
				 console.log("----> "+$scope.number1);
				 $scope.formdata.octmchequeentry__chequeNumber = $scope.number1.substring($scope.number1.length-6, $scope.number1.length); 
				 console.log("----> "+$scope.formdata.octmchequeentry__chequeNumber);
			}
		}
		
 }

	$scope.varSplChar = function(field)
	{
		if(field == "octmchequeentry__draweeName")
		{
			$scope.formdata.octmchequeentry__draweeName = $scope.formdata.octmchequeentry__draweeName.replace(/[^\w\s]/gi, "");
		}
		if(field == "octmchequeentry__payeeName")
		{
			$scope.formdata.octmchequeentry__payeeName = $scope.formdata.octmchequeentry__payeeName.replace(/[^\w\s]/gi, "");
		}
		if(field == "octmchequeentry__batchNumber")
		{
			$scope.formdata.octmchequeentry__batchNumber = $scope.formdata.octmchequeentry__batchNumber.replace(/[^\d\.]/, "");
		}
		if(field == "octmchequeentry__chequeAmount")
		{
			$scope.formdata.octmchequeentry__chequeAmount = $scope.formdata.octmchequeentry__chequeAmount.replace(/[^\d\.]/, "");
		}
		if(field == "octmchequeentry__chequeAmnt")
		{
			$scope.formdata.octmchequeentry__chequeAmnt = $scope.formdata.octmchequeentry__chequeAmnt.replace(/[^\d\.]/, "");
		}
		if(field == "octmchequeentry__micrCode")
		{
			$scope.formdata.octmchequeentry__micrCode = $scope.formdata.octmchequeentry__micrCode.replace(/[^\d\.]/, "");
		}
		if(field == "octmchequeentry__transCode")
		{
			$scope.formdata.octmchequeentry__transCode = $scope.formdata.octmchequeentry__transCode.replace(/[^\d\.]/, "");
		}
		if(field == "octmchequeentry__chequeNumber")
		{
			$scope.formdata.octmchequeentry__chequeNumber = $scope.formdata.octmchequeentry__chequeNumber.replace(/[^\d\.]/, "");
		}
		if(field == "octmchequeentry__accountNumber")
		{
			$scope.formdata.octmchequeentry__accountNumber = $scope.formdata.octmchequeentry__accountNumber.replace(/[^\d\.]/, "");
		}
		if(field == "octmchequeentry__accountNumber2")
		{
			$scope.formdata.octmchequeentry__accountNumber2 = $scope.formdata.octmchequeentry__accountNumber2.replace(/[^\d\.]/, "");	
		}
	} 
	
	$scope.CreateBatch=function()
	{
			$scope.disabled=true;
	}
	$scope.FinishBatch = function()
	{
		$scope.disabled=true;
		if($scope.formdata.octmchequeentry__batchNumber == "")
		{
			toastr.error("Please Enter Batch Number");
			$timeout(function(){
						$("#473").focus();	
					}, 500);
		}
		else{
			$scope.change("octmchequeentry__batchNumber");
			console.log("batch Id :- "+$scope.formdata.octmchequeentry__batchNumber);
			console.log("clg Date :- "+$scope.formdata.octmchequeentry__clgdate);
			console.log("lot Number :- "+$scope.formdata.octmchequeentry__lotNumber);
			$scope.finishchequeentrybatch = getbatchfinish.get({"batchId":$scope.formdata.octmchequeentry__batchNumber,
															"clgdate":$scope.formdata.octmchequeentry__clgdate,
															"lotnumber":$scope.formdata.octmchequeentry__lotNumber,
															"type":"Cheque Entry"});
		$scope.finishchequeentrybatch.$promise.then(function(response){
			console.log(JSON.stringify(response));
			if(response.result == true)
			{
				$scope.disabled=false;
				$scope.formdata.octmchequeentry__batchNumber = "";
				$scope.formdata.octmchequeentry__lotNumber = "0";
				$scope.formdata.octmchequeentry__serialNumber = "0";
				toastr.success("Batch Finish successfully");
			}
			else{
				toastr.error("Batch Not Finished Due some error");
			}

		})
		}
		
	}

	$scope.chequelist1 = new Array();
	$scope.showlist = true;
	$scope.hidelist = false;
	$scope.chequelisttable = false;

	$scope.chequelist = function()
	{	
		if($scope.formdata.octmchequeentry__batchNumber == "")
		{
			toastr.error('Please Enter Batch Id !');
		}
		else
		{
			console.log("clg date=="+$scope.formdata.octmchequeentry__clgdate);
			$scope.showlist = false;
			$scope.hidelist = true;
			$scope.chequelisttable = true;
			$scope.showlist1 = getshowlist.get({"batchId":$scope.formdata.octmchequeentry__batchNumber,"clgDate":$filter('date')(new Date($scope.formdata.octmchequeentry__clgdate.split('/').join('/')), "yyyy-MM-dd"),"user":$rootScope.SESS_USER.userId});
			$scope.showlist1.$promise.then(function(response){ 
			console.log("==="+JSON.stringify(response.result));
			if(response.result=="")
			{
				toastr.error('No record found !');
			}
			else
			{
				$scope.chequelist1 = response.result
				$scope.totalrecords = response.result.length;
				$scope.amountcategory = response.result[0].categoryAmount;
			}
				$scope.tableParams.reload();
			})
		}
	}
	$scope.hide = function()
	{
		$scope.showlist = true;
		$scope.hidelist = false;	
		$scope.chequelisttable = false;
	}

$scope.lastcheq = function()
{
//	$scope.formdata.octmchequeentry__clgdate = $filter('date')(new Date( $scope.formdata.octmchequeentry__clgdate.split('/').join('/')), "yyyy-MM-dd");
	$scope.last = last.get({"user":$rootScope.SESS_USER.userId,"batchId":$scope.formdata.octmchequeentry__batchNumber,"clgdate":$scope.formdata.octmchequeentry__clgdate});
	$scope.last.$promise.then(function(response){
			$scope.lastChequeNumber = response.result[0].chequeNumber;
			$scope.lastChequeAmount = response.result[0].chequeAmount;
	})
}

$scope.formdatadisplay = function()
{
	if($scope.formdata.octmchequeentry__chequeDate == "")
	{
		toastr.error("Cheque Date is Blank");
	}
	else if($scope.formdata.octmchequeentry__payinSlipDate == "")
	{
		toastr.error("Pay In Slip Date is Blank");
	}
	else if($scope.valid11 == false)
	{
		toastr.error("amount not matched");
		$timeout(function(){
			$("#483").focus();	
		}, 500);
	}
	else if($scope.validdate == false)
	{
		toastr.error("Date Is Not Valid");
		$timeout(function(){
			$("#480").focus();	
		}, 500);
	}
	else{
			$scope.endDate=  $filter('date')(new Date(),"yyyy-MM-dd HH:mm:ss");	
			$scope.startDate=  $filter('date')(new Date(),"yyyy-MM-dd HH:mm:ss");	
			$scope.date = $filter('date')(new Date(), "yyyy-MM-dd");
			console.log("-----------------> "+$scope.date);
			if($scope.formdata.octmchequeentry__chequeAmount != $scope.formdata.octmchequeentry__chequeAmnt)
			{
					toastr.error('Amount does not match!','error');
			}
			else
			{
				$scope.formdata.octmchequeentry__clgdate = $filter('date')(new Date($scope.formdata.octmchequeentry__clgdate.split('/').join('/')), "yyyy-MM-dd");
				$scope.setLog(30,"Please wait Saving Record","");
					console.log(" ------------------> "+$scope.formdata.octmchequeentry__serialNumber);
					
					$scope.formdata.octmchequeentry__endTime = $scope.endDate;
					$scope.formdata.octmchequeentry__startTime = $scope.startDate;
					$scope.formdata.octmchequeentry__userName = $rootScope.SESS_USER.userId;
					$scope.formdata.octmchequeentry__chequeDate = $filter('date')(new Date( $scope.formdata.octmchequeentry__chequeDate.split('-').join('-')), "yyyy-MM-dd");
					$scope.formdata.octmchequeentry__payinSlipDate = $filter('date')(new Date( $scope.formdata.octmchequeentry__payinSlipDate.split('-').join('-')), "yyyy-MM-dd");
				
					$scope.Fields = new Fields();
					$scope.Fields.formData=$scope.formdata;
					console.log("==formdtad==="+JSON.stringify($scope.formdata));
					$scope.Fields.formData.octmchequeentry__ProcessId = "7";

					angular.forEach($scope.Fields.formData, function(value,key) {
						if(value.selectedItem){
						$scope.Fields.formData[key] = value.selectedItem.dbval;
						}
					});

					
					$scope.Fields.whr="";
					
					$scope.Fields.$save(function (response) {
					$scope.Fields2 = new Fields();
					$scope.setLog(50,"Please wait Saving Record","");
					$scope.formdata.octmchequeentry__chequeAmnt = 0;
					$scope.formdata.octmchequeentry__endTime =0;
					console.log("==formdtad=1==="+JSON.stringify($scope.formdata));
					$scope.Fields2.formData = $scope.formdata;
					$scope.Fields2.formData.octmchequeentry__ProcessId = "8";
					$scope.Fields2.whr="";
					$scope.Fields2.$save(function (response) {
					
					toastr.success('Record saved successfully!','Done');
					$scope.lastcheq();
					$scope.formdata.octmchequeentry__serialNumber = parseInt($scope.formdata.octmchequeentry__serialNumber) + 1;
					$scope.formdata.octmchequeentry__clgdate = $filter('date')($scope.formdata.octmchequeentry__clgdate.split('-').join('-'), "MM/dd/yyyy");
					if($scope.formdata1.bulkEntry == true)
						{
							$scope.formdata.octmchequeentry__chequeDate ="";
							$scope.formdata.octmchequeentry__chequeNumber = ""; 
							$scope.formdata.octmchequeentry__chequeAmount = "";
							$scope.formdata.octmchequeentry__chequeAmnt = "";
							$scope.chqamnt = false;
							$timeout(function(){
								$("#480").focus();	
							}, 500);
							
						}
					
						else{
							$scope.formdata.octmchequeentry__accountNumber = "";
							$scope.formdata.octmchequeentry__accountNumber2 = "";
							$scope.formdata.octmchequeentry__payinSlipDate = "";
							$scope.formdata.octmchequeentry__chequeDate = "";
							$scope.formdata.octmchequeentry__chequeNumber = "";
							$scope.formdata.octmchequeentry__micrCode = "";
							$scope.formdata.octmchequeentry__transCode = "";
							$scope.formdata.octmchequeentry__payeeName = "";
							$scope.formdata.octmchequeentry__draweeName = "";
							$scope.formdata.octmchequeentry__chequeAmnt = "";
							$scope.formdata.octmchequeentry__chequeAmount = "";
							$scope.formdata.octmchequeentry__solId = "";
							$scope.micr1 = "";
							$scope.word1 = "";
							$scope.word2 = "";
							$scope.accno=false;
							$scope.chqamnt = false;
							$timeout(function(){
							$("#478").focus();
						}, 500);
						}
						$scope.setLog(100,"Record Saved successfully","");
      					$timeout(function(){
     						$scope.proval = 0;
     					}, 1000);
						$scope.CreateBatch();
					})

			});
		}	
	}
	
}

$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								serialNumber: 'asc',
								accountNumber: 'desc',
								chequeNumber: 'desc',
								micrCode: 'desc',
								categoryAmount: 'desc',
								chequeAmount: 'desc',
								clgDate:'desc',
								userName:'desc',
								payinSlipDate:'desc',
								chequeDate:'desc',
								transCode:'desc',
								payeeName:'desc',
								draweeName:'desc',
								solId:'desc'
						},
						filter: {
								serialNumber: '',
								accountNumber: '',
								chequeNumber: '',
								micrCode: '',
								categoryAmount: '',
								chequeAmount: '',
								clgDate:'',
								userName:'',
								payinSlipDate:'',
								chequeDate:'',
								transCode:'',
								payeeName:'',
								draweeName:'',
								solId:''
						}
	
					}, {
							total: $scope.chequelist1.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.chequelist1, params.filter()) : $scope.chequelist1;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
						}
					});
});

bpoApps.controller("OCTMOtherchequeentrycontroller",function($scope,$rootScope,Sections,lastother,checkdate,Fields,getmicrcode,getbatchfinish,getcheckrange,getserialnumber,getsolId,ngTableParams ,getNRECheque,getlotcategory,getshowlist1,toastr,$filter,getbankname,$location,$timeout,$parse,startOtherEntry,focus,deleteotherrecord)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	$scope.formdata.octmotherchequeentry__batchId = "";
	$scope.formdata.octmotherchequeentry__serialNumber = "";
	$scope.formdata.octmotherchequeentry__lotNumber = "";
	$scope.formdata.octmotherchequeentry__clgDate = "";
	$scope.formdata.octmotherchequeentry__nonCtsCategory = {};
	$scope.formdata.octmotherchequeentry__chequeDate = "";
	$scope.formdata.octmotherchequeentry__cardNumber = "";
	$scope.formdata.octmotherchequeentry__cardNumber2 = "";
	$scope.formdata.octmotherchequeentry__shortMicrCode = "";
	$scope.formdata.octmotherchequeentry__cardType = "";
	$scope.formdata.octmotherchequeentry__reason = {};
	$scope.formdata.octmotherchequeentry__debitAccountNumber = "";
	$scope.formdata.octmotherchequeentry__accountNumber = "";
	$scope.formdata.octmotherchequeentry__accountNumber2 = "";
	$scope.formdata.octmotherchequeentry__chequeNumber = "";
	$scope.formdata.octmotherchequeentry__chequeAmount = "";
	$scope.formdata.octmotherchequeentry__micrCode = "";
	$scope.formdata.octmotherchequeentry__transCode = "";
	$scope.formdata.octmotherchequeentry__payeeName = "";
	$scope.formdata.octmotherchequeentry__draweeName = "";
	$scope.formdata.octmotherchequeentry__chequeAmnt = "";
	$scope.formdata.octmotherchequeentry__solId = "";
	$scope.formdata.octmotherchequeentry__userCode = "";
	$scope.formdata.octmotherchequeentry__serialNumber = "";
	$scope.formdata1 = {};
	$scope.formdata1.bulkEntry = "";
	$scope.formdata1.iciciBankCreditCard = "";
	$scope.bankName = "";
	$scope.amountletter1 = "";
	$scope.amountletter2 = "";
	$scope.lastChequeAmount = "";
	$scope.lastChequeNumber = "";
	$scope.fieldIds = [];
	$scope.formats = ['dd-MMMM-yyyy','mm/dd/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[1];
	$scope.showlist = true;
	$scope.hidelist = false;
	$scope.chequelisttable = false;
	$scope.entryId='';
	$scope.disabled=false;
	$scope.getAllreason = {};
	// $scope.getAllcats = {};
	// $scope.getAllIds = {};
	// $scope.getAllcard ={};
	$scope.word1 = "zero Rupees and zero Paise";
	$scope.word2 = "zero Rupees and zero Paise";
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var lblaccessor = accessor;
		console.log(data);
		console.log(datalist);
		console.log(accessor);
		console.log(scopevar);
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

$scope.convertNumberToWords = function(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
	var index = 0;
	//var words=[];
	var number;
	var n_length;
	var words_string = "";
    while(index < 2)
	{
		number = atemp[index].split(",").join("");
		n_length = number.length;
		if (n_length <= 9) 
		{
			var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
			var received_n_array = new Array();
			for (var i = 0; i < n_length; i++) {
				received_n_array[i] = number.substr(i, 1);
			}
			for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
				n_array[i] = received_n_array[j];
			}
			for (var i = 0, j = 1; i < 9; i++, j++) {
				if (i == 0 || i == 2 || i == 4 || i == 7) {
					if (n_array[i] == 1) {
						n_array[j] = 10 + parseInt(n_array[j]);
						n_array[i] = 0;
					}
				}
			}
			value = "";
			for (var i = 0; i < 9; i++) {
				if (i == 0 || i == 2 || i == 4 || i == 7) {
					value = n_array[i] * 10;
				} else {
					value = n_array[i];
				}
				if (value != 0) {
					words_string += words[value] + " ";
				}
				if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
					words_string += "Crores ";
				}
				if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
					words_string += "Lakhs ";
				}
				if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
					words_string += "Thousand ";
				}
				if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
					words_string += "Hundred and ";
				} else if (i == 6 && value != 0) {
					words_string += "Hundred ";
				}
			}
			
			words_string = words_string.split("  ").join(" ");
			
		}
		//words[index]=words_string.split("  ").join(" ");
		if(index == 0)
			words_string = words_string + " Rupees And ";
		else
		{
			var tmpVar = words_string.split('And');
			console.log(">>>>>>>>" + tmpVar[1]);
			if(tmpVar[1] == ' ')
				words_string = words_string + " Zero Paise";
			else
				words_string = words_string + " Paise ";
		}
				
		index++;
		//words[index]=words_string;
	}
	return words_string;
	}

	$scope.sections = Sections.get({"id":"17"});
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

					$scope.selFields = result.result;
						angular.forEach($scope.selFields, function(value, key) {
							value.isEnabled = false;
							value.isPrePopulated = false;
							value.isValidated = false;
							$scope.fieldIds.push(value.fieldId);
						});
				 
		 		angular.forEach(result.result, function(value, key) {	
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
	}

	$scope.setLog = function(proval, currentstatus, css){
  		if (proval!="") $scope.proval = proval;
  		if(currentstatus!="") $scope.currentstatus = currentstatus;
  		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
 	}

	$scope.deleterecord2 = function(serialNumber,misreport)
	{
			console.log("===misreport=="+JSON.stringify(misreport));
			$scope.deleteclgDate = $filter('date')(new Date($scope.formdata.octmotherchequeentry__clgDate.split('/').join('/')), "yyyy-MM-dd");
			$scope.deleterecord1 = deleteotherrecord.get({
							   "batchId": misreport.batchId ,			                               
							   "lotNumber":misreport.lotNumber,
							   "serialNumber":misreport.serialNumber,"clgDate":$scope.deleteclgDate});

			$scope.deleterecord1.$promise.then(function(response){
				$scope.setLog(30,"Please wait Deleting Record","");
			if(response.result == true)
			{
					toastr.success("Record deleted successfully! DELETED ID : "+serialNumber,'Done');
					$scope.setLog(50,"Please wait Record deleting","");
					$scope.setLog(100,"Record Saved successfully","");
						$timeout(function(){
							$scope.proval = 0;
						}, 1000);
					$scope.chequelist();
					$scope.tableParams.reload();
			}
			else{
				toastr.error("Record Not Deleted");
				$scope.setLog(50,"Please wait Record deleting","");
				$scope.setLog(100,"Record Saved successfully","");
						$timeout(function(){
							$scope.proval = 0;
						}, 1000);
			}
		})
	}	

	$scope.formdata9={};
	$scope.update = function(otherchequeentry,misreport,flag)
	{
		console.log("cheque----"+otherchequeentry);
		console.log("mmmmmmmmmmm----"+JSON.stringify(misreport));
		$scope.endDate = $filter('date')(new Date(),"yyyy-MM-dd HH:mm:ss");
	$scope.formdata9.octmotherchequeentry__serialNumber = misreport.serialNumber;
	$scope.formdata9.octmotherchequeentry__lotNumber = misreport.lotNumber;
	$scope.formdata9.octmotherchequeentry__clgDate = misreport.clgDate;
	//$scope.formdata.octmotherchequeentry__nonCtsCategory = {};
	$scope.formdata9.octmotherchequeentry__chequeDate = $filter('date')(new Date(misreport.chequeDate.split('/').join('/')), "yyyy-MM-dd");
	$scope.formdata9.octmotherchequeentry__cardNumber = misreport.cardNumber;
	$scope.formdata9.octmotherchequeentry__shortMicrCode = misreport.shortMicrCode;
	//$scope.formdata.octmotherchequeentry__cardType = misreport.;
	$scope.formdata9.octmotherchequeentry__cardNumber = misreport.cardNumber;
	//$scope.formdata.octmotherchequeentry__reason = misreport.reasonName;
	$scope.formdata9.octmotherchequeentry__debitAccountNumber = misreport.debitAccountNumber;
	$scope.formdata9.octmotherchequeentry__accountNumber = misreport.accountNumber;
	$scope.formdata9.octmotherchequeentry__accountNumber2 = misreport.accountNumber2;
	$scope.formdata9.octmotherchequeentry__chequeNumber = misreport.chequeNumber;
	$scope.formdata9.octmotherchequeentry__chequeAmount = misreport.chequeAmount;
	$scope.formdata9.octmotherchequeentry__micrCode = misreport.micrCode;
	$scope.formdata9.octmotherchequeentry__transCode = misreport.transCode;
	$scope.formdata9.octmotherchequeentry__payeeName = misreport.payeeName;
	$scope.formdata9.octmotherchequeentry__draweeName = misreport.draweeName;
	$scope.formdata9.octmotherchequeentry__chequeAmnt = misreport.chequeAmnt;
	$scope.formdata9.octmotherchequeentry__solId = misreport.solId;
	//$scope.formdata.octmotherchequeentry__ProcessId = "7";
	$scope.formdata9.octmotherchequeentry__userCode = misreport.userCode;
	console.log("====formdata======"+JSON.stringify($scope.formdata9));
		$scope.otherChequeentryId = parseInt(misreport.otherChequeentryId)+1;
		$scope.Fields = new Fields();
		$scope.Fields.formData=$scope.formdata9;		
		$scope.Fields.whr="  AND otherChequeentryId="+misreport.otherChequeentryId;
		$scope.Fields.$save(function (response) {
			
			console.log("other cheque entry id----"+$scope.otherChequeentryId);
			//$scope.formdata.octmotherchequeentry__clgDate = $filter('date')(new Date(misreport.clgDate.split('-').join('-')), "MM/dd/yyyy");
							$scope.Fields = new Fields();
							$scope.formdata9.octmotherchequeentry__chequeAmnt = 0;
							//$scope.formdata9.octmotherchequeentry__ProcessId = "8";
							$scope.Fields.formData=$scope.formdata9;
							$scope.Fields.whr="  AND otherChequeentryId="+$scope.otherChequeentryId;
							$scope.Fields.$save(function (response) {
												console.log("response----"+response);
												toastr.success('Record saved successfully!','Done');
												//$scope.tableParams.reload();
															
											});
							$scope.tableParams.reload();										
						});
		}

	$scope.checkdate1 = function(field)
	{
		if(field == "octmotherchequeentry__chequeDate")
		{
			if($scope.formdata.octmotherchequeentry__chequeDate == "" || $scope.formdata.octmotherchequeentry__chequeDate == undefined)
			{
				if($scope.cflag == true)
				{
					toastr.error("Cheque Date Is blank");
					$timeout(function(){
						$("#504").focus();
					}, 500);
				}
			}
			else
			{
				console.log($scope.formdata.octmotherchequeentry__chequeDate);
				$scope.date = $filter('date')(new Date($scope.formdata.octmotherchequeentry__chequeDate.split('-').join('-')), "yyyy-MM-dd");
								
				$scope.checkdate2 = checkdate.get();
				$scope.checkdate2.$promise.then(function(response){					
					if(response.status == "success")
					{
						if($scope.date < response.result[0].staleDate)
						{
							toastr.error('check date is Smaller than stale date!');
							$timeout(function(){
								$("#504").focus();
							}, 500);
							$scope.formdata.octmotherchequeentry__chequeDate='';
						}
						if($scope.date > response.result[0].pdcDate)
						{
							toastr.error('check date is greater than pdc date!');							
							$timeout(function(){
								$("#504").focus();
							}, 500);
							$scope.formdata.octmotherchequeentry__chequeDate='';
						}
					}
					else if(response.result == "error")
					{
						toastr.error('Cheque date is not valid!');						
						$timeout(function(){
								$("#504").focus();
							}, 500);
						$scope.formdata.octmotherchequeentry__chequeDate='';
					}
				});
			}
		}
	}
	$scope.lastcheq = function()
	{
		$scope.last = lastother.get({"user":$rootScope.SESS_USER.userId,"batchId":$scope.formdata.octmotherchequeentry__batchId,"clgdate":$scope.formdata.octmotherchequeentry__clgDate});
		$scope.last.$promise.then(function(response){
			console.log(JSON.stringify(response));
			$scope.lastChequeNumber = response.result[0].chequeNumber;
			$scope.lastChequeAmount = response.result[0].chequeAmount;
		})
	}
	
	$scope.change = function(field)
	{
		if(field == "octmotherchequeentry__shortMicrCode")
		{
			if($scope.formdata.octmotherchequeentry__shortMicrCode.length < 10 && $scope.formdata.octmotherchequeentry__shortMicrCode.length > 1)
			{
				$scope.number1 = "0000000000"+$scope.formdata.octmotherchequeentry__shortMicrCode;
				 $scope.formdata.octmotherchequeentry__shortMicrCode = $scope.number1.substring($scope.number1.length-10, $scope.number1.length);
				 
					 $scope.formdatadisplay();
				
			}
		}
		if(field == "octmotherchequeentry__solId")
		{
			if($scope.formdata.octmotherchequeentry__solId != "")
			{
					$scope.solId = getsolId.get({"solId":$scope.formdata.octmotherchequeentry__solId});
					$scope.solId.$promise.then(function(response){
					
						if(response.result == "")
						{
								toastr.error('SolId is not valid!');
								$timeout(function(){
									$("#523").focus();	
								}, 500);
						}
						else
						{
							if($scope.amountflag != true)
							{
								if($scope.shmicr == true && $scope.debitaccno == true)
								{
									$scope.formdatadisplay();
								}
							}
						}
					})
			}
			
		}
		if(field == "octmotherchequeentry__payeeName")
		{
			if(payname==false)
			{
				$timeout(function(){
					$("#515").focus();	
				}, 500);
			}
		}
		if(field == "octmotherchequeentry__debitAccountNumber")
		{
		  if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId=="40" || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId=="41" || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId=="42" || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId=="26")
		  {
			if($scope.formdata.octmotherchequeentry__transCode == "16" && $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId=="40")
			{				
				if($scope.formdata.octmotherchequeentry__debitAccountNumber.length == 4)
				{					
						$scope.formdata.octmotherchequeentry__debitAccountNumber = $scope.formdata.octmotherchequeentry__debitAccountNumber+"DDCENPAY";
						if($scope.shmicr == true)
						{
							$scope.formdatadisplay();
						}
				}
				else
				{
					toastr.error("Only Allowed 4 digits");
					$scope.formdata.octmotherchequeentry__debitAccountNumber = "";
					$timeout(function(){
										$("#522").focus();	
									}, 500);
				}
			}
			else if($scope.formdata.octmotherchequeentry__debitAccountNumber.length == 12)
			{
				 if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId=="26" || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId=="40")
		  		{
					if($scope.shmicr == true)
					{
						$scope.formdatadisplay();
					}
				}
				else
				{
					if($scope.shmicr == true)
					{
						$scope.formdatadisplay();
					}					
				}
			}
			else
			{
				toastr.error("Only 12 digits Allowed!");	
				$scope.formdata.octmotherchequeentry__debitAccountNumber = "";
				$timeout(function(){
										$("#522").focus();	
									}, 500);
			}
			
		  }
		  else
		  { 
			  if($scope.shmicr == true)
			  {
			  	$scope.formdatadisplay();
			  }
			  else
			  {
				$scope.formdatadisplay();  
			  }
		  }
		  
		}
		if(field == "octmotherchequeentry__chequeAmount")
		{
			if($scope.formdata.octmotherchequeentry__chequeAmount.includes(".")==false && $scope.formdata.octmchequeentry__chequeAmount != "" )
			{
				$scope.formdata.octmotherchequeentry__chequeAmount=$scope.formdata.octmotherchequeentry__chequeAmount+".00";
				$scope.word1 = $scope.convertNumberToWords($scope.formdata.octmotherchequeentry__chequeAmount);
				if($scope.amountflag == true)
				{
					$timeout(function(){
					$("#519").focus();	
				}, 500);
				}
			}
			
			if($scope.formdata.octmchequeentry__chequeAmount == "")
			{ 
				$scope.chqamnt = false;
				toastr.error("Please enter amount!");
				$timeout(function(){
					$("#508").focus();	
				}, 500);
			}
			else
			{
				$scope.chqamnt = true;
			}
		}
		if(field == "octmotherchequeentry__chequeAmnt")
		{
			if($scope.formdata.octmotherchequeentry__chequeAmnt != "")
			{
				if($scope.formdata.octmotherchequeentry__chequeAmnt.includes(".")==false)
				{
					$scope.formdata.octmotherchequeentry__chequeAmnt=$scope.formdata.octmotherchequeentry__chequeAmnt+".00";
				}
				if($scope.formdata.octmotherchequeentry__chequeAmnt != $scope.formdata.octmotherchequeentry__chequeAmount)
				{
					toastr.error('Cheque amount does not matched');
					$scope.chqamnt = false;
					$scope.amountflag = true;
					$scope.formdata.octmotherchequeentry__chequeAmnt = "";
					$scope.formdata.octmotherchequeentry__chequeAmount = "";
					$timeout(function(){
						$("#508").focus();	
					}, 500);
				}
				else if($scope.formdata.octmotherchequeentry__chequeAmnt == $scope.formdata.octmotherchequeentry__chequeAmount)
				{
					$scope.chqamnt = true;
					$scope.word2 = $scope.convertNumberToWords($scope.formdata.octmotherchequeentry__chequeAmnt);
					$scope.amountflag = false;
				}
			}	
		}
		if(field == "octmotherchequeentry__transCode")
		{
			if($scope.formdata.octmotherchequeentry__transCode == "00")
			{
				toastr.error(" '00' is Not Accepted in Trans Code");
				$scope.formdata.octmotherchequeentry__transCode = "";
				$timeout(function(){
									$("#513").focus();	
								}, 500);
			}
			if($scope.formdata1.iciciBankCreditCard==true)
			{
				$timeout(function(){
									$("#519").focus();	
								}, 500);
			}
			
		}
		if(field == "octmotherchequeentry__micrCode")
		{
			if($scope.formdata.octmotherchequeentry__micrCode == "")
			{
				toastr.error('Micr code is blank!');
			}			
			$scope.micr = getmicrcode.get({"micrCode":$scope.formdata.octmotherchequeentry__micrCode});
			$scope.micr.$promise.then(function(response){
				if(response.result == "")
				{
					toastr.error('Micr code is wrong!');
					$timeout(function(){
						$("#510").focus();	
					}, 500);
				}
				else{
					$scope.micr1 = response.result[0].bankName;
				}
			})
		}
		if(field == "octmotherchequeentry__batchId")
		{
				$timeout(function(){
					$("#502").focus();
				}, 500);
			if($scope.formdata.octmotherchequeentry__batchId == "" || $scope.formdata.octmotherchequeentry__batchId == undefined)
			{
				toastr.error('Batch id is blank');
			}
			else
			{
				$scope.lotcategory = getlotcategory.get({"batchId":$scope.formdata.octmotherchequeentry__batchId,"clgdate":$scope.formdata.octmotherchequeentry__clgDate,"type":"Othercheque Entry"});
				$scope.lotcategory.$promise.then(function(response)
				{
					if(response.result == "")
					{
						toastr.error('Batch number is wrong');
						$scope.formdata.octmotherchequeentry__batchId = "";
						$scope.formdata.octmotherchequeentry__clgDate = "";
						$timeout(function(){
							$("#1078").focus();	
						}, 500);
					}
					else if(response.result[0].Status == "14")
						{
							toastr.error("Batch Is Finished");
							$scope.formdata.octmotherchequeentry__batchId = "";
							$scope.formdata.octmotherchequeentry__clgDate = "";
							$timeout(function(){
								$("#1078").focus();
							}, 500);
						}
					else
					{
						$scope.lastcheq();
						$scope.formdata.octmotherchequeentry__lotNumber = response.result[0].lotId;
						console.log("lot number=="+JSON.stringify(response.result[0].lotId));
						$scope.formdata.octmotherchequeentry__clgDate = $filter('date')(response.result[0].clgdate,"MM/dd/yyyy");
						$scope.serailnumber1 = getserialnumber.get({"batchId":$scope.formdata.octmotherchequeentry__batchId,
															"clgdate":$filter('date')(new Date($scope.formdata.octmotherchequeentry__clgDate.split('-').join('-')), "mediumDate"),"lotnumber":$scope.formdata.octmotherchequeentry__lotNumber,
															"type":"Othercheque Entry"})
						$scope.serailnumber1.$promise.then(function(response){
								console.log("serial no response==="+JSON.stringify(response));
								if(response.result == "" || response.result[0].serialNumber == null)
								{
									$scope.formdata.octmotherchequeentry__serialNumber = 1;
								}
								else{
								$scope.formdata.octmotherchequeentry__serialNumber = parseInt(response.result[0].serialNumber)+1;
								}
						})
						$scope.user = $rootScope.SESS_USER.fullName;
					}
				})
			}
		}
		if(field == "octmotherchequeentry__accountNumber")
		{
			if($scope.formdata.octmotherchequeentry__accountNumber.length == 12)
			{
				$scope.accno1 = true;
			}
		}	
	
		if(field == "octmotherchequeentry__accountNumber2")
		{
				if($scope.formdata.octmotherchequeentry__accountNumber2 != $scope.formdata.octmotherchequeentry__accountNumber)
				{
					$scope.accno1 = false;
					toastr.error('Account number is not matched!');
					$scope.formdata.octmotherchequeentry__accountNumber2 = "";
					$scope.formdata.octmotherchequeentry__accountNumber = "";
					$timeout(function(){
						$("#505").focus();	
					}, 500);
				}
				else if($scope.formdata.octmotherchequeentry__accountNumber2 == $scope.formdata.octmotherchequeentry__accountNumber)
				{
					$scope.accno1 = true;
					$scope.NRECheque = getNRECheque.get({"accountNumber2":$scope.formdata.octmotherchequeentry__accountNumber2});
					$scope.NRECheque.$promise.then(function(response){
					console.log(JSON.stringify(response));
						if(response.result!="")
						{
							alert("NRE Cheque");							
						}
						else{
							
						}
					});
					
				}
		}
		if(field == "octmotherchequeentry__chequeNumber")
		{
			if($scope.formdata.octmotherchequeentry__chequeNumber.length < 6)
			{
				$scope.number1 = "000000"+$scope.formdata.octmotherchequeentry__chequeNumber;
				 $scope.formdata.octmotherchequeentry__chequeNumber = $scope.number1.substring($scope.number1.length-6, $scope.number1.length); 
			}
		}
		if(field == "octmotherchequeentry__draweeName")
		{
			if($scope.formdata.octmotherchequeentry__draweeName.length > 17)
			{
				toastr.error('Drawee name should be 17 in length!');
			}
		} 
		
		if(field == "octmotherchequeentry__cardNumber")
		{	
			if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 18 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 23 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 29 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 30)
			{
				if($scope.formdata.octmotherchequeentry__cardNumber.length > 1)
				{
					if($scope.formdata.octmotherchequeentry__cardNumber.length > 16 || $scope.formdata.octmotherchequeentry__cardNumber.length < 15)
					{ 
						$scope.cflag=false;
						toastr.error("Card Number should be 15 Or 16 digits!");
						$scope.formdata.octmotherchequeentry__cardNumber = "";						
						$scope.cardType = true;
						$scope.formdata.octmotherchequeentry__cardType = "";
						$timeout(function(){
									$("#506").focus();	
								}, 500);
					}
					else{
						$scope.cardrange = getcheckrange.get({"cardnumber":$scope.formdata.octmotherchequeentry__cardNumber});
						$scope.cardrange.$promise.then(function(response){
							if(response.result == "")
							{
								toastr.error("Card Out Of Range");
								$scope.cardType = true;
								$timeout(function(){
									$("#506").focus();	
								}, 500);
							}
							else
							{
								$scope.cflag=true;
								if($scope.formdata.octmotherchequeentry__cardNumber.length == 16)
								{
									$scope.cardType = false;
									$scope.formdata.octmotherchequeentry__cardType = "VISA";
								}
								else if($scope.formdata.octmotherchequeentry__cardNumber.length == 15)
								{
									$scope.cardType = false;
									$scope.formdata.octmotherchequeentry__cardType = "AMEX";
								}
							}	
						})
					}
				}
			}
			else{
				$scope.chqdt = false;
				$scope.cflag=true;
				$scope.cardType = true;				
			}
	}
	
	if(field == "octmotherchequeentry__cardNumber2")
	{
			if($scope.formdata.octmotherchequeentry__cardNumber2 != $scope.formdata.octmotherchequeentry__cardNumber)
			{
				$scope.cflag = false;
				toastr.error('Card number is not matched!');
				$scope.formdata.octmotherchequeentry__cardNumber2 = "";
				$scope.formdata.octmotherchequeentry__cardNumber = "";
				$timeout(function(){
					$("#506").focus();	
				}, 500);
			}
			else if($scope.formdata.octmotherchequeentry__cardNumber2 == $scope.formdata.octmotherchequeentry__cardNumber)
			{
				$scope.formdata.octmotherchequeentry__accountNumber = "";
				$scope.formdata.octmotherchequeentry__accountNumber2 = "";
			}
	}
}
	$scope.FinishBatch = function()
	{
		$scope.disabled=true;
		if($scope.formdata.octmotherchequeentry__batchId == "")
		{
			toastr.error("Please Enter Batch Number");
			$timeout(function(){
				$("#499").focus();
		}, 500);
		}
		else{
			$scope.change("octmchequeentry__batchNumber");
			$scope.formdata.octmotherchequeentry__clgDate = $filter('date')(new Date($scope.formdata.octmotherchequeentry__clgDate.split('-').join('-')), "mediumDate");
			console.log("batch Id :- "+$scope.formdata.octmotherchequeentry__batchNumber);
			console.log("clg Date :- "+$scope.formdata.octmotherchequeentry__clgDate);
			console.log("lot Number :- "+$scope.formdata.octmotherchequeentry__lotNumber);			
			$scope.finishchequeentrybatch = getbatchfinish.get({"batchId":$scope.formdata.octmotherchequeentry__batchId,
															"clgdate":$scope.formdata.octmotherchequeentry__clgDate,
															"lotnumber":$scope.formdata.octmotherchequeentry__lotNumber,
															"type":"Othercheque Entry"});
			$scope.finishchequeentrybatch.$promise.then(function(response){
			console.log(JSON.stringify(response));
			if(response.result == true)
			{
				toastr.success("Batch successfully Finished");
				$scope.formdata.octmotherchequeentry__batchId = "";
				$scope.formdata.octmotherchequeentry__lotNumber = "0";
				$scope.formdata.octmotherchequeentry__serialNumber = "0";	
			}
			else{
				toastr.error("Batch Not finished Due Some Error");
			}
		})
		}
		
	}
$scope.chqdate = false;
$scope.flag=0;
$scope.changeFocus = function(field)
{ 
	if(field == "octmotherchequeentry__nonCtsCategory")
	{
		$timeout(function(){
				$("#505").focus();
		}, 500);
	}
}

$scope.valuechange = function(field)
{
	if(field.model == "octmotherchequeentry__nonCtsCategory")
	{
		 if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 13 ||
		   	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 16 ||
		   	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 21 ||
		   	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 28 ||
			$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 39)
			{ 
				$scope.formdata.octmotherchequeentry__accountNumber = '0106SL0COLLN';
				$scope.formdata.octmotherchequeentry__accountNumber2 = '0106SL0COLLN';
 				     $scope.$apply(function () {
   				         var obj = $scope.sections[0].sortedFields[2][1];
						obj.allowedChars = '[A-Z0-9-]+'; 
     				   });
					   if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 13 || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 21 || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 39 || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 26)
					   {
						   $timeout(function(){
								$("#508").focus();
								}, 500);
					   }else if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 16 || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 28)
					   {
						   $timeout(function(){
								$("#504").focus();
								}, 500);
					   }
			}
			else{
				$scope.$apply(function () {
				 var obj = $scope.sections[0].sortedFields[2][1];
				 obj.allowedChars = '[0-9-]+';
			   });
			}
			
			if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 14 ||
		   	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 25 ||
		   	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 32 ||
		   	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 37 ||
			$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 38 ||
			$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 33)
			{ 
				$scope.formdata.octmotherchequeentry__accountNumber = '00000106SL0COLLN';
				$scope.formdata.octmotherchequeentry__accountNumber2 = '00000106SL0COLLN';
 				     $scope.$apply(function () {
   				         var obj = $scope.sections[0].sortedFields[2][1];
						obj.allowedChars = '[A-Z0-9-]+'; 
     				   });
					   if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 14 || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 25 || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 32 || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 38 || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 20 || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 33)
					   {
						   $timeout(function(){
								$("#508").focus();
								}, 500);
					   }else if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 37)
					   {
						   $timeout(function(){
								$("#504").focus();
								}, 500);
					   }
			}
			else{
				$scope.$apply(function () {
				 var obj = $scope.sections[0].sortedFields[2][1];
				 obj.allowedChars = '[0-9-]+';
			   });
			}
			
			if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 18 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 19 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 23 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 24 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 29 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 30)
			{
				$scope.carNum2=false;	
				$scope.cflag = false;
				$scope.accno1 = true;
				$scope.accno2 = true;
				$timeout(function(){
					$("#506").focus();
				}, 500);
				$scope.formdata.octmotherchequeentry__accountNumber = "";
				$scope.formdata.octmotherchequeentry__accountNumber2 = "";
			}
			else{
				$scope.carNum2=true;
				$scope.cflag = true;
				$scope.accno1 = false;
				$scope.accno2 = false;
			}
			if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 20 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 26 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 31 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 13 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 14 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 21 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 18 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 22 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 25 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 32 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 33 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 38 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 39 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 40 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 34 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 23 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 19 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 24 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 29 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 16 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 28)
			{
				$scope.shmicr = true;
			}
			else{
				$scope.shmicr = false;
			}
			
			if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 20 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 13 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 14 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 21 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 22 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 25 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 32 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 33 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 38 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 39 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 34)
			{
				$scope.chqdt = true;
			}
			else{
				$scope.chqdt = false;
			}
			if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 13 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 14 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 21 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 22 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 25 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 32 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 33 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 38 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 39 )
			{
				$scope.payname = true;
			}
			else{
				$scope.payname = false;
			}
			if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 20 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 26 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 31 || 
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 13 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 14 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 21 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 22 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 25 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 32 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 33 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 38 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 39 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 34 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 40 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 41 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 42)
			{
				$scope.iciciCreditCardBox = true;
			}
			else{
				$scope.iciciCreditCardBox = false;
			}
			if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 13 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 14 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 21 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 34 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 18 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 23 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 22 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 25 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 32 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 33 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 38 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 39 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 19 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 24 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 29)
			{
				$scope.drawname = true;
			}
			else{
				$scope.drawname = false;
			}
			if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 13 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 14 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 21 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 22 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 25 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 32 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 33 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 38 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 20 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 31 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 39 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 19 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 24 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 16 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 28)
			{
				$scope.debitaccno = true;
			}
			else{ 
				$scope.debitaccno = false;
			}
			
			if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 13 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 14 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 21 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 34 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 18 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 23 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 22 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 25 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 32 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 33 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 38 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 18 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 23 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 39 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 29 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 41 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 42 ||
				$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 40)
			{
				$scope.reasondp = true;
			}
			else{
				$scope.reasondp = false;
			}
	}
}
$scope.chequelist = Array();
$scope.chequelist1 = function()
	{
			if($scope.formdata.octmotherchequeentry__batchId == "")
			{
				toastr.error('Please Enter Batch Id !');
			}
			else
			{
				$scope.octmotherchequeentry__clgDate = $filter('date')(new Date($scope.formdata.octmotherchequeentry__clgDate.split('/').join('/')), "yyyy-MM-dd");
				$scope.showlist = false;
				$scope.hidelist = true;
				$scope.chequelisttable = true;
				$scope.showlist1 = getshowlist1.get({"batchId":$scope.formdata.octmotherchequeentry__batchId,"user":$rootScope.SESS_USER.userId,"clgDate":$scope.octmotherchequeentry__clgDate});
				$scope.showlist1.$promise.then(function(response){
					$scope.chequelist = response.result
					$scope.totalrecords = response.result.length;
					if(response.result!="")
					{
						$scope.amountcategory = response.result[0].categoryAmount;
					}
					else
					{
						toastr.error('No record found!','error');
					}
					$scope.tableParams.reload();
				})
			}
	}
	$scope.hide = function()
	{
		$scope.showlist = true;
		$scope.hidelist = false;
		$scope.chequelisttable = false;
	}

	$scope.CreateBatch=function()
	{
			$scope.disabled=true;
	}


$scope.formdatadisplay = function()
{ 
	$scope.formdata.octmotherchequeentry__clgDate = $filter('date')(new Date($scope.formdata.octmotherchequeentry__clgDate.split('/').join('/')), "yyyy-MM-dd");
	$scope.valid11 = true;	
	if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem==undefined)
	{
		toastr.error("Category Not Selected");
		$scope.valid11 = false;
	}
	if($scope.formdata.octmotherchequeentry__batchId == "")
	{
		toastr.error("Please Enter Batch Id");
		$timeout(function(){
				$("#499").focus();
		}, 500);
		$scope.valid11 = false;
	}

	if($scope.formdata.octmotherchequeentry__chequeNumber == "")
	{
		toastr.error("Please Enter Cheque Number");
		$timeout(function(){
				$("#507").focus();
		}, 500);
		$scope.valid11 = false;
	}
	if($scope.formdata.octmotherchequeentry__chequeAmount == "")
	{
		toastr.error("Please Enter Cheque Amount");
		$timeout(function(){
				$("#508").focus();
		}, 500);
		$scope.valid11 = false;
	}
	if($scope.formdata.octmotherchequeentry__micrCode == "")
	{	
		toastr.error("Please Enter Micr Code");
		$timeout(function(){
				$("#510").focus();
		}, 500);
		$scope.valid11 = false;
	}
	if($scope.formdata.octmotherchequeentry__transCode == "")
	{
		toastr.error("Please Enter Trans Code");
		$timeout(function(){
				$("#513").focus();
		}, 500);
		$scope.valid11 = false;
	}
	if($scope.formdata.octmotherchequeentry__chequeAmnt == "")
	{
		toastr.error("Please Enter Cheque Amount");
		$timeout(function(){
				$("#519").focus();
		}, 500);
		$scope.valid11 = false;
	}
	if($scope.formdata.octmotherchequeentry__solId == "")
	{
		toastr.error("Please Enter Sol Id");
		$timeout(function(){
				$("#523").focus();
		}, 500);
		$scope.valid11 = false;
	}
	if($scope.accno1 == "false" || $scope.accno2 == "false")
	{
		if($scope.formdata.octmotherchequeentry__accountNumber == "")
		{
			toastr.error("Please Enter Account Number")
			$timeout(function(){
					$("#505").focus();
			}, 500);
			$scope.valid11 = false;
		}
		if($scope.formdata.octmotherchequeentry__accountNumber2 == "")
		{
			toastr.error("Please Enter Second Account Number");
			$timeout(function(){
					$("#1045").focus();
			}, 500);
			$scope.valid11 = false;
		}
		if($scope.formdata.octmotherchequeentry__cardType.selectedItem==undefined)
		{
			toastr.error("Card Type Not Selected");
			$scope.valid11 = false;
		}
	}
	if($scope.drawname == false)
	{
		/*if($scope.formdata.octmotherchequeentry__draweeName == "")
		{
			toastr.error("Please Enter Drawee Name");
			$timeout(function(){
					$("#1052").focus();
			}, 500);
			$scope.valid11 = false;
		}*/
	}
	if($scope.payname == false)
	{
		if($scope.formdata.octmotherchequeentry__payeeName == "")
		{
			toastr.error("Please Enter Payee Name");
			$timeout(function(){
					$("#514").focus();
			}, 500);
			$scope.valid11 = false;
		}
	}
	if($scope.debitaccno==false)
	{
		if($scope.formdata.octmotherchequeentry__debitAccountNumber == "")
		{
			toastr.error("Please Enter debit Account Number");
			$timeout(function(){
					$("#522").focus();
			}, 500);		
			$scope.valid11 = false;
		}
	}
	if($scope.cflag == false)
	{
		if($scope.formdata.octmotherchequeentry__cardNumber == "")
		{
			toastr.error("Please Enter Card Number");
			$timeout(function(){
					$("#506").focus();
			}, 500);
			$scope.valid11 = false;		}
	}
	 if($scope.reasondp==false)
	{
		if($scope.formdata.octmotherchequeentry__reason.selectedItem == undefined)
		{
			toastr.error("Reason Not Selected");
			$scope.valid11 = false;
		}
	}
	else
	{
		$scope.formdata.octmotherchequeentry__reason = "";
	}

	 if($scope.chqdt == false)
	{
		if($scope.formdata.octmotherchequeentry__chequeDate == "")
		{
			toastr.error("Please Enter Cheque Date");
			$scope.valid11 = false;
			$timeout(function(){
						$("#504").focus();
					}, 500);
		}
	}
	if($scope.valid11)
	{
		if($scope.formdata.octmotherchequeentry__chequeAmount != $scope.formdata.octmotherchequeentry__chequeAmnt)
		{
			toastr.error('Amount does not match!','error');
		}
		else
		{
			$scope.setLog(30,"Please wait Saving Record","");
			$scope.endDate=  $filter('date')(new Date(),"yyyy-MM-dd HH:mm:ss");	
			$scope.startDate=  $filter('date')(new Date(),"yyyy-MM-dd HH:mm:ss");
			$scope.formdata.octmotherchequeentry__endTime=$scope.endDate;
			$scope.formdata.octmotherchequeentry__startTime=$scope.startDate;
			$scope.formdata.octmotherchequeentry__userCode = $rootScope.SESS_USER.userId
			//ENTRY FOR FIRST PASS
			$scope.formdata.octmotherchequeentry__chequeDate = $filter('date')(new Date($scope.formdata.octmotherchequeentry__chequeDate.split('/').join('/')), "yyyy-MM-dd");
					
			$scope.Fields = new Fields();
			$scope.Fields.formData=angular.copy($scope.formdata);
			$scope.Fields.formData.octmotherchequeentry__ProcessId = "7";
			angular.forEach($scope.Fields.formData, function(value,key) {
      			console.log(JSON.stringify(value));
				if(value.selectedItem){
        		$scope.Fields.formData[key] = value.selectedItem.dbval;
      			}
				if(value == "{}" ){
        		$scope.Fields.formData[key] = "";
      			}
     		}); 
					
			$scope.Fields.whr = "";			
			$scope.Fields.$save(function (response) {			
				$scope.setLog(50,"Please wait Saving Record","");
				toastr.success('Record saved successfully!','Done');
				$scope.disabled=false;
				$scope.lastChequeAmount = $scope.formdata.octmotherchequeentry__chequeAmount;
				$scope.lastChequeNumber = $scope.formdata.octmotherchequeentry__chequeNumber;
				
				//BLANK ENTRY FOR SECOND PASS
				$scope.Fields2 = new Fields();					
				$scope.Fields2.formData=angular.copy($scope.formdata);				
				angular.forEach($scope.Fields2.formData, function(value,key) {
				if(value.selectedItem){
        			$scope.Fields2.formData[key] = value.selectedItem.dbval;
      			}
					if(value == "{}" ){
					$scope.Fields2.formData[key] = "";
      			}
     			}); 
				
				$scope.Fields2.formData.octmotherchequeentry__chequeAmnt = 0;
				$scope.Fields2.formData.octmotherchequeentry__endTime = 0;
				$scope.Fields2.formData.octmotherchequeentry__ProcessId = "8";
				$scope.Fields2.whr="";
				$scope.Fields2.$save(function (response) {
					$scope.setLog(80,"Please wait Saving Record","");
					$scope.formdata.octmotherchequeentry__serialNumber = $scope.formdata.octmotherchequeentry__serialNumber + 1;
					$scope.formdata.octmotherchequeentry__clgDate = $filter('date')($scope.formdata.octmotherchequeentry__clgDate.split('/').join('/'), "MM/dd/yyyy");
					$scope.lastcheq();
					if($scope.formdata1.bulkEntry == true)
					{ 
						if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 18 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 19 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 23 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 24 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 29 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 30)
							{
								$scope.cflag = false;
								$scope.accno1 = true;								
							}
							else{ 
								$scope.cflag = true;
								$scope.accno1 = false;
							}
						$scope.formdata.octmotherchequeentry__chequeDate ="";
						$scope.formdata.octmotherchequeentry__chequeNumber = ""; 
						$scope.formdata.octmotherchequeentry__chequeAmount = "";
						$scope.formdata.octmotherchequeentry__chequeAmnt = "";
						if($scope.cflag==false)
						{
							
							$timeout(function(){
								$("#506").focus();
							}, 500);
							
						}
						else if($scope.accno1 == false)
						{
							///  FOR FIX ACCOUNT NUMBER IN AIRTE, CTS REJECTION, DELHI JAL BOARD, TIKANO, ICICI REJECTION
							 if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 13 ||
							  	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 21 ||
							  	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 39 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 14 ||
							  	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 25 ||
							  	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 32 ||
							    $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 33 || 
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 38)
							   { //alert("IN1");
								   $timeout(function(){
										$("#508").focus();
										}, 500);
										
							   }else if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 16 ||
							    $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 28 || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 37 || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 28)
							   {
								   $timeout(function(){
										$("#504").focus();
										}, 500);
							   }
							   else
							   { 
								   if($scope.cflag==false)
									{
										$timeout(function(){
											$("#506").focus();
										}, 500);
									}
									else if($scope.accno1 == false)
									{
										$timeout(function(){
											$("#505").focus();
										}, 500);
									}
								   	$scope.formdata.octmotherchequeentry__accountNumber = "";
									$scope.formdata.octmotherchequeentry__accountNumber2 = "";
							   }	
					
						}
						$scope.chqamnt = false;
						$scope.word1 = "zero Rupees and zero Paise";
						$scope.word2 = "zero Rupees and zero Paise";
					}
					else if($scope.formdata1.iciciBankCreditCard == true)
					{ 
							if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 18 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 19 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 23 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 24 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 29 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 30)
							{
								$scope.cflag = false;
								$scope.accno1 = true;
								
							}
							else{ 
								$scope.cflag = true;
								$scope.accno1 = false;
							}
						///  FOR FIX ACCOUNT NUMBER IN AIRTE, CTS REJECTION, DELHI JAL BOARD, TIKANO, ICICI REJECTION
							 if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 13 ||
							  	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 21 ||
							  	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 39 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 26 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 14 ||
							  	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 25 ||
							  	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 32 ||
							    $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 33 || 
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 38)
							   { //alert("IN1");
								   $timeout(function(){
										$("#508").focus();
										}, 500);
										
							   }else if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 16 ||
							    $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 28 || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 37)
							   {
								   $timeout(function(){
										$("#504").focus();
										}, 500);
							   }
							   else
							   { 
								   if($scope.cflag==false)
									{
										$timeout(function(){
											$("#506").focus();
										}, 500);
									}
									else if($scope.accno1 == false)
									{
										$timeout(function(){
											$("#505").focus();
										}, 500);
									}
								   	$scope.formdata.octmotherchequeentry__accountNumber = "";
									$scope.formdata.octmotherchequeentry__accountNumber2 = "";
							   }	
							   
						$scope.formdata.octmotherchequeentry__chequeDate = "";
						$scope.formdata.octmotherchequeentry__cardNumber = "";
						$scope.formdata.octmotherchequeentry__cardNumber2 = "";
						$scope.formdata.octmotherchequeentry__shortMicrCode = "";
						$scope.formdata.octmotherchequeentry__debitAccountNumber = "";						
						$scope.formdata.octmotherchequeentry__chequeNumber = "";
						$scope.formdata.octmotherchequeentry__chequeAmount = "";
						$scope.formdata.octmotherchequeentry__micrCode = "";
						$scope.formdata.octmotherchequeentry__transCode = "";					
						$scope.formdata.octmotherchequeentry__draweeName = "";
						$scope.formdata.octmotherchequeentry__chequeAmnt = "";
						$scope.formdata.octmotherchequeentry__cardType = "";
						$scope.formdata.octmotherchequeentry__solId = "";
						$scope.word1 = "zero Rupees and zero Paise";
						$scope.word2 = "zero Rupees and zero Paise";	
						$scope.formdata.octmotherchequeentry__reason = {};
						$scope.chqamnt = false;
					}
					else
					{ 
						if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 18 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 19 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 23 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 24 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 29 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 30)
							{
								$scope.cflag = false;
								$scope.accno1 = true;								
							}
							else{ 
								$scope.cflag = true;
								$scope.accno1 = false;
							}
						///  FOR FIX ACCOUNT NUMBER IN AIRTE, CTS REJECTION, DELHI JAL BOARD, TIKANO, ICICI REJECTION
							 if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 13 ||
							  	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 21 ||
							  	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 39 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 26 ||
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 14 ||
							  	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 25 ||
							  	$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 32 ||
							    $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 33 || 
								$scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 38)
							   { //alert("IN1");
								   $timeout(function(){
										$("#508").focus();
										}, 500);
										
							   }else if($scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 16 ||
							    $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 28 || $scope.formdata.octmotherchequeentry__nonCtsCategory.selectedItem.nonCtsCategoryId == 37)
							   {
								   $timeout(function(){
										$("#504").focus();
										}, 500);
										
							   }
							   else
							   { 
								   if($scope.cflag==false)
									{
										$timeout(function(){
											$("#506").focus();
										}, 500);
									}
									else if($scope.accno1 == false)
									{
										$timeout(function(){
											$("#505").focus();
										}, 500);
									}
								   	$scope.formdata.octmotherchequeentry__accountNumber = "";
									$scope.formdata.octmotherchequeentry__accountNumber2 = "";
							   }	
								
						$scope.formdata.octmotherchequeentry__chequeDate = "";
						$scope.formdata.octmotherchequeentry__cardNumber = "";
						$scope.formdata.octmotherchequeentry__cardNumber2 = "";
						$scope.formdata.octmotherchequeentry__shortMicrCode = "";
						$scope.formdata.octmotherchequeentry__debitAccountNumber = "";
						$scope.formdata.octmotherchequeentry__chequeNumber = "";
						$scope.formdata.octmotherchequeentry__chequeAmount = "";
						$scope.formdata.octmotherchequeentry__micrCode = "";
						$scope.formdata.octmotherchequeentry__transCode = "";
						$scope.formdata.octmotherchequeentry__payeeName = "";
						$scope.formdata.octmotherchequeentry__draweeName = "";
						$scope.formdata.octmotherchequeentry__chequeAmnt = "";
						$scope.formdata.octmotherchequeentry__cardType = "";
						$scope.word1 = "zero Rupees and zero Paise";
						$scope.word2 = "zero Rupees and zero Paise";
						$scope.formdata.octmotherchequeentry__solId = "";
						$scope.formdata.octmotherchequeentry__reason = {};
						$scope.chqamnt = false;
					}
					
					$scope.CreateBatch();
					$scope.setLog(100,"Record Save successfully","");
      				$timeout(function(){
       					$scope.proval = 0;
      				}, 1000);
					
			 
				})
			
			
			});
		}
	
	}

}
	
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								serialNumber: 'asc',
								clgDate:'desc',
								chequeDate:'desc',
								accountNumber: 'desc',
								chequeNumber: 'desc',
								cardNumber:'desc',
								micrCode: 'desc',
								shortMicrCode:'desc',
								payeeName:'desc',
								transCode:'desc',
								solId:'desc',
								cardType:'desc',
								debitAccountNumber:'desc',
								categoryAmount: 'desc',
								chequeAmount: 'desc'
						},
						filter: {
								serialNumber: '',
								clgDate:'',
								chequeDate:'',
								accountNumber: '',
								chequeNumber: '',
								cardNumber:'',
								micrCode: '',
								shortMicrCode:'',
								payeeName:'',
								transCode:'',
								solId:'',
								cardType:'',
								debitAccountNumber:'',
								categoryAmount: '',
								chequeAmount: ''
						}
	
					}, {
							total: $scope.chequelist.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.chequelist, params.filter()) : $scope.chequelist;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
						}
					});
});
bpoApps.controller("OCTMicicirejectioncontroller",function($scope,Sections,getreport,getuserreport,$filter,getrejection,getdailymis,ngTableParams,getbatchslip,Fields,$location,$timeout,$parse)
{
 $scope.formdata = {};
 $scope.formdata.clgdate = "";
 $scope.formdata.lotNumber = {};
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
   $scope.format = $scope.formats[0];
   $scope.batchslip = new Array();
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
 	$scope.getrejection = function()
	{
		$scope.reportdata = getrejection.get({"clgdate":$scope.formdata.clgdate,"lotnumber":$scope.formdata.lotNumber.selectedItem.lotNumber});
				$scope.reportdata.$promise.then(function(response){
				$scope.batchslip = response.result;
				//console.log("--------"+$scope.batchslip2);
				$scope.tableParams.reload();
			});
	}
		 $scope.tableParams = new ngTableParams({
      debugMode: true,
      page: 1, 
      count: 10,
      sorting: {
        chequeNumber: 'desc',
        categoryAmount: 'desc',
        chequeAmount: 'desc',
		payeeName: 'desc',
        chequeDate: 'desc',
        micrCode: 'desc',
		reason: 'desc'
      },
      filter: {
       chequeNumber: '',
        categoryAmount: '',
        chequeAmount: '',
		payeeName: '',
        chequeDate: '',
        micrCode: '',
		reason: ''
      }
 
     }, {
       total: $scope.batchslip.length,
       getData: function ($defer, params) {
          var filteredData = params.filter() ? $filter('filter')($scope.batchslip, params.filter()) : $scope.batchslip;
          var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
          params.total(orderedData.length);
          $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
       }
     });

});

bpoApps.controller("OCTMcategoryreportcontroller",function($scope,Sections,getoutstation,getcategoryreport,$filter,getcreditmis,getdailymis,ngTableParams,getbatchslip,Fields,$location,$timeout,$parse)
{
		$scope.formdata = {};
	$scope.formdata.clgdate = "";
	$scope.formdata.lotNumber = {};
	$scope.formdata.batchId = {};
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
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
		$scope.batchslip = new Array();
		$scope.reportdata = getcategoryreport.get();
		$scope.reportdata.$promise.then(function(response){
			$scope.batchslip = response.result;
			//console.log("--------"+JSON.stringify($scope.batchslip));
			$scope.tableParams.reload();
		});

		$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								date: 'desc',
								category: 'asc',
								Total: 'desc'
						},
						filter: {
							date: '',
							category: '',
							Total: ''
						}
					}, {
							total: $scope.batchslip.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.batchslip, params.filter()) : $scope.batchslip;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count()));
							  // console.log("----->"+JSON.stringify($scope.data)); 
						}
					});
})
bpoApps.controller("OCTMlotreportcontroller",function($scope,Sections,getoutstation,getlotreport,$filter,getcreditmis,getdailymis,ngTableParams,getbatchslip,Fields,$location,$timeout,$parse)
{
			$scope.formdata = {};
	$scope.formdata.clgdate = "";
	$scope.formdata.lotNumber = {};
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
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
			$scope.batchslip = new Array();
	$scope.getlotreport = function()
	{
	//console.log("========================>"+JSON.stringify($scope.formdata.lotNumber));
		$scope.reportdata = getlotreport.get({"clgdate":$scope.formdata.clgdate,"lotnumber":$scope.formdata.lotNumber.selectedItem.lotNumber});
		$scope.reportdata.$promise.then(function(response){
			$scope.batchslip = response.result;
			console.log("--------"+JSON.stringify($scope.batchslip));
			$scope.tableParams.reload();
		});
	}

		$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								chequeNumber: 'desc',
								chequeAmount: 'asc',
								payeeName: 'desc',
								micrCode: 'desc',
								chequeAmnt: 'asc',
								transCode: 'desc',
								draweeName: 'desc'
						},
						filter: {
								chequeNumber: '',
								chequeAmount: '',
								payeeName: '',
								micrCode: '',
								chequeAmnt: '',
								transCode: '',
								draweeName: ''
						}
					}, {
							total: $scope.batchslip.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.batchslip, params.filter()) : $scope.batchslip;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count()));
							   //console.log("----->"+JSON.stringify($scope.data)); 
						}
					});	
});
bpoApps.controller("OCTMoutstationcontroller",function($scope,Sections,getoutstation,getuserreport,$filter,getcreditmis,getdailymis,ngTableParams,getbatchslip,Fields,$location,$timeout,$parse)
{
	$scope.formdata = {};
	$scope.formdata.clgdate = "";
	$scope.formdata.lotNumber = {};
	$scope.formdata.batchId = {};
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
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
	$scope.outstation = function()
	{
		$scope.outstation = getoutstation.get({"clgdate":$scope.formdata.clgdate,"lotnumber":$scope.formdata.lotNumber.selectedItem.lotNumber,"batchId":$scope.formdata.batchId.selectedItem.octmBatchId});
		$scope.outstation.$promise.then(function(response){
			$scope.batchslip = response.result;
			//console.log("--------"+JSON.stringify($scope.batchslip));
			$scope.tableParams.reload();
		});
	}
	 $scope.totalAmount = function(){
            var chequeAmount = 0;
            for(count=0;count<$scope.data.length;count++){
                chequeAmount += parseInt($scope.data[count].chequeAmount,10);
            }
   // console.log("------->"+chequeAmount);
   return chequeAmount;  
        };

	$scope.batchslip = new Array();
			 $scope.tableParams = new ngTableParams({
      debugMode: true,
      page: 1, 
      count: 10,
      sorting: {
        serialNumber: 'desc',
        chequeDate: 'desc',
        chequeAmount: 'desc',
		accountNumber: 'desc',
        debitAccountNumber: 'desc',
        payeeName: 'desc',
		micrCode: 'desc'
      },
      filter: {
        serialNumber: '',
        chequeDate: '',
        chequeAmount: '',
		accountNumber: '',
        debitAccountNumber: '',
        payeeName: '',
		micrCode: ''
      }
 
     }, {
       total: $scope.batchslip.length,
       getData: function ($defer, params) {
          var filteredData = params.filter() ? $filter('filter')($scope.batchslip, params.filter()) : $scope.batchslip;
          var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
          params.total(orderedData.length);
          $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
       }
     });
});
bpoApps.controller("OCTMdailymiscontroller",function($scope,Sections,getreport,getuserreport,$filter,getdailymisOneLot,getdailymisSummary,getdailymisAllLot,ngTableParams,getbatchslip,Fields,$location,$timeout,$parse,Excel,$timeout,toastr,CORE_CONFIG,WEB_API)
{
 $scope.formdata = {};
 $scope.formdata.clgdate = "";
 $scope.formdata.lotNumber = {};
 $scope.formdata.mis = "";
 $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
   $scope.format = $scope.formats[0];
   $scope.dailyMIS = new Array();
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
 $scope.getreport = function()
 {  
				// $scope.dt = $filter('date')(new Date( $scope.formdata.clgdate.split('-').join('-')), "yyyy-MM-dd");
				 console.log("-----clgdate---"+JSON.stringify($scope.formdata.clgdate));
				 console.log("----MIS----"+JSON.stringify($scope.formdata.mis));
			 if($scope.formdata.clgdate=="")
			 {
				 toastr.error("Please select clg date!",'error');
			 }
			 else
			 {
				if($scope.formdata.mis==true && $scope.formdata.lotNumber.selectedItem == null)//MIS report & summary for all lot
				{
					
					$scope.reportdata = getdailymisAllLot.get({"clgdate":$scope.formdata.clgdate,"MIS":$scope.formdata.mis});
					$scope.reportdata.$promise.then(function(response){
					$scope.dailyMIS = response.result;
					console.log("----dailyMISFORALLLOT----"+JSON.stringify($scope.dailyMIS));
					if($scope.dailyMIS=="NoRecordFound")
					{
						toastr.error("No record found!",'error');
					}
					else
					{
						window.location = CORE_CONFIG.WEB_SERVICE+WEB_API.GETDAILYMISALLLOT+"/"+$scope.formdata.clgdate+"/"+$scope.formdata.mis;
						toastr.success("File created sucessfully!",'Done');
					}
						$scope.formdata.clgdate = "";
						 $scope.formdata.lotNumber = {};
						 $scope.formdata.mis = false;
					});
				}
				else if($scope.formdata.mis==true && $scope.formdata.lotNumber.selectedItem != null)//MIS report & summary for One lot
				{
					$scope.reportdata = getdailymisOneLot.get({"clgdate":$scope.formdata.clgdate,"lotnumber":$scope.formdata.lotNumber.selectedItem.lotNumber,"MIS":$scope.formdata.mis});
					$scope.reportdata.$promise.then(function(response){
					$scope.dailyMIS = response.result;
					if($scope.dailyMIS=="NoRecordFound")
					{
						toastr.error("No record found!",'error');
					}
					else
					{
						window.location = CORE_CONFIG.WEB_SERVICE+WEB_API.GETDAILYMISONELOT+"/"+$scope.formdata.clgdate+"/"+$scope.formdata.lotNumber.selectedItem.lotNumber+"/"+$scope.formdata.mis;
						toastr.success("File created sucessfully!",'Done');
						}
						$scope.formdata.clgdate = "";
						 $scope.formdata.lotNumber = {};
						 $scope.formdata.mis = false;
					});
				}
				else if($scope.formdata.mis==false && $scope.formdata.lotNumber.selectedItem != null)// summary for One lot
				{
					$scope.reportdata = getdailymisSummary.get({"clgdate":$scope.formdata.clgdate,"lotnumber":$scope.formdata.lotNumber.selectedItem.lotNumber});
					$scope.reportdata.$promise.then(function(response){
					$scope.dailyMIS = response.result;
					if($scope.dailyMIS=="NoRecordFound")
					{
						toastr.error("No record found!",'error');
					}
					else
					{
						window.location = CORE_CONFIG.WEB_SERVICE+WEB_API.GETDAILYMISSUMMARY+"/"+$scope.formdata.clgdate+"/"+$scope.formdata.lotNumber.selectedItem.lotNumber;
						toastr.success("File created sucessfully!",'Done');
						}
						$scope.formdata.clgdate = "";
						 $scope.formdata.lotNumber = {};
						 $scope.formdata.mis = false;
					});
				}	
			 }
	}

 });
 
bpoApps.controller("OCTMbatchwiseslipreportcontroller",function($scope,Sections,getreport,getuserreport,$filter,ngTableParams,getbatchslip,Fields,$location,$timeout,$parse,toastr,exportBatchWiseSlipText,CORE_CONFIG,WEB_API)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	
	$scope.formdata.clgdate = "";
	$scope.formdata.lotnumber = {};
	$scope.formdata.batchId = "";
	$scope.getAlllot = {};
	$scope.getAllbatch = {};
	

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	
	$scope.sections = Sections.get({"id":18});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
		
	}
	
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		
		console.log("***********************************");
		console.log("data   :   " + JSON.stringify(data));
		console.log("datalist     :    " + datalist);
		console.log("accessor    :     " + accessor);
		console.log("scopevar    :     " + scopevar);
		console.log("***********************************");
		
		
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

	$scope.exportBatchWiseSlip = function()
	{
		$scope.genaratedata = new exportBatchWiseSlipText();
		
			  $scope.genaratedata.batchslip = $scope.batchslip;
			  if($scope.genaratedata.batchslip!="")
			  {
			  	$scope.genaratedata.$save(function (response) {
				  console.log("==="+JSON.stringify(response.result));
				  
				 // $scope.url123 = response.result;					  
				  toastr.success(response.result+" create successfully!",'Done');
				 
				});
			  }
			  else
			   {
				  toastr.error("No record found!",'error');
			   }
	}


	$scope.batchslip = Array();
	$scope.report = function()
	{		
		$scope.tableParams.reload();
		console.log("=clg date=="+JSON.stringify($scope.formdata.clgdate));	
		console.log("=lot number=="+JSON.stringify($scope.formdata.lotnumber.selectedItem.lotNumber));
		console.log("=batch number=="+JSON.stringify($scope.formdata.lotnumber.selectedItem.lotNumber));

		//$scope.dt = $filter('date')(new Date($scope.formdata.clgdate.split('-').join('-')), "yyyy-MM-dd");
		console.log("=converted date=="+$scope.dt);
		if($scope.formdata.clgdate == "")
		{
			toastr.info('Please select clg date!', 'error');
		}
		else if($scope.formdata.lotnumber.selectedItem==undefined)
		{
			toastr.info('Please select lot no.!', 'error');
		}
		else if($scope.formdata.batchId=="")
		{
			toastr.info('Please enter batch no.!', 'error');
		}
		else
		{
			console.log("==="+JSON.stringify($scope.formdata));
				$scope.reportdata = getbatchslip.get({"batchId":$scope.formdata.batchId,"clgdate":$scope.formdata.clgdate,"lotnumber":$scope.formdata.lotnumber.selectedItem.lotNumber});
				$scope.reportdata.$promise.then(function(response){
				$scope.batchslip = response.result;
				console.log("==="+JSON.stringify($scope.batchslip));
				if($scope.batchslip=="")
				{
					toastr.info('No record found!', 'Alert');
				}
				//console.log("batch======"+JSON.stringify($scope.batchslip));
				$scope.tableParams.reload();
			});
		}
	}
	
	
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								//fullName: 'desc',
								batchNumber: 'desc',
								lotNumber: 'desc',
								serialNumber: 'desc',
								chequeAmount: 'desc',
								clgDate: 'desc',								
								categoryAmount: 'desc',
								accountNumber: 'desc',
								payinSlipDate: 'desc',
								chequeDate: 'desc',
								chequeNumber: 'desc',
								micrCode: 'desc',
								transCode: 'desc',
								payeeName: 'desc',
								draweeName: 'desc',
								chequeAmnt: 'desc',
								solId: 'desc',
								fullName: 'desc',
								accountNumber2: 'desc'
						},
						filter: {
							//fullName: '',
								batchNumber: '',
								lotNumber: '',
								serialNumber: '',
								chequeAmount: '',
								clgDate: '',								
								categoryAmount: '',
								accountNumber: '',
								payinSlipDate: '',
								chequeDate: '',
								chequeNumber: '',
								micrCode: '',
								transCode: '',
								payeeName: '',
								draweeName: '',
								chequeAmnt: '',
								solId: '',
								fullName: '',
								accountNumber2: ''
						}
					}, {
							total: $scope.batchslip.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.batchslip, params.filter()) : $scope.batchslip;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
});
bpoApps.controller("OCTMcreditcardslipcontroller",function($scope,Sections,$filter,getcreditmis,ngTableParams,getCreditCardSlipreport,genarateCreditCardSlipText,Fields,$location,$timeout,$parse,toastr)
{
		$scope.currentRow = 0;
		$scope.formdata = {};
		$scope.formdata.creditCardSlip_clgDate = "";
		$scope.formdata.creditCardSlip_category = {};
		$scope.formdata.creditCardSlip_batchId = "";
		//$scope.creditcardslip = new Array();
	
	$scope.sections = Sections.get({"id":55});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
		
	}
	
		$scope.getAllItems = function(data, datalist, accessor, scopevar){
		
		var lblaccessor = accessor;
		$scope.formdata[lblaccessor]={};
		var tmp = $parse(datalist) ;
		tmp.assign($scope, data);
		accessor = "formdata1['"+accessor+"']";
		var accessor = $parse(accessor); 
		angular.forEach(data, function(value, key) {
			if(value[scopevar] == $scope.formdata1[scopevar]){ 
				accessor.assign($scope, {"selectedItem":value});
			}
		});
	}
	
	$scope.exportCreditCardSlip = function()
	{ //alert("hiii");
		$scope.genaratedata = new genarateCreditCardSlipText();
		console.log("======="+JSON.stringify($scope.batchslip));
		
			  $scope.genaratedata.creditcardslip = $scope.creditcardslip;
			  if($scope.genaratedata.batchslip!="")
			  {
			  	$scope.genaratedata.$save(function (response) {
				  //console.log("==="+JSON.stringify(response.result));
				  			  
				  toastr.success(response.result+" create successfully!",'Done');
				 
				});
			  }
			  else
			   {
				  toastr.error("No record found!",'error');
			   }
	}
	
	$scope.creditcardslip = Array();
	$scope.report = function()
	{
			// $scope.dt = $filter('date')(new Date($scope.formdata.creditCardSlip_clgDate.split('-').join('-')), "yyyy-MM-dd");
			 //console.log("=formatdata=="+JSON.stringify($scope.formdata));
			// console.log("formdata =="+JSON.stringify($scope.formdata));
			$scope.reportdata = getCreditCardSlipreport.get({"clgdate":$scope.formdata.creditCardSlip_clgDate,
			"category":$scope.formdata.creditCardSlip_category.selectedItem.nonCtsCategoryId,"batchId":$scope.formdata.creditCardSlip_batchId})
			$scope.reportdata.$promise.then(function(response){
				$scope.creditcardslip = response.result;
				
			console.log("--------"+JSON.stringify(response.result));
			 if($scope.creditcardslip=="")
			  {
				  toastr.error("No record found!",'error');
			  }
			 
			$scope.tableParams.reload();
			})	
	}
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								serialNumber: 'desc',
								userName: 'desc',
								chequeNumber: 'desc',
								chequeAmount: 'desc',
								transCode: 'desc',
								micrCode: 'desc',
								draweeName: 'desc',
								branch: 'desc'
						},
						filter: {
								serialNumber: '',
								userName: '',
								chequeNumber: '',
								chequeAmount: '',
								transCode: '',
								micrCode: '',
								draweeName: '',
								branch: ''
						}
	
					}, {
							total: $scope.creditcardslip.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.creditcardslip, params.filter()) : $scope.creditcardslip;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
});
bpoApps.controller("OCTMuserreportcontroller",function($scope,Sections,getreport1,getuserreport,$filter,getcreditmis,ngTableParams,getbatchslip,Fields,$location,$timeout,$parse)
{
	$scope.currentRow = 0;
	$scope.batchslip = new Array();
	
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
		$scope.reportdata = getuserreport.get({});
				$scope.reportdata.$promise.then(function(response){
				$scope.batchslip = response.result;
				//console.log("--------"+$scope.batchslip);
				$scope.tableParams.reload();
			});
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								date: 'desc',
								userName: 'asc',
								Total: 'desc'
						},
						filter: {
							date: '',
							userName: '',
							Total: ''
						}
	
					}, {
							total: $scope.batchslip.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.batchslip, params.filter()) : $scope.batchslip;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});

});
bpoApps.controller("OCTMcreditcardmiscontroller",function($scope,Sections,getreport1,getrejection,$filter,getcreditmis,ngTableParams,getbatchslip,Fields,$location,$timeout,$parse,toastr)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	$scope.formdata.clgdate = "";
	$scope.formdata.lotNumber = {};


	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	
	$scope.batchslip = Array();
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		
		console.log("***********************************");
		console.log("data   :   " + JSON.stringify(data));
		console.log("datalist     :    " + datalist);
		console.log("accessor    :     " + accessor);
		console.log("scopevar    :     " + scopevar);
		console.log("***********************************");
		
		
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
	
	$scope.report = function()
	{
			$scope.reportdata = getcreditmis.get({"clgdate":$scope.formdata.clgdate,"lotnumber":$scope.formdata.lotNumber.selectedItem.lotNumber});
				$scope.reportdata.$promise.then(function(response){
				
				console.log("--------"+JSON.stringify(response.result));
				if(response.result==null || response.result=="")
				{
					toastr.info('No record found!','Alert');
					$scope.tableParams.reload();
				}
				else{
					$scope.batchslip = response.result;
					$scope.tableParams.reload();
				}
				
			});
	}
 	$scope.totalcount = function(){
        var count = 0;
        for(countt=0;countt<$scope.data.length;countt++){
            count += parseInt($scope.data[countt].count,10);
        }
    	//console.log("------->"+count);
   		return count;  
    };
	
	$scope.totalAmount = function(){
    	var total = 0;
    	for(count=0;count<$scope.data.length;count++){
            total += parseInt($scope.data[count].total,10);
        }
    	//console.log("------->"+total);
   		return total;  
        };

	$scope.tableParams = new ngTableParams({
						debugMode: true,
						count: 10,
						sorting: {
								//fullName: 'desc',
								serialNumber: 'desc',
								chequeAmount: 'desc'
						},
						filter: {
							//fullName: '',
							serialNumber: '',
							chequeAmount: ''
						}
	
					}, {
							total: $scope.batchslip.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.batchslip, params.filter()) : $scope.batchslip;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});

});
	// 	$('.inputs').keydown(function (e) {
	// if (e.which === 13) {
	// 	var index = $('.inputs').index(this) + 1;
	// 	$('.inputs').eq(index).focus();
	// }       OCTMsecondpassdataentry2controller
    //  });
bpoApps.controller("OCTMsecondpassdataentry2controller",function($scope,Sections,getsecondpass,updatesecondpass,$filter,ngTableParams,getsecondpass2,$window,Fields,getlotcategory,getbatchslip,deleteotherrecord,toastr,getbankname,$location,$timeout,$parse,$rootScope)
{
		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	$scope.formdata = {};
	$scope.formdata1 = {};
	$scope.formdata1.octmotherchequeentry__lotNumber = {};
	$scope.formdata1.octmotherchequeentry__clgDate = "";
	$scope.formdata1.octmotherchequeentry__batchId = {};
	$scope.secondpass1 = new Array();
	$scope.date = new Date();
	$scope.getAllBatch = {};
	$scope.getAllLots = {};
	
		$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
	}
	
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
	$scope.gotoback = function()
{
	$window.location = "#/OCTM/secondpassentry2";
}

		
	$scope.getdata = function()
	{
		$scope.secondpass = getsecondpass2.get({"lotNumber":$location.search().lotnumber,
		"clgDate":$location.search().clgdate,
	"batchId":$location.search().batchId,
	"userId":$location.search().userID})
		;		
		$scope.secondpass.$promise.then(function(response){
			console.log("-------"+JSON.stringify(response));
			$scope.setLog(30,"Please wait","");
			if(response.result == "")
			{
				$scope.setLog(50,"Please wait","");
				toastr.info("No record found!",'Alert');
				$scope.setLog(100,"Done","");
				$timeout(function(){
				$scope.proval = 0;
				}, 1000);
				$scope.tableParams.reload();
				$timeout(function(){
									$("#0").focus();	
								}, 500);
			}
			else{
				$scope.setLog(50,"Please wait","");
				console.log(JSON.stringify(response));
				$scope.secondpass1 = response.result;
				$scope.totalrecords = response.result.length;
				// $scope.amountcategory = response.result[0].categoryAmount;
				$scope.batchNumber = response.result[0].batchId;
				$scope.userName = response.result[0].fullName;
				$scope.setLog(100,"Done","");
				$timeout(function(){
				$scope.proval = 0;
				}, 1000);
				
				$scope.tableParams.reload();
				$timeout(function(){
									$("#0").focus();	
								}, 500);
			}
		})
	}
	$scope.getdata();

	$scope.deleterecord = function(serialNumber,misreport,flag)
	{
			$scope.deleteotherrecord1 = deleteotherrecord.get({
				"batchId":misreport.batchId,
			    "lotNumber":$location.search().lotnumber,
				"serialNumber":serialNumber,"clgDate":$location.search().clgdate
			});
			
			$scope.deleteotherrecord1.$promise.then(function(response){
				$scope.setLog(30,"Please wait Record deleting","");
				console.log("==response=="+JSON.stringify(response));
				if(response.result == true)
				{
					$scope.setLog(50,"Please wait Record deleting","");
					toastr.success("Record deleted successfully! DELETED ID : "+serialNumber,'Done');
					$scope.setLog(100,"Record deleted successfully","");
						$timeout(function(){
							$scope.proval = 0;
						}, 1000);
						$scope.secondpass1 = new Array();
						$scope.tableParams.reload();
						//$scope.showme();
						$scope.secondpass = getsecondpass2.get({"lotNumber":$location.search().lotnumber,
		"clgDate":$location.search().clgdate,
	"batchId":$location.search().batchId})
		;		
		$scope.secondpass.$promise.then(function(response){
			console.log("-------"+JSON.stringify(response));
			$scope.setLog(30,"Please wait","");
			if(response.result == "")
			{
				$scope.setLog(50,"Please wait","");
				toastr.info("No record found!",'Alert');
				$scope.setLog(100,"Done","");
				$timeout(function(){
				$scope.proval = 0;
				}, 1000);
				$scope.tableParams.reload();
			}
			else{
				$scope.setLog(50,"Please wait","");
				console.log(JSON.stringify(response));
				$scope.secondpass1 = response.result;
				$scope.totalrecords = response.result.length;
				// $scope.amountcategory = response.result[0].categoryAmount;
				$scope.batchNumber = response.result[0].batchId;
				$scope.userName = response.result[0].fullName;
				$scope.setLog(100,"Done","");
				$timeout(function(){
				$scope.proval = 0;
				}, 1000);
				$scope.tableParams.reload();
			}
		})
				}
				else{
					$scope.setLog(50,"Please wait Record deleting","");
					toastr.error("Record Not Deleted");
					$scope.setLog(100,"Record not deleted","");
						$timeout(function(){
							$scope.proval = 0;
						}, 1000);
				}
			})
	}	
		$scope.update = function(secondpassentry,misreport,flag)
		{
			//console.log("--index--"+index);
			if(secondpassentry.includes(".")==false && secondpassentry != "" )
			{
				secondpassentry = secondpassentry+".00";			
				if(misreport.chequeAmount != secondpassentry)
				{
					$scope.amount1 = misreport.chequeAmount;
					$scope.serialNumber1 = misreport.serialNumber;
				}		
				else
				{
					$scope.showdata = false;
				}
			
			$scope.endDate=  $filter('date')(new Date(),"yyyy-MM-dd HH:mm:ss");	

				if(misreport.chequeAmount != secondpassentry)
				{
					if(flag == "save")
					{
						$scope.setLog(30,"Please wait Record Updating","");
							$scope.formdata.octmotherchequeentry__serialNumber=misreport.serialNumber;
							$scope.formdata.octmotherchequeentry__accountNumber=misreport.accountNumber;
							$scope.formdata.octmotherchequeentry__chequeNumber=misreport.chequeNumber;
							$scope.formdata.octmotherchequeentry__micrCode=misreport.micrCode;
							$scope.formdata.octmotherchequeentry__category=misreport.category;
							$scope.Fields = new Fields();
							$scope.Fields.formData=$scope.formdata;
							$scope.Fields.formData.octmotherchequeentry__userName = $rootScope.SESS_USER.userId;
							$scope.Fields.formData.octmotherchequeentry__endTime=$scope.endDate;
							$scope.Fields.formData.octmotherchequeentry__chequeAmnt=secondpassentry;
							$scope.setLog(50,"Please wait Record Updating","");
							$scope.Fields.whr=" and otherChequeentryId="+misreport.otherChequeentryId;
							$scope.Fields.$save(function (response) {
									toastr.success('Record saved successfully!','Done');
									$scope.setLog(100,"Record Saved successfully","");
										$timeout(function(){
										$scope.proval = 0;
									}, 1000);	
									$scope.tableParams.reload();
									$scope.getdata();
									$timeout(function(){
											$("#0").focus();	
										}, 500);
									
								});			
					}
					else{
						toastr.error("Amount Mismatch");
					}
				
				}
				else 
				{
					$scope.setLog(30,"Please wait Record Updating","");
					$scope.formdata.octmotherchequeentry__serialNumber=misreport.serialNumber;
					$scope.formdata.octmotherchequeentry__accountNumber=misreport.ccountNumber;
					$scope.formdata.octmotherchequeentry__chequeNumber=misreport.chequeNumber;
					$scope.formdata.octmotherchequeentry__micrCode=misreport.micrCode;
					$scope.formdata.octmotherchequeentry__category=misreport.category;
					$scope.Fields = new Fields();
					$scope.Fields.formData=$scope.formdata;
					$scope.Fields.formData.octmotherchequeentry__userCode = $rootScope.SESS_USER.userId;
					$scope.Fields.formData.octmotherchequeentry__endTime=$scope.endDate;
					$scope.Fields.formData.octmotherchequeentry__chequeAmnt=secondpassentry;
					$scope.setLog(50,"Please wait Record Updating","");
					$scope.Fields.whr=" and otherChequeentryId="+misreport.otherChequeentryId;
					$scope.Fields.$save(function (response) {

								toastr.success('Record saved successfully!','Done');
								$scope.setLog(100,"Record Saved successfully","");
										$timeout(function(){
										$scope.proval = 0;
									}, 1000);
									$scope.getdata();
								$scope.tableParams.reload();
								$timeout(function(){
											$("#0").focus();	
										}, 500);		
						});
				}
			}
			else
			{
				if(misreport.chequeAmount != secondpassentry)
				{
					$scope.amount1 = misreport.chequeAmount;
					$scope.serialNumber1 = misreport.serialNumber;
				}		
				else
				{
					$scope.showdata = false;
				}
				
				$scope.endDate=  $filter('date')(new Date(),"yyyy-MM-dd HH:mm:ss");	
	
					if(misreport.chequeAmount != secondpassentry)
					{
						if(flag == "save")
						{
							$scope.setLog(30,"Please wait Record Updating","");
								$scope.formdata.octmotherchequeentry__serialNumber=misreport.serialNumber;
								$scope.formdata.octmotherchequeentry__accountNumber=misreport.accountNumber;
								$scope.formdata.octmotherchequeentry__chequeNumber=misreport.chequeNumber;
								$scope.formdata.octmotherchequeentry__micrCode=misreport.micrCode;
								$scope.formdata.octmotherchequeentry__category=misreport.category;
								$scope.Fields = new Fields();
								$scope.Fields.formData=$scope.formdata;
								$scope.Fields.formData.octmotherchequeentry__userName = $rootScope.SESS_USER.userId;
								$scope.Fields.formData.octmotherchequeentry__endTime=$scope.endDate;
								$scope.Fields.formData.octmotherchequeentry__chequeAmnt=secondpassentry;
							$scope.setLog(50,"Please wait Record Updating","");
								$scope.Fields.whr=" and otherChequeentryId="+misreport.otherChequeentryId;
								$scope.Fields.$save(function (response) {
	
										toastr.success('Record saved successfully!','Done');
										$scope.setLog(100,"Record Saved successfully","");
											$timeout(function(){
											$scope.proval = 0;
										}, 1000);
										$scope.getdata();
										$scope.tableParams.reload();
										$timeout(function(){
											$("#0").focus();	
										}, 500);
									});			
						}
						else{
							toastr.error("Amount Mismatch");
						}
					
					}
					else 
					{
						$scope.setLog(30,"Please wait Record Updating","");
						$scope.formdata.octmotherchequeentry__serialNumber=misreport.serialNumber;
						$scope.formdata.octmotherchequeentry__accountNumber=misreport.ccountNumber;
						$scope.formdata.octmotherchequeentry__chequeNumber=misreport.chequeNumber;
						$scope.formdata.octmotherchequeentry__micrCode=misreport.micrCode;
						$scope.formdata.octmotherchequeentry__category=misreport.category;
						$scope.Fields = new Fields();
						$scope.Fields.formData=$scope.formdata;
						$scope.Fields.formData.octmotherchequeentry__userCode = $rootScope.SESS_USER.userId;
						$scope.Fields.formData.octmotherchequeentry__endTime=$scope.endDate;
						$scope.Fields.formData.octmotherchequeentry__chequeAmnt=secondpassentry;
						$scope.setLog(50,"Please wait Record Updating","");
						$scope.Fields.whr=" and otherChequeentryId="+misreport.otherChequeentryId;
						$scope.Fields.$save(function (response) {
	
									toastr.success('Record saved successfully!','Done');
									$scope.setLog(100,"Record Saved successfully","");
											$timeout(function(){
											$scope.proval = 0;
										}, 1000);
										$scope.getdata();
									$scope.tableParams.reload();
									$timeout(function(){
											$("#0").focus();	
										}, 500);		
							});
							
							
					}
					
				}
			}
					$scope.tableParams = new ngTableParams({
						debugMode: true,
						count: 10,
						sorting: {
								serialNumber: 'asc',
								accountNumber: 'desc',
								chequeNumber: 'desc',
								micrCode: 'desc',
								categoryAmount: 'desc',
								chequeAmount: 'desc'
						},
						filter: {
							serialNumber: '',
								accountNumber: '',
								chequeNumber: '',
								micrCode: '',
								categoryAmount: '',
								chequeAmount: ''
						}
	
					}, {
					total: $scope.secondpass1.length,
					getData: function ($defer, params) {
					var filteredData = params.filter() ? $filter('filter')($scope.secondpass1, params.filter()) : $scope.secondpass1;
					var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
					$defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
					}
			});
});



bpoApps.controller("OCTMsecondpassdataentrycontroller",function($scope,Sections,getsecondpass,updatesecondpass,$filter,ngTableParams,$window,Fields,getlotcategory,getbatchslip,deleterecord,toastr,getbankname,$location,$timeout,$parse,$rootScope)
{
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	$scope.formdata = {};
	$scope.formdata1 = {};
	$scope.misreport = {};
	$scope.misreport.categoryAmount1 = {};
	$scope.formdata1.octmchequeentry__lotNumber = {};
	$scope.formdata1.octmchequeentry__clgDate = "";
	$scope.formdata1.octmchequeentry__batchId = "";
	$scope.categoryName = {};

	$scope.secondpass1 = new Array();
	$scope.date = new Date();

$scope.gotoback = function()
{
	$window.location = "#/OCTM/secondpassentry";
}
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		
		var lblaccessor = accessor;
		$scope.formdata1[lblaccessor]={};
		console.log(data);
		console.log(datalist);
		console.log(accessor);
		console.log(scopevar);
		var tmp = $parse(datalist) ;
		tmp.assign($scope, data);
		accessor = "formdata1['"+accessor+"']";
		var accessor = $parse(accessor); 
		angular.forEach(data, function(value, key) {
			if(value[scopevar] == $scope.formdata1[scopevar]){ 
				accessor.assign($scope, {"selectedItem":value});
			}
		});
		if(datalist == "getallcat")
		{
			for(i=0;i<data.length;i++)
			{
					if(data[i].categoryName == $scope.secondpass1[0].categoryAmount)
					{
						console.log(data[i].categoryName);
						console.log($scope.secondpass1[0].categoryAmount);
						console.log(JSON.stringify(data[i]));
						$scope.misreport.categoryAmount1.selectedItem = data[i];
						console.log(JSON.stringify($scope.misreport.categoryAmount1));
					}
			}
		}
		
	}
	
		$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
	}
	
	$scope.change = function()
	{
		//alert("1");
		console.log("---->"+JSON.stringify($scope.misreport.categoryAmount1));
	}

$scope.getdata = function()
{
				$scope.secondpass = getsecondpass.get(
										{"lotNumber":$location.search().lotnumber,
										 "clgDate":$location.search().clgdate,
										"batchId":$location.search().batchId})
			
			$scope.secondpass.$promise.then(function(response){
				$scope.setLog(30,"Please wait","");
				console.log("response -------> "+JSON.stringify(response.result));
				if(response.result == "")
				{
					$scope.setLog(50,"Please wait","");
					toastr.info('No record found!','Alert');
					$scope.setLog(100,"Done","");
						$timeout(function(){
						$scope.proval = 0;
					}, 1000);
					$scope.tableParams.reload();
					$timeout(function(){
									$("#0").focus();	
								}, 500);
					
				}
				else
				{
					$scope.setLog(50,"Please wait","");
					$scope.secondpass1 = response.result;
					$scope.totalrecords = response.result.length;

					$scope.amountcategory = response.result[0].categoryAmount;
					$scope.userName = response.result[0].fullName;
					$scope.batchNumber = response.result[0].batchNumber;
					$scope.setLog(100,"Done","");
						$timeout(function(){
						$scope.proval = 0;
						}, 1000);
					$scope.tableParams.reload();
					$timeout(function(){
									$("#0").focus();	
								}, 500);
				}
			})
}
$scope.getdata();

	
	$scope.deleterecord2 = function(serialNumber,misreport)
	{

			$scope.deleterecord1 = deleterecord.get({
							   "batchId": misreport.batchNumber ,			                               
							   "lotNumber":$location.search().lotnumber,
							   "serialNumber":serialNumber,"clgDate":$location.search().clgdate});

			$scope.deleterecord1.$promise.then(function(response){
				$scope.setLog(30,"Please wait Deleting Record","");
			if(response.result == true)
			{
					toastr.success("Record deleted successfully! DELETED ID : "+serialNumber,'Done');
					$scope.setLog(50,"Please wait Record deleting","");
					$scope.setLog(100,"Record Saved successfully","");
						$timeout(function(){
							$scope.proval = 0;
						}, 1000);
						$scope.secondpass1 = new Array();
						$scope.tableParams.reload();
					//$scope.showme();
					$scope.secondpass = getsecondpass.get(
										{"lotNumber":$location.search().lotnumber,
										 "clgDate":$location.search().clgdate,
										"batchId":$location.search().batchId})
			
			$scope.secondpass.$promise.then(function(response){
				$scope.setLog(30,"Please wait","");
				console.log("response -------> "+JSON.stringify(response.result));
				if(response.result == "")
				{
					$scope.setLog(50,"Please wait","");
					toastr.info('No record found!','Alert');
					$scope.setLog(100,"Done","");
						$timeout(function(){
						$scope.proval = 0;
					}, 1000);
					$scope.tableParams.reload();
					$timeout(function(){
									$("#0").focus();	
								}, 500);
				}
				else
				{
					$scope.setLog(50,"Please wait","");
					$scope.secondpass1 = response.result;
					$scope.totalrecords = response.result.length;

					$scope.amountcategory = response.result[0].categoryAmount;
					$scope.userName = response.result[0].fullName;
					$scope.batchNumber = response.result[0].batchNumber;
					$scope.setLog(100,"Done","");
						$timeout(function(){
						$scope.proval = 0;
						}, 1000);
					$scope.tableParams.reload();
					$timeout(function(){
									$("#0").focus();	
								}, 500);
				}
			})
			}
			else{
				toastr.error("Record Not Deleted");
				$scope.setLog(50,"Please wait Record deleting","");
				$scope.setLog(100,"Record Saved successfully","");
						$timeout(function(){
							$scope.proval = 0;
						}, 1000);
						$timeout(function(){
									$("#0").focus();	
								}, 500);
			}
		})
	}	
	
	$scope.update = function(secondpassentry,misreport,flag)
	{
		$scope.endDate = $filter('date')(new Date(),"yyyy-MM-dd HH:mm:ss");
		
		if(secondpassentry.includes(".")==false && secondpassentry != "" )
		{
				secondpassentry = secondpassentry+".00";
				console.log("--secondpass--"+secondpassentry);
			
		
			if(misreport.chequeAmount != secondpassentry)
			{
				$scope.amount1 = misreport.chequeAmount;
				$scope.serialNumber1 = misreport.serialNumber;
			}		
			else
			{
				$scope.showdata = false;
			}
				if(misreport.chequeAmount != secondpassentry)
				{
					if(flag == "save")
					{
							console.log(JSON.stringify(misreport));
							$scope.setLog(30,"Please wait Updating Record","");
							$scope.formdata.octmchequeentry__serialNumber=misreport.serialNumber;
							$scope.formdata.octmchequeentry__accountNumber=misreport.ccountNumber;
							$scope.formdata.octmchequeentry__chequeNumber=misreport.chequeNumber;
							$scope.formdata.octmchequeentry__micrCode=misreport.micrCode;
							$scope.formdata.octmchequeentry__category=misreport.category;
							$scope.Fields = new Fields();
							$scope.Fields.formData=$scope.formdata;
							$scope.setLog(50,"Please wait Updating Record","");
							$scope.Fields.formData.octmchequeentry__userName = $rootScope.SESS_USER.userId;
							$scope.Fields.formData.octmchequeentry__endTime=$scope.endDate;
							$scope.Fields.formData.octmchequeentry__chequeAmnt=secondpassentry;
							$scope.Fields.whr=" and chequeEntryId="+misreport.chequeEntryId;
							$scope.Fields.$save(function (response) {
								
							toastr.success('Record saved successfully!','Done');
							$scope.setLog(100,"Record Updated","");
								$timeout(function(){
									$scope.proval = 0;
								}, 1000);
								$scope.getdata();
							$scope.tableParams.reload();
							$timeout(function(){
									$("#0").focus();	
								}, 500);
										
						});				
					}
					else{
						toastr.error("Amount Mismatch");
					}
				}
				else
				{
					$scope.setLog(30,"Please wait Updating Record","");
						$scope.formdata.octmchequeentry__serialNumber=misreport.serialNumber;
						$scope.formdata.octmchequeentry__accountNumber=misreport.ccountNumber;
						$scope.formdata.octmchequeentry__chequeNumber=misreport.chequeNumber;
						$scope.formdata.octmchequeentry__micrCode=misreport.micrCode;
						$scope.formdata.octmchequeentry__category=misreport.category;
						$scope.Fields = new Fields();
					$scope.setLog(50,"Please wait Updating Record","");
						$scope.Fields.formData=$scope.formdata;
						$scope.Fields.formData.octmchequeentry__userName = $rootScope.SESS_USER.userId;
						$scope.Fields.formData.octmchequeentry__endTime=$scope.endDate;
						$scope.Fields.formData.octmchequeentry__chequeAmnt=secondpassentry;
						$scope.Fields.whr=" and chequeEntryId="+misreport.chequeEntryId;
						
						$scope.Fields.$save(function (response) {
							$('#myTableRow').remove();
							toastr.success('Record saved successfully!','Done');
							$scope.setLog(100,"Record Updated","");
							$timeout(function(){
								$scope.proval = 0;
							}, 1000);					
						});
						$scope.getdata();					
						$scope.tableParams.reload();
						$timeout(function(){
									$("#0").focus();	
								}, 500);
					}
		}
		else
		{
			if(misreport.chequeAmount != secondpassentry)
			{
				$scope.amount1 = misreport.chequeAmount;
				$scope.serialNumber1 = misreport.serialNumber;
			}		
			else
			{
				$scope.showdata = false;
			}
				if(misreport.chequeAmount != secondpassentry)
				{
					if(flag == "save")
					{
							console.log(JSON.stringify(misreport));
							$scope.setLog(30,"Please wait Updating Record","");
							$scope.formdata.octmchequeentry__serialNumber=misreport.serialNumber;
							$scope.formdata.octmchequeentry__accountNumber=misreport.ccountNumber;
							$scope.formdata.octmchequeentry__chequeNumber=misreport.chequeNumber;
							$scope.formdata.octmchequeentry__micrCode=misreport.micrCode;
							$scope.formdata.octmchequeentry__category=misreport.category;
							$scope.Fields = new Fields();
							$scope.Fields.formData=$scope.formdata;
							$scope.setLog(50,"Please wait Updating Record","");
							$scope.Fields.formData.octmchequeentry__userName = $rootScope.SESS_USER.userId;
							$scope.Fields.formData.octmchequeentry__endTime=$scope.endDate;
							$scope.Fields.formData.octmchequeentry__chequeAmnt=secondpassentry;
							$scope.Fields.whr=" and chequeEntryId="+misreport.chequeEntryId;
							$scope.Fields.$save(function (response) {
								
							toastr.success('Record saved successfully!','Done');
							$scope.setLog(100,"Record Updated","");
								$timeout(function(){
									$scope.proval = 0;
								}, 1000);
								$scope.getdata();
							$scope.tableParams.reload();
							$timeout(function(){
									$("#0").focus();	
								}, 500);
										
						});				
					}
					else{
						toastr.error("Amount Mismatch");
					}
				}
				else
				{
					$scope.setLog(30,"Please wait Updating Record","");
						$scope.formdata.octmchequeentry__serialNumber=misreport.serialNumber;
						$scope.formdata.octmchequeentry__accountNumber=misreport.ccountNumber;
						$scope.formdata.octmchequeentry__chequeNumber=misreport.chequeNumber;
						$scope.formdata.octmchequeentry__micrCode=misreport.micrCode;
						$scope.formdata.octmchequeentry__category=misreport.category;
						$scope.Fields = new Fields();
					$scope.setLog(50,"Please wait Updating Record","");
						$scope.Fields.formData=$scope.formdata;
						$scope.Fields.formData.octmchequeentry__userName = $rootScope.SESS_USER.userId;
						$scope.Fields.formData.octmchequeentry__endTime=$scope.endDate;
						$scope.Fields.formData.octmchequeentry__chequeAmnt=secondpassentry;
						$scope.Fields.whr=" and chequeEntryId="+misreport.chequeEntryId;
						
						$scope.Fields.$save(function (response) {
							$('#myTableRow').remove();
							toastr.success('Record saved successfully!','Done');
							$scope.setLog(100,"Record Updated","");
							$timeout(function(){
								$scope.proval = 0;
							}, 1000);					
						});
						$scope.getdata();					
						$scope.tableParams.reload();
						$timeout(function(){
									$("#0").focus();	
								}, 500);
					}
		}
	}
		
		$scope.tableParams = new ngTableParams({
						debugMode: true,
						count: 10,
						sorting: {
								serialNumber: 'asc',
								accountNumber: 'desc',
								chequeNumber: 'desc',
								micrCode: 'desc',
								categoryAmount: 'desc',
								chequeAmount: 'desc'
						},
						filter: {
							serialNumber: '',
								accountNumber: '',
								chequeNumber: '',
								micrCode: '',
								categoryAmount: '',
								chequeAmount: ''
						}
	
					}, {
					total: $scope.secondpass1.length,
					getData: function ($defer, params) {
					var filteredData = params.filter() ? $filter('filter')($scope.secondpass1, params.filter()) : $scope.secondpass1;
					var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
					$defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
					}
			});
});

bpoApps.controller("OCTMsecondpassentrycontroller",function($scope,Sections,getallsecondpass,updatesecondpass,$filter,ngTableParams,getsecondpassallocate,$window,Fields,getlotcategory,getbatchslip,deleterecord,toastr,getbankname,$location,$timeout,$parse,$rootScope)
{
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	$scope.formdata = {};
	$scope.formdata1 = {};
	$scope.misreport = {};
	$scope.misreport.categoryAmount1 = {};
	$scope.formdata1.octmchequeentry__lotNumber = {};
	$scope.formdata1.octmchequeentry__clgDate = "";
	$scope.formdata1.octmchequeentry__batchId = "";
	$scope.categoryName = {};

	$scope.secondpass1 = new Array();
	$scope.date = new Date();




	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		
		var lblaccessor = accessor;
		$scope.formdata1[lblaccessor]={};

		var tmp = $parse(datalist) ;
		tmp.assign($scope, data);
		accessor = "formdata1['"+accessor+"']";
		var accessor = $parse(accessor); 
		angular.forEach(data, function(value, key) {
			if(value[scopevar] == $scope.formdata1[scopevar]){ 
				accessor.assign($scope, {"selectedItem":value});
			}
		});
		if(datalist == "getallcat")
		{
			for(i=0;i<data.length;i++)
			{
					if(data[i].categoryName == $scope.secondpass1[0].categoryAmount)
					{
						console.log(data[i].categoryName);
						console.log($scope.secondpass1[0].categoryAmount);
						console.log(JSON.stringify(data[i]));
						$scope.misreport.categoryAmount1.selectedItem = data[i];
						console.log(JSON.stringify($scope.misreport.categoryAmount1));
					}
			}
		}
		
	}
	
		$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
	}
	

	$scope.showme = function()
	{
		if($scope.formdata1.octmchequeentry__lotNumber.selectedItem == undefined)
		{
			toastr.error("Please Select Lot Number");
		}
		else if($scope.formdata1.octmchequeentry__clgDate == "")
		{
			toastr.error("Please Select Clearing Date");
		}
		else{
			$scope.secondpass = getallsecondpass.get(
										{"lotNumber":$scope.formdata1.octmchequeentry__lotNumber.selectedItem.displaylabel,
										 "clgDate":$scope.formdata1.octmchequeentry__clgDate,
										"usercode":$rootScope.SESS_USER.userId})
			
			$scope.secondpass.$promise.then(function(response){
				$scope.setLog(30,"Please wait","");
				console.log("response -------> "+JSON.stringify(response.result));
				if(response.result == "")
				{
					$scope.setLog(50,"Please wait","");
					toastr.info('No record found!','Alert');
					$scope.setLog(100,"Done","");
						$timeout(function(){
						$scope.proval = 0;
						}, 1000);
				}
				else
				{
					$scope.setLog(50,"Please wait","");
					$scope.secondpass1 = response.result;
					$scope.totalrecords = response.result.length;

					$scope.amountcategory = response.result[0].categoryAmount;
					$scope.userName = response.result[0].fullName;
					$scope.batchNumber = response.result[0].batchNumber;
					$scope.setLog(100,"Done","");
						$timeout(function(){
						$scope.proval = 0;
						}, 1000);
					$scope.tableParams.reload();
				}
			})
		}

	}
	$scope.gotodataentry = function(misreport)
	{
		
		$scope.allocatebatch = getsecondpassallocate.get({"batchId":misreport.batchNumber,"clgdate":$scope.formdata1.octmchequeentry__clgDate,
		"lotnumber":$scope.formdata1.octmchequeentry__lotNumber.selectedItem.displaylabel,
		"user":$rootScope.SESS_USER.userId,
		"type":"Cheque Entry"});

		$window.location = "#/OCTM/secondpassdataentry?batchId="+misreport.batchNumber+"=&clgdate="+$scope.formdata1.octmchequeentry__clgDate+"&lotnumber="+$scope.formdata1.octmchequeentry__lotNumber.selectedItem.displaylabel;
	}	
	

		
		$scope.tableParams = new ngTableParams({
						debugMode: true,
						count: 10,
						sorting: {
								serialNumber: 'asc',
								accountNumber: 'desc',
								chequeNumber: 'desc',
								micrCode: 'desc',
								categoryAmount: 'desc',
								chequeAmount: 'desc'
						},
						filter: {
							serialNumber: '',
								accountNumber: '',
								chequeNumber: '',
								micrCode: '',
								categoryAmount: '',
								chequeAmount: ''
						}
	
					}, {
					total: $scope.secondpass1.length,
					getData: function ($defer, params) {
					var filteredData = params.filter() ? $filter('filter')($scope.secondpass1, params.filter()) : $scope.secondpass1;
					var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
					$defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
					}
			});
});

bpoApps.controller("OCTMsecondpassentry2controller",function($scope,Sections,getallsecondpass2,updatesecondpass2,toastr,$filter,getsecondpassallocate,$window,ngTableParams,Fields,deleteotherrecord,getlotcategory,getbatchslip,toastr,getbankname,$location,$timeout,$parse,$rootScope)
{
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	$scope.formdata = {};
	$scope.formdata1 = {};
	$scope.formdata1.octmotherchequeentry__lotNumber = {};
	$scope.formdata1.octmotherchequeentry__clgDate = "";
	$scope.formdata1.octmotherchequeentry__batchId = {};
	$scope.secondpass1 = new Array();
	$scope.date = new Date();
	$scope.getAllBatch = {};
	$scope.getAllLots = {};
	
		$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
	}
	
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
		
	$scope.gotodataentry2 = function(misreport)
	{
		console.log("-----"+JSON.stringify(misreport));
		$scope.allocatebatch = getsecondpassallocate.get({"batchId":misreport.batchId,"clgdate":$scope.formdata1.octmotherchequeentry__clgDate,
		"lotnumber":$scope.formdata1.octmotherchequeentry__lotNumber.selectedItem.displaylabel,
		"user":$rootScope.SESS_USER.userId,
		"type":"Othercheque Entry"});

		$window.location = "#/OCTM/secondpassdataentry2?batchId="+misreport.batchId+"=&clgdate="+$scope.formdata1.octmotherchequeentry__clgDate+"&lotnumber="+$scope.formdata1.octmotherchequeentry__lotNumber.selectedItem.displaylabel+"=&userID="+$rootScope.SESS_USER.userId;
	}	

	$scope.showme = function(){
		
		$scope.secondpass = getallsecondpass2.get({"lotNumber":$scope.formdata1.octmotherchequeentry__lotNumber.selectedItem.displaylabel,
		"clgDate":$scope.formdata1.octmotherchequeentry__clgDate,
	"usercode":$rootScope.SESS_USER.userId})
		;		
		$scope.secondpass.$promise.then(function(response){
			console.log("-------"+JSON.stringify(response));
			$scope.setLog(30,"Please wait","");
			if(response.result == "")
			{
				$scope.setLog(50,"Please wait","");
				toastr.info("No record found!",'Alert');
				$scope.setLog(100,"Done","");
				$timeout(function(){
				$scope.proval = 0;
				}, 1000);
				$scope.tableParams.reload();
			}
			else{
				$scope.setLog(50,"Please wait","");
				console.log(JSON.stringify(response));
				$scope.secondpass1 = response.result;
				$scope.totalrecords = response.result.length;
				// $scope.amountcategory = response.result[0].categoryAmount;
				$scope.batchNumber = response.result[0].batchId;
				$scope.userName = response.result[0].fullName;
				$scope.setLog(100,"Done","");
				$timeout(function(){
				$scope.proval = 0;
				}, 1000);
				$scope.tableParams.reload();
			}
		})

	}
					$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								serialNumber: 'asc',
								accountNumber: 'desc',
								chequeNumber: 'desc',
								micrCode: 'desc',
								categoryAmount: 'desc',
								chequeAmount: 'desc'
						},
						filter: {
							serialNumber: '',
								accountNumber: '',
								chequeNumber: '',
								micrCode: '',
								categoryAmount: '',
								chequeAmount: ''
						}
	
					}, {
							total: $scope.secondpass1.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.secondpass1, params.filter()) : $scope.secondpass1;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
						}
					});
});

bpoApps.controller("OCTMmisAllreportcontroller",function($scope,Sections,getreport,getuserreport,$filter,ngTableParams,getmisAllReport,Fields,$location,$timeout,$parse,toastr,$rootScope)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	
	$scope.formdata.MISReport__clgDate = "";
	$scope.formdata.MISReport__lotNumber = {};
	$scope.formdata.MISReport__batchId = "";
	
	

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	
	$scope.sections = Sections.get({"id":54});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
		
	}
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var tmp = $parse(datalist) ;
		
		//tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});
	}

	$scope.batchslip = Array();
	$scope.report = function()
	{		
				// $scope.dt = $filter('date')(new Date($scope.formdata.MISReport__clgDate.split('-').join('-')), "yyyy-MM-dd");
		 		// console.log("=converted date=="+$scope.dt);
				$rootScope.batchId = $scope.formdata.MISReport__batchId;
				$rootScope.clgDate = $scope.dt;
				$rootScope.lotnumber = $scope.formdata.MISReport__lotNumber.selectedItem.lotNumber;
		
				$scope.reportdata = getmisAllReport.get({"batchId":$scope.formdata.MISReport__batchId,"clgdate":$scope.formdata.MISReport__clgDate,"lotnumber":$scope.formdata.MISReport__lotNumber.selectedItem.lotNumber});
				$scope.reportdata.$promise.then(function(response){
				$scope.batchslip = response.result;
				
				
			console.log("response==="+JSON.stringify($scope.batchslip));
				
				//console.log("batch======"+JSON.stringify($scope.batchslip));
				$scope.tableParams.reload();
			});
	}
	
	
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								//fullName: 'desc',
								dataentry: 'desc',
								QC: 'desc',
								total: 'desc'
						},
						filter: {
							//fullName: '',
								batchNumber: '',
								lotNumber: '',
								serialNumber: ''						
						}
					}, {
							total: $scope.batchslip.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.batchslip, params.filter()) : $scope.batchslip;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
});


bpoApps.controller("OCTMdataentryreportcontroller",function($scope,Sections,getreport,getuserreport,$filter,getcreditmis,ngTableParams,Fields,$location,$timeout,$parse,toastr,$rootScope,getDataEntryReport)
{	

	console.log("batchID==="+$rootScope.batchId);
	console.log("clgDate==="+$rootScope.clgDate);
	console.log("lotNumber==="+$rootScope.lotnumber);
	console.log("action==="+$location.search().action);
	$scope.batchslip = Array();
	if($location.search().action=="dataentry")
	{
				$scope.reportdata = getDataEntryReport.get({"batchId":$rootScope.batchId,"clgdate":$rootScope.clgDate,"lotnumber":$rootScope.lotnumber});
				$scope.reportdata.$promise.then(function(response){
				$scope.batchslip = response.result;
				//console.log("FORMDATA==="+JSON.stringify($scope.batchslip));
				$scope.tableParams.reload();
			});
	}
	else
	{	
				$scope.reportdata = getQCReport.get({"batchId":$rootScope.batchId,"clgdate":$rootScope.clgDate,"lotnumber":$rootScope.lotnumber});
				$scope.reportdata.$promise.then(function(response){
				$scope.batchslip = response.result;
				//console.log("FORMDATA==="+JSON.stringify($scope.batchslip));
				$scope.tableParams.reload();
			});
	}
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								//fullName: 'desc',
								batchNumber: 'desc',
								lotNumber: 'desc',
								serialNumber: 'desc',
								chequeAmount: 'desc',
								clgDate: 'desc',
								categoryAmount: 'desc',
								accountNumber: 'desc',
								payinSlipDate: 'desc',
								chequeDate: 'desc',
								chequeNumber: 'desc',
								micrCode: 'desc',
								transCode: 'desc',
								payeeName: 'desc',
								draweeName: 'desc',
								chequeAmnt: 'desc',
								solId: 'desc',
								fullName: 'desc',
								accountNumber2: 'desc'
						},
						filter: {
							//fullName: '',
								batchNumber: '',
								lotNumber: '',
								serialNumber: '',
								chequeAmount: '',
								clgDate: '',
								categoryAmount: '',
								accountNumber: '',
								payinSlipDate: '',
								chequeDate: '',
								chequeNumber: '',
								micrCode: '',
								transCode: '',
								payeeName: '',
								draweeName: '',
								chequeAmnt: '',
								solId: '',
								fullName: '',
								accountNumber2: ''
						}
					}, {
							total: $scope.batchslip.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.batchslip, params.filter()) : $scope.batchslip;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
});


bpoApps.controller("OCTMdatemastercontroller",function($scope,Sections,$filter,Fields,$location,$timeout,getdatemaster,getdatemaster1,$parse,toastr,sessionService)
{
	
	$scope.formdata = {};
	$scope.insertData={};
	//var chequeDate = "";
	//var flag = 0;

	$scope.id = 1;
	
	$scope.sections = Sections.get({"id":53});
	$scope.sections.$promise.then(function(result){
		$scope.sections = result.result;
		angular.forEach(result.result, function(value, key) {
			var fields = Array();
			$scope.sections[key].fields = Array();
			$scope.sections[key].sortedFields = Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
			$scope.getSectionRenderer(value,key);		
		});
	});

				$scope.getdatemasterdata = getdatemaster.get();
			$scope.getdatemasterdata.$promise.then(function(response){
				console.log(JSON.stringify(response));

					$scope.formdata.octmdatemaster__pdcDate = $filter('date')(response.result[0].pdcDate,"MM/dd/yyyy");
					$scope.formdata.octmdatemaster__staleDate= $filter('date')(response.result[0].staleDate,"MM/dd/yyyy");
					$scope.formdata.octmdatemaster__clgDate = $filter('date')(response.result[0].clgDate,"mediumDate");
				});
	
	$scope.getSectionRenderer = function(section,sectionIndex){

		 $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId}); //all core fields
		 $scope.fields.$promise.then(function(result){
				$scope.sections[sectionIndex].fields = result.result;
		 		angular.forEach(result.result, function(value, key) {
			      sessionService.remove(value.fieldId);	
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
	}
	$scope.myDate= function(chequeDate,flag)
	{
		$scope.cYr = ($scope.formdata.octmdatemaster__pdcDate.split('-')[0]);
		$scope.cMnth = ($scope.formdata.octmdatemaster__pdcDate.split('-')[1]);
		$scope.cDate = ($scope.formdata.octmdatemaster__pdcDate.split('-')[2]);
		$scope.formdata.octmdatemaster__pdcDate = $scope.formdata.octmdatemaster__pdcDate + '/' + $scope.cMnth + '/' + $scope.cYr;

			console.log($scope.formdata.octmdatemaster__pdcDate);
	}
	$scope.change = function(field)
	{
		
		console.log("field -> "+field);
				$scope.pdcDate = new Date();	  
		$scope.pdcDate.setDate($scope.formdata.octmdatemaster__clgDate.getDate()+ 2);
		$scope.staleDate = new Date();	
		$scope.staleDate.setDate($scope.formdata.octmdatemaster__clgDate.getDate()- 91);

		$scope.pdcDate = $filter('date')($scope.pdcDate,"MM/dd/yyyy");
		$scope.staleDate = $filter('date')($scope.staleDate,"MM/dd/yyyy");

		$scope.formdata.octmdatemaster__staleDate = $scope.staleDate;
		$scope.formdata.octmdatemaster__pdcDate = $scope.pdcDate;

	}
	
	$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; 
	}
	
	$scope.ChangeDate = function()
	{
		console.log("==formatd== "+JSON.stringify($scope.formdata.octmdatemaster__clgDate));
		$scope.setLog(30,"Please wait Date Updating","");

			$scope.insertData.octmdatemaster__staleDate = $filter('date')(new Date($scope.formdata.octmdatemaster__staleDate.split('-').join('-')), "yyyy-MM-dd");
			$scope.insertData.octmdatemaster__pdcDate = $filter('date')(new Date($scope.formdata.octmdatemaster__pdcDate.split('/').join('/')), "yyyy-MM-dd");
			$scope.insertData.octmdatemaster__clgDate = $filter('date')($scope.formdata.octmdatemaster__clgDate,"yyyy/MM/dd");


			$scope.setLog(50,"Please wait Date Updating","");

			$scope.getdatemasterdata = getdatemaster.get();
			$scope.getdatemasterdata.$promise.then(function(response){
				console.log(JSON.stringify(response));
				if(response.result == "")
				{
					$scope.Field = new Fields();					
					$scope.Field.formData = $scope.insertData;					
					$scope.Field.whr = "";
					$scope.Field.$save(function (response) 
					{
						$scope.formdata.octmdatemaster__pdcDate = $filter('date')(new Date($scope.formdata.octmdatemaster__pdcDate.split('/').join('/')), "MM/dd/yyyy");
						$scope.formdata.octmdatemaster__staleDate= $filter('date')(new Date($scope.formdata.octmdatemaster__staleDate.split('/').join('/')), "MM/dd/yyyy");
						$scope.formdata.octmdatemaster__clgDate = $filter('date')($scope.formdata.octmdatemaster__clgDate,"mediumDate");
						toastr.success('Date updated successfully.!','Done');
						$scope.setLog(100,"Date Updated","");
						$timeout(function(){
							$scope.proval = 0;
						}, 1000);
					});
				}
				else{
					$scope.Field = new Fields();
					$scope.Field.formData = $scope.insertData;
					
					$scope.Field.whr = "and dateId = "+ $scope.id;
					$scope.Field.$save(function (response) 
					{
						
						//$scope.formdata.octmdatemaster__pdcDate = $filter('date')(new Date($scope.formdata.octmdatemaster__pdcDate.split('/').join('/')), "MM/dd/yyyy");
						//$scope.formdata.octmdatemaster__staleDate= $filter('date')(new Date($scope.formdata.octmdatemaster__staleDate.split('/').join('/')), "MM/dd/yyyy");
						//$scope.formdata.octmdatemaster__clgDate = $filter('date')($scope.formdata.octmdatemaster__clgDate,"mediumDate");
						toastr.success('Date updated successfully.!','Done');

						$scope.setLog(100,"Date Updated","");	
							
						$timeout(function(){
							$scope.proval = 0;
						}, 1000);
					});
				}
			})
	}
});




bpoApps.controller("OCTMreplaceBatchAndLotNumbercontroller",function($scope,Sections,getreport,getuserreport,$filter,ngTableParams,getreplaceBatchAndLotNumber,Fields,$location,$timeout,$parse,toastr,deleteBatch)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	
	$scope.formdata.replaceBatchAndLotNo__clgDate = "";
	$scope.formdata.replaceBatchAndLotNo__lotNo = {};	
	$scope.formdata.replaceBatchAndLotNo__batchId = "";
	$scope.formdata.replaceBatchAndLotNo__newClgDate = "";
	$scope.formdata.replaceBatchAndLotNo__newLotNo = {};	
	$scope.formdata.replaceBatchAndLotNo__newBatchId = "";
	$scope.formdata.replaceBatchAndLotNo__chequeEntry = "";
	$scope.formdata.replaceBatchAndLotNo__otherChequeEntry = "";
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	
	$scope.sections = Sections.get({"id":57});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
		
	}
	
	$scope.deleteBatch = function()
	{
		console.log("formdata==="+JSON.stringify($scope.formdata));
		if($scope.formdata.replaceBatchAndLotNo__clgDate=="")
		{
			toastr.error('Please enter clg date!','error');
		}
		else if($scope.formdata.replaceBatchAndLotNo__lotNo.selectedItem=="")
		{
			toastr.error('Please select lot no.!','error');
		}
		else if($scope.formdata.replaceBatchAndLotNo__batchId=="")
		{
			toastr.error('Please enter batch no.!','error');
		}
		else
		{
			if($scope.formdata.replaceBatchAndLotNo__chequeEntry=="")
			{
				$scope.replaceBatchAndLotNo__chequeEntry = "0";
			}
			else
			{$scope.replaceBatchAndLotNo__chequeEntry = "1";}
			if($scope.formdata.replaceBatchAndLotNo__otherChequeEntry=="")
			{
				$scope.replaceBatchAndLotNo__otherChequeEntry = "0";
			}else
			{$scope.replaceBatchAndLotNo__otherChequeEntry = "1";}
					$scope.deleteBatchDatadata = deleteBatch.get({"clgdate":$scope.formdata.replaceBatchAndLotNo__clgDate,"lotnumber":$scope.formdata.replaceBatchAndLotNo__lotNo.selectedItem.lotNumber,"batchId":$scope.formdata.replaceBatchAndLotNo__batchId,"chequeEntry":$scope.replaceBatchAndLotNo__chequeEntry,"otherChequeEntry":$scope.replaceBatchAndLotNo__otherChequeEntry});
				$scope.deleteBatchDatadata.$promise.then(function(response){
					
					if(response.result=="chequeEntryDeleteSucess")
					{
						toastr.success($scope.formdata.replaceBatchAndLotNo__batchId+' -Batch id successfully deleted!','Done');
						$scope.formdata.replaceBatchAndLotNo__clgDate = "";
					$scope.formdata.replaceBatchAndLotNo__lotNo = {};	
					$scope.formdata.replaceBatchAndLotNo__batchId = "";
					$scope.formdata.replaceBatchAndLotNo__chequeEntry = "";
					$scope.formdata.replaceBatchAndLotNo__otherChequeEntry = "";
					}
					else if(response.result=="noRecordFoundChequeEntry")
					{
						toastr.error('Batch not found in cheque entry!','error');
						$scope.formdata.replaceBatchAndLotNo__chequeEntry = "";
					$scope.formdata.replaceBatchAndLotNo__otherChequeEntry = "";
					}
					else if(response.result=="otherChequeEnteryDeleteSucess")
					{
						toastr.success($scope.formdata.replaceBatchAndLotNo__batchId+' -Batch id successfully deleted!','Done');
						$scope.formdata.replaceBatchAndLotNo__clgDate = "";
					$scope.formdata.replaceBatchAndLotNo__lotNo = {};	
					$scope.formdata.replaceBatchAndLotNo__batchId = "";
					$scope.formdata.replaceBatchAndLotNo__chequeEntry = "";
					$scope.formdata.replaceBatchAndLotNo__otherChequeEntry = "";
					}
					else if(response.result=="noRecordFoundotherChequeEntery")
					{
						toastr.error('Batch not found in other cheque entry!','error');
						$scope.formdata.replaceBatchAndLotNo__chequeEntry = "";
					$scope.formdata.replaceBatchAndLotNo__otherChequeEntry = "";
					}
					else if(response.result=="pleaseSeleCorO")
					{
						toastr.error('Please select cheque entry or other cheque entry!','error');
					}
					
					});
					
			
		}
		
		
		}
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var tmp = $parse(datalist) ;
		
		//tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});
	}

	$scope.setLog = function(proval, currentstatus, css){
  		if (proval!="") $scope.proval = proval;
  		if(currentstatus!="") $scope.currentstatus = currentstatus;
  		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
 	}

	$scope.replaceBatchAndLotNumber = Array();
	$scope.report = function()
	{		
		console.log("formdata==="+JSON.stringify($scope.formdata));
		if($scope.formdata.replaceBatchAndLotNo__clgDate=="")
		{
			toastr.error('Please enter clg date!','error');
		}
		else if($scope.formdata.replaceBatchAndLotNo__lotNo.selectedItem=="")
		{
			toastr.error('Please select lot no.!','error');
		}
		else if($scope.formdata.replaceBatchAndLotNo__batchId=="")
		{
			toastr.error('Please enter batch no.!','error');
		}
		else if($scope.formdata.replaceBatchAndLotNo__newClgDate=="")
		{
			toastr.error('Please enter new clg date!','error');
		}
		else if($scope.formdata.replaceBatchAndLotNo__newLotNo.selectedItem=="")
		{
			toastr.error('Please select new lot no.!','error');
		}
		else if($scope.formdata.replaceBatchAndLotNo__newBatchId=="")
		{
			toastr.error('Please enter new batch no.!','error');
		}
		else
		{	
			if($scope.formdata.replaceBatchAndLotNo__chequeEntry=="")
			{
				$scope.replaceBatchAndLotNo__chequeEntry = "0";
			}
			else
			{$scope.replaceBatchAndLotNo__chequeEntry = "1";}
			if($scope.formdata.replaceBatchAndLotNo__otherChequeEntry=="")
			{
				$scope.replaceBatchAndLotNo__otherChequeEntry = "0";
			}else
			{$scope.replaceBatchAndLotNo__otherChequeEntry = "1";}
				$scope.setLog(30,"Please wait Batch Replacing","");
				console.log("=formdata=="+$scope.formdata);
				//$scope.dt = $filter('date')(new Date($scope.formdata.replaceBatchAndLotNo__clgDate.split('-').join('-')), "yyyy-MM-dd");
		 		//console.log("=converted date=="+$scope.dt);
				//$scope.dtNew = $filter('date')(new Date($scope.formdata.replaceBatchAndLotNo__newClgDate.split('-').join('-')), "yyyy-MM-dd");
		 		//console.log("=converted datdtNewe=="+$scope.dtNew);
				
				$scope.reportdata = getreplaceBatchAndLotNumber.get({"clgdate":$scope.formdata.replaceBatchAndLotNo__clgDate,"lotnumber":$scope.formdata.replaceBatchAndLotNo__lotNo.selectedItem.lotNumber,"batchId":$scope.formdata.replaceBatchAndLotNo__batchId,"newclgdate":$scope.formdata.replaceBatchAndLotNo__newClgDate,"newlotnumber":$scope.formdata.replaceBatchAndLotNo__newLotNo.selectedItem.lotNumber,"newbatchId":$scope.formdata.replaceBatchAndLotNo__newBatchId,"chequeEntry":$scope.replaceBatchAndLotNo__chequeEntry,"otherChequeEntry":$scope.replaceBatchAndLotNo__otherChequeEntry});
				$scope.reportdata.$promise.then(function(response){
					$scope.setLog(50,"Please wait Batch Replacing","");
					console.log("result==="+response.result[0]);
					console.log("result==="+response.result[1]);
					
					console.log("-------"+JSON.stringify(response.result));
				if(response.result[0]=="MasterUpdated")
				{
					
					$scope.setLog(100,"Batch Replaced","");
					$timeout(function(){
					$scope.proval = 0;
					}, 1000);
					if(response.result[1]=="chequeEntry")
					{
						toastr.success('Cheque entry updated successfully!','Done');
					}
					else
					{
						toastr.success('Other cheque entry updated successfully!','Done');
					}
					$scope.formdata.replaceBatchAndLotNo__clgDate = "";
					$scope.formdata.replaceBatchAndLotNo__lotNo = {};
					$scope.formdata.replaceBatchAndLotNo__batchId = "";
					$scope.formdata.replaceBatchAndLotNo__newClgDate = "";
					$scope.formdata.replaceBatchAndLotNo__newLotNo = {};	
					$scope.formdata.replaceBatchAndLotNo__newBatchId = "";
					$scope.formdata.replaceBatchAndLotNo__chequeEntry="";
					$scope.formdata.replaceBatchAndLotNo__otherChequeEntry="";
				}
				else
				{
					toastr.error('Batch not updated!','error');
				}
				
			});
	}
	}
});
bpoApps.controller("OCTMbatchStatuscontroller",function($scope,Sections,getreport,getuserreport,$filter,ngTableParams,getbatchStatus,Fields,$location,$timeout,$parse,toastr,CORE_CONFIG,WEB_API,Batch,CSVImport)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	
	$scope.formdata.batchStatus__clgDate = "";
	$scope.formdata.batchStatus__lotNo = {};	
	
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	
	$scope.sections = Sections.get({"id":58});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
		
	}
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var tmp = $parse(datalist) ;
		
		//tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});
	}
	

	$scope.batchStatus = Array();
	$scope.report = function()
	{		
		if($scope.formdata.batchStatus__clgDate=="")
		{
			toastr.error('Please enter clg date!','error');
		}
		else if($scope.formdata.batchStatus__lotNo.selectedItem=="")
		{
			toastr.error('Please select lot no.!','error');
		}		
		else
		{
				$scope.reportdata = getbatchStatus.get({"clgdate":$scope.formdata.batchStatus__clgDate,"lotnumber":$scope.formdata.batchStatus__lotNo.selectedItem.lotNumber});
				$scope.reportdata.$promise.then(function(response){					
					$scope.batchStatus = response.result;					
					if(response.result=="")
					{
						toastr.error('No record found!','error');	
					}
					$scope.tableParams.reload();				
			});
		}
	}
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {},
						filter: {
								batchNumber: '',
								categoryAmount: '',
								fullName: '',
								chequeEntryCount: ''						
						}
					}, {
							total: $scope.batchStatus.lenpaygth,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.batchStatus, params.filter()) : $scope.batchStatus;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
});


bpoApps.controller("OCTMdailyOutputcontroller",function($scope,Sections,getreport,getuserreport,$filter,ngTableParams,getdailyOutput,Fields,$location,$timeout,$parse,toastr)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	
	$scope.formdata.dailyOutput__fromDate = "";
	$scope.formdata.dailyOutput__toDate = "";
	$scope.formdata.dailyOutput__morethanlakhDate = "";
	$scope.formdata.dailyOutput__chequeNo = "";	
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	
	$scope.sections = Sections.get({"id":59});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
		
	}
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var tmp = $parse(datalist) ;
		
		//tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});
	}
	
	$scope.dailyOutput = Array();
	$scope.report = function()
	{		
		if($scope.formdata.dailyOutput__fromDate=="")
		{
			toastr.error('Please enter from date!','error');
		}
		else if($scope.formdata.dailyOutput__toDate=="")
		{
			toastr.error('Please enter to date!','error');
		}
		else if($scope.formdata.dailyOutput__chequeNo=="")
		{
			toastr.error('Please enter cheque no.!','error');
		}	
		else
		{		
			if($scope.formdata.dailyOutput__morethanlakhDate==true)
			{
				$scope.morethanlakh="1";
			}
			else
			{
				$scope.morethanlakh="0";
			}
			console.log("=formdata=="+JSON.stringify($scope.formdata));
				//$scope.fromDate = $filter('date')(new Date($scope.formdata.dailyOutput__fromDate.split('-').join('-')), "yyyy-MM-dd");
				//$scope.toDate = $filter('date')(new Date($scope.formdata.dailyOutput__toDate.split('-').join('-')), "yyyy-MM-dd");
				
				$scope.reportdata = getdailyOutput.get({"fromdate":$scope.formdata.dailyOutput__fromDate,"todate":$scope.formdata.dailyOutput__toDate,"morethanlakh":$scope.morethanlakh,"chequeNo":$scope.formdata.dailyOutput__chequeNo});
				$scope.reportdata.$promise.then(function(response){
					console.log("total cheque==="+JSON.stringify(response.result));
					//console.log("total cheque==="+JSON.stringify(response.result[0].totalCheque));
					if(response.result=="")
					{
						toastr.error('No record found!','error');						
					//console.log("result==="+totalCheques);
					}
					else
					{
						$scope.dailyOutput = response.result;
						$scope.totalCheques = response.result[0].totalCheque;
						/*angular.forEach($scope.dailyOutput, function(value, key) {
  						console.log(key + ': ' + JSON.stringify(value));
						});*/				
						console.log("total cheque==="+JSON.stringify(response.result[0].totalCheque));
						}
					
					
					$scope.tableParams.reload();
				
			});
		}
	}
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								batchNumber: 'desc',
								clgDate: 'desc',
								categoryAmount: 'desc',
								serialNumber: 'desc',
								chequeNumber: 'desc',
								accountNumber2: 'desc',
								chequeAmnt: 'desc',
								micrCode: 'desc',
								transCode: 'desc',
								payeeName: 'desc',
								endTime: 'desc',
								fullName: 'desc'								
						},
						filter: {
								batchNumber: '',
								clgDate: '',
								categoryAmount: '',
								serialNumber: '',
								chequeNumber: '',
								accountNumber2: '',
								chequeAmnt: '',
								micrCode: '',
								transCode: '',
								payeeName: '',
								endTime: '',
								fullName: ''						
						}
					}, {
							total: $scope.dailyOutput.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.dailyOutput, params.filter()) : $scope.dailyOutput;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
});


bpoApps.controller("OCTMproductivityreportcontroller",function($scope,Sections,getreport,getuserreport,$filter,ngTableParams,getproductivityreport,Fields,$location,$timeout,$parse,toastr)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	
	$scope.formdata.productivityReport__fromDate = "";
	$scope.formdata.productivityReport__toDate = "";
	//$scope.formdata.productivityReport__lotNo = {};
	//$scope.formdata.productivityReport__daily = "";
	//$scope.formdata.productivityReport__monthly = "";	
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	
	$scope.sections = Sections.get({"id":60});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
		
	}
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var tmp = $parse(datalist) ;
		
		//tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});
	}
	
	$scope.productivityreport = Array();
	$scope.report = function()
	{		
		if($scope.formdata.productivityReport__fromDate=="")
		{
			toastr.error('Please enter from date!','error');
		}
		else if($scope.formdata.productivityReport__toDate=="")
		{
			toastr.error('Please enter to date!','error');
		}			
		else
		{
			console.log("=formdata=="+JSON.stringify($scope.formdata));
				//$scope.fromDate = $filter('date')(new Date($scope.formdata.productivityReport__fromDate.split('-').join('-')), "yyyy-MM-dd");
				//$scope.toDate = $filter('date')(new Date($scope.formdata.productivityReport__toDate.split('-').join('-')), "yyyy-MM-dd");
				
				$scope.reportdata = getproductivityreport.get({"fromdate":$scope.formdata.productivityReport__fromDate,"todate":$scope.formdata.productivityReport__toDate});
				$scope.reportdata.$promise.then(function(response){
					
					$scope.productivityreport = response.result;					
					console.log("result==="+JSON.stringify(response));
					
					if(response.result=="")
					{
						toastr.error('No record found!','error');	
					}
					$scope.formdata.productivityReport__fromDate = "";
					$scope.formdata.productivityReport__toDate = "";
					$scope.tableParams.reload();
				
			});
		}
	}
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								fullName: 'desc',
								Entry: 'desc',
								categoryAmount: 'desc',
								count: 'desc'								
						},
						filter: {
								fullName: '',
								Entry: '',
								categoryAmount: '',
								count: ''						
						}
					}, {
							total: $scope.productivityreport.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.productivityreport, params.filter()) : $scope.productivityreport;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
});

bpoApps.controller("OCTMhourlyproductivityreportcontroller",function($scope,Sections,getreport,getuserreport,$filter,ngTableParams,gethourlyproductivityreport,Fields,$location,$timeout,$parse,toastr)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	
	$scope.formdata.hourlyProductivityReport__date = "";
		
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	
	$scope.sections = Sections.get({"id":61});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
		
	}
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var tmp = $parse(datalist) ;
		
		//tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});
	}
	
	$scope.hourlyProductivityreport = Array();
	$scope.report = function()
	{		
		if($scope.formdata.hourlyProductivityReport__date=="")
		{
			toastr.error('Please enter from date!','error');
		}
		else
		{		
			
			console.log("=formdata=="+JSON.stringify($scope.formdata));
				//$scope.dt = $filter('date')(new Date($scope.formdata.hourlyProductivityReport__date.split('-').join('-')), "yyyy-MM-dd");
				
				
				$scope.reportdata = gethourlyproductivityreport.get({"selectdate":$scope.formdata.hourlyProductivityReport__date});
				$scope.reportdata.$promise.then(function(response){
					
					$scope.hourlyProductivityreport = response.result;					
					console.log("result==="+JSON.stringify(response));
					
					if(response.result=="")
					{
						toastr.error('No record found!','error');	
					}
					
					$scope.tableParams.reload();
				
			});
		}
	}
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								Operator: 'desc',
								Zero: 'desc',
								One: 'desc',
								Two: 'desc',
								Three: 'desc',
								Four: 'desc',
								Five: 'desc',
								Six: 'desc',
								Seven: 'desc',
								Eight: 'desc',
								Nine:'desc',
								Ten:'desc',
								OneOne:'desc',
								OneTwo:'desc',
								OneThree:'desc',
								OneFour:'desc',
								OneFive:'desc',
								OneSix:'desc',
								OneSeven:'desc',
								OneEight:'desc',
								OneNine:'desc',
								TwoZero:'desc',
								TwoOne:'desc',
								TwoTwo:'desc',
								TwoThree:'desc',
								TwoFour:'desc'								
						},
						filter: {
								Operator: '',
								Zero: '',
								One: '',
								Two: '',
								Three: '',
								Four: '',
								Five: '',
								Six: '',
								Seven: '',
								Eight: '',
								Nine:'',
								Ten:'',
								OneOne:'',
								OneTwo:'',
								OneThree:'',
								OneFour:'',
								OneFive:'',
								OneSix:'',
								OneSeven:'',
								OneEight:'',
								OneNine:'',
								TwoZero:'',
								TwoOne:'',
								TwoTwo:'',
								TwoThree:'',
								TwoFour:''						
						}
					}, {
							total: $scope.hourlyProductivityreport.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.hourlyProductivityreport, params.filter()) : $scope.hourlyProductivityreport;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   console.log("------"+JSON.stringify(orderedData));
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
});

bpoApps.controller("OCTMamountlogcontroller",function($scope,Sections,getreport,getuserreport,$filter,ngTableParams,getamountLog,Fields,$location,$timeout,$parse,toastr)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	
	$scope.formdata.amountLog__clgDate = "";
	$scope.formdata.amountLog__lotNo = {};
	$scope.formdata.amountLog__category = {};
	$scope.formdata.amountLog__nonCtsCategory = {};
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	
	$scope.sections = Sections.get({"id":62});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
		
	}
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var tmp = $parse(datalist) ;
		
		//tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});
	}
	
$scope.chequeEntry=true;
$scope.otherChequeEntry=true;	
$scope.change = function(field,value)
{
	console.log("==field=="+field);
	console.log("==value=="+value);
	
	if(field=="amountLog__chequeEntry")
	{
		$scope.formdata.amountLog__otherChequeEntry="";
		$scope.formdata.amountLog__otherChequeEntry=false;
		if($scope.formdata.amountLog__chequeEntry=true)
		{
			$scope.otherChequeEntry=true;
			$scope.chequeEntry=false;
		}
	}
	if(field=="amountLog__otherChequeEntry")
	{
		//alert("cheque");
		$scope.formdata.amountLog__chequeEntry="";
		$scope.formdata.amountLog__chequeEntry=false;
		if($scope.formdata.amountLog__otherChequeEntry=true)
		{
			$scope.chequeEntry=true;
			$scope.otherChequeEntry=false;
		}
	}
	
}
	
	$scope.amountLog = Array();
	$scope.report = function()
	{		
				console.log("=formdata=="+JSON.stringify($scope.formdata));
				//$scope.dt = $filter('date')(new Date($scope.formdata.amountLog__clgDate.split('-').join('-')), "yyyy-MM-dd");
		 		//console.log("=converted date=="+$scope.dt);
				if($scope.formdata.amountLog__chequeEntry==true)
				{
					$scope.Category = $scope.formdata.amountLog__category.selectedItem.categoryId;
				}
				else 
				{
					$scope.Category = $scope.formdata.amountLog__nonCtsCategory.selectedItem.nonCtsCategoryId;
				}
				
				$scope.reportdata = getamountLog.get({"clgdate":$scope.formdata.amountLog__clgDate,"category":$scope.Category,"lotNo":$scope.formdata.amountLog__lotNo.selectedItem.lotNumber});
				$scope.reportdata.$promise.then(function(response){
				$scope.amountLog = response.result;
				console.log("response======="+JSON.stringify(response));
				if(response.result=="")
				{
					toastr.error('No record found!','error');
				}
				$scope.tableParams.reload();
			});
	}
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								batchNumber: 'desc',
								clgDate: 'desc',
								categoryAmount: 'desc',
								lotNumber: 'desc',
								accountNumber: 'desc',
								chequeNumber: 'desc',
								micrCode: 'desc',
								chequeAmount: 'desc',
								fullName: 'desc',
								chequeAmnt2: 'desc',
								fullName2: 'desc'
								
						},
						filter: {
								batchNumber: '',
								clgDate: '',
								categoryAmount: '',
								lotNumber: '',
								accountNumber: '',
								chequeNumber: '',
								micrCode: '',
								chequeAmount: '',
								fullName: '',
								chequeAmnt2: '',
								fullName2: '',						
						}
					}, {
							total: $scope.amountLog.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.amountLog, params.filter()) : $scope.amountLog;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
});

bpoApps.controller("OCTMchequebookrequestMIScontroller",function($scope,Sections,getreport,getuserreport,$filter,ngTableParams,getchequebookrequestMIS,Fields,$location,$timeout,$parse,toastr)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	
	$scope.formdata.chequeBookRequestMIS__requestDate = "";
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	
	$scope.sections = Sections.get({"id":63});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
		
	}
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var tmp = $parse(datalist) ;
		
		//tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});
	}
	//$scope.hide = true;
	$scope.chequeBookRequestMIS = Array();
	$scope.report = function()
	{		
				console.log("=formdata=="+JSON.stringify($scope.formdata));
				//$scope.dt = $filter('date')(new Date($scope.formdata.chequeBookRequest__requestDate.split('-').join('-')), "yyyy-MM-dd");
		 		//console.log("=converted date=="+$scope.dt);
		
				$scope.reportdata = getchequebookrequestMIS.get({"requestdate":$scope.formdata.chequeBookRequestMIS__requestDate});
				$scope.reportdata.$promise.then(function(response){
				$scope.chequeBookRequestMIS = response.result;
				$scope.requestDate = $scope.formdata.chequeBookRequestMIS__requestDate;
				if($scope.chequeBookRequestMIS=="")
				{
					toastr.error('No record found!','error');
				}
				console.log("response==="+JSON.stringify($scope.chequeBookRequestMIS));
				$scope.tableParams.reload();
			});
	}
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								requestId: 'desc',
								accountNumber: 'desc',
								payeeName: 'desc'
						},
						filter: {
								requestId: '',
								accountNumber: '',
								payeeName: ''						
						}
					}, {
							total: $scope.chequeBookRequestMIS.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.chequeBookRequestMIS, params.filter()) : $scope.chequeBookRequestMIS;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   console.log("-------"+JSON.stringify(orderedData));
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
});

bpoApps.controller("OCTMcategorybillingreportcontroller",function($scope,Sections,getreport,getuserreport,$filter,ngTableParams,getcategoryBillingReport,Fields,$location,$timeout,$parse,toastr)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	
	$scope.formdata.categoryBillingReport__requestMonth = "";
	//$scope.formdata.categoryBillingReport__ICICIOCTM = "";
	//$scope.formdata.categoryBillingReport__ICICIOCTMPAYEEDRWAEESOLIDCOUNT = "";
	//$scope.formdata.categoryBillingReport__ICICIOCTMUSERENTRYCOUNT = "";
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	
	$scope.sections = Sections.get({"id":64});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
		
	}
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var tmp = $parse(datalist) ;
		
		//tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});
	}
	//$scope.hide = true;
	$scope.categoryBillingReport = Array();
	$scope.report = function()
	{	
			if($scope.formdata.categoryBillingReport__requestMonth=="")
			{
				toastr.error('Please enter month and year!','error');
			}
			
			else
			{
				console.log("=formdata=="+JSON.stringify($scope.formdata));
				$scope.dt = $scope.formdata.categoryBillingReport__requestMonth.split('/');
		 		console.log("=converted date=="+$scope.dt);
				
				$scope.reportdata = getcategoryBillingReport.get({"Month":$scope.dt});
				$scope.reportdata.$promise.then(function(response){
				$scope.categoryBillingReport = response.result;
				$scope.requestDate = $scope.formdata.billingReport__requestDate;
				if($scope.categoryBillingReport=="")
				{
					toastr.error('No record found!','error');
				}
				console.log("response==="+JSON.stringify($scope.categoryBillingReport));
				
				$scope.tableParams.reload();
			});
			}
	}
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								requestId: 'desc',
								accountNumber: 'desc',
								payeeName: 'desc'
						},
						filter: {
								requestId: '',
								accountNumber: '',
								payeeName: ''						
						}
					}, {
							total: $scope.categoryBillingReport.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.categoryBillingReport, params.filter()) : $scope.categoryBillingReport;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   //console.log("-------"+JSON.stringify(orderedData));
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
});

bpoApps.controller("OCTMdrwaeepayeebillingreportcontroller",function($scope,Sections,getreport,getuserreport,$filter,ngTableParams,getdrwaeePayeeBillingReport,Fields,$location,$timeout,$parse,toastr)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	
	$scope.formdata.drwaeePayeeBillingReport__requestMonth = "";
	//$scope.formdata.categoryBillingReport__ICICIOCTM = "";
	//$scope.formdata.categoryBillingReport__ICICIOCTMPAYEEDRWAEESOLIDCOUNT = "";
	//$scope.formdata.categoryBillingReport__ICICIOCTMUSERENTRYCOUNT = "";
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	
	$scope.sections = Sections.get({"id":65});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
		
	}
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var tmp = $parse(datalist) ;
		
		//tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});
	}
	//$scope.hide = true;
	$scope.drwaeePayeeBillingReport = Array();
	$scope.report = function()
	{	
			if($scope.formdata.drwaeePayeeBillingReport__requestMonth=="")
			{
				toastr.error('Please enter month and year!','error');
			}
			else
			{
				console.log("=formdata=="+JSON.stringify($scope.formdata));
				$scope.dt = $scope.formdata.drwaeePayeeBillingReport__requestMonth.split('/');
		 		console.log("=converted date=="+$scope.dt);
				
				$scope.reportdata = getdrwaeePayeeBillingReport.get({"Month":$scope.dt});
				$scope.reportdata.$promise.then(function(response){
				$scope.drwaeePayeeBillingReport = response.result;
				$scope.requestDate = $scope.formdata.drwaeePayeeBillingReport__requestDate;
				if($scope.drwaeePayeeBillingReport=="")
				{
					toastr.error('No record found!','error');
				}
				console.log("response==="+JSON.stringify($scope.drwaeePayeeBillingReport));
				
				$scope.tableParams.reload();
			});
			}
	}
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								requestId: 'desc',
								accountNumber: 'desc',
								payeeName: 'desc'
						},
						filter: {
								requestId: '',
								accountNumber: '',
								payeeName: ''						
						}
					}, {
							total: $scope.drwaeePayeeBillingReport.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.drwaeePayeeBillingReport, params.filter()) : $scope.drwaeePayeeBillingReport;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   //console.log("-------"+JSON.stringify(orderedData));
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
});

bpoApps.controller("OCTMuserentrybillingreportcontroller",function($scope,Sections,getreport,getuserreport,$filter,ngTableParams,getuserEntryBillingReport,Fields,$location,$timeout,$parse,toastr)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	
	$scope.formdata.userEntryBillingReport__requestMonth = "";
	//$scope.formdata.categoryBillingReport__ICICIOCTM = "";
	//$scope.formdata.categoryBillingReport__ICICIOCTMPAYEEDRWAEESOLIDCOUNT = "";
	//$scope.formdata.categoryBillingReport__ICICIOCTMUSERENTRYCOUNT = "";
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	
	$scope.sections = Sections.get({"id":66});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
		
	}
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var tmp = $parse(datalist) ;
		
		//tmp.assign($scope, data);
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});
	}
	//$scope.hide = true;
	$scope.userEntryeBillingReport = Array();
	$scope.report = function()
	{	
			if($scope.formdata.userEntryBillingReport__requestMonth=="")
			{
				toastr.error('Please enter month and year!','error');
			}
			else
			{
				console.log("=formdata=="+JSON.stringify($scope.formdata));
				$scope.dt = $scope.formdata.userEntryBillingReport__requestMonth.split('/');
		 		console.log("=converted date=="+$scope.dt);
				
				$scope.reportdata = getuserEntryBillingReport.get({"Month":$scope.dt});
				$scope.reportdata.$promise.then(function(response){
				$scope.userEntryeBillingReport = response.result;
				$scope.requestDate = $scope.formdata.userEntryeBillingReport__requestDate;
				if($scope.userEntryeBillingReport=="")
				{
					toastr.error('No record found!','error');
				}
				console.log("response==="+JSON.stringify($scope.userEntryeBillingReport));
				
				$scope.tableParams.reload();
			});
			}
	}
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								requestId: 'desc',
								accountNumber: 'desc',
								payeeName: 'desc'
						},
						filter: {
								requestId: '',
								accountNumber: '',
								payeeName: ''						
						}
					}, {
							total: $scope.userEntryeBillingReport.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.userEntryeBillingReport, params.filter()) : $scope.userEntryeBillingReport;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   //console.log("-------"+JSON.stringify(orderedData));
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
});

bpoApps.controller("OCTMgeneratereportcontroller",function($scope,Sections,$filter,ngTableParams,getGenerateReport,getGenerateTEXT,getGenerateTEXTPatti,getGenerateTEXTCts,Fields,$location,$timeout,$parse,toastr,CORE_CONFIG,WEB_API)
{	//alert("IN");
	$scope.currentRow = 0;
	$scope.formdata = {};	
	$scope.formdata.generateOutput__reportType = {};
	$scope.formdata.generateOutput__clgDate = "";
	$scope.formdata.generateOutput__rejectionType = {};
	$scope.formdata.generateOutput__lotNo = "";
	$scope.formdata.generateOutput__batchNo = "";
	$scope.formdata.generateOutput__companyNameCheck = "";
	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	
	$scope.sections = Sections.get({"id":67});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
	}
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var tmp = $parse(datalist) ;
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});
	}
	$scope.generateReport = Array();
	$scope.getGenerateTEXT = Array();
	$scope.report = function()
	{	//alert("IN2");
		if($scope.formdata.generateOutput__companyNameCheck==true)
		{
			$scope.generateOutput__companyNameCheck="Vara United";
		}
		else
		{
			$scope.generateOutput__companyNameCheck="0";
		}
		if($scope.formdata.generateOutput__rejectionType.selectedItem==null)
		{
			$scope.generateOutput__rejectionType="0";
		}
		else
		{
			$scope.generateOutput__rejectionType=$scope.formdata.generateOutput__rejectionType.selectedItem.nonCtsCategoryId;
		}
		if($scope.formdata.generateOutput__batchNo=="")
		{
			$scope.generateOutput__batchNo="0";
		}
		else
		{
			$scope.generateOutput__batchNo=$scope.formdata.generateOutput__batchNo;
		}		
		if($scope.formdata.generateOutput__reportType=='Rejection')
		{
			if($scope.generateOutput__batchNo==0 && $scope.generateOutput__rejectionType==0)
			{
				$scope.reportdata = getGenerateReport.get({"clgDate":$scope.formdata.generateOutput__clgDate,"rejectionType":$scope.generateOutput__rejectionType,"lotNumber":$scope.formdata.generateOutput__lotNo,"batchId":$scope.generateOutput__batchNo,"company":$scope.generateOutput__companyNameCheck});
					$scope.reportdata.$promise.then(function(response){
						console.log("=====response1======"+JSON.stringify(response));
						if(response.result!="")
						{
							//toastr.success("File created sucessfully!",'Done');
						}else{
							//toastr.error("No record found!",'error');
							}
				});	
			
				$scope.reportdata1 = getGenerateTEXT.get({"clgDate":$scope.formdata.generateOutput__clgDate,"rejectionType":$scope.generateOutput__rejectionType,"lotNumber":$scope.formdata.generateOutput__lotNo});
					$scope.reportdata1.$promise.then(function(response){						
						if(response.result!="")
						{
							toastr.success("File created sucessfully!",'Done');
							$scope.formdata.generateOutput__rejectionType={};
							$scope.formdata.generateOutput__lotNo = "";
							$scope.formdata.generateOutput__batchNo = "";
							$scope.formdata.generateOutput__companyNameCheck = "";
						}else{
							toastr.error("No record found!",'error');}
				});
			}
			else
			{
				console.log("=======response2======"+JSON.stringify($scope.formdata));
				$scope.reportdata1 = getGenerateTEXTPatti.get({"clgDate":$scope.formdata.generateOutput__clgDate,"rejectionType":$scope.generateOutput__rejectionType,"lotNumber":$scope.formdata.generateOutput__lotNo,"batchId":$scope.generateOutput__batchNo,"company":$scope.generateOutput__companyNameCheck});
					$scope.reportdata1.$promise.then(function(response){
						console.log("=======response2======"+JSON.stringify(response));
						if(response.result!="")
						{
						window.location = CORE_CONFIG.WEB_SERVICE+WEB_API.GENERATETEXTPATTI+"/"+$scope.formdata.generateOutput__clgDate+"/"+$scope.generateOutput__rejectionType+"/"+$scope.formdata.generateOutput__lotNo+"/"+$scope.generateOutput__batchNo+"/"+$scope.generateOutput__companyNameCheck;
							toastr.success("File created sucessfully!",'Done');
							$scope.formdata.generateOutput__rejectionType={};
							$scope.formdata.generateOutput__lotNo = "";
							$scope.formdata.generateOutput__batchNo = "";
							$scope.formdata.generateOutput__companyNameCheck = "";
						}else{
							toastr.error("No record found!",'error');}
				});
			}
		}
		else if($scope.formdata.generateOutput__reportType=='CTS')
		{
			$scope.reportdata1 = getGenerateTEXTCts.get({"clgDate":$scope.formdata.generateOutput__clgDate,"lotNumber":$scope.formdata.generateOutput__lotNo,"batchId":$scope.generateOutput__batchNo,"company":$scope.generateOutput__companyNameCheck});
				$scope.reportdata1.$promise.then(function(response){
					console.log("=======response2======"+JSON.stringify(response));
					if(response.result!="")
					{
							toastr.success("File created sucessfully!",'Done');
							$scope.formdata.generateOutput__lotNo = "";
							$scope.formdata.generateOutput__batchNo = "";
							$scope.formdata.generateOutput__companyNameCheck = "";
					}else{
						toastr.error("No record found!",'error');}
			});	
		}
			
	}
	
});

bpoApps.controller("OCTMbatchStatusForSecondPasscontroller",function($scope,Sections,getreport,getuserreport,$filter,ngTableParams,getbatchStatusForSecondPass,Fields,$location,$timeout,$parse,toastr,CORE_CONFIG,WEB_API,Batch,CSVImport)
{	
	$scope.currentRow = 0;
	$scope.formdata = {};
	$scope.formdata.batchStatusForSecondPass__clgDate = "";
	$scope.formdata.batchStatusForSecondPass__lotNo = {};	
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  	$scope.format = $scope.formats[0];
	$scope.sections = Sections.get({"id":68});
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
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
				});
		 });
	}
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var tmp = $parse(datalist) ;
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
				if(value[scopevar] == $scope.formdata[scopevar]){
					accessor.assign($scope, {"selectedItem":value});
				}
		});
	}
	$scope.batchStatusForSecondPass = Array();
	$scope.report = function()
	{		
		if($scope.formdata.batchStatusForSecondPass__clgDate=="")
		{
			toastr.error('Please enter clg date!','error');
		}
		else if($scope.formdata.batchStatusForSecondPass__lotNo.selectedItem=="")
		{
			toastr.error('Please select lot no.!','error');
		}		
		else
		{
				$scope.reportdata = getbatchStatusForSecondPass.get({"clgdate":$scope.formdata.batchStatusForSecondPass__clgDate,"lotnumber":$scope.formdata.batchStatusForSecondPass__lotNo.selectedItem.lotNumber});
				$scope.reportdata.$promise.then(function(response){					
					$scope.batchStatusForSecondPass = response.result;					
					if(response.result=="")
					{
						toastr.error('No record found!','error');	
					}
					$scope.tableParams.reload();				
			});
		}
	}
	$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {},
						filter: {
								batchNumber: '',
								categoryAmount: '',
								fullName: '',
								chequeEntryCount: ''						
						}
					}, {
							total: $scope.batchStatusForSecondPass.lenpaygth,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.batchStatusForSecondPass, params.filter()) : $scope.batchStatusForSecondPass;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
							   params.total(orderedData.length);
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
});