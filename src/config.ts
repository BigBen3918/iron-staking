import { AllFarms } from './farms';
import { Configuration } from './iron-bank/config';
import deploymentMainnet from './iron-bank/deployments/mainnet';

const config: Configuration = {
  chainId: 137,
  etherscanUrl: 'https://polygonscan.com',
  defaultProvider: 'https://rpc-mainnet.maticvigil.com',
  deployments: deploymentMainnet,
  tokens: {
    USDC: ['0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', 6],
  },
  foundryPools: [],
  oracleDollarUsdc: '0xe2c8386FB5Dc35d01602c2AA314b44Faab4d95c8',
  oracleShareEth: '0x794c9423CFF0E55079708725d3D6879326a29ad1',
  pollingInterval: 10 * 1000,
  defaultSlippageTolerance: 0.001,
  gasLimitMultiplier: 1.5,
  backendUrl: null,
  backendDisabled: false,
  enabledChart: true,
  excludedAddress: [],
  buyShareHref:
    'https://quickswap.exchange/#/swap?outputCurrency=0xaAa5B9e6c589642f98a1cDA99B9D024B8407285A',
  buyDollarHref:
    'https://quickswap.exchange/#/swap?outputCurrency=0xD86b5923F3AD7b585eD81B448170ae026c65ae9a',
  multicall: '0x2C738AABBd2FA2e7A789433965BEEb7429cB4D7e',
  lotteryAddress: '0xBa6770A08D1D31Ab24d36d14C4D8E2d4BDA72f21',
  farms: AllFarms,
};

export default config;
