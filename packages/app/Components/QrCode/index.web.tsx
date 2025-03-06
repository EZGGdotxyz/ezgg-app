/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-05 14:43:52
 * @FilePath: /ezgg-app/packages/app/Components/QrCode/index.web.tsx
 */

import {XStack} from '@my/ui';
import QRCode from 'qrcode.react';

interface FeedbackProps {
  size: number;
  url: string;
}

export default function QrCode({size, url}: FeedbackProps) {
  return (
    <XStack>
      <QRCode
        value={url}
        size={size}
        level="H" // 容错率级别 Higher
        includeMargin={false}
        renderAs="svg" // 必须指定 SVG 模式
      />
    </XStack>
  );
}
