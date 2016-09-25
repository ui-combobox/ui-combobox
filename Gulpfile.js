(function() {
    'use strict';

    // Lib(s)
    var cssnano = require('gulp-cssnano');
    var del = require('del');
    var eslint = require('gulp-eslint');
    var gulp = require('gulp');
    var rename = require("gulp-rename");
    var runSequence = require('run-sequence');
    var Server = new require('karma').Server;
    var sourcemaps = require('gulp-sourcemaps');
    var uglify = require('gulp-uglify');

    // Clean dist directory
    gulp.task('clean:dist', function() {
        return del(['dist/**/*']);
    });

    // Copy hook(s)
    gulp.task('copy:hooks', function() {
        // Move hooks into .git
        return gulp.src('hooks/*')
            .pipe(gulp.dest('.git/hooks'));
    });

    // Copy necessary src file(s) to dist
    gulp.task('copy:src', function() {
        // Move src into .git
        return gulp.src('src/*.{css,js}')
            .pipe(gulp.dest('dist'));
    });

    // Deploy file(s) to dist directory
    gulp.task('deploy', function() {
        runSequence('clean:dist', ['copy:src', 'compress:css', 'compress:js']);
    });

    // Lint file(s)
    gulp.task('lint', function() {
        // Lint with eslint for test and src file(s)
        return gulp.src(['test/**/*.js', 'src/*.js'])
            .pipe(eslint({
                configFile: __dirname + '/.eslintrc'
            }))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    });

    // Compress css file(s) and move to dist directory
    gulp.task('compress:css', function() {
        return gulp.src('src/*.css')
            .pipe(sourcemaps.init())
            .pipe(cssnano())
            .pipe(rename({
                extname: '.min.css'
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist'));
    });

    // Compress js file(s) and move to dist directory
    gulp.task('compress:js', function() {
        return gulp.src('src/*.js')
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(rename({
                extname: '.min.js'
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist'));
    });

    // One time project setup
    gulp.task('setup', ['copy:hooks']);

    // Run test(s)
    gulp.task('test', function(done) {
        // Start a new server
        new Server({
            configFile: __dirname + '/karma.conf.js'
        }, done).start();
    });
})();
