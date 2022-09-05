import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import ERC20 from '../iron-bank/ERC20';
import { useWeb3React } from '@web3-react/core';

const useAllowance = (token: ERC20, spender: string, pendingApproval?: boolean) => {
  const [allowance, setAllowance] = useState<BigNumber>(null);
  const { account } = useWeb3React();

  const fetchAllowance = useCallback(async () => {
    const allowance = await token.allowance(account, spender);
    setAllowance(allowance);
  }, [account, spender, token]);

  useEffect(() => {
    if (account && spender && token) {
      fetchAllowance().catch((err) => console.log(`Failed to fetch allowance: ${err}`, err));
    }
  }, [account, spender, token, pendingApproval, fetchAllowance]);

  return allowance;
};

export default useAllowance;
