var tslint = require('gulp-tslint');
var ts = require('gulp-typescript');
var gulp = require('gulp');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var gulp_config_1 = require('./gulp.config');
var gulp_tasks_1 = require('./gulp.tasks');
var gulpProject = ts.createProject(gulp_config_1.GulpConfig.gulp.tsConfig);
var clientProject = ts.createProject(gulp_config_1.GulpConfig.client.tsConfig);
var serverProject = ts.createProject(gulp_config_1.GulpConfig.server.tsConfig);
function lintAll() {
    return gulp
        .src(gulp_config_1.GulpConfig.allTypeScript)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
        emitError: false
    }));
}
exports.lintAll = lintAll;
function watchAndLint() {
    var options = {
        readDelay: 1000
    };
    watch(gulp_config_1.GulpConfig.allTypeScript, options, function () {
        gulp.start(gulp_tasks_1.Tasks.TsLint);
    });
}
exports.watchAndLint = watchAndLint;
function compileGulp() {
    tsc(gulpProject, './');
}
exports.compileGulp = compileGulp;
function compileClient() {
    tsc(clientProject, gulp_config_1.GulpConfig.client.src);
}
exports.compileClient = compileClient;
function compileServer() {
    tsc(serverProject, gulp_config_1.GulpConfig.server.src);
}
exports.compileServer = compileServer;
function tsc(project, outFolder) {
    return function () {
        return project
            .src()
            .pipe(sourcemaps.init())
            .pipe(ts(project))
            .js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(outFolder));
    };
}
//# sourceMappingURL=gulp.typescript.js.map