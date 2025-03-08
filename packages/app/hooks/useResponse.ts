import {app} from './../store/models/app';
/*
 * @Date: 2023-12-08 10:37:32
 * @LastEditors: yosan 2207796112@qq.com
 * @LastEditTime: 2025-03-08 16:03:13
 * @FilePath: /ezgg-app/packages/app/hooks/useResponse.ts
 */
import {Dimensions, Platform, ScaledSize} from 'react-native';
import {useRematchModel} from 'app/store/model';

const UIWidth = 430;

export default function useResponse() {
  const [{appWidth}] = useRematchModel('app');

  const appScale = (width: number) => {
    // 使用存储的屏幕宽度，而不是每次重新获取
    // 计算比例尺寸
    const ratioSize = width * (appWidth / UIWidth);
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
