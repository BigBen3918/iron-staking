import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ExternalLinks } from '../../../constants';
import useOutsideClick from '../../../hooks/useClickOutside';
import IconEllipsis from '../../icons/IconEllipsis';

const DropdownMore: React.FC = () => {
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
      {showed && (
        <StyledDropdownContent onClick={hide}>
          <StyledDropdownItem
            href={ExternalLinks.documentations}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-book-open"></i>
            Docs
          </StyledDropdownItem>
          <StyledDropdownItem
            href={ExternalLinks.codes}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
            Codes
          </StyledDropdownItem>
          <StyledDropdownItem
            href={ExternalLinks.medium}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-medium"></i>
            Medium
          </StyledDropdownItem>
          <StyledDropdownItem
            href={ExternalLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-telegram"></i>
            Telegram
          </StyledDropdownItem>
          <StyledDropdownItem
            href={ExternalLinks.discord}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-discord"></i>
            Discord
          </StyledDropdownItem>
          <StyledDropdownItem
            href={ExternalLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
            Twitter
          </StyledDropdownItem>
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
  background-color: #272b3f;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  * {
    display: flex;
    align-items: center;
    stroke: rgb(255, 255, 255);
  }
  &:hover,
  &:focus {
    outline: none;
    background-color: #0a0c1b;
  }
`;

const StyledDropdownItem = styled.a`
  flex: 1 1 0%;
  padding: 0.5rem;
  color: rgb(195, 197, 203);
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  i {
    margin-right: 12px;
    width: 18px;
    text-align: center;
  }
  &:hover {
    color: rgb(255, 255, 255);
    cursor: pointer;
    text-decoration: none;
  }
`;

export default DropdownMore;
