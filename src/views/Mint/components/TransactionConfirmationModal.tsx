import React from 'react';
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
  collateralAmount: BigNumber;
  collateralPrice: BigNumber;
  shareAmount: BigNumber;
  sharePrice: BigNumber;
  mintFee: BigNumber;
  slippage: number;
  onDismiss: () => void;
  onConfirmed: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  dollarAmount,
  collateralAmount,
  collateralPrice,
  shareAmount,
  sharePrice,
  mintFee,
  onDismiss,
  onConfirmed,
  slippage,
}) => {
  return (
    <Modal size="xs" padding="0">
      <ModalUpper>
        <ModalHeader>
          <ModalTitle>You will receive</ModalTitle>
          <ModalCloseButton>
            <CloseButton size="20px" onClick={onDismiss} />
          </ModalCloseButton>
        </ModalHeader>
        <TxModalOutputAmount>
          <Number value={dollarAmount} decimals={18} precision={6} />
        </TxModalOutputAmount>
        <TxModalTokenName>IRON Tokens</TxModalTokenName>
        <TxModalSlippageHelper>
          Output is estimated at {slippage * 100}% slippage tolerance. The transaction will be
          reveted if the actual received amount is lower.
        </TxModalSlippageHelper>
      </ModalUpper>
      <ModalLower>
        {!!collateralAmount && collateralAmount.gt(0) && (
          <TxModalDataRow>
            <TxModalDataRowField>USDC Deposited</TxModalDataRowField>
            <TxModalDataRowValue>
              <Number value={collateralAmount} decimals={6} precision={6} />
            </TxModalDataRowValue>
          </TxModalDataRow>
        )}
        {!!shareAmount && shareAmount.gt(0) && (
          <TxModalDataRow>
            <TxModalDataRowField>LITH Deposited</TxModalDataRowField>
            <TxModalDataRowValue>
              <Number value={shareAmount} decimals={18} precision={6} />
            </TxModalDataRowValue>
          </TxModalDataRow>
        )}

        <TxModalDataRow>
          <TxModalDataRowField>Rates</TxModalDataRowField>
          <TxModalDataRowValue>
            1 USDC = $
            <Number value={collateralPrice} decimals={6} precision={6} />
          </TxModalDataRowValue>
        </TxModalDataRow>
        {!!shareAmount && shareAmount.gt(0) && (
          <TxModalDataRow>
            <TxModalDataRowField></TxModalDataRowField>
            <TxModalDataRowValue>
              1 LITH = $
              <Number value={sharePrice} decimals={6} precision={6} />
            </TxModalDataRowValue>
          </TxModalDataRow>
        )}
        <TxModalDataRow>
          <TxModalDataRowField>Mint Fee</TxModalDataRowField>
          <TxModalDataRowValue>
            <Number
              value={mintFee}
              decimals={6}
              precision={2}
              keepZeros={false}
              percentage={true}
            />
            %
          </TxModalDataRowValue>
        </TxModalDataRow>
        <TxModalButtons>
          <ButtonAction onClick={onConfirmed}>Confirm</ButtonAction>
        </TxModalButtons>
      </ModalLower>
    </Modal>
  );
};

export default ConfirmationModal;
