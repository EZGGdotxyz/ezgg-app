/*
 * @Date: 2023-12-08 10:37:32
 * @LastEditors: yosan
 * @LastEditTime: 2025-02-27 23:27:31
 * @FilePath: /ezgg-app/packages/app/hooks/useRequest.ts
 */
import {useToastController} from '@my/ui';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'app/store';
import {useRouter} from 'solito/router';
import {usePrivy} from '@privy-io/react-auth';
import {useCallback, useRef} from 'react';

// 定义API响应类型
interface ApiResponse<T = any> {
  code?: string;
  msg?: string;
  data?: T;
}

// 定义错误响应类型
interface ErrorResponse {
  response?: {
    data?: {
      code?: string;
      msg?: string;
    };
    status?: number;
  };
  message?: string;
}

// 定义请求配置类型
interface RequestConfig {
  timeout?: number;
  showErrorToast?: boolean;
  customErrorMsg?: string;
}

/**
 * 请求钩子，用于处理API请求和响应
 * 提供了统一的错误处理、超时控制和请求状态管理
 */
export default function useRequest() {
  const {t, i18n} = useTranslation();
  const toast = useToastController();
  const dispatch = useDispatch<Dispatch>();
  const {replace} = useRouter();
  const {logout} = usePrivy();

  // 用于存储请求取消控制器
  const abortControllerRef = useRef<AbortController | null>(null);

  // 错误提示常量
  const UNKNOWN_ERROR = t('tips.error.request.default');

  /**
   * 处理请求错误并显示提示
   * @param msg 错误信息
   * @param showErrorToast 是否显示错误提示
   * @param duration 提示显示时长(毫秒)
   */
  const handleRequestError = useCallback(
    (msg: string, showErrorToast = true, duration = 3000) => {
      if (showErrorToast) {
        toast.show(msg || UNKNOWN_ERROR, {
          duration,
        });
      }
      return null;
    },
    [toast, UNKNOWN_ERROR],
  );

  /**
   * 处理未授权错误
   * @param showErrorToast 是否显示错误提示
   * @returns null 表示请求处理失败
   */
  const handleUnauthorized = useCallback(
    async (showErrorToast = true): Promise<null> => {
      try {
        // 先登出Privy
        await logout();
        // 清除本地用户状态
        dispatch.user.locallyLogout();

        // 重定向到登录页面
        replace({
          pathname: '/login',
        });
      } catch (error) {
        console.error('登出失败:', error);
        // 即使登出失败，也清除本地状态并重定向
        dispatch.user.locallyLogout();
        replace({
          pathname: '/login',
        });
      }

      return handleRequestError(i18n.t('tips.error.request.unauthorized'), showErrorToast);
    },
    [logout, dispatch, replace, handleRequestError, i18n],
  );

  /**
   * 取消当前请求
   */
  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  /**
   * 发起请求并处理响应
   * @param req 请求Promise或请求函数
   * @param config 请求配置
   * @returns 处理后的响应数据
   */
  const makeRequest = useCallback(
    async <T = any>(
      req: Promise<ApiResponse<T>> | ((signal?: AbortSignal) => Promise<ApiResponse<T>>),
      config: RequestConfig = {},
    ): Promise<T | null> => {
      // 默认配置
      const {timeout = 30000, showErrorToast = true, customErrorMsg} = config;

      // 如果有正在进行的请求，取消它
      cancelRequest();

      // 创建新的AbortController
      const controller = new AbortController();
      abortControllerRef.current = controller;

      // 设置超时
      const timeoutId =
        timeout > 0
          ? setTimeout(() => {
              controller.abort('请求超时');
            }, timeout)
          : null;

      try {
        // 处理请求参数，支持函数形式和Promise形式
        const promise = typeof req === 'function' ? req(controller.signal) : req;

        const res = await promise;

        // 清除超时定时器
        if (timeoutId) clearTimeout(timeoutId);

        // 成功响应
        if (res?.code === '0' && res) {
          return res as T;
        }

        // 未授权错误
        if (res?.code === '50401') {
          return handleUnauthorized(showErrorToast);
        }

        // 其他错误信息
        if (res?.msg) {
          console.error('请求错误:', res.msg);
          return handleRequestError(customErrorMsg || res.msg, showErrorToast);
        }

        // 无错误信息但非成功状态
        return handleRequestError(customErrorMsg || UNKNOWN_ERROR, showErrorToast);
      } catch (error) {
        // 清除超时定时器
        if (timeoutId) clearTimeout(timeoutId);

        const err = error as ErrorResponse;
        console.error('请求异常:', err);

        // 请求被取消
        if (err.name === 'AbortError') {
          return handleRequestError(customErrorMsg || '请求已取消', showErrorToast);
        }

        // 未授权错误
        if (err?.response?.data?.code === '50401') {
          return handleUnauthorized(showErrorToast);
        }

        // 服务器返回的错误信息
        if (err?.response?.data?.msg) {
          return handleRequestError(customErrorMsg || err.response.data.msg, showErrorToast);
        }

        // 默认错误
        return handleRequestError(customErrorMsg || i18n.t('tips.error.request.default'), showErrorToast);
      } finally {
        // 清除AbortController引用
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
      }
    },
    [handleRequestError, handleUnauthorized, UNKNOWN_ERROR, i18n, cancelRequest],
  );

  return {
    makeRequest,
    cancelRequest,
  };
}
