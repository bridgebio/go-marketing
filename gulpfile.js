var gulp          = require('gulp');
var clean         = require('gulp-clean');
var concat        = require('gulp-concat');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');

var paths = {
  build: 'build/',
  scripts: ['src/js/**/*.js', 'src/vendor/**/*.js'],
  html: ['src/**/*.html'],
  site: ['src/site/**/*'],
  sass: ['src/sass/*.scss'],
};

gulp.task('site', function() {
  return gulp.src(paths.site)
    .pipe(gulp.dest(paths.build));
});

gulp.task('css', function() {
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(autoprefixer('last 15 version'))
    .pipe(gulp.dest(paths.build + 'css'));
});

gulp.task('clean', function() {
  gulp.src(paths.build, { read: false }).pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch('gulpfile.js', ['build']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.sass, ['css']);
  gulp.watch(paths.site, ['site']);
});
  
gulp.task('build', ['site', 'css']);
gulp.task('default', ['build', 'watch']); 




