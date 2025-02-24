/*
 * @Date: 2023-12-18 16:09:28
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-08 16:30:48
 * @FilePath: /snapx-nfc-app/packages/ui/src/block/image/index.tsx
 */
import {forwardRef} from 'react';
import {View} from 'react-native';
import {Image as TamaguiImage} from 'tamagui';
import {Asset} from 'expo-asset';
import {AppImageProps} from './shared';

export const AppImage = forwardRef<any, any>(function Image({native, height, src, width, type}, ref) {
  const _native =
    type === 'local'
      ? {
          source: {
            height: native?.source?.height || height,
            width: native?.source?.width || width,
            uri: Asset.fromModule(native?.source.uri || src).uri,
          },
        }
      : {
          source: {
            height: native?.source?.height || height,
            width: native?.source?.width || width,
            uri: native?.source.uri || src,
          },
        };
  return (
    <View ref={ref}>
      <TamaguiImage {..._native} />
    </View>
  );
});
