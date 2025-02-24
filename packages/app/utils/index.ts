/*
 * @Date: 2024-07-09 11:22:59
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-24 17:53:49
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

export const formatDateTime = (date: Date | number) => {
  const d = dayjs(date);
  return d.format('MMM DD, YYYY • h:mm A');
};
