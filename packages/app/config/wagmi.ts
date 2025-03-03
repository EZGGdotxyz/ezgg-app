/*
 * @Date: 2025-02-28 15:17:12
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-01 17:57:04
 * @FilePath: /ezgg-app/packages/app/config/wagmi.ts
 */
import {createConfig, http} from 'wagmi';
import {bsc, polygon, base, baseSepolia, polygonAmoy, bscTestnet} from 'wagmi/chains';

import {createClient} from 'viem';
import {injected, metaMask, safe, walletConnect} from 'wagmi/connectors';

const projectId = 'e2a7b198dd86bf327980143954b10234';

const config = createConfig({
  // chains: [base, polygon, bsc],
  chains: [baseSepolia, polygonAmoy, bscTestnet],
  client({chain}) {
    return createClient({chain, transport: http()});
  },
  connectors: [injected(), metaMask(), safe()],
  // transports: {
  //   [mainnet.id]: http(),
  //   [bsc.id]: http(),
  //   [polygon.id]: http(),
  //   [base.id]: http(),
  // },
});

export default config;
