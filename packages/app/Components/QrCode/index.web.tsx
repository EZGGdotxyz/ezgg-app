/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-19 16:39:22
 * @FilePath: /snapx-nfc-app/packages/app/Components/QrCode/index.web.tsx
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
      <QRCode value={url} size={size} />
    </XStack>
  );
}
