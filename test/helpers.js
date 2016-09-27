(function() {
    'use strict';

    // Cache var(s)
    var $compile;

    beforeEach(function() {
        // Dependencies for test(s)
        module('ui.combobox');

        // Inject necessary var(s)
        inject(function(_$compile_) {
            $compile = _$compile_;
        });
    });

    /**
     * Common helper methods for simplified code and reusability
     * throughout test(s).
     */
    window.helpers = {
        /**
         * Compile an angular template, digest, and return new DOM.
         *
         * @param {string} template Template to compiles
         * @param {object} scope Scope for the template
         * @return {HTLMElement} Compiled DOM element
         */
        compile: function(template, scope) {
            // Compile and digest
            var $el = $compile(angular.element(template))(scope);
            scope.$digest();

            return $el;
        }
    };
}());
