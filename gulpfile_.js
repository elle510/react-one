'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require("vinyl-buffer");
var reactify = require('reactify');

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
                    .transform(reactify)
                    .bundle()
                    .pipe(source('react-pum.js'))
                    .pipe(gulp.dest(paths.dist)),
                browserify({
                    entries: 'react-pum.js',
                    extensions: ['.js'],
                    standalone: 'ReactPum',
                    debug: true
                })
                    .transform(reactify, {"es6": true})
                    .bundle()
                    .pipe(source('react-pum.min.js'))
                    .pipe(buffer())
                    .pipe(uglify())
                    .pipe(gulp.dest(paths.dist))
            );

});

gulp.task('default', ['build.js']);