

'use strict';



/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs an AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform an OR.
 */

bpoApps.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);
        
      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});


bpoApps.directive('focus', [function() {
  return {
	  
    restrict: 'A',
    link: function(scope, elem, attrs) {
    // alert(attrs.tabindex);
	  elem.bind('keydown', function(e,window) {
        var code = e.keyCode || e.which;

        
		if (code === 13 && !e.ctrlKey) {

          e.preventDefault();
		  if(e.target.validity.valid == false){	
				//				alert(e.target.validationMessage);	
//				        e.target.setCustomValidity("' is not a Valid Email Address.");  
//						e.target.reportValidity();
				
			} 
          try {
            if (attrs.tabindex !== undefined) {
              var currentTabeIndex = attrs.tabindex;
              var nextTabIndex = parseInt(currentTabeIndex) + 1;
			  
              var elems = document.querySelectorAll("[tabindex]");
              for (var i = 0, len = elems.length; i < len; i++) {
                var el = angular.element(elems[i]);
                var idx = parseInt(el.attr('tabindex'));
                if (idx === nextTabIndex) {
					if(e.target.validity.valid == true){	
                   		elems[i].focus();
					}
                  break;
                }
              }
            }
			
          } catch (e) {
            console.log('Focus error: ' + e);
          }
        }
      });
    }
  };
}]);

 

bpoApps.directive('vcDdl', function($timeout,WEB_API,$http,CORE_CONFIG,sessionService,$parse) {
  return {
	  restrict: 'E',
      scope   : {
         model: '=',
         value: '@',
         label: '@',
		 name:'@',
		 field: '=',		 
		 accessor: '=',
		 datalist: '&',
		 vcChange:'&',
 		 processfield: '=',
		},
    templateUrl: 'assets//scripts//vControls//vcDDL//template.html',
	link: function(scope, element, attr) {
 
 //    	scope.model = sessionService.get(scope.field.fieldId);
//		alert(scope.field.fieldId+":"+JSON.stringify(scope.model));

scope.id = attr.id;

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
 	//alert("broadcast called");
	
		if(args.model == attr.labelaccessor){
			//alert(args.sql+":"+args.whr);
			if(args.whr != null){
			attr.sql = attr.sql+args.whr;
				
			}
			else{
			attr.sql = args.sql;	
			}
			//alert(attr.sql);
			scope.getData(true);

		}
	});
		
		
  var vm = scope;

  vm.disabled = undefined;
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


		
				scope.ddlChange = function(e){
					  scope.localstorage(scope.accessor.selectedItem);
						scope.vcChange() ;
						
						if(scope.field != null){
							if(scope.field.prevVal != null){
								if(scope.field.prevValidation){
	//								alert(JSON.stringify(scope.accessor.selectedItem[attr.dbval]));
									if(scope.field.prevVal != scope.accessor.selectedItem[attr.dbval]){
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

		}
		
  };
  
  
  
  
});


