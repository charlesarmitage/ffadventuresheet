var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var jasmine  = require('gulp-jasmine');

gulp.task('lint', function() {
  return gulp
    .src(['gulpfile.js', 'js/FF*.js', 'tests/spec/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp
    .src('tests/spec/*.js')
    .pipe(jasmine());
});

gulp.task('default', ['lint'/*, 'test'*/], function() {
  gulp.watch(['js/FF*.js', 'tests/spec/*.js'], function() {
    gulp.run('lint', 'test');
    // TODO:  Fix gulp-jasmine
    gulp.run('lint');
  });
});
