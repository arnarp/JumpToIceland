'use strict';

var Tasks = {
    // Task that watches src files and compiles
    Dev: 'development',
    // Task that compiles sass files
    Sass: 'sass',
    // Task that watches src sass files and compiles
    SassWatch: 'sass:watch',
}

var config = require('./gulp.config')();
import gulp = require('gulp');
import sass = require('gulp-sass');
import path = require('path');
import cp = require('child_process');
import * from './gulp.helpers';

gulp.task(Tasks.Dev, [Tasks.SassWatch]);

gulp.task(Tasks.Sass, function() {
    gulp.src(config.sass)
        .pipe(sass())
        .pipe(gulp.dest(config.temp));
});

gulp.task(Tasks.SassWatch, function() {
    gulp.watch(config.sass, [Tasks.Sass]);
});

gulp.task('inject', [Tasks.Sass], function() {

    log('Wire up css into the html, after files are ready');

    return gulp
        .src(config.index)
        .pipe(inject(config.css))
        .pipe(gulp.dest(config.client));
});

module.exports = gulp;

function runTSC(directory: string, done: Function) {
    var tscjs = path.join(process.cwd(),
        `${config.nodeModules}/typescript/lib/tsc.js`);
    var childProcess = cp.spawn('tsc', ['-p', directory + '/.'],
        { cwd: process.cwd() });
    childProcess.stdout.on('data', function (data: any) {
        // Ticino will read the output
        console.log(data.toString());
    });
    childProcess.stderr.on('data', function (data: any) {
        // Ticino will read the output
        console.log(data.toString());
    });
    childProcess.on('close', function () {
        done();
    });
}