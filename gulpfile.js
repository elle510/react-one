'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require("vinyl-buffer");
var derequire = require('gulp-derequire');

var less = require('gulp-less');
var uglifycss = require('gulp-uglifycss');

var del = require('del');
var merge2 = require('merge2');
var runSequence = require('run-sequence');

var paths = {
    entries: [
        'src/**/*.js',
        '!src/i18n/*.js',
    ],
    dist: 'dist/pum/scripts',
    dist_css: 'dist/pum/styles',
    common_less: 'less/common/common.less',
    themes_less: 'less/themes/*.less',
    visualization_less: 'less/visualization/visualization.less',
    login_less: 'less/login/*.less',
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

/**
 * CSS
 */
gulp.task('clean.css', function() {
    return del(paths.dist_css + '/**/*');
});

gulp.task('build.css:less', ['clean.css'], function() {
    return merge2(
        gulp.src(paths.common_less)
            .pipe(less())
            .pipe(gulp.dest(paths.dist_css)),
        gulp.src(paths.themes_less)
            .pipe(less())
            .pipe(gulp.dest(paths.dist_css + '/themes')),
        gulp.src(paths.visualization_less)
            .pipe(less())
            .pipe(gulp.dest(paths.dist_css)),
        gulp.src(paths.login_less)
            .pipe(less())
            .pipe(gulp.dest(paths.dist_css + '/login'))
    );

});

gulp.task('build.css:min', function() {
    var rename = require('gulp-rename');

    return merge2(
        gulp.src(paths.dist_css + '/common.css')
            .pipe(uglifycss())
            .pipe(rename({extname: '.min.css'}))
            .pipe(gulp.dest(paths.dist_css)),
        gulp.src(paths.dist_css + '/themes/*.css')
            .pipe(uglifycss())
            .pipe(rename({extname: '.min.css'}))
            .pipe(gulp.dest(paths.dist_css + '/themes')),
        gulp.src(paths.dist_css + '/visualization.css')
            .pipe(uglifycss())
            .pipe(rename({extname: '.min.css'}))
            .pipe(gulp.dest(paths.dist_css)),
        gulp.src(paths.dist_css + '/login/*.css')
            .pipe(uglifycss())
            .pipe(rename({extname: '.min.css'}))
            .pipe(gulp.dest(paths.dist_css + '/login'))
    );
});

gulp.task('build.css', function(done) {
    runSequence('build.css:less', 'build.css:min', done);
});

gulp.task('default', ['build.js', 'build.css']);