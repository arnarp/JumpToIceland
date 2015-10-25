'use strict';
import nodemon = require('gulp-nodemon');
import browserSync = require('browser-sync');

import { GulpConfig } from './gulp.config';
import { log } from './gulp.helpers';
import { watchAndCompile } from './gulp.styles';


export function startDev() {
    return serve(true);
}

export function startProd() {
    return serve(false);
}

function serve(isDev: boolean) {
    let nodeOptions = GulpConfig.getNodeOptions(isDev);
    log(`Starting server in ${isDev ? 'dev' : 'prod'} mode`);
    log(nodeOptions);
    return nodemon(nodeOptions)
        .on('restart', function() {
            log('*** nodemon restarted');
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload({ stream: false });
            }, GulpConfig.browserReloadDelay);
        })
        .on('start', function() {
            log('*** nodemon started');
            startBrowserSync(isDev);
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
}

function startBrowserSync(isDev: boolean) {
    log('Starting BrowserSync on port ' + GulpConfig.getPort());

    // If build: watches the files, builds, and restarts browser-sync.
    // If dev: watches less, compiles it to css, browser-sync handles reload
    if (isDev) {
        watchAndCompile();
    } else {
        //gulp.watch([config.less, config.js, config.html], ['browserSyncReload'])
        //    .on('change', changeEvent);
    }

    var options = {
        proxy: `localhost: + ${GulpConfig.getPort()}`,
        port: 3000,
        files: isDev ? [
            GulpConfig.client.javaScript,
            GulpConfig.client.css,
            GulpConfig.client.html
        ] : [],
        ghostMode: { // these are the defaults t,f,t,t
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
    } ;

    browserSync(options);
}
