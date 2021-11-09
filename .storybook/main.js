const path = require('path');
const pathToInlineSvg = path.resolve(__dirname, '../src/assets');

module.exports = {
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
		},
	},
	stories: [
		"../src/**/*.stories.mdx",
		"../src/**/*.stories.@(js|jsx|ts|tsx)"
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials"
	],
	webpackFinal: async (config) => {
		const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'));
		fileLoaderRule.exclude = pathToInlineSvg;

		config.module.rules.push({
			test: /\.svg$/,
			include: pathToInlineSvg,
			use: [{
				loader: '@svgr/webpack',
				options: {
					icon: true,
				},
			}],
		});

		config.resolve.modules = [
			...(config.resolve.modules || []),
			path.resolve(__dirname, "../src"),
		];

		// Return the altered config
		return config;
	},
};
