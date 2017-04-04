bpoApps.directive('vcRadio', function() {
   return {
      restrict: 'E',
      scope   : {
         model: '=',
         value: '@',
         label: '@',
		 name:'@',
		 checked:'@'
      },
      template:
         '<label class="vc-radio"' +
         ' ng-model="model">' +
         '<input type="radio" name="{{name}}"' +
         ' ng-model="model"' +
         ' ng-value="value"' +
         ' ng-checked="model==value" checked="{{checked}}" > {{label}}</label>'
   };
});