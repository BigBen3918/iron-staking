/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: true;
    autoRefreshOnNetworkChange?: boolean;
    chainId: string;
    on: (eventName: string, cb: (ev: never) => void) => void;
    removeListener: (eventName: string, cb: (ev: never) => void) => void;
    request: (...params: unknown[]) => void;
    _metamask: {
      isUnlocked: () => Promise<boolean>;
    };
  };
}
