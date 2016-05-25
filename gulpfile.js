'use strict';

const gulp = require('gulp');
const bs = require('browser-sync').create();
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const inject = require('gulp-inject');
const data = require('gulp-data');
const fs = require('fs');

// use in the future gulp group
// what gulp-ignore/run-sequence/gulp-sequence is ?
// http://stackoverflow.com/questions/22824546/how-to-run-gulp-tasks-synchronously-one-after-the-other

gulp.task('serve', ['sass'], () => {
    bs.init({
        server: "./"
    });
    gulp.watch("prod/sass/*.sass", ['sass']);
    gulp.watch("prod/jade/*.jade", ['jade:home']);
});


gulp.task('reload', () => {
   bs.reload();
});


gulp.task('sass', () => {
    return gulp.src('./prod/sass/*.sass')
        .pipe(concat('sassify.sass'))
        .pipe(sass())
        .pipe(rename('output.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(bs.stream());
});


gulp.task('jade:home', () => {
    return gulp.src([
        'prod/**/head.jade',
        'prod/**/header.jade',
        'prod/**/carousel/tpl',
        'prod/**/banner-grid.jade',
        'prod/**/video-wide.jade',
        'prod/**/icon-grid.jade',
        'prod/**/icon-list.jade',
        'prod/**/footer.jade'
        ])
        .pipe(concat('jadify.jade'))
        // .pipe(data( (file) => {
        //     return require('./prod/data/tpl/test.json');
        // }))
        .pipe(jade({
            pretty: true,
            data: {
                var1: 111,
                var2: 222
            }
        }))
        .pipe(rename('home.html'))
        .pipe(gulp.dest('dist/html'))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});


gulp.task('default', ['serve']);