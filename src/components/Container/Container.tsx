import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

interface ContainerProps {
  children?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'homepage';
}

const Container: React.FC<ContainerProps> = ({ children, size = 'md' }) => {
  const { siteWidth } = useContext(ThemeContext);
  let width: number;
  switch (size) {
    case 'xs':
      width = siteWidth / 2.5;
      break;
    case 'sm':
      width = siteWidth / 2;
      break;
    case 'md':
      width = (siteWidth * 2) / 3;
      break;
    case 'homepage':
      width = siteWidth * 1.25;
      break;
    case 'lg':
    default:
      width = siteWidth;
  }
  return <StyledContainer width={width}>{children}</StyledContainer>;
};

interface StyledContainerProps {
  width: number;
}

const StyledContainer = styled.div<StyledContainerProps>`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: ${(props) => props.width}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  width: 100%;
  @media (max-width: 768px) {
    padding: 0 ${(props) => props.theme.spacing[2]}px;
  }
`;

export default Container;
