import { useCallback, useMemo } from 'react';
import {
  addPopup,
  PopupContent,
  removePopup,
  toggleWalletModal,
  toggleSettingsMenu,
  hideInfoBox,
  setSlippageTolerance,
  connectToAccount,
  disconnectAccount,
  showInfoBox,
  acceptTerms,
  setUseZap,
} from './actions';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../index';
import { useWeb3React } from '@web3-react/core';
import { ConnectorNames } from './reducer';

export function useBlockNumber(): number | undefined {
  const { chainId } = useWeb3React();
  return useSelector((state: AppState) => state.application.blockNumber[chainId ?? -1]);
}

export function useWalletModalOpen(): boolean {
  return useSelector((state: AppState) => state.application.walletModalOpen);
}

export function useWalletModalToggle(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(toggleWalletModal()), [dispatch]);
}

export function useSettingsMenuOpen(): boolean {
  return useSelector((state: AppState) => state.application.settingsMenuOpen);
}

export function useToggleSettingsMenu(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(toggleSettingsMenu()), [dispatch]);
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch();

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }));
    },
    [dispatch],
  );
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }));
    },
    [dispatch],
  );
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useSelector((state: AppState) => state.application.popupList);
  return useMemo(() => list.filter((item) => item.show), [list]);
}

// check if infobox was previously hidden
export function useIsHiddenInfoBox(key: string): boolean {
  const list = useSelector((state: AppState) => state.application.infoBoxList);
  return useMemo(() => list[key] ?? false, [key, list]);
}

// hide Infobox for one session
export function useHideInfoBox(): (key: string) => void {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      dispatch(hideInfoBox({ key }));
    },
    [dispatch],
  );
}
// hide Infobox for one session
export function useShowInfoBox(): (key: string) => void {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      dispatch(showInfoBox({ key }));
    },
    [dispatch],
  );
}

export function useSetSlipageTolerance(): (slippage: number) => void {
  const dispatch = useDispatch();
  return useCallback(
    (slippage: number) => {
      dispatch(setSlippageTolerance({ slippage }));
    },
    [dispatch],
  );
}

export function useSetZap(): (isZap: boolean) => void {
  const dispatch = useDispatch();
  return useCallback(
    (isZap: boolean) => {
      dispatch(setUseZap({ isZap }));
    },
    [dispatch],
  );
}

export function useGetSlippageTolerance(): number {
  const slippage = useSelector((state: AppState) => state.application.slippageTolerance);
  return slippage;
}

export function useGetIsZap(): boolean {
  const isZap = useSelector((state: AppState) => state.application.isZap);
  return isZap;
}

export function useGetConnectedAccount(): string {
  return useSelector((state: AppState) => state.application.account);
}

export function useSetConnectedAccount(): (
  account: string,
  connector?: ConnectorNames,
) => void {
  const dispatch = useDispatch();
  return useCallback(
    (account: string, connector?: ConnectorNames) => {
      dispatch(connectToAccount({ account, connector: connector }));
    },
    [dispatch],
  );
}

export function useDisconnectAccount(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(disconnectAccount());
  }, [dispatch]);
}

export function useAcceptTerms(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(acceptTerms());
  }, [dispatch]);
}

export function useIsAcceptedTerms(): boolean {
  const accepted = useSelector((state: AppState) => state.application.acceptedTerms);
  return accepted;
}

export function useSavedConnector() {
  const connector = useSelector((state: AppState) => state.application.connector);
  return connector;
}
