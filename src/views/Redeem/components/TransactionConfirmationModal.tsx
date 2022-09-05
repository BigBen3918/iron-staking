import React from 'react';
import styled from 'styled-components';
import { BigNumber } from '@ethersproject/bignumber';
import CloseButton from '../../../components/CloseButton';
import Modal, {
  ModalCloseButton,
  ModalHeader,
  ModalLower,
  ModalTitle,
  ModalUpper,
} from '../../../components/Modal';
import Number from '../../../components/Number';
import { ButtonAction } from '../../../components/ButtonAction';
import {
  TxModalButtons,
  TxModalDataRow,
  TxModalDataRowField,
  TxModalDataRowValue,
  TxModalOutputAmount,
  TxModalSlippageHelper,
  TxModalTokenName,
} from '../../../components/TxConfirmationModal';

interface ConfirmationModalProps {
  dollarAmount: BigNumber;
  minOutputCollateralAmount: BigNumber;
  minOutputShareAmount: BigNumber;
  sharePrice: BigNumber;
  collateralPrice: BigNumber;
  redemptionFee: BigNumber;
  slippage: number;
  onDismiss: () => void;
  onConfirmed: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  dollarAmount,
  minOutputCollateralAmount,
  minOutputShareAmount,
  collateralPrice,
  slippage,
  onDismiss,
  onConfirmed,
}) => {
  return (
    <Modal size="sm" padding="0">
      <ModalUpper>
        <ModalHeader>
          <ModalTitle>You will receive</ModalTitle>
          <ModalCloseButton>
            <CloseButton size="20px" onClick={onDismiss} />
          </ModalCloseButton>
        </ModalHeader>
        <StyledReceiveTokens>
          {!minOutputCollateralAmount.eq(0) && (
            <StyledReceiveToken>
              <TxModalOutputAmount>
                <Number value={minOutputCollateralAmount} decimals={6} precision={6} />
              </TxModalOutputAmount>
              <TxModalTokenName>usdc Tokens</TxModalTokenName>
            </StyledReceiveToken>
          )}
          {!minOutputCollateralAmount.eq(0) && !minOutputShareAmount.eq(0) && (
            <StyledReceiveTokenPlus>+</StyledReceiveTokenPlus>
          )}
          {!minOutputShareAmount.eq(0) && (
            <StyledReceiveToken>
              <TxModalOutputAmount>
                <Number value={minOutputShareAmount} decimals={18} precision={6} />
              </TxModalOutputAmount>
              <TxModalTokenName>LITH Tokens</TxModalTokenName>
            </StyledReceiveToken>
          )}
        </StyledReceiveTokens>
        <TxModalSlippageHelper>
          Output is estimated at {slippage * 100}% slippage tolerance. The transaction will be
          reveted if the actual received amount is lower.
        </TxModalSlippageHelper>
      </ModalUpper>
      <ModalLower>
        <TxModalDataRow>
          <TxModalDataRowField>IRON Deposited</TxModalDataRowField>
          <TxModalDataRowValue>
            <Number value={dollarAmount} decimals={18} precision={6} />
          </TxModalDataRowValue>
        </TxModalDataRow>

        {!minOutputCollateralAmount.eq(0) && (
          <TxModalDataRow>
            <TxModalDataRowField>Rates</TxModalDataRowField>
            <TxModalDataRowValue>
              1 USDC = $
              <Number value={collateralPrice} decimals={6} precision={6} />
            </TxModalDataRowValue>
          </TxModalDataRow>
        )}

        <TxModalButtons>
          <ButtonAction onClick={onConfirmed}>Confirm</ButtonAction>
        </TxModalButtons>
      </ModalLower>
    </Modal>
  );
};

const StyledReceiveTokens = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: -5px;
  margin-right: -5px;
  margin-top: 10px;
`;
const StyledReceiveToken = styled.div`
  margin: 0 5px;
  font-size: 0.9em;
  position: relative;
`;
const StyledReceiveTokenPlus = styled.div`
  padding: 0 10px;
  font-weight: 600;
  padding: 0 40px;
  font-size: 20px;
  text-align: center;
  color: ${(props) => props.theme.color.grey[400]};
`;

export default ConfirmationModal;
