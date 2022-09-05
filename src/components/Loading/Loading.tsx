import React from 'react';
import styled from 'styled-components';

interface LoadingProps {
  height?: string;
  size?: string;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ height, size, color }) => {
  return (
    <StyledLoadingContainer height={height} size={size} color={color}>
      <i className="fas fa-spin fa-circle-notch"></i>
    </StyledLoadingContainer>
  );
};

const StyledLoadingContainer = styled.div<{ height?: string; size?: string; color?: string }>`
  display: flex;
  align-items: center;
  height: ${({ height }) => height || 'auto'};
  padding: 5px 0;
  color: ${({ color, theme }) => color || theme.color.grey[300]};
  i {
    font-size: ${({ size }) => size || '1.6rem'};
  }
`;

export default Loading;
