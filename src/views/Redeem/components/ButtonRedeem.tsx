import { BigNumber } from '@ethersproject/bignumber';
import React, { useState } from 'react';
import { ButtonAction } from '../../../components/ButtonAction';
import MiniLoader from '../../../components/MiniLoader';

export enum ButtonStatus {
  wrongNetwork = 0,
  paused = 1,
  notConnected = 2,
  noCollateral = 3,
  insufficientDollar = 4,
  notInputDollar = 5,
  requireApprovalDollar = 6,
  approvalPending = 7,
  ready = 8,
  notEnoughCollateralInPool = 9,
}

interface ButtonRedeemProps {
  collateralBalance: BigNumber;
  dollarAmount: BigNumber;
  minOutputAmount: BigNumber;
  isExceededDollarBalance: boolean;
  paused: boolean;
  redeem: () => void;
}

const ButtonRedeem: React.FC<ButtonRedeemProps> = ({ redeem }) => {
  const [loading] = useState(false);

  return (
    <ButtonAction onClick={redeem} isLoading={loading} buttonStyle="ready">
      {loading && (
        <div className="loader">
          <MiniLoader strokeWidth={2} size="18px" stroke="#FFFFFF" />
        </div>
      )}
      Redeem
    </ButtonAction>
  );
};

export default ButtonRedeem;
