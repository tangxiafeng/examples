/**
 * Created by tangxiafeng on 2017/5/22.
 */
'use strict';

var gulp = require("gulp");
var webpack = require("webpack");
var gulpWebpack = require("webpack-stream");
var path = require("path");
var webpackConfig = require("./webpack.config");
var ts = require("gulp-typescript");
var moment = require("moment");
var tsProject = ts.createProject('tsconfig.json',
    {
        typescript: require("typescript")
    });

const compileDist = './tmp/tsreq';

gulp.task('tsc.server', function() {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest(path.resolve(compileDist)))
});

gulp.task("tsc", ['tsc.server']);

gulp.task("watch:tsc", function() {
    return gulp.watch(["*.ts", "./server/**/*.ts", "./server/**/*.js"], ['tsc']);
})

// gulp.task("watch:www", function() {
//    return gulp.watch(['./www/*.js|*.ts', './www/ctrl'], ['webpack']);
// })

gulp.task("webpack", function() {
    gulp.src(path.resolve(__dirname, './www/index.js'))
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest('./www/libs'))

});

gulp.task("dist", ["default", 'tsc'], function() {
    return Promise.all([
        copy(["./package.json"], "./dist"),
        copy([path.resolve(compileDist, './*.js')], './dist'),
        copy([path.resolve(compileDist, './config/index.js'), './config/*.json'], './dist/config'),
        copy(['./bin/*.js'], './dist/bin'),
        copy([path.resolve(compileDist, "./server/**/*.js"), './server/**/*.html'], "./dist/server"),
        copy(["./www/**/*.html"], "./dist/www"),
        copy(["./www/libs/**/*"], "./dist/www/libs"),
    ])
});

var del = require("del");
gulp.task("clean:dist", function() {
    return del('./dist');
})

function copy(src, dest) {
    return gulp
        .src(src)
        .pipe(gulp.dest(dest));
}

let tar = require("gulp-tar");
let gz = require("gulp-gzip");
gulp.task("tarball", ["dist"], function() {
    let name = 'forwardcms-' + moment().format("YYYYMMDDHHmmss")+'.tar';
    return gulp.src('./dist/**/*')
    .pipe(tar(name))
    .pipe(gz())
    .pipe(gulp.dest('./'));
});

gulp.task("default", ['webpack']);