module.exports = function () {
    var client = './src/client';
    var temp = './.tmp';
    var nodeModules = './node_modules';
    var config = {
        sass: client + "/styles/main.scss",
        temp: temp,
        gulp: './gulp',
        nodeModules: nodeModules
    };
    return config;
};
//# sourceMappingURL=gulp.config.js.map