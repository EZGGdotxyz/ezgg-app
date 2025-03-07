/*
 * @Date: 2023-12-26 14:21:05
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-07 13:52:41
 * @FilePath: /ezgg-app/apps/next/pages/_app.tsx
 */
import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '../style/global.css';
import '../style/react-photo-view.css';
import '@tamagui/font-inter/css/700.css';
import 'raf/polyfill';
import {AppName, PrimaryColor} from 'app/config';

import {NextThemeProvider, useRootTheme} from '@tamagui/next-theme';
import i18n from 'app/locales/index';
import {Provider} from 'app/provider';
import Head from 'next/head';
import React, {useEffect} from 'react';
import type {SolitoAppProps} from 'solito';
import {useColorScheme} from 'react-native';
import {SmartWalletsProvider} from '@privy-io/react-auth/smart-wallets';
import {PrivyProvider} from '@privy-io/react-auth';
i18n.language;
if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css');
}
// require('../public/tamagui.css');

function MyApp({Component, pageProps}: SolitoAppProps) {
  // 设置 body 字体大小（防止继承影响）
  const setBodyFontSize = () => {
    const dpr = window.devicePixelRatio || 1;
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + 'px';
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize);
    }
  };

  // 设置根字体大小
  const setRemUnit = () => {
    const docEl = document.documentElement;
    // 假设设计稿宽度为 750px（根据实际项目修改）
    const designWidth = 860;
    const rem = docEl.clientWidth / (designWidth / 10);
    docEl.style.fontSize = rem + 'px';
  };

  // 初始化屏幕缩放
  const setViewportScale = () => {
    const dpr = window.devicePixelRatio || 1;
    const metaEl = document.querySelector('meta[name="viewport"]');
    const content = `
      initial-scale=${1 / dpr},
      maximum-scale=${1 / dpr},
      minimum-scale=${1 / dpr},
      user-scalable=no
    `;
    if (!metaEl) {
      document.write(`<meta name="viewport" content="${content}">`);
    } else {
      metaEl.setAttribute('content', content);
    }
  };

  useEffect(() => {
    // 初始化
    // setViewportScale();
    // setRemUnit();
    // setBodyFontSize();

    // // 监听窗口变化
    // window.addEventListener('resize', setRemUnit);
    // window.addEventListener('pageshow', (e) => {
    //   if (e.persisted) setRemUnit();
    // });
  }, []);

  return (
    <>
      <Head>
        <title>{AppName}</title>
        <meta name="description" content={AppName} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <PrivyProvider
        appId="cm74gcbre00h972np2f6bdut8"
        config={{
          loginMethods: ['email', 'google', 'sms', 'wallet'],
          appearance: {
            logo: '/images/logo.png',
            theme: 'light',
            accentColor: PrimaryColor,
          },
          embeddedWallets: {
            createOnLogin: 'all-users',
          },
          // useFirstPartyCookies:true
        }}
      >
        <SmartWalletsProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </SmartWalletsProvider>
      </PrivyProvider>
    </>
  );
}

function ThemeProvider({children}: {children: React.ReactNode}) {
  const [theme, setTheme] = useRootTheme();

  return (
    <NextThemeProvider
    // onChangeTheme={(next) => {
    //   setTheme(next as any);
    // }}
    >
      <Provider disableRootThemeClass defaultTheme={theme}>
        {children}
      </Provider>
    </NextThemeProvider>
  );
}

export default MyApp;
