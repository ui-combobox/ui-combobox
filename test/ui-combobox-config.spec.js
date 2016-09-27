(function() {
    'use strict';

    // Cache var(s)
    var uiComboboxConfig;

    describe('uiComboboxConfig', function() {
        beforeEach(function() {
            // Inject necessary var(s)
            inject(function(_uiComboboxConfig_) {
                uiComboboxConfig = _uiComboboxConfig_;
            });
        });

        describe('appendToBody', function() {
            it('exists', function() {
                expect(uiComboboxConfig.appendToBody).to.not.be.undefined;
            });

            it('defaults to `false`', function() {
                expect(uiComboboxConfig.appendToBody).to.be.false;
            });
        });

        describe('closeOnSelect', function() {
            it('exists', function() {
                expect(uiComboboxConfig.closeOnSelect).to.not.be.undefined;
            });

            it('defaults to `false`', function() {
                expect(uiComboboxConfig.closeOnSelect).to.be.true;
            });
        });

        describe('dropdownPosition', function() {
            it('exists', function() {
                expect(uiComboboxConfig.dropdownPosition).to.not.be.undefined;
            });

            it('defaults to `\'auto\'`', function() {
                expect(uiComboboxConfig.dropdownPosition).to.equal('auto');
            });
        });

        describe('forceSelection', function() {
            it('exists', function() {
                expect(uiComboboxConfig.forceSelection).to.not.be.undefined;
            });

            it('defaults to `false`', function() {
                expect(uiComboboxConfig.forceSelection).to.be.false;
            });
        });

        describe('openOnFocus', function() {
            it('exists', function() {
                expect(uiComboboxConfig.openOnFocus).to.not.be.undefined;
            });

            it('defaults to `false`', function() {
                expect(uiComboboxConfig.openOnFocus).to.be.false;
            });
        });
    });
}());
