import { Farm, Market } from './iron-bank/config';

export const Tokens: { [key: string]: string } = {
  IRON: '0xD86b5923F3AD7b585eD81B448170ae026c65ae9a',
  LITH: '0x1f5db218a6C41dF84bA8003a263563b86568a672',
  MATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  ETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
};

export const createAddLiquidityLink = (marketName: Market, token0: string, token1: string) => {
  switch (marketName) {
    case 'QuickSwap':
      return `https://quickswap.exchange/#/add/${Tokens[token0?.toUpperCase()] || ''}/${
        Tokens[token1?.toUpperCase()] || ''
      }`;
    case 'DfynExchange':
    case 'FirebirdFinance':
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
    case 'FirebirdFinance':
    case 'IronFinance':
    case 'SushiSwap':
      return `https://app.sushi.com/remove/${Tokens[token0?.toUpperCase()] || ''}/${
        Tokens[token1?.toUpperCase()] || ''
      }`;
  }
};

export const buyTokenLinks: { [key: string]: string } = {
  LITH: 'https://quickswap.exchange/#/swap?outputCurrency=0x1f5db218a6C41dF84bA8003a263563b86568a672',
  Test0:
    'https://quickswap.exchange/#/swap?outputCurrency=0x0062d3BCf9b38B117bb3A73CfFBF2edc1490e192',
};

/* ROLE CONFIG PARTNER POOL
  - Set farm url if pool in quickswap, dfyn...
  - Set pool id if partner use Iron Finance pool, not set if the opposite */

export const AllFarms: Farm[] = [
  {
    masterChef: '0x5d20166274447EA150B4380f2806F0d33ee98FBD',
    rewardTokenSymbol: 'LITH',
    rewardTokenDecimals: 18,
    rewardTokenAddress: '0x1f5db218a6C41dF84bA8003a263563b86568a672',
    profitSharing: true,
    pools: [
      {
        id: 0,
        token0: 'Test0',
        wantSymbol: 'Test0',
        wantToken: '0x0062d3BCf9b38B117bb3A73CfFBF2edc1490e192',
        rewardToken: 'LITH',
        isLp: false,
        stable: false,
        profitSharing: true,
        market: 'IronFinance',
        marketSymbol: 'IRONFINANCE',
      },
      {
        id: 1,
        token0: 'Test1',
        wantSymbol: 'Test1',
        wantToken: '0x57f404504094808d67334c719b6757dF3366bcB2',
        rewardToken: 'LITH',
        isLp: false,
        stable: false,
        profitSharing: true,
        market: 'IronFinance',
        marketSymbol: 'IRONFINANCE',
      },
      {
        id: 2,
        token0: 'Test2',
        wantSymbol: 'Test2',
        wantToken: '0x31932bcFcdf36462F530E4E7622f421bD9612017',
        rewardToken: 'LITH',
        isLp: false,
        stable: false,
        profitSharing: true,
        market: 'IronFinance',
        marketSymbol: 'IRONFINANCE',
      },
      {
        id: 3,
        token0: 'Test3',
        wantSymbol: 'Test3',
        wantToken: '0x2C86f28eF0E0f07553D217d08a06c9a5B05c67B9',
        rewardToken: 'LITH',
        isLp: false,
        stable: false,
        profitSharing: true,
        market: 'IronFinance',
        marketSymbol: 'IRONFINANCE',
      },
      {
        id: 4,
        token0: 'Test4',
        wantSymbol: 'Test4',
        wantToken: '0x6A0CC49B31dA38Cf2de01a8ec782A1732F555ECd',
        rewardToken: 'LITH',
        isLp: false,
        stable: false,
        profitSharing: true,
        market: 'IronFinance',
        marketSymbol: 'IRONFINANCE',
      },
    ],
  },
  // {
  //     masterChef: '0x5d20166274447EA150B4380f2806F0d33ee98FBD',
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
  //     masterChef: '0x5d20166274447EA150B4380f2806F0d33ee98FBD',
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
  //     masterChef: '0x5d20166274447EA150B4380f2806F0d33ee98FBD',
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
