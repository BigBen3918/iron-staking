import React from 'react';
import styled from 'styled-components';
import TokenSymbol from 'src/components/TokenSymbol';
import { useConfiguration } from 'src/contexts/ConfigProvider/ConfigProvider';

const BuyShareButton: React.FC = () => {
  const config = useConfiguration();

  return (
    <StyledButton href={config.buyShareHref} target="_blank">
      <TokenSymbol symbol="LITH" size={24} />
      &nbsp;Buy<span>&nbsp;LITH</span>
    </StyledButton>
  );
};

const StyledButton = styled.a`
  align-items: center;
  background-color: #272b3f;
  border: 0;
  border-radius: 8px;
  color: ${(props) => props.theme.color.primary.main};
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 36px;
  justify-content: center;
  outline: none;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  width: 100%;
  text-decoration: none;
  &:disabled {
    pointer-events: none;
    color: ${(props) => `${props.theme.color.primary.main}55`};
  }
  &:hover,
  &:focus {
    outline: none;
    background-color: #21264b;
  }
  span {
    margin-left: 5px;
  }
  @media (max-width: 1070px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
    span {
      display: none;
    }
  }
`;

export default BuyShareButton;
