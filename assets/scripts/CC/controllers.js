bpoApps.controller("ccSearchAppController",function($scope,Sections,Fields,$location,$timeout,$parse,$rootScope,toastr,SearchApp)
{
	$scope.formdata={};
	$scope.searchApp=function()
	{
		//alert($scope.formdata.appRefNo);
		window.location = '#/CC/dataEntry?process=3&appref='+$scope.formdata.appRefNo;
	}
	
})

bpoApps.controller("ccDataEntryController",function($scope,Sections,Fields,$anchorScroll,$location,$timeout,$parse,CCAllocateRecord,$rootScope,toastr,CCFields,Process,$routeParams,Data,CalculateAge,$http,CCGetJob,CORE_CONFIG,coreTable,$filter,$anchorScroll,ProcessField,CCPrepopulated,sessionService,Snippet,Previous,SearchApp,$rootScope,Pincode,CheckSerialNo)
{
	

	$rootScope.snippetState = true;

		$('label,input').bind('cut copy paste', function (e) {
			e.preventDefault(); //disable cut,copy,paste
		});
	
	$scope.field = {
		"model":"fieldmodel"
		}
	
	$scope.formdata = { 
		"section":"",
		"allsections":[],
		"field":"",
		"allfields":[]
	};

	$scope.formdata = 
	
	/*	 
$scope.options = { 	  
						controls : 
						{
							 toolbar : true, 
							 numPage: 1
						}, 
						zoom : {
			            value : 0.5,
            			step : 0.01
				        }
				};

$scope.overlays =  [{x : 0, y:50, w:300, h:80, color:'#fff600', alpha:0.7}];
*/

	$scope.overlays =  [{x : 0, y:0, w:300, h:300, color:'#fff600',alpha:0.4}];
	$scope.rects = Array();
	
	$scope.options = { controls : { toolbar : true, numPage: 2}};



		$scope.currentSection = -1;

		$scope.entryId = null;
		
		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  	$scope.format = $scope.formats[0];
		$scope.formdata = {};
		$scope.formdata1={};		
		$scope.isStarted=false;
		$scope.isImage=true;
		$scope.fileInput="";
		$scope.hideCCNumber=false;
		$scope.isValid = true;
		$scope.prevEntryId="0";
		$scope.fieldIds = [];
		$scope.getDefault=false;
		$scope.isProfession=false;
		$scope.isSupp2=false;
		$scope.isSupp1=false;
		$scope.isaccount=false;
		$scope.isOther=false;
		$scope.isOccOther=false;
		$scope.formdata.ccdataentry__RejectionCatId="";
		$scope.started=true;
		$scope.isBusiness=true;
		$scope.getDateCon = function(){
			//alert("TEST");	
		}

		//DEDAULT VALUE

		

		// ******************* MISC FUNCTIONS START
		
			$scope.setLog = function(proval, currentstatus, css){
				if (proval!="") $scope.proval = proval;
				if(currentstatus!="") $scope.currentstatus = currentstatus;
				if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
			}

		

		
		// ******************* MISC FUNCTIONS END

		// ******************* FOR DROP DOWN STARTED
		$scope.getAllItems = function(data, datalist, accessor, scopevar){
		// SCOPEVAR IS DBVAL
			console.log("Accessor ::"+accessor);
			console.log("scopevar ::"+scopevar);
			console.log("data ::"+JSON.stringify(data));
			console.log("datalist ::"+datalist);
			var lblaccessor = accessor;
			if($scope.formdata[lblaccessor]!=null){
				if($scope.formdata[lblaccessor].selectedItem == null){
					if($scope.formdata[lblaccessor] == ""){
						$scope.formdata[lblaccessor]={};	
					}
					 
				}
			}
			else{
				$scope.formdata[lblaccessor]={};	
			}
			
			
			
			var tmp = $parse(datalist) ;
			tmp.assign($scope, data);

			accessor = "formdata['"+accessor+"']";
			var accessor = $parse(accessor); 
			angular.forEach(data, function(value, key) {
				

				if($scope.formdata[lblaccessor] != null){
					if($scope.formdata[lblaccessor].selectedItem != null){
						if(value[scopevar] == $scope.formdata[lblaccessor].selectedItem[scopevar]  ){  

							accessor.assign($scope, {"selectedItem":value});
								console.log("accessors123selecteditem----->"+JSON.stringify($scope.formdata))
						}				
					}
					else if($scope.formdata[lblaccessor] != ""){
						if(value[scopevar] == $scope.formdata[lblaccessor] ){  //||  $routeParams.process == 1|| 1==1			
							$scope.formdata[lblaccessor] = {};
							accessor.assign($scope, {"selectedItem":value});
									console.log("accessors123----->"+JSON.stringify($scope.formdata))	
							}	
					}
				}
			});
			 if(datalist=="getWorkOccupation")
			{
							if($scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="Y0" 
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="Y1" 
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="Y2"
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="Y4" 
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="Y5" 
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="Y9"
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="Z9" 
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="N1" 
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="N2"
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="N7" 
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="H1" 
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="H3"
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="H4" 
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="H5" 
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="H9"
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="X9" 
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="J7" 
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="A1"
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="J0" )
							{	
								$scope.formdata.ccdataentry__yourWorkOccupationCatId.selectedItem=$scope.getWorkOccupation[2];
							}
							if($scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="Y6" 
							|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="Y7" )
							{$scope.formdata.ccdataentry__yourWorkOccupationCatId.selectedItem=$scope.getWorkOccupation[3];}
				
			}
			
			if(datalist == "getImage"){
				$scope.formdata.ccdataentry__imageTypeId.selectedItem=$scope.getImage[0];
			}
			
		}
		
		// ******************* FOR DROP DOWN ENDED


		// ******************* FOR ALL SECTIONS DEFINITION STARTED
		$scope.allSections = new coreTable();
		$scope.allSections = coreTable.get({"tbl":"coresectionmaster","whr":" and sectionId in (5,6,7,8,9,10,11)"});

		$scope.allSections.$promise.then(function(result){
			$scope.allSections = result.result;
		});
		
		// ******************* FOR ALL SECTIONS DEFINITION ENDED

		
		// ******************* FOR TOP TOOLBAR STARTED
		$scope.topSectionId=12;
		$scope.topSection = Sections.get({"id":$scope.topSectionId});
		$scope.topSection.$promise.then(function(result){
			$scope.topSection = result.result;
			angular.forEach(result.result, function(value, key) {
				var fields = Array();
				$scope.topSection[key].fields = Array();
				$scope.topSection[key].sortedFields = Array([],[],[]);
				$scope.getSectionRenderer(value,key);	
	//			$scope.setLog(50,"Reading all fields",""); // = function(proval, currentstatus, css, newlog)
			
			});
		});
		
		$scope.getSectionRenderer = function(section,sectionIndex){
 
			 $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
			 $scope.fields.$promise.then(function(result){				
			 
			 
			 
					$scope.topSection[sectionIndex].fields = result.result;

					angular.forEach(result.result, function(value, key) {	
					 //console.log(JSON.stringify(value));
						$scope.topSection[sectionIndex].sortedFields[value.row].push(value) ;
						$scope.loading = true;
						
					});
					
					$scope.getTopMapping();
					
					$scope.topSection[sectionIndex].sortedFields[2].push(   {
        "metai": "",
        "fieldId": "99999",
        "fieldName": "Start New Record",
        "fieldDescription": "",
        "fieldTypeId": "10",
        "metaInfo":{"functionName":'startFunction'},
		"row":"2",
		"col":"5",
		"colwidth":"2",
		"accesskey":"s"
    },{
        "metai": "",
        "fieldId": "99999",
        "fieldName": "Previous",
        "fieldDescription": "",
        "fieldTypeId": "10",
        "metaInfo":{"functionName":'getPrevious'},
		"row":"2",
		"col":"6",
		"colwidth":"2"
    }) ;
					
					/*
				$scope.setLog(100,"Received all fields",""); // = function(proval, currentstatus, css, newlog)
					$timeout(function(){
						$scope.proval = 0;
					}, 2000);*/
					
					
					
			 });
			
		}

		$scope.actionClick = function(action){
			if(action == "startFunction"){
				$scope.startFunction();
			}
			if(action == "getPrevious"){
				$scope.getPrevious();
			}
			
		}

		$scope.showSection = function(index, sectionId){
			$scope.currentSection = index;
			//alert(index)
			if($scope.allSections[index]["sortedFields"] == null || 1==1){
				if(sectionId == 0){				
					sectionId = $scope.allSections[$scope.currentSection].sectionId;
				}
				$scope.mainSection = Sections.get({"id":sectionId});
				$scope.mainSection.$promise.then(function(result){
	
					$scope.mainSection  = result.result;
					angular.forEach(result.result, function(value, key) {
						var fields = Array();
						$scope.mainSection[key].fields = Array();
						$scope.mainSection[key].sortedFields = Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
						$scope.getMainSectionRenderer(value,key);	
					});
				});
				$scope.getMainSectionRenderer = function(section,sectionIndex){
//					$scope.gotoAnchor(section.sectionId)
					 $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
					 $scope.fields.$promise.then(function(result){				
							$scope.mainSection[sectionIndex].fields = result.result;
							
						
							angular.forEach(result.result, function(value, key) {	
							
								var newkey = key;
								if(result.result[key-1] != null){
									newkey = Number(key)-1;
								}
								value.prevFieldId = result.result[newkey].fieldId;
								$scope.mainSection[sectionIndex].sortedFields[value.row].push(value) ;
								$scope.loading = true;
								$scope.fieldIds.push(value.fieldId);

							});
							$scope.allSections[$scope.currentSection]["sortedFields"] = $scope.mainSection[sectionIndex].sortedFields;
							
							$scope.getMapping(0);
							console.log("section:::::::::::::"+JSON.stringify($scope.mainSection[sectionIndex].sortedFields));
							if(sectionId!=5)
							{
								if($scope.allSections[$scope.currentSection]["sortedFields"][1][0].fieldTypeId!=11)
								{
									//console.log("main section >>>"+JSON.stringify($scope.allSections[$scope.currentSection]["sortedFields"][1][0]));

									$timeout(function(){
										$("#"+$scope.allSections[$scope.currentSection]["sortedFields"][1][0].fieldId).focus();	
									 }, 500);
								}
								else
								{
									//console.log("main section 11 >>>"+JSON.stringify($scope.allSections[$scope.currentSection]["sortedFields"][2][0]));

									$timeout(function(){
									$("#"+$scope.allSections[$scope.currentSection]["sortedFields"][2][0].fieldId).focus();	
								 	}, 500);
								}
						}
							
						if($scope.formdata.ccdataentry__logoCodeId != null){
							if($scope.formdata.ccdataentry__logoCodeId.selectedItem != null){
								$scope.$broadcast('getDDLData',{"model":"ccdataentry__pricingId","whr":" and logoId="+$scope.formdata.ccdataentry__logoCodeId.selectedItem.logoId});	
							}
						}
	
						if($scope.formdata.ccdataentry__logoCodeId != null){
							if($scope.formdata.ccdataentry__logoCodeId.selectedItem != null){
							$scope.$broadcast('getDDLData',{"model":"ccdataentry__promoId","whr":" and logoId="+$scope.formdata.ccdataentry__logoCodeId.selectedItem.logoId});	
							}
						}
						if($scope.formdata.ccdataentry__dmaID != null){
							if($scope.formdata.ccdataentry__dmaId.selectedItem != null){
							$scope.$broadcast('getDDLData',{"model":"ccdataentry__dmaCity","whr":" and dmaId="+$scope.formdata.ccdataentry__dmaId.selectedItem.dmaId});							 
							}	
						}
						
						
						 
					 });
					
				}			
				
				
			}
			else{
				$scope.mainSection[0] = $scope.allSections[$scope.currentSection];
				$scope.getMapping(0);

			}
			//console.log(">>>>>>..."+JSON.stringify($scope.mainSection[sectionIndex].sortedFields));
			if(sectionId==5)
			{
					$scope.formdata.ccdataentry__courieStampDate=$filter('date')(new Date(), 'dd/MM/yyyy'); 													 			}
			if(sectionId==11)
			{
					if($scope.ProcessId==1 || $scope.ProcessId==3)
					{
					$scope.formdata.ccdataentry__applicantSignatureDate=$filter('date')(new Date(), 'dd/MM/yyyy');
					}
			}	
									
		}
		
		
		$scope.getMapping = function(sectionIndex){
				$scope.selFields = [];
				angular.forEach($scope.mainSection[sectionIndex].fields, function(value, key) {					
					$scope.selFields.push(value.fieldId);
				});				
					$scope.processField = ProcessField.get({"fieldIds":$scope.selFields.toString(),"processId":$routeParams.process});
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

							$timeout(function(){
								$scope.getPrepopulated();
							 }, 5000);
						
			
		});
		
	}
	
		$scope.getTopMapping = function(){
				$scope.selTopFields = [];
				angular.forEach($scope.topSection[0].fields, function(value, key) {					
					$scope.selTopFields.push(value.fieldId);
				});				
					$scope.topprocessField = ProcessField.get({"fieldIds":$scope.selTopFields.toString(),"processId":$routeParams.process});
					$scope.topprocessField.$promise.then(function(result){
						$scope.topprocessField = result.result;
			
						angular.forEach($scope.selTopFields, function(value, key) {
							value.isEnabled = false;
							value.isPrePopulated = false;
							value.isValidated = false;
							angular.forEach($scope.topprocessField, function(subvalue, key) {
								 if(subvalue.fieldId == value.fieldId){
										if(subvalue.enable  == "1") value.isEnabled = true;
										if(subvalue.prepopulated == "1") value.isPrePopulated = true;
										if(subvalue.validation == "1") value.isValidated = true;
								 }
							});
			
						});
			
		});
		
	}	
		
		
		$scope.getPrepopulated = function(){
		
		$scope.prepopulated = CCPrepopulated.get({"fieldIds":$scope.fieldIds.toString(),"recordId":$scope.prevEntryId});
		$scope.prepopulated.$promise.then(function(result){
			$scope.prepopulated = result.result[0];
			
			//console.log("************************************* SCOP VAR:"+JSON.stringify($scope.getPromoCode));
//			console.log();
			
			angular.forEach($scope.prepopulated, function(value, key) {

				angular.forEach($scope.mainSection[0].sortedFields, function(rowvalue, rowkey) {
 					angular.forEach(rowvalue, function(fieldvalue, fieldkey) {
						
 						if(fieldvalue.model == 'ccdataentry__'+key){	
							fieldvalue.prevVal = value;
							
							if(fieldvalue.fieldTypeId == 2){
							//	console.log("*************************************"+JSON.stringify(fieldvalue.prevVal)+":"+JSON.stringify($scope[fieldvalue.metaInfo.datalist])+":>"+fieldvalue.metaInfo.datalist);
								angular.forEach($scope[fieldvalue.metaInfo.datalist], function(value, key) {
									

									var newobj = angular.fromJson(fieldvalue.metai);
									
									if(fieldvalue.prevVal == value[newobj.Val]){
										fieldvalue.prevVal = value[newobj.DisplayLabel];
										
									}
								});
								}
							
							var tmpProcessField = $filter('filter')($scope.processField, {"fieldId":fieldvalue.fieldId})[0];
							//console.log("--------->processfields"+JSON.stringify(tmpProcessField)+":"+JSON.stringify(fieldvalue.fieldId));
							
							
					if(tmpProcessField != null){
						
							if(tmpProcessField.prepopulated == "1"){
//								alert(JSON.stringify(fieldvalue));									
								if(fieldvalue.fieldTypeId == "1" || fieldvalue.fieldTypeId == "5" || fieldvalue.fieldTypeId == "14") {
									$scope.formdata[fieldvalue.model] = value;	
								}
								
								if(fieldvalue.fieldTypeId == "2") {
									
									//console.log("####>"+JSON.stringify($scope.getAllBanks));
									var col = (fieldvalue.metaInfo.Val);
									var tmpVal = null;

									angular.forEach($scope[fieldvalue.metaInfo.datalist], function(orival, orikey) {
										if(orival[col] == value){
										tmpVal = orival;	
										}
									});						
									if(tmpVal != null){
									//console.log("@@@>"+JSON.stringify(fieldvalue)+":"+JSON.stringify(tmpVal));
									$scope.formdata[fieldvalue.model].selectedItem = tmpVal; //$scope[fieldvalue.metaInfo.datalist][2];	
									}
								}
							}
							
							if(tmpProcessField.validation == "1"){
								fieldvalue.prevValidation = true;	
							}else
							{
								fieldvalue.prevValidation = false;	
							}
						
					}

							
						}
					 
					});			 
				});
				
				 
			});

		});
	}
	
		//Cheque date from db : needs to convert in DD-MM-YYYY format
		$scope.myDate = function(chequeDate,flag)
		{	//alert(chequeDate);
		$scope.myDate1 = $scope.cYr = $scope.cMnth = $scope.tmpMnth = $scope.cDate = "";
		$scope.cDate = chequeDate.toString();
		
		if(flag == 2)
		{
			//YYYY-MM-DD
			$scope.cYr = ($scope.cDate.split('/')[2]);
			$scope.tmpEndMnth = ($scope.cDate.split('/')[0]);
			$scope.cMnth = ($scope.cDate.split('/')[1]);
			$scope.cDate = ($scope.tmpEndMnth.split(',')[0]);
			$scope.myDate1 =  $scope.cYr + '-' + $scope.cMnth + '-' + $scope.cDate;
		}
		return $scope.myDate1;
	}
	
		$scope.resetform = function(){
		//console.log("FILLED:"+JSON.stringify($scope.formdata));

			angular.forEach($scope.formdata, function(value,key) {
				//console.log(">>KEY:"+key);							
				if(value != null){
					if(!value.selectedItem){
						//console.log(">>:"+JSON.stringify(value));							
						value = "";
						$scope.formdata[key] = "";
						//console.log("<<"+JSON.stringify(value));							
					}
				}
			});

			$scope.form1.$setPristine();			
			$scope.form1.$setValidity();			
			$scope.form1.$setPristine();
			$scope.form1.$setValidity();
			$scope.form1.$setUntouched();
//			$scope.$apply();

			 document.getElementById("form1").reset();
			//console.log("EMPTY:"+JSON.stringify($scope.formdata));
		}

			
		
		// ******************* FOR TOP TOOLBAR ENDED


		// ******************* FOR PROCESS STARTED	
		$scope.ProcessId = $routeParams.process;
	
		$scope.process = Process.get({"id":$scope.ProcessId});
		$scope.process.$promise.then(function(result){
			$scope.process = result.result[0];
			
		});
		// ******************** FOR PROCESS ENDED
		

		// ***************** START FUNCTION TO GET RECORD STARTED
		
		$scope.startFunction=function()
		{
								
//			    $("#421").val($("#421 option:eq(1)").val());
			var tmpAgency = $scope.formdata.ccdataentry__agencyid;
			if(JSON.stringify($scope.formdata.ccdataentry__agencyid) != "{}"){
			
			$scope.getRecords=CCAllocateRecord.get({"processId":$scope.process.processId
		,"userId":$rootScope.SESS_USER.userId,"agencyCode":$scope.formdata.ccdataentry__agencyid.selectedItem.agencyId})
		
			$scope.getRecords.$promise.then(function(response)
			{
 
				if(response.result==null)
				{
					toastr.info("No Records");
					$scope.started=true;
				}
				
				else
				{	
				//	console.log("&&&&response.result"+JSON.stringify(response.result));
				
					$scope.isStarted=true;
					$scope.started=false;
					var appserial = document.getElementsByName("App Serial No")[0];
						$timeout(function(){
							appserial.focus();
					   }, 500);
					if(response.result[0].imageName=='image base' || response.result[0].imageType=='1')
					{
					//******BLOCK FOR INCOMPLETE RECORDS
						angular.forEach(response.result[0], function(value, key) {
					
							if(response.result[0].isIncomplete=="true")
							{
							//	co/nsole.log("key>>>>>>>>>>>>"+key);
								if(key!="dataentryId" && key!="imageType" && key!="isIncomplete" && key!="mappingId"
								&& key!="applicationNo" && key!="allocatedApplication" && key!="imageName" && key!="jobNo"
								&& key!="agencyid" && key!="imageTypeId" && key!="logoCodeId" && key!="fullName" && key!="entryId")
								{
									if(value!=0)
									{
									$scope.formdata["ccdataentry__"+key]=value;
									}
								}
								if(key=="logoCodeId")
								{
									if(value!=="0")
									{
									$scope.formdata["ccdataentry__"+key]=value;
									
									$timeout(function(){
										$scope.$broadcast('getDDLData',{"model":"ccdataentry__"+key,"whr":"select cclogomaster.logoCode as displaylabel,cclogomaster.* from cclogomaster where logoId="+value});
									}, 2000);
									
								}
								}
							}
						
						});

						
						$scope.showSection(0,5);
						
						$scope.getJobNo=CCGetJob.get({"application":response.result[0].allocatedApplication});
						$scope.getJobNo.$promise.then(function(data){
						$http.get(CORE_CONFIG.SERVER_IP+"//storage\\apps\\cc\\"+response.result[0].jobNo+"\\"
						+tmpAgency.selectedItem.agencyCode+"\\Mapped_Images\\"+response.result[0].allocatedApplication,{responseType: "blob"}).success(function(data){
								 var file = new File([data], "a.tif", {type: "image/tiff"});
								$scope.fileInput = file;
								
							});	
						})
					}
					else
					{
						$scope.showSection(0,5);
						
						$scope.isImage=false;
						$scope.hideCCNumber=true;
					}
					if($scope.ProcessId==3)
					{$scope.userName=response.result[0].fullName}
						if(response.result[0].isIncomplete=="false")
					{
						$scope.formdata.ccdataentry__varaControlNo=response.result[0].applicationNo;
						$scope.formdata.ccdataentry__ApplRefNo=response.result[0].applicationNo;
						$scope.formdata.ccdataentry__ccNumber=response.result[0].allocatedApplication;
					}
					$scope.prevEntryId=response.result[0].entryId;
					$scope.entryId=response.result[0].dataentryId;
					$scope.setLog(100,"Received all fields",""); // = function(proval, currentstatus, css, newlog)
					$timeout(function(){
						$scope.proval = 0;
					}, 2000);
					
			
				}
			})	
				//console.log("--------------------------->"+JSON.stringify($scope.formdata));

		}
		else
		{

			toastr.error("Please select agency code","Error");
		}
	}
		
		// ***************** START FUNCTION TO GET RECORD ENDED
		//******************* SAVE NEXT
		$scope.saveNext = function(index, sectionId, loadNext, form){
				$scope.isFieldLevelValid = true; //form.$valid;			
			
			if($scope.isFieldLevelValid){
			//	alert($scope.currentSection);
				var d1 = $filter('date')($scope.formdata.ccdataentry__dateOfBirth, "yyyy/mm/dd");
				//	$scope.formdata.ccdataentry__applicantSignatureDate
				$scope.formdata.ccdataentry__courieStampDate=$filter('date')(new Date(), 'yyyy/MM/dd');
				//$scope.formdata.ccdataentry__courieStampDate=$filter('date')(new Date(), 'yyyy/MM/dd');
								$scope.formdata.ccdataentry__currentSection=$scope.currentSection;
				$scope.Fields = new Fields();
			//	$scope.Fields.formData = $scope.formdata;
				$scope.Fields.formData = angular.copy($scope.formdata); 
				
				 angular.forEach($scope.Fields.formData, function(value,key) {
					if(value!=null)
					{
						if(value.selectedItem != null ){
							$scope.Fields.formData[key] = value.selectedItem.dbval;
						}
						
					}
					else
					{
												//console.log("key::::::::"+key+"value:::::::"+JSON.stringify(value))

					}
				});
				$scope.Fields.whr=" and entryId = "+$scope.entryId;
				$scope.Fields.$save(function (response) {
					toastr.success("Saved");
						
					if(loadNext){
												
						if($scope.currentSection == ($scope.allSections.length-1)){
							// $scope.startFunction();
							$scope.isStarted = false;
							angular.forEach($scope.formData, function(value,key) {
								if(!value.selectedItem){
									$scope.isSpace=$scope.value.replace("\s\s","\s")
									//console.log(" $scope.isSpace---->"+$scope.isSpace); 
									$scope.value = "";
								}
							});
						$scope.showSection(0, 0);
					//	alert(index)	
						if(index==7){
							if(confirm("Load Next Record"))
							{
								angular.forEach($scope.formdata, function(value,key) {
									if(value != null ){
										if(!value.selectedItem && key!="ccdataentry__batchNo"){
											value = "";
											$scope.formdata[key] = "";
										}
									
										else
										{
											if(key!="ccdataentry__agencyid" && key !="ccdataentry__imageTypeId")
											{
											value.selectedItem={};
											}
										}
									}
								});
								$scope.form1.$setPristine();			
								$scope.form1.$setValidity();			
								$scope.form1.$setPristine();
								$scope.form1.$setValidity();
								$scope.form1.$setUntouched();
					//			$scope.$apply();
					
								 document.getElementById("form1").reset();
								 
								$scope.startFunction();
										
								
							}
							else
								{
									angular.forEach($scope.formdata, function(value,key) {
									if(value != null){
										if(!value.selectedItem){
											value = "";
											$scope.formdata[key] = "";
										}
									
										else
										{
										
											value.selectedItem={};
										}
									}
								});
									$scope.started = true;
								}
							}
						}
						else{
							$scope.showSection(index, sectionId);	
						}
					}
				});
			}else{
			toastr.error("Data entered is invalid, please check each field for validations!");	
			}
	
		}
		//******************* SAVE NEXT
		$scope.asAbove=function()
		{
			
		$scope.formdata.ccdataentry__permanentAddress1=angular.copy($scope.formdata.ccdataentry__currentAddress1);
		$scope.formdata.ccdataentry__permanentAddress2=angular.copy($scope.formdata.ccdataentry__currentAddress2);
		$scope.formdata.ccdataentry__permanentAddress3=angular.copy($scope.formdata.ccdataentry__currentAddress3);
		$scope.formdata.ccdataentry__permanentAddress4=angular.copy($scope.formdata.ccdataentry__currentAddress4);
		$scope.formdata.ccdataentry__permanentLandmark=angular.copy($scope.formdata.ccdataentry__currentLandMark);
		$scope.formdata.ccdataentry__permanentPincode=angular.copy($scope.formdata.ccdataentry__currentPincode);
		$scope.formdata.ccdataentry__permanentCityId=angular.copy($scope.formdata.ccdataentry__currentCityId);
		$scope.formdata.ccdataentry__permanentStateId=angular.copy($scope.formdata.ccdataentry__currentStateId);
		$scope.formdata.ccdataentry__permanentStdCode=angular.copy($scope.formdata.ccdataentry__currentStdCode);
		
		$scope.formdata.ccdataentry__permanentPhone1=angular.copy($scope.formdata.ccdataentry__currentPhone1);
		$scope.formdata.ccdataentry__permanentPhone2=angular.copy($scope.formdata.ccdataentry__currentPhone2);
		$scope.formdata.ccdataentry__permanentFaxNo=angular.copy($scope.formdata.ccdataentry__currentFaxNo);
		$scope.formdata.ccdataentry__permanentEmailId=angular.copy($scope.formdata.ccdataentry__currentEmailId);
		$scope.formdata.ccdataentry__permanentCountryCatId.selectedItem=$scope.getPermanentCountry[0];
		
		/*$scope.formdata.ccdataentry__referenceAddress1=angular.copy($scope.formdata.ccdataentry__currentAddress1);
		$scope.formdata.ccdataentry__referenceAddress2=angular.copy($scope.formdata.ccdataentry__currentAddress2);
		$scope.formdata.ccdataentry__referencePincode=angular.copy($scope.formdata.ccdataentry__currentPincode);
		$scope.formdata.ccdataentry__referenceCityCatId=angular.copy($scope.formdata.ccdataentry__currentCityId);
		$scope.formdata.ccdataentry__referenceStateCatId=angular.copy($scope.formdata.ccdataentry__currentStdCode);
*/
		$scope.formdata.ccdataentry__reference2Address1=angular.copy($scope.formdata.ccdataentry__referenceAddress1);
		$scope.formdata.ccdataentry__reference2Address2=angular.copy($scope.formdata.ccdataentry__referenceAddress2);
		$scope.formdata.ccdataentry__reference2Pincode=angular.copy($scope.formdata.ccdataentry__referencePincode);
		$scope.formdata.ccdataentry__reference2CityCatId=angular.copy($scope.formdata.ccdataentry__referenceCityCatId);
		$scope.formdata.ccdataentry__reference2StateCatId=angular.copy($scope.formdata.ccdataentry__referenceStateCatId);
				
	}	
	
		$scope.selectOnFocus = function(field,prevField){
		}		
		
		// ***************** START ALL VALIDATIONS
		//VC SELECT VALIDATIONS
		$scope.businessValidations = function(value,id,fieldName){ 
			if(id=="ccdataentry__yourWorkOccupationCatId")
			{
				if($scope.formdata.ccdataentry__yourWorkOccupationCatId.selectedItem.displaylabel=="SALARIED")
				{
					$scope.isBusiness=false;
				}
				else
				{
					$scope.isBusiness=true;
				}
			}
			if(id=="ccdataentry__residenceCatId")
			{
					$scope.formdata.ccdataentry__vehicleDescriptionId.selectedItem=$scope.getDescriptionDetails[1];
			}
			
			if(id=="ccdataentry__subStatementEmailCatId")
			{
					if($scope.formdata.ccdataentry__subStatementEmailCatId.selectedItem.displaylabel=="Personal")
					{
						$scope.formdata.ccdataentry__subscriptionEmailId=$scope.formdata.ccdataentry__currentEmailId
					}
					else
					{
						$scope.formdata.ccdataentry__subscriptionEmailId=$scope.formdata.ccdataentry__yourWorkEmailId

					}
				}
			
			if(id=="ccdataentry__subMobAlertCatId")
			{
					if($scope.formdata.ccdataentry__subMobAlertCatId.selectedItem.displaylabel=="Personal")
					{
						$scope.formdata.ccdataentry__subscriptionMobileNo=$scope.formdata.ccdataentry__currentMobile
					}
					else
					{
						$scope.formdata.ccdataentry__subscriptionMobileNo=$scope.formdata.ccdataentry__yourWorkMobile

					}
				}
			
			
			
			if(id=="ccdataentry__agencyid")
			{		
					$scope.Validations=Data.get({"code":value.selectedItem.agencyId,"table":'ccagencymaster',"fieldName":fieldName})
					$scope.Validations.$promise.then(function(result){
					$scope.formdata.ccdataentry__batchNo=result.result[0].batchId;
					});
				}
			
			if(id=="ccdataentry__logoCodeId")
			{
				$scope.$broadcast('getDDLData',{"model":"ccdataentry__pricingId","sql":" SELECT ccpricemaster.priceCode as displaylabel, ccpricemaster.* FROM ccpricemaster WHERE logoId="+$scope.formdata.ccdataentry__logoCodeId.selectedItem.logoId});
				$scope.$broadcast('getDDLData',{"model":"ccdataentry__promoId","sql":"SELECT ccpromocodemaster.promoCode as displaylabel, ccpromocodemaster.* FROM `ccpromocodemaster` WHERE logoId="+$scope.formdata.ccdataentry__logoCodeId.selectedItem.logoId});
			}
			
			if(id=="ccdataentry__RCUCategoryId")
			{		
					if($scope.formdata.ccdataentry__RCUCategoryId.selectedItem.displaylabel=="NO")
					{$scope.hide1=true;}
					else{$scope.hide1=false;}
			}
			
			if(id=="ccdataentry__yourTitleCatId")
			{		
				   if($scope.formdata.ccdataentry__yourTitleCatId.selectedItem.displaylabel!="Others")
					{$scope.hide=true;}
					else{$scope.hide=false;}
					
					if($scope.formdata.ccdataentry__yourTitleCatId.selectedItem.displaylabel == "Ms."){
						$scope.formdata.ccdataentry__YourGenderCatId.selectedItem = $scope.getGender[0];
					}else if ($scope.formdata.ccdataentry__yourTitleCatId.selectedItem.displaylabel == "Mr."){
						$scope.formdata.ccdataentry__YourGenderCatId.selectedItem = $scope.getGender[1];
					}
			}
			
			if(id=="ccdataentry__YourGenderCatId")
			{		
					if($scope.formdata.ccdataentry__yourTitleCatId.selectedItem.displaylabel=="Ms.")
					{ 
						if($scope.formdata.ccdataentry__YourGenderCatId.selectedItem.displaylabel!="FEMALE")
						{
							 $scope.isValid = false;
							 toastr.error("Please Check Title","Error");
							 $scope.formdata.ccdataentry__YourGenderCatId={};
						}					
					}
					if($scope.formdata.ccdataentry__yourTitleCatId.selectedItem.displaylabel=="Mr.")
					{
						if($scope.formdata.ccdataentry__YourGenderCatId.selectedItem.displaylabel!="MALE")
						{
							$scope.isValid = false;
							 toastr.error("Please Check Title","Error");
							 $scope.formdata.ccdataentry__YourGenderCatId={};
						}
						
					}				
				}			
				
			if(id=="ccdataentry__suppApp1CardRequired")
			{
					
					if($scope.formdata.ccdataentry__suppApp1CardRequired.selectedItem.displaylabel=="NO")
					{
						
						$scope.isSupp1=false
					}
					else
					{
						$scope.isSupp1=true
					}
					
			}
				
			if(id=="ccdataentry__suppApp2CardReqCatId")
			{
					if($scope.formdata.ccdataentry__suppApp2CardReqCatId.selectedItem.displaylabel=="NO")
					{
						$scope.isSupp2=false
					}
					else
					{$scope.isSupp2=true
					}
			}
				
			
			
			if(id=="ccdataentry__YourWorkProfessionCatId")
			{
				if($scope.formdata.ccdataentry__YourWorkProfessionCatId.selectedItem.displaylabel!="OTHERS")
				{
						$scope.isProfession=false;
				}
				else
				{
						$scope.isProfession=true;
				}
			}
			
			if(id=="ccdataentry__yourTitleCatId")
			{
				if($scope.formdata.ccdataentry__yourTitleCatId.selectedItem.displaylabel=="Others")
				{
					$scope.formdata.ccdataentry__YourGenderCatId={};
					$scope.isOther=true;
				}
				else
				{
					$scope.isOther=false;
				}
				
			}
			
			if(id=="ccdataentry__spouseOccupationCatId")
			{
				if($scope.formdata.ccdataentry__spouseOccupationCatId.selectedItem.displaylabel=="OTHERS")
				{
					$scope.isOccOther=true;
				}
				else
				{
					$scope.isOccOther=false;
				}
				
			}
			if(id=="ccdataentry__autoDebitOptCatId")
			{
				if($scope.formdata.ccdataentry__autoDebitOptCatId.selectedItem.displaylabel=="None")
				{
					$timeout(function(){
								$("#413").focus();	
							 }, 500);
				}
				
			}
			/*if(id=="ccdataentry__logoCodeId")
			{
				//alert(""+JSON.stringify($scope.formdata.ccdataentry__logoCodeId.selectedItem))
				if($scope.formdata.ccdataentry__logoCodeId.selectedItem.logoCode=="385")
				{
					//alert("if")
					document.getElementById("#308").required="required";

				}
				else
				{
					//alert("else")
					document.getElementById("#308").required="";
				}
				
			}*/
		
		}
		
		//VC TEXT BLUR EVENT	
		$scope.change=function(id,fieldid,fieldname){
				//alert(id);
			if(id=="ccdataentry__AppSerialNo")
			{
				$scope.serialNo=CheckSerialNo.get({"appSerialNo":$scope.formdata.ccdataentry__AppSerialNo,"processId":$scope.ProcessId});
				$scope.serialNo.$promise.then(function(result){
					console.log("Application serial no"+JSON.stringify(result.result)+"--------->entryId"+$scope.entryId)
						var obj = document.getElementsByName("App Serial No")[0];
						if(result.result!="")
						{
							if(result.result[0].entryId!=$scope.entryId)
							{
								console.log("if-------------->")

								$timeout(function(){
							   		obj.focus();
							   }, 500);
							   toastr.error("Duplicate App Serial No");	
							}
							else
							{
								console.log("else-------------->")
								obj.setCustomValidity("");
								$timeout(function(){
									$("#425").focus(); 
								}, 500);
							}
						}
						else
						{
							console.log("blank result-------------->")

							obj.setCustomValidity("");
							$timeout(function(){
									$("#425").focus(); 
								}, 500);

						}
						/*if(result.result[0].entryId!=$scope.entryId)
						{	
							if(result.result=="")
							{
									obj.setCustomValidity("");
							//document.getElementById(fieldid).setCustomValidity("");
							}
							else
							{
								obj.setCustomValidity("Please check"+fieldname);
								$timeout(function(){
							   		obj.focus();
							   }, 500);
							   toastr.error("Duplicate App Serial No");
							}
						}*/
					})
			}
			
			if(id=="ccdataentry__branchCode")
			{
				$scope.Validations=Data.get({"code":$scope.formdata.ccdataentry__branchCode,"table":'ccbranchmaster',"fieldName":"branchCode"})
					$scope.Validations.$promise.then(function(result){
					console.log("result-----><<<<>>>>"+JSON.stringify(result.result));
					if(result.result!="")
					{
						document.getElementById(fieldid).setCustomValidity("");

					}
					else
					{
						toastr.error("Wrong Branch code")
								document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
								$timeout(function(){
								  $("#"+fieldid).focus(); 
							   }, 500);	
					}
					});
			}
			
			if(id=="ccdataentry__YourWorkCompNameCatId")
			{
				$scope.formdata.ccdataentry__yourWorkAddress1=$scope.formdata.ccdataentry__YourWorkCompNameCatId;
			}
			
			if(id=="ccdataentry__pricingId")
			{
					$scope.Validations=Data.get({"code":$scope.formdata.ccdataentry__logoCodeId.selectedItem.logoId,"table":'ccpricemaster',"fieldName":"logoId"})
					$scope.Validations.$promise.then(function(result){
					console.log("result-----><<<<>>>>"+JSON.stringify(result));
					if(result.result!="")
					{
						var isValidatedPricing = false;
						for(var i=0;i<result.result.length;i++)
						{
							if(result.result[i].priceCode==$scope.formdata.ccdataentry__pricingId)
							{
							
								isValidatedPricing = true;		
							}
							 
						}
						
						
						if(isValidatedPricing == true){
							document.getElementById(fieldid).setCustomValidity("");
						}else{
							toastr.error("Wrong Pricing code")
								document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
								$timeout(function(){
								  $("#"+fieldid).focus(); 
							   }, 500);	
						}
					}
					else
					{
						toastr.error("Wrong Pricing code")
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						$timeout(function(){
       					  $("#"+fieldid).focus(); 
      				   }, 500);
					}
					});
				
				}	
			
			if(id=="ccdataentry__promoId")
			{
					$scope.Validations=Data.get({"code":$scope.formdata.ccdataentry__logoCodeId.selectedItem.logoId,"table":'ccpromocodemaster',"fieldName":"logoId"})
					$scope.Validations.$promise.then(function(result){
					console.log("result-----><<<<>>>>"+result.result[0].logoId);
					if(result.result!="")
					{

						var isValidatedPromo = false;
						for(var i=0;i<result.result.length;i++)
						{
							if(result.result[i].promoCode==$scope.formdata.ccdataentry__promoId)
							{
								//document.getElementById(fieldid).setCustomValidity("");
								isValidatedPromo = true;
							}
						}
						if(isValidatedPromo == true){
							document.getElementById(fieldid).setCustomValidity("");
						}else{
							toastr.error("Wrong Promo code")
								document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
								$timeout(function(){
								  $("#"+fieldid).focus(); 
							   }, 500);	
						}
					}
					else
					{
						toastr.error("Wrong Promo code")
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						$timeout(function(){
       					  $("#"+fieldid).focus(); 
      				   }, 500);
					}
					});
				
				}
				
			if(id=="ccdataentry__dmaId")
			{
					$scope.Validations=Data.get({"code":$scope.formdata.ccdataentry__dmaId,"table":'ccdmamaster',"fieldName":"dmaCode"})
					$scope.Validations.$promise.then(function(result){
					if(result.result!="")
					{
					$scope.formdata.ccdataentry__dmaCity=result.result[0].dmaCity;
					document.getElementById(fieldid).setCustomValidity("");
						$timeout(function(){
       					  $("#223").focus(); 
      				   }, 500);
						
					}
					else
					{
						toastr.error("Wrong DMA Id")
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						$timeout(function(){
       					  $("#"+fieldid).focus(); 
      				   }, 500);
					}
					});
				
				}
			
			if(id=="ccdataentry__iciciSalary_SavingAcNo")
			{
				if($scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="Y1" 
					|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="Y2" 
					|| $scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="Y9" )
				{
					if($scope.formdata.ccdataentry__iciciSalary_SavingAcNo==undefined 
						|| $scope.formdata.ccdataentry__iciciSalary_SavingAcNo=="")
					{
						toastr.error(fieldname+ "Mandatory","Error");
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
					
					}
					else
					{
						document.getElementById(fieldid).setCustomValidity("");

					}
				}
				
			}
		
			if(id=="ccdataentry__autoDebitAccountNo")
			{
				if($scope.formdata.ccdataentry__autoDebitAccountNo!=$scope.formdata.ccdataentry__iciciSalary_SavingAcNo)
				{
					toastr.error("Does'nt match with salary/saving account no.");
				}
			}
		
			if(id=="ccdataentry__yourWork4thLineEmbossing")
			{
				if(($scope.formdata.ccdataentry__logoCodeId.selectedItem.logoCode=='397') 
					|| ($scope.formdata.ccdataentry__logoCodeId.selectedItem.logoCode=='398') 
					|| ($scope.formdata.ccdataentry__logoCodeId.selectedItem.logoCode=='399') 
					|| ($scope.formdata.ccdataentry__logoCodeId.selectedItem.logoCode=='400') 
					|| ($scope.formdata.ccdataentry__logoCodeId.selectedItem.logoCode=='401') 
					|| ($scope.formdata.ccdataentry__logoCodeId.selectedItem.logoCode=='402'))
					{
						
						toastr.error("JP membership number should be there...Is it given on application?","Error");
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
					}
					else
					{
						document.getElementById(fieldid).setCustomValidity("");

					}
			}
				
			if(id=="ccdataentry__inputter2")
			{
				if(($scope.formdata.ccdataentry__surrogateId.selectedItem.surrogateCode=="H2" ) 
				&& ($scope.formdata.ccdataentry__inputter2==undefined || $scope.formdata.ccdataentry__inputter2=="" ))
				{
								document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
								toastr.error("Please insert "+fieldname);	
				}
				else
				{
						document.getElementById(fieldid).setCustomValidity("");
				}
			}
			
			if(id=="ccdataentry__referenceCard")
			{
				if(($scope.formdata.ccdataentry__surrogateId.selectedItem.surrogateCode=="H2") 
				&& ($scope.formdata.ccdataentry__referenceCard==undefined || $scope.formdata.ccdataentry__referenceCard==""))
				{
							document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
								toastr.error("Please insert "+fieldname);	
				}
				else
				{
						document.getElementById(fieldid).setCustomValidity("");
				}
			}
			
			if(id=="ccdataentry__yourLastName")
			{		
				$scope.formdata.ccdataentry__mailingName = $scope.formdata.ccdataentry__yourLastName;
			}
			
			if(id=="ccdataentry__currentPincode")
			{
				if($scope.formdata.ccdataentry__currentPincode=="" || $scope.formdata.ccdataentry__currentPincode==undefined)
				{
				//	alert($scope.formdata.ccdataentry__currentPincode)
					document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
				}
				else
				{
						$scope.Validations=Pincode.get({"pincode":$scope.formdata.ccdataentry__currentPincode})
						$scope.Validations.$promise.then(function(result){
						console.log("Pincode ---->"+JSON.stringify(result.result))
					
					if(result.result!="")
					{
						
						$scope.formdata.ccdataentry__currentCityId=result.result[0].cityname;
						$scope.formdata.ccdataentry__currentStdCode=result.result[0].stdcode;
						$scope.Validations=Data.get({"code":result.result[0].stateshort,"table":'ccstatemaster',"fieldName":"stateAbrevation"})
						$scope.Validations.$promise.then(function(resultstate){
						$scope.formdata.ccdataentry__currentStateId=resultstate.result[0].stateAbrevation;

					});
						$scope.formdata.ccdataentry__currentCountryCatId.selectedItem=$scope.getCountry[0];	
						document.getElementById(fieldid).setCustomValidity("");
						$timeout(function(){
       					  $("#275").focus(); 
      				   }, 500);
						}
					else
					{
						
						toastr.error("Wrong Pincode")	
						$scope.formdata.ccdataentry__currentCityId="";;
						$scope.formdata.ccdataentry__currentStdCode="";
						$scope.formdata.ccdataentry__currentStateId="";
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						$timeout(function(){
       					  $("#"+fieldid).focus(); 
      				   }, 500);
					}
					})
					}
				}
				
			if(id=="ccdataentry__currentPhone1")
			{
				if($scope.formdata.ccdataentry__currentPhone1=="" || $scope.formdata.ccdataentry__currentPhone1==undefined)
				{
					if(!confirm("Capture default"))
					{
							//document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
							document.getElementById(fieldid).focus();
					}
					else
					{
							//document.getElementById(fieldid).setCustomValidity("");
							$scope.formdata.ccdataentry__currentPhone1="2345678";
							$scope.$apply();
					}
				}
			}
				
			if(id=="ccdataentry__currentPhone2")
			{
				if($scope.formdata.ccdataentry__currentPhone2=="" || $scope.formdata.ccdataentry__currentPhone2==undefined)
				{
					if(!confirm("Capture default phone 2"))
					{
						//document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						document.getElementById(fieldid).focus();
					}
					else
					{
						$scope.formdata.ccdataentry__currentPhone2="2345678";
						$scope.$apply();
						//document.getElementById(fieldid).setCustomValidity("");
						
					}
				}
			}
				
			if(id=="ccdataentry__permanentPincode")
			{
				if($scope.formdata.ccdataentry__permanentPincode=="" || $scope.formdata.ccdataentry__permanentPincode==undefined)
				{
				//	alert($scope.formdata.ccdataentry__currentPincode)
					document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
				}
				else
				{
					//$scope.Validations=Data.get({"code":$scope.formdata.ccdataentry__permanentPincode,"table":'ccpincodemasternew',"fieldName":"pincode"})
					$scope.Validations=Pincode.get({"pincode":$scope.formdata.ccdataentry__permanentPincode})
					$scope.Validations.$promise.then(function(result){
					if(result.result!="")
					{
							$scope.formdata.ccdataentry__permanentCityId=result.result[0].cityname;
							$scope.formdata.ccdataentry__permanentStdCode=result.result[0].stdcode;
							$scope.Validations=Data.get({"code":result.result[0].stateshort,"table":'ccstatemaster',"fieldName":"stateAbrevation"})
							$scope.Validations.$promise.then(function(resultstate){
								$scope.formdata.ccdataentry__permanentStateId=resultstate.result[0].stateAbrevation;
							});
						document.getElementById(fieldid).setCustomValidity("");
						$timeout(function(){
       					  $("#293").focus(); 
      				   }, 500);
						$scope.formdata.ccdataentry__permanentCountryCatId.selectedItem=$scope.getPermanentCountry[0];

					}
					else
					{
						toastr.error("Wrong Pincode")	
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						$timeout(function(){
       					  $("#"+fieldid).focus(); 
      				   }, 500);
						
					}

					
					});
				}
				}
				
			if(id=="ccdataentry__permanentPhone1")
			{
				if($scope.formdata.ccdataentry__permanentPhone1=="" || $scope.formdata.ccdataentry__permanentPhone1==undefined)
				{
						if(!confirm("Capture default"))
						{
													document.getElementById(fieldid).focus();

							//document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						}
						else
						{
							$scope.formdata.ccdataentry__permanentPhone1="2345678";
							$scope.$apply();
							//document.getElementById(fieldid).setCustomValidity("");
													
						}
				}
			}
				
			if(id=="ccdataentry__permanentPhone2")
			{
				if($scope.formdata.ccdataentry__permanentPhone2=="" || $scope.formdata.ccdataentry__permanentPhone2==undefined)
				{
						if(!confirm("Capture default"))
					{
						//document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						document.getElementById(fieldid).focus();

					}
					
					else
					{
						$scope.formdata.ccdataentry__permanentPhone2="2345678";
						//document.getElementById(fieldid).setCustomValidity("");
						$scope.$apply()
					}
				}
			}
			
			if(id=="ccdataentry__referencePincode")
			{
				if($scope.formdata.ccdataentry__referencePincode=="" || $scope.formdata.ccdataentry__referencePincode==undefined)
				{
				//	alert($scope.formdata.ccdataentry__currentPincode)
					document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
				}
				else
				{	
				//	$scope.Validations=Data.get({"code":$scope.formdata.ccdataentry__referencePincode,"table":'ccpincodemasternew',"fieldName":"pincode"})
					$scope.Validations=Pincode.get({"pincode":$scope.formdata.ccdataentry__referencePincode})
	
					$scope.Validations.$promise.then(function(result){
						if(result.result!="")
						{
							$scope.formdata.ccdataentry__referenceCityCatId=result.result[0].cityname;
							$scope.Validations=Data.get({"code":result.result[0].stateshort,"table":'ccstatemaster',"fieldName":"stateAbrevation"})
							$scope.Validations.$promise.then(function(resultstate){
								$scope.formdata.ccdataentry__referenceStateCatId=resultstate.result[0].stateAbrevation;
							});
							document.getElementById(fieldid).setCustomValidity("");
							$timeout(function(){
       					  $("#320").focus(); 
      				   }, 500);
						}
						else
						{
							toastr.error("Wrong Pincode")	
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						$timeout(function(){
       					  $("#"+fieldid).focus(); 
      				   }, 500);
						}	
					});
				}
			}
				
			if(id=="ccdataentry__referencePhone1")
			{	
				if($scope.formdata.ccdataentry__referencePhone1=="" || $scope.formdata.ccdataentry__referencePhone1==undefined)
				{
				if(!confirm("Capture default"))
						{
													document.getElementById(fieldid).focus();

							//	document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						}
					
						else
						{
							$scope.formdata.ccdataentry__referencePhone1="2345678";
							//	document.getElementById(fieldid).setCustomValidity("");
							$scope.$apply();	
						}
				}
			}
			
			if(id=="ccdataentry__referenceMobile")
			{
				if($scope.formdata.ccdataentry__referenceMobile=="" || $scope.formdata.ccdataentry__referenceMobile==undefined)
				{
						if(!confirm("Capture default"))
						{
													document.getElementById(fieldid).focus();

							//document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						}
					
						else
						{
							$scope.formdata.ccdataentry__referenceMobile="9111111111";
							//document.getElementById(fieldid).setCustomValidity("");
							$scope.$apply();	
						}
				}
			}
				
			if(id=="ccdataentry__reference2Pincode")
			{
				if($scope.formdata.ccdataentry__reference2Pincode=="" || $scope.formdata.ccdataentry__reference2Pincode==undefined)
				{
				//	alert($scope.formdata.ccdataentry__currentPincode)
					document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
				}
				else
				{		
					
					//$scope.Validations=Data.get({"code":$scope.formdata.ccdataentry__reference2Pincode,"table":'ccpincodemasternew',"fieldName":"pincode"})
					$scope.Validations=Pincode.get({"pincode":$scope.formdata.ccdataentry__reference2Pincode})
					$scope.Validations.$promise.then(function(result){
					if(result.result!="")
						{
							$scope.formdata.ccdataentry__reference2CityCatId=result.result[0].cityname;
							$scope.Validations=Data.get({"code":result.result[0].stateshort,"table":'ccstatemaster',"fieldName":"stateAbrevation"	})
						$scope.Validations.$promise.then(function(resultstate){
							$scope.formdata.ccdataentry__reference2StateCatId=resultstate.result[0].stateAbrevation;
						});
						document.getElementById(fieldid).setCustomValidity("");
						$timeout(function(){
       					  $("#329").focus(); 
      				   }, 500);
					}
					else
					{
						toastr.error("Wrong Pincode")	
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						$timeout(function(){
       					  $("#"+fieldid).focus(); 
      				   }, 500);					}
					
				});
				}
			}
				
			if(id=="ccdataentry__reference2Phone1")
			{
				if($scope.formdata.ccdataentry__reference2Phone1=="" || $scope.formdata.ccdataentry__reference2Phone1==undefined)
				{

						if(!confirm("Capture default"))
						{
													document.getElementById(fieldid).focus();
							//.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						}
					
						else
						{
															$scope.formdata.ccdataentry__reference2Phone1="2345678";
							$scope.$apply();
							//document.getElementById(fieldid).setCustomValidity("");
						}
				}
			}
			
			if(id=="ccdataentry__reference2Mobile")
			{
				if($scope.formdata.ccdataentry__reference2Mobile=="" || $scope.formdata.ccdataentry__reference2Mobile==undefined)
				{
						if(!confirm("Capture default"))
						{
													document.getElementById(fieldid).focus();
							//document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						}
					
						else
						{
															$scope.formdata.ccdataentry__reference2Mobile="9111111111";
							$scope.$apply();
							//document.getElementById(fieldid).setCustomValidity("");
						}
				}
				
			}
			
			if(id=="ccdataentry__panNo")
			{
			//	alert($scope.formdata.ccdataentry__panNo);
				if($scope.formdata.ccdataentry__panNo=="" || $scope.formdata.ccdataentry__panNo==undefined)
				{
					
							document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
								$timeout(function(){
       							  $("#"+fieldid).focus(); 
      						   }, 500);
				}
				else
				{		
						   $yourLastName = angular.uppercase($scope.formdata.ccdataentry__yourLastName.charAt(0));
						  $panNo = $scope.formdata.ccdataentry__panNo;   
						 $abc = $panNo.substr(0,5);
							$stringLastName = $panNo.charAt(4);     
							if($panNo.charAt(3)!='P')
							{
								toastr.error("4th Character Must be P.","Error");
								$timeout(function(){
							 $("#312").focus(); 
							 }, 500);
						  
						   }
					   //console.log("1st five")
					   for(var i=0;i<5;i++)
					   {
						//console.log(" in for ")
						if ((!isNaN(parseInt($panNo.charAt(i))))) 
						{
						 //console.log(" in checking ")
						 
						 toastr.error("1 To 5th Character Must be Alphabet.","Error");       
						 $timeout(function(){
						 $("#312").focus(); 
						 }, 500);
						 i=5;
						}
					   }
					  //
					   if($panNo.charAt(4)!=$yourLastName)
					   {
						//console.log("last NAme==");
						toastr.error("5th Character Must be Your Last Name of First Alphabet.","Error");
						 
					   }
					   for(var j=5;j<9;j++)
					   {
						//console.log("2 nd loop");
						if ((isNaN(parseInt($panNo.charAt(j))))) 
						{
						 //console.log("2nd for");
						 
						 toastr.error("6 To 8  Must be Numbers.","Error");       
						 $timeout(function(){
						  $("#312").focus(); 
						 }, 500);
						// j=9;
						}
					   }
						 if ((!isNaN(parseInt($panNo.charAt(9))))) 
					   {
						toastr.error("Last Character must be Alphabet.","Error");
					   //toastr.error("3rd Character Must be P.","Error");
						 $timeout(function(){
						 $("#312").focus(); 
						 }, 500);
					   }   
										document.getElementById(fieldid).setCustomValidity("");

				}
				/*
				$yourLastName = angular.uppercase($scope.formdata.ccdataentry__yourLastName.charAt(0));
				$panNo = angular.uppercase($scope.formdata.ccdataentry__panNo);			
				$abc = $panNo.substr(0,5);
				$stringLastName = $panNo.charAt(4);					
					if($panNo.charAt(3)!='P')
					{
									toastr.error("4th Character Must be P.","Error");
									document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
					}
					else
					{
						document.getElementById(fieldid).setCustomValidity("");
					}
					for(var i=0;i<5;i++)
					{
						if ((!isNaN(parseInt($panNo.charAt(i))))) 
						{
									toastr.error("1 To 5th Character Must be Alphabet.","Error");							
									document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						}
						else
						{
										document.getElementById(fieldid).setCustomValidity("");
						}
						if($panNo.charAt(4)!=$yourLastName)
						{
								toastr.error("5th Character Must be Your Last Name of First Alphabet.","Error");
									
						}
						for(var j=5;j<9;j++)
							{
								if ((isNaN(parseInt($panNo.charAt(j))))) 
								{
									
									toastr.error("6 To 8  Must be Numbers.","Error");							
									document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
								}
								else
								{
									document.getElementById(fieldid).setCustomValidity("");
						
								}
							}
							if ((!isNaN(parseInt($panNo.charAt(9))))) 
							{
								toastr.error("Last Character must be Alphabet.","Error");
								document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
							}	
							else
							{
								document.getElementById(fieldid).setCustomValidity("");
						
							}		
				}
			*/}
			
			if(id=="ccdataentry__yourWorkBusinessTenureExt")
			{
					if($scope.formdata.ccdataentry__yourWorkBusinessTenureExt>11)
					{
						toastr.error("Tenure Ext Month not greater than 11","Error");
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
					}
					else
					{			document.getElementById(fieldid).setCustomValidity("");
					}
			}
				
			if(id=="ccdataentry__yourWorkCRJobTenureExt")
			{
					if(($scope.formdata.ccdataentry__yourWorkCRJobTenureExt.length>2))
					{
						toastr.error("Tenure Ext not greater than 2","Error");		
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
					}
					else
					{
						document.getElementById(fieldid).setCustomValidity("");
					}
					if($scope.formdata.ccdataentry__yourWorkCRJobTenureExt>11)
					{
						toastr.error("Tenure Ext Month not greater than 11","Error");
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
					}
					else
					{
						document.getElementById(fieldid).setCustomValidity("");
					}
				}
						
			if(id=="ccdataentry__yourWorkPhone1")
			{
				if($scope.formdata.ccdataentry__yourWorkPhone1=="" || $scope.formdata.ccdataentry__yourWorkPhone1==undefined)
				{
						if(!confirm("Capture default"))
						{
													document.getElementById(fieldid).focus();

						//document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						}
					
						else
						{
														$scope.formdata.ccdataentry__yourWorkPhone1="2345678";
							//document.getElementById(fieldid).setCustomValidity("");
							$scope.$apply();
						}
				}
			}
			
			if(id=="ccdataentry__yourWorkPhone2")
			{
				if($scope.formdata.ccdataentry__yourWorkPhone2=="" || $scope.formdata.ccdataentry__yourWorkPhone2==undefined)
				{
						if(!confirm("Capture default"))
						{
													document.getElementById(fieldid).focus();

							//document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						}
					
						else
						{
															$scope.formdata.ccdataentry__yourWorkPhone2="2345678";
							//		document.getElementById(fieldid).setCustomValidity("");
							$scope.$apply();
						}
					}
				}
				
			if(id=="ccdataentry__yourWorkPincode")
			{
				if($scope.formdata.ccdataentry__yourWorkPincode=="" || $scope.formdata.ccdataentry__yourWorkPincode==undefined)
				{
				//	alert($scope.formdata.ccdataentry__currentPincode)
					document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
				}
				else
				{
					//$scope.Validations=Data.get({"code":$scope.formdata.ccdataentry__yourWorkPincode,"table":'ccpincodemasternew',"fieldName":"pincode"})
				$scope.Validations=Pincode.get({"pincode":$scope.formdata.ccdataentry__yourWorkPincode})

					$scope.Validations.$promise.then(function(result){
						if(result.result!="")
						{
						$scope.formdata.ccdataentry__yourWorkCityCatId=result.result[0].cityname;
						$scope.formdata.ccdataentry__yourWorkStdCode=result.result[0].stdcode;
						$scope.Validations=Data.get({"code":result.result[0].stateshort,"table":'ccstatemaster',"fieldName":"stateAbrevation"})
						$scope.Validations.$promise.then(function(resultstate){
							$scope.formdata.ccdataentry__yourWorkStateCatId=resultstate.result[0].stateAbrevation;
						});
						$scope.formdata.ccdataentry__YourWorkCountryCatId.selectedItem=$scope.getWorkCountry[0];
						document.getElementById(fieldid).setCustomValidity("");
						$timeout(function(){
       					  $("#363").focus(); 
      				   }, 500);
						}
						
						else
						{
						toastr.error("Wrong Pincode")	
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						$timeout(function(){
       					  $("#"+fieldid).focus(); 
      				   }, 500);				
						}
					});
				}
			}
					
			if(id=="ccdataentry__yourWorkCRJobTenureExt")
			{
					
					if($scope.formdata.ccdataentry__yourWorkCRJobTenureExt>11)
					{
						toastr.error(fieldname +"cannot be greater than 11","Error");
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
					}
					else
					{document.getElementById(fieldid).setCustomValidity("");
					}
			}
				
			if(id=="ccdataentry__yourWorkNetAIncome")
			{
					
					if($scope.formdata.ccdataentry__yourWorkNetAIncome=="" || $scope.formdata.ccdataentry__yourWorkNetAIncome==undefined)
							if(confirm("Get Default"))
							{
								if($scope.formdata.ccdataentry__surrogateId.selectedItem.surrogateCode=="H1" 
									|| $scope.formdata.ccdataentry__surrogateId.selectedItem.surrogateCode=="N7")
								{
									$scope.formdata.ccdataentry__yourWorkNetAIncome="360000";
									$scope.formdata.ccdataentry__yourWorkTotalIncome=$scope.formdata.ccdataentry__yourWorkNetAIncome;
								}
								 else if($scope.formdata.ccdataentry__surrogateId.selectedItem.surrogateCode=="A7" )
								{
									$scope.formdata.ccdataentry__yourWorkNetAIncome="600000";
									$scope.formdata.ccdataentry__yourWorkTotalIncome=$scope.formdata.ccdataentry__yourWorkNetAIncome;
		
								}
								else if($scope.formdata.ccdataentry__surrogateId.selectedItem.surrogateCode=="Z9" )
								{
									$scope.formdata.ccdataentry__yourWorkNetAIncome="150000";
									$scope.formdata.ccdataentry__yourWorkTotalIncome=$scope.formdata.ccdataentry__yourWorkNetAIncome;
		
								}
								else
								{
										$scope.formdata.ccdataentry__yourWorkNetAIncome="250000";
								}
								document.getElementById(fieldid).setCustomValidity("");

						}
						else
						{
												document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						}
						
						$scope.formdata.ccdataentry__yourWorkTotalIncome=$scope.formdata.ccdataentry__yourWorkNetAIncome;
					}
				
			if(id=="ccdataentry__iciciLoanAcNo")
			{
				if($scope.formdata.ccdataentry__surrogateId.selectedItem.surrogateCode=="N5" 
						|| $scope.formdata.ccdataentry__surrogateId.selectedItem.surrogateCode=="N4" )
				{
					if($scope.formdata.ccdataentry__iciciLoanAcNo==undefined || $scope.formdata.ccdataentry__iciciLoanAcNo=="")
					{
									toastr.error("Enter account no. or reject the form")			
							document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);

					}
					else
					{document.getElementById(fieldid).setCustomValidity("");}
				}
						
			}
			
			if(id=="ccdataentry__currentEmailId")
			{
				if($scope.formdata.ccdataentry__currentEmailId==undefined || $scope.formdata.ccdataentry__currentEmailId=="")
				{
					if($scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="397"
						|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="398"
						|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="399"
						|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="400"
						|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="401"
						|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="402")
					{
						toastr.error("Email Id Mandatory","Error")
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);

					}
					else
					{
						document.getElementById(fieldid).setCustomValidity("");
					}
				}
					if($scope.formdata.ccdataentry__currentEmailId=="NA@NA.COM" 
						|| $scope.formdata.ccdataentry__currentEmailId=="NA@GMAIL.COM"
						|| $scope.formdata.ccdataentry__currentEmailId=="XX@GMAIL.COM"
						|| $scope.formdata.ccdataentry__currentEmailId=="NA@ICICIBANK.COM"
						|| $scope.formdata.ccdataentry__currentEmailId=="NOTPROVIDED@ICICIBANK.COM"
						|| $scope.formdata.ccdataentry__currentEmailId=="XYZ@GMAIL.COM")
					{
						
						toastr.error("Invalid Email Id","Error")
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
					}
					else
					{document.getElementById(fieldid).setCustomValidity("");}
			}
			
			if(id=="ccdataentry__permanentEmailId")
			{
					if($scope.formdata.ccdataentry__permanentEmailId==undefined || $scope.formdata.ccdataentry__permanentEmailId=="")
					{
						if($scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="397"
							|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="398"
							|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="399"
							|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="400"
							|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="401"
							|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="402")
						{
							document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						}
						else
						{	document.getElementById(fieldid).setCustomValidity("");}
					}
					
					if($scope.formdata.ccdataentry__permanentEmailId=="NA@NA.COM" 
						|| $scope.formdata.ccdataentry__permanentEmailId=="NA@GMAIL.COM"
						|| $scope.formdata.ccdataentry__permanentEmailId=="XX@GMAIL.COM"
						|| $scope.formdata.ccdataentry__permanentEmailId=="NA@ICICIBANK.COM"
						|| $scope.formdata.ccdataentry__permanentEmailId=="NOTPROVIDED@ICICIBANK.COM"
						|| $scope.formdata.ccdataentry__permanentEmailId=="XYZ@GMAIL.COM")
					{
						toastr.error("Invalid Email Id","Error")
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);

					}
					else
					{document.getElementById(fieldid).setCustomValidity("");}
					
			}
			
			if(id=="ccdataentry__yourWorkEmailId")
			{
				if($scope.formdata.ccdataentry__yourWorkEmailId==undefined || $scope.formdata.ccdataentry__yourWorkEmailId=="")
					{
						if($scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="397"
							|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="398"
							|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="399"
							|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="400"
							|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="401"
							|| $scope.formdata.ccdataentry__logoCodeId.selectedItem.displaylabel=="402")
						{
							toastr.error("Email Id Mandatory","Error")
							document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
						}
						else
						{document.getElementById(fieldid).setCustomValidity("");}
					}
					
					if($scope.formdata.ccdataentry__yourWorkEmailId=="NA@NA.COM" 
						|| $scope.formdata.ccdataentry__yourWorkEmailId=="NA@GMAIL.COM"
						|| $scope.formdata.ccdataentry__yourWorkEmailId=="XX@GMAIL.COM"
						|| $scope.formdata.ccdataentry__yourWorkEmailId=="NA@ICICIBANK.COM"
						|| $scope.formdata.ccdataentry__yourWorkEmailId=="NOTPROVIDED@ICICIBANK.COM"
						|| $scope.formdata.ccdataentry__yourWorkEmailId=="XYZ@GMAIL.COM")
					{
						toastr.error("Invalid Email Id","Error")
						document.getElementById(fieldid).setCustomValidity("Please insert "+fieldname);
					}
					else
					{document.getElementById(fieldid).setCustomValidity("");}
			}
			
			if(id=="ccdataentry__yourWorkNetMIncome")
			{
				$scope.formdata.ccdataentry__yourWorkNetAIncome=$scope.formdata.ccdataentry__yourWorkNetMIncome*12;
			}
			if(id=="ccdataentry__yourWorkCardLimit")
			{
				if($scope.formdata.ccdataentry__surrogateId.selectedItem.displaylabel=="H2")
				{
					$scope.formdata.ccdataentry__yourWorkNetAIncome=($scope.formdata.ccdataentry__yourWorkCardLimit * 0.4 ) * 12
			$scope.formdata.ccdataentry__yourWorkNetAIncome=$filter('number')($scope.formdata.ccdataentry__yourWorkNetAIncome,2);
				}
			}
		}
		
		//CALENDAR CHANGE EVENT
		$scope.calendarChange1=function(selecteddate,fieldModel,id){ 
			//console.log("selecteddateselecteddateselecteddate"+selecteddate.substr(4,4));
			if(fieldModel=="ccdataentry__suppApp1DateOfBirth" || fieldModel=="ccdataentry__dateOfBirth" || fieldModel=="ccdataentry__spouseDateofBirth" || fieldModel=="ccdataentry__suppApp2DateOfBirth")
			{
				$scope.splitdate=selecteddate.split("-");
//alert($scope.splitdate[1]);
				if(selecteddate.substr(2,2)>12)
				{
					toastr.error("Invalid month")
					
								$timeout(function(){
								$("#"+id).focus();	
							 }, 500);
				}
				else if(selecteddate.substr(0,2)>31)
				{
					toastr.error("Invalid date")
					$timeout(function(){
								$("#"+id).focus();	
							 }, 500)
				}
				
						else
						{
							console.log("ORIGINAL SELECTED DATE:"+selecteddate);
//							$scope.newdate=selecteddate.substr(2,2)+"-"+selecteddate.substr(0,2)+"-"+selecteddate.substr(4,4);
							//$scope.newdate1=$filter('date')(new Date(selecteddate), "dd-MM-yyyy");
							$scope.newdate1=selecteddate.replace("/","-").replace("/","-").replace("/","-");
							console.log("MODIFIED SELECTED DATE:"+$scope.newdate1);

				//alert($scope.newdate1);
				$scope.Validations=CalculateAge.get({"selecteddate":$scope.newdate1})
				$scope.Validations.$promise.then(function(result){
					if(result.result!=true)
					{
						toastr.error("Age allowed only 18-73","Error");
						if(fieldModel=="ccdataentry__suppApp1DateOfBirth")
						{
								$timeout(function(){
								$("#383").focus();	
							 }, 500);
						}
						//$scope.formdata.ccdataentry__suppApp1DateOfBirth = "";
						if(fieldModel=="ccdataentry__dateOfBirth")
						{

								console.log("date of birth-->"+$scope.newdate1)

							$timeout(function(){
							$("#248").focus();	
						 }, 500);							
						}
						//$scope.formdata.ccdataentry__dateOfBirth = "";
						if(fieldModel=="ccdataentry__spouseDateofBirth")
						{
							console.log("spouse date of birth-->"+$scope.newdate1)

								$timeout(function(){
								$("#259").focus();	
							 }, 500);
							
						}
						if(fieldModel=="ccdataentry__suppApp2DateOfBirth")
						{
							console.log("ccdataentry__suppApp2DateOfBirth-->"+$scope.newdate1)
								$timeout(function(){
								$("#391").focus();	
							 }, 500);
							
						}
						
					}
					else
					{
						//toastr.error("Age allowed only 18-73","Error");
						if(fieldModel=="ccdataentry__suppApp1DateOfBirth")
						{
							$scope.newdate1 = selecteddate.split("/").reverse().join("/");							
								$scope.formdata.ccdataentry__suppApp1DateOfBirth=$scope.newdate1;
							
						}
						//$scope.formdata.ccdataentry__suppApp1DateOfBirth = "";
						if(fieldModel=="ccdataentry__dateOfBirth")
						{
							//	$scope.newdate1=$filter('date')(new Date($scope.newdate.split('-').join('/')), "dd-MM-yyyy");
							///	$scope.newdate1=$filter('date')(new Date($scope.newdate1), "yyyy-MM-dd");
								$scope.newdate1 = selecteddate.split("/").reverse().join("/");							
								console.log("----------------"+$scope.newdate1);
								$scope.formdata.ccdataentry__dateOfBirth=$scope.newdate1;

						}
						if(fieldModel=="ccdataentry__spouseDateofBirth")
						{
						//	$scope.newdate1=$filter('date')(new Date($scope.newdate.split('-').join('/')), "yyyy-dd-MM");
								$scope.newdate1 = selecteddate.split("/").reverse().join("/");							
								$scope.formdata.ccdataentry__spouseDateofBirth=$scope.newdate1;

//								$scope.formdata.ccdataentry__spouseDateofBirth=$scope.newdate1;
							
						}
						if(fieldModel=="ccdataentry__suppApp2DateOfBirth")
						{
						//	$scope.newdate1=$filter('date')(new Date($scope.newdate.split('-').join('/')), "yyyy-dd-MM");
//							$scope.newdate1=$filter('date')(new Date($scope.newdate), "yyyy-dd-MM");
//								$scope.formdata.ccdataentry__suppApp2DateOfBirth=$scope.newdate1;	

								$scope.newdate1 = selecteddate.split("/").reverse().join("/");							
								$scope.formdata.ccdataentry__suppApp2DateOfBirth=$scope.newdate1;
								
						}
												//$scope.formdata.ccdataentry__spouseDateofBirth = "";
					}			
					});
						}
			}
		
			
		}

		// ****************** END OF ALL VALIDATIONS		


		// ****************** SNIPPET STARTED
		$scope.onFocus = function(field){
			if($rootScope.snippetState == true ){
				if( $scope.formdata.ccdataentry__imageTypeId.selectedItem!=undefined)
				{
					$scope.getSnippet(field.fieldId);
				}
			}
			
			
			
			if(field.fieldTypeId == 2){
				
					angular.forEach($scope.prepopulated, function(value, key) {
			
							angular.forEach($scope.mainSection[0].sortedFields, function(rowvalue, rowkey) {
								angular.forEach(rowvalue, function(fieldvalue, fieldkey) {
									
									if(fieldvalue.model == 'ccdataentry__'+key){	
										fieldvalue.prevVal = value;
										
										if(fieldvalue.fieldTypeId == 2){
											//console.log("*************************************"+JSON.stringify(fieldvalue.prevVal)+":"+JSON.stringify($scope[fieldvalue.metaInfo.datalist])+":>"+fieldvalue.metaInfo.datalist);
											angular.forEach($scope[fieldvalue.metaInfo.datalist], function(value, key) {
												
			
												var newobj = angular.fromJson(fieldvalue.metai);
												
												if(fieldvalue.prevVal == value[newobj.Val]){
													fieldvalue.prevVal = value[newobj.DisplayLabel];
													
												}
											});
											}
										
									}
								 
								});			 
							});
							
							 
						});	
				
				
				
			}
			
			
		}
		$scope.getSnippet = function(fieldId){
					$scope.Snippet = Snippet.get({"fieldId":fieldId,"imageTypeId":$scope.formdata.ccdataentry__imageTypeId.selectedItem.imageTypeId});
//			$scope.Snippet = Snippet.get({"fieldId":fieldId});
			$scope.Snippet.$promise.then(function(result){
			if(result.result.length > 0){
					var position = result.result[0].location;
					$scope.overlays[0].x = position.x;
					$scope.overlays[0].y = position.y;
					$scope.overlays[0].w = position.w;
					$scope.overlays[0].h = position.h;
					$scope.overlays[0].color = "#fff600";
					$scope.overlays[0].alpha = 0.4;
					
					
					$scope.options.controls.numPage = result.result[0].pageNo;
					$scope.options.zoom.value = result.result[0].imgPosition.zoom;
					
					$timeout(function(){
						$scope.options.position.x = result.result[0].imgPosition.x;
						$scope.options.picPos.x= result.result[0].imgPosition.x ;
						$scope.options.picPos.y= result.result[0].imgPosition.y ;
					}, 800);
					
				}
			});


	}

		// ***************** SNIPPET ENDED

		//***************** PREVIOUS
		$scope.getPrevious=function()
		{
			if($scope.formdata.ccdataentry__agencyid.selectedItem==undefined)
			{
				toastr.error("Select agency Id ")
			}
			else
			{
				$scope.previous=Previous.get({"agencyId":$scope.formdata.ccdataentry__agencyid.selectedItem.agencyId,"userId":$rootScope.SESS_USER.userId});
				$scope.previous.$promise.then(function(result){
					//console.log("result of previous record-->"+JSON.stringify(result))
					angular.forEach(result.result[0], function(value, key) {
						//console.log("value-------->"+JSON.stringify(value)+"key---->"+key);
						//console.log("valueccdataentry-------->"+$scope.formdata["ccdataentry__"+key]);
					//	console.log("value$scope.formdata-------->"+JSON.stringify($scope.formdata));
						$scope.formdata["ccdataentry__"+key]=value;
						
						
						
					});
					//console.log(JSON.stringify($scope.formdata));
					$scope.showSection(0,5);
					
				})
					
			}
		}
	//	 alert($routeParams.appref );

		//////////////SEARCH APPLICATION
		$scope.searchapp=SearchApp.get({"appref":$routeParams.appref});
		$scope.searchapp.$promise.then(function(response){
			console.log("sorted fields ::::::::"+JSON.stringify(response));
			$http.get(CORE_CONFIG.SERVER_IP+"//storage\\apps\\cc\\"+response.result[0].jobNo+"\\"
						+response.result[0].agencyCode+"\\Mapped_Images\\"+response.result[0].allocatedApplication,{responseType: "blob"}).success(function(data){
								 var file = new File([data], "a.tif", {type: "image/tiff"});
								$scope.fileInput = file;
								
							});
						angular.forEach(response.result[0], function(value, key) {
						if(key=="entryId")
						{
							$scope.entryId=value;
						}
						else
						{
							if(value!=0 && key!="agencyCode" && key!="jobNo" && key!="allocatedApplication")
							{
								$scope.formdata["ccdataentry__"+key]=value;
							//alert("key--->"+key+"value--->"+value)
							}
							if(key=="RejectionCatId")
							{
								if(value==0)
								{
									$scope.formdata.ccdataentry__RejectionCatId=false;
								}
							}
						}
					});
					$scope.showSection(0,5);
			})
		//CHECKBOX
		//$scope.formdata.ccdataentry__RejectionCatId=false;
		$scope.okBlur=function(id)
		{
		if(id=="ccdataentry__rejectionReason")
			{
				if(confirm("Load Next Record"))
				{
								$scope.formdata.ccdataentry__currentSection=6;
								$scope.Fields = new Fields();
								$scope.Fields.formData = angular.copy($scope.formdata); 
				
				 				angular.forEach($scope.Fields.formData, function(value,key) {
								if(value!=null)
								{
									if(value.selectedItem != null ){
										$scope.Fields.formData[key] = value.selectedItem.dbval;
									}
									
								}
								});
								$scope.Fields.whr=" and entryId = "+$scope.entryId;
								$scope.Fields.$save(function (response) {
								toastr.success("Saved");
									angular.forEach($scope.formdata, function(value,key) {
									if(value != null && key!="ccdataentry__batchNo" ){
										if(!value.selectedItem){
											//value = "";
											$scope.formdata[key] = "";
										}
									
										else
										{
											if(key!="ccdataentry__agencyid" && key !="ccdataentry__imageTypeId")
											{
											value.selectedItem={};
											}
										}
									}
								});
								$scope.form1.$setPristine();			
								$scope.form1.$setValidity();			
								$scope.form1.$setPristine();
								$scope.form1.$setValidity();
								$scope.form1.$setUntouched();
					//			$scope.$apply();
					
								 document.getElementById("form1").reset();
								$scope.startFunction();

								});
								
															 
										
								
							}
				else
				{
									angular.forEach($scope.formdata, function(value,key) {
									if(value != null){
										if(!value.selectedItem){
											value = "";
											$scope.formdata[key] = "";
										}
									
										else
										{
										
											value.selectedItem={};
										}
									}
								});
									$scope.started = true;
								}
			}
	}
	
});

bpoApps.controller("ccSnippetSettings",function($scope,Fields,Sections,$http,$parse,CORE_CONFIG,Snippet,toastr){

	$scope.field = {
		"model":"fieldmodel"
		}
	
	$scope.formdata = { 
		"section":"",
		"imageType":"",
		"allsections":[],
		"field":"",
		"allfields":[],
		"allImageTypes":[]
	};

	$scope.reset = function(){
		
		$scope.overlays[0] =  {x : 0, y:50, w:300, h:80, color:'#fff600', alpha:0.4};	

	}

	$scope.getImageTypeFields = function(){
//			alert(JSON.stringify($scope.formdata.imageType));
//			$scope.$broadcast('getDDLData',{"model":"formdata.field","whr":" and imageTypeId="+$scope.formdata.imageType.imageTypeId});	
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

				$scope.formdata.field.selectedItem.fieldId=null;
			}

	$scope.getSnippet = function(){
		if($scope.formdata.field.selectedItem == null){
//			alert("Please select Field");	
		}else{

			$scope.Snippet = Snippet.get({"fieldId":$scope.formdata.field.selectedItem.fieldId,"imageTypeId":$scope.formdata.imageType.selectedItem.imageTypeId});
			$scope.Snippet.$promise.then(function(result){
				if(result.result.length > 0){
					var position = result.result[0].location;
					$scope.overlays[0].x = position.x;
					$scope.overlays[0].y = position.y;
					$scope.overlays[0].w = position.w;
					$scope.overlays[0].h = position.h;
					$scope.overlays[0].color = "#fff600";
					$scope.overlays[0].alpha = 0.4;
					
					$scope.options.position.x = result.result[0].imgPosition.x;
					$scope.options.controls.numPage = result.result[0].pageNo;
					$scope.options.zoom.value = result.result[0].imgPosition.zoom;
					$scope.options.picPos.x= result.result[0].imgPosition.x ;
					$scope.options.picPos.y= result.result[0].imgPosition.y ;
				}
			});
		}

	}

	$scope.save = function(){
		$scope.Snippet = new Snippet(); //.whr=" and entryId ="+$scope.entryId;
		$scope.Snippet.fieldId = $scope.formdata.field.selectedItem.fieldId;
		$scope.Snippet.pageNo = $scope.options.controls.numPage;
		$scope.Snippet.imageTypeId = $scope.formdata.imageType.selectedItem.imageTypeId;
		
//		$scope.Snippet.location = '{"x":"'+$scope.overlays[0].x+'","y":"'+$scope.overlays[0].y+'","h":"'+$scope.overlays[0].h+'","w":"'+$scope.overlays[0].w+'"}';
		$scope.Snippet.location = {"x":$scope.overlays[0].x,
									"y":$scope.overlays[0].y,
									"h":$scope.overlays[0].h,
									"w":$scope.overlays[0].w
									};
		$scope.Snippet.imgPosition = {"zoom":$scope.options.zoom.value,
									"x":$scope.options.picPos.x,
									"y":$scope.options.picPos.y
									};
		$scope.Snippet.location = angular.toJson($scope.Snippet.location);
		$scope.Snippet.imgPosition = angular.toJson($scope.Snippet.imgPosition);		
 			
		$scope.Snippet.appId = "1";
		
			$scope.Snippet.$save(function (response) {
//				alert(JSON.stringify(response));
				toastr.success("Snippet Saved","");
		});
	}
	
	$http.get(CORE_CONFIG.SERVER_IP+"/storage/config/CCSample.tif",{responseType: "blob"}).success(function(data)
	{
		var file = new File([data], "a.tif", {type: "image/tiff"});
		$scope.fileInput = file;
 
	});	

	$scope.overlays =  [{x : 0, y:0, w:300, h:300, color:'#fff600',alpha:0.4}];
	$scope.rects = Array();
	
	$scope.options = { controls : { toolbar : true, numPage: 2}};

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

	$scope.gotopage = function(page){
		$scope.options.controls.numPage = $scope.options.controls.numPage+page;	
	}

});

// STEP 1: IMAGE INDEXING

bpoApps.controller('CCindexImageController', function($scope, GetImage,toastr,MergeImage,filterFilter,$filter
,$http,$rootScope,CCMergedImageReport,$timeout,$parse,CCImageName,CORE_CONFIG)
{
	$scope.options = { 	  
						controls : 
						{
							 toolbar : true, 
							 numPage: 1
						}, 
						zoom : {
			            value : 1.0,
            			step : 0.01
				        }
				};

	$scope.optionsThumb = { controls : { toolbar : false} };
	$scope.to=0;
	$scope.from=0;
	$scope.limit=30;
	$scope.textenable=false;
	$scope.newarrFiles = Array();
    $scope.saveimg =Array();
	$scope.selectedindextype = {};
	$scope.accessor = {};
	$scope.weburl = "";
    $scope.count = 0;
	$scope.showSub = false;
	$scope.enable=false;
	$scope.selectedimages=0;
	$scope.isSelected=false;
	$scope.isPreview=false;
	$scope.fileInput="";
	$scope.formdata={};
	$scope.getAgencyCode={};
	$scope.formdata.agencyCode={};
	$scope.arrFiles = Array();
	var now = new Date();

	var start = new Date(now.getFullYear(), 0, 0);

	var diff = now - start;

	var oneDay = 1000 * 60 * 60 * 24;

	var dd = now.getDate();
	var mm = now.getMonth()+1; //January is 0!
	var yyyy = now.getFullYear();

	$scope.day = Math.floor(diff / oneDay);
	$scope.isValid=false;
	$scope.isVisible=false;
	$scope.isVisibleField=false;

	$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
	}
    $scope.filteredSelected =Array();
	$scope.setLog(50,"Reading all fields","");
	$scope.indexObject = {
        "jobno": "",
       	"destinationPath": "",
        "currentImage": "",
        "imageCount": "0",
       	"imageName":' ',
        "img": "",
    	}

	// $scope.indexObject.imageName=yyyy.toString()+$scope.day
		// DROP DOWN
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var lblaccessor = accessor;
		$scope.formdata[lblaccessor]={};
		var tmp = $parse(datalist) ;
		tmp.assign($scope, data);
		accessor = "formdata['"+accessor+"']";
		var accessor = $parse(accessor);
		angular.forEach(data, function(value, key) {
			if(value[scopevar] == $scope.formdata[scopevar] || 1==1){
					accessor.assign($scope, {"selectedItem":value});
			}
		});

	}

	//SHOW PREVIEW OF SELECTED IMAGE
	$scope.show=function(objUser,isPreview)
	{
		$http.get($scope.weburl+ "//" +objUser.img,{responseType: "blob"}).success(function(data)
		 {
			var filetype = "image/tiff";
			var file = new File([data], objUser.img, {type: filetype});
			$scope.fileInput=file;
			console.log("RECEIVED"+$scope.weburl+ "/" +objUser.img);
			$scope.fileInput = file;
			
					$timeout(function(){
						$scope.options.zoom.value=0.6;
						$scope.options.picPos.x= 0;
						$scope.options.picPos.y= 0;
					}, 800);
			
		});
		objUser.isSelected = !objUser.isSelected;
		$scope.filteredSelected = filterFilter($scope.newarrFiles, {isSelected: 'true'});
		$scope.selectedimages = $scope.filteredSelected.length;
	};
       $scope.showDbC=function(index)
	{
            console.log(index);
            //console.log("hiiii "+$scope.indexObject.rangeTo);
            console.log(JSON.stringify($scope.newarrFiles[0]));
            $scope.indexObject.rangeFrom = 1;
            $scope.indexObject.rangeTo = index;
				for(var j=0;j<$scope.newarrFiles.length;j++)
				{
					$scope.newarrFiles[j].isSelected=false;

				}

		  		for(var k=0;k<index;k++)
				{
					console.log("CURRENT K:"+k);
					$scope.newarrFiles[k].isSelected=true;
					//$scope.show($scope.newarrFiles[k],false)
				}

                $scope.remainingImages= $scope.indexObject.totalCount - index;

	};

	//LOAD MORE IMAGES
	$scope.LoadMore=function()
	{
			$timeout(function(){
			$scope.import();
					}, 1000);

	}

	//IMPORT IMAGES
    $scope.import = function() {
     // alert("import calledd");
		 $scope.lastImg=CCImageName.get({"jdNo":$scope.indexObject.jobno,"agencyId":$scope.formdata.agencyCode.selectedItem.agencyId});
		  $scope.lastImg.$promise.then(function(response){
			  console.log("response ::::----"+JSON.stringify(response));
			  if(response.result!="")
			  {
				$scope.isVisible=true;
				$scope.lastImgName=response.result[0].generatedApplicationNo
                                if($scope.mergec !==1){

                                 $scope.indexObject.imageName=parseInt($scope.lastImgName) +(1);
								 $scope.enable=true;
//                                   alert("jdjdjeee "+$scope.indexObject.imageName)
                                }

			  }else{
                              $scope.indexObject.imageName=yyyy.toString()+$scope.day+$scope.formdata.agencyCode.selectedItem.agencyCode+6001;
                          }
						  
				
						  
			  })

		if($scope.indexObject.jobno=="")
   		{

			toastr.error("Please Enter Job No.")
		}

		else
		{//alert($scope.formdata.agencyCode.selectedItem.agencyCode);
//			$scope.to=$scope.to+$scope.limit;

	        $scope.arrfiles = GetImage.get({
                    "job": $scope.indexObject.jobno,
					"from" : 0, //$scope.from,
					"to" :30,
					"agencyCode":$scope.formdata.agencyCode.selectedItem.agencyCode,

                })

			$scope.arrfiles.$promise.then(function(result) {
                          //  alert("result.result.total "+result.result.total);
                          //  alert("result.result.totalCountfixed "+result.result.totalCountfixed);
                          //  alert("$scope.arrfiles.length "+$scope.arrfiles.length);
				if(result.result!="")
				{
					$scope.isVisibleField=true;
					$scope.from=$scope.to;
                                        $scope.arrfiles = result.result;

					$scope.weburl = result.rootURL;
					$scope.indexObject.img=$scope.weburl+"/" +$scope.arrfiles[0];
                                        $scope.indexObject.imageCount = $scope.arrfiles.length;
					$scope.indexObject.currentimage=$scope.arrfiles[0];
                                        $scope.indexObject.totalCount = result.result.total;
                                      $scope.indexObject.remaining=result.result.totalCountfixed;

					$scope.selectedimages="0"
                                    //console.log("$scope.arrfiles -->> "+$scope.arrfiles.lenght);

                           //  console.log("result----->"+JSON.stringify(result));
                                        //alert("hiii "+$scope.indexObject.totalCount);
					angular.forEach($scope.arrfiles, function(value, key) {
						// console.log("path ----->"+JSON.stringify($scope.weburl+ "/" +value.img));
                         $scope.newarrFiles[key]=({"obj":null,"img":value.img, "isSelected" : false});
					
                         $http.get($scope.weburl+ "/" +value.img,{responseType: "blob"}).success(function(data) 			 						
						 {
								   var filetype = "image/tiff";
								   var file = new File([data], $scope.indexObject.currentimage, {type: filetype});
								   $scope.newarrFiles[key] = ({"obj":file,"img":value.img, "isSelected" : false});
								   console.log("totalCount ==>"+value.totalCount);
						   });

					});
					$scope.remainingImages= $scope.newarrFiles.length;
					if($scope.arrfiles.length==0)
					{
						toastr.info("No More Images","information")
					}
					else
					{
						$scope.textenable=true;
						$scope.setLog(100,"Importing Images","");
						$timeout(function(){
							$scope.proval = 0;
						}, 2000);
					}
				}

				});
		}
	}
	//WATCH FOR APPLICATION NO.
   	$scope.$watch(function(){
  		  return $scope.indexObject.imageName;
 		 }, function(newvalue, oldvalue){
			if(($scope.day+'').length==2)
			{
				$scope.day='0'+$scope.day
			}
			else
			if(($scope.day+'').length==1)
			{
				$scope.day='00'+$scope.day
			}
      // alert("image name "+$scope.indexObject.imageName);
			 if(JSON.stringify($scope.formdata.agencyCode)=="{}")
			 {
		 		$scope.indexObject.imageName=yyyy.toString()+$scope.day
			 }
                          // $scope.indexObject.imageName=newvalue;
                          //    alert("sssss "+$scope.indexObject.imageName);
			 $scope.val=newvalue;
			  if($scope.val!='' && $scope.val.length==13)
			  {

				 $scope.enable=true;
			  }
			  if($scope.val.length>13)
			  {
				  toastr.error("Application No. cannot be grater than 13 digit")
				  $scope.enable =  false;
				}
	  					//$scope.formdata.agencyCode.selectedItem = $scope.getAllreason[response.result[0].reasonId -1];
	  },true);

	//SELECT/DESELECT IMAGES(RANGE TO)
 	$scope.$watch(function(){
  		  return $scope.indexObject.rangeTo;
 		 }, function(newvalue, oldvalue){
			console.log("new value :"+newvalue);
			console.log("oldvalue :"+oldvalue);
			for(var j=0;j<$scope.newarrFiles.length;j++)
				{
					$scope.newarrFiles[j].isSelected=false

				}

		  		for(var k=$scope.indexObject.rangeFrom-1;k<newvalue;k++)
				{
					//$scope.show($scope.newarrFiles[k],false)
				}

	  },true);
	  
	  $scope.$watch(function(){
  		  return $scope.indexObject.rangeTo;
 		 }, function(newvalue, oldvalue){
			console.log("new value :"+newvalue);
			console.log("oldvalue :"+oldvalue);
			for(var j=0;j<$scope.newarrFiles.length;j++)
				{
					$scope.newarrFiles[j].isSelected=false

				}

		  		for(var k=$scope.indexObject.rangeFrom-1;k<newvalue;k++)
				{
					//$scope.show($scope.newarrFiles[k],false)
				}

	  },true);

	//SELECT/DESELECT IMAGES(RANGE FROM)
	$scope.$watch(function(){
  		  return $scope.mergec;
 		 }, function(newvalue, oldvalue){
			console.log("new value :"+newvalue);
			console.log("oldvalue :"+oldvalue);


	  },true);



	 //IF AGENCY CODE CHANGE INTENTIONALLY
	 $scope.selectImg=function()
	 {
		 var trimedCode=$scope.indexObject.imageName.substr(7,2);
			if($scope.formdata.agencyCode.selectedItem.agencyCode!=trimedCode)
			{
				toastr.error("Selected agency code does not match");
			$scope.isValid=false
			$scope.enable=false;
			}
			else
			{$scope.isValid=true;
//			$scope.enable=true;
			}

		 console.log("----------->"+trimedCode)
	 };
	 //GET LAST INDEXED IMAGE NAME
	  $scope.getValue=function()
	  {
           //   $scope.indexObject.imageName=yyyy.toString()+$scope.day+$scope.formdata.agencyCode.selectedItem.agencyCode;
          };

	//MERGE SELECTED IMAGES
    $scope.merge = function() {
            //alert("merge called");
            $scope.mergec =1;
/*						$scope.indexObject.rangeFrom ="";
						$scope.indexObject.rangeTo = "";
		if($scope.indexObject.rangeFrom=="")
		{
			$scope.indexObject.rangeFrom=0;
		}
		if($scope.indexObject.rangeTo=="")
		{
			$scope.indexObject.rangeTo=0;
		}
*/

//alert($scope.indexObject.imageName.toString().length) // && ($scope.filteredSelected.length <2 && $scope.isValid==false)
		if($scope.indexObject.imageName.toString().length!=13) 
		  {
				//$scope.indexObject.imageName
			  toastr.error($scope.indexObject.imageName.length+"To generate tiff enter application number and select images","error")
		  }

		  else
		  {
		  	$scope.textenable=false;
			$scope.enable=true;
				$scope.filteredSelected = filterFilter($scope.newarrFiles, {isSelected: 'true'});

			for(var i=0;i<$scope.filteredSelected.length;i++)
			{
					$scope.saveimg.push($scope.filteredSelected[i].img);
			}
			$scope.merfiles = MergeImage.get({
				"image":JSON.stringify($scope.saveimg),
				"job": $scope.indexObject.jobno,
				"imageName":$scope.indexObject.imageName,
				"userId":$rootScope.SESS_USER.userId,
				"agencyCode":$scope.formdata.agencyCode.selectedItem.agencyCode,
				})
                        $scope.merfiles.$promise.then(function(response)
                            {
                                  //alert(JSON.stringify(response));
                                  $scope.lastImg=CCImageName.get({"jdNo":$scope.indexObject.jobno,"agencyId":$scope.formdata.agencyCode.selectedItem.agencyId});
                                  $scope.lastImg.$promise.then(function(response){
                                  $scope.indexObject.remaining = $scope.indexObject.remaining == 0 ?($scope.indexObject.totalCount-parseInt(response.result[0].imageCount)): $scope.indexObject.remaining-parseInt(response.result[0].imageCount);
                                      $scope.indexObject.imageName= parseInt(response.result[0].generatedApplicationNo) +(1);

									$scope.limit = $scope.saveimg.length;

                                      if(response.result!="")
                                  {
                                      //(response.result);
                                        $scope.isVisible=true;
                                        $scope.lastImgName=response.result[0].generatedApplicationNo
                                  }
                            })
                            })

			  $scope.newarrFiles = $filter('filter')($scope.newarrFiles, {isSelected: 'false'})
			  $scope.filteredSelected = Array();
			  $scope.saveimg=Array();
			  toastr.success("Images merged");
			  if($scope.arrfiles.length==0)
			  {
				  $scope.indexObject.imageName="";
			  		toastr.info("No Images","information")
					$scope.isVisibleField=false;
			  }
			  	//$scope.LoadMore();
                                  //$scope.lastImgName;
				$scope.setLog(100,"Generating Tiff",""); // = function(proval, currentstatus, css, newlog)
			    $timeout(function(){
					$scope.proval = 0;
					$scope.import();
				}, 1000);
                            // $scope.remainingImages=  $scope.indexObject.totalCount - $scope.selectedimages;
			}
		};

    $scope.report=function()
	{
		$scope.getreport=CCMergedImageReport.get();
		$scope.getreport.$promise.then(function(response){
		$scope.setLog(100,"Generating Report","");
			    $timeout(function(){
					$scope.proval = 0;
				}, 2000);

		})
	}
	$scope.setLog(100,"Loading Page","");
			    $timeout(function(){
					$scope.proval = 0;
				}, 2000);
});

