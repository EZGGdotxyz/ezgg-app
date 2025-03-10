import {app} from './../store/models/app';
/*
 * @Date: 2023-12-08 10:37:32
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-10 16:19:49
 * @FilePath: /ezgg-app/packages/app/hooks/useResponse.ts
 */
import {Dimensions, Platform, ScaledSize} from 'react-native';
import {useRematchModel} from 'app/store/model';

const UIWidth = 430;
const MAX_WIDTH = 430;

export default function useResponse() {
  const [{appWidth}] = useRematchModel('app');

  const appScale = (width: number) => {
    // 使用存储的屏幕宽度，但限制最大宽度为768px
    const effectiveWidth = Math.min(appWidth, MAX_WIDTH);
    // 计算比例尺寸
    const ratioSize = width * (effectiveWidth / UIWidth);
    return ratioSize;
  };

  const responseHandling = (width: any, height: any) => {
    return {
      width: appScale(width),
      height: appScale(height),
    };
  };

  return {
    // 响应式布局相关
    responseHandling,
    appScale,
  };
}
