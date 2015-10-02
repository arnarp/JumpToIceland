'use strict';
var Tasks = {
    // Task that watches src files and compiles
    Dev: 'development',
    // Task that compiles sass files
    Sass: 'sass',
    // Task that watches src sass files and compiles
    SassWatch: 'sass:watch',
    // Task that recompiles this gulp script
    TscGulp: 'tsc:gulp',
    TscGulpWatch: 'tsc:gulp:watch'
};
var config = require('./gulp.config')();
var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');
var cp = require('child_process');
gulp.task(Tasks.Dev, [Tasks.SassWatch]);
gulp.task(Tasks.Sass, function () {
    gulp.src(config.sass)
        .pipe(sass())
        .pipe(gulp.dest(config.temp));
});
gulp.task(Tasks.SassWatch, function () {
    gulp.watch(config.sass, [Tasks.Sass]);
});
gulp.task(Tasks.TscGulpWatch, function () {
    gulp.watch(config.gulp + '/*.ts', [Tasks.TscGulp]);
});
gulp.task(Tasks.TscGulp, function (done) {
    runTSC(config.gulp, done);
});
// test fab
function runTSC(directory, done) {
    var tscjs = path.join(process.cwd(), config.nodeModules + "/typescript/lib/tsc.js");
    var childProcess = cp.spawn('tsc', ['-p', directory + '/.'], { cwd: process.cwd() });
    childProcess.stdout.on('data', function (data) {
        // Ticino will read the output
        console.log(data.toString());
    });
    childProcess.stderr.on('data', function (data) {
        // Ticino will read the output
        console.log(data.toString());
    });
    childProcess.on('close', function () {
        done();
    });
}
module.exports = gulp;
//# sourceMappingURL=gulpfile.js.map