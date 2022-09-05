import React, { useState } from 'react';
import styled from 'styled-components';
import AccountButton from './components/AccountButton';
import NavMobile from './components/NavMobile';
import Logo from '../Logo';
import SelectChainButton from './components/SelectChainButton';
import BuyShareButton from './components/BuyShareButton';

interface TopBarProps {
  home?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ home }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <TopBarContainer marginBottom={home ? 46 : 0}>
      <StyledTopBar>
        <StyledTopBarInner>
          {showMobileMenu && <NavMobile onDismiss={() => setShowMobileMenu(false)} />}
          <StyledHamburgerMenu onClick={() => setShowMobileMenu(true)}>
            <i className="fas fa-bars"></i>
          </StyledHamburgerMenu>
          <StyledLogoContainer>
            <Logo />
          </StyledLogoContainer>
          <StyledButtonGroup>
            <BuyShareButton />
            <SelectChainButton />
            <AccountButton />
          </StyledButtonGroup>
        </StyledTopBarInner>
      </StyledTopBar>
    </TopBarContainer>
  );
};

const TopBarContainer = styled.div<{ marginBottom: number }>`
  margin-bottom: ${(p) => p.marginBottom}px;
  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const StyledLogoContainer = styled.div`
  display: none;
  justify-content: center;
  h1 {
    color: ${({ theme }) => theme.color.black};
    padding: 0;
    margin: 0;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;

const StyledHamburgerMenu = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color.grey[400]};
  display: none;
  font-size: 24px;
  display: none;
  align-items: center;
  padding: 0;
  margin-right: 15px;
  @media (max-width: 768px) {
    display: flex;
    &:hover,
    &:active {
      color: ${({ theme }) => theme.color.grey[200]};
    }
  }
`;

const StyledTopBar = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  z-index: 3;
  position: relative;
`;

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const StyledButtonGroup = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 15px;
  margin-left: auto;
  @media (max-width: 768px) {
    margin-left: auto;
  }
`;

export default TopBar;
