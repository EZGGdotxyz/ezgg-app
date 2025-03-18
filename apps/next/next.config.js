/*
 * @Date: 2024-01-10 16:44:53
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-18 13:21:41
 * @FilePath: /ezgg-app/apps/next/next.config.js
 */
/** @type {import('next').NextConfig} */
const {withTamagui} = require('@tamagui/next-plugin');
const {join} = require('path');

const boolVals = {
  true: true,
  false: false,
};

const disableExtraction = boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development';

// console.log(`

// Welcome to Tamagui!

// You can update this monorepo to the latest Tamagui release just by running:

// yarn upgrade:tamagui

// We've set up a few things for you.

// See the "excludeReactNativeWebExports" setting in next.config.js, which omits these
// from the bundle: Switch, ProgressBar Picker, CheckBox, Touchable. To save more,
// you can add ones you don't need like: AnimatedFlatList, FlatList, SectionList,
// VirtualizedList, VirtualizedSectionList.

// 🐣

// Remove this log in next.config.js.

// `);

const plugins = [
  withTamagui({
    config: '../../packages/config/src/tamagui.config.ts',
    components: ['tamagui', '@my/ui'],
    importsWhitelist: ['constants.js', 'colors.js'],
    outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
    logTimings: true,
    disableExtraction,
    shouldExtract: (path) => {
      if (path.includes(join('packages', 'app'))) {
        return true;
      }
    },
    excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],
  }),
];

module.exports = function () {
  /** @type {import('next').NextConfig} */
  let config = {
    typescript: {
      ignoreBuildErrors: true,
    },
    output: 'export',
    distDir: 'crypto-transfer-frontend',
    // assetPrefix: '/mobile', //加前缀
    // basePath: '/mobile', //node
    modularizeImports: {
      '@tamagui/lucide-icons': {
        transform: `@tamagui/lucide-icons/dist/esm/icons/{{kebabCase member}}`,
        skipDefaultConversion: true,
      },
    },
    transpilePackages: ['solito', 'react-native-web', 'expo-linking', 'expo-constants', 'expo-modules-core'],
    experimental: {
      scrollRestoration: true,
    },
    // 添加跨域配置
    // async headers() {
    //   return [
    //     {
    //       source: '/api/:path*',
    //       headers: [
    //         { key: 'Access-Control-Allow-Credentials', value: 'true' },
    //         { key: 'Access-Control-Allow-Origin', value: '*' },
    //         { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
    //         { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
    //       ],
    //     },
    //   ];
    // },
    // 添加代理配置（如果需要）
    // async rewrites() {
    //   return [
    //     {
    //       source: '/api/:path*',
    //       destination: `${'https://api.ezgg.xyz'}/:path*`,
    //       // source: '/api',
    //       // destination: 'https://4ba43b97.r6.cpolar.top', // 替换为您的实际API域名
    //       // rewrite: (path) => path.replace(/^\/api/, ''),
    //     },
    //   ];
    // },
  };

  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    };
  }

  return config;
};
