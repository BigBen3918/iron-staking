import React, { useRef, useState } from 'react';
import Number from '../../../components/Number';
import { BigNumber } from '@ethersproject/bignumber';
import styled from 'styled-components';
import { PoolConfig } from 'src/iron-bank/config';
import TokenSliderInput from './TokenSliderInput';

interface StakeLPComponentProps {
  poolConfig: PoolConfig;
  index: any;
  setDeposit: any;
  balance: any | null;
}

const StakeLPComponent: React.FC<StakeLPComponentProps> = ({
  poolConfig,
  setDeposit,
  index,
  balance,
}) => {
  const { token0, token1 } = poolConfig;
  const [amount, setAmount] = useState(BigNumber.from(0));
  const refInput = useRef(null);

  return (
    <StyledContainer>
      <Balance>
        Balance:&nbsp;
        <span className="balance-click">
          <Number value={balance} decimals={18} precision={6} />
        </span>
        &nbsp; {token0}
        {token1 ? '/' + token1 : ''}
      </Balance>
      <TokenSliderInput
        ref={refInput}
        hasError={false}
        token={'IRON'}
        decimals={18}
        precision={18}
        onChange={setAmount}
        token0={token0}
        token1={token1}
        maxBalance={balance}
        hideMax
      />
      <StyledFooter>
        <Button onClick={() => setDeposit(index)}>Deposit</Button>
      </StyledFooter>
    </StyledContainer>
  );
};

export default StakeLPComponent;

const StyledContainer = styled.div``;

const Balance = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: normal;
  color: #91908f;
  .balance-click {
    cursor: pointer;
    display: inline-block;
    color: #fea430;
    font-weight: 500;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 55px;
  a {
    margin-right: auto;
    font-size: 14px;
    font-weight: 500;
    color: #fea430;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
  i {
    margin-left: 8px;
  }
`;

const Button = styled.button<{
  error?: boolean;
  isLoading?: boolean;
}>`
  padding: 10px 22px;
  text-align: center;
  border-radius: 6px;
  outline: none;
  border: 1px solid transparent;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  background-color: #0091ff;
  color: ${({ isLoading, theme }) =>
    isLoading ? 'rgb(109, 168, 255, 0.7)' : theme.color.white};
  font-size: 16px;
  font-weight: 600;
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};
  transition: ease-in-out 150ms;
  &:hover {
    background-color: #006eff;
  }
  &:disabled {
    background-color: ${({ error, theme }) =>
      error ? theme.color.red[300] : 'rgb(64, 68, 79)'};
    color: ${({ error, theme }) => (error ? theme.color.grey[300] : theme.color.grey[400])};
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: 1;
    cursor: auto;
  }
  .loader {
    margin-right: 5px;
    height: 20px;
  }
`;
