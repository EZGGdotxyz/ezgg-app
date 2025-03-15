declare namespace API {
  type getBalanceFindBalanceParams = {
    platform: 'ETH' | 'SOLANA';
    chainId: number;
    /** 货币符号：USD/HKD/CNY */
    currency?: string;
    /** 代币合约地址 */
    address: string;
  };

  type getBalanceListBalanceParams = {
    platform: 'ETH' | 'SOLANA';
    chainId: number;
    /** 货币符号：USD/HKD/CNY */
    currency?: string;
    /** 是否支持手续费 */
    feeSupport?: boolean;
  };

  type getInfrastructureListBlockchainParams = {
    /** 区块链平台: ETH 以太坊；SOLANA Solana; */
    platform: 'ETH' | 'SOLANA';
    /** 区块链网路类型：MAIN 主网；TEST 测试网；DEV 开发网 */
    network?: 'MAIN' | 'TEST' | 'DEV';
  };

  type getInfrastructureListBusinessContractParams = {
    /** 区块链平台: ETH 以太坊；SOLANA Solana; */
    platform: 'ETH' | 'SOLANA';
    /** 区块链id */
    chainId?: number;
    /** 区块链网路类型：MAIN 主网；TEST 测试网；DEV 开发网 */
    network?: 'MAIN' | 'TEST' | 'DEV';
  };

  type getInfrastructureListTokenContractParams = {
    /** 区块链平台: ETH 以太坊；SOLANA Solana; */
    platform: 'ETH' | 'SOLANA';
    /** 区块链id */
    chainId?: number;
    /** 区块链网路类型：MAIN 主网；TEST 测试网；DEV 开发网 */
    network?: 'MAIN' | 'TEST' | 'DEV';
  };

  type getNotificationPageNotificationParams = {
    /** 页码，默认1 */
    page?: number;
    /** 每页记录数，默认30 */
    pageSize?: number;
    /** 通知主题枚举：GENERAL 普通通知；TRANS_UPDATE 交易状态更新；ALARM 欺诈或可疑活动报警；PAY_REQUEST 付款请求通知；CUSTOMER_SUPPORT 客户支持通知；BALANCE_ALARM 账户余额警报；SECURE_ALARM 安全警报；SUMMARY 每日或每周摘要；APP_UPDATE 应用程序更新与增强；SALES_PROMOTION 促销优惠与更新；SURVEY 参与调研； */
    subject?: string;
    /** 交易状态更新动作枚举：REQUEST_ACCEPTED 请求已接受；REQUEST_DECLINED 请求已拒绝；PAY_LINK_ACCEPTED PayLink已接受 */
    action?: string;
    /** 状态值：0 未读；1已读 */
    status?: number;
  };

  type getTransactionHistoryFindTransactionHistoryCodeTransactionCodeParams = {
    /** 交易编码 */
    transactionCode: string;
    /** 货币符号：USD/HKD/CNY */
    currency?: string;
  };

  type getTransactionHistoryFindTransactionHistoryIdParams = {
    /** 交易历史id */
    id: number;
    /** 货币符号：USD/HKD/CNY */
    currency?: string;
  };

  type getTransactionHistoryPageTransactionHistoryParams = {
    /** 页码，默认1 */
    page?: number;
    /** 每页记录数，默认30 */
    pageSize?: number;
    /** 货币符号：USD/HKD/CNY */
    currency?: string;
    /** 区块链平台: ETH 以太坊；SOLANA Solana; */
    platform?: 'ETH' | 'SOLANA';
    /** 区块链id */
    chainId?: number;
    /** 区块链网络：MAIN主网；TEST 测试网；DEV 开发网； */
    network?: 'MAIN' | 'TEST' | 'DEV';
    /** 代币符号 */
    tokenSymbol?: string;
    /** 交易分类 */
    transactionCategory?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW';
    /** 交易类型 */
    transactionType?:
      | 'SEND'
      | 'REQUEST'
      | 'DEPOSIT'
      | 'WITHDRAW'
      | 'PAY_LINK'
      | 'QR_CODE'
      | 'REQUEST_LINK'
      | 'REQUEST_QR_CODE';
    /** 收款人会员ID */
    receiverMemberId?: number;
    /** 交易哈希 */
    transactionHash?: string;
    /** 交易时间 - 开始 */
    transactionTimeFrom?: string;
    /** 交易时间 - 结束 */
    transactionTimeTo?: string;
    /** 搜索关键词 */
    search?: string;
    /** 交易主题：收入：INCOME; 支出：EXPEND； */
    subject?: 'INCOME' | 'EXPEND';
    /** 交易状态：PENDING 待支付；ACCEPTED 已支付；DECLINED 已拒绝； */
    transactionStatus?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  };

  type getUserFindUserIdIdParams = {
    /** 用户ID */
    id: number;
  };

  type getUserPageMemberParams = {
    /** 页码，默认1 */
    page?: number;
    /** 每页记录数，默认30 */
    pageSize?: number;
    /** 检索条件 */
    search?: string;
    /** 检索最近交易会员 */
    recent?: boolean;
  };

  type postNotificationUpdateNotificationStatusIdParams = {
    /** 通知ID */
    id: number;
  };
}
