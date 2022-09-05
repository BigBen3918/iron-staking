import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import CloseButton from '../../CloseButton';

import Modal, {
  ModalCloseButton,
  ModalHeader,
  ModalLower,
  ModalProps,
  ModalTitle,
  ModalUpper,
} from '../../Modal';
import Spacer from '../../Spacer';
import AccountTokenBalances from './AccountTokenBalances';
import AccountTransactions from './AccountTransactions';
import Identicon from 'identicon.js';
import { useDisconnectAccount } from 'src/state/application/hooks';
import { useWeb3React } from '@web3-react/core';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, deactivate } = useWeb3React();
  const config = useConfiguration();
  const disconnectAccount = useDisconnectAccount();

  const iconAccount = useMemo(() => {
    if (account) {
      const data = new Identicon(account, 48).toString();
      return `data:image/png;base64,${data}`;
    }
  }, [account]);

  const shortenAccount = useMemo(() => {
    if (account && account.length > 0) {
      return `${account.substring(0, 10)}.....${account.substring(
        account.length - 10,
        account.length,
      )}`;
    }
  }, [account]);

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  };

  const copyAddress = useCallback(() => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(account);
      return;
    }
    navigator.clipboard.writeText(account);
  }, [account]);

  const disconnect = () => {
    deactivate();
    disconnectAccount();
    onDismiss();
  };

  return (
    <Modal size="sm" padding="0">
      <ModalUpper>
        <ModalHeader>
          <ModalTitle>Account</ModalTitle>
          <ModalCloseButton>
            <Spacer />
            <CloseButton size="20px" onClick={onDismiss} />
          </ModalCloseButton>
        </ModalHeader>
        <WalletInfo>
          <WalletInfoIcon src={iconAccount}></WalletInfoIcon>
          <WalletInfoMain>
            <WalletInfoHeader>
              <WalletTitle>Connected</WalletTitle>
              <GroupButton>
                <ActionButtonLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${config.etherscanUrl}/address/${account}`}
                >
                  Go to explorer&nbsp;&nbsp;<i className="fas fa-external-link"></i>
                </ActionButtonLink>
                <ActionButton onClick={disconnect}>Disconnect</ActionButton>
              </GroupButton>
            </WalletInfoHeader>
            <WalletInfoContent>
              <AccountNumber>
                <span className="account-web">{account || ''}</span>
                <span className="account-mobile">{shortenAccount}</span>
                <AccountNumberCopy onClick={copyAddress}>
                  <i className="fas fa-clone"></i>
                </AccountNumberCopy>
              </AccountNumber>
            </WalletInfoContent>
          </WalletInfoMain>
        </WalletInfo>
        <AccountTokenBalances />
      </ModalUpper>
      <ModalLower>
        <AccountTransactions />
      </ModalLower>
    </Modal>
  );
};

const WalletInfo = styled.div`
  display: flex;
  padding: 20px 0;
  border-bottom: dashed 1px ${({ theme }) => theme.color.grey[800]};
`;

const WalletInfoHeader = styled.div`
  display: flex;
  align-items: center;
`;

const WalletInfoIcon = styled.img`
  height: 40px;
  width: auto;
  margin-right: 15px;
  flex-shrink: 0;
  border-radius: 100%;
  overflow: hidden;
`;
const WalletInfoMain = styled.div`
  flex: 1;
`;

const WalletTitle = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.color.secondary};
  font-weight: 600;
`;

const GroupButton = styled.div`
  margin-left: auto;
  background-color: transparent;
  display: flex;
`;
const ActionButton = styled.button`
  display: flex;
  align-items: center;
  margin-left: 10px;
  background-color: transparent;
  appearance: none;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 2px 10px;
  color: ${(props) => props.theme.color.primary.main};
  border: 1px solid ${(props) => props.theme.color.primary.main};
  border-radius: 10px;
  &:hover {
    background-color: ${(props) => props.theme.color.primary.main};
    color: ${(props) => props.theme.color.grey[200]};
  }
`;
const ActionButtonLink = styled.a`
  display: flex;
  align-items: center;
  margin-left: 10px;
  background-color: transparent;
  appearance: none;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 2px 10px;
  color: ${(props) => props.theme.color.primary.main};
  border: 1px solid ${(props) => props.theme.color.primary.main};
  border-radius: 10px;
  text-decoration: none;
  &:hover {
    background-color: ${(props) => props.theme.color.primary.main};
    color: ${(props) => props.theme.color.grey[200]};
  }
`;
const AccountNumberCopy = styled.button`
  background-color: transparent;
  appearance: none;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 2px 2px;
  color: ${(props) => props.theme.color.primary.main};
  border: none;
  margin-left: 20px;
  &:hover {
    i {
      font-weight: 700 !important;
    }
  }
`;
const WalletInfoContent = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`;

const AccountNumber = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.success};
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 14px;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #151828;
  .account-mobile {
    display: none;
  }
  @media (max-width: 768px) {
    font-size: 0.7rem;
    font-weight: 600;
    .account-web {
      display: none;
    }
    .account-mobile {
      display: contents;
    }
  }
`;

export default AccountModal;
