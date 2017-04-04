/*bpoApps.directive('myCheckbox', function() {
    return {
        restrict : 'E',
        template : '<div class="my-checkbox" ng-class="{\'checked\': isChecked}" ng-click="toggle()"></div>',
        replace : true,
        require : 'ngModel',
        link : function(scope, element, attrs, model){
            
            model.$formatters.unshift(function(value){
                scope.isChecked = value == true;              
                return value;
            });
            
            scope.toggle = function(){
                scope.isChecked = !scope.isChecked;
                model.$setViewValue(scope.isChecked);
            }
        }
    };
});
*/
bpoApps.directive('box', [function(){
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
			name:'@',
			vcChange:'&'
        },
		link:function(scope,elem,attr){
			scope.accesskey = attr.accesskey;
		}, 
        template: '<label><input type="checkbox" data-ng-model="ngModel" name={{name}} accesskey={{accesskey}} ng-change="vcChange()"></input>&nbsp;{{name}}</label>',
        replace: true
    };
}])

