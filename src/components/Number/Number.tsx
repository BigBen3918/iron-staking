import { BigNumber } from '@ethersproject/bignumber';
import React from 'react';
import { getDisplayNumber } from '../../utils/formatBN';

interface NumberProps {
  value: BigNumber;
  decimals?: number;
  precision?: number;
  percentage?: boolean;
  keepZeros?: boolean;
}

const Number: React.FC<NumberProps> = ({
  value,
  decimals,
  precision,
  percentage,
  keepZeros,
}) => {
  return (
    <>
      {value
        ? getDisplayNumber(value, decimals || 0, precision || 0, percentage, keepZeros)
        : '0.0'}
    </>
  );
};

export default Number;
