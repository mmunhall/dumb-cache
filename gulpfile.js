/*global gulp:true, require:true */

var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    mocha = require('gulp-mocha'),
    rename = require('gulp-rename');

gulp.task('default', function () {
    "use strict";

    // place code for your default task here
});

gulp.task('test', function () {
    "use strict";

    return gulp.src('test/test.js', {read: false})
        .pipe(mocha({
            ui: 'bdd',
            reporter: 'spec'
        }));
});

gulp.task('build', function () {
    "use strict";

    // For Node.js
    gulp.src('src/dumb-cache.js')
        .pipe(rename('dumb-cache-node.js'))
        .pipe(gulp.dest('./build/'));

    // For the browser
    gulp.src('src/dumb-cache.js')
        .pipe(browserify({

            insertGlobals : false,
            debug : false
        })).
        on('prebundle', function (bundle) {
            bundle.external('lodash');
        })
        .pipe(rename('dumb-cache-browser.js'))
        .pipe(gulp.dest('./build/'));
});