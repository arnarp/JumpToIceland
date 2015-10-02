import gInject = require('gulp-inject');
import gulp = require('gulp');
import gIf = require('gulp-if');
import gUtil = require('gulp-util');
var gOrder = require('gulp-order');

export interface IGulpHelper {
	/**
 	* Inject files in a sorted sequence at a specified inject label
 	* @param   src   	glob pattern for source files
 	* @param   label   	The label name
 	* @param   order   	glob pattern for sort order of the files
 	* @returns The stream
 	*/
	inject(src: string[], label: string, order: string[]):
		NodeJS.ReadWriteStream;
	/**
 	* Log a message or series of messages using chalk's blue color.
 	* Can pass in a string, object or array.
 	*/
	log(msg: string | any): void;
}

export class GulpHelper implements IGulpHelper {
	inject(src: Array<string>, label: string, order: Array<string>) {
		var options: any = { read: false };
		if (label) {
			options.name = 'inject:' + label;
		}
		return gInject(this.orderSrc(src, order), options);
	}
	log(msg: string | any) {
		if (typeof (msg) === 'object') {
			for (var item in msg) {
				if (msg.hasOwnProperty(item)) {
					gUtil.log(gUtil.colors.blue(msg[item]));
				}
			}
		} else {
			gUtil.log(gUtil.colors.blue(msg));
		}
	}
	/**
	 * Order a stream
	 * @param   src   The gulp.src stream
	 * @param   order Glob array pattern
	 * @returns The ordered stream
	 */
	private orderSrc(src: Array<string>, order: Array<string>) {
		return gulp
			.src(src)
			.pipe(gIf(order, gOrder(order)));
	}
}