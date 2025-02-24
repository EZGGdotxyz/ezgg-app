/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-19 16:40:27
 * @FilePath: /snapx-nfc-app/packages/app/Components/QrCode/index.tsx
 */

import {XStack} from '@my/ui';
import QRCode from 'react-native-qrcode-svg';

interface QrCodeProps {
  size: number;
  url: string;
}

export default function QrCode({size, url}: QrCodeProps) {
  return (
    <XStack>
      <QRCode value={url} size={size} />
    </XStack>
  );
}
