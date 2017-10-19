var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var imagemin = require ('gulp-imagemin')
var browserSync = require('browser-sync').create();

gulp.task('css', function() {
  return gulp.src('./src/stylus/**/*.styl')
    .pipe(stylus())
    .pipe(cleanCSS())
    .pipe(gulp.dest( './src/css'))
    .pipe(browserSync.stream());
});




gulp.task('js', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest( './public/js'))
    .pipe(browserSync.stream());
});

gulp.task('imagemin', function(){
  gulp.src('./src/img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img'))
});

  
gulp.task( 'default', function() {
  gulp.watch( './src/stylus/**/*.styl', ['css'] );
  gulp.watch( './src/js/**/*.js', ['js'] );
});


// Static Server + watching scss/html files
gulp.task('serve', ['css', 'js' ], function() {
  
    browserSync.init({
        server: "./"
    });

    gulp.watch( './src/stylus/**/*.styl', ['css'] );
    gulp.watch( './src/js/**/*.js', ['js'] );
    gulp.watch("./*.html").on('change', browserSync.reload);
});
  
 
