import { ethers } from 'ethers';

export const supportChainId = Number(process.env.REACT_APP_CHAINID) || 4002;

const RPCS: any = {
  1: 'https://main-light.eth.linkpool.io/',
  250: 'https://rpc.ftm.tools/',
  4002: 'https://ftm-test.babylonswap.finance',
  1337: 'http://localhost:7545',
  31337: 'http://localhost:8545/',
};

const providers: any = {
  // 1: new ethers.providers.JsonRpcProvider(RPCS[1]),
  // 250: new ethers.providers.JsonRpcProvider(RPCS[250]),
  4002: new ethers.providers.JsonRpcProvider(RPCS[4002]),
  // 1337: new ethers.providers.JsonRpcProvider(RPCS[1337]),
  // 31337: new ethers.providers.JsonRpcProvider(RPCS[31337]),
};

export const provider = providers[supportChainId];
