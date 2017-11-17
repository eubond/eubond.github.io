var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var imagemin = require ('gulp-imagemin')
var htmlmin = require("gulp-htmlmin");
var browserSync = require('browser-sync').create();


// Minifies HTML for build
gulp.task('html', function() {
  return gulp.src("./*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./public'));
})
// Compile .styl to .css and refresh browserSync
gulp.task('css', function() {
  return gulp.src('./src/stylus/**/*.styl')
    .pipe(stylus())
    .pipe(cleanCSS())
    .pipe(gulp.dest( './src/css'))
    .pipe(browserSync.stream());
});
// Minifies css for build
gulp.task("css-build", function() {
  return gulp
    .src("./src/stylus/**/*.styl")
    .pipe(stylus())
    .pipe(cleanCSS())
    .pipe(gulp.dest("./public/css"))
});

// Minifies JS for build
gulp.task('js', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest( './public/js'))
    .pipe(browserSync.stream());
});

//Optimizes
gulp.task('imagemin', function(){
  gulp.src('./src/img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img'))
});

// Static Server + watching styl/js/html files
gulp.task('serve', ['css', 'js' ], function() {
  
    browserSync.init({
        server: "./"
    });

    gulp.watch( './src/stylus/**/*.styl', ['css'] );
    gulp.watch( './src/js/**/*.js').on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
});
gulp.task('build',['css-build', 'js', 'imagemin', 'html'] )
  
 
