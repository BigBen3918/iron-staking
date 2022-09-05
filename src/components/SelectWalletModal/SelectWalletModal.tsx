import React, { useCallback } from 'react';
import styled from 'styled-components';
import CloseButton from '../CloseButton';
import Modal, {
  ModalCloseButton,
  ModalHeader,
  ModalLower,
  ModalTitle,
  ModalUpper,
} from '../Modal';
import Spacer from '../Spacer';
import MetamaskLogo from '../../assets/img/metamask.png';
import TrustWalletLogo from '../../assets/img/TrustWallet.svg';
import MathWalletLogo from '../../assets/img/MathWallet.svg';
import safeWalletLogo from '../../assets/img/SafeWallet.svg';
import TokenPocketLogo from '../../assets/img/TokenPocker.svg';
import WalletConnectLogo from '../../assets/img/wallet_connect.png';
import { useWallet } from 'use-wallet';

export interface SelectWalletModalProps {
  onDismiss?: () => void;
}

interface Wallet {
  type: string;
  name: string;
  image: string;
}
const wallets = [
  {
    type: 'injected',
    name: 'MetaMask',
    image: MetamaskLogo,
  },
  {
    type: 'walletConnect',
    name: 'Wallet Connect',
    image: WalletConnectLogo,
  },
  {
    type: 'injected',
    name: 'TrustWallet',
    image: TrustWalletLogo,
  },
  // {
  //     type: "",
  //     name: 'MathWallet',
  //     image: MathWalletLogo,
  // },
  // {
  //     type: "",
  //     name: 'TokenPocket',
  //     image: TokenPocketLogo,
  // },
  // {
  //     type: "",
  //     name: 'SafePal Wallet',
  //     image: safeWalletLogo,
  // },
] as Wallet[];

const SelectWalletModal: React.FC<SelectWalletModalProps> = ({ onDismiss }) => {
  const wallet = useWallet();
  const connectWallet = async (type: string) => {
    switch (type) {
      case 'injected':
        wallet.connect();
        break;
      case 'walletConnect':
        wallet.connect('walletconnect');
        break;
      default:
        break;
    }
    onDismiss();
  };
  return (
    <Modal size="xs" padding="0">
      <ModalUpper>
        <ModalHeader>
          <ModalTitle>Connect to a Wallet</ModalTitle>
          <ModalCloseButton>
            <Spacer />
            <CloseButton size="20px" onClick={onDismiss} />
          </ModalCloseButton>
        </ModalHeader>
      </ModalUpper>
      <ModalLower>
        <List>
          {wallets.map((wallet) => (
            <Item
              key={wallet.name}
              onClick={() => {
                connectWallet(wallet.type);
              }}
            >
              <WalletName>{wallet.name}</WalletName>
              <WalletLogo
                src={wallet.image}
                alt={`${wallet.name} Logo`}
                width={32}
                height={32}
              />
            </Item>
          ))}
        </List>
      </ModalLower>
    </Modal>
  );
};

const List = styled.ul`
  overflow: hidden;
  list-style-type: none;
  padding: 0px;
  margin: 0px;
`;

const Item = styled.li<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? '#2d3248' : '#181c2f')};
  margin: 10px 0px;
  border-radius: 12px;
  padding: 15px 16px;
  border: 1px solid #2d3248;
  :hover {
    border: 1px solid ${({ theme }) => theme.color.primary.main};
  }
`;

const WalletName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.white};
`;

const WalletLogo = styled.img`
  margin-left: auto;
  border-radius: 24px;
`;

export default SelectWalletModal;
