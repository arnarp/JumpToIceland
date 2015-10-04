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
var gulp_config_1 = require('./gulp.config');
var gulp = require('gulp');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var inject = require('gulp-inject');
var gulp_helpers_1 = require('./gulp.helpers');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
gulp.task(Tasks.Dev, [Tasks.SassWatch]);
gulp.task(Tasks.Build, [Tasks.TscClient, Tasks.TscGulp]);
/////   Sass        /////
gulp.task(Tasks.Sass, function () {
    gulp.src(gulp_config_1.Config.client.sass)
        .pipe(plumber())
        .pipe(scsslint())
        .pipe(sass())
        .pipe(gulp.dest(gulp_config_1.Config.client.styles));
});
gulp.task(Tasks.SassWatch, function () {
    watch(gulp_config_1.Config.client.sass, { readDelay: 100, events: ['add', 'unlink'] }, function () {
        gulp.start(Tasks.WireStyles);
    });
    watch(gulp_config_1.Config.client.sass, { readDelay: 100, events: ['change'] }, function () {
        gulp.start(Tasks.Sass);
    });
});
gulp.task(Tasks.WireStyles, [Tasks.Sass], function () {
    gulp_helpers_1.log('Wire up css into the html, after files are ready');
    var target = gulp.src(gulp_config_1.Config.client.index);
    var sources = gulp.src([gulp_config_1.Config.client.css], { read: false });
    return target.pipe(inject(sources))
        .pipe(gulp.dest(gulp_config_1.Config.client.root));
});
/////   Dependencies    /////
gulp.task(Tasks.WireBower, function () {
    var wiredep = require('wiredep');
    gulp.src(gulp_config_1.Config.client.index)
        .pipe(wiredep())
        .pipe(gulp.dest(gulp_config_1.Config.client.root));
});
/////   TypeScript      /////
var tslint = require('gulp-tslint');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
gulp.task(Tasks.TsLint, function () {
    return gulp
        .src(gulp_config_1.Config.allTypeScript)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
        emitError: false
    }));
});
gulp.task(Tasks.TsWatch, function () {
    var options = {
        readDelay: 1000
    };
    watch(gulp_config_1.Config.allTypeScript, options, function () {
        gulp.start(Tasks.TsLint);
    });
});
var gulpProject = ts.createProject(gulp_config_1.Config.gulp.tsConfig);
gulp.task(Tasks.TscGulp, function () {
    return gulpProject
        .src()
        .pipe(ts(gulpProject))
        .js
        .pipe(gulp.dest('./'));
});
var clientProject = ts.createProject(gulp_config_1.Config.client.tsConfig);
gulp.task(Tasks.TscClient, function () {
    return clientProject
        .src()
        .pipe(sourcemaps.init())
        .pipe(ts(clientProject))
        .js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(gulp_config_1.Config.client.root));
});
module.exports = gulp;
