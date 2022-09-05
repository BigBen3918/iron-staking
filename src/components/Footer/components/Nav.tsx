import React from 'react';
import styled from 'styled-components';
import { ExternalLinks } from '../../../constants';

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        rel="noopener noreferrer"
        href="https://docs.iron.finance/audits"
      >
        Audits
      </StyledLink>
      <StyledLink target="_blank" rel="noopener noreferrer" href={ExternalLinks.codes}>
        Github
      </StyledLink>
      <StyledLink target="_blank" rel="noopener noreferrer" href={ExternalLinks.documentations}>
        Docs
      </StyledLink>
      <StyledLink target="_blank" rel="noopener noreferrer" href={ExternalLinks.twitter}>
        Twitter
      </StyledLink>
      <StyledLink target="_blank" rel="noopener noreferrer" href={ExternalLinks.telegram}>
        Telegram
      </StyledLink>
      <StyledLink target="_blank" rel="noopener noreferrer" href={ExternalLinks.discord}>
        Discord
      </StyledLink>
      <StyledLink target="_blank" rel="noopener noreferrer" href={ExternalLinks.medium}>
        Medium
      </StyledLink>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.primary.light};
  padding-left: ${(props) => props.theme.spacing[4]}px;
  padding-right: ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.primary.main};
  }
`;

export default Nav;
