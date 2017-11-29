const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const stylus = require('gulp-stylus');
const uglify = require('gulp-uglify');
const imagemin = require ('gulp-imagemin')
const htmlmin = require("gulp-htmlmin");
const browserSync = require('browser-sync').create();

gulp.task('html', () => {
  return gulp.src("./*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./public'));
})




gulp.task('css', () => {
  return gulp.src('./src/stylus/**/*.styl')
    .pipe(stylus())
    .pipe(cleanCSS())
    .pipe(gulp.dest( './src/css'))
    .pipe(browserSync.stream());
});

gulp.task("css-build", () => {
  return gulp
    .src("./src/stylus/**/*.styl")
    .pipe(stylus())
    .pipe(cleanCSS())
    .pipe(gulp.dest("./public/css"))
});

gulp.task('js', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest( './public/js'))
    .pipe(browserSync.stream());
});

gulp.task('imagemin', () =>{
  gulp.src('./src/img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img'))
});

gulp.task('serve', ['css', 'js' ], () => {
    browserSync.init({
        server: "./"
    });
    gulp.watch( './src/stylus/**/*.styl', ['css'] );
    gulp.watch( './src/js/**/*.js').on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
});
gulp.task('build',['css-build', 'js', 'imagemin', 'html'] )
  
 
