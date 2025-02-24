/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-21 18:55:13
 * @FilePath: /ezgg-app/packages/app/provider/index.tsx
 */
import {CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider, config} from '@my/ui';
import AppPage from 'app/Components/AppPage';
import 'app/locales/index';
import {useColorScheme} from 'react-native';

import store from 'app/store/index';
import {Provider as ReduxProvider} from 'react-redux';
import {ToastViewport} from './ToastViewport';
import {PrivyProvider} from '@privy-io/react-auth';

export function Provider({children, ...rest}: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = 'light';

  return (
    <ReduxProvider store={store}>
      <TamaguiProvider config={config} disableInjectCSS defaultTheme={scheme === 'dark' ? 'dark' : 'light'} {...rest}>
        <ToastProvider
          swipeDirection="horizontal"
          duration={3000}
          native={
            [
              /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
              // 'mobile'
            ]
          }
        >
          <PrivyProvider
            appId="cm74gcbre00h972np2f6bdut8"
            config={{
              // Customize Privy's appearance in your app
              appearance: {
                theme: 'light',
                accentColor: '#676FFF',
                logo: 'https://your-logo-url',
              },
              // Create embedded wallets for users who don't have a wallet
              embeddedWallets: {
                createOnLogin: 'users-without-wallets',
              },
            }}
          >
            <AppPage>{children}</AppPage>
          </PrivyProvider>
          <CustomToast />
          <ToastViewport />
        </ToastProvider>
      </TamaguiProvider>
    </ReduxProvider>
  );
}
