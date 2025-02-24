import {app} from './../store/models/app';
/*
 * @Date: 2023-12-08 10:37:32
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-08 16:19:01
 * @FilePath: /snapx-nfc-app/packages/app/hooks/useResponse.ts
 */
import {Dispatch} from 'app/store';
import {getLanguage, getUserInfo, getUserToken, setLanguage} from 'app/utils/auth';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {Dimensions, Platform} from 'react-native';
import {useEffect} from 'react';
import {useRematchModel} from 'app/store/model';
import {appScale} from 'app/utils';

const UIWidth = 375;

export default function useResponse() {
  const {i18n} = useTranslation();
  const [app] = useRematchModel('app');
  // const px2dp = (px) => {
  //   const designWidth = 375;
  //   const appScale = Dimensions.get('window').width / designWidth;
  //   return Number(Math.round(px * appScale * 100) / 100);
  // };

  const responseHandling = (width: any, hight: any) => {
    return {
      width: appScale(width),
      height: appScale(hight),
    };
    return {
      width: width * ((app.appWidth > 768 ? 768 : app.appWidth) / UIWidth),
      height: hight * ((app.appWidth > 768 ? 768 : app.appWidth) / UIWidth),
    };
  };

  return {responseHandling};
}
