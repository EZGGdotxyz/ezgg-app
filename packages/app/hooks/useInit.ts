/*
 * @Date: 2023-12-08 10:37:32
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-04 15:12:54
 * @FilePath: /ezgg-app/packages/app/hooks/useInit.ts
 */
import useResponse from './useResponse';

// 为了保证兼容性，将 useInit 重定向到 useResponse
export default function useInit() {
  const {
    initApp,
    getInfrastructureList,
    getBalanceList
  } = useResponse();

  return {
    _init: initApp,
    _getInfrastructureListBlockchain: getInfrastructureList,
    _getBalanceListBalance: getBalanceList
  };
}
