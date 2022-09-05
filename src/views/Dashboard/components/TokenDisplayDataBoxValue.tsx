import React from 'react';
import styled from 'styled-components';
import { FadeAnimated } from '../../../components/Form';
import Loading from '../../../components/Loading';
import theme from '../../../theme';

interface TokenDisplayDataBoxValueProps {
  isLoading?: boolean;
  isSmallSize?: boolean;
  isBigSize?: boolean;
}

const TokenDisplayDataBoxValue: React.FC<TokenDisplayDataBoxValueProps> = ({
  children,
  isLoading,
  isSmallSize,
  isBigSize,
}) => {
  return isLoading ? (
    <Loading size={isSmallSize ? '16px' : '32px'} color={theme.color.white} />
  ) : isSmallSize ? (
    <TokenDisplayDataBoxSmall>{children}</TokenDisplayDataBoxSmall>
  ) : isBigSize ? (
    <TokenDisplayDataBoxBig>{children}</TokenDisplayDataBoxBig>
  ) : (
    <>{children}</>
  );
};

const TokenDisplayDataBoxBig = styled(FadeAnimated)``;

const TokenDisplayDataBoxSmall = styled(FadeAnimated)``;

export default TokenDisplayDataBoxValue;
