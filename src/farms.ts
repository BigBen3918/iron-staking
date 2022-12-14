import { Farm, Market } from './iron-bank/config';

export const Tokens: { [key: string]: string } = {
  LITH: '0x7c03EB96a42fF473A483626A7b45148590BBE1e1',
  TEST0: '0x0E20b57D29AF79a955A06Fa14184472a7A9352Ee',
  TEST1: '0x82CdceA6F37291C21FDb3eA41740904A999f7d7F',
  TEST2: '0x8aa29e2daAB7ef7CDB6800d3A2b6feAc01B08ADA',
};

export const createAddLiquidityLink = (marketName: Market, token0: string, token1: string) => {
  switch (marketName) {
    case 'QuickSwap':
      return `https://quickswap.exchange/#/add/${Tokens[token0?.toUpperCase()] || ''}/${
        Tokens[token1?.toUpperCase()] || ''
      }`;
    case 'DfynExchange':
    case 'SpookySwap':
      return `https://spooky.fi/#/add/${Tokens[token0?.toUpperCase()] || ''}/${
        Tokens[token1?.toUpperCase()] || ''
      }`;
    case 'IronFinance':
    case 'SushiSwap':
      return `https://app.sushi.com/add/${Tokens[token0?.toUpperCase()] || ''}/${
        Tokens[token1?.toUpperCase()] || ''
      }`;
  }
};

export const createRemoveLiquidityLink = (
  marketName: Market,
  token0: string,
  token1: string,
) => {
  switch (marketName) {
    case 'QuickSwap':
      return `https://quickswap.exchange/#/remove/${Tokens[token0?.toUpperCase()] || ''}/${
        Tokens[token1?.toUpperCase()] || ''
      }`;
    case 'DfynExchange':
    case 'SpookySwap':
      return `https://spooky.fi/#/pool`;
    case 'IronFinance':
    case 'SushiSwap':
      return `https://app.sushi.com/remove/${Tokens[token0?.toUpperCase()] || ''}/${
        Tokens[token1?.toUpperCase()] || ''
      }`;
  }
};

export const buyTokenLinks: { [key: string]: string } = {
  LITH: 'https://spooky.fi/#/swap?outputCurrency=0x7c03EB96a42fF473A483626A7b45148590BBE1e1',
  Test0: 'https://spooky.fi/#/swap?outputCurrency=0x0E20b57D29AF79a955A06Fa14184472a7A9352Ee',
  Test1: 'https://spooky.fi/#/swap?outputCurrency=0x82CdceA6F37291C21FDb3eA41740904A999f7d7F',
  Test2: 'https://spooky.fi/#/swap?outputCurrency=0x8aa29e2daAB7ef7CDB6800d3A2b6feAc01B08ADA',
};

/* ROLE CONFIG PARTNER POOL
  - Set farm url if pool in quickswap, dfyn...
  - Set pool id if partner use Iron Finance pool, not set if the opposite */

