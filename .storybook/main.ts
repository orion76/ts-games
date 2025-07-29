import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": [
    "../src/stories/**/*.stories.ts"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-styling-webpack"
  ],
  "framework": {
    "name": "@storybook/angular",
    "options": {}
  },
  "staticDirs": [{ from: '../public/fonts', to: '/fonts' }],
  "webpackFinal": async (config, options) => {
// console.log('[ZZZ]',options);
    return config;
  }
};
export default config;