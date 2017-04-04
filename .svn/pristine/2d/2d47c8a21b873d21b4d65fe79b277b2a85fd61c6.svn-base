// JavaScript Document
bpoApps.factory('DocTypes', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.GETCASADOCTYPES+"/:id", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('casafolderscan', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.GETFILENAME+"/:job", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('Indextype', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.GETINDEXTYPE+"/:id", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('NriType', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.GETNRITYPE+"/:id", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('MergeImages', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.MERGEIMAGES+"/:image/:job/:filename", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('RenameBatch', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.RENAMEBATCH+"/:job/:csv/:indexingtype/:nritype", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);


bpoApps.factory('OptimizeImage', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.OPTIMIZE+"/:job", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);
