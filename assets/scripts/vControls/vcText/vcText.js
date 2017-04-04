

'use strict';

/*bpoApps.directive('focus', [function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attr) {
      elem.bind('keydown', function(e,window) {
        var code = e.keyCode || e.which;
		
		//alert(e.ctrlKey );
        
		if (code === 13 && !e.ctrlKey) {
		console.log("KEY PRESSEDDDD:"+e.keyCode);			
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
    }
  };
}]);
*/
 

bpoApps.directive('vcText', ['sessionService','$interval','APPCONSTANTS','$timeout','$rootScope',function(sessionService,$interval,APPCONSTANTS,$timeout,$rootScope) {
  return {
	  restrict: 'E',
      scope   : {
		 disabled: '=', 
		 accessor: '=',
		 field: '=',
         model: '=',		 
		 processfield: '=',		 
		 inputtype: '=',
		 vcChange:'&',
		 vcBlur: '&',
		 vcFocus: '&',
		 vcTabkeychange:'&',
      },
    templateUrl: 'assets//scripts//vControls//vcText//template.html',
	link: function(scope, elem, attr) {
		
		$('input,vc-text').bind('cut copy paste', function (e) {
    e.preventDefault(); //disable cut,copy,paste
});
   //alert("tabindex"+attr.tabindex);
 		scope.maxlength = attr.maxlength;
		scope.allowedChars = attr.allowedchars;
//		alert(attr.allowedchars);
 		scope.bg = "";
 
		scope.accessorid = attr.labelaccessor;
		scope.lblmodel = scope.model;
//    	scope.model = sessionService.get(scope.field.fieldId);

		scope.onFocus = function(field){
			console.log(">>1:"+JSON.stringify(scope.field));
			scope.vcFocus(field);	
			var previousObject = document.getElementById(scope.field.prevFieldId);
			console.log("previous object"+previousObject);
		
			if(previousObject != null){
			if(!previousObject.validity.valid){
				$timeout(function(){
					  $("#"+scope.field.prevFieldId).focus();
				 }, 300);		
			}
			}
			
		}
 
		scope.localstorage = function(obj){
			
			
		//alert("IN LOCAL STORAGE");	
			scope.vcBlur();
			sessionService.set(scope.field.fieldId,scope.model);
			if(!(scope.field.validations.indexOf('Blank') === -1)){
				if(scope.accessor == ""){
					document.getElementById(scope.field.fieldId).setCustomValidity("Please select "+scope.field.fieldName);
					var previousObject = document.getElementById(scope.field.prevFieldId);
					toastr.error("Please select "+scope.field.fieldName);
																					
				}		
				else{
					if(document.getElementById(scope.field.fieldId) != null){
						//console.log("Text field scope"+JSON.stringify(scope.field));
						document.getElementById(scope.field.fieldId).setCustomValidity("");								
					}
				}
			}

			
			
			
			if(scope.field.prevVal != null){
				if(scope.field.prevValidation){
					console.log("scope.field.prevVal"+JSON.stringify(scope.field.prevVal));
					if(scope.field.prevVal != "0"){
					if(scope.field.prevVal != scope.model){
						scope.field.prevInvalidate = "input mismatch"; 	
						scope.bg = "#F00";
					}
					else{
						scope.field.prevInvalidate = ""; 		
						scope.bg = "";
					}
				}
				}
			}
		}


				
				
			
      elem.bind('keydown', function(e,window) {
 
        var code = e.keyCode || e.which;
		
		e.target.reportValidity();
		          
		if(code === 81 && e.ctrlKey){
			console.log($rootScope.snippetState);
			if($rootScope.snippetState){
				$rootScope.snippetState = false;
			}else{
				$rootScope.snippetState = true;	
			}
			
			$rootScope.$apply();
 
		}
		
		
		if(code === 68 && e.ctrlKey){
			scope.vcChange();
		}

		if(code === 9){
			scope.vcTabkeychange();
			
			if(e.target.validity.valid==false)
			{
				e.preventDefault();
			}
						
			
		}
		 
		if(code == 9 || code == 13){
//alert(attr.tabindex);
			//console.log(scope.field.prevVal.length+":"+Number(scope.field.prevVal.length*0.8));
			if(scope.field.prevInvalidate != null){
				if(scope.field.prevVal.length > 0){	
					if(Number(scope.model.length) <= Number(scope.field.prevVal.length*0.8)){
						e.preventDefault();			
						e.target.setCustomValidity("Incomplete data entry compared to D1");
						e.target.reportValidity();
					}else{
						e.target.setCustomValidity("");
						e.target.reportValidity();	
					}		
				}
			}
		}
		 
		if (code === 13 && !e.ctrlKey ) {
 				
          e.preventDefault();
          try {
			  //alert("attr"+JSON.stringify(attr))
            if (attr.tabindex !== undefined) {
              var currentTabeIndex = attr.tabindex;
              var nextTabIndex = parseInt(currentTabeIndex) + 1;
			//alert(currentTabeIndex);
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
			
			
		

	},
	
  };
}]);


