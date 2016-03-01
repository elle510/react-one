'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var flatten = require('gulp-flatten');
var del = require('del');

var paths = {
    src: [
        'src/**/*.js',
        '!src/i18n/*.js',
    ],
    dist: 'dist/pum/scripts',
    demo: {

    }
};

var babelOpts = {
    presets: ['react', 'es2015']
    /*
    plugins: [

    ]
    */
};

gulp.task('clean.js', function() {
    return del([paths.dist + '/*.js']);
});

gulp.task('build.js', ['clean.js'], function() {
    return gulp
        .src(paths.src)
        .pipe(babel(babelOpts))
        .pipe(flatten())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['build.js']);