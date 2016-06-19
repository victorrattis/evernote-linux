
var gulp = require('gulp');
var babel = require('gulp-babel');
var less = require('gulp-less');
var concat = require('gulp-concat');
var check = require('check-dependencies');
var jshint = require('gulp-jshint');
var electron = require('electron-connect').server.create({
  electron:require('electron-prebuilt')
});

var babelconfig = {
  presets: [
    // 'es2015',
    'react'
  ]
};

gulp.task('default', function () {})

gulp.task('libs', function () {
  check.sync({
    packageDir:'package.json',
    install: true
  })
});

gulp.task('lint', ['lint-jsx'], function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lint-jsx', function() {
  return gulp.src('src/**/*.jsx')
    .pipe(babel(babelconfig))
    .pipe(jshint())
    // .pipe(jshint({ linter: require('jshint-jsx').JSXHINT }))
    .pipe(jshint.reporter('default'));
});

gulp.task('move-html', function () {
  return gulp.src(['src/**/*.+(js|html|css)', '!src/**/*.jsx', '!src/**/*.less', '!src/server/**/*'])
    .pipe(gulp.dest('out'))
});

gulp.task('build-less', function () {
  var src = 'src/ui/styles/'
  var dest = 'out/ui/styles/'

  return gulp.src(src + '**/*.less')
    .pipe(less())
    .pipe(concat('index.css'))
    .pipe(gulp.dest(dest))
})

gulp.task('build-jsx', ['libs'], function () {
  return gulp.src('src/**/*.jsx')
    .pipe(babel(babelconfig))
    .pipe(gulp.dest('out'))
})

var files = ['move-html', 'build-jsx', 'build-less']

gulp.task('run', files, function () {
  // Start browser process
  electron.start()
})

gulp.task('dev', files, function () {

  // Start browser process
  electron.start()

  // Restart browser process
  gulp.watch('src/main.js', electron.restart)

  // Reload renderer process
  gulp.watch('src/**/*', [files, electron.reload])
})
