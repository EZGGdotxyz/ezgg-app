declare namespace API {
  type getBalanceFindBalanceParams = {
    platform: 'ETH' | 'SOLANA';
    chainId: number;
    /** 货币符号：usd/hkd/cny */
    currency: string;
    /** 代币合约地址 */
    address: string;
  };

  type getBalanceListBalanceParams = {
    platform: 'ETH' | 'SOLANA';
    chainId: number;
    /** 货币符号：usd/hkd/cny */
    currency: string;
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

  type getTransactionHistoryFindTransactionHistoryCodeTransactionCodeParams = {
    /** 交易编码 */
    transactionCode: string;
  };

  type getTransactionHistoryFindTransactionHistoryIdParams = {
    /** 交易历史id */
    id: number;
  };

  type getTransactionHistoryPageTransactionHistoryParams = {
    /** 页码，默认1 */
    page?: number;
    /** 每页记录数，默认30 */
    pageSize?: number;
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
    transactionType?: 'SEND' | 'REQUEST' | 'DEPOSIT' | 'WITHDRAW' | 'PAY_LINK' | 'QR_CODE';
    /** 收款人会员ID */
    receiverMemberId?: number;
    /** 交易哈希 */
    transactionHash?: string;
    /** 交易时间 - 开始 */
    transactionTimeFrom?: string;
    /** 交易时间 - 结束 */
    transactionTimeTo?: string;
  };

  type getUserPageMemberParams = {
    /** 页码，默认1 */
    page?: number;
    /** 每页记录数，默认30 */
    pageSize?: number;
    /** 检索条件 */
    search?: string;
  };
}
