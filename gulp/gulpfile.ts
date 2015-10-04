'use strict';

var Tasks = {
    // Task that watches src files, lints and compiles
    Dev: 'development',
    // Task that compiles sass files
    Sass: 'sass',
    // Task that watches src sass files and compiles
    SassWatch: 'sass:watch',
    // Task that injects styles into index.html
    WireStyles: 'wire:styles',
    // Task that wired bower dependencies into index.html
    WireBower: 'wire:bower',
    // Lint all custom TypeScript files
    TsLint: 'ts:lint'
}
import {config} from './gulp.config';
import gulp = require('gulp');
import sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
import path = require('path');
import cp = require('child_process');
import inject = require('gulp-inject');
import { log } from './gulp.helpers';
import tslint = require('gulp-tslint');
import watch = require('gulp-watch');
import plumber = require('gulp-plumber');

gulp.task(Tasks.Dev, [Tasks.SassWatch]);

gulp.task(Tasks.Sass, function() {
    gulp.src(config.client.sass)
        .pipe(plumber())
        .pipe(scsslint())
        .pipe(sass())
        .pipe(gulp.dest(config.client.styles));
});

gulp.task(Tasks.SassWatch, function() {
    watch(config.client.sass, { readDelay: 100, events: ['add', 'unlink'] }, function() {
        gulp.start(Tasks.WireStyles);
    });
    watch(config.client.sass, { readDelay: 100, events: ['change'] }, function() {
        gulp.start(Tasks.Sass);
    });
});

gulp.task(Tasks.WireStyles, [Tasks.Sass], function() {
    log('Wire up css into the html, after files are ready');
    var target = gulp.src(config.client.index);
    var sources = gulp.src([config.client.css], { read: false });

    return target.pipe(inject(sources))
        .pipe(gulp.dest(config.client.root));
});

gulp.task(Tasks.WireBower, function() {
    var wiredep = require('wiredep');
    gulp.src(config.client.index)
        .pipe(wiredep())
        .pipe(gulp.dest(config.client.root));
});

gulp.task(Tasks.TsLint, function() {
    return gulp
        .src(config.allTypeScript)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emitError: false,
        }));
});


module.exports = gulp;