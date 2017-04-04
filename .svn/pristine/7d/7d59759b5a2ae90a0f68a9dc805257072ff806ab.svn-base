

'use strict';



/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs an AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform an OR.
 */


 

bpoApps.directive('vcSelect', function($timeout,WEB_API,$http,CORE_CONFIG,sessionService,$parse,toastr) {
  return {
	  restrict: 'E',
      scope   : {
		 disabled: '=', 
		 required: '=', 
         model: '=',
         value: '@',
         label: '@',
		 name:'@',
		 field: '=',		 
		 prevfield: '=',		 
		 accessor: '=',
		 datalist: '&',
		 vcChange:'&',
		 vcBlur:'&',
		 vcFocus:'&',
 		 processfield: '=',
		
		},
    templateUrl: 'assets//scripts//vControls//vcSelect//template.html',
	link: function(scope, element, attr) {
 //alert(""+JSON.stringify(attr))
 		if(scope.required == null){
			scope.required = false;	
		}
		
		if(scope.field == null){
			
			scope.field = {};	
		}
		scope.field.prevInvalidate='';
 
 //    	scope.model = sessionService.get(scope.field.fieldId);
//		alert(scope.field.fieldId+":"+JSON.stringify(scope.model));

		if(scope.field != null){
			scope.id = scope.field.fieldId;	
		}
		else{
			scope.id = attr.id;		
		}

			scope.localstorage = function(obj){
				if(scope.field != null){
					sessionService.set(scope.field.fieldId,obj);
				}
			}
 
		scope.currentRecords = (scope.$parent[attr.labeldatalist] == null)?0:scope.$parent[attr.labeldatalist].length;		
		scope.ddlplaceholder = "Select";	

 
	if(attr.placeholder != null){
 
		scope.ddlplaceholder = attr.placeholder;
	}
		
	scope.$on("getDDLData", function (event, args) {
			//console.log("Logo code select"+args.sql);
			if(args.model == attr.labelaccessor){
			if(args.whr != null){
			attr.sql = attr.sql+args.whr;
			//alert(attr.sql+":"+args.whr);
	
			}
			else{
			attr.sql = args.sql;	
			}
			scope.getData(true);

		}
	});
		
		
  var vm = scope;

  vm.disabled = undefined;
  vm.required = undefined;
  vm.searchEnabled = undefined;

  vm.setInputFocus = function (){
    $scope.$broadcast('UiSelectDemo1');
  };

  vm.enable = function() {
    vm.disabled = false;
  };

  vm.disable = function() {
    vm.disabled = true;
  };

  vm.enableSearch = function() {
    vm.searchEnabled = true;
  };

  vm.disableSearch = function() {
    vm.searchEnabled = false;
  };

  vm.clear = function() {
    vm.person.selected = undefined;
    vm.address.selected = undefined;
    vm.country.selected = undefined;
  };

  vm.someGroupFn = function (item){

    if (item.name[0] >= 'A' && item.name[0] <= 'M')
        return 'From A - M';

    if (item.name[0] >= 'N' && item.name[0] <= 'Z')
        return 'From N - Z';

  };

  vm.firstLetterGroupFn = function (item){
      return item.name[0];
  };

  vm.reverseOrderFilterFn = function(groups) {
    return groups.reverse();
  };

  vm.personAsync = {selected : "wladimir@email.com"};
  vm.peopleAsync = [];

  vm.counter = 0;
  vm.onSelectCallback = function (item, model){
    vm.counter++;
    vm.eventResult = {item: item, model: model};
  };

  vm.removed = function (item, model) {
    vm.lastRemoved = {
        item: item,
        model: model
    };
  };

  vm.tagTransform = function (newTag) {
    var item = {
        name: newTag,
        email: newTag.toLowerCase()+'@email.com',
        age: 'unknown',
        country: 'unknown'
    };

    return item;
  };

  vm.person = {};

  vm.person.selectedSingle = 'Samantha';
  vm.person.selectedSingleKey = '5';
  // To run the demos with a preselected person object, uncomment the line below.
  //vm.person.selected = vm.person.selectedValue;

  vm.people = [];

	scope.getData = function(reloadFromServer){
		$timeout(function() {
	
	
			if(attr.sql == null){
				attr.sql="";
			}
			
			if(attr.whr == "" && attr.sql != ""){ attr.whr = "1" }
 
				if(scope.currentRecords == 0 || scope.currentRecords == null || reloadFromServer == true)
				{
 
					var url = CORE_CONFIG.WEB_SERVICE+WEB_API.GETDDL+"/"+attr.tbl+"/"+attr.dbval+"/"+attr.dblbl+"/"+attr.whr+"/"+attr.sql;
		
					$http.get(url).then(function successCallback(response) {
					//	console.log("----->url response --->"+JSON.stringify(response));
								vm.people = response.data.result;			
								scope.datalist = vm.people;
								angular.forEach(scope.datalist, function(value, key) {
									value.dbcol = attr.dbval;
									value.dbval = value[attr.dbval];
								});

								
								if(scope.field != null){
									if(sessionService.get(scope.field.fieldId) != ""){
										
									//	alert(attr.labelaccessor+":DATA"+JSON.stringify(sessionService.get(scope.field.fieldId)));
										//scope.accessor = {"selectedItem": scope.datalist[1] }; //sessionService.get(scope.field.fieldId)};	
	//									scope.$parent[attr.labelaccessor] = {"selectedItem":sessionService.get(scope.field.fieldId)};
	//									scope.accessor.assign(scope.$parent, {"selectedItem":sessionService.get(scope.field.fieldId)});
									//	var tmp = (scope.$parent);
										
									//	console.log((tmp['tmpPlayground__vCompany']));
									//	tmp['tmpPlayground__vCompany'].assign(scope.$parent, {"selectedItem":sessionService.get(scope.field.fieldId)});
	
									}								
								}
								attr.sql = "";
								attr.whr = "";	

								scope.$parent.getAllItems(vm.people, attr.labeldatalist, attr.labelaccessor, attr.dbval);
					  }, function errorCallback(response) {
					
					  });
					
				}
				else{
					
					scope.datalist = scope.$parent[attr.labeldatalist];
					angular.forEach(scope.datalist, function(value, key) {
						value.dbcol = attr.dbval;
						value.dbval = value[attr.dbval];
					});
// fo					console.log("---->dbval----->"+JSONstringify(value.dbval));
					scope.$parent.getAllItems(scope.$parent[attr.labeldatalist], attr.labeldatalist, attr.labelaccessor, attr.dbval);	
				}
	
		})
		
	}

	$timeout(scope.getData(false));


  vm.appendToBodyDemo = {
    remainingToggleTime: 0,
    present: true,
    startToggleTimer: function() {
      var scope = vm.appendToBodyDemo;
      var promise = $interval(function() {
        if (scope.remainingTime < 1000) {
          $interval.cancel(promise);
          scope.present = !scope.present;
          scope.remainingTime = 0;
        } else {
          scope.remainingTime -= 1000;
        }
      }, 1000);
      scope.remainingTime = 3000;
    }
  };


  vm.addPerson = function(item, model){
    if(item.hasOwnProperty('isTag')) {
      delete item.isTag;
      vm.people.push(item);
    }
  }

					scope.onFocus = function(){
						scope.vcFocus(scope.field,scope.prevfield);	
						var previousObject = document.getElementById(scope.field.prevFieldId);
						if(previousObject != null){
							if(!previousObject.validity.valid){
								$timeout(function(){
									  $("#"+scope.field.prevFieldId).focus();
								 }, 300);		
							}	
						}
						
						
					}

					scope.ddlBlur = function(e){
						
 						scope.vcBlur(scope.accessor);
								 
						 if(scope.field!=undefined)
						 {
					//		 console.log("scope.field----------->"+JSON.stringify(scope.field));
							if(scope.field.validations != null){
								if(!(scope.field.validations.indexOf('Blank') === -1)){
									if(scope.accessor.selectedItem == null){
										e.preventDefault();
										$timeout.cancel();
										document.getElementById(scope.field.fieldId).setCustomValidity("Please select "+scope.field.fieldName);
										var previousObject = document.getElementById(scope.field.prevFieldId);
										toastr.error("Please select "+scope.field.fieldName);	
																									
									}		
									else{
										document.getElementById(scope.field.fieldId).setCustomValidity("");								
										}
									}
								 }
						 	}
						
						}
		
					scope.ddlChange = function(e){
		//			alert("C");
					  scope.localstorage(scope.accessor.selectedItem);
						scope.vcChange() ;
						
					//	console.log("scope.field.prevVal"+JSON.stringify(scope.field.prevVal));
						if(scope.field.prevVal != null){
							if(scope.field.prevValidation){
					//			console.log("prev value---->"+JSON.stringify(scope.accessor.selectedItem[attr.dblbl]));
								if(scope.field.prevVal !="0")
								{
								if(scope.field.prevVal != scope.accessor.selectedItem[attr.dblbl]){
									scope.field.prevInvalidate = "input mismatch"; 	
									scope.bg = "ddlborder";
									scope.bgtext = "red";
								}
								else{
									scope.field.prevInvalidate = ""; 		
									scope.bg = "ddlnoborder";
									scope.bgtext = "nored";
								}

								}
							}
						}

						
						
		  		}
	
	element.bind('keydown', function(e,window) {
 
        var code = e.keyCode || e.which;
		
		e.target.reportValidity();

		if(code === 81 && e.ctrlKey){
			//console.log($rootScope.snippetState);
			if($rootScope.snippetState){
				$rootScope.snippetState = false;
			}else{
				$rootScope.snippetState = true;	
			}
			
			$rootScope.$apply();
 
		}
		

		if(code === 9){
		if(scope.field!=undefined)
					 {

						if(scope.required){
							if(scope.accessor.selectedItem == null){
								e.preventDefault();
								$timeout.cancel();
								document.getElementById(scope.field.fieldId).setCustomValidity("Please select "+scope.field.fieldName);
								var previousObject = document.getElementById(scope.field.prevFieldId);
								toastr.error("Please select "+scope.field.fieldName);	
							}		
							else{
								document.getElementById(scope.field.fieldId).setCustomValidity("");								
							}
						}




						if(scope.field.validations != null){
						if(!(scope.field.validations.indexOf('Blank') === -1)){
							if(scope.accessor.selectedItem == null){
								e.preventDefault();
								$timeout.cancel();
								document.getElementById(scope.field.fieldId).setCustomValidity("Please select "+scope.field.fieldName);
								var previousObject = document.getElementById(scope.field.prevFieldId);
								toastr.error("Please select "+scope.field.fieldName);	
																							
							}		
							else{
								document.getElementById(scope.field.fieldId).setCustomValidity("");								
							}
						}
					 }
					 }
		//e.preventDefault();
			
		}
		 
		
		 
		
      });
	}
		
  };
  
 
});