//STEP 2: BATCH CREATION
bpoApps.controller("ccAllocateController",function($scope,Sections,Fields,allocateBlankEntry,$location,$timeout,BatchRange,CreateBlankEntry,toastr,$filter,ngTableParams,CCGetRange,$parse,$rootScope,Unmapped)
{	
	$scope.formdata ={};
	$scope.formdata.imageType="Image base";
	$scope.day="";
	$scope.showAllocate=false;

	var now = new Date();

	var start = new Date(now.getFullYear(), 0, 0);

	var diff = now - start;

	var oneDay = 1000 * 60 * 60 * 24;
	
	var dd = now.getDate();
	var mm = now.getMonth()+1; //January is 0!
	var yyyy = now.getFullYear();
	
	$scope.day = Math.floor(diff / oneDay);
	$scope.formdata.JDNo=$scope.day; 
	$scope.formdata.batchAgencyId={};
	$scope.formdata.firstApp='';
	$scope.buttonenable=false;
	$scope.finalArr =Array();
	$scope.getAllItems = function(data, datalist, accessor, scopevar){
		var lblaccessor = accessor;
		$scope.formdata[lblaccessor]={};
		var tmp = $parse(datalist) ;
		tmp.assign($scope, data);
		accessor = "formdata['"+accessor+"']";
		var accessor = $parse(accessor); 
		angular.forEach(data, function(value, key) {
			if(value[scopevar] == $scope.formdata[scopevar] || 1==1){ 
					accessor.assign($scope, {"selectedItem":value});
			}
		});
		
	}

	//ANCHOR SCROLL FUNCTION
	$scope.gotoAnchor = function(x) {
		var id = $location.hash();
		$location.hash(x);
		$anchorScroll();
		$location.hash(id);
		//window.scrollTo(window.scrollX, window.scrollY - 230);
	}


	$scope.currentRow = 0;
	$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
	}

	
	$scope.sections = Sections.get({"id":21});
	$scope.sections.$promise.then(function(result){
		$scope.sections = result.result;
		angular.forEach(result.result, function(value, key) {
			var fields = Array();
			$scope.sections[key].fields = Array();
			$scope.sections[key].sortedFields = Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
			$scope.getSectionRenderer(value,key);	
			$scope.setLog(50,"Reading all fields",""); 	
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
		 
		$scope.setLog(100,"Received all fields",""); // = function(proval, currentstatus, css, newlog)
			    $timeout(function(){
					$scope.proval = 0;
				}, 2000); 	

	}
	$scope.firstApplicationNo="";
	
	if(($scope.formdata.JDNo+'').length==2)
		{
			$scope.formdata.JDNo='0'+$scope.formdata.JDNo;
		} 
		else if(($scope.formdata.JDNo+'').length==1)
		{
			$scope.formdata.JDNo='00'+$scope.formdata.JDNo;
		} 
	//JDNO VALIDATION
	$scope.change=function(id)
	{
		
			if(id=="JDNo")
		{
			if(($scope.formdata.JDNo+'').length>3)
			
			{toastr.error("JDNo cannot be greater than 3 digit ","Error")
				$scope.formdata.JDNo="";
			}
		
			if($scope.formdata.JDNo>365 ||$scope.formdata.JDNo<0 )
			{toastr.error("JDNo Should be between 0 to 365 ","Error")
				$scope.formdata.JDNo="";	
			}
		 
				$scope.appNo=yyyy.toString()+$scope.formdata.JDNo.toString()+$scope.formdata.batchAgencyId.selectedItem.agencyCode.toString();
			if($scope.firstApplicationNo==null)
			{	
				
				console.log("apno :::::::;"+$scope.appNo);
				 $scope.formdata.firstApp=$scope.appNo+''+(parseInt($scope.formdata.batchFrom)+(1));
				
			}
			else
			{
				var firstStr=$scope.firstApplicationNo.toString();
				 firstStr=firstStr.substr(9,4);
				  console.log("$scope.formdata.firstApp :::::::;"+$scope.formdata.firstApp);
				 console.log("firstStr______"+firstStr);
				//$scope.formdata.firstApp=$scope.firstApplicationNo;
				$scope.formdata.firstApp=$scope.appNo+parseInt(firstStr)+(1);
				
			}
			
			 var res = $scope.formdata.firstApp.toString();
			 res=res.substr(9,4);
			 console.log("res"+res);
			 $scope.formdata.lstApp=parseInt(res)+parseInt($scope.formdata.NoOfApplication)-(1);
			$scope.formdata.lastApp=$scope.appNo+$scope.formdata.lstApp;
			//var res = $scope.formdata.lstApp.substr(9,4); 
			if($scope.formdata.lstApp > $scope.formdata.batchTo)
			{
			  toastr.error("Application Out Of Range","Error");
			$scope.formdata.lastApp='';
			$scope.formdata.firstApp='';
			}
			else
			{
				$scope.enable=true;
			}
		

		}
		
		
		if(id=="NoOfApplication")
		{
			if(($scope.formdata.JDNo+'').length==2)
			{
				$scope.formdata.JDNo='0'+$scope.formdata.JDNo;
			} 
			else if(($scope.formdata.JDNo+'').length==1)
			{
				$scope.formdata.JDNo='00'+$scope.formdata.JDNo;
			} 
				$scope.appNo=yyyy.toString()+$scope.formdata.JDNo.toString()+$scope.formdata.batchAgencyId.selectedItem.agencyCode.toString();
			if($scope.firstApplicationNo==null)
			{	
					
					console.log("apno :::::::;"+$scope.appNo);
					 $scope.formdata.firstApp=$scope.appNo+''+(parseInt($scope.formdata.batchFrom)+(1));
					 console.log("$scope.formdata.firstApp :::::::;"+$scope.formdata.firstApp);
			}
			else
			{
			
				$scope.formdata.firstApp=$scope.firstApplicationNo;
				var first = $scope.formdata.firstApp.toString();
			 first=first.substr(9,4);
		
				 $scope.frstApp=parseInt(first)+(1);
				 $scope.formdata.firstApp=$scope.appNo+$scope.frstApp;
				
			}
	 	
				 var res = $scope.formdata.firstApp.toString();
				 res=res.substr(9,4);
				 $scope.formdata.lstApp=parseInt(res)+parseInt($scope.formdata.NoOfApplication)-(1);
				$scope.formdata.lastApp=$scope.appNo+$scope.formdata.lstApp;
				//var res = $scope.formdata.lstApp.substr(9,4); 
				if($scope.formdata.lstApp > $scope.formdata.batchTo)
				{
				  toastr.error("Application Out Of Range","Error");
				$scope.formdata.lastApp='';
				$scope.formdata.firstApp='';
				}
				else
				{
					$scope.enable=true;
				}

		}
	}
	
	
	
	
	//GET BATCH DETAILS FOR AGENCY
	$scope.getBatchRange=function(agencyCode)
	{
					$scope.formdata.NoOfApplication="";
		
		$scope.agencyBatch=BatchRange.get({"agencyId":agencyCode,"jdno":$scope.formdata.JDNo})
		$scope.agencyBatch.$promise.then(function(result){
			if(result.result[0].applicationNo!="")
			{
				$scope.firstApplicationNo=result.result[0].applicationNo;
				
			}
			
			
		})
		$scope.agencyRange=CCGetRange.get({"agencyId":agencyCode,"jdNo":$scope.formdata.JDNo})
		$scope.agencyRange.$promise.then(function(result){
		$scope.formdata.lastApp='';
		$scope.formdata.firstApp='';
			console.log("range result:::::::::----"+JSON.stringify(result));
			$scope.formdata.batchFrom=result.result[0].batchFrom;
			$scope.formdata.batchTo=result.result[0].batchTo;
			if(result.result[0].total==0)
			{
			$scope.formdata.maxApplication=result.result[0].total;
			}
			else
			{
				$scope.formdata.maxApplication=$scope.firstApplicationNo;

			}
			
			if(mm.toString().length==1)
			{
				mm='0'+mm
			};
			
			
			$scope.formdata.batchId=dd.toString()+mm.toString()+yyyy.toString()+result.result[0].batchId;
			
		})
	}
	
	//APPLICATION NO ON JD CHANGE
 	
  
	//APPLICATION NO ON JD CHANGE	
/* 	$scope.$watch(function(){
    return $scope.formdata.JDNo;
  }, function(newvalue, oldvalue){
	  
  },true);
*/  
   	$scope.allocateentries=Array();
	$scope.generate = function(){
		if($scope.formdata.batchAgencyId.selectedItem==undefined)
		{
			toastr.error("Select agency to proceed","error");
		}
		else
		if($scope.formdata.NoOfApplication==undefined)
			{
				toastr.error('Enter No. of applications to proceed', 'Error');			
			}
		else 
		if(isNaN(parseInt($scope.formdata.NoOfApplication)))
		{
			toastr.error('Only numerical values allowed', 'Error');			
				$scope.formdata.NoOfApplication="";
		}
		else
		{
			$scope.createEntry=new CreateBlankEntry();
			$scope.createEntry.jdNo=$scope.formdata.JDNo;
			$scope.createEntry.applicationNo=$scope.formdata.firstApp;
			$scope.createEntry.imageType=$scope.formdata.imageType;
			$scope.createEntry.agencyId=$scope.formdata.batchAgencyId.selectedItem.agencyId;
			$scope.createEntry.noOfApplication=$scope.formdata.NoOfApplication;
			$scope.createEntry.jobNo=$scope.formdata.jobNo;
			$scope.createEntry.userId=$rootScope.SESS_USER.userId;
			$scope.createEntry.$save(function(result){
			$scope.createdImg=result.result.img;
			$scope.createdData=result.result.data;
			$scope.createdBatch=result.result.batch;
			
			console.log("------->gvddshfgewuy"+JSON.stringify(result));
			angular.forEach($scope.createdData, function(value, key){
				var isExists = false;
				var img = "";
				angular.forEach($scope.createdImg, function(subvalue, subkey){
					
					if(subvalue.img == value.applicationNo+".TIF" || subvalue.img == value.applicationNo+".TIFF"
					|| subvalue.img == value.applicationNo+".tif" || subvalue.img == value.applicationNo+".tiff"){
						console.log("::::::::::::"+subvalue.img+">"+value.applicationNo+".TIF");
						isExists = true;	
						img = subvalue.img;
					}
				});
				console.log("IS EXIST:"+isExists);			
//				if ($scope.createdImg[key] != null)
				if (isExists)
				{
					$scope.finalArr.push({"batch":$scope.createdBatch,"applicationNo":value.applicationNo,"img":img});	
				}
				else
				{
					$scope.finalArr.push({"batch":$scope.createdBatch,"applicationNo":value.applicationNo,"img":"No image to map"});
				}

			});
		$scope.tableParams.reload();	
			//console.log("------------------>"+JSON.stringify(result.result.img));
			toastr.success("Batch Created","success");
			$scope.buttonenable=true;
			$scope.formdata.NoOfApplication="";
			$scope.formdata.firstApp="";
			$scope.formdata.lastApp="";
			$scope.firstApplicationNo="";
			

			
			})
			
		}
			
	}


		$scope.changeRole = function(){
	$scope.$broadcast('getDDLData',{"model":"selectedUser","whr":" and roleId="+$scope.selectedRole.selectedItem.roleId});
	}
		$scope.allocate=function()
		{
			$scope.FinalData=[];
			$scope.FinalImg=[];
		
			for(var i=$scope.imgRangeFrom-1; i<$scope.imgRangeTo;i++)
			{
				$scope.FinalData[i]=$scope.finalArr[i].applicationNo;
				$scope.FinalImg[i]=$scope.finalArr[i].img;
			console.log("dsfsfsf------------>"+JSON.stringify($scope.finalArr[i]));	
			}
			var batchdt=(new Date().getFullYear().toString().substr(2,2)); 
			
			$scope.allocateEntry=new allocateBlankEntry()
			console.log("fkelfl;fkl======>"+batchdt);
			$scope.allocateEntry.jdNo=$scope.formdata.JDNo;
			$scope.allocateEntry.imgData=$scope.FinalImg.toString();
			$scope.allocateEntry.imgType=$scope.formdata.imageType;
			$scope.allocateEntry.applicationData=$scope.FinalData.toString();
			$scope.allocateEntry.job=$scope.formdata.jobNo
			$scope.allocateEntry.agencyId=$scope.formdata.batchAgencyId.selectedItem.agencyCode
			//$scope.allocateEntry.ibatchNo=
			$scope.allocateEntry.$save(function(result){
				if(result.status=="Error")
				{toastr.error("Nothing imported to map","Error")}
				else
				{
				$scope.allocateentries=result.result;
					$scope.showAllocate=true;
					toastr.success("Maped applications and moved them for processing","Success")
					$scope.buttonenable=false;
					$scope.formdata.NoOfApplication="";
					$scope.formdata.firstApp="";
					$scope.formdata.lastApp="";
					$scope.formdata.batchFrom="";
					$scope.formdata.batchTo="";
					$scope.formdata.batchId="";
					$scope.firstApplicationNo="";
					
					$scope.tableParams.reload();
					$scope.finalArr=Array();
			$scope.tableParams.reload();
				}
			})
			
		}

		$scope.tableParams = new ngTableParams({
						debugMode: true,
						page: 1, 
						count: 10,
						sorting: {
								//fullName: 'desc',
								ApplicationNo: 'desc',
								batchNo: 'desc'
						},
						filter: {
							//fullName: '',
							ApplicationNo: '',
							batchNo: ''
						}
	
					}, {
							total: $scope.finalArr.length,
							getData: function ($defer, params) {
							   var filteredData = params.filter() ? $filter('filter')($scope.finalArr, params.filter()) : $scope.allocateentries;
							   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
console.log("----jkjaskl"+JSON.stringify($scope.finalArr));
							   params.total(orderedData.length);
							   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
							}
					});
					
	//GET UNMAPPED APPLICATION NO.
	$scope.getUnmapped=function()
	{
		$scope.unmapped=Unmapped.get({"agencyId":$scope.formdata.batchAgencyId.selectedItem.agencyId,"jobNo":$scope.formdata.jobNo});
		$scope.unmapped.$promise.then(function(result){
			console.log("--------->resultjfjfjfj"+JSON.stringify(result));
			$scope.createdImg=result.result.img;
			$scope.createdData=result.result.data;
			$scope.createdBatch=result.result.batch;
			/*
			angular.forEach($scope.createdData, function(value, key){
				if ($scope.createdImg[key] != null)
				{
				console.log("::::::::::::"+JSON.stringify($scope.createdBatch[key]));
					$scope.finalArr.push({"batch":$scope.createdBatch,"applicationNo":value.applicationNo,"img":$scope.createdImg[key].img});	
				}
				else
				{
					$scope.finalArr.push({"batch":$scope.createdBatch,"applicationNo":value.applicationNo,"img":"No image to map"});
				}
     			
			});
			*/
			
			
			angular.forEach($scope.createdData, function(value, key){
				var isExists = false;
				var img = "";
				angular.forEach($scope.createdImg, function(subvalue, subkey){
					
					if(subvalue.img == value.applicationNo+".tif" || subvalue.img == value.applicationNo+".tiff"
					|| subvalue.img == value.applicationNo+".TIF" || subvalue.img == value.applicationNo+".TIFF"){
						console.log("::::::::::::"+subvalue.img+">"+value.applicationNo+".TIF");
						isExists = true;	
						img = subvalue.img;
					}
				});
				console.log("IS EXIST:"+isExists);			
//				if ($scope.createdImg[key] != null)
				if (isExists)
				{
					$scope.finalArr.push({"batch":$scope.createdBatch,"applicationNo":value.applicationNo,"img":img});	
				}
				else
				{
					$scope.finalArr.push({"batch":$scope.createdBatch,"applicationNo":value.applicationNo,"img":"No image to map"});
				}

			});
			
			
			
			
			
			$scope.tableParams.reload();	

			})
	}

});

//STEP3: UPLOAD CC NUMBER FOR I-DISBURSE
bpoApps.controller("ccUploadController",function($scope,Sections,Fields,Upload,$timeout,toastr,CORE_CONFIG,WEB_API,CSVImport,Batch,AgencyBatch,$parse,$rootScope,ExcelImport,CCUpdateStatus,CCMarkDup)
{	
	$scope.agencyId={};
	$scope.getAgencyCode={};
	$scope.currentFileName = "";
	$scope.currentRow = 0;
	
	$scope.formdata = {};
	$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
	}

	$scope.formdata.file = "";
	$scope.formdata.agencyId= {};
	$scope.formdata.currentBatchId="";
//console.log("selected data----------->>>>>>>>>"+$scope.formdata.userid);
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
	$scope.file = Upload;	
	$scope.sections = Sections.get({"id":"22"});
	
	$scope.sections.$promise.then(function(result){
		$scope.sections = result.result;
		angular.forEach(result.result, function(value, key) {
			var fields = Array();
			$scope.sections[key].fields = Array();
			$scope.sections[key].sortedFields = Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
			$scope.getSectionRenderer(value,key);		
		});
		$scope.setLog(50,"Reading all fields","");

	});
	
	$scope.getSectionRenderer = function(section,sectionIndex){
		 
		 $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
		 $scope.fields.$promise.then(function(result){
				$scope.sections[sectionIndex].fields = result.result;
		 		angular.forEach(result.result, function(value, key) {	
					//$scope.formdata[value.model] = "";
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
					$scope.setLog(100,"Importing Fields",""); // = function(proval, currentstatus, css, newlog)
			    $timeout(function(){
					$scope.proval = 0;
				}, 2000);
				});
		 });
			
	}
	$scope.logs='';
	$scope.loading = false;
 $scope.param={};
	$scope.subForm = function(file){
				//console.log("\nBatch Created with ID : "+JSON.stringify($scope.formdata.agencyId));	
			$scope.setLog(30,"Uploding Might Take Some Time",""); // = function(proval, currentstatus, css, newlog)
			    
			$scope.loading = true;
			var arrFile = $scope.param.file.split(".");
			$scope.param.file = arrFile[1];
			
			if($scope.param.file!="xls")
			{
				toastr.error('Only .xls files allowed ', 'Error')
			}
			else
			{
				
				$scope.formdata.file = file;
				$scope.formdata.folder = "CC_IMPORT_CSV";
				
				
					
				$file= Upload.upload({
				  url: CORE_CONFIG.WEB_SERVICE+WEB_API.UPLOAD,
				  data: $scope.formdata,
				});
			
				$file.then(function (response) {
					
					if(response.data.status == "success"){
						
					//	alert("CSV Uploaded successfully.");
						$scope.currentFileName = response.data.result.upload_data.file_name;
						
						// GET BATCH ID GENERATED
						$scope.batch = new Batch();		
						
						$scope.batch.appId = "2"; //"{appId:'1',batchId:'0'}";
						$scope.batch.batchId = "0";
						$scope.batch.uploadedBy=$rootScope.SESS_USER.userId;
						
						$scope.batch.$save(function(result){
						
								$scope.formdata.currentBatchId=result.result;
								//console.log("\nBatch Created with ID : "+JSON.stringify($scope.formdata.agencyId));	
						
							//CREATING AGENCY BATCH ENTRY
							 $scope.agencyBatch=new AgencyBatch();
							 $scope.agencyBatch.agencyId=$scope.formdata.agencyId.selectedItem.agencyId;
							 $scope.agencyBatch.batchId=$scope.formdata.currentBatchId;
							 
							$scope.agencyBatch.$save(function(result){
									
							
						// INITIATE IMPORT WEB SERVICE sFOR BATCH ID AND UPLOADD FILE
								var arrFile = $scope.currentFileName.split(".");
								$scope.currentFileName = arrFile[0];
								var extData = {agencyBatchId:result.result};
								$scope.agencyId=result.result;
								
								$scope.csv = ExcelImport.get({"file":$scope.currentFileName,"folderId":"CC_IMPORT_CSV","json":"ccimport","extData":JSON.stringify(extData)});
								$scope.csv.$promise.then(function(result){
										$scope.totalRows=0;
										$scope.duplicate=0;
									//	$scope.logs='';
										$scope.logs+='Total Records In Excel : '+result.result.totalRows;
										console.log("total ->"+JSON.stringify(result.result.totalRows))		
									$scope.markdup=CCMarkDup.get({"agencyBatchId":$scope.agencyId});
									$scope.markdup.$promise.then(function(dupresult){
										$scope.logs+="\nTotal Duplicate Records : "+dupresult.result;
										$scope.logs+="\n";
										//console.log("marked Duplicate"+JSON.stringify(dupresult))		
									$scope.updatestatus=CCUpdateStatus.get({"batchId":$scope.agencyId})
									$scope.setLog(100,"File Uploaded",""); // = function(proval, currentstatus, css, newlog)
			    $timeout(function(){
					$scope.proval = 0;
				}, 2000);
									toastr.success('Credit Card Xls Imported Successfully with Batch Id '+$scope.formdata.currentBatchId, 'Done')
									$scope.formdata.file='';
									//$scope.formdata={};
									})
									
							}).finally(function() {
    // called no matter success or failure
    $scope.loading = false;
  });
						
								
						});
				
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
	}


});

//STEP6: AUDIT SETTING
bpoApps.controller("ccAuditSettingController",function($scope,Sections,Fields,$location,$timeout,$parse,toastr,JdData,CCGetRange,CCSetting)
{	
	//VARIABLES
	$scope.loading = true;
	$scope.currentRow = 0;
	$scope.getAgency={};
	$scope.getType={};
	$scope.formdata = {};
	$scope.formdata.selectedType={};
	$scope.formdata.agencyId={};
	$scope.formdata.tmpalpl__enterdValue="";
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
$scope.sections = Sections.get({"id":34});
	$scope.sections.$promise.then(function(result){
		$scope.sections = result.result;
		angular.forEach(result.result, function(value, key) {
			
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
		 }); 			
	}
 
	/*$scope.sections = Sections.get({"id":34});
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
					$scope.loading = true;
				});
				
				
		 }).finally(function() {
    		$scope.loading = false;
 		 });
	}*/
	var now = new Date();

	var start = new Date(now.getFullYear(), 0, 0);

	var diff = now - start;

	var oneDay = 1000 * 60 * 60 * 24;
	$scope.day = Math.floor(diff / oneDay);
	//$scope.formdata.JDNo=$scope.day; 
	
	$scope.formdata.tmpalpl__jdNo=$scope.day;
		if(($scope.formdata.tmpalpl__jdNo+'').length==2)
		{
			$scope.formdata.tmpalpl__jdNo='0'+$scope.formdata.tmpalpl__jdNo;
		} 
		else if(($scope.formdata.tmpalpl__jdNo+'').length==1)
		{
			$scope.formdata.tmpalpl__jdNo='00'+$scope.formdata.tmpalpl__jdNo;
		} 

	$scope.getValue=function(agencyCode)
	{ //alert(id);
		if(agencyCode=="agencyId")
		{
			console.log("-kkllkjlkjhkjhbjk----"+JSON.stringify($scope.formdata.agencyId.selectedItem));
			
			//select ccmaping.* from ccmaping where ccmaping.agencyId=1 and ccmaping.jdNo=22
			$scope.getJdData=JdData.get({"jdNo":$scope.formdata.tmpalpl__jdNo,"agencyId":$scope.formdata.agencyId.selectedItem.agencyId})
			$scope.getJdData.$promise.then(function(response){
				console.log("----->response jd"+JSON.stringify(response.result))
				$scope.formdata.tmpalpl__noOfApp=response.result.total;
				$scope.formdata.tmpalpl__firstApp=response.result.FirstApp;
				$scope.formdata.tmpalpl__lastApp=response.result.LastApp.applicationNo;
				$scope.formdata.tmpalpl__maxApplication=response.result.LastApp.applicationNo;
				})
		}
	
	}


	$scope.generate = function(){
		if($scope.formdata.tmpalpl__enterdValue=="")
		{
			$scope.formdata.tmpalpl__enterdValue=0;
		}
		$scope.setting=CCSetting.get({"agencyCode":$scope.formdata.agencyId.selectedItem.agencyId,"jdNo":$scope.formdata.tmpalpl__jdNo,"type":$scope.formdata.selectedType.selectedItem.CategoryValue,"value":$scope.formdata.tmpalpl__enterdValue})
	$scope.setting.$promise.then(function(response){
		if(response.status=="success")
		{
			toastr.success("Setting Completed")
		$scope.formdata.tmpalpl__enterdValue="";
		$scope.formdata.tmpalpl__firstApp="";
		$scope.formdata.tmpalpl__lastApp="";
		$scope.formdata.tmpalpl__maxApplication="";
		$scope.formdata.tmpalpl__noOfApp="";
		}
				})
	}
});

//NEW AGENCY CREATION
bpoApps.controller("ccImageTypeController",function($scope,coreTable,ngTableParams,$filter,$timeout,toastr,$rootScope)
{	

	$scope.showNew = false;
	
	$scope.ImageTypes = Array();

	$scope.ImageType = new coreTable();
	
	$scope.getImageTypes = function(){
			$scope.ImageTypes = coreTable.get({"tbl":"ccimagetypemaster","whr":""});
			
			$scope.ImageTypes.$promise.then(function(result){
				$scope.ImageTypes = result.result;
				$scope.tableParams.reload();	
			});
	}
		
		
	$scope.tableParams = new ngTableParams(
		{
			debugMode: true,
			page: 1, 
			count: 10,
			sorting: {
					imageTypeId: 'desc',
					imageType: 'desc'
			},
			filter: {
				imageTypeId: '',
				imageType: ''
			}
		}, 
		{
				total: $scope.ImageTypes.length,
				getData: function ($defer, params) {
					
				   var filteredData = params.filter() ? $filter('filter')($scope.ImageTypes, params.filter()) : $scope.ImageTypes;
				   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
				   params.total(orderedData.length);
				   
				   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
		});

	$scope.newImageType = function(){
//		$scope.ImageType.val = Object();
		$scope.ImageType.val = {  "imageType":"","modifyOn":"NOW()","modifyBy":$rootScope.SESS_USER.fullName};
		
		$scope.ImageType.primary = Object();
		$scope.showNew = true;
	}
	
	$scope.submitImageType = function(){
		$scope.ImageType.table = "ccimagetypemaster";
		$scope.ImageType.$save(function(response){
				$scope.getImageTypes();
				$scope.showNew = false;
				toastr.success('Image Type saved successfully!', 'Done')
		});
	}
	
	$scope.getImageType = function(imagetype){
		$scope.ImageType.val = {  "imageType":imagetype.imageType,"modifyOn":"NOW()","modifyBy":$rootScope.SESS_USER.fullName};
		$scope.ImageType.primary = {"imageTypeId":imagetype.imageTypeId};
		$scope.showNew = true;
	}
	
	$scope.deleteImageType = function(imageType){
		coreTable.delete({ "tbl": "ccimagetypemaster", "delkey":"imageTypeId", "delval":imageType.imageTypeId}, function() {
				toastr.success('Image Type deleted successfully!', 'Done')			
		$scope.getImageTypes();
	  });
		
	}
	
	$timeout(function(){
		$scope.getImageTypes();	
	});
	
	
});



bpoApps.controller("ccAgencyCodeController",function($scope,$location,$timeout,$parse,CreateAgency,toastr,ngTableParams,$filter,$rootScope,coreTable,CreateAgency)
{ 	
	$scope.showNew = false;
	
	$scope.Agency = Array();

	$scope.AgencyType = new coreTable();
	
	$scope.getAgency = function(){
			$scope.Agency = coreTable.get({"tbl":"ccagencymaster","whr":""});
			
			$scope.Agency.$promise.then(function(result){
				console.log("agency code----->"+JSON.stringify(result));
				$scope.Agency = result.result;
				$scope.tableParams.reload();	
			});
	}
		
		
	$scope.tableParams = new ngTableParams(
		{
			debugMode: true,
			page: 1, 
			count: 10,
			sorting: {
					agencyCode: 'desc',
					batchFrom: 'desc',
					batchTo: 'desc',
					agencyName:'desc',
					batchId:'desc',
					creditHub:'desc'
			},
			filter: {
				agencyCode: '',
					batchFrom: '',
					batchTo: '',
					agencyName:'',
					batchId:'',
					creditHub:''
			}
		}, 
		{
				total: $scope.Agency.length,
				getData: function ($defer, params) {
					
				   var filteredData = params.filter() ? $filter('filter')($scope.Agency, params.filter()) : $scope.Agency;
				   var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 
				   params.total(orderedData.length);
				   
				   $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
		});

		$scope.newAgency = function(){
		$scope.AgencyType.val = {"agencyCode":"","batchFrom":"","batchTo":"","agencyName":"","batchId":"","creditHub":""};
		$scope.AgencyType.primary = Object();
		$scope.showNew = true;
		}
		$scope.submitAgency = function(){
		$scope.createAgency=CreateAgency.get({"agencyCode":$scope.AgencyType.val.agencyCode,
											"agencyName":$scope.AgencyType.val.agencyName,"batchId":$scope.AgencyType.val.batchId});
		$scope.createAgency.$promise.then(function(response){
			console.log("response"+JSON.stringify(response.result))
				if(response.result==true)
				{
					$scope.AgencyType.table = "ccagencymaster";
					$scope.AgencyType.$save(function(response){
					$scope.getAgency();
					$scope.showNew = false;
					toastr.success('Agency saved successfully!', 'Done')
					});
	
				}
				else
				{
					toastr.error("Duplicate Agency")
				}
			})										
		}
	
	$scope.editAgency = function(agency){
		
		$scope.AgencyType.val = {"agencyCode":agency.agencyCode,"batchFrom":agency.batchFrom,"batchTo":agency.batchTo,
								"agencyName":agency.agencyName,"batchId":agency.batchId,"creditHub":agency.creditHub};
		$scope.AgencyType.primary = {"agencyId":agency.agencyId};
		$scope.showNew = true;
	}

$scope.deleteAgency = function(agency){
		coreTable.delete({ "tbl": "ccagencymaster", "delkey":"agencyId", "delval":agency.agencyId}, function() {
				toastr.success('Agency deleted successfully!', 'Done')			
		$scope.getAgency();
	  });
		
	}

$timeout(function(){
		$scope.getAgency();	
	});

});

//MASTER FILE(S) UPLOAD
bpoApps.controller("ccMasterUploadController",function($scope,Sections,Fields,Upload,$timeout,toastr,CORE_CONFIG,WEB_API,ExcelImport,Batch,AgencyBatch,$parse,$rootScope)
{	
	$scope.logs="";
	
	$scope.formdata = {};
	
	$scope.formdata.file = "";
	$scope.formdata.masterName={};
	
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
	$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
	}
	$scope.currentFileName = "";
	$scope.currentRow = 0;
	$scope.file = Upload;	
	$scope.sections = Sections.get({"id":"32"});
	
	$scope.sections.$promise.then(function(result){
		$scope.sections = result.result;
		angular.forEach(result.result, function(value, key) {
			var fields = Array();
			$scope.sections[key].fields = Array();
			$scope.sections[key].sortedFields = Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
			$scope.getSectionRenderer(value,key);		
						$scope.setLog(50,"Reading all fields",""); // = function(proval, currentstatus, css, newlog)

		});
	});
	
	$scope.getSectionRenderer = function(section,sectionIndex){
		 
		 $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
		 $scope.fields.$promise.then(function(result){
				$scope.sections[sectionIndex].fields = result.result;
		 		angular.forEach(result.result, function(value, key) {	
					//$scope.formdata[value.model] = "";
					$scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
					$scope.setLog(100,"Received all fields",""); // = function(proval, currentstatus, css, newlog)
			    $timeout(function(){
					$scope.proval = 0;
				}, 2000);
			
				});
		 });
			
	}
	
	//FOR GETTING JSON BASED ON MASTER TABLE TO BE UPLOADED
	
	$scope.getMaster=function(master)
	{
		if(master=='Logo Code')
		{
			$scope.jsonFile='cclogoCodeMasterUpload'
		}
		else if(master=='Promo Logo Code')
		{
			$scope.jsonFile='ccpromoLogoCodeMasterUpload'
		}
		else if(master=='Price Code')
		{
			$scope.jsonFile='ccpriceCodeMasterUpload'
		}
		else if(master=='DMA Code')
		{
			$scope.jsonFile='ccDMACodeMasterUpload'
		}
		else if(master=='Surrogate Code')
		{
			$scope.jsonFile='ccsurrogateCodeMasterUpload'
		}
		else if(master=='Pin Code')
		{
			$scope.jsonFile='ccpinCodeMasterUpload'
		}
		else if(master=='Img Type')
		{
			$scope.jsonFile='ccimgTypeMasterUpload'
		}
		else if(master=='Company Master')
		{
			$scope.jsonFile='cccompanyMasterUpload'
		}
		else if(master=='Tier Code')
		{
			$scope.jsonFile='cctireCodeMasterUpload'
		}
		$scope.logs+="Master Excel Imported : "+master;
	}
	//console.log("----"+$scope.jsonFile);
	
	
	
 $scope.param={};
 
 $scope.subForm = function(file){
	 						$scope.setLog(50,"Reading File",""); // = function(proval, currentstatus, css, newlog)

			var arrFile = $scope.param.file.split(".");
			//console.log("hiiiiiiiii----->"+JSON.stringify($scope.param.file));
			$scope.param.file = arrFile[1];
			if($scope.param.file!="xls")
			{ 	
				toastr.error('Only .xls files allowed ', 'Error');
				//window.location.reload(true);
				$scope.formdata.file="";
				$scope.formdata.masterName = {};
					$scope.setLog(100,"Complete",""); // = function(proval, currentstatus, css, newlog)
			    $timeout(function(){
					$scope.proval = 0;
				}, 2000);
			
			}
			else
			{
				
			
				$scope.formdata.file = file;
				$scope.formdata.folder = "CC_IMPORT_CSV";
				
				//console.log("---->"+JSON.stringify($scope.formdata))
					
				$file = Upload.upload({ 
				  url: CORE_CONFIG.WEB_SERVICE+WEB_API.UPLOAD,
				  data: $scope.formdata,
				});
				
				
				
				var now = new Date();
				var start = new Date(now.getFullYear(), 0, 0);			
				var diff = now - start;			
				var oneDay = 1000 * 60 * 60 * 24;				
				var dd = now.getDate();
				var mm = now.getMonth()+1; //January is 0!
				var yyyy = now.getFullYear();				
				var currentDate = yyyy.toString()+"-"+mm.toString()+"-"+dd.toString(); 
				
				//console.log("---->"+currentDate);
				$file.then(function (response) {
					//console.log("------------->"+$scope.jsonFile);
					if(response.data.status == "success"){
						$scope.currentFileName = response.data.result.upload_data.file_name;
					
						// INITIATE IMPORT WEB SERVICE sFOR BATCH ID AND UPLOADD FILE
								var arrFile = $scope.currentFileName.split(".");
								$scope.currentFileName = arrFile[0];
								//var extData = {modifyOn:currentDate,modifyBy:$rootScope.SESS_USER['userId']};
								//console.log(""+JSON.stringify(extData));
								$scope.csv = ExcelImport.get({"file":$scope.currentFileName,"folderId":"CC_IMPORT_CSV"
								,"json":$scope.jsonFile,"extData":""});
								//console.log("QQQQQQQQQ--->"+JSON.stringify($scope.csv));
								$scope.csv.$promise.then(function(result){
									console.log("-------->dijdwilwl"+JSON.stringify(result))
									if(result.duplicate!=0)
									{
										$scope.logs+="\n Duplicate Records Found";
									}
									else
									{
										$scope.logs+="\n No Duplicate Records Found";
									}
									toastr.success('Excel Imported Successfully ');
									//$scope.file='';
									//$scope.formdata={};
									$scope.formdata.file="";
									$scope.formdata.masterName = {};
										$scope.setLog(100,"Import Complete",""); // = function(proval, currentstatus, css, newlog)
			    $timeout(function(){
					$scope.proval = 0;
				}, 2000);
				$scope.logs+="\n"
			
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
	}


});

//QUERY BROWSER
bpoApps.controller("ccqueryexecutecontroller",function($scope,Sections,Fields,$anchorScroll,$location,$timeout,executequery,toastr)
{	

	$scope.submitquery = function(sqlquery)
	{
		$scope.ValidQuery = (sqlquery.split(' ')[0]);
		if($scope.ValidQuery!="select")
		{
			toastr.error("Only Select Query Allowed","Error")
		}
		else
		{
		$scope.queryexecute = executequery.get({"sql" : sqlquery});
		$scope.queryexecute.$promise.then(function(result){
			if(result.status=="success")
			{
				$scope.queryexecute = result.result;
				//console.log("ALL DATA ITEMS :----->      "+JSON.stringify(result));
			}
			
		}
		,function(error)
		{
	  		toastr.error("Invalid Query","Error")	
		});
	}

}


});

//REPORTS
bpoApps.controller("ccReportController",function($scope,Sections,Fields,toastr,CCBankCsv,ngTableParams,$filter,$sce)
{	
$scope.outputdate=new Date();
//$scope.appRefNos = "";
$scope.formdata={};
		$scope.url = $sce.trustAsUrl("/index.php/api/CC/generateOutput/");
		$scope.updateRange = function(){
 
			if($scope.appRefNos != ""){
				if(confirm("Proceed to update range?")){
					$scope.processRange();	
				}
			}else{
				$scope.processRange();	
			}
		}
	
		$scope.processRange = function(){
			
			$scope.arrRef = Array();
			var counter = 0;
			for(var i=Number($scope.rangeFrom);i <= Number($scope.rangeTo);i++){
				$scope.arrRef.push((Number($scope.rangeFrom)+counter));	
				counter++;
			}
			
			$scope.appRefNos = $scope.arrRef.toString();
			$scope.url = $sce.trustAsUrl("index.php/api/CC/generateOutput/"+$scope.appRefNos);
			console.log($scope.url);
		}

		$scope.gen = function(){
//			window.location="index.php/api/CC/generateOutput/"+$scope.appRefNos;	
			

			window.open(
			  "index.php/api/CC/generateOutput/"+$scope.appRefNos,
			  '_blank' // <- This is what makes it open in a new window.
			);
			

		}
		$scope.getCsv=function()
		{
			$scope.arrRefcsv = Array();
			var counter = 0;
			for(var i=Number($scope.rangeFrom);i <= Number($scope.rangeTo);i++){
				$scope.arrRefcsv.push((Number($scope.rangeFrom)+counter));	
				counter++;
			}
			
			$scope.appRefNosCSV= $scope.arrRef.toString();

			
			$scope.getreport=CCBankCsv.get({
				"appref":$scope.appRefNosCSV
				})
				
		    $scope.getreport.$promise.then(function(success){
				$scope.formdata=success.result;
				console.log("==>> SUMMARY"+JSON.stringify(success))
				$scope.tableParams.reload();
			//	$scope.formdata={};
				})
		  	
		  		 $scope.tableParams.reload();
				
				
}
		
		$scope.tableParams = new ngTableParams({
				debugMode: true,
				page: 1, 
				count: 10,
				sorting: {
  						location: 'desc',
						Batch_No: 'desc',
						applicationNo:'desc',
						apsNo:'desc',
						Uploaded_By:'desc',
						Status:'desc',
						batchNo:'desc',
						DE:'desc',
						FI:'desc',
						QC:'desc',
						CAM:'desc',
						Audit:'desc'
						
                },
				filter: {
						location: '',
						Batch_No: '',
						applicationNo:'',
						apsNo:'',
						Uploaded_By:'',
						Status:'',
						batchNo:'',
						DE:'',
						FI:'',
						QC:'',
						CAM:'',
						Audit:'',
				}

				}, {
				total: $scope.formdata.length,
				getData: function ($defer, params) {
				var filteredData = params.filter() ? $filter('filter')($scope.formdata, params.filter()) : $scope.formdata;
				var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 

				params.total(orderedData.length);
				$defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
				});

	
});

bpoApps.controller("ccMISSummaryReportController",function($scope,DocTypes,Sections,Fields,$anchorScroll,$location,$timeout,toastr,$parse,MISSummaryreport,ngTableParams,$filter)
{ 

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
 
 $scope.currentRow = 0;
 $scope.formdata = {};
  $scope.MISSummary={};
 $scope.sections = Sections.get({"id":"41"});
 
 $scope.sections.$promise.then(function(result){
  $scope.sections = result.result;
  angular.forEach(result.result, function(value, key) {
   var fields = Array();
   $scope.sections[key].fields = Array();
   $scope.sections[key].sortedFields = Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
   $scope.getSectionRenderer(value,key);  
  });
 });
 
 $scope.MISSummary=Array();
 $scope.getSectionRenderer = function(section,sectionIndex){
   
   $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
   $scope.fields.$promise.then(function(result){
    $scope.sections[sectionIndex].fields = result.result;
     angular.forEach(result.result, function(value, key) { 
     //$scope.formdata[value.model] = "";
     $scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
    });
   });
   
 }
 
 $scope.param={};
 
 $scope.submitMISSummaryreport = function(){ 
	//console.log("formdat==="+JSON.stringify($scope.formdata.ccdataentry__startingNumber));
  $scope.MISSummaryreport=MISSummaryreport.get({"startingNumber":$scope.formdata.ccdataentry__startingNumber,"endingNumber":$scope.formdata.ccdataentry__endingNumber});
    $scope.MISSummaryreport.$promise.then(function (response) {
  	 $scope.MISSummary = response.result;
	  if(response.result=="")
	  {
		  toastr.error('No Record Found', 'error');
	  }
	 //console.log("RESULT====="+JSON.stringify($scope.MISSummary));
    $scope.tableParams.reload();
	});
 }
 
 
 
		$scope.tableParams = new ngTableParams({
				debugMode: true,
				page: 1, 
				count: 10,
				sorting: {				
  						emboName: 'desc',
						AppSerialNo: 'desc',
						ApplRefNo:'desc',
						Status:'desc'
						
						
                },
				filter: {
						emboName: '',
						AppSerialNo: '',
						ApplRefNo:'',
						Status:''
				}

				}, {
				total: $scope.MISSummary.length,
				getData: function ($defer, params) {
				var filteredData = params.filter() ? $filter('filter')($scope.MISSummary, params.filter()) : $scope.MISSummary;
				var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 

				params.total(orderedData.length);
				$defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
				});
	});
	
bpoApps.controller("ccMISRejectionReportController",function($scope,DocTypes,Sections,Fields,$anchorScroll,$location,$timeout,toastr,$parse,MISRejectionreport,ngTableParams,$filter)
{ 

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
 
 $scope.currentRow = 0;
 $scope.formdata = {};
  $scope.MISRejection={};
 $scope.sections = Sections.get({"id":"42"});
 
 $scope.sections.$promise.then(function(result){
  $scope.sections = result.result;
  angular.forEach(result.result, function(value, key) {
   var fields = Array();
   $scope.sections[key].fields = Array();
   $scope.sections[key].sortedFields = Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
   $scope.getSectionRenderer(value,key);  
  });
 });
 
 $scope.MISRejection=Array();
 $scope.getSectionRenderer = function(section,sectionIndex){
   
   $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
   $scope.fields.$promise.then(function(result){
    $scope.sections[sectionIndex].fields = result.result;
     angular.forEach(result.result, function(value, key) { 
     //$scope.formdata[value.model] = "";
     $scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
    });
   });
   
 }
 
 $scope.param={};
 
 $scope.submitMISRejectionreport = function(){ 
	//console.log("formdat==="+JSON.stringify($scope.formdata.ccdataentry__startingNumber));
  $scope.MISRejectionreport=MISRejectionreport.get({"startingNumber":$scope.formdata.ccdataentry__startingNumber,"endingNumber":$scope.formdata.ccdataentry__endingNumber});
    $scope.MISRejectionreport.$promise.then(function (response) {
     //console.log(JSON.stringify(response));
	  if(response.result=="")
	  {
		  toastr.error('No Record Found', 'error');
	  }
	 $scope.MISRejection = response.result;
	
	 //console.log("RESULT====="+JSON.stringify($scope.MISRejection));
    $scope.tableParams.reload();
	});
 }
 
 
 
		$scope.tableParams = new ngTableParams({
				debugMode: true,
				page: 1, 
				count: 10,
				sorting: {
  						emboName: 'desc',
						applicationNo: 'desc',
						ApplRefNo:'desc',
						remark:'desc',
						reason:'desc'
						
						
                },
				filter: {
						emboName: '',
						applicationNo: '',
						ApplRefNo:'',
						remark:'',
						reason:''
						
				}

				}, {
				total: $scope.MISRejection.length,
				getData: function ($defer, params) {
				var filteredData = params.filter() ? $filter('filter')($scope.MISRejection, params.filter()) : $scope.MISRejection;
				var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 

				params.total(orderedData.length);
				$defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
				});
	});

bpoApps.controller("ccdateWiseProductivityController",function($scope,DocTypes,Sections,Fields,$anchorScroll,$location,$timeout,toastr,$parse,DateWiseProductivity,ngTableParams,$filter)
{ 

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
 
 $scope.currentRow = 0;
 $scope.formdata = {};
  $scope.DateWiseReport={};
 $scope.sections = Sections.get({"id":"43"});
 
 $scope.sections.$promise.then(function(result){
  $scope.sections = result.result;
  angular.forEach(result.result, function(value, key) {
   var fields = Array();
   $scope.sections[key].fields = Array();
   $scope.sections[key].sortedFields = Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
   $scope.getSectionRenderer(value,key);  
  });
 });
 
 $scope.DateWiseReport=Array();
 $scope.getSectionRenderer = function(section,sectionIndex){
   
   $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
   $scope.fields.$promise.then(function(result){
    $scope.sections[sectionIndex].fields = result.result;
     angular.forEach(result.result, function(value, key) { 
     //$scope.formdata[value.model] = "";
     $scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
    });
   });
   
 }
 
 $scope.param={};
 
 $scope.submitDateWiseProductivity = function(){ 
	//console.log("formdat==="+JSON.stringify($scope.formdata.ccdataentry__startingNumber));
  $scope.DateWiseProductivity=DateWiseProductivity.get({"startingDate":$scope.formdata.ccdataentry__startingDate,"endingDate":$scope.formdata.ccdataentry__endingDate});
    $scope.DateWiseProductivity.$promise.then(function (response) {
     //console.log(JSON.stringify(response));
	  if(response.result=="")
	  {
		  toastr.error('No Record Found', 'error');
	  }
	 $scope.DateWiseReport = response.result;
	//$scope.filteredSelected = filterFilter($scope.DateWiseReport, (isSelected));
	 //console.log("RESULT====="+JSON.stringify($scope.DateWiseReport));
	 
    $scope.tableParams.reload();
	});
 }
 
 
 
		$scope.tableParams = new ngTableParams({
				debugMode: true,
				page: 1, 
				count: 10,
				sorting: {
  						fullName: 'desc',
						creationDate: 'desc',
						Aging:'desc',
						CAP:'desc',
						QC:'desc',
						Total:'desc'
						
						
                },
				filter: {
						fullName: '',
						creationDate: '',
						Aging:'',
						CAP:'',
						QC:'',
						Total:''
				}

				}, {
				total: $scope.DateWiseReport.length,
				getData: function ($defer, params) {
				var filteredData = params.filter() ? $filter('filter')($scope.DateWiseReport, params.filter()) : $scope.DateWiseReport;
				var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 

				params.total(orderedData.length);
				$defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
				});
	});

bpoApps.controller("cchourlyProductivityController",function($scope,DocTypes,Sections,Fields,$anchorScroll,$location,$timeout,toastr,$parse,HourlyProductivity,ngTableParams,$filter)
{ 

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
 
 $scope.currentRow = 0;
 $scope.formdata = {};
  $scope.HourlyProductivity={};
 $scope.sections = Sections.get({"id":"44"});
 
 $scope.sections.$promise.then(function(result){
  $scope.sections = result.result;
  angular.forEach(result.result, function(value, key) {
   var fields = Array();
   $scope.sections[key].fields = Array();
   $scope.sections[key].sortedFields = Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
   $scope.getSectionRenderer(value,key);  
  });
 });
 
 $scope.HourlyProductivity=Array();
 $scope.getSectionRenderer = function(section,sectionIndex){
   
   $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
   $scope.fields.$promise.then(function(result){
    $scope.sections[sectionIndex].fields = result.result;
     angular.forEach(result.result, function(value, key) { 
     //$scope.formdata[value.model] = "";
     $scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
    });
   });
   
 }
 
 $scope.param={};
 $scope.formdata.ccdataentry__shift={};
 $scope.formdata.ccdataentry__activity={};
 $scope.submitHourlyProductivity = function(){ 
 	console.log("===date==="+$scope.formdata.ccdataentry__Date);
	if($scope.formdata.ccdataentry__Date==undefined)	
	{
		$scope.dateValue = "0";
	}
 	else
	{
		$scope.dateValue=$scope.formdata.ccdataentry__Date;
	}
	if($scope.formdata.ccdataentry__shift.selectedItem==null)	
	{
		$scope.shiftValue = "0";
	}
 	else
	{
		$scope.shiftValue=$scope.formdata.ccdataentry__shift.selectedItem.displaylabel;
	}
	
	if($scope.formdata.ccdataentry__activity.selectedItem==null)	
	{ 
		$scope.activitytValue = "0";
	}
 	else
	{
		$scope.activitytValue=$scope.formdata.ccdataentry__activity.selectedItem.processId;
	}
	
  $scope.HourlyProductivity=HourlyProductivity.get({"date":$scope.dateValue,"shift":$scope.shiftValue,"activity":$scope.activitytValue});
    $scope.HourlyProductivity.$promise.then(function (response) {
     //console.log(JSON.stringify(response));
	  if(response.result=="")
	  {
		  toastr.error('No Record Found', 'error');
	  }
	  
	 $scope.HourlyProductivity = response.result;
	// console.log("RESULT====="+$scope.HourlyProductivity.length);
	 
	//$scope.filteredSelected = filterFilter($scope.DateWiseReport, (isSelected));
	 console.log("RESULT====="+JSON.stringify($scope.HourlyProductivity));
	 
    $scope.tableParams.reload();
	});
 }
 
		$scope.tableParams = new ngTableParams({
				debugMode: true,
				page: 1, 
				count: 10,
				sorting: {
  						Operator: 'desc',
						A : 'desc',
						B : 'desc',
						C : 'desc',
						D : 'desc',
						F : 'desc',
						I : 'desc',
						J : 'desc',
						K : 'desc',
						L : 'desc',
						M : 'desc'
						
						
						
						
                },
				filter: {
						Operator: '',
						A_To_B: '',
						A_To_B: '',
						A_To_B: '',
						A_To_B: '',
						A_To_B: '',
				}

				}, {
				total: $scope.HourlyProductivity.length,
				getData: function ($defer, params) {
				var filteredData = params.filter() ? $filter('filter')($scope.HourlyProductivity, params.filter()) : $scope.HourlyProductivity;
				var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 

				params.total(orderedData.length);
				$defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
				});

	});

bpoApps.controller("ccdashboardSummaryReportController",function($scope,DocTypes,Sections,Fields,$anchorScroll,$location,$timeout,toastr,$parse,DashboardSummaryReport,ngTableParams,$filter)
{ 

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
 
 $scope.currentRow = 0;
 $scope.formdata = {};
  $scope.DashboardSummaryReport={};
 $scope.sections = Sections.get({"id":"45"});
 
 $scope.sections.$promise.then(function(result){
  $scope.sections = result.result;
  angular.forEach(result.result, function(value, key) {
   var fields = Array();
   $scope.sections[key].fields = Array();
   $scope.sections[key].sortedFields = Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);
   $scope.getSectionRenderer(value,key);  
  });
 });
 
 $scope.DashboardSummaryReport=Array();
 $scope.getSectionRenderer = function(section,sectionIndex){
   
   $scope.fields = Fields.get({"id":0,"sectionId":section.sectionId});
   $scope.fields.$promise.then(function(result){
    $scope.sections[sectionIndex].fields = result.result;
     angular.forEach(result.result, function(value, key) { 
     //$scope.formdata[value.model] = "";
     $scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
    });
   });
   
 }
 
 $scope.param={};
 $scope.submitDashboardSummaryReport = function(){ 
 	console.log("===date==="+$scope.formdata.ccdataentry__JDFrom);
	console.log("===date==="+$scope.formdata.ccdataentry__JDTo);
	
  $scope.DashboardSummaryReport=DashboardSummaryReport.get({"from":$scope.formdata.ccdataentry__JDFrom,"to":$scope.formdata.ccdataentry__JDTo});
    $scope.DashboardSummaryReport.$promise.then(function (response) {
     console.log(JSON.stringify(response));
	  if(response.result=="")
	  {
		  toastr.error('No Record Found', 'error');
	  }
	  
	 $scope.DashboardSummaryReport = response.result;
	
	 console.log("RESULT====="+JSON.stringify($scope.DashboardSummaryReport));
	 
    $scope.tableParams.reload();
	});
 }
 
		$scope.tableParams = new ngTableParams({
				debugMode: true,
				page: 1, 
				count: 10,
				sorting: {
  						agencycode: 'desc',
						Location : 'desc',
						PendingForCapture : 'desc',
						InCapture : 'desc',
						PendingForQC : 'desc',
						QC : 'desc',
						Final : 'desc',
						Rejected : 'desc',
						Total : 'desc'
						
						
						
						
                },
				filter: {
						agencycode: '',
						Location : '',
						PendingForCapture : '',
						InCapture : '',
						PendingForQC : '',
						QC : '',
						Final : '',
						Rejected : '',
						Total : ''
				}

				}, {
				total: $scope.DashboardSummaryReport.length,
				getData: function ($defer, params) {
				var filteredData = params.filter() ? $filter('filter')($scope.DashboardSummaryReport, params.filter()) : $scope.DashboardSummaryReport;
				var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 

				params.total(orderedData.length);
				$defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
				});
	
	});
	
bpoApps.controller("CCprocessSettingsController",function($scope,Sections,Fields,ProcessField,toastr,coreTable,$routeParams,$parse,sessionService,$timeout)
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


	$scope.appId=2;

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

bpoApps.controller("ccdashboardDownloadController",function($scope,DocTypes,Sections,Fields,$anchorScroll,$location,$timeout,toastr,$parse,DashboardDownload,ngTableParams,$filter)
{ 
		$scope.getAllItems = function(data, datalist, accessor, scopevar){
		// SCOPEVAR IS DBVAL
			console.log("data::"+JSON.stringify(data));
			console.log("accessor::"+accessor);
			console.log("datalist::"+datalist);
			console.log("scopevar::"+scopevar);
			var lblaccessor = accessor;
			if($scope.formdata[lblaccessor]!=null){
				if($scope.formdata[lblaccessor].selectedItem == null){
					if($scope.formdata[lblaccessor] == ""){
						$scope.formdata[lblaccessor]={};	
					}
					 
				}
			}
			else{
				$scope.formdata[lblaccessor]={};	
			}
			var tmp = $parse(datalist) ;
			tmp.assign($scope, data);
			accessor = "formdata['"+accessor+"']";
			var accessor = $parse(accessor); 
			angular.forEach(data, function(value, key) {
				if($scope.formdata[lblaccessor] != null){
					if($scope.formdata[lblaccessor].selectedItem != null){
						if(value[scopevar] == $scope.formdata[lblaccessor].selectedItem[scopevar]  ){  
						accessor.assign($scope, {"selectedItem":value});
						}				
					}
					else if($scope.formdata[lblaccessor] != ""){
						if(value[scopevar] == $scope.formdata[lblaccessor] ){  //||  $routeParams.process == 1|| 1==1			
							$scope.formdata[lblaccessor] = {};
							accessor.assign($scope, {"selectedItem":value});
						}	
					}
				}
			});
		}
 $scope.dashboardData={}; 
 $scope.currentRow = 0;
 $scope.formdata = {};
 $scope.DashboardDownload={};
 $scope.agency=null;

 $scope.sections = Sections.get({"id":"67"});
 
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
 $scope.submitDashboardDownload = function(){ 
 	
	
	if($scope.formdata.agencyId.selectedItem==undefined)
	{
		$scope.agency=0
	}
	else
	{
		$scope.agency=$scope.formdata.agencyId.selectedItem.agencyId
	}
	
  $scope.dashboardownload=DashboardDownload.get({"from":$scope.formdata.jdfrom,"to":$scope.formdata.jdto,"agencyId":$scope.agency});
    $scope.dashboardownload.$promise.then(function (response) {
	  if(response.result=="")
	  {
		  toastr.error('No Record Found', 'error');
	  }
	 
	 	$scope.dashboardData = response.result;
	     $scope.tableParams.reload();
	});
 }
 
		$scope.tableParams = new ngTableParams({
				debugMode: true,
				page: 1, 
				count: 10,
				sorting: {
  						agencycode: 'desc',
						Location : 'desc',
						PendingForCapture : 'desc',
						InCapture : 'desc',
						PendingForQC : 'desc',
						QC : 'desc',
						Final : 'desc',
						Rejected : 'desc',
						Total : 'desc'
						
						
						
						
                },
				filter: {
						agencycode: '',
						Location : '',
						PendingForCapture : '',
						InCapture : '',
						PendingForQC : '',
						QC : '',
						Final : '',
						Rejected : '',
						Total : ''
				}

				}, {
				total: $scope.dashboardData.length,
				getData: function ($defer, params) {
				var filteredData = params.filter() ? $filter('filter')($scope.dashboardData, params.filter()) : $scope.dashboardData;
				var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 

				params.total(orderedData.length);
				$defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
				});
	
	});
	
bpoApps.controller("ccWIPReportController",function($scope,CCWIPReprt,Sections,Fields,$anchorScroll,$location,$timeout,toastr,$parse,DashboardDownload,ngTableParams,$filter)
{ 
  $scope.formdata={}
  $scope.date = new Date();
  $scope.sections = Sections.get({"id":"41"});
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
     //$scope.formdata[value.model] = "";
     $scope.sections[sectionIndex].sortedFields[value.row].push(value) ;
    });
   });
   
 }
 
 $scope.submitWIP = function(){ 
 	console.log("formdata::::"+JSON.stringify($scope.formdata));
  $scope.WIP=CCWIPReprt.get({"applicationFrom":$scope.formdata.ccdataentry__startingNumber,
  "applicationTo":$scope.formdata.ccdataentry__endingNumber});
    $scope.WIP.$promise.then(function (response) {
	
	  if(response.result=="")
	  {
		  toastr.error('No Record Found', 'error');
	  }
	  else
	  {
			  $scope.formdata = response.result;
  	
    		 $scope.tableParams.reload();
 	  }
	});
 }
 
		$scope.tableParams = new ngTableParams({
				debugMode: true,
				page: 1, 
				count: 10,
				sorting: {
  						agencycode: 'desc',
						Location : 'desc',
						PendingForCapture : 'desc',
						InCapture : 'desc',
						PendingForQC : 'desc',
						QC : 'desc',
						Final : 'desc',
						Rejected : 'desc',
						Total : 'desc'
						
						
						
						
                },
				filter: {
						agencycode: '',
						Location : '',
						PendingForCapture : '',
						InCapture : '',
						PendingForQC : '',
						QC : '',
						Final : '',
						Rejected : '',
						Total : ''
				}

				}, {
				total: $scope.formdata.length,
				getData: function ($defer, params) {
				var filteredData = params.filter() ? $filter('filter')($scope.formdata, params.filter()) : $scope.formdata;
				var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData; 

				params.total(orderedData.length);
				$defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count())); 
				}
				});
	
	});

