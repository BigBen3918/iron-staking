import { BigNumber } from '@ethersproject/bignumber';
import React, { useState } from 'react';
import { ButtonAction } from '../../../components/ButtonAction';
import MiniLoader from '../../../components/MiniLoader';

interface ButtonMintProps {
  paused: boolean;
  collateralAmount: BigNumber;
  shareAmount: BigNumber;
  isExceededCollateralBalance: boolean;
  isExceededShareBalance: boolean;
  collateralRatio: BigNumber;
  isZap: boolean;
  mint: () => void;
}

const ButtonMint: React.FC<ButtonMintProps> = ({ mint }) => {
  const [loading] = useState(false);

  return (
    <ButtonAction onClick={mint} isLoading={loading} buttonStyle={'ready'}>
      {loading && (
        <div className="loader">
          <MiniLoader strokeWidth={2} size="18px" stroke="#FFFFFF" />
        </div>
      )}
      Mint
    </ButtonAction>
  );
};

export default ButtonMint;
