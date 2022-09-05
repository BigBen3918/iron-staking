import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { isArray } from 'lodash';
import { useMemo } from 'react';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';
import { ConnectorNames } from 'src/state/application/reducer';

const POLLING_INTERVAL = 1000000;

const useWalletConnectors = () => {
  const { chainId, defaultProvider } = useConfiguration();

  return useMemo(() => {
    const networkUrl = isArray(defaultProvider) ? defaultProvider[0] : defaultProvider;

    if (!chainId || !networkUrl) {
      throw new Error('Network configuration is invalid');
    }

    const injected = new InjectedConnector({ supportedChainIds: [chainId] });

    const walletConnect = new WalletConnectConnector({
      rpc: { [chainId]: networkUrl },
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true,
    });

    return {
      [ConnectorNames.Injected]: injected,
      [ConnectorNames.WalletConnect]: walletConnect,
    };
  }, [chainId, defaultProvider]);
};

export default useWalletConnectors;
