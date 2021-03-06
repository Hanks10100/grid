var del             = require('del');
var gulp            = require('gulp');
var named           = require('vinyl-named');
var filter          = require('gulp-filter');
var rename          = require('gulp-rename');
var uglify          = require('gulp-uglify');
var webpack         = require('webpack-stream');
var webpackConfig   = require('./webpack.config.js');

gulp.task('clean', function() {
    del('./dist/*.js');
    del('./dist/*.js.map');
});

// 编译并压缩脚本
gulp.task('compile', ['clean'], function() {
    return gulp.src(['src/*.js'])
        .pipe(named())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist'))
});
gulp.task('release', ['compile'], function() {
    return gulp.src('dist/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist'));
});


gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['compile']);
});

gulp.task('default', ['compile'], function() {
    gulp.start('watch');
});
