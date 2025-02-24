/*
 * @Date: 2024-07-09 17:16:42
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-30 15:48:15
 * @FilePath: /snapx-nfc-app/apps/expo/babel.config.js
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', {jsxRuntime: 'automatic'}]],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['../..'],
          alias: {
            // define aliases to shorten the import paths
            app: '../../packages/app',
            '@my/ui': '../../packages/ui',
          },
          extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
        },
      ],
      // if you want reanimated support
      ...(process.env.EAS_BUILD_PLATFORM === 'android'
        ? []
        : [
            [
              '@tamagui/babel-plugin',
              {
                components: ['@my/ui', 'tamagui'],
                config: '../../packages/config/src/tamagui.config.ts',
              },
            ],
          ]),
      'react-native-reanimated/plugin',
    ],
  };
};
