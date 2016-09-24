(function() {
    'use strict';

    // Cache var(s)
    var $compile;
    var $rootScope;

    describe('ng-model', function() {
        beforeEach(function() {
            // Dependencies for test(s)
            module('templates', 'ui.combobox');

            // Inject necessary var(s)
            inject(function(_$compile_, _$rootScope_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
            });
        });

        it('errors when compiling without ng-model attribute', function() {
            var wrapped = function() {
                // Create scope
                var $scope = $rootScope.$new();

                // Compile and digest
                $compile(angular.element('<ui-combobox></ui-combobox>'))($scope);
                $scope.$digest();
            };

            expect(wrapped).to.throw(Error);
        });

        it('compiles with ng-model attribute', function() {
            // Create scope
            var $scope = $rootScope.$new();
            $scope.model = {};

            // Compile and digest
            var $el = $compile(angular.element('<ui-combobox ng-model="model"></ui-combobox>'))($scope);
            $scope.$digest();

            expect($el).to.have.length(1);
        });
    });
}());
