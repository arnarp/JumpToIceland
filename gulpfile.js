'use strict';
var gulp_tasks_1 = require('./gulp.tasks');
var gulp_config_1 = require('./gulp.config');
var styles = require('./gulp.styles');
var typeScript = require('./gulp.typescript');
var server = require('./gulp.server');
var gulp = require('gulp');
gulp.task(gulp_tasks_1.Tasks.Dev, [
    gulp_tasks_1.Tasks.SassWatch,
    gulp_tasks_1.Tasks.TsWatch
]);
gulp.task(gulp_tasks_1.Tasks.Build, [
    gulp_tasks_1.Tasks.TscClient,
    gulp_tasks_1.Tasks.TscGulp,
    gulp_tasks_1.Tasks.TscServer
]);
/////   Sass        /////
gulp.task(gulp_tasks_1.Tasks.Sass, styles.compile);
gulp.task(gulp_tasks_1.Tasks.SassWatch, styles.watchAndCompile);
gulp.task(gulp_tasks_1.Tasks.WireStyles, [gulp_tasks_1.Tasks.Sass], styles.wire);
/////   Dependencies    /////
gulp.task(gulp_tasks_1.Tasks.WireBower, function () {
    var wiredep = require('wiredep');
    gulp.src(gulp_config_1.GulpConfig.client.index)
        .pipe(wiredep())
        .pipe(gulp.dest(gulp_config_1.GulpConfig.client.src));
});
/////   TypeScript      /////
gulp.task(gulp_tasks_1.Tasks.TsLint, typeScript.lintAll);
gulp.task(gulp_tasks_1.Tasks.TsWatch, typeScript.watchAndLint);
gulp.task(gulp_tasks_1.Tasks.TscGulp, typeScript.compileGulp);
gulp.task(gulp_tasks_1.Tasks.TscClient, typeScript.compileClient);
gulp.task(gulp_tasks_1.Tasks.TscServer, typeScript.compileServer);
/////   Server          /////
gulp.task(gulp_tasks_1.Tasks.StartServerInDev, server.startDev);
module.exports = gulp;
//# sourceMappingURL=gulpfile.js.map