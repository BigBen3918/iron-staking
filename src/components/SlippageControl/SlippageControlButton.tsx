import React, { useRef, useState } from 'react';
import useOutsideClick from 'src/hooks/useClickOutside';
import styled from 'styled-components';
import IconCog from '../icons/IconCog';
import SlippageControl from './SlippageControl';

const SlippageControlButton: React.FC = () => {
  const [showed, setShowed] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, () => hide());

  const toggle = () => {
    setShowed(!showed);
  };

  const hide = () => {
    setShowed(false);
  };

  return (
    <StyledDropdown ref={ref}>
      <StyledDropdownToggle onClick={toggle}>
        <StyledButtonIcon>
          <IconCog></IconCog>
        </StyledButtonIcon>
      </StyledDropdownToggle>
      {showed && (
        <StyledDropdownContent>
          <SlippageControl />
        </StyledDropdownContent>
      )}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: relative;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`;

const StyledDropdownToggle = styled.div`
  cursor: pointer;
`;

const StyledDropdownContent = styled.div`
  background-color: #1a1d2f;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px,
    rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px;
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 0.86rem;
  position: absolute;
  top: 2.2rem;
  right: 0rem;
  z-index: 100;
  @media (max-width: 768px) {
    width: 350px;
  }
`;

const StyledButtonIcon = styled.button`
  width: 100%;
  border: none;
  margin: 0px;
  height: 35px;
  background-color: transparent;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  * {
    display: flex;
    align-items: center;
    stroke: rgb(255, 255, 255, 0.5);
  }
  &:hover,
  &:focus {
    outline: none;
    * {
      stroke: rgb(255, 255, 255, 0.8);
    }
  }
`;

export default SlippageControlButton;
