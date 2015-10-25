import nodemon = require('gulp-nodemon');

export class GulpConfig {
	public nodeModules = './node_modules';
	static src = './src';

	private static clientSrc = `${GulpConfig.src}/client`;
	private static clientStyles = `${GulpConfig.clientSrc}/styles`;

	static client = {
		src: GulpConfig.clientSrc,
		styles: GulpConfig.clientStyles,
		sass: `${GulpConfig.clientStyles}/**/*.scss`,
		css: `${GulpConfig.clientStyles}/**/*.css`,
		index: `${GulpConfig.clientSrc}/index.html`,
		typeScript: `${GulpConfig.clientSrc}/**/*.ts`,
		javaScript: `${GulpConfig.clientSrc}/**/*.js`,
		html: `${GulpConfig.clientSrc}/**/*.html`,
		tsConfig: `${GulpConfig.clientSrc}/tsconfig.json`
	};

	private static serverSrc = `${GulpConfig.src}/server`;

	static server = {
		src: GulpConfig.serverSrc,
		typeScript: `${GulpConfig.serverSrc}/**/*.ts`,
		tsConfig: `${GulpConfig.serverSrc}/tsconfig.json`
	};

	static node = {
		defaultPort: '8001'
	}

	static getPort() {
		return process.env.PORT || GulpConfig.node.defaultPort;
	}

	static getNodeOptions(isDev: boolean) {
		var options: nodemon.Option = {
			script: `${GulpConfig.server.src}/server.js`,
			env: {
				'PORT': GulpConfig.getPort(),
				'NODE_ENV': isDev ? 'dev' : 'build'
			},
			watch: [GulpConfig.server.src],
			nodeArgs: ['--debug=5858']
		};
		return options;
	}

	static gulp = {
		typeScript: './gulp/*.ts',
		tsConfig: './gulp/tsconfig.json'
	};

	static allTypeScript = [
		GulpConfig.client.typeScript,
		GulpConfig.gulp.typeScript,
		GulpConfig.server.typeScript
	];

	static browserReloadDelay = 1000
}