/*
 * @Date: 2025-03-17 21:58:18
 * @LastEditors: yosan
 * @LastEditTime: 2025-04-10 15:02:46
 * @FilePath: /ezgg-app/packages/app/utils/error.ts
 */
import {useToastController} from '@my/ui';
import {useTranslation} from 'react-i18next';

// 统一的错误处理方法
export const handleTransactionError = (error: any, toast: any, t: any) => {
  console.log('🚀 ~ handleTransactionError ~ error:', error);
  const errorMessage = error?.message || '';

  if (errorMessage.includes('The user rejected the request')) {
    toast.show(t('tips.error.userRejected'), {
      duration: 3000,
    });
  } else if (errorMessage.includes('insufficient allowance')) {
    toast.show(t('tips.error.insufficientAllowance'), {
      duration: 3000,
    });
  } else if (errorMessage.includes('insufficient balance')) {
    toast.show(t('tips.error.insufficientBalance'), {
      duration: 3000,
    });
  } else if (errorMessage.includes('Failed to create pay link')) {
    toast.show(t('tips.error.failedToCreatePayLink'), {
      duration: 3000,
    });
  } else if (errorMessage.includes('maxPriorityFeePerGas')) {
    toast.show(t('tips.error.gasFeeTooLow'), {
      duration: 3000,
    });
  } else {
    // 截取错误消息的前100个字符，并添加省略号
    const truncatedMessage = errorMessage.length > 100
      ? `${errorMessage.substring(0, 100)}...`
      : errorMessage;

    toast.show(truncatedMessage || t('tips.error.networkError'), {
      duration: 3000,
    });
  }
  throw error;
};
