import gUtil = require('gulp-util');

/**
* Log a message or series of messages using chalk's blue color.
* Can pass in a string, object or array.
*/
export function log(msg: string | any) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				gUtil.log(gUtil.colors.blue(msg[item]));
			}
		}
	} else {
		gUtil.log(gUtil.colors.blue(msg));
	}
}
