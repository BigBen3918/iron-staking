import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import CloseButton from '../../CloseButton';
import { ExternalLinks } from '../../../constants';

interface NavMobileProps {
  onDismiss?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ onDismiss }) => {
  return (
    <StyledNav>
      <StyledCloseButton>
        <CloseButton onClick={onDismiss} size="24px"></CloseButton>
      </StyledCloseButton>
      <StyledLinkList>
        <StyledLink onClick={onDismiss} exact activeClassName="active" to="/">
          Home
        </StyledLink>
        <StyledLink onClick={onDismiss} exact activeClassName="active" to="/mint">
          Mint
        </StyledLink>
        <StyledLink onClick={onDismiss} exact activeClassName="active" to="/redeem">
          Redeem
        </StyledLink>
        <StyledLink onClick={onDismiss} exact activeClassName="active" to="/farms">
          Farms
        </StyledLink>
        <StyledLink onClick={onDismiss} exact activeClassName="active" to="/vaults">
          Vaults
        </StyledLink>
        <StyledExternalLink
          onClick={onDismiss}
          href="https://gov.polygon.iron.finance"
          target="_blank"
          rel="noopener noreferrer"
        >
          Governance&nbsp;
          <i className="fas fa-external-link"></i>
        </StyledExternalLink>
        <StyledExternalLink href="https://dragonball.iron.finance" target="_blank">
          DragonBall&nbsp;
          <i className="fas fa-external-link"></i>
        </StyledExternalLink>
      </StyledLinkList>
      <StyledLinkSeparator />
      <StyledLinkList>
        <StyledExternalLink
          onClick={onDismiss}
          href={ExternalLinks.documentations}
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
        </StyledExternalLink>
        <StyledExternalLink
          onClick={onDismiss}
          href={ExternalLinks.codes}
          target="_blank"
          rel="noopener noreferrer"
        >
          Codes
        </StyledExternalLink>
        <StyledExternalLink
          onClick={onDismiss}
          href={ExternalLinks.medium}
          target="_blank"
          rel="noopener noreferrer"
        >
          Medium
        </StyledExternalLink>
        <StyledExternalLink
          onClick={onDismiss}
          href={ExternalLinks.telegram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Telegram
        </StyledExternalLink>
        <StyledExternalLink
          onClick={onDismiss}
          href={ExternalLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </StyledExternalLink>
      </StyledLinkList>
    </StyledNav>
  );
};
const StyledNav = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #000;
  display: block;
  z-index: 100;
  margin: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px 20px 30px;
`;

const StyledCloseButton = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
`;

const StyledLinkList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const StyledLinkSeparator = styled.hr`
  width: 50%;
  border-color: ${(props) => props.theme.color.grey[600]};
`;

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.secondary};
  font-weight: 500;
  font-size: 1.3rem;
  margin: 6px 0;
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  &:hover {
    color: ${(props) => props.theme.color.primary.main};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
    font-weight: 500;
  }
  .on {
    color: ${(props) => props.theme.color.primary.main};
  }
`;

const StyledExternalLink = styled.a`
  color: ${(props) => props.theme.color.secondary};
  font-weight: 500;
  font-size: 1.3rem;
  margin: 6px 0;
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  &:hover {
    color: ${(props) => props.theme.color.primary.main};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
    font-weight: 500;
  }
`;

export default NavMobile;
