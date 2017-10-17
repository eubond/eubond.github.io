var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var stylus = require('gulp-stylus');

gulp.task('css', function() {
  gulp.src('./src/stylus/**/*.styl')
    .pipe(stylus())
    .pipe(cleanCSS())
    .pipe(gulp.dest( './public/css'))
});

  
gulp.task( 'default', function() {
  gulp.watch( './src/stylus/**/*.styl', [ 'css' ] );
});

