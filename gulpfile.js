/*global gulp:true, require:true */

var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    mocha = require('gulp-mocha'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    version = require('./package.json').version;

gulp.task('default', ['test', 'build']);

gulp.task('test', function () {
    "use strict";

    return gulp.src('test/test.js', {read: false})
        .pipe(mocha({
            ui: 'bdd',
            reporter: 'spec'
        }));
});

gulp.task('clean', function () {
    "use strict";

    gulp.src('build/*', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('build', function () {
    "use strict";

    // For Node.js
    gulp.src('src/dumb-cache.js')
        .pipe(rename('dumb-cache-node-' + version + '.js'))
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
        .pipe(rename('dumb-cache-browser-' + version + '.js'))
        .pipe(gulp.dest('./build/'));
});