const gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require("gulp-cssmin"),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    concat = require("gulp-concat");

const paths = {
    scss: "./wwwroot/scss/**/*.scss",
    css: "./wwwroot/css/",
    minCss: "./wwwroot/css/min/",
    concatCssDest: "./wwwroot/css/site.min.css",


    // js : "./wwwroot/js/**/*.js",
    // minJs : "./wwwroot/js/**/*.min.js",
    // concatJsDest : "./wwwroot/js/site.min.js",
    // concatCssDest : "./wwwroot/css/site.min.css",
};

gulp.task('sass', function (cb) {
    gulp
        .src(paths.scss)
        .pipe(sass())
        .pipe(gulp.dest(paths.css))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.minCss));
    cb();
});

gulp.task(
    'default',
    gulp.series('sass', function (cb) {
        gulp.watch(paths.scss, gulp.series('sass'));
        cb();
    })
);