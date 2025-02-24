// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 获取低消规则 GET /nfc-sign-in-bounce-conditions/find-condition */
export async function nfcSignInBounceConditionsRouterFindCondition(options?: {
  [key: string]: any;
}) {
  return request<{ minimumSpendingAmount: string; minimumSpendingBonus: string }>(
    '/nfc-sign-in-bounce-conditions/find-condition',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 获取低消规则 GET /nfc-sign-in-bounce-conditions/find-condition */
export async function nfcSignInBounceConditionsRouterFindCondition2(options?: {
  [key: string]: any;
}) {
  return request<{ minimumSpendingAmount: string; minimumSpendingBonus: string }>(
    '/nfc-sign-in-bounce-conditions/find-condition',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 分页查询会员NFC签到低消规则 GET /nfc-sign-in-bounce-conditions/list-conditions */
export async function nfcSignInBounceConditionsRouterListConditions(options?: {
  [key: string]: any;
}) {
  return request<
    {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      minimumSpendingAmount?: string;
      minimumSpendingBonus?: number;
    }[]
  >('/nfc-sign-in-bounce-conditions/list-conditions', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页查询会员NFC签到低消规则 GET /nfc-sign-in-bounce-conditions/list-conditions */
export async function nfcSignInBounceConditionsRouterListConditions2(options?: {
  [key: string]: any;
}) {
  return request<
    {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      minimumSpendingAmount?: string;
      minimumSpendingBonus?: number;
    }[]
  >('/nfc-sign-in-bounce-conditions/list-conditions', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新低消规则 POST /nfc-sign-in-bounce-conditions/update-condition */
export async function nfcSignInBounceConditionsRouterUpdateCondition(
  body: {
    minimumSpendingAmount: number;
    minimumSpendingBonus: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ minimumSpendingAmount: string; minimumSpendingBonus: string }>(
    '/nfc-sign-in-bounce-conditions/update-condition',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 更新低消规则 POST /nfc-sign-in-bounce-conditions/update-condition */
export async function nfcSignInBounceConditionsRouterUpdateCondition2(
  body: {
    minimumSpendingAmount: number;
    minimumSpendingBonus: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ minimumSpendingAmount: string; minimumSpendingBonus: string }>(
    '/nfc-sign-in-bounce-conditions/update-condition',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 分页查询会员NFC签到低消规则 POST /nfc-sign-in-bounce-conditions/update-conditions */
export async function nfcSignInBounceConditionsRouterUpdateConditions(
  body: {
    /** NFC签到低消规则列表 */
    conditions: { minimumSpendingAmount?: number; minimumSpendingBonus?: number }[];
  },
  options?: { [key: string]: any },
) {
  return request<
    {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      minimumSpendingAmount?: string;
      minimumSpendingBonus?: number;
    }[]
  >('/nfc-sign-in-bounce-conditions/update-conditions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询会员NFC签到低消规则 POST /nfc-sign-in-bounce-conditions/update-conditions */
export async function nfcSignInBounceConditionsRouterUpdateConditions2(
  body: {
    /** NFC签到低消规则列表 */
    conditions: { minimumSpendingAmount?: number; minimumSpendingBonus?: number }[];
  },
  options?: { [key: string]: any },
) {
  return request<
    {
      id?: number;
      createBy?: number;
      updateBy?: number;
      createAt?: string;
      updateAt?: string;
      deleteAt?: number;
      brandId?: number;
      minimumSpendingAmount?: string;
      minimumSpendingBonus?: number;
    }[]
  >('/nfc-sign-in-bounce-conditions/update-conditions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
