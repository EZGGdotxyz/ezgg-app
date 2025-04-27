/*
 * @Date: 2025-02-28 15:17:12
 * @LastEditors: yosan
 * @LastEditTime: 2025-04-27 09:53:42
 * @FilePath: /ezgg-app/packages/app/config/wagmi.ts
 */
import {createConfig, http} from 'wagmi';
import {
  base,
  baseSepolia,
  polygon,
  polygonAmoy,
  bsc,
  bscTestnet,
  arbitrum,
  arbitrumSepolia,
  monadTestnet,
  scroll,
  scrollSepolia,
} from 'wagmi/chains';

// import {createConfig} from '@privy-io/wagmi';

import {createClient} from 'viem';
import {injected, metaMask, safe, walletConnect} from 'wagmi/connectors';
import {NETWORK} from '.';

const projectId = 'e2a7b198dd86bf327980143954b10234';

const config = createConfig({
  // chains: [base, polygon, bsc],
  chains:
    NETWORK === 'MAIN'
      ? [base, polygon, bsc, arbitrum, monadTestnet, scroll]
      : [baseSepolia, polygonAmoy, bscTestnet, arbitrumSepolia, monadTestnet, scrollSepolia],
  client({chain}) {
    return createClient({chain, transport: http()});
  },
  connectors: [safe(), walletConnect({projectId})],
  // transports: {
  //   [mainnet.id]: http(),
  //   [bsc.id]: http(),
  //   [polygon.id]: http(),
  //   [base.id]: http(),
  // },
});

export default config;
