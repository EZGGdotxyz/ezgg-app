/*
 * @Date: 2023-12-08 16:25:15
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-06 12:41:45
 * @FilePath: /ezgg-app/packages/app/Components/PermissionPage/index.web.tsx
 */
import {Button, Paragraph, YStack} from '@my/ui';
import {PrimaryColor} from 'app/config';
import {useRematchModel} from 'app/store/model';
import {useEffect} from 'react';
import {createParam} from 'solito';
import {useLink} from 'solito/link';
import {useRouter} from 'solito/router';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import {getUserToken} from 'app/utils/auth';
import {SafeAreaView, View, useColorScheme} from 'react-native';

interface PermissionPageProps {
  children?: React.ReactNode;
  isLoginPage?: boolean;
  isHomePage?: boolean;
}

export default function PermissionPage(props: PermissionPageProps) {
  const {isLoginPage = false, isHomePage = false} = props;
  const dispatch = useDispatch<Dispatch>();
  // const {params} = useParams();
  const [app] = useRematchModel('app');
  const {replace} = useRouter();

  const checkUserPermission = async () => {
    const token: any = await getUserToken();
    setTimeout(() => {
      if (!token) {
        if (!isLoginPage) {
          dispatch.user.locallyLogout();
          if (!isHomePage) {
            replace('/');
          }
        }
      } else {
        if (isLoginPage && !isHomePage) {
          replace('/');
        }
      }
    });
    // const res=await dispatch.user.checkUserPermission();
    // console.log('🚀 ~ checkUserPermission ~ res', res)
  };

  useEffect(() => {
    checkUserPermission();
  }, [isLoginPage, isHomePage]);

  return (
    <View
      id="appPage"
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        position: 'relative',
        // maxHeight: app.appHeight,
        // maxWidth: 768,
      }}
    >
      {props.children}
    </View>
  );
}
