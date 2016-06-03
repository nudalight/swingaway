'use strict';

const gulp = require('gulp');
const bs = require('browser-sync').create();
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const theJade = require('jade');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const inject = require('gulp-inject');
const insert = require('gulp-insert');
const uglify = require('gulp-uglify');
const debug = require('gulp-debug');
const order = require('gulp-order');


// use in the future gulp group
// what gulp-ignore/run-sequence/gulp-sequence is ?
// http://stackoverflow.com/questions/22824546/how-to-run-gulp-tasks-synchronously-one-after-the-other

let jadeDataPath = './production/jade/data/index.js'; 

gulp.task('serve', ['sass'], () => {
    bs.init({
        server: "./",
        port: 4000
    });
    gulp.watch("production/sass/**/*.sass", ['sass']);
    gulp.watch("production/jade/**/*.jade", ['jade:product']);
    gulp.watch("production/js/**.js", ['js']);
});


gulp.task('reload', () => {
   bs.reload();
});


gulp.task('js', () => {
    return gulp.src('./production/js/**/*.js')
        .pipe(order([
            '**/global/*.js',
            '**/constructor/*.js',
            '**/*.js'
        ]))
        .pipe(debug())
        .pipe(concat('output.js'))
        .pipe(insert.wrap('$(document).ready(function(){\n\n', '\n\n});'))
        .pipe(gulp.dest('distribution/js'))
        .pipe(bs.stream());
});


gulp.task('sass', () => {
    return gulp.src('./production/sass/*.sass')
        .pipe(debug())
        .pipe(concat('sassify.sass'))
        .pipe(sass())
        .pipe(rename('output.css'))
        .pipe(gulp.dest('distribution/css'))
        .pipe(bs.stream());
});


gulp.task('jade:home', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/carousel.jade',
        'production/**/banner-grid.jade',
        'production/**/video-wide.jade',
        'production/**/icon-grid.jade',
        'production/**/icon-list.jade',
        'production/**/footer.jade'
        ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('home.html'))
        .pipe(gulp.dest('distribution/html'))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});


gulp.task('jade:catalog', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/wide-banner.jade',

        'production/**/catalog-heading.jade',
        'production/**/sorter.jade',
        'production/**/product-grid.jade',
        'production/**/footer.jade'
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('catalog.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});


gulp.task('jade:product', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/product.jade',
        'production/**/upsell-grid.jade',
        'production/**/footer.jade'
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('product.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});


gulp.task('jade:compare', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/compare.jade',
        'production/**/footer.jade'
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('compare.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});


gulp.task('jade:cart-a', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/cart-a.jade',
        'production/**/footer.jade'
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('cart-a.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});



gulp.task('jade:cart-b', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/cart-b.jade',
        'production/**/footer.jade'
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('cart-b.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});



gulp.task('default', ['serve']);