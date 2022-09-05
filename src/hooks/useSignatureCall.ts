import { Interface } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';

const useSigatureCall = () => {
  const { library: provider } = useWeb3React();

  const call = useCallback(
    async (contractAddress: string, signature: string, params?: any[]) => {
      if (!provider) {
        return;
      }
      const name = signature.split(' ')[0];
      const contract = new Contract(
        contractAddress,
        new Interface([`function ${signature}`]),
        provider,
      );
      return await contract[name](...(params || []));
    },
    [provider],
  );

  return call;
};

export default useSigatureCall;
