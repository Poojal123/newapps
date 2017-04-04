// JavaScript Document
bpoApps.factory('AgencyBatch', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.AGENCYBATCH+"/:agencyId/:batchId/:uploadedBy", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);
bpoApps.factory('BatchRange', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.BATCHRANGE+"/:agencyId/:jdno", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);
bpoApps.factory('GetImage', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.GETIMAGES+"/:job/:from/:to/:agencyCode", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('MergeImage', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCMERGEIMAGES+"/:image/:job/:imageName/:userId/:agencyCode", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);
bpoApps.factory('CreateBlankEntry', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CREATEBLANKENTRY+"/:jdNo/:applicationNo/:imageType/:agencyId/:noOfApplication/:agencyCode/:userId", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);
bpoApps.factory('executequery', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.GETQUERYEXECUTE+"/:sql", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);
bpoApps.factory('allocateBlankEntry', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.ALLOCATEBLANKENTRY+"/:jdNo/:imgData/:imgType/:applicationData", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);



bpoApps.factory('CreateAgency', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CREATEAGENCY+"/:agencyCode/:agencyName/:batchId", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);

bpoApps.factory('CCAllocateRecord', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCALLOCATERECORD+"/:processId/:userId/:agencyCode", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);
bpoApps.factory('CCUpdateStatus', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCUPDATESTATUS+"/:batchId", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);

bpoApps.factory('CCFields', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.ADDCCFIELDS, {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('Data', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.DATA+"/:code/:table/:fieldName", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);
bpoApps.factory('CCMarkDup', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.MARKDUP+"/:agencyBatchId", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);

bpoApps.factory('JdData', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCJDDATA+"/:jdNo/:agencyId", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);
bpoApps.factory('CCBankCsv', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCBANKCSV+"/:appref		", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);


bpoApps.factory('CalculateAge', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CALCULATEAGE+"/:selecteddate", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('MISSummaryreport', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.MISSUMMARYREPORT+"/:startingNumber/:endingNumber", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);

bpoApps.factory('MISRejectionreport', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.MISREJECTIONREPORT+"/:startingNumber/:endingNumber", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);

bpoApps.factory('DateWiseProductivity', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.DATEWISEPRODUCTIVITY+"/:startingDate/:endingDate", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);


bpoApps.factory('HourlyProductivity', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCHOURLYPRODUCTIVITY+"/:date/:shift/:activity", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);

bpoApps.factory('DashboardSummaryReport', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCDASHBOARDSUMMARYREPORT+"/:from/:to", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);


bpoApps.factory('CCMergedImageReport', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCMERGEDIMAGEREPORT, {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);
bpoApps.factory('CCGetJob', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCGETJOB+"/:application", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);



bpoApps.factory('DashboardDownload', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCDASHBOARDDOWNLOAD+"/:from/:to/:agencyId", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);

bpoApps.factory('CCGetRange', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCGETRANGE+"/:agencyId/:jdNo", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);
bpoApps.factory('CCSetting', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCSETTING+"/:agencyCode/:jdNo/:type/:value", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);
bpoApps.factory('CCWIPReprt', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.WIPREPORT+"/:applicationFrom/:applicationTo", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);

bpoApps.factory('CCImageName', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.IMAGENAME+"/:jdNo/:agencyId", {},
   {
    'update': { method:'PUT' }
   }  
  ); 
}]);

bpoApps.factory('Snippet', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.SNIPPET+"/:fieldId/:imageTypeId", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);
bpoApps.factory('Unmapped', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCGETUNMAPPED+"/:agencyId/:jobNo", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);
bpoApps.factory('Previous', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCGETPREVIOUS+"/:agencyId/:userId", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);

bpoApps.factory('SearchApp', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CCSEARCHAPPLICATION+"/:appref", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);
bpoApps.factory('Pincode', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CHECKPINCODE+"/:pincode", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);
bpoApps.factory('CheckSerialNo', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CHECKSERIALNO+"/:appSerialNo/:processId", {},
   {
  'update': { method:'PUT' }
 }  
  ); 
}]);


