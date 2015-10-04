'use strict';

var Tasks = {
    // Task that watches src files and lints and compiles
    Dev: 'development',
    // Build task
    Build: 'build',
    // Task that compiles sass files
    Sass: 'sass',
    // Task that watches src sass files and compiles
    SassWatch: 'sass:watch',
    // Task that injects styles into index.html
    WireStyles: 'wire:styles',
    // Task that wired bower dependencies into index.html
    WireBower: 'wire:bower',
    // Lint all custom TypeScript files
    TsLint: 'ts:lint',
    // Watches all TypeScript and lints
    TsWatch: 'ts:watch',
    // Compiles Gulp TypeScript
    TscGulp: 'tsc:gulp',
    // Compiles Client TypeScript
    TscClient: 'tsc:client'
};
import {Config} from './gulp.config';
import gulp = require('gulp');
import sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
import path = require('path');
import cp = require('child_process');
import inject = require('gulp-inject');
import { log } from './gulp.helpers';
import watch = require('gulp-watch');
import plumber = require('gulp-plumber');

gulp.task(Tasks.Dev, [Tasks.SassWatch]);
gulp.task(Tasks.Build, [Tasks.TscClient, Tasks.TscGulp]);

/////   Sass        /////
gulp.task(Tasks.Sass, function() {
    gulp.src(Config.client.sass)
        .pipe(plumber())
        .pipe(scsslint())
        .pipe(sass())
        .pipe(gulp.dest(Config.client.styles));
});

gulp.task(Tasks.SassWatch, function() {
    watch(Config.client.sass, { readDelay: 100, events: ['add', 'unlink'] }, function() {
        gulp.start(Tasks.WireStyles);
    });
    watch(Config.client.sass, { readDelay: 100, events: ['change'] }, function() {
        gulp.start(Tasks.Sass);
    });
});

gulp.task(Tasks.WireStyles, [Tasks.Sass], function() {
    log('Wire up css into the html, after files are ready');
    var target = gulp.src(Config.client.index);
    var sources = gulp.src([Config.client.css], { read: false });

    return target.pipe(inject(sources))
        .pipe(gulp.dest(Config.client.root));
});
/////   Dependencies    /////
gulp.task(Tasks.WireBower, function() {
    var wiredep = require('wiredep');
    gulp.src(Config.client.index)
        .pipe(wiredep())
        .pipe(gulp.dest(Config.client.root));
});

/////   TypeScript      /////
import tslint = require('gulp-tslint');
import ts = require('gulp-typescript');
import sourcemaps = require('gulp-sourcemaps');

gulp.task(Tasks.TsLint, function() {
    return gulp
        .src(Config.allTypeScript)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emitError: false
        }));
});

gulp.task(Tasks.TsWatch, function() {
    let options = {
        readDelay: 1000
    };
    watch(Config.allTypeScript, options, function() {
        gulp.start(Tasks.TsLint);
    });
});

let gulpProject = ts.createProject(Config.gulp.tsConfig);
gulp.task(Tasks.TscGulp, function() {
    return gulpProject
        .src()
        .pipe(ts(gulpProject))
        .js
        .pipe(gulp.dest('./'));
});

let clientProject = ts.createProject(Config.client.tsConfig);
gulp.task(Tasks.TscClient, function() {
    return clientProject
        .src()
        .pipe(sourcemaps.init())
        .pipe(ts(clientProject))
        .js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(Config.client.root));
});

module.exports = gulp;
