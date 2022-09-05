import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import useModal from '../../../hooks/useModal';
import { useAllTransactions } from '../../../state/transactions/hooks';
import AccountModal from './AccountModal';
import Identicon from 'identicon.js';
import Spacer from '../../Spacer';
import useTryConnect from '../../../hooks/useTryConnect';
import { useSavedConnector } from 'src/state/application/hooks';
import { useWeb3React } from '@web3-react/core';
import useWalletConnectors from 'src/hooks/useWalletConnectors';
import { Web3Provider } from '@ethersproject/providers';
import { ConnectorNames } from 'src/state/application/reducer';
import { NetworkConnector } from 'src/libs/NetworkConnector';
import { useWallet } from 'use-wallet';
import { isArray } from 'lodash';
import config from 'src/config';
import { styledAddress } from '../../../utils';

const isMetaMaskConnected = () => {
  if (
    typeof window.ethereum !== 'undefined' &&
    window.ethereum.isMetaMask &&
    window.ethereum._metamask &&
    typeof window.ethereum._metamask.isUnlocked === 'function'
  ) {
    return window.ethereum._metamask.isUnlocked();
  }

  return Promise.resolve(false);
};

const { chainId, defaultProvider } = config;
const rpcUrl = isArray(defaultProvider) ? defaultProvider[0] : defaultProvider;
const defaultConnector = new NetworkConnector({
  urls: {
    [chainId]: rpcUrl,
  },
  defaultChainId: chainId,
});

const AccountButton: React.FC = () => {
  const wallet = useWallet();
  const [onPresentAccountModal] = useModal(<AccountModal />);
  const { account, activate, library, deactivate } = useWeb3React<Web3Provider>();
  const allTransactions = useAllTransactions();
  const { tryConnect } = useTryConnect();
  const savedConnector = useSavedConnector();
  const connectors = useWalletConnectors();

  useEffect(() => {
    if (!account && !savedConnector) {
      activate(defaultConnector);
      return;
    }

    if (!account && savedConnector && connectors[savedConnector]) {
      if (savedConnector === ConnectorNames.Injected) {
        isMetaMaskConnected().then((connected) => {
          if (connected) {
            activate(connectors[savedConnector], (error) => {
              console.log('error', error);
              activate(defaultConnector);
            });
          } else {
            activate(defaultConnector);
          }
        });
      } else {
        activate(connectors[savedConnector], (error) => {
          console.log('error', error);
          activate(defaultConnector);
        });
      }
    }
  }, [account, activate, connectors, deactivate, savedConnector]);

  const pendingTransactions = useMemo(
    () => Object.values(allTransactions).filter((tx) => !tx.receipt).length,
    [allTransactions],
  );
  const iconAccount = useMemo(() => {
    if (account) {
      const data = new Identicon(account, 48).toString();
      return `data:image/png;base64,${data}`;
    }
  }, [account]);

  const shortenAccount = useMemo(() => {
    if (account && account.length > 0) {
      return `${account.substring(0, 6)}...${account.substring(
        account.length - 4,
        account.length,
      )}`;
    }
  }, [account]);

  const disconnect = () => {
    wallet.reset();
  };

  return (
    <StyledAccountButton>
      {account ? (
        <StyledButton onClick={onPresentAccountModal}>
          {pendingTransactions > 0 ? (
            <>
              <span>
                {pendingTransactions} Pending{pendingTransactions > 1 ? 's' : ''}
              </span>
              <i className="fas fa-circle-notch fa-spin" style={{ marginLeft: '5px' }}></i>
            </>
          ) : (
            <AccountInfo>
              <AccountNumber>{shortenAccount}</AccountNumber>
              <img src={iconAccount} />
            </AccountInfo>
          )}
        </StyledButton>
      ) : !library ? (
        <StyledButton>
          <>
            <i className="fas fa-satellite-dish" style={{ marginRight: '5px' }}></i>
            Waiting for network
          </>
        </StyledButton>
      ) : wallet.status != 'connected' ? (
        <StyledButtonConnect onClick={() => tryConnect()}>
          <i className="fas fa-plug"></i>
          <Spacer size="sm" />
          Connect
        </StyledButtonConnect>
      ) : (
        <StyledButtonConnect onClick={() => disconnect()}>
          <i className="fas fa-plug"></i>
          <Spacer size="sm" />
          {styledAddress(wallet.account)}
        </StyledButtonConnect>
      )}
    </StyledAccountButton>
  );
};

const StyledAccountButton = styled.div``;
const StyledButton = styled.button<{ wrong?: boolean }>`
  align-items: center;
  background-color: ${(props) => (props.wrong ? props.theme.color.red[300] : '#272b3f')};
  border: 0;
  border-radius: 8px;
  color: ${(props) => (props.wrong ? props.theme.color.white : props.theme.color.primary.main)};
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 36px;
  justify-content: center;
  outline: none;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  width: 100%;
  &:disabled {
    pointer-events: none;
    color: ${(props) => `${props.theme.color.primary.main}55`};
  }
  &:hover {
    background-color: ${(props) =>
      props.wrong ? props.theme.color.red[400] : props.theme.color.primary.main};
    color: ${(props) => (props.wrong ? props.theme.color.white : props.theme.color.grey[900])};
  }
  @media (max-width: 1070px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`;

const StyledButtonConnect = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  border-radius: 8px;
  color: ${(props) => props.theme.color.primary.main};
  border: solid 1px ${(props) => props.theme.color.primary.main};
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 36px;
  justify-content: center;
  outline: none;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  transition: ease-in-out 100ms;
  width: 100%;
  &:disabled {
    pointer-events: none;
    color: ${(props) => `${props.theme.color.primary.main}55`};
  }
  &:hover {
    background-color: ${(props) => props.theme.color.primary.main};
    color: ${(props) => props.theme.color.white};
  }

  @media (max-width: 768px) {
    .dt-text {
      display: none;
    }
  }
`;

const AccountInfo = styled.span`
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: auto;
    border-radius: 100%;
  }
`;

const AccountNumber = styled.span`
  margin-right: 10px;
  @media (max-width: 1070px) {
    display: none;
  }
`;

export default AccountButton;
