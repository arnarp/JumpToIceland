'use strict';

import { Tasks } from './gulp.tasks';
import { GulpConfig } from './gulp.config';
import * as styles from './gulp.styles';
import { log } from './gulp.helpers';
import * as typeScript from './gulp.typescript';
import * as server from './gulp.server';

import gulp = require('gulp');
import path = require('path');
import cp = require('child_process');
import plumber = require('gulp-plumber');

gulp.task(Tasks.Dev, [
    Tasks.SassWatch,
    Tasks.TsWatch
]);
gulp.task(Tasks.Build, [
    Tasks.TscClient,
    Tasks.TscGulp,
    Tasks.TscServer
]);
/////   Sass        /////
gulp.task(Tasks.Sass, styles.compile);
gulp.task(Tasks.SassWatch, styles.watchAndCompile);
gulp.task(Tasks.WireStyles, [Tasks.Sass], styles.wire);
/////   Dependencies    /////
gulp.task(Tasks.WireBower, function() {
    var wiredep = require('wiredep');
    gulp.src(GulpConfig.client.index)
        .pipe(wiredep())
        .pipe(gulp.dest(GulpConfig.client.src));
});
/////   TypeScript      /////
gulp.task(Tasks.TsLint, typeScript.lintAll);
gulp.task(Tasks.TsWatch, typeScript.watchAndLint);
gulp.task(Tasks.TscGulp, typeScript.compileGulp);
gulp.task(Tasks.TscClient, typeScript.compileClient);
gulp.task(Tasks.TscServer, typeScript.compileServer);
/////   Server          /////
gulp.task(Tasks.StartServerInDev, server.startDev);
module.exports = gulp;
