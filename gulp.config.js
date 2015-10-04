var Config = (function () {
    function Config() {
        this.nodeModules = './node_modules';
    }
    Config.src = './src';
    Config.clientSrc = Config.src + "/client";
    Config.clientStyles = Config.clientSrc + "/styles";
    Config.client = {
        root: Config.clientSrc,
        styles: Config.clientStyles,
        sass: Config.clientStyles + "/**/*.scss",
        css: Config.clientStyles + "/**/*.css",
        index: Config.clientSrc + "/index.html",
        typeScript: Config.clientSrc + "/**/*.ts",
        tsConfig: Config.clientSrc + "/tsconfig.json"
    };
    Config.gulp = {
        typeScript: './gulp/*.ts',
        tsConfig: './gulp/tsconfig.json'
    };
    Config.allTypeScript = [
        Config.client.typeScript,
        Config.gulp.typeScript
    ];
    return Config;
})();
exports.Config = Config;
