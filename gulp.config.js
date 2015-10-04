var config = (function () {
    function config() {
        this.nodeModules = './node_modules';
    }
    config.src = './src';
    config.clientSrc = config.src + "/client";
    config.clientStyles = config.clientSrc + "/styles";
    config.client = {
        root: config.clientSrc,
        styles: config.clientStyles,
        sass: config.clientStyles + "/**/*.scss",
        css: config.clientStyles + "/**/*.css",
        index: config.clientSrc + "/index.html",
        typeScript: config.clientSrc + "/**/*.ts"
    };
    config.gulp = {
        typeScript: './gulp/*.ts'
    };
    config.allTypeScript = [
        config.client.typeScript,
        config.gulp.typeScript
    ];
    return config;
})();
exports.config = config;
//# sourceMappingURL=gulp.config.js.map