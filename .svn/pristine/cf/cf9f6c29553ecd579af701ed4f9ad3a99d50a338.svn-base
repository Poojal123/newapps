'use strict';


bpoApps.directive('vcMasked', function dateInput($filter, $parse,sessionService ){

	return {
    	restrict: 'E',
		scope   : {
		 disabled: '=', 
         model: '=',
         value: '@',
         label: '@',
		 name:'@',
		 field: '=',		 
		 accessor: '=',
		 vcChange:'&',
		 vcFocus: '&',
		 vcBlur:'&'
      },
	    templateUrl: 'assets//scripts//vControls//vcMaskedDate//template.html',
      	link: function(scope, elem, attr) {


		scope.accessorid = attr.labelaccessor;
		scope.lblmodel = scope.model;
    	scope.model = sessionService.get(scope.field.fieldId);

		$scope.keydownevt = function(){
//		var code = e.keyCode || e.which;

	console.log("test");	
		}

      	elem.bind('keydown', function(e,window) {
 
        var code = e.keyCode || e.which;

	console.log(code);

		if(code === 13 && e.ctrlKey){
			scope.vcChange();
		}
		
		if (code === 13 && !e.ctrlKey ) {
 
		console.log((e.$invalid));			
          e.preventDefault();
          try {
            if (attr.tabindex !== undefined) {
              var currentTabeIndex = attr.tabindex;
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
		
		
		
		var dateFilter = $filter("date");
		var today = new Date();
		var date = {};
        	
		function isValidMonth(month) {
			return month >= 0 && month < 12;
		}
	
		function isValidDay(day) {
			return day > 0 && day < 32;
		}	

		function isValidYear(year) {
			return year > (today.getFullYear() - 115) && year < (today.getFullYear() + 115);
		}

		function isValidDate(inputDate) {
			inputDate = new Date(formatDate(inputDate));
			if (!angular.isDate(inputDate)) {
				return false;
			}
		  
			date.month = inputDate.getMonth();
			date.day = inputDate.getDate();
			date.year = inputDate.getFullYear();
		  
			return (isValidMonth(date.month) && isValidDay(date.day) && isValidYear(date.year));
		}

		function formatDate(newDate) {
		var modelDate = $parse(attr.ngModel);
		newDate = dateFilter(newDate, "MM/dd/yyyy");
		modelDate.assign(scope, newDate);
		return newDate;
	   }

		scope.onFocus = function(field){
			scope.vcFocus(field);	
		}

       controller.$validators.date = function(modelValue) {
       		return angular.isDefined(modelValue) && isValidDate(modelValue);
       };

		  var pattern = "^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])(19|20)\\d\\d$" +
						"|^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])(19|20)\\d$" +
						"|^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])(19|20)$" +
						"|^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])[12]$" +
						"|^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])$" +
						"|^(0[1-9]|[12][0-9]|3[01])([0-3])$" +
						"|^(0[1-9]|[12][0-9]|3[01])$" +
						"|^[0123]$";
        
		var regexp = new RegExp(pattern);

	   	scope.limitToValidDate = function(event) {

   		var key = event.charCode ? event.charCode : event.keyCode;
         
			console.log("TEST:"+key);
		 
		if ((key >= 48 && key <= 57) || key === 9 || key === 46) {
        	var character = String.fromCharCode(event.which);
            var start = element[0].selectionStart;
            var end = element[0].selectionEnd;
            var testValue = (element.val().slice(0, start) + character + element.val().slice(end)).replace(/\s|\//g, "");
            if (!(regexp.test(testValue))) {
              event.preventDefault();
            }

         }
       }

		
 
      }
    }
  }
);

