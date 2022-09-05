import React, { useState } from 'react';
import Amount from '../../../components/Amount';
import Number from '../../../components/Number';
import {
  CardFooter,
  CardFooterRow,
  CardFooterRowLeft,
  CardFooterRowRight,
  CardUnit,
} from '../../../components/CardFooter';
import { BigNumber } from '@ethersproject/bignumber';
import Spacer from 'src/components/Spacer';
import { useGetSlippageTolerance } from 'src/state/application/hooks';
import Label from 'src/components/Label';

interface MintFooterProps {
  collateralPrice?: BigNumber;
  mintFeeValue?: BigNumber;
}

const MintFooter: React.FC<MintFooterProps> = ({ collateralPrice, mintFeeValue }) => {
  const slippage = useGetSlippageTolerance();
  const [poolCollateralBalance] = useState(BigNumber.from(0));

  return (
    <CardFooter width="400px">
      <CardFooterRow>
        <CardFooterRowLeft>Minting fee</CardFooterRowLeft>
        <CardFooterRowRight>
          0.4 %
          {!!mintFeeValue && (
            <>
              <Spacer size="xs" />
              =
              <Spacer size="xs" />
              <Amount value={mintFeeValue} decimals={18} keepZeros={false} precision={6} />
              <Spacer size="xs" />
              <CardUnit>IRON</CardUnit>
            </>
          )}
        </CardFooterRowRight>
      </CardFooterRow>
      <CardFooterRow>
        <CardFooterRowLeft>Pool balance</CardFooterRowLeft>
        <CardFooterRowRight>
          <Amount
            value={poolCollateralBalance}
            decimals={6}
            noUnits={true}
            precision={0}
            keepZeros={true}
          />
          <Spacer size="sm" />
          <Label text="USDC" />
        </CardFooterRowRight>
      </CardFooterRow>
      <CardFooterRow>
        <CardFooterRowLeft>Slippage</CardFooterRowLeft>
        <CardFooterRowRight>
          {slippage && <>{(slippage * 100).toFixed(2)}%</>}
        </CardFooterRowRight>
      </CardFooterRow>
      {!!collateralPrice && (
        <CardFooterRow>
          <CardFooterRowLeft>Rates: &nbsp;</CardFooterRowLeft>
          <CardFooterRowRight>
            <div className="value">1</div> <CardUnit>USDC</CardUnit>
            &nbsp;=&nbsp;
            <div className="value">
              <Number value={collateralPrice} decimals={6} precision={6} />
            </div>
            <CardUnit>USD</CardUnit>
          </CardFooterRowRight>
        </CardFooterRow>
      )}
      <CardFooterRow>
        <CardFooterRowLeft></CardFooterRowLeft>
        <CardFooterRowRight>
          <div className="value">1</div> <CardUnit>LITH</CardUnit>
          &nbsp;=&nbsp;
          <div className="value">60</div>
          <CardUnit>USD</CardUnit>
        </CardFooterRowRight>
      </CardFooterRow>
    </CardFooter>
  );
};

export default MintFooter;
