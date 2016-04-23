
var gulp = require("gulp");
var babel = require('gulp-babel');
var run = require('gulp-run');
var less = require('gulp-less');
var concat = require('gulp-concat');


gulp.task('default', function() {
});


gulp.task('move-html', function() {
    return gulp.src(['src/**/*.+(js|html|css)', '!src/**/*.jsx', '!src/**/*.less'])
            .pipe(gulp.dest('out'));
});


gulp.task('build-less', function() {
    var src = 'src/ui/styles/';
    var dest = 'out/ui/styles/';

    return gulp.src(src + '**/*.less')
        .pipe(less())
        .pipe(concat('index.css'))
        .pipe(gulp.dest(dest));
});


gulp.task('build-jsx', function () {
    var babelconfig = {
        presets: [
            // 'es2015', 
            'react'
        ]
    };

    return gulp.src('src/**/*.jsx')
            .pipe(babel(babelconfig))
            .pipe(gulp.dest('out'));
});


gulp.task('run', ['move-html', 'build-jsx', 'build-less'], function() {
    return run('./node_modules/.bin/electron .').exec();
});
