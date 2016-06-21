'use strict';

const gulp = require('gulp');
const bs = require('browser-sync').create();
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const theJade = require('jade');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const insert = require('gulp-insert');
const uglify = require('gulp-uglify');
const debug = require('gulp-debug');
const order = require('gulp-order');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const cssmin = require('gulp-cssmin');


let jadeData = './production/jade/data/index.js';

/*
    warranty - validation
    contact-us - validation
 */

// bemto jade / bem-jade / bem-jade-legacy

// use in the future gulp group
// what gulp-ignore/run-sequence/gulp-sequence is ?
// http://stackoverflow.com/questions/22824546/how-to-run-gulp-tasks-synchronously-one-after-the-other



gulp.task('serve', ['sass'], () => {
    bs.init({ 
        server: "./",
        port: 4000
    });

    gulp.watch("production/sass/**/*.sass", ['sass']);
    gulp.watch("production/jade/**/*.jade", ['jade']);
    gulp.watch("production/js/**/*.js", ['js']);
});


gulp.task('reload', () => {
   bs.reload();
});


gulp.task('drop', ['sass', 'js', 'jade', 'img']);


gulp.task('js', () => {
    return gulp.src('./production/js/**/*.js')
        .pipe(order([
            '**/global/*.js',
            '**/*.js'
        ]))
        .pipe(debug())
        .pipe(concat('output.js'))
        .pipe(insert.wrap('$(document).ready(function(){\n\n', '\n\n});'))
        .pipe(gulp.dest('distribution/js'))
        .pipe(rename('output.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('distribution/js'))
        .pipe(bs.stream());
});


gulp.task('img', () => {
    return gulp.src('./production/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./distribution/img'))
});



gulp.task('sass', () => {
    return gulp.src('./production/sass/**/*.sass')
        .pipe(order([
            '**/variable/*.sass',
            '**/mixin/*.sass',
            '**/override/*.sass',
            '**/block/*.sass',
            '**/*.sass'
        ]))
        .pipe(debug())
        .pipe(concat('sassify.sass'))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename('output.css'))
        .pipe(gulp.dest('distribution/css'))
        .pipe(rename('output.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('distribution/css'))
        .pipe(bs.stream());
});


gulp.task('jade', () => {
    return gulp.src([
        'production/jade/pages/*.jade'
    ])
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeData)
        }))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});


gulp.task('vendor', () => {

});


gulp.task('default', ['serve']);