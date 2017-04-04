bpoApps.directive('myCheckbox', function() {
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
