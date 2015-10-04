export class Config {
	public nodeModules = './node_modules';
	static src = './src';

	static clientSrc = `${Config.src}/client`;
	static clientStyles = `${Config.clientSrc}/styles`;

	static client = {
		root: Config.clientSrc,
		styles: Config.clientStyles,
		sass: `${Config.clientStyles}/**/*.scss`,
		css: `${Config.clientStyles}/**/*.css`,
		index: `${Config.clientSrc}/index.html`,
		typeScript: `${Config.clientSrc}/**/*.ts`,
		tsConfig: `${Config.clientSrc}/tsconfig.json`
	};

	static gulp = {
		typeScript: './gulp/*.ts',
		tsConfig: './gulp/tsconfig.json'
	};

	static allTypeScript = [
		Config.client.typeScript,
		Config.gulp.typeScript
	];
}