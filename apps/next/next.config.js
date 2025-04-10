/*
 * @Date: 2024-01-10 16:44:53
 * @LastEditors: error: git config user.name & please set dead value or install git
 * @LastEditTime: 2025-03-26 22:48:06
 * @FilePath: /ezgg-app/apps/next/next.config.js
 */
/** @type {import('next').NextConfig} */
const {withTamagui} = require('@tamagui/next-plugin');
const {join} = require('path');
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

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
  // 配置 PWA，适配静态导出模式
  return withPWA({
    dest: 'crypto-transfer-frontend', // 改为与 distDir 相同的目录
    register: true,
    skipWaiting: true,
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    buildExcludes: [/middleware-manifest\.json$/],
    // 添加以下配置以支持静态导出
    fallbacks: {
      document: '/404.html'
    },
    // 确保生成的 service worker 文件在正确的位置
    sw: 'service-worker.js',
    publicExcludes: ['!noprecache/**/*', '!.well-known/**/*']
  })(config);
};


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "it-0k",
    project: "javascript-nextjs",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
