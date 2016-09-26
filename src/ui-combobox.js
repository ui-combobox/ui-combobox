(function() {
    'use strict';

    // UI-Combobox module
    var combobox = angular.module('ui.combobox', []);

    /**
     * UI-Combox configuration object used to easily set the configuration
     * options for entire application.
     *
     * Note: All matching attribute properties will take predence over configuration.
     * This is accomplished via the explicit check(s) in the template(s).
     */
    combobox.constant('uiComboboxConfig', {
        /**
         * Appends the dropdown to the body in order to fix overflow issues. Defaults to `false`.
         *
         * todo Implement this correctly (currently does nothing).
         */
        appendToBody: false,

        /**
         * Close the dropdown upon selection. Defaults to `true`.
         *
         * todo Implement this correctly (currently does nothing).
         */
        closeOnSelect: true,

        /**
         * The position the dropdown will be rendered when opened.
         * Accepted values are `'top'`, `'bottom'`, and `'auto'`. Defaults to `'auto'`.
         *
         * todo Implement this correctly (currently does nothing).
         */
        dropdownPosition: 'auto',

        /**
         * Force a matching selection to be made. This is to be used when
         * manually entry is not accepted. Defaults to `false`.
         *
         * todo Implement this correctly (currently does nothing).
         */
        forceSelection: false,

        /**
         * Open the dropdown on input focus. Defaults to `false`.
         */
        openOnFocus: false
    });

    combobox.directive('uiCombobox', [
        '$document',
        'uiComboboxConfig',
    function($document, uiComboboxConfig) {
        return {
            require: 'ngModel',
            restrict: 'AE',
            templateUrl: 'ui-combobox.html',
            transclude: true,
            scope: {
                disabled: '=?ngDisabled',
                forceSelection: '=',
                isOpen: '=?',
                model: '=ngModel',
                openOnFocus: '=',
                placeholder: '@',
                required: '=?ngRequired'
            },
            link: function(scope, $element, attrs, ngModelCtrl) {
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

                // Configure element properly
                $element.addClass('ui-combobox');

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
            templateUrl: 'ui-combobox-choice.html',
            transclude: true,
            link: function(scope, $element, attrs, uiComboboxCtrl) {
                // todo implmenet correct link logic
            }
        };
    }]);
}());
