'use strict';
var sass = require('gulp-sass');
var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var scsslint = require('gulp-scss-lint');
var gulp_helpers_1 = require('./gulp.helpers');
var gulp_config_1 = require('./gulp.config');
var gulp_tasks_1 = require('./gulp.tasks');
function compile() {
    gulp.src(gulp_config_1.GulpConfig.client.sass)
        .pipe(plumber())
        .pipe(scsslint())
        .pipe(sass())
        .pipe(gulp.dest(gulp_config_1.GulpConfig.client.styles));
}
exports.compile = compile;
function watchAndCompile() {
    watch(gulp_config_1.GulpConfig.client.sass, { readDelay: 100, events: ['add', 'unlink'] }, function () {
        gulp.start(gulp_tasks_1.Tasks.WireStyles);
    });
    var f = watch(gulp_config_1.GulpConfig.client.sass, { readDelay: 100, events: ['change'] }, function () {
        gulp.start(gulp_tasks_1.Tasks.Sass);
    });
}
exports.watchAndCompile = watchAndCompile;
function wire() {
    gulp_helpers_1.log('Wire up css into the html, after files are ready');
    var target = gulp.src(gulp_config_1.GulpConfig.client.index);
    var sources = gulp.src([gulp_config_1.GulpConfig.client.css], { read: false });
    return target.pipe(inject(sources))
        .pipe(gulp.dest(gulp_config_1.GulpConfig.client.src));
}
exports.wire = wire;
//# sourceMappingURL=gulp.styles.js.map