import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import CloseButton from '../CloseButton';
import MiniLoader from '../MiniLoader';
import Modal from '../Modal';

export interface WaitingApprovalProps {
  message: string;
  onDismiss?: () => void;
}

const WaitingApproval: React.FC<WaitingApprovalProps> = ({ message, onDismiss }) => {
  return (
    <Modal size="xs">
      <ModalHeader>
        <CloseButton size="20px" onClick={onDismiss} />
      </ModalHeader>
      <StyledModalContent>
        <StyledLoaderContainer>
          <MiniLoader size="100px" stroke={theme.color.primary.main} />
        </StyledLoaderContainer>
        <StyledTitle>Waiting For Confirmation</StyledTitle>
        <StyledMessage>{message}</StyledMessage>
        <StyledHelper>Confirm this transaction in your wallet</StyledHelper>
      </StyledModalContent>
    </Modal>
  );
};

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledModalContent = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 5px;
  grid-template-rows: 1fr;
  align-items: center;
`;

const StyledLoaderContainer = styled.div`
  padding: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTitle = styled.div`
  font-size: 20px;
  text-align: center;
  color: ${(props) => props.theme.color.grey[200]};
  font-weight: 500;
`;

const StyledMessage = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${(props) => props.theme.color.grey[200]};
  font-weight: 400;
`;

const StyledHelper = styled.div`
  font-size: 13px;
  text-align: center;
  color: ${(props) => props.theme.color.grey[700]};
  font-weight: 400;
`;

export default WaitingApproval;
