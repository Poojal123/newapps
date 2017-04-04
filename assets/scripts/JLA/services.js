bpoApps.factory('JLACSVImport', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.JLACSVIMPORTUNI+"/:file/:folderId/:json/:extData/:extention/:separator/:arrDuplicate/:dbunique", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);
