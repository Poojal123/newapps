

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
      elem.bind('keydown', function(e,window) {
        var code = e.keyCode || e.which;
		
		//alert(e.ctrlKey );
        
		if (code === 13 && !e.ctrlKey) {
		//console.log("KEY PRESSEDDDD:"+e.keyCode);			
          e.preventDefault();
          try {
            if (attrs.tabindex !== undefined) {
              var currentTabeIndex = attrs.tabindex;
              var nextTabIndex = parseInt(currentTabeIndex) + 1;
              var elems = document.querySelectorAll("[tabindex]");
              for (var i = 0, len = elems.length; i < len; i++) {
                var el = angular.element(elems[i]);
                var idx = parseInt(el.attr('tabindex'));
                if (idx === nextTabIndex) {
                  elems[i].focus();
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

 

bpoApps.directive('vcDdl', function($timeout,WEB_API,$http,CORE_CONFIG,$parse) {
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
		 vcChange:'&'
      },
    templateUrl: 'assets//scripts//vControls//vcDDL//template.html',
	link: function(scope, element, attr) {
 
	scope.currentRecords = 0; //(scope.$parent[attr.labeldatalist].length == null)?0:scope.$parent[attr.labeldatalist].length;
//	console.log("TOTAL EXI:"+scope.currentRecords);	
		
	scope.ddlplaceholder = "Select";	
 
	if(attr.placeholder != null){
 
		scope.ddlplaceholder = attr.placeholder;
	}
		
	scope.$on("getDDLData", function (event, args) {
 
		if(args.model == attr.labelaccessor){
			attr.whr = args.whr;
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
			
//		alert(scope.currentRecords);
//			if(scope.currentRecords == 0 || reloadFromServer == true)
			if(1==1)
			{
				var url = CORE_CONFIG.WEB_SERVICE+WEB_API.GETDDL+"/"+attr.tbl+"/"+attr.dbval+"/"+attr.dblbl+"/"+attr.whr+"/"+attr.sql;
	
				$http.get(url).then(function successCallback(response) {
							vm.people = response.data.result;			
							 
//							 scope.datalist = vm.people;
							angular.forEach(scope.datalist, function(value, key) {
								value.dbcol = attr.dbval;
								value.dbval = value[attr.dbval];
								 
							});
							angular.forEach(scope.accessor, function(value, key) {
								value.metainfo = scope.field.metainfo;
								 
							});
							//console.log(JSON.stringify(vm.people));
		//				alert("Loaded"+JSON.stringify(vm.people)+attr.labeldatalist+":"+attr.labelaccessor+":"+attr.dbval); 
							scope.$parent.getAllItems(vm.people, attr.labeldatalist, attr.labelaccessor, attr.dbval);
 							
							
				  }, function errorCallback(response) {
				
				  });
			}
			else{
				alert("Loaded"+JSON.stringify(scope.$parent[attr.labeldatalist])+attr.labeldatalist+":"+attr.labelaccessor+":"+attr.dbval);
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


		},
	
  };
});


