import React, { ReactNode } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const getLibrary = (provider: unknown) => {
  return new Web3Provider(provider);
};

export const DynamicWalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>;
};
