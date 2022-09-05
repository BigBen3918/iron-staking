import React from 'react';
import styled from 'styled-components';
import { useConfiguration } from '../../contexts/ConfigProvider/ConfigProvider';
import theme from '../../theme';
import { ButtonAction } from '../ButtonAction';
import CloseButton from '../CloseButton';
import Modal from '../Modal';

export interface WaitingApprovalResultProps {
  onDismiss?: () => void;
  transactionHash: string;
}

const WaitingApprovalResult: React.FC<WaitingApprovalResultProps> = ({
  transactionHash,
  onDismiss,
}) => {
  const config = useConfiguration();

  return (
    <Modal size="xs">
      <ModalHeader>
        <CloseButton size="20px" onClick={onDismiss} />
      </ModalHeader>
      <StyledModalContent>
        <StyledIconContainer>
          <i
            className="fas fa-arrow-circle-up"
            style={{ color: theme.color.primary.main, fontSize: 100 }}
          />
        </StyledIconContainer>
        <StyledTitle>Transaction Submitted</StyledTitle>
        <StyledView
          href={`${config.etherscanUrl}/tx/${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Explorer&nbsp;
          <i className="fas fa-external-link"></i>
        </StyledView>
        <ButtonAction onClick={onDismiss}>Close</ButtonAction>
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

const StyledIconContainer = styled.div`
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

const StyledView = styled.a`
  font-size: 13px;
  text-align: center;
  color: ${(props) => props.theme.color.primary.main};
  font-weight: 400;
  margin-bottom: 20px;
  text-decoration: none !important;
  :hover {
    color: ${(props) => props.theme.color.orange[600]};
  }
`;

export default WaitingApprovalResult;
