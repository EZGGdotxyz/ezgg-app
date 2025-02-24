/*
 * @Date: 2023-12-18 16:09:28
 * @LastEditors: yosan
 * @LastEditTime: 2023-12-18 16:12:18
 * @FilePath: /snapx-nfc-app/packages/ui/src/block/windowing/index.tsx
 */
import { FlashList } from '@shopify/flash-list';

import { WindowingProps } from './shared';

export function Windowing<T>(props: WindowingProps<T>) {
  return <FlashList {...props} {...props.native} />;
}
