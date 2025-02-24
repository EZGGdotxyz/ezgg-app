/*
 * @Date: 2023-12-26 14:19:17
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-25 22:28:13
 * @FilePath: /snapx-nfc-app/packages/ui/src/block/image/index.web.tsx
 */
import {forwardRef} from 'react';

import {AppImageProps} from './shared';

export const AppImage = forwardRef<any, any>(function Image({width, height, src, web, type}, ref) {
  const _web =
    type === 'local'
      ? {
          height: web?.height || height,
          width: web?.width || width,
          src: web?.src?.default?.src || src?.default?.src,
        }
      : {
          height: web?.height || height,
          width: web?.width || width,
          src: src || web?.src,
        };

  return <img ref={ref} {..._web} />;
});
