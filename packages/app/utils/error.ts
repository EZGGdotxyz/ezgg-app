/*
 * @Date: 2025-03-17 21:58:18
 * @LastEditors: yosan
 * @LastEditTime: 2025-04-08 15:40:30
 * @FilePath: /ezgg-app/packages/app/utils/error.ts
 */
import {useToastController} from '@my/ui';
import {useTranslation} from 'react-i18next';

// 统一的错误处理方法
export const handleTransactionError = (error: any, toast: any, t: any) => {
  console.log('🚀 ~ handleTransactionError ~ error:', error);
  if (error?.message.includes('The user rejected the request')) {
    toast.show(t('tips.error.userRejected'), {
      duration: 3000,
    });
  } else if (error?.message.includes('insufficient allowance')) {
    toast.show(t('tips.error.insufficientAllowance'), {
      duration: 3000,
    });
  } else if (error?.message.includes('insufficient balance')) {
    toast.show(t('tips.error.insufficientBalance'), {
      duration: 3000,
    });
  } else if (error?.message.includes('Failed to create pay link')) {
    toast.show(t('tips.error.failedToCreatePayLink'), {
      duration: 3000,
    });
  } else {
    toast.show(error?.message || t('tips.error.networkError'), {
      duration: 3000,
    });
  }
  throw error;
};
