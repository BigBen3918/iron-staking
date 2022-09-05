import { JsonRpcProvider } from '@ethersproject/providers';
import config from 'src/config';
import { web3ProviderFrom } from 'src/iron-bank/ether-utils';

export function getDefaultProvider(): JsonRpcProvider {
  let url: string;

  if (Array.isArray(config.defaultProvider)) {
    const randomIndex = Math.floor(Math.random() * config.defaultProvider.length);
    url = config.defaultProvider[randomIndex];
  } else {
    url = config.defaultProvider;
  }
  const provider = web3ProviderFrom(url);

  provider.pollingInterval = config.pollingInterval || 10000;
  return provider;
}
