import React from 'react';
import styled from 'styled-components';
import useModal from '../../../hooks/useModal';
import iconFantom from '../../../assets/img/fantom-chain.png';
import SelectChainModal from './SelectChainModal';

const SelectChainButton: React.FC = () => {
  const [onPresentChainModal] = useModal(<SelectChainModal />);

  return (
    <StyledButton onClick={onPresentChainModal}>
      <img src={iconFantom} />
      <span>Fantom testnet</span>
    </StyledButton>
  );
};

const StyledButton = styled.button`
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
  img {
    width: 20px;
  }
  @media (max-width: 1070px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
    span {
      display: none;
    }
  }
`;

export default SelectChainButton;
