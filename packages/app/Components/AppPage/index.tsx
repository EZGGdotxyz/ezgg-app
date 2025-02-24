/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: snapxlabs
 * @LastEditTime: 2024-07-08 16:09:38
 * @FilePath: /snapx-nfc-app/packages/app/Components/AppPage/index.tsx
 */
import {View, YStack} from '@my/ui';
import useInit from 'app/hooks/useInit';
import {Dispatch} from 'app/store/index';
import {useRematchModel} from 'app/store/model';
import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
interface AppPageProps {
  children: React.ReactNode;
}

export default function AppPage(props: AppPageProps) {
  useInit();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return domLoaded && props.children;
}
