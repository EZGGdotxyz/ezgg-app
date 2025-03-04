/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 15:19:58
 * @FilePath: /ezgg-app/packages/app/Components/CopyButton/index.web.tsx
 */
import {Button, Paragraph, XStack, useToastController} from '@my/ui';
import {useTranslation} from 'react-i18next';

export default function CopyButton(props: any) {
  const {text} = props;
  const toast = useToastController();
  const {t, i18n} = useTranslation();

  const onCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        // 优先使用现代 Clipboard API
        await navigator.clipboard.writeText(text);
      } else if (typeof window !== 'undefined') {
        // 降级方案：使用 textarea
        const textarea = document.createElement('textarea');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.value = text;

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Failed to copy text:', err);
          throw new Error('Copy failed');
        } finally {
          document.body.removeChild(textarea);
        }
      } else {
        throw new Error('Copy not supported');
      }

      toast.show(t('tips.explore.copy'), {
        duration: 3000,
      });
    } catch (error) {
      console.error('Copy error:', error);
      toast.show(t('tips.error.copyFailed'), {
        duration: 3000,
      });
    }
  };
  return (
    <Button {...props} onPress={onCopy}>
      {props.children}
    </Button>
  );
}
