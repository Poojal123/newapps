bpoApps.directive('dynamicModel', ['$compile', '$parse', function ($compile, $parse) {
    return {
        restrict: 'A',
        terminal: true,
        priority: 100000,
        link: function (scope, elem) {
            var name = $parse(elem.attr('dynamic-model'))(scope);
            elem.removeAttr('dynamic-model');
            elem.attr('ng-model', name);
            $compile(elem)(scope);
        }
    };
}]);

bpoApps.directive('ngBindModel',function($compile){
    return{
        compile:function(tEl,tAtr){
          tEl[0].removeAttribute('ng-bind-model')
            return function(scope){
              tEl[0].setAttribute('ng-model',scope.$eval(tAtr.ngBindModel))
              $compile(tEl[0])(scope)
                console.info('new compiled element:',tEl[0])
            }
        }
    }
})
