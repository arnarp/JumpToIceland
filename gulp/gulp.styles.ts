'use strict';
import sass = require('gulp-sass');
import gulp = require('gulp');
import watch = require('gulp-watch');
import plumber = require('gulp-plumber');
import inject = require('gulp-inject');
var scsslint = require('gulp-scss-lint');

import { log } from './gulp.helpers';
import { GulpConfig } from './gulp.config';
import { Tasks } from './gulp.tasks';

export function compile() {
	gulp.src(GulpConfig.client.sass)
        .pipe(plumber())
        .pipe(scsslint())
        .pipe(sass())
        .pipe(gulp.dest(GulpConfig.client.styles));
}

export function watchAndCompile() {
	watch(GulpConfig.client.sass, { readDelay: 100, events: ['add', 'unlink'] }, function() {
        gulp.start(Tasks.WireStyles);
    });
    var f = watch(GulpConfig.client.sass, { readDelay: 100, events: ['change'] }, function() {
        gulp.start(Tasks.Sass);
    });
}

export function wire() {
    log('Wire up css into the html, after files are ready');
    var target = gulp.src(GulpConfig.client.index);
    var sources = gulp.src([GulpConfig.client.css], { read: false });

    return target.pipe(inject(sources))
        .pipe(gulp.dest(GulpConfig.client.src));
}
