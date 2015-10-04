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
};
var gulp_config_1 = require('./gulp.config');
var gulp = require('gulp');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var inject = require('gulp-inject');
var gulp_helpers_1 = require('./gulp.helpers');
var tslint = require('gulp-tslint');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
gulp.task(Tasks.Dev, [Tasks.SassWatch]);
gulp.task(Tasks.Sass, function () {
    gulp.src(gulp_config_1.config.client.sass)
        .pipe(plumber())
        .pipe(scsslint())
        .pipe(sass())
        .pipe(gulp.dest(gulp_config_1.config.client.styles));
});
gulp.task(Tasks.SassWatch, function () {
    watch(gulp_config_1.config.client.sass, { readDelay: 100, events: ['add', 'unlink'] }, function () {
        gulp.start(Tasks.WireStyles);
    });
    watch(gulp_config_1.config.client.sass, { readDelay: 100, events: ['change'] }, function () {
        gulp.start(Tasks.Sass);
    });
});
gulp.task(Tasks.WireStyles, [Tasks.Sass], function () {
    gulp_helpers_1.log('Wire up css into the html, after files are ready');
    var target = gulp.src(gulp_config_1.config.client.index);
    var sources = gulp.src([gulp_config_1.config.client.css], { read: false });
    return target.pipe(inject(sources))
        .pipe(gulp.dest(gulp_config_1.config.client.root));
});
gulp.task(Tasks.WireBower, function () {
    var wiredep = require('wiredep');
    gulp.src(gulp_config_1.config.client.index)
        .pipe(wiredep())
        .pipe(gulp.dest(gulp_config_1.config.client.root));
});
gulp.task(Tasks.TsLint, function () {
    return gulp
        .src(gulp_config_1.config.allTypeScript)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
        emitError: false,
    }));
});
module.exports = gulp;
//# sourceMappingURL=gulpfile.js.map