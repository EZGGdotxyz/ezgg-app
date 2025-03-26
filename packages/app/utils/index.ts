/*
 * @Date: 2024-07-09 11:22:59
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-26 10:07:40
 * @FilePath: /ezgg-app/packages/app/utils/index.ts
 */
import {scale as baseScale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Dimensions, Platform, PixelRatio} from 'react-native';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';
import {CurrencyList} from 'app/config';

// 比较当前设备和对照设备的屏幕宽高
function matchIOSScreenSize(screenWidth: number, screenHeight: number, screenW: number, screenH: number) {
  return (screenH == screenHeight && screenW == screenWidth) || (screenH == screenWidth && screenW == screenHeight);
}
// 根据iphoneX和iphone12的宽高，和当前设备宽高进行比较
export const isIphoneX = () => {
  return false;
  // iPhone X和iPhone XS
  const widthX = 375;
  const heightX = 812;
  // iPhone XR和iPhone XS Max
  const widthXSM = 414;
  const heightXSM = 896;
  // iPhone 12
  const width12 = 390;
  const height12 = 844;
  // iPhone 12 Max
  const width12Max = 430;
  const height12Max = 932;

  // 获取设备屏幕宽高
  const screenW = Dimensions.get('window').width;
  const screenH = Dimensions.get('window').height;
  return (
    matchIOSScreenSize(widthX, heightX, screenW, screenH) ||
    matchIOSScreenSize(widthXSM, heightXSM, screenW, screenH) ||
    matchIOSScreenSize(width12, height12, screenW, screenH) ||
    matchIOSScreenSize(width12Max, height12Max, screenW, screenH)
  );
};

/**
 * 判断日期是今天、昨天还是其他日期
 * @param date 日期对象或时间戳
 * @returns 返回「今天」、「昨天」或具体日期
 */

export const getRelativeDate = (date: any) => {
  const {t} = useTranslation();
  const targetDate = dayjs(date).startOf('day');
  const today = dayjs().startOf('day');
  const yesterday = today.subtract(1, 'day');

  if (targetDate.isSame(today)) {
    return t('home.today');
  } else if (targetDate.isSame(yesterday)) {
    return t('home.yesterday');
  } else {
    return targetDate.format('MMM DD, YYYY');
  }
};

export const formatDateTime = (date: any) => {
  const d = dayjs(date);
  return d.format('MMM DD, YYYY • h:mm A');
};

/**
 * 格式化数字，显示指定小数位数并用千分位分隔
 * @param num 需要格式化的数字
 * @param decimals 小数位数，默认为2位
 * @returns 格式化后的字符串，例如：1,234.56
 */
export const formatNumber = (num: number, decimals: number = 2) => {
  if (!num) return `0.${'0'.repeat(decimals)}`;

  // 处理小数位数
  const parts = num.toString().split('.');
  if (parts.length === 1) {
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  const integerPart = parts[0];
  let decimalPart = parts[1];

  // 规则2：超过指定小数位数直接截断，不四舍五入
  if (decimalPart.length > decimals) {
    decimalPart = decimalPart.slice(0, decimals);
  }

  // 规则3：移除末尾的0
  decimalPart = decimalPart.replace(/0+$/, '');

  // 如果小数部分为空，返回指定小数位数
  if (!decimalPart) {
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  // 组合整数和小数部分，并添加千分位
  const formattedInteger = Number(integerPart).toLocaleString('en-US');
  return `${formattedInteger}.${decimalPart}`;
};

/**
 * 截断文本，超出指定长度时显示省略号
 * @param text 需要截断的文本
 * @param maxLength 最大长度，默认为12
 * @returns 处理后的文本
 */
export const truncateText = (text: string, maxLength: number = 12) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '…';
};

// 截断地址
export const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// 获取货币信息
export const getCurrency = (currency: string) => {
  return CurrencyList.find((item) => item.label === currency);
};

// 处理历史列表结构
export const dealtHistoryList = (data): any[] => {
  if (!data || data.length === 0) return [];
  try {
    // 按日期分组处理数据
    const groupedData = data.reduce((acc, item) => {
      const date = dayjs(item.createAt).format('YYYY-MM-DD');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    // 转换为数组格式
    const formattedData = Object.entries(groupedData).map(([date, items]) => ({
      day: date,
      list: items,
    }));

    // 按日期倒序排序
    formattedData.sort((a, b) => dayjs(b.day).unix() - dayjs(a.day).unix());
    return formattedData;
  } catch (error) {
    return [];
  }
};

// 恢复历史列表结构
export const restoreHistoryList = (groupedData) => {
  if (!groupedData || groupedData.length === 0) return [];
  try {
    // 将所有日期组中的列表合并成一个数组
    const restoredData = groupedData.reduce((acc, group) => {
      if (group.list && Array.isArray(group.list)) {
        return [...acc, ...group.list];
      }
      return acc;
    }, []);

    // 按创建时间倒序排序，保持原始顺序
    restoredData.sort((a, b) => dayjs(b.createAt).unix() - dayjs(a.createAt).unix());

    return restoredData;
  } catch (error) {
    return [];
  }
};

// 获取用户子称呼
export const getUserSubName = (item) => {
  for (let index = 0; index < item?.memberLinkedAccount?.length; index++) {
    const element = item?.memberLinkedAccount[index];
    if (element?.type === 'phone') {
      return element?.search;
    }
    if (element?.type === 'email') {
      return element?.search;
    }
    if (element?.type === 'smart_wallet') {
      return truncateAddress(element?.search);
    }
  }
  return '';
};

// 格式化token数量
export const formatTokenAmount = (amount: string | number, decimals: number = 18) => {
  if (!amount) return '0.00';
  const value = Number(amount) / Math.pow(10, decimals);

  // 处理小数位数
  const parts = value.toString().split('.');
  if (parts.length === 1) {
    return value.toFixed(2); // 规则1：小于2位小数补0
  }

  const integerPart = parts[0];
  let decimalPart = parts[1];

  // 规则2：超过6位小数直接截断，不四舍五入
  if (decimalPart.length > 6) {
    decimalPart = decimalPart.slice(0, 6);
  }

  // 规则3：移除末尾的0
  decimalPart = decimalPart.replace(/0+$/, '');

  // 如果小数部分为空，返回两位小数
  if (!decimalPart) {
    return value.toFixed(2);
  }

  return `${integerPart}.${decimalPart}`;
};

// 添加金额转换工具函数
export const convertAmountToTokenDecimals = (amount: string, decimals: number): string => {
  try {
    // 移除金额中的所有逗号
    const cleanAmount = amount.replace(/,/g, '');
    // 将字符串转换为数字
    const amountNumber = parseFloat(cleanAmount);
    // 计算转换后的值 (amount * 10^decimals)
    const multiplier = Math.pow(10, decimals);
    const convertedAmount = (amountNumber * multiplier).toString();
    // 移除可能的小数点和尾随的零
    return convertedAmount.split('.')[0];
  } catch (error) {
    console.error('金额转换错误:', error);
    return '0';
  }
};

export const formatCurrencyAmount = (tokenSymbol: any, tokenAmount: any, currencyAmount: any, currency: any) => {
  if (tokenSymbol === 'HKC' && currency === 'HKD') {
    return formatNumber(Number(tokenAmount));
  } else {
    return formatNumber(Number(currencyAmount));
  }
};
