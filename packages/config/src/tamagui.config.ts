/*
 * @Date: 2024-01-10 16:44:53
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-10 17:24:51
 * @FilePath: /ezgg-app/packages/config/src/tamagui.config.ts
 */
import {createTamagui} from 'tamagui';
import {createInterFont} from '@tamagui/font-inter';
import {shorthands} from '@tamagui/shorthands';
import {tokens} from '@tamagui/themes/v2';
import {themes} from '@tamagui/themes/v2-themes';
import {createMedia} from '@tamagui/react-native-media-driver';

import {animations} from '@my/ui/src/animations';

const headingFont = createInterFont({
  size: {
    6: 15,
  },
  transform: {
    6: 'uppercase',
    7: 'none',
  },
  weight: {
    6: '400',
    7: '700',
  },
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    15: -6,
  },
  face: {
    700: {normal: 'InterBold'},
  },
});

const bodyFont = createInterFont(
  {
    face: {
      700: {normal: 'InterBold'},
    },
  },
  {
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => Math.round(size * 1.1 + (size > 20 ? 10 : 10)),
  },
);

export const config = createTamagui({
  defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  onlyAllowShorthands: true,
  shorthands,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  settings: {
    allowedStyleValues: 'somewhat-strict',
  },
  themes: {
    ...themes,

    light: {
      ...themes.light,
      background: '#fff',
      background2: '#f8f8f8',
    },
    dark: {
      ...themes.light,
      background: '#fff',
      background2: '#f8f8f8',
    },
  },
  tokens: {
    ...tokens,
  },
  media: createMedia({
    xs: {maxWidth: 660},
    sm: {maxWidth: 800},
    md: {maxWidth: 1020},
    lg: {maxWidth: 1280},
    xl: {maxWidth: 1420},
    xxl: {maxWidth: 1600},
    gtXs: {minWidth: 660 + 1},
    gtSm: {minWidth: 800 + 1},
    gtMd: {minWidth: 1020 + 1},
    gtLg: {minWidth: 1280 + 1},
    short: {maxHeight: 820},
    tall: {minHeight: 820},
    hoverNone: {hover: 'none'},
    pointerCoarse: {pointer: 'coarse'},
  }),
});

// for the compiler to find it
export default config;
