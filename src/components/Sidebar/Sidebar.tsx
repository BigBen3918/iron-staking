import React, { useCallback } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import bgSidebar from '../../assets/img/bg-sidebar.png';
import iconHome from '../../assets/img/sidebar/ic-home.svg';
import iconBank from '../../assets/img/sidebar/ic-bank.svg';
import iconGovernment from '../../assets/img/sidebar/ic-government.svg';
import iconPools from '../../assets/img/sidebar/ic-pools.svg';
import iconMedium from '../../assets/img/sidebar/ic-medium.svg';
import iconDiscord from '../../assets/img/sidebar/ic-discord.svg';
import iconTelegram from '../../assets/img/sidebar/ic-telegram.svg';
import iconGithub from '../../assets/img/sidebar/ic-github.svg';
import iconTwitter from '../../assets/img/sidebar/ic-twitter.svg';
import iconDoc from '../../assets/img/sidebar/ic-doc.svg';
import iconAudit from '../../assets/img/audit.svg';
import iconDragonBall from '../../assets/img/ic-dragon.png';
import Logo from '../Logo';
import { ExternalLinks } from 'src/constants';

interface NavContainerProps {
  onClickItem?: () => void;
}

const NavContainer: React.FC<NavContainerProps> = ({ onClickItem }) => {
  const handleClick = useCallback(() => {
    if (!onClickItem) return;
    onClickItem();
  }, [onClickItem]);

  return (
    <StyledNavContainer>
      <StyledNavItem onClick={handleClick}>
        <StyledNavLink to="/" activeClassName="active" exact>
          <img src={iconHome} />
          Home
        </StyledNavLink>
      </StyledNavItem>
      {/* <StyledNavItem onClick={handleClick}>
        <StyledNavLink to="/bank" activeClassName="active">
          <img src={iconBank} />
          Bank
        </StyledNavLink>
      </StyledNavItem> */}
      <StyledNavItem onClick={handleClick}>
        <StyledNavLink to="/farms">
          <img src={iconPools} />
          Farms
        </StyledNavLink>
      </StyledNavItem>

      {/* <StyledNavItem onClick={handleClick}>
        <StyledLinkHref
          href="https://dragonball.iron.finance"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={iconDragonBall} />
          DragonBall&nbsp;
          <i className="fas fa-external-link"></i>
        </StyledLinkHref>
      </StyledNavItem> */}
      {/* <StyledNavItem onClick={handleClick}>
        <StyledLinkHref
          href="https://gov.polygon.iron.finance"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={iconGovernment} />
          Governance
          <i className="fas fa-external-link"></i>
        </StyledLinkHref>
      </StyledNavItem>
      <StyledNavItem onClick={handleClick}>
        <StyledLinkHref
          href={ExternalLinks.documentations}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={iconDoc} />
          Documentations
          <i className="fas fa-external-link"></i>
        </StyledLinkHref>
      </StyledNavItem> */}
    </StyledNavContainer>
  );
};

const Sidebar: React.FC = () => {
  return (
    <>
      <StyledSidebar>
        <StyledLogoContainer>
          <Logo />
        </StyledLogoContainer>
        <NavContainer />
        <StyledAudit
          href="https://docs.iron.finance/audits"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={iconAudit} />
        </StyledAudit>
        <StyledExternalLink>
          <StyledLink target="_blank" rel="noopener noreferrer" href={ExternalLinks.medium}>
            <StyledIcon>
              <img src={iconMedium} />
            </StyledIcon>
          </StyledLink>
          <StyledLink target="_blank" rel="noopener noreferrer" href={ExternalLinks.twitter}>
            <StyledIcon>
              <img src={iconTwitter} />
            </StyledIcon>
          </StyledLink>
          <StyledLink target="_blank" rel="noopener noreferrer" href={ExternalLinks.discord}>
            <StyledIcon>
              <img src={iconDiscord} />
            </StyledIcon>
          </StyledLink>
          <StyledLink target="_blank" rel="noopener noreferrer" href={ExternalLinks.telegram}>
            <StyledIcon>
              <img src={iconTelegram} />
            </StyledIcon>
          </StyledLink>
          <StyledLink target="_blank" rel="noopener noreferrer" href={ExternalLinks.codes}>
            <StyledIcon>
              <img src={iconGithub} />
            </StyledIcon>
          </StyledLink>
        </StyledExternalLink>
        <StyledAuthorView href="https://iron.finance" target="_blank" rel="noopener noreferrer">
          IRON Finance 2021
        </StyledAuthorView>
      </StyledSidebar>
    </>
  );
};

const StyledAudit = styled.a`
  align-self: center;
  img {
    width: 93px;
    margin-bottom: 23px;
  }
`;

const StyledExternalLink = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  justify-items: center;
  margin-bottom: 30px;
  padding: 0px 20px;
`;

const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: solid 1px #2b2a35;
  img {
    width: 15px;
  }
  &:hover {
    border-color: ${(props) => props.theme.color.primary.main};
    background-color: ${(props) => props.theme.color.primary.main};
    img {
      filter: brightness(0) invert(1);
    }
  }
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.primary.light};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.primary.main};
  }
`;

const StyledSidebar = styled.div`
  width: 250;
  height: 100%;
  padding: 26px 0px;
  background-color: #0b0d1c;
  display: flex;
  flex-direction: column;
  background-image: url(${bgSidebar});
  background-size: 216px;
  background-repeat: no-repeat;
  background-position: left bottom;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const StyledLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  h1 {
    color: ${({ theme }) => theme.color.black};
    padding: 0;
    margin: 0;
  }
`;

const StyledNavContainer = styled.ul`
  padding: 0px;
  margin-top: 25px;
  flex: 1;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #111327;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #191d3a;
  }
`;

const StyledNavItem = styled.li`
  display: flex;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 52px;
  padding: 0px 28px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  color: #8f929a;
  border-left: solid 5px transparent;
  img {
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }
  &.active,
  &.matched {
    font-weight: 500;
    background: #1a1d2f;
    color: ${({ theme }) => theme.color.white};
    border-left: solid 5px #fea430;
    img {
      filter: brightness(0) invert(1);
    }
  }
  &:not(.active):hover {
    font-weight: 500;
    background: #1a1d2f;
    color: ${({ theme }) => theme.color.white};
    border-left: solid 5px #fea43022;
    img {
      filter: brightness(0) invert(1);
    }
  }
`;

const StyledLinkHref = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  height: 52px;
  padding: 0px 28px;
  font-weight: 500;
  font-size: 18px;
  color: #8f929a;
  text-decoration: none;
  font-size: 16px;
  border-left: solid 5px transparent;
  i {
    margin-left: 8px;
    font-size: 12px;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }
  &.active,
  &.matched {
    background: #1a1d2f;
    color: ${({ theme }) => theme.color.white};
    border-left: solid 5px #fea430;
  }
  &:hover {
    font-weight: 500;
    background: #1a1d2f;
    color: ${({ theme }) => theme.color.white};
    border-left: solid 5px #fea43022;
    img {
      filter: brightness(0) invert(1);
    }
  }
`;

const StyledAuthorView = styled.a`
  text-decoration: none;
  font-size: 13px;
  color: #8f929a;
  text-align: center;
  &:hover {
    color: #fea430;
  }
`;

export default Sidebar;
