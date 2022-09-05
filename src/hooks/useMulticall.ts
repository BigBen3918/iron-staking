import { useCallback } from 'react';
import { Call, multicall } from 'src/iron-bank/multicall';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';
import { useWeb3React } from '@web3-react/core';
import { JsonRpcProvider } from '@ethersproject/providers';

const useMulticall = () => {
  const { multicall: multicallAddress } = useConfiguration();
  const { library: provider } = useWeb3React<JsonRpcProvider>();

  const multicallCallback = useCallback(
    async (calls: Call[]) => {
      if (!provider) {
        return;
      }
      return await multicall(provider, multicallAddress, calls);
    },
    [multicallAddress, provider],
  );

  return multicallCallback;
};

export default useMulticall;
