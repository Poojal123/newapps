/*bpoApps.directive('myDatepicker', function() {
  return {
      restrict: 'A',
      scope: {
          model: "=",
          format: "@",
          options: "=datepickerOptions",
          myid: "@"
      },
      template: 'vcCalendar.html',
      link: function(scope, element) {
          scope.popupOpen = false;
          scope.openPopup = function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              scope.popupOpen = true;
          };
          
          scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            scope.opened = true;
          };

      }
  };
});*/
bpoApps.directive('format', function (dateFilter) {
  return {
    require:'^ngModel',
    restrict:'A',
    link:function (scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        viewValue.toString = function() {
          return dateFilter(this, attrs.dateFormat);
        };
        return viewValue;
      });
    }
  };
});
bpoApps.directive('myDatepicker', function($compile) {
  var controllerName = 'dateEditCtrl';
  return {
      restrict: 'A',
      require: '?ngModel',
      scope: true,
      link: function(scope, element) {
          var wrapper = angular.element(
              '<div class="input-group">' +
                '<span class="input-group-btn">' +
                  '<button type="button" class="btn btn-default" ng-click="' + controllerName + '.openPopup($event)"><i class="glyphicon glyphicon-calendar"></i></button>' +
                '</span>' +
              '</div>');

          function setAttributeIfNotExists(name, value) {
              var oldValue = element.attr(name);
              if (!angular.isDefined(oldValue) || oldValue === false) {
                  element.attr(name, value);
              }
          }
          setAttributeIfNotExists('type', 'text');
          setAttributeIfNotExists('is-open', controllerName + '.popupOpen');
          setAttributeIfNotExists('datepicker-popup', 'dd.MM.yyyy');
          element.addClass('form-control');
          element.removeAttr('my-datepicker');

          element.after(wrapper);
          wrapper.prepend(element);
          $compile(wrapper)(scope);

          scope.$on('$destroy', function () {
              wrapper.after(element);
              wrapper.remove();
          });
      },
      controller: function() {
          this.popupOpen = false;
          this.openPopup = function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              this.popupOpen = true;
          };
      },
      controllerAs: controllerName
  };
});