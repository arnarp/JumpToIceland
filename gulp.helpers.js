var gUtil = require('gulp-util');
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
//# sourceMappingURL=gulp.helpers.js.map