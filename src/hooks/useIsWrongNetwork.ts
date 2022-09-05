import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';

export const useIsWrongNetwork = () => {
  const { error } = useWeb3React();

  return error instanceof UnsupportedChainIdError;
};
