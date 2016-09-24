(function() {
    'use strict';

    /**
     * Common helper methods for simplified code and reusability
     * throughout test(s).
     */
    window.helpers = {
        /**
         * Compile an angular template, digest, and return new DOM.
         *
         * @param {object} scope Scope for the template
         * @param {string} template Template to compiles
         * @return {HTLMElement} Compiled DOM
         */
        compileTemplate: function(scope, template) {
            // Compile and digest
            var el = $compile(angular.element(template))(scope);
            scope.$digest();

            return el;
        }
    };
}());
