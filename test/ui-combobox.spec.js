(function() {
    'use strict';

    // Cache var(s)
    var $scope;

    describe('ui-combobox', function() {
        beforeEach(function() {
            // Inject necessary var(s)
            inject(function(_$rootScope_) {
                $scope = _$rootScope_.$new();
            });
        });

        it('errors when compiling without ng-model attribute', function() {
            var wrapped = function() {
                // Compile template
                helpers.compile('<ui-combobox></ui-combobox>', $scope);
            };

            expect(wrapped).to.throw(Error);
        });

        it('reflects correct dom', function() {
            // Compile template
            var $el = helpers.compile('<ui-combobox ng-model="model"></ui-combobox>', $scope);

            expect($el).to.have.length(1);
        });
    });
}());
