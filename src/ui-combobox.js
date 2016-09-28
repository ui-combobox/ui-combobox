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
            require: ['uiCombobox', 'ngModel'],
            restrict: 'AE',
            templateUrl: 'ui-combobox.html',
            transclude: true,
            scope: {
                closeOnSelect: '=',
                disabled: '=?ngDisabled',
                forceSelection: '=',
                isOpen: '=?',
                model: '=ngModel',
                openOnFocus: '=',
                placeholder: '@',
                required: '=?ngRequired'
            },
            link: function(scope, $element, attrs, ctrls) {
                // Grab the ctrls for easy reference
                var uiComboboxCtrl = ctrls[0];
                uiComboboxCtrl.ngModelCtrl = ctrls[1];

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
                var uiComboboxCtrl = this;

                uiComboboxCtrl.select = function(option) {
                    // Update the model
                    $scope.model = option;

                    // Force touch
                    uiComboboxCtrl.ngModelCtrl.$setTouched();

                    // Close the dropdown if asked too on selection
                    if ($scope.closeOnSelect === true || $scope.closeOnSelect !== false && uiComboboxConfig.closeOnSelect) {
                        $scope.close();
                    }
                };

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

    combobox.directive('uiComboboxOption', function() {
        // Note: Taken straight from Angular, these regex are used to parse ng-repeat
        // to obtain the data pointers ourselves.
        var NG_REPEAT_REGEX = /^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/;
        var KEY_VALUE_REGEX = /^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/;

        return {
            replace: true,
            require: '^uiCombobox',
            restrict: 'AE',
            templateUrl: 'ui-combobox-option.html',
            transclude: true,
            link: function(scope, $element, attrs, uiComboboxCtrl) {
                // For data sharing, ng-repeat is required in this design
                if (!angular.isDefined(attrs.ngRepeat)) {
                    throw Error('ui-combobox-option requires the use of [ng-repeat]!');
                }

                // Parse ng-repeat to obtain correct data pointer(s)
                // Note: Any errors with the repeat attribute will be caught via Angular already,
                // so there is no need for added validation/error checking
                var match = attrs.ngRepeat.match(NG_REPEAT_REGEX);
                var lhs = match[1].match(KEY_VALUE_REGEX);

                // Grab the correct identifier
                var identifier = lhs[3] || lhs[1];

                // Select this option
                scope.select = function(option) {
                    // Call to ui-combobox ctrl with selected option
                    uiComboboxCtrl.select(option[identifier]);
                };

                // Since we can't have an isolate scope, watch for disabled changes
                scope.$watch(attrs.ngDisabled, function(val) {
                    // Update our scope pointer (allow users to use native [disabled])
                    scope.disabled = angular.isDefined(attrs.disabled) || val;
                });
            }
        };
    });
}());
