/*
 * @Date: 2023-12-08 10:37:32
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 17:28:19
 * @FilePath: /ezgg-app/packages/app/hooks/useRequest.ts
 */
import {useToastController} from '@my/ui';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import {useRouter} from 'solito/router';
import {createParam} from 'solito';

const {useParams} = createParam<any>();

export default function useRequest() {
  const {t, i18n} = useTranslation();
  const toast = useToastController();
  const dispatch = useDispatch<Dispatch>();
  const {replace} = useRouter();
  // const {params} = useParams();

  //错误提示
  const UNKNOWN_ERROR = t('tips.error.request.default');
  // 请求错误处理
  const RequestError = (msg: string, isErrorToast = true) => {
    if (isErrorToast) {
      toast.show(msg || UNKNOWN_ERROR, {
        duration: 3000,
        // message: 'Just showing how toast works...',
      });
    }
    const error = new Error(msg || UNKNOWN_ERROR) as Error & {code: any};
    return null;
  };

  const makeRequest = async (req: any) => {
    return Promise.resolve(req)
      .then((res) => {
        if (res?.code==='0' && res) {
          // Callback(res);
          return res;
        } else {
          if (res?.msg) {
            // if (data?.errCode === '21005' || data?.errCode === '21004' || data?.errCode === '21006') {
            //   window?.myEvent?.emit('locallyLogout');
            // } else {
            //   return RequestError(data?.errMessage);
            // }
            return RequestError(res?.msg);
          }
        }
      })
      .catch((error) => {
        if (error?.response?.data?.code === 'UNAUTHORIZED') {
          dispatch.user.locallyLogout();
          replace({
            pathname: '/login',
            // query: {
            //   ...params,
            // },
          });
          return RequestError(i18n.t('tips.error.request.unauthorized'));
        }
        if (error?.response?.data?.msg) {
          return RequestError(error?.response?.data?.msg);
        }
        // switch (error?.response?.status) {
        //   case 400:
        //     return RequestError(i18n.t('tips.error.request.400'));
        //     break;
        //   case 401:
        //     return RequestError(i18n.t('tips.error.request.401'));
        //     break;
        //   case 403:
        //     return RequestError(i18n.t('tips.error.request.402'));
        //     break;
        //   case 404:
        //     return RequestError(i18n.t('tips.error.request.403'));
        //     break;
        //   case 500:
        //     return RequestError(i18n.t('tips.error.request.500'));
        //     break;
        //   case 501:
        //     return RequestError(i18n.t('tips.error.request.501'));
        //     break;
        //   case 502:
        //     return RequestError(i18n.t('tips.error.request.502'));
        //     break;
        //   case 503:
        //     return RequestError(i18n.t('tips.error.request.503'));
        //     break;
        //   case 504:
        //     return RequestError(i18n.t('tips.error.request.504'));
        //     break;
        //   default:
        //     return RequestError(i18n.t('tips.error.request.default'));
        // }
        return RequestError(i18n.t('tips.error.request.default'));
      });

    // try {
    //   const res = await req(prams);

    // } catch (error) {}
  };

  return {
    makeRequest,
  };
}
