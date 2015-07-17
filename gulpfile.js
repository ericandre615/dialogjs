// init gulp
var gulp = require('gulp'),
    path = require('path');

// init plugins
var concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    autoprefix = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload');

var jsFiles = ['src/js/dialog.js'];

gulp.task('less', function() {
    return gulp.src('src/less/dialog.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefix('last 3 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(sourcemaps.write())
        .pipe(rename('dialog.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('dialog.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('dialog.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js/min'))
    .pipe(livereload());
});

gulp.task('less-prod', function() {
    return gulp.src('src/less/dialog.less')
        .pipe(less())
        .pipe(autoprefix('last 3 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename('dialog.css'))
        .pipe(gulp.dest('dist/css'))
});


gulp.task('scripts-prod', function() {
    return gulp.src(jsFiles)
    .pipe(concat('dialog.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('dialog.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/min'));
});

gulp.task('reload', function() {
    return livereload.reload();
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['src/js/*.js'], ['scripts']);
    gulp.watch(['src/less/*.less'], ['less']);
});

gulp.task('default', ['less', 'scripts', 'watch']);

gulp.task('build', ['less-prod', 'scripts-prod']);

module.exports = gulp; // if you would like to use gulp-devtools
