/*
 * @Date: 2023-12-18 16:21:05
 * @LastEditors: yosan
 * @LastEditTime: 2024-01-12 17:56:19
 * @FilePath: /snapx-nfc-app/packages/ui/src/block/externalLink/index.web.tsx
 */
import { ComponentProps } from 'react';
import { Link } from 'solito/link';

export function ExternalLink(props: ComponentProps<typeof Link>) {
  return <Link target="_blank" {...props} />;
}
