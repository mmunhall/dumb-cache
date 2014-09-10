/*global gulp:true, require:true */

var gulp = require('gulp'),
    browserify = require('gulp-browserify');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('scripts', function () {
    gulp.src('dumb-cache.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/js'));
});