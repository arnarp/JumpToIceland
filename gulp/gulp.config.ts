export class config {
	public nodeModules = './node_modules';
	static src = './src';

	static clientSrc = `${config.src}/client`;
	static clientStyles = `${config.clientSrc}/styles`;

	static client = {
		root: config.clientSrc,
		styles: config.clientStyles,
		sass: `${config.clientStyles}/**/*.scss`,
		css: `${config.clientStyles}/**/*.css`,
		index: `${config.clientSrc}/index.html`,
		typeScript: `${config.clientSrc}/**/*.ts`,
		tsConfig: `${config.clientSrc}/tsconfig.json`
	};

	static gulp = {
		typeScript: './gulp/*.ts',
		tsConfig: './gulp/tsconfig.json'
	};

	static allTypeScript = [
		config.client.typeScript,
		config.gulp.typeScript
	];
}