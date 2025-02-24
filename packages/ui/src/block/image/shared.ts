/*
 * @Date: 2023-12-18 16:09:28
 * @LastEditors: yosan
 * @LastEditTime: 2024-01-12 15:45:47
 * @FilePath: /snapx-nfc-app/packages/ui/src/block/image/shared.ts
 */
import {ComponentProps} from 'react';
import {Image as TamaguiImage} from 'tamagui';

export interface AppImageProps {
  native?: ComponentProps<typeof TamaguiImage>;
  web?: any;
  type?: string;
}
