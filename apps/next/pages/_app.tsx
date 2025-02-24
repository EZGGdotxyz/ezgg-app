/*
 * @Date: 2023-12-26 14:21:05
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-19 10:15:06
 * @FilePath: /ezgg-app/apps/next/pages/_app.tsx
 */
import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '../style/global.css';
import '../style/react-photo-view.css';
import '@tamagui/font-inter/css/700.css';
import 'raf/polyfill';

import {NextThemeProvider, useRootTheme} from '@tamagui/next-theme';
import i18n from 'app/locales/index';
import {Provider} from 'app/provider';
import Head from 'next/head';
import React, {useEffect} from 'react';
import type {SolitoAppProps} from 'solito';
i18n.language;
if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css');
}

function MyApp({Component, pageProps}: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Bitenet</title>
        <meta name="description" content="Bitenet" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
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
