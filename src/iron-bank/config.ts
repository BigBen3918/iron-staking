import { Deployments } from './deployments';

export type Market =
  | 'DfynExchange'
  | 'SushiSwap'
  | 'QuickSwap'
  | 'FirebirdFinance'
  | 'IronFinance';

export type MarketSymbol = 'DFYN' | 'SUSHISWAP' | 'QUICKSWAP' | 'FIREBIRD' | 'IRONFINANCE';

export type PoolConfig = {
  masterChefAddress: string;
  id?: number;
  token0?: string;
  token1?: string;
  rewardToken: string;
  wantSymbol?: string;
  wantDecimals?: number;
  addLiquidityUrl: string;
  removeLiquidityUrl: string;
  buyUrl?: string;
  isLp: boolean;
  stable?: boolean;
  profitSharing?: boolean;
  coming?: boolean;
  inactive?: boolean;
  market?: Market;
  marketSymbol?: MarketSymbol;
  farmUrl?: string;
  wantToken?: string;
};

export type Vault = {
  id: number;
  token0?: string;
  token1?: string;
  wantSymbol: string;
  wantToken: string;
  wantDecimals?: number;
  rewardToken: string;
  isLp: boolean;
  stable?: boolean;
  profitSharing?: boolean;
  coming?: boolean;
};

export type FarmingPool = {
  id?: number;
  token0?: string;
  token1?: string;
  wantSymbol?: string;
  wantToken?: string;
  wantDecimals?: number;
  rewardToken: string;
  isLp: boolean;
  stable?: boolean;
  profitSharing?: boolean;
  coming?: boolean;
  inactive?: boolean;
  market?: Market;
  marketSymbol?: MarketSymbol;
  farmUrl?: string;
  partnerPoolAddress?: string;
};

export type Farm = {
  masterChef: string;
  profitSharing?: boolean;
  pools: FarmingPool[];
  rewardTokenSymbol?: string;
  rewardTokenAddress?: string;
  rewardTokenDecimals?: number;
  mintingPool?: string;
  treasury?: string;
  deprecated?: boolean;
  fundAddress?: string;
  inactive?: boolean;
};

export type FoundryConfig = {
  id: number;
  token: string;
  tokenDecimals: number;
  earnToken: string;
  vesting?: boolean;
  stable?: boolean;
  locked?: number;
  addLiquidityUrl: string;
  removeLiquidityUrl: string;
};

export type VaultConfig = {
  id: number;
  description: string;
  token0?: string;
  token1?: string;
  earnToken: string;
  wantSymbol: string;
  wantToken: string;
  wantDecimals?: number;
  isLp: boolean;
  canDeposit?: boolean;
  canAutoCompound?: boolean;
  stable?: boolean;
  risk?: boolean;
  market?: Market;
  marketSymbol?: MarketSymbol;
  platform?: string;
};

export type Configuration = {
  chainId: number;
  etherscanUrl: string;
  defaultProvider: string | string[];
  deployments: Deployments;
  tokens: { [contractName: string]: [string, number] };
  farms?: Farm[];
  foundryPools: FoundryConfig[];
  config?: EthereumConfig;
  pollingInterval: number;
  defaultSlippageTolerance: number;
  gasLimitMultiplier: number;
  backendUrl?: string;
  backendDisabled?: boolean;
  excludedAddress: string[];
  oracleShareEth: string;
  oracleDollarUsdc: string;
  enabledChart: boolean;
  buyDollarHref?: string;
  buyShareHref?: string;
  lotteryAddress?: string;
  multicall: string;
};

export type EthereumConfig = {
  testing: boolean;
  autoGasMultiplier: number;
  defaultConfirmations: number;
  defaultGas: string;
  defaultGasPrice: string;
  ethereumNodeTimeout: number;
};

export const defaultEthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 1,
  defaultGas: '6000000',
  defaultGasPrice: '1000000000000',
  ethereumNodeTimeout: 10000,
};
