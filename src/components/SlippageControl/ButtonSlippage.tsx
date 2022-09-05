import React from 'react';
import { useGetSlippageTolerance } from 'src/state/application/hooks';
import styled from 'styled-components';

interface ButtonSlippage {
  value?: number;
  onClick?: () => void;
  border?: boolean;
}

const ButtonSlippage: React.FC<ButtonSlippage> = ({ value, onClick, children, border }) => {
  const slippage = useGetSlippageTolerance();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onButtonClick = ($event: any) => {
    $event.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      {!!value && (
        <StyledButton selected={slippage === value} onClick={($event) => onButtonClick($event)}>
          {value * 100}%
        </StyledButton>
      )}
      {!!children && <StyledButton border={border}>{children}</StyledButton>}
    </>
  );
};

const StyledButton = styled.button<{ selected?: boolean; border?: boolean }>`
  align-items: center;
  text-align: center;
  height: 1.8rem;
  border-radius: 32px;
  font-size: 0.87rem;
  font-weight: 600;
  width: auto;
  min-width: 3.5rem;
  border: 1px solid
    ${({ border, theme }) => (border ? theme.color.primary.main : 'rgb(64, 68, 79)')};
  outline: none;
  background: rgb(33, 36, 41);
  margin-right: 8px;
  color: rgb(255, 255, 255, 0.7);
  user-select: none;
  cursor: pointer;
  &:hover {
    border: 1px solid
      ${({ border, theme }) => (border ? theme.color.primary.main : 'rgb(86, 90, 105)')};
  }
  background-color: ${({ selected, theme }) =>
    selected ? theme.color.primary.main : 'rgb(33, 36, 41)'};
`;

export default ButtonSlippage;
