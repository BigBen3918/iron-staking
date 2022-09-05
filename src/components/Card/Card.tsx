import React from 'react';
import styled from 'styled-components';
import { FadeAnimated } from '../Form';

interface CardProps {
  width?: string;
  padding?: string;
  animationDuration?: number;
  background?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  width,
  padding,
  animationDuration,
  background,
}) => (
  <StyledCard
    width={width}
    padding={padding}
    animationDuration={animationDuration}
    background={background}
  >
    {children}
  </StyledCard>
);

Card.defaultProps = {
  animationDuration: 0,
};

const StyledCard = styled(FadeAnimated)<{
  width?: string;
  padding?: string;
  background?: string;
  animationDuration: number;
}>`
  animation: fadeIn ${({ animationDuration }) => animationDuration}s;
  position: relative;
  min-width: 300px;
  width: ${({ width }) => (width ? width : 'auto')};
  background: ${({ background }) => background || '#12152c'};
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px,
    rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px;
  border-radius: 15px;
  padding: ${({ padding }) => padding || '1rem'};
  z-index: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100% !important;
  }
`;

export default Card;
