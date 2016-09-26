(function() {
    'use strict';

    // Lib(s)
    var concat = require('gulp-concat');
    var cssnano = require('gulp-cssnano');
    var del = require('del');
    var eslint = require('gulp-eslint');
    var gulp = require('gulp');
    var htmlmin = require('gulp-htmlmin');
    var merge = require('merge-stream');
    var rename = require("gulp-rename");
    var runSequence = require('run-sequence');
    var Server = new require('karma').Server;
    var sourcemaps = require('gulp-sourcemaps');
    var templateCache = require('gulp-angular-templatecache');
    var uglify = require('gulp-uglify');

    // Build everything
    gulp.task('build', function() {
        runSequence('build:css', 'build:js');
    });

    // Build css scripts
    gulp.task('build:css', function() {
        // Since currently writing plain css, simply copy
        return gulp.src('src/ui-combobox.css')
            .pipe(gulp.dest('build'));
    });

    // Build src scripts
    gulp.task('build:js', function() {
        // Select proper scripts
        var scripts = gulp.src('src/ui-combobox.js');

        // Select proper templates, minify,
        // and turn into angular template cache js
        var templates = gulp.src('src/*.html')
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            .pipe(templateCache({
                module: 'ui.combobox'
            }));

        // Merge into single js file
        return merge(scripts, templates)
            .pipe(concat('ui-combobox.js'))
            .pipe(gulp.dest('build'));
    });

    // Clean everything
    gulp.task('clean', function() {
        runSequence('clean:build', 'clean:dist');
    });

    // Clean build directory
    gulp.task('clean:build', function() {
        return del(['build/**/*']);
    });

    // Clean dist directory
    gulp.task('clean:dist', function() {
        return del(['dist/**/*']);
    });

    // Copy build to dist
    gulp.task('copy:build', function() {
        return gulp.src('build/*')
            .pipe(gulp.dest('dist'));
    });

    // Copy hook(s)
    gulp.task('copy:hooks', function() {
        // Move hooks into .git
        return gulp.src('hooks/*')
            .pipe(gulp.dest('.git/hooks'));
    });

    // Deploy file(s) to dist directory
    gulp.task('deploy', function() {
        // Race conditions require calling each task individually
        runSequence('clean:build', 'clean:dist', 'build:css', 'build:js', 'compress:css', 'compress:js', 'copy:build');
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

    // Compress everything
    gulp.task('compress', function() {
        runSequence('compress:css', 'compress:js');
    });

    // Compress css file(s) and move to dist directory
    gulp.task('compress:css', function() {
        return gulp.src('build/ui-combobox.css')
            .pipe(sourcemaps.init())
            .pipe(cssnano())
            .pipe(rename({
                extname: '.min.css'
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('build'));
    });

    // Compress js file(s) and move to dist directory
    gulp.task('compress:js', function() {
        return gulp.src('build/ui-combobox.js')
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(rename({
                extname: '.min.js'
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('build'));
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

    // Watch src files
    gulp.task('watch', function() {
        gulp.watch(['src/ui-combobox.css'], ['build:css']);
        gulp.watch(['src/ui-combobox.js'], ['build:js']);
    });

    // Default gulp task
    gulp.task('default', ['lint', 'test']);
})();
