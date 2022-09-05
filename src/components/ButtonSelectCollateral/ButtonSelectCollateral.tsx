import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TokenSymbol from '../TokenSymbol';

interface ButtonSelectCollateralProps {
  title?: string;
  onSelected?: (pool: string) => void;
  poolAddress?: string;
}

const ButtonSelectCollateral: React.FC<ButtonSelectCollateralProps> = ({
  onSelected,
  poolAddress,
}) => {
  const [current, setCurrent] = useState<string>();

  useEffect(() => {
    setCurrent('0xD078B62f8D9f5F69a6e6343e3e1eC9059770B830');
  }, [poolAddress]);

  const hasMultiplePools = false;

  useEffect(() => {
    if (onSelected) {
      onSelected(current);
    }
  }, [current, onSelected]);

  return (
    <StyledButton blank={!current} enabled={hasMultiplePools}>
      {current ? (
        <StyledToken>
          <TokenSymbol size={32} symbol="USDC"></TokenSymbol>
          <span>USDC</span>
          {hasMultiplePools && (
            <span className="angle-down">
              <i className="far fa-angle-down"></i>
            </span>
          )}
        </StyledToken>
      ) : (
        <StyledToken>
          Select Token
          <span className="angle-down">
            <i className="far fa-angle-down"></i>
          </span>
        </StyledToken>
      )}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ blank?: boolean; enabled?: boolean }>`
  appearance: none;
  background-color: ${({ blank, theme }) => (blank ? theme.color.primary.main : 'transparent')};
  font-size: ${({ blank }) => (blank ? '14px;' : '16px;')};
  font-weight: 500;
  color: ${(props) => props.theme.color.white};
  border: none;
  border-radius: 20px;
  padding: 0px 15px;
  height: 40px;
  cursor: ${({ enabled }) => (enabled ? 'pointer' : 'auto')};
  pointer-events: ${({ enabled }) => (enabled ? 'auto' : 'none')};
  transition: ease-in-out 100ms;
  margin-right: -5px;
  .angle-down {
    opacity: 0.7;
    display: flex;
    align-items: center;
    margin-top: 2px;
    transition: ease-in-out 100ms;
    font-size: 16px;
  }
  &:hover {
    background-color: ${({ blank, theme }) =>
      blank ? theme.color.orange[600] : theme.color.grey[800]};
    color: ${(props) => props.theme.color.white};
    .angle-down {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const StyledToken = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export default ButtonSelectCollateral;
