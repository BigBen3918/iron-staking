import React from 'react';
import styled from 'styled-components';
import Amount from '../../Amount';
import TokenSymbol from '../../TokenSymbol';
import { BigNumber } from '@ethersproject/bignumber';

const AccountTokenBalances: React.FC = () => {
  const dollarBalance = BigNumber.from(0);
  const shareBalance = BigNumber.from(0);

  return (
    <Balances>
      <StyledBalanceWrapper>
        <TokenSymbol symbol={'IRON'} size={54} />
        <StyledBalance>
          <StyledValue>
            <Amount
              value={dollarBalance}
              decimals={18}
              precision={2}
              keepZeros={true}
              noUnits={true}
            />
          </StyledValue>
          <StyledTokenName>IRON</StyledTokenName>
        </StyledBalance>
      </StyledBalanceWrapper>

      <StyledBalanceWrapper>
        <TokenSymbol symbol="LITH" size={54} />
        <StyledBalance>
          <StyledValue>
            <Amount
              value={shareBalance}
              decimals={18}
              precision={2}
              keepZeros={true}
              noUnits={true}
            />
          </StyledValue>
          <StyledTokenName>LITH</StyledTokenName>
        </StyledBalance>
      </StyledBalanceWrapper>
    </Balances>
  );
};

const StyledValue = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 1.1rem;
  font-family: ${(props) => props.theme.font.monospace};
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  font-size: 1rem;
  font-weight: 700;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 ${(props) => `-${props.theme.spacing[4]}px`};
  padding: 10px 0;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 33%;
  @media (max-width: 768px) {
    margin: 0 ${(props) => props.theme.spacing[3]}px;
  }
`;

const StyledTokenName = styled.a`
  font-weight: 500;
  color: ${(props) => props.theme.color.primary.light};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.primary.main};
    text-decoration: underline;
  }
`;

export default AccountTokenBalances;
