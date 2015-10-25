import tslint = require('gulp-tslint');
import ts = require('gulp-typescript');
import gulp = require('gulp');
import watch = require('gulp-watch');
import sourcemaps = require('gulp-sourcemaps');

import { GulpConfig } from './gulp.config';
import { Tasks } from './gulp.tasks';

let gulpProject = ts.createProject(GulpConfig.gulp.tsConfig);
let clientProject = ts.createProject(GulpConfig.client.tsConfig);
let serverProject = ts.createProject(GulpConfig.server.tsConfig);

export function lintAll() {
    return gulp
        .src(GulpConfig.allTypeScript)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emitError: false
        }));
}

export function watchAndLint() {
    let options = {
        readDelay: 1000
    };
    watch(GulpConfig.allTypeScript, options, function() {
        gulp.start(Tasks.TsLint);
    });
}

export function compileGulp() {
	tsc(gulpProject, './');
}

export function compileClient() {
	tsc(clientProject, GulpConfig.client.src);
}

export function compileServer() {
	tsc(serverProject, GulpConfig.server.src);
}

function tsc(project: ts.Project, outFolder: string) {
	return function() {
		return project
			.src()
			.pipe(sourcemaps.init())
			.pipe(ts(project))
			.js
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(outFolder));
	};
}