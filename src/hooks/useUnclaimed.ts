import { BigNumber } from '@ethersproject/bignumber';
import { useState } from 'react';

const useUnclaimed = () => {
  const [unclaimedCollateral] = useState<BigNumber>(BigNumber.from(0));
  const [unclaimedShare] = useState<BigNumber>(BigNumber.from(0));
  const [isLoading] = useState(false);

  return {
    unclaimedCollateral,
    unclaimedShare,
    isLoading,
  };
};

export default useUnclaimed;
