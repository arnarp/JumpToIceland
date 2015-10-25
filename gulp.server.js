'use strict';
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var gulp_config_1 = require('./gulp.config');
var gulp_helpers_1 = require('./gulp.helpers');
var gulp_styles_1 = require('./gulp.styles');
function startDev() {
    return serve(true);
}
exports.startDev = startDev;
function startProd() {
    return serve(false);
}
exports.startProd = startProd;
function serve(isDev) {
    var nodeOptions = gulp_config_1.GulpConfig.getNodeOptions(isDev);
    gulp_helpers_1.log("Starting server in " + (isDev ? 'dev' : 'prod') + " mode");
    gulp_helpers_1.log(nodeOptions);
    return nodemon(nodeOptions)
        .on('restart', function () {
        gulp_helpers_1.log('*** nodemon restarted');
        setTimeout(function () {
            browserSync.notify('reloading now ...');
            browserSync.reload({ stream: false });
        }, gulp_config_1.GulpConfig.browserReloadDelay);
    })
        .on('start', function () {
        gulp_helpers_1.log('*** nodemon started');
        startBrowserSync(isDev);
    })
        .on('crash', function () {
        gulp_helpers_1.log('*** nodemon crashed: script crashed for some reason');
    })
        .on('exit', function () {
        gulp_helpers_1.log('*** nodemon exited cleanly');
    });
}
function startBrowserSync(isDev) {
    gulp_helpers_1.log('Starting BrowserSync on port ' + gulp_config_1.GulpConfig.getPort());
    // If build: watches the files, builds, and restarts browser-sync.
    // If dev: watches less, compiles it to css, browser-sync handles reload
    if (isDev) {
        gulp_styles_1.watchAndCompile();
    }
    else {
    }
    var options = {
        proxy: "localhost: + " + gulp_config_1.GulpConfig.getPort(),
        port: 3000,
        files: isDev ? [
            gulp_config_1.GulpConfig.client.javaScript,
            gulp_config_1.GulpConfig.client.css,
            gulp_config_1.GulpConfig.client.html
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'info',
        logPrefix: 'hottowel',
        notify: true,
        reloadDelay: 0 //1000
    };
    browserSync(options);
}
//# sourceMappingURL=gulp.server.js.map