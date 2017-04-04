// JavaScript Document
bpoApps.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            element.bind('change', function(e) {
 
                var onFileReadFn = $parse(attrs.onReadFile);
                var reader = new FileReader();
                
                reader.onload = function(e) {
					 var extension = e.target.fileName.match(/\.[0-9a-z]+$/i);
                     var fileContents = reader.result;
                    scope.$apply(function() {
                        onFileReadFn(scope, {
                            'contents' : fileContents,
							'ext' : extension,
							'filename' : e.target.fileName,
							'fileobj' : element[0].files[0]
                        });
			            element.val(null);  // clear input
                    });
                };
                
		        reader.fileName = element[0].files[0].name;
				var extension = element[0].files[0].name.match(/\.[0-9a-z]+$/i);
				//alert(extension);
				if(extension == '.xlsx' || extension == '.xls' || extension == '.XLSX' || extension == '.XLS')
				{
					reader.readAsArrayBuffer(element[0].files[0]);	
				}
				else if (extension == ".csv" || extension== ".CSV")
				{
					reader.readAsText(element[0].files[0]);	
				}
				else{
					reader.readAsText(element[0].files[0]);		
				}
//				reader.readAsArrayBuffer(element[0].files[0]);	
				
            });
        }
    };
})


bpoApps.directive('fileModel', ['$parse', function ($parse) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
   };
}]);

// We can write our own fileUpload service to reuse it in the controller
bpoApps.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, name){
         var fd = new FormData();
         fd.append('file', file);
         fd.append('name', name);
         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined,'Process-Data': false}
         })
         .success(function(){
            console.log("Success");
         })
         .error(function(){
            console.log("Success");
         });
     }
 }]);


bpoApps.service('sessionService', ['$window','$http','$location','Login', function ($window,$http,$location,Login) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        get: function (key) {
            value = $window.localStorage[key];
//			alert(value);
            if (typeof value !== "undefined" && value !== "undefined") {
                return JSON.parse($window.localStorage[key] || "");
            }
            else
                return "";
        },
		remove: function(key)
		{
			//alert(key);
			$window.localStorage.removeItem(key);	
		},
		clear: function()
		{
			$window.localStorage.clear();	
		}, 
		getLoginSession: function(callback,error){

			var login = Login.get();
			login.$promise.then(function(result){
				console.log("LOGGED :"+result.status);
				if(result.status == "error")
				{
					error();
				}
				else
				{
					callback(result);	
				}
			});

		},
		removeLoginSession: function(callback,error){
			var login = Login.delete({},function(response){
				callback();				
			});
		}
    }
}])


bpoApps.factory('Sections', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.GETCORESECTIONS+"/:id", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);


bpoApps.factory('Fields', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.GETCOREFIELDS+"/:id/:sectionId", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('Menus', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.MENUS+"/:parentId/:roleId/:system", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('Batch', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.BATCH+"/:appId/:batchId/:uploadedBy", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);


bpoApps.factory('CSVImport', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CSVIMPORT+"/:file/:folderId/:json/:extData/:extention/:separator/:prefix", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('CSVImportUni', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CSVIMPORTUNI+"/:file/:folderId/:json/:extData/:extention/:separator/:arrDuplicate/:dbunique", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('ExcelImport', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.EXCELIMPORT+"/:file/:folderId/:json/:extData/:extention/:separator", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('coreTable', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.TABLE+"/:tbl/:whr/:delkey/:delval", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);


bpoApps.factory('coreContracts', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CONTRACTS+"/:id", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('Users', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CONTRACTS+"/:id", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('RoleModules', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.ROLEMODULES+"", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('ContractUsers', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.CONTRACTUSERS+"/:contractId/:users", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('Login', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.LOGIN+"/:emailId/:passWord", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('ProcessField', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.PROCESSFIELDS+"/:fieldIds/:processId", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);
bpoApps.factory('CCPrepopulated', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.PREPOPULATED+"/:fieldIds/:recordId", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);
bpoApps.factory('Forgot', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.FORGOT+"/:emailId", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('NewPass', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.NEWPASS+"/:newPassword", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('ExcelImport', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.EXCELIMPORT+"/:file/:folderId/:json/:extData/:extention/:separator", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);

bpoApps.factory('FilePreview', ['$resource','CORE_CONFIG','WEB_API', function($resource,CORE_CONFIG,WEB_API)
 {
  return $resource(CORE_CONFIG.WEB_SERVICE+WEB_API.IMPORTPREVIEW+"/:pagenumber/:pagesize/:folder/:file/:extension", {},
  	{
		'update': { method:'PUT' }
	}  
  ); 
}]);
