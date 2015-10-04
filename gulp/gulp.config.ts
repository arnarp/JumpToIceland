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
		typeScript: `${config.clientSrc}/**/*.ts`
	};

	static allTypeScript = [
		config.client.typeScript
	];
}