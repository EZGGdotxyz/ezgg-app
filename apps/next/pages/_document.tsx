/*
 * @Date: 2024-01-10 16:56:27
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-11 14:04:58
 * @FilePath: /ezgg-app/apps/next/pages/_document.tsx
 */
import {config} from '@my/ui';
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
          <meta name="apple-itunes-app" content="app-id=6477260172" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
          <script>eruda.init();</script>
        </body>
      </Html>
    );
  }
}
