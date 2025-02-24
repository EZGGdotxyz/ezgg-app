// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 获取签到折线图(统计每天) GET /statistics/get-daily-sign-in-line-chart */
export async function statisticsRouterGetDailySignInLineChartInputs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.statisticsRouterGetDailySignInLineChartInputsParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: { date?: string; recordCount?: number }[];
  }>('/statistics/get-daily-sign-in-line-chart', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 30
      pageSize: '30',

      ...params,
    },
    ...(options || {}),
  });
}

/** 获取签到折线图(统计每天) GET /statistics/get-daily-sign-in-line-chart */
export async function statisticsRouterGetDailySignInLineChartInputs2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.statisticsRouterGetDailySignInLineChartInputsParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: { date?: string; recordCount?: number }[];
  }>('/statistics/get-daily-sign-in-line-chart', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 30
      pageSize: '30',

      ...params,
    },
    ...(options || {}),
  });
}

/** 获取签到折线图 GET /statistics/get-sign-in-line-chart */
export async function statisticsRouterGetSignInLineChart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.statisticsRouterGetSignInLineChartParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: { year?: number; month?: number; recordCount?: string }[];
  }>('/statistics/get-sign-in-line-chart', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 30
      pageSize: '30',

      ...params,
    },
    ...(options || {}),
  });
}

/** 获取签到折线图 GET /statistics/get-sign-in-line-chart */
export async function statisticsRouterGetSignInLineChart2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.statisticsRouterGetSignInLineChartParams,
  options?: { [key: string]: any },
) {
  return request<{
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    record: { year?: number; month?: number; recordCount?: string }[];
  }>('/statistics/get-sign-in-line-chart', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 30
      pageSize: '30',

      ...params,
    },
    ...(options || {}),
  });
}

/** 获取汇总统计 GET /statistics/get-statistics-summary */
export async function statisticsRouterGetStatisticsSummary(options?: { [key: string]: any }) {
  return request<{
    totalSnap: number;
    weekSnap: number;
    lastWeekSnap: number;
    snapPercentage: string;
    totalSignInCount: number;
    weekSignInCount: number;
    lastWeekSignInCount: number;
    signInCountPercentage: string;
    balance: number;
  }>('/statistics/get-statistics-summary', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取汇总统计 GET /statistics/get-statistics-summary */
export async function statisticsRouterGetStatisticsSummary2(options?: { [key: string]: any }) {
  return request<{
    totalSnap: number;
    weekSnap: number;
    lastWeekSnap: number;
    snapPercentage: string;
    totalSignInCount: number;
    weekSignInCount: number;
    lastWeekSignInCount: number;
    signInCountPercentage: string;
    balance: number;
  }>('/statistics/get-statistics-summary', {
    method: 'GET',
    ...(options || {}),
  });
}
