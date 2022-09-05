import React from 'react';
import styled from 'styled-components';
import imgFantomChain from '../../../assets/img/fantom-chain.png';
import imgBinanceChain from '../../../assets/img/binance-chain.svg';
import CloseButton from '../../CloseButton';

import Modal, { ModalCloseButton, ModalHeader, ModalProps, ModalTitle } from '../../Modal';
import Spacer from '../../Spacer';

const SelectChainModal: React.FC<ModalProps> = ({ onDismiss }) => {
  return (
    <Modal size="xs" padding="0">
      <ModalUpper>
        <ModalHeader>
          <ModalTitle>Switch Network</ModalTitle>
          <ModalCloseButton>
            <Spacer />
            <CloseButton size="20px" onClick={onDismiss} />
          </ModalCloseButton>
        </ModalHeader>
      </ModalUpper>
      <StyledChainContainer>
        <StyledChainItem select onClick={onDismiss}>
          <i className="fas fa-check-circle" />
          <img src={imgFantomChain} />
          Fantom testnet
        </StyledChainItem>
        {/* <StyledChainItem href="https://app.iron.finance/" rel="noopener noreferrer">
                    <i className="fas fa-check-circle" />
                    <img src={imgBinanceChain} />
                    Binance
                </StyledChainItem> */}
      </StyledChainContainer>
    </Modal>
  );
};

export default SelectChainModal;

const ModalUpper = styled.div`
  padding: 20px 25px;
  display: grid;
  grid-auto-rows: auto;
  grid-template-rows: 1fr;
  grid-gap: 15px;
`;

const StyledChainContainer = styled.div`
  display: flex;
  padding: 10px 25px 30px;
`;

const StyledChainItem = styled.a<{ select?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 10px 10px;
  padding: 8px 10px 24px 10px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  background-image: linear-gradient(to right, rgb(34 59 231 / 9%), rgb(52 67 249 / 15%));
  border-radius: 10px;
  border: 1px solid ${({ select }) => (select ? '#3292ff' : '#383e4b')};
  cursor: pointer;
  text-decoration: none;
  i {
    font-size: 17px;
    margin-left: auto;
    color: ${({ select, theme }) => (select ? theme.color.primary.main : 'transparent')};
  }
  img {
    width: 56px;
    margin-bottom: 12px;
  }
  :hover {
    border: 1px solid #3292ff;
  }
`;
