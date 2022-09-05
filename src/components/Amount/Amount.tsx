import { BigNumber } from '@ethersproject/bignumber';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDisplayAmount, getDisplayNumber } from '../../utils/formatBN';

interface AmountProps {
  value: BigNumber;
  decimals?: number;
  precision?: number;
  keepZeros?: boolean;
  noUnits?: boolean;
}

const Amount: React.FC<AmountProps> = ({ value, decimals, precision, keepZeros, noUnits }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [unit, setUnit] = useState('');

  useEffect(() => {
    if (noUnits) {
      const display = getDisplayNumber(value, decimals || 0, precision || 0, false, keepZeros);
      setDisplayValue(display || '');
      setUnit('');
    } else {
      const display = getDisplayAmount(value, decimals || 0, precision || 0, keepZeros);
      setDisplayValue(display?.value || '');
      setUnit(display?.unit || '');
    }
  }, [value, decimals, precision, keepZeros, noUnits]);

  return (
    <>
      {displayValue ? (
        <span>
          {displayValue}
          <StyledUnit>{unit}</StyledUnit>
        </span>
      ) : (
        '0.0'
      )}
    </>
  );
};

const StyledUnit = styled.span``;

export default Amount;
