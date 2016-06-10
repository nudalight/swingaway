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
const imagemin = require('gulp-imagemin');
// const styl = require('gulp-stylus');

/*
- home +
- product
- compare +
- cart-a +
- cart-b +
- catalog
- wishlist


*/





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
    gulp.watch("production/jade/**/*.jade", [
        'jade:compare',
        'jade:home',
        'jade:cart-a',
        'jade:cart-b',
        'jade:cart-c',
        'jade:cart-d',
        'jade:wishlist',
        'jade:catalog',
        'jade:product',
        'jade:partners',
        'jade:contact-us',
        'jade:manuals',
        'jade:videos',
        'jade:warranty',
        'jade:dealers',
        'jade:about-us'
    ]);
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
        .pipe(rename('output.min.js'))
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
            '**/global/*.sass',
            '**/override/*.sass',
            '**/*.sass'
        ]))
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
        'production/**/catalog-description.jade',
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


gulp.task('jade:wishlist', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/wishlist.jade',
        'production/**/footer.jade'
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('wishlist.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});


gulp.task('jade:partners', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/partners.jade',
        'production/**/footer.jade'
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('partners.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});



gulp.task('jade:contact-us', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/contact-us.jade',
        'production/**/footer.jade'
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('contact-us.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});


gulp.task('jade:manuals', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/manuals.jade',
        'production/**/footer.jade'
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('manuals.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});


gulp.task('jade:videos', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/videos.jade',
        'production/**/footer.jade'
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('videos.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});


gulp.task('jade:warranty', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/warranty.jade',
        'production/**/footer.jade'
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('warranty.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});


gulp.task('jade:cart-c', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/cart-c.jade',
        'production/**/footer.jade' 
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('cart-c.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});


gulp.task('jade:cart-d', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/cart-d.jade',
        'production/**/footer.jade'
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('cart-d.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});


gulp.task('jade:about-us', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/about-us.jade',
        'production/**/footer.jade'
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('about-us.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});



gulp.task('jade:dealers', () => {
    return gulp.src([
        'production/**/head.jade',
        'production/**/header.jade',
        'production/**/breadcrumbs.jade',
        'production/**/dealers.jade',
        'production/**/footer.jade'
    ])
        .pipe(concat('jadify.jade'))
        .pipe(jade({
            pretty: true,
            jade: theJade,
            locals: require(jadeDataPath)
        }))
        .pipe(rename('dealers.html'))
        .pipe(gulp.dest('./'))
        .pipe(bs.stream());
});

gulp.task('default', ['serve']);