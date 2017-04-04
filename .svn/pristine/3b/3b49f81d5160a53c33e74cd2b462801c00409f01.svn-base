// JavaScript Document
bpoApps.factory('User', ['$resource','CORE_CONFIG', function($resource,CORE_CONFIG)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+'/User/index/:id/:email/:password', {},
  	{
		'update': { method:'PUT' },
        'login': 
		{
  			 url:CORE_CONFIG.WEB_SERVICE+'/User/login' , 
  			 method: 'GET', 
			params: 
  			 { 
  				  email:"",
  				  password:""
   			},
  			 isArray: false
  		}
	}  
  ); 
}]);

bpoApps.factory('Advantage', ['$resource','WEB_API', function($resource,WEB_API)
	 {
	  return $resource(WEB_API.ADVANTAGES+'/:id/:treatmentId', {},{ 'update': { method:'PUT' } 
	 }  
	); 
}]);

bpoApps.factory('Product', ['$resource','WEB_API', function($resource,WEB_API)
	 {
	  return $resource(WEB_API.PRODUCT+'/:id', {},{ 'update': { method:'PUT' } 
	 }  
	); 
}]);
bpoApps.factory('Centre', ['$resource','WEB_API', function($resource,WEB_API)
	 {
	  return $resource(WEB_API.CENTRE+'', {},{ 'update': { method:'PUT' } 
	 }  
	); 
}]);
bpoApps.factory('BodyPart', ['$resource','WEB_API', function($resource,WEB_API)
	 {
	  return $resource(WEB_API.BODYPART+'', {},{ 'update': { method:'PUT' } 
	 }  
	); 
}]);

bpoApps.factory('Treatment', ['$resource','WEB_API', function($resource,WEB_API)
	 {
	  return $resource(WEB_API.TREATMENT+'', {},{ 'update': { method:'PUT' } 
	 }  
	); 
}]);

bpoApps.factory('Promotion', ['$resource','CORE_CONFIG', function($resource,CORE_CONFIG)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+'/Promotion/index/:id', {},
  	{
		'update': { method:'PUT' }
       
	}  
  ); 
}]);

bpoApps.factory('FU', ['$resource','CORE_CONFIG', function($resource,CORE_CONFIG)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+'/FU/index/:id', {},
  	{
		'update': { method:'PUT' }
       
	}  
  ); 
}]);

