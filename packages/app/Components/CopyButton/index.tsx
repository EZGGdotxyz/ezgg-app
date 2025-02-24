/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-22 11:28:43
 * @FilePath: /snapx-nfc-app/packages/app/Components/CopyButton/index.tsx
 */
import {Button, Paragraph, XStack, useToastController} from '@my/ui';
import {PrimaryColor, SubColor} from 'app/config';
import {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import {useTranslation} from 'react-i18next';

interface CopyButtonProps {
  children?: React.ReactNode;
  text: any;
}

export default function CopyButton(props: any) {
  const {text} = props;
  const toast = useToastController();
  const {t, i18n} = useTranslation();

  const onCopy = async () => {
    await Clipboard.setStringAsync(text);
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
