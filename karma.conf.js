(function() {
    'use strict';

    module.exports = function(config) {
        config.set({
            files: [
                'node_modules/angular/angular.js',
                'node_modules/angular-mocks/angular-mocks.js',
                'build/ui-combobox.js',
                'test/helpers.js',
                'test/**/*.spec.js'
            ],
            browsers: ['PhantomJS'],
            frameworks: ['chai', 'mocha', 'sinon-chai'],
            reporters: ['mocha'],
            autoWatch: false,
            singleRun: true
        });
    };
}());
