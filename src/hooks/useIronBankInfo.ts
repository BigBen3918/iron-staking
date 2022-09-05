import { BigNumber } from '@ethersproject/bignumber';

const useIronBankInfo = () => {
  return {
    dollarPrice: BigNumber.from(0),
    sharePrice: BigNumber.from(60),
    dollarTotalSupply: BigNumber.from(100000),
    dollarMarketCap: BigNumber.from(100000),
    targetCollateralRatio: BigNumber.from(900000),
    effectiveCollateralRatio: BigNumber.from(900000),
    globalCollateralValue: BigNumber.from(2000000),
    mintingFee: BigNumber.from(0),
    redemptionFee: BigNumber.from(0),
  };
};

export default useIronBankInfo;
