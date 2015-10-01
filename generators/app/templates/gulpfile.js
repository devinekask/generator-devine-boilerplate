'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var cached = require('gulp-cached');

var files = [
  '**/*.js',
  '!_js/**/*.*',<% if (!node) { %>
  '!js/**/*.*',<% } else { %>
  '!public/**/*.*',<% } %>
  '!node_modules/**/*.*'
];

gulp.task('watch', function () {
  gulp.watch(files, ['eslint']);
});

gulp.task('eslint', function () {
  return gulp.src(files)
    .pipe(cached('linting'))
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('default', ['eslint', 'watch']);
