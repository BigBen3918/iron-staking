import { createReducer, nanoid } from '@reduxjs/toolkit';
import {
  addPopup,
  PopupContent,
  removePopup,
  toggleWalletModal,
  toggleSettingsMenu,
  updateBlockNumber,
  hideInfoBox,
  setSlippageTolerance,
  connectToAccount,
  disconnectAccount,
  showInfoBox,
  acceptTerms,
  setUseZap,
} from './actions';

type PopupList = Array<{
  key: string;
  show: boolean;
  content: PopupContent;
  removeAfterMs: number | null;
}>;

type InfoBoxList = {
  [key: string]: boolean;
};

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
}
export interface ApplicationState {
  blockNumber: { [chainId: number]: number };
  popupList: PopupList;
  infoBoxList: InfoBoxList;
  walletModalOpen: boolean;
  settingsMenuOpen: boolean;
  slippageTolerance: number;
  isZap: boolean;
  acceptedTerms: boolean;
  account: string;
  connector?: ConnectorNames;
}

export const initialState: ApplicationState = {
  blockNumber: {},
  popupList: [],
  infoBoxList: {},
  walletModalOpen: false,
  settingsMenuOpen: false,
  slippageTolerance: 0.001,
  account: undefined,
  acceptedTerms: false,
  isZap: false,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload;
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId]);
      }
    })
    .addCase(toggleWalletModal, (state) => {
      state.walletModalOpen = !state.walletModalOpen;
    })
    .addCase(toggleSettingsMenu, (state) => {
      state.settingsMenuOpen = !state.settingsMenuOpen;
    })
    .addCase(addPopup, (state, { payload: { content, key, removeAfterMs = 8000 } }) => {
      state.popupList = (
        key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList
      ).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ]);
    })
    .addCase(removePopup, (state, { payload: { key } }) => {
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false;
        }
      });
    })
    .addCase(hideInfoBox, (state, { payload: { key } }) => {
      state.infoBoxList[key] = true;
    })
    .addCase(showInfoBox, (state, { payload: { key } }) => {
      state.infoBoxList[key] = false;
    })
    .addCase(setSlippageTolerance, (state, { payload: { slippage } }) => {
      state.slippageTolerance = slippage;
    })
    .addCase(connectToAccount, (state, { payload: { account, connector } }) => {
      state.account = account;
      state.connector = connector;
    })
    .addCase(disconnectAccount, (state) => {
      state.account = undefined;
      state.connector = undefined;
    })
    .addCase(acceptTerms, (state) => {
      state.acceptedTerms = true;
    })
    .addCase(setUseZap, (state, { payload: { isZap } }) => {
      state.isZap = isZap;
    }),
);
