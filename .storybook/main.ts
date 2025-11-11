import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../packages/shared-components/src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../apps/project-a/public'],
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@product-portal/types': path.resolve(__dirname, '../packages/types/src'),
        '@product-portal/constants': path.resolve(__dirname, '../packages/constants/src'),
        '@product-portal/shared-components': path.resolve(
          __dirname,
          '../packages/shared-components/src'
        ),
      };
      config.resolve.extensions = ['.tsx', '.ts', '.jsx', '.js'];
    }

    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      ],
    });

    return config;
  },
};

export default config;
