bpoApps.factory('PDCPROCSVImport', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.PDCCSVIMPORT+"/:file/:folderId/:json/:extData/:extention/:separator", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);


bpoApps.factory('CommunicationModules', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.COMMUNICATIONMODULES+"", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('PurgeData', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.PURGEDATA, {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

