var gulp = require('gulp');
var gIf = require('gulp-if');
var gUtil = require('gulp-util');
var gOrder = require('gulp-order');
/**
* Inject files in a sorted sequence at a specified inject label
* @param   src   	glob pattern for source files
* @param   label   	The label name
* @param   order   	glob pattern for sort order of the files
* @returns The stream
*/
/*export function inject(src: string[]| string,
    label?: string, order?: string[]) {
    var options: any = { read: false };
    if (label !== undefined) {
        options.name = 'inject:' + label;
    }
    return gInject(this.orderSrc(src, order), options);
}*/
/**
* Log a message or series of messages using chalk's blue color.
* Can pass in a string, object or array.
*/
function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                gUtil.log(gUtil.colors.blue(msg[item]));
            }
        }
    }
    else {
        gUtil.log(gUtil.colors.blue(msg));
    }
}
exports.log = log;
/**
 * Order a stream
 * @param   src   The gulp.src stream
 * @param   order Glob array pattern
 * @returns The ordered stream
 */
function orderSrc(src, order) {
    return gulp
        .src(src)
        .pipe(gIf(order, gOrder(order)));
}
//# sourceMappingURL=gulp.helpers.js.map