/*global gulp:true, require:true */

var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    mocha = require('gulp-mocha');

gulp.task('default', function () {
    "use strict";

    // place code for your default task here
});

gulp.task('test', function () {
    "use strict";

    return gulp.src('test/test.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('browserify', function () {
    "use strict";

    gulp.src('dumb-cache.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build'));
});