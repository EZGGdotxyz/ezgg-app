/*
 * @Date: 2024-01-10 16:56:27
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-31 21:27:40
 * @FilePath: /ezgg-app/apps/next/pages/_document.tsx
 */
import {config} from '@my/ui';
import { isRelease } from 'app/config';
import NextDocument, {DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript} from 'next/document';
import {Children} from 'react';
import {AppRegistry} from 'react-native';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    AppRegistry.registerComponent('Main', () => Main);
    const page = await ctx.renderPage();

    // @ts-ignore
    const {getStyleElement} = AppRegistry.getApplication('Main');

    /**
     * Note: be sure to keep tamagui styles after react-native-web styles like it is here!
     * So Tamagui styles can override the react-native-web styles.
     */
    const styles = [
      getStyleElement(),
      <style
        key="tamagui-css"
        dangerouslySetInnerHTML={{
          __html: config.getCSS({
            exclude: process.env.NODE_ENV === 'development' ? null : 'design-system',
          }),
        }}
      />,
    ];

    return {...page, styles: Children.toArray(styles)};
  }

  render() {
    return (
      <Html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="application-name" content="EZGG" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="EZGG" />
          <meta name="description" content="The EZiest self-custodial wallet log in with email / number. send and request crypto with a link, without worrying gas" />
          <meta name="keywords" content="EZGG,Crypto,Link,Wallet,Self-custodial,USDT,USDC" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon/web-app-manifest-192x192.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {!isRelease && (
            <>
              <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
              <script>eruda.init();</script>
            </>
          )}
        </body>
      </Html>
    );
  }
}