export const AllFarms: Farm[] = [
  {
    masterChef: '0xEf52F65f7766c1ada2c7B22a1eC524d8Fb90ddC5',
    rewardTokenSymbol: 'LITH',
    rewardTokenDecimals: 18,
    rewardTokenAddress: '0x7c03EB96a42fF473A483626A7b45148590BBE1e1',
    profitSharing: true,
    pools: [
      {
        id: 0,
        token0: 'Test0',
        wantSymbol: 'Test0',
        wantToken: '0x0E20b57D29AF79a955A06Fa14184472a7A9352Ee',
        rewardToken: 'LITH',
        isLp: false,
        stable: false,
        profitSharing: true,
        market: 'SpookySwap',
        marketSymbol: 'SPOOKYSWAP',
      },
      {
        id: 1,
        token0: 'Test1',
        wantSymbol: 'Test1',
        wantToken: '0x82CdceA6F37291C21FDb3eA41740904A999f7d7F',
        rewardToken: 'LITH',
        isLp: false,
        profitSharing: true,
        market: 'SpookySwap',
        marketSymbol: 'SPOOKYSWAP',
      },
      {
        id: 2,
        token0: 'Test2',
        wantSymbol: 'Test2',
        wantToken: '0x8aa29e2daAB7ef7CDB6800d3A2b6feAc01B08ADA',
        rewardToken: 'LITH',
        isLp: false,
        stable: false,
        profitSharing: true,
        market: 'SpookySwap',
        marketSymbol: 'SPOOKYSWAP',
      },
      {
        id: 3,
        token0: 'Test0',
        token1: 'Test1',
        rewardToken: 'LITH',
        wantSymbol: 'Test0/Test1 LP',
        wantToken: '0xB4D7bAbA4638b26dbeF38E6502807A16Fc8786c9',
        isLp: true,
        stable: false,
        // market: 'IronFinance',
        // marketSymbol: 'IRONFINANCE',
        market: 'SpookySwap',
        marketSymbol: 'SPOOKYSWAP',
      },
    ],
  },
  // {
  //     masterChef: '0xEf52F65f7766c1ada2c7B22a1eC524d8Fb90ddC5',
  //     rewardTokenSymbol: 'LITH',
  //     deprecated: true,
  //     fundAddress: '0xf622A4e83ECbcfB7d8cb3007a3C6b03bCdA8666B',
  //     pools: [
  //         {
  //             id: 0,
  //             token0: 'LITH',
  //             token1: 'MATIC',
  //             rewardToken: 'LITH',
  //             wantSymbol: 'LITH/MATIC LP',
  //             wantToken: '0xA79983Daf2A92c2C902cD74217Efe3D8AF9Fba2a',
  //             isLp: true,
  //             stable: false,
  //             market: 'SushiSwap',
  //             marketSymbol: 'SUSHISWAP',
  //         },
  //         {
  //             id: 1,
  //             token0: 'IRON',
  //             token1: 'USDC',
  //             wantSymbol: 'IRON/USDC LP',
  //             wantToken: '0x85dE135fF062Df790A5f20B79120f17D3da63b2d',
  //             rewardToken: 'LITH',
  //             isLp: true,
  //             stable: true,
  //             market: 'SushiSwap',
  //             marketSymbol: 'SUSHISWAP',
  //         },
  //         {
  //             id: 2,
  //             token0: 'IRON',
  //             token1: 'USDC',
  //             wantSymbol: 'IRON/USDC LP QUICKSWAP',
  //             wantToken: '0x2bbe0f728f4d5821f84eee0432d2a4be7c0cb7fc',
  //             rewardToken: 'LITH',
  //             isLp: true,
  //             stable: true,
  //             coming: true,
  //             market: 'QuickSwap',
  //             marketSymbol: 'QUICKSWAP',
  //         },
  //     ],
  // },
  // {
  //     masterChef: '0xEf52F65f7766c1ada2c7B22a1eC524d8Fb90ddC5',
  //     treasury: '0x4a812C5EE699A40530eB49727E1818D43964324e',
  //     rewardTokenSymbol: 'USDC',
  //     rewardTokenAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  //     rewardTokenDecimals: 6,
  //     profitSharing: true,
  //     inactive: true,
  //     pools: [
  //         {
  //             id: 0,
  //             token0: 'LITH',
  //             token1: 'IRON',
  //             rewardToken: 'USDC',
  //             wantSymbol: 'LITH/IRON LP',
  //             wantToken: '0x35c1895DAC1e2432b320e2927b4F71a0D995602F',
  //             isLp: true,
  //             stable: false,
  //             profitSharing: true,
  //             coming: false,
  //             inactive: true,
  //             market: 'SushiSwap',
  //             marketSymbol: 'SUSHISWAP',
  //         },
  //     ],
  // },
  // {
  //     masterChef: '0xEf52F65f7766c1ada2c7B22a1eC524d8Fb90ddC5',
  //     rewardTokenSymbol: 'LITH',
  //     inactive: true,
  //     pools: [
  //         {
  //             id: 0,
  //             token0: 'LITH',
  //             wantSymbol: 'LITH',
  //             wantToken: '0xaAa5B9e6c589642f98a1cDA99B9D024B8407285A',
  //             rewardToken: 'LITH',
  //             isLp: false,
  //             stable: false,
  //             profitSharing: false,
  //             coming: false,
  //             inactive: true,
  //             market: 'SushiSwap',
  //             marketSymbol: 'SUSHISWAP',
  //         },
  //     ],
  // },
];
