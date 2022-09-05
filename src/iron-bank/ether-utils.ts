import { JsonRpcProvider, WebSocketProvider } from '@ethersproject/providers';

export function web3ProviderFrom(endpoint: string): JsonRpcProvider {
  const providerClass = endpoint.includes('wss') ? WebSocketProvider : JsonRpcProvider;

  return new providerClass(endpoint);
}
