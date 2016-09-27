(function() {
    'use strict';

    // Cache var(s)
    var $el;
    var $scope;

    describe('ui-combobox-option', function() {
        beforeEach(function() {
            // Inject necessary var(s)
            inject(function(_$rootScope_) {
                $scope = _$rootScope_.$new();
                $scope.foobars = ['A', 'B', 'C'];

                $el = helpers.compile('<ui-combobox ng-model=model>\
                    <ui-combobox-option ng-repeat="foobar in foobars">\
                        <span ng-bind="foobar"></span>\
                    </ui-combobox-option>\
                </ui-combobox>', $scope);
            });
        });

        it('errors when compiling without ng-repeat attribute', function() {
            var wrapped = function() {
                // Compile template
                helpers.compile('<ui-combobox ng-model="model">\
                    <ui-combobox-option></ui-combobox-option>\
                </ui-combobox>', $scope);
            };

            expect(wrapped).to.throw(Error);
        });

        it('reflects correct dom', function() {
            // Grab the li
            var $li = $el.find('li');

            // Run a couple tests
            expect($li).to.have.length(3);
            expect($li.eq(0).find('span').text()).to.equal('A');
            expect($li.eq(1).find('span').text()).to.equal('B');
            expect($li.eq(2).find('span').text()).to.equal('C');
        });

        it('reflects correct dom after scope changes', function() {
            // Remove the second item
            $scope.foobars.splice(1, 1);
            $scope.$digest();

            // Grab the li
            var $li = $el.find('li');

            // Run a couple tests
            expect($li).to.have.length(2);
            expect($li.eq(0).find('span').text()).to.equal('A');
            expect($li.eq(1).find('span').text()).to.equal('C');
        });
    });
}());
