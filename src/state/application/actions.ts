import { createAction } from '@reduxjs/toolkit';
import { ConnectorNames } from './reducer';

export type PopupContent = {
  txn?: {
    hash: string;
    success: boolean;
    summary?: string;
  };
  error?: {
    message: string;
    title: string;
  };
};

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>(
  'app/updateBlockNumber',
);

export const toggleWalletModal = createAction<void>('app/toggleWalletModal');

export const toggleSettingsMenu = createAction<void>('app/toggleSettingsMenu');

export const addPopup = createAction<{
  key?: string;
  removeAfterMs?: number | null;
  content: PopupContent;
}>('app/addPopup');

export const removePopup = createAction<{ key: string }>('app/removePopup');

export const hideInfoBox = createAction<{ key: string }>('app/hideInfoBox');

export const showInfoBox = createAction<{ key: string }>('app/showInfoBox');

export const setSlippageTolerance = createAction<{ slippage: number }>(
  'app/setSlippageTolerance',
);

export const setUseZap = createAction<{ isZap: boolean }>('app/setUseZap');

export const refreshGlobalInfo = createAction('app/refreshGlobalInfo');

export const connectToAccount = createAction<{ account: string; connector?: ConnectorNames }>(
  'app/connectToAccount',
);
export const disconnectAccount = createAction('app/disconnectAccount');
export const acceptTerms = createAction('app/acceptTerms');
