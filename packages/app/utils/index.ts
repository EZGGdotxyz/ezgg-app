/*
 * @Date: 2024-07-09 11:22:59
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-25 14:11:06
 * @FilePath: /ezgg-app/packages/app/utils/index.ts
 */
import {scale as baseScale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Dimensions, Platform} from 'react-native';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';

export const appScale = (width: number) => baseScale((width * 350) / 430);

// 比较当前设备和对照设备的屏幕宽高
function matchIOSScreenSize(screenWidth: number, screenHeight: number, screenW: number, screenH: number) {
  return (screenH == screenHeight && screenW == screenWidth) || (screenH == screenWidth && screenW == screenHeight);
}
// 根据iphoneX和iphone12的宽高，和当前设备宽高进行比较
export const isIphoneX = () => {
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
 * 格式化数字，显示两位小数并用千分位分隔
 * @param num 需要格式化的数字
 * @returns 格式化后的字符串，例如：1,234.56
 */
export const formatNumber = (num: number) => {
  return Number(num).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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

export const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
