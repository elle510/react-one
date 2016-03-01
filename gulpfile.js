'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require("vinyl-buffer");
var derequire = require('gulp-derequire');

var del = require('del');
var merge2 = require('merge2');

var paths = {
    entries: [
        'src/**/*.js',
        '!src/i18n/*.js',
    ],
    dist: 'dist/pum/scripts',
    demo: {

    }
};

gulp.task('clean.js', function() {
    return del([paths.dist + '/react-pum.js', paths.dist + '/react-pum.min.js']);
});

gulp.task('build.js', ['clean.js'], function () {
    return merge2(
                browserify({
                    entries: 'react-pum.js',
                    extensions: ['.js'],
                    standalone: 'ReactPum',
                    debug: true
                })
                    .transform(babelify, {presets: ["es2015", "react"]})
                    .bundle()
                    .pipe(source('react-pum.js'))
                    //.pipe(derequire())
                    .pipe(gulp.dest(paths.dist)),
                browserify({
                    entries: 'react-pum.js',
                    extensions: ['.js'],
                    standalone: 'ReactPum',
                    debug: true
                })
                    .transform(babelify, {presets: ["es2015", "react"]})
                    .bundle()
                    .pipe(source('react-pum.min.js'))
                    //.pipe(derequire())
                    .pipe(buffer())
                    .pipe(uglify())
                    .pipe(gulp.dest(paths.dist))
            );

});

gulp.task('watch', ['build.js'], function () {
    gulp.watch('*.js', ['build.js']);
});

// Rerun tasks whenever a file changes.
/*
gulp.task('watch', function() {
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.js, ['js']);
});

 gulp.task('default', ['watch', 'css', 'js']);
*/

gulp.task('default', ['build.js']);