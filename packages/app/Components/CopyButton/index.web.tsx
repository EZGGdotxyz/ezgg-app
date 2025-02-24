/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-22 11:33:13
 * @FilePath: /snapx-nfc-app/packages/app/Components/CopyButton/index.web.tsx
 */
import {Button, Paragraph, XStack, useToastController} from '@my/ui';
import {useTranslation} from 'react-i18next';

export default function CopyButton(props: any) {
  const {text} = props;
  const toast = useToastController();
  const {t, i18n} = useTranslation();

  const onCopy = async () => {
    // await Clipboard.setStringAsync(text);
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    toast.show(t('tips.explore.copy'), {
      duration: 3000,
      // message: 'Just showing how toast works...',
    });
  };
  return (
    <Button {...props} onPress={onCopy}>
      {props.children}
    </Button>
  );
}
