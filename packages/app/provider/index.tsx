/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-01 16:14:21
 * @FilePath: /ezgg-app/packages/app/provider/index.tsx
 */
import {CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider, config} from '@my/ui';
import AppPage from 'app/Components/AppPage';
import 'app/locales/index';
import store from 'app/store/index';
import {Provider as ReduxProvider} from 'react-redux';
import {ToastViewport} from './ToastViewport';
import {WagmiProvider} from 'wagmi';
import wagmiConfig from 'app/config/wagmi';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const queryClient = new QueryClient();

export function Provider({children, ...rest}: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = 'light';

  return (
    <ReduxProvider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <TamaguiProvider config={config} disableInjectCSS defaultTheme={'light'} {...rest}>
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
              <AppPage>{children}</AppPage>
              <CustomToast />
              <ToastViewport />
            </ToastProvider>
          </TamaguiProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ReduxProvider>
  );
}
