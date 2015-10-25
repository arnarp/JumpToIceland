var GulpConfig = (function () {
    function GulpConfig() {
        this.nodeModules = './node_modules';
    }
    GulpConfig.getPort = function () {
        return process.env.PORT || GulpConfig.node.defaultPort;
    };
    GulpConfig.getNodeOptions = function (isDev) {
        var options = {
            script: GulpConfig.server.src + "/server.js",
            env: {
                'PORT': GulpConfig.getPort(),
                'NODE_ENV': isDev ? 'dev' : 'build'
            },
            watch: [GulpConfig.server.src],
            nodeArgs: ['--debug=5858']
        };
        return options;
    };
    GulpConfig.src = './src';
    GulpConfig.clientSrc = GulpConfig.src + "/client";
    GulpConfig.clientStyles = GulpConfig.clientSrc + "/styles";
    GulpConfig.client = {
        src: GulpConfig.clientSrc,
        styles: GulpConfig.clientStyles,
        sass: GulpConfig.clientStyles + "/**/*.scss",
        css: GulpConfig.clientStyles + "/**/*.css",
        index: GulpConfig.clientSrc + "/index.html",
        typeScript: GulpConfig.clientSrc + "/**/*.ts",
        javaScript: GulpConfig.clientSrc + "/**/*.js",
        html: GulpConfig.clientSrc + "/**/*.html",
        tsConfig: GulpConfig.clientSrc + "/tsconfig.json"
    };
    GulpConfig.serverSrc = GulpConfig.src + "/server";
    GulpConfig.server = {
        src: GulpConfig.serverSrc,
        typeScript: GulpConfig.serverSrc + "/**/*.ts",
        tsConfig: GulpConfig.serverSrc + "/tsconfig.json"
    };
    GulpConfig.node = {
        defaultPort: '8001'
    };
    GulpConfig.gulp = {
        typeScript: './gulp/*.ts',
        tsConfig: './gulp/tsconfig.json'
    };
    GulpConfig.allTypeScript = [
        GulpConfig.client.typeScript,
        GulpConfig.gulp.typeScript,
        GulpConfig.server.typeScript
    ];
    GulpConfig.browserReloadDelay = 1000;
    return GulpConfig;
})();
exports.GulpConfig = GulpConfig;
//# sourceMappingURL=gulp.config.js.map