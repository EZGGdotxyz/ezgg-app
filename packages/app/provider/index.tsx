/*
 * @Date: 2023-12-07 15:49:22
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-10 16:31:31
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


  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <TamaguiProvider config={config} theme='light'  disableInjectCSS defaultTheme={'light'} {...rest}>
            <ToastProvider swipeDirection="horizontal" duration={2000}>
              <AppPage>{children}</AppPage>
              <CustomToast />
              <ToastViewport />
            </ToastProvider>
          </TamaguiProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
