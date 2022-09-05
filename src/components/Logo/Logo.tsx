import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/img/logo.png';
import logoShorten from '../../assets/img/IRON-logo.png';
import { NavLink } from 'react-router-dom';

interface LogoProps {
  shorten?: boolean;
}

const Logo: React.FC<LogoProps> = ({ shorten }) => {
  return (
    <StyledLogo to="/">
      {shorten ? <img src={logoShorten} height="48" /> : <img src={logo} height="48" />}
    </StyledLogo>
  );
};

const StyledLogo = styled(NavLink)`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    img {
      height: 46px;
    }
  }
`;

export default Logo;
