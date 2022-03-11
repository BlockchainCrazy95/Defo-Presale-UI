import { InjectedConnector } from '@web3-react/injected-connector';
export const injected = new InjectedConnector({
  supportedChainIds: [
      43113, // Avalanche Testnet
      43114  // Avalanche Mainnet
    ],
})