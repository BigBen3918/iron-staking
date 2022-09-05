import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import useOutsideClick from '../../../hooks/useClickOutside';
import IconEllipsis from '../../icons/IconEllipsis';

const DropdownExtraLinks: React.FC = () => {
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
          <IconEllipsis></IconEllipsis>
        </StyledButtonIcon>
      </StyledDropdownToggle>
      {showed && <StyledDropdownContent onClick={hide}></StyledDropdownContent>}
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledDropdownToggle = styled.div`
  cursor: pointer;
`;

const StyledDropdownContent = styled.div`
  min-width: 9rem;
  background-color: #0a0c1b;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px,
    rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px;
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 100;
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
    stroke: rgb(143, 146, 154);
  }
  &:hover,
  &:focus {
    outline: none;
    background-color: #0a0c1b;
    * {
      stroke: rgb(255, 255, 255);
    }
  }
`;

export default DropdownExtraLinks;
