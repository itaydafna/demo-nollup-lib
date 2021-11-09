import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
	base: 'light',
	brandTitle: `Marketplace React (v${process.env.STORYBOOK_VERSION})`,
})

addons.setConfig({
	theme
});
