import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { AutoColumn } from '../Column';
import { AutoRow } from '../Row';

interface ErrorPopupProps {
  title: string;
  message: string;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ title, message }) => {
  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16 }}>
        <i
          className="fas fa-exclamation-circle"
          style={{ fontSize: '24px', color: theme.color.danger }}
        />
      </div>
      <AutoColumn gap="8px">
        <StyledPopupTitle>{title}</StyledPopupTitle>
        <StyledPopupMessage>{message}</StyledPopupMessage>
      </AutoColumn>
    </RowNoFlex>
  );
};

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
`;

const StyledPopupTitle = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.color.grey[300]};
`;

const StyledPopupMessage = styled.span`
  color: ${(props) => props.theme.color.grey[500]};
`;

export default ErrorPopup;
