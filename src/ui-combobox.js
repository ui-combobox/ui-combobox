(function() {
    'use strict';

    var combobox = angular.module('ui.combobox', []);

    /**
     * UI-Combox configuration object used to easily set the configuration
     * options once for your entire application.
     *
     * Note: All matching attribute properties will take predence over configuration.
     * This is accomplished via the explicit `foo === false` check(s) in the template(s).
     */
    combobox.constant('uiComboboxConfig', {
        /**
         * Open the dropdown on input focus. Defaults to false.
         */
        openOnFocus: false
    });

    combobox.directive('uiCombobox', [
        '$document',
        'uiComboboxConfig',
    function($document, uiComboboxConfig) {
        return {
            require: ['ngModel'],
            restrict: 'AE',
            templateUrl: 'src/ui-combobox.html',
            transclude: true,
            scope: {
                disabled: '=?ngDisabled',
                isOpen: '=?',
                model: '=ngModel',
                openOnFocus: '=',
                required: '=?ngRequired'
            },
            link: function(scope, $element, attrs, ctrls) {
                // Allow users to use native [disabled]
                if (angular.isDefined(attrs.disabled)) {
                    scope.disabled = true
                }

                // Allow users to use native [required]
                if (angular.isDefined(attrs.required)) {
                    scope.required = true;
                }

                // Assign necessary scope var(s)
                scope.uiComboboxConfig = uiComboboxConfig;

                var onDocumentClick = function($event) {
                    // Ignore click if closed
                    if (!scope.isOpen) { return; }

                    // todo add close logic
                };

                // Listen for document clicks
                $document.on('click', onDocumentClick);

                // Clean up
                scope.$on('$destroy', function() {
                    $document.off('click', onDocumentClick);
                });
            },
            controller: [
                '$scope',
                'uiComboboxConfig',
            function($scope, uiComboboxConfig) {
                $scope.close = function() {
                    $scope.isOpen = false;
                };

                $scope.open = function() {
                    $scope.isOpen = true;
                };

                $scope.toggle = function() {
                    $scope.isOpen = !$scope.isOpen;
                };
            }]
        };
    }]);

    combobox.directive('uiComboboxChoice', [function() {
        return {
            replace: true,
            require: '^uiCombobox',
            restrict: 'AE',
            templateUrl: 'src/ui-combobox-choice.html',
            transclude: true,
            link: function(scope, $element, attrs, ctrl) {

            }
        };
    }]);
}());
