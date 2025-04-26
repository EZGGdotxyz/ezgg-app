/*
 * @Date: 2025-03-17 21:58:18
 * @LastEditors: yosan
 * @LastEditTime: 2025-04-10 15:42:29
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
  } else if (errorMessage.includes('execution reverted')) {
    // 合约执行回滚错误
    if (errorMessage.includes('ERC20: transfer amount exceeds balance')) {
      toast.show(t('tips.error.insufficientTokenBalance'), {
        duration: 3000,
      });
    } else if (errorMessage.includes('ERC20: transfer amount exceeds allowance')) {
      toast.show(t('tips.error.insufficientAllowance'), {
        duration: 3000,
      });
    } else if (errorMessage.includes('Ownable: caller is not the owner')) {
      toast.show(t('tips.error.notContractOwner'), {
        duration: 3000,
      });
    } else if (errorMessage.includes('Pausable: paused')) {
      toast.show(t('tips.error.contractPaused'), {
        duration: 3000,
      });
    } else {
      toast.show(t('tips.error.contractExecutionFailed'), {
        duration: 3000,
      });
    }
  } else if (errorMessage.includes('nonce too low')) {
    toast.show(t('tips.error.nonceTooLow'), {
      duration: 3000,
    });
  } else if (errorMessage.includes('already known')) {
    toast.show(t('tips.error.transactionAlreadyKnown'), {
      duration: 3000,
    });
  } else if (errorMessage.includes('replacement transaction underpriced')) {
    toast.show(t('tips.error.transactionUnderpriced'), {
      duration: 3000,
    });
  } else if (errorMessage.includes('intrinsic gas too low')) {
    toast.show(t('tips.error.gasTooLow'), {
      duration: 3000,
    });
  } else if (errorMessage.includes('gas required exceeds allowance')) {
    toast.show(t('tips.error.gasExceedsAllowance'), {
      duration: 3000,
    });
  } else if (errorMessage.includes('invalid opcode')) {
    toast.show(t('tips.error.invalidOpcode'), {
      duration: 3000,
    });
  } else if (errorMessage.includes('out of gas')) {
    toast.show(t('tips.error.outOfGas'), {
      duration: 3000,
    });
  } else if (errorMessage.includes('invalid sender')) {
    toast.show(t('tips.error.invalidSender'), {
      duration: 3000,
    });
  } else if (errorMessage.includes('invalid signature')) {
    toast.show(t('tips.error.invalidSignature'), {
      duration: 3000,
    });
  } else if (errorMessage.includes('transaction underpriced')) {
    toast.show(t('tips.error.transactionUnderpriced'), {
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
