import { BigNumber } from '@ethersproject/bignumber';
import { toPair } from 'src/utils/objects';

export type TokenType = 'dollar' | 'share';
export type StatisticType = 'price' | 'supply' | 'marketcap';

export const getStasticTypeDisplayName = (type: StatisticType) => {
  return {
    price: 'Price',
    supply: 'Supply',
    marketcap: 'Marketcap',
  }[type];
};

export const TokenSymbols = {
  dollar: 'IRON',
  share: 'LITH',
};

export type MerketProof = {
  index: number;
  amount: string;
  proof: string[];
};

export type Measurement =
  | 'polygon_iron_price'
  | 'polygon_iron_supply'
  | 'polygon_iron_marketcap'
  | 'polygon_titan_price'
  | 'polygon_titan_supply'
  | 'polygon_titan_marketcap'
  | 'ecr'
  | 'tvl'
  | 'tcr';

export type SampleRate = 'hourly' | 'daily' | 'weekly';

export const MeasurementDisplay: Record<Measurement, string> = {
  polygon_iron_price: 'IRON price',
  polygon_iron_supply: 'IRON supply',
  polygon_iron_marketcap: 'IRON marketcap',
  polygon_titan_price: 'LITH price',
  polygon_titan_supply: 'LITH supply',
  polygon_titan_marketcap: 'LITH market cap',
  ecr: 'Collateral ratio',
  tvl: 'Collateral value',
  tcr: 'Target collateral ratio',
};

export type Period = 'lastDay' | 'lastWeek' | 'lastMonth' | 'lastYear' | 'allTime';

export const PeriodDisplay: Record<Period, string> = {
  lastDay: 'Last day',
  lastWeek: 'Last week',
  lastMonth: 'Last month',
  lastYear: 'Last year',
  allTime: 'All time',
};

export const AllPeriods = toPair(PeriodDisplay).map((t) => {
  return {
    value: t.key,
    label: t.value,
  };
});

export class StatisticPeriod {
  public static DAY = new StatisticPeriod(1, 'DAY', 'Last Day');
  public static WEEK = new StatisticPeriod(2, 'WEEK', 'Last Week');
  public static MONTH = new StatisticPeriod(3, 'MONTH', 'Last Month');
  public static YEAR = new StatisticPeriod(4, 'YEAR', 'Last Year');
  public static ALL = new StatisticPeriod(5, 'ALL', 'All');

  public static All = [
    StatisticPeriod.DAY,
    StatisticPeriod.WEEK,
    StatisticPeriod.MONTH,
    StatisticPeriod.YEAR,
    StatisticPeriod.ALL,
  ];

  id: number;
  key: string;
  name: string;

  constructor(id: number, key: string, name: string) {
    this.id = id;
    this.key = key;
    this.name = name;
  }

  public static getByKey(key: string) {
    return StatisticPeriod.All.find((t) => t.key === key) || StatisticPeriod.MONTH;
  }
}

export type HarvestLog = {
  name: string;
  blockNumber: number;
  transactionHash: string;
  amount: BigNumber;
  profit: BigNumber;
};

export type BackendVaultInfo = {
  address: string;
  templateId: number;
  allocPoint: BigNumber;
  lpTokenPrice: BigNumber;
  tvl: string;
  totalStaked: string;
  apr: string;
  dailyApr: string;
};

export type VaultTvlInfo = {
  total: string;
  vaults: BackendVaultInfo[];
};
